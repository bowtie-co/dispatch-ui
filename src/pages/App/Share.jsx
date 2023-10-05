import React, { useEffect, useState } from 'react';
import { ga, api, storage, defaultTheme } from '../../lib';
import { WithApp } from '../../ecosystems';
import {
  AppNotFound,
  ShareContainer,
} from '../../organisms';
import { AppLoader } from '../../atoms';

// TODO: Setup default theme data for fallback
const DEFAULT_THEME = defaultTheme;

export const PageShare = (props) => {
  const { postId, queryParams } = props;

  const [ theme, setTheme ] = useState(DEFAULT_THEME);
  const [ post, setPost ] = useState();
  const [ postNotFound, setPostNotFound ] = useState(false);

  useEffect(() => {
    api.get('themes/active').then(({ data }) => {
      setTheme(data);
    }).catch((err) => {
      console.warn('Error loading active theme', err);
    });

    api.get(`posts/${postId}`).then(({ data }) => {
      setPost(data);
      // Only submit GA page view if post found
      ga.pageView(`share/${postId}`);
    }).catch(() => setPostNotFound(true));
  }, [ postId ]);

  useEffect(() => {
    const { action, token } = queryParams;

    if (token) {
      storage.set('token', token);
    }

    if (action) {
      if (action === 'destroy') {
        if (window.confirm('Are you sure you want to remove this post?')) {
          api.deletePlain(`posts/${postId}`).then(() => {
            storage.clear();
            window.location.href = '/removed';
          }).catch((err) => {
            console.error(err);
          });
        }
      } else if (action === 'unsubscribe') {
        // TODO: Should general unsubscribe logic be move to "higher" level? (not share page)
        if (window.confirm('Are you sure you want to unsubscribe?')) {
          api.get(`users/self`).then(({ data }) => {
            return api.deletePlain(`users/${data._id}`).then((resp) => {
              storage.clear();
              window.location.href = '/unsubscribed';
            });
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    }
  }, [ queryParams, postId ]);

  const postProps = { post, postId, theme };

  return (
    <div className={`brand`}>
      <WithApp {...props}>
        {!!post ? (
          <ShareContainer {...postProps} />
        ) : (
          postNotFound ? (
            <AppNotFound />
          ) : (
            <AppLoader />
          )
        )}
      </WithApp>
    </div>
  );
};
