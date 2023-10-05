import React, { Fragment, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AppIcon } from '../../atoms';
import { AdminFanPageModal, AdminPostsSearch, AppPagination } from '../../molecules';

const { REACT_APP_API_ROOT } = process.env;

export const AdminFanPagesTable = (props) => {
  const { posts, approvedPosts, setApprovedPosts } = props;

  const perPage = 10;
  const [ page, setPage ] = useState(1);
  const [ tablePosts, setTablePosts ] = useState([]);
  const [ pagePosts, setPagePosts ] = useState([]);
  const [ selectedPost, setSelectedPost ] = useState();
  const [ previewDropdowns, setPreviewDropDowns ] = useState({});

  const togglePreviewDropdown = (post) => () => setPreviewDropDowns(prevState => {
    return {...prevState, [post._id]: !prevState[post._id] };
  });

  const isPreviewDropdownOpen = useCallback((post) => {
    return !!previewDropdowns[post._id];
  }, [ previewDropdowns ]);

  const shareUrl = (post) => {
    return `/share/${post._id}`;
  };

  const mailerPreviewUrl = (post, mailer) => {
    return `${REACT_APP_API_ROOT}/posts/${post._id}/mailer/${mailer}`;
  };

  const fanPageProps = { setSelectedPost };

  useEffect(() => setTablePosts(approvedPosts ? approvedPosts.reverse() : []), [ approvedPosts ]);

  useEffect(() => {
    const indexStart = (page - 1) * perPage;
    const indexEnd = indexStart + perPage;
    const selectedPosts = tablePosts && Array.isArray(tablePosts) ? tablePosts.slice(indexStart, indexEnd) : [];
    setPagePosts(selectedPosts);
  }, [ tablePosts, page ]);

  return (
    <Fragment>
      <AdminPostsSearch posts={posts} allRows={posts.filter((post) => post.status === 'approved')} setRows={setApprovedPosts} />

      <Table className={'FanPagesTable'}>
        <thead>
          <tr>
            <th>Date | Time</th>
            <th>User Name</th>
            <th>Links</th>
            <th>Status</th>
            <th>Page Views</th>
            <th>Email Opens</th>
            <th>Twitter Shares</th>
            <th>Facebook Shares</th>
            <th>Post Downloads</th>
          </tr>
        </thead>
        <tbody>
          {pagePosts.map((post, index) => (
            <tr key={index}>
              <td>
                {/* Date | Time */}
                {moment(post.updatedAt).format('MM/DD/YY | hh:mm A')}
              </td>
              <td>
                {/* User Name */}
                {post.owner && post.owner.name}
              </td>
              <td>
                {/* Links */}
                <Dropdown isOpen={isPreviewDropdownOpen(post)} toggle={togglePreviewDropdown(post)}>
                  <DropdownToggle color='info' caret>
                    <AppIcon iconName={'link'} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <a href={shareUrl(post)} target={'_blank'} rel={'noopener noreferrer'}>View Post</a>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>
                      Mailers
                    </DropdownItem>
                    <DropdownItem>
                      <a href={mailerPreviewUrl(post, 'approved')} target={'_blank'} rel={'noopener noreferrer'}>Approved</a>
                    </DropdownItem>
                    <DropdownItem>
                      <a href={mailerPreviewUrl(post, 'rejected')} target={'_blank'} rel={'noopener noreferrer'}>Rejected</a>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
              <td>
                {/* Status */}
                <span>Published</span>
                <span className={'fan-page-remove text-danger'} onClick={() => setSelectedPost(post)}>Remove</span>
              </td>
              <td>
                {/* Page Views */}
                {post.metrics && post.metrics.post_view ? post.metrics.post_view : '0'}
              </td>
              <td>
                {/* Email Opens */}
                {post.metrics && post.metrics.email_open ? post.metrics.email_open : '0'}
              </td>
              <td>
                {/* Twitter Shares */}
                {post.metrics && post.metrics.share_twitter ? post.metrics.share_twitter : '0'}
              </td>
              <td>
                {/* Facebook Shares */}
                {post.metrics && post.metrics.share_facebook ? post.metrics.share_facebook : '0'}
              </td>
              <td>
                {/* Post Downloads */}
                {post.metrics && post.metrics.share_download ? post.metrics.share_download : '0'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!!tablePosts.length && <AppPagination items={tablePosts} page={page} perPage={perPage} maxPageLinks={5} setPage={setPage} {...props} />}

      {!approvedPosts.length && <h5>No posts found</h5>}

      <AdminFanPageModal post={selectedPost} isOpen={!!selectedPost} {...props} {...fanPageProps} />
    </Fragment>
  );
};
