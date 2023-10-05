import React, { Fragment, useEffect, useState } from 'react';
import { api, notifier, defaultTheme } from '../../lib';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import fileDownload from 'js-file-download';
import { AdminFanPagesTable, AdminModerationTable } from '../../organisms';
import { AdminTotals } from '../../molecules';
import { AppLoader, ButtonBasic } from '../../atoms';

const DEFAULT_THEME = defaultTheme;

export const AdminContainer = (props) => {
  const { isAdmin, isModerator, isEditor } = props;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ posts, setPosts ] = useState();
  const [ submittedPostsCount, setSubmittedPostsCount ] = useState(0);
  const [ submittedPosts, setSubmittedPosts ] = useState();
  const [ approvedPosts, setApprovedPosts ] = useState();
  const [ totalsData, setTotalsData ] = useState({});
  const [ activeTab, setActiveTab ] = useState(1);
  const [ theme, setTheme ] = useState(DEFAULT_THEME);

  useEffect(() => {
    api.get('themes/active').then(({ data }) => {
      setTheme(data);
    }).catch((err) => {
      console.warn('Error loading active theme', err);
    });
  }, []);

  useEffect(() => {
    if (isAdmin || isModerator || isEditor) {
      api.get('posts').then(({ data }) => {
        setPosts(data);

        const newTotals = {
          post_view: 0,
          email_open: 0,
          share_twitter: 0,
          share_facebook: 0,
          share_download: 0
        };

        data.forEach(post => {
          Object.keys(newTotals).forEach(key => {
            if (post.metrics && typeof post.metrics[key] !== 'undefined') {
              newTotals[key] += post.metrics[key];
            }
          });
        });

        setTotalsData(newTotals);

        setIsLoading(false);
      }).catch((err) => {
        notifier.bad(err);
        setIsLoading(false);
      });
    }
  }, [ isAdmin, isModerator, isEditor ]);

  useEffect(() => {
    if (posts) {
      const submitted = posts.filter((post) => post.status === 'submitted');
      setSubmittedPosts(submitted);
      setSubmittedPostsCount(submitted.length);
      setApprovedPosts(posts.filter((post) => post.status === 'approved'));
    }
  }, [ posts ]);

  const downloadUsers = () => {
    setIsLoading(true);

    api.get('users').then(({ data }) => {
      if (data.length > 0) {
        const headers = [
          '_id',
          'name',
          'email',
          'phone',
          'createdAt',
          'updatedAt'
        ];

        const rows = data.map(row => {
          const rowValues = [];

          headers.forEach(key => {
            rowValues.push(row[key] || '');
          });

          return rowValues.join(',');
        });

        fileDownload(`${headers.join(',')}\n${rows.join(`\n`)}\n`, `user-leads-${Date.now()}.csv`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  const postsProps = { posts, approvedPosts, submittedPosts, setPosts, setSubmittedPostsCount, setApprovedPosts };

  return (
    <div className={'AdminContainer'}>
      <Container fluid>
        <div className={'admin-title'}>
        <h1>Posts</h1>
        {isAdmin && (
          <div style={{ textAlign: 'center' }}>
            <ButtonBasic className={'btn-success btn-sm'} onClick={() => downloadUsers()}>Download Users CSV</ButtonBasic>
          </div>
        )}
        </div>
        <Fragment>
          {isLoading ? (
            <AppLoader />
          ) : (
            <Fragment>
              <AdminTotals data={totalsData} />
              <div className={'admin-table-container'}>
                <div className={'admin-table-content'}>
                  <Nav className={'queue-tabs'} tabs>
                    <NavItem>
                      <NavLink className={classNames({ active: activeTab === 1 })} onClick={() => setActiveTab(1)}>Moderation ({submittedPostsCount})</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classNames({ active: activeTab === 2 })} onClick={() => setActiveTab(2)}>Submitted</NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent className={'queue-content'} activeTab={activeTab}>
                    <TabPane tabId={1}>
                      <AdminModerationTable {...props} {...postsProps} theme={theme} />
                    </TabPane>
                    <TabPane tabId={2}>
                      <AdminFanPagesTable {...props} {...postsProps} />
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </div>
  );
};
