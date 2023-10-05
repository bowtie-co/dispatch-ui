import React, { useState, useEffect } from 'react';
import { api, notifier } from '../../lib';
import { AppLoader } from '../../atoms';
import { WithChildren } from '../Global';

const { REACT_APP_THEMES_MODE } = process.env;

export const WithAdminSelf = ({ children, ...props }) => {
  const { isAuthenticated, logout } = props;

  const multiThemeEnabled = REACT_APP_THEMES_MODE === 'multi';

  const [ isLoading, setIsLoading ] = useState(true);
  const [ account, setAccount ] = useState();
  const [ isAdmin, setIsAdmin ] = useState();
  const [ isEditor, setIsEditor ] = useState();
  const [ isModerator, setIsModerator ] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);

      api.get('admins/self').then(({ data }) => {
        setAccount(data);
        setIsAdmin(data.role === 'admin');
        setIsEditor(data.role === 'editor');
        setIsModerator(data.role === 'moderator');
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        notifier.bad(err);
        logout();
      });
    } else {
      setIsLoading(false);
      logout();
    }
  }, [ isAuthenticated, logout ]);

  const adminSelfProps = { account, isAdmin, isEditor, isModerator, multiThemeEnabled };

  // TODO: Verify account has been loaded, redirect (or err msg) otherwise

  return (
    isLoading ? (
      <AppLoader />
    ) : (
      <WithChildren {...props} {...adminSelfProps} children={children} />
    )
  );
};
