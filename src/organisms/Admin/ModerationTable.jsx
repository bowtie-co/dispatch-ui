import React, { Fragment, useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';
// import { usePrevious } from '../../hooks';
import { AdminModerationModal, AdminPostsSearch, AppPagination } from '../../molecules';
import { api, notifier } from '../../lib';

export const AdminModerationTable = (props) => {
  const { posts = [], submittedPosts, setSubmittedPostsCount, theme } = props;

  const perPage = 10;
  const [ page, setPage ] = useState(1);
  const [ tablePosts, setTablePosts ] = useState(submittedPosts);
  const [ pagePosts, setPagePosts ] = useState([]);
  const [ selectedPost, setSelectedPost ] = useState();

  const statusClass = (status) => {
    switch (status) {
      case 'approved': return 'text-success';
      case 'rejected': return 'text-danger';
      case 'submitted': return 'italic';
      default: return '';
    }
  };

  const selectPost = (post) => setSelectedPost(post);

  const removePost = useCallback((postId) => {
    const postIndex = tablePosts.findIndex(p => p._id === postId);
    if (postIndex > -1) {
      const newPosts = [...tablePosts];
      newPosts.splice(postIndex, 1);
      setTablePosts(newPosts);
      setSubmittedPostsCount(newPosts.length);
    }
  }, [ setSubmittedPostsCount, tablePosts ]);

  const postAction = (postId, action, comment) => {
    if (postId && action) {
      api.post(`posts/${postId}/${action}`, { comment }).then(() => {
        removePost(postId);
      }).catch((err) => notifier.bad(err));
    } else {
      console.warn('Missing/invalid params for postAction', { postId, action });
    }
  };

  useEffect(() => {
    const indexStart = (page - 1) * perPage;
    const indexEnd = indexStart + perPage;
    const selectedPosts = tablePosts && Array.isArray(tablePosts) ? tablePosts.slice(indexStart, indexEnd) : [];
    setPagePosts(selectedPosts);
  }, [ tablePosts, page ]);

  const moderationProps = { setSelectedPost, postAction };

  return (
    <Fragment>
      <AdminPostsSearch posts={posts} allRows={submittedPosts} setCount={setSubmittedPostsCount} setRows={setTablePosts} />

      <Table className={'AdminModerationTable'}>
        <thead>
          <tr>
            <th>Date | Time</th>
            <th>User Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pagePosts.map((post, index) => (
            <tr key={index} onClick={() => selectPost(post)}>
              <td>
                {moment(post.updatedAt).format('MM/DD/YY | hh:mm A')}
              </td>
              <td>
                {post.owner.name}
              </td>
              <td className={`capitalize ${statusClass(post.status)}`}>
                {post.status}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!!tablePosts.length && <AppPagination items={tablePosts} page={page} perPage={perPage} maxPageLinks={5} setPage={setPage} {...props} />}

      {!tablePosts.length && <h5>No posts found</h5>}

      {selectedPost && <AdminModerationModal posts={tablePosts} post={selectedPost} isOpen={true} {...props} {...moderationProps} theme={theme}/> }
    </Fragment>
  );
};
