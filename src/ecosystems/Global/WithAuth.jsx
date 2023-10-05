import React, { useState, useEffect } from 'react';
import { useQueryParams } from 'hookrouter';
import { storage } from '../../lib';
import { WithChildren } from '.';

export const WithAuth = ({ children, ...props }) => {
  const [ queryParams ] = useQueryParams();

  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.get('token'));

  const logout = () => {
    storage.remove('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!queryParams.token && !isAuthenticated && window.location.pathname !== '/admin/login') {
      setTimeout(() => {
        window.location.assign('/admin/login');
      }, 100);
    } else if (queryParams.token && queryParams.token !== storage.get('token')) {
      storage.set('token', queryParams.token);

      setTimeout(() => {
        window.location.assign(window.location.pathname);
      }, 100);
    }
  }, [ isAuthenticated, queryParams ]);

  useEffect(() => {
    const setAuthWithToken = (token) => setIsAuthenticated(!!token);
    const setAuthFalse = () => setIsAuthenticated(false);

    storage.on('token_changed', setAuthWithToken);
    storage.on('token_removed', setAuthFalse);

    return () => {
      storage.off('token_changed', setAuthWithToken);
      storage.off('token_removed', setAuthFalse);
    };
  }, [ setIsAuthenticated ]);

  const authProps = { isAuthenticated, setIsAuthenticated, logout };

  return (
    <WithChildren {...props} {...authProps} children={children} />
  );
};
