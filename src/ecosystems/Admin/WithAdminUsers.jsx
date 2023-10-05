import React, { useState, useEffect } from 'react';
import { api, notifier } from '../../lib';
import { AppLoader } from '../../atoms';
import { WithChildren } from '../Global';

export const WithAdminUsers = ({ children, ...props }) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ adminUsers, setAdminUsers ] = useState([]);

  useEffect(() => {
      setIsLoading(true);

      api.get('admins').then(({ data }) => {
        setAdminUsers(data);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        notifier.bad(err);
      });
  }, [ ]);

  const selectAdminUser = (admin) => {
    window.location.assign(`/admin/users/${admin._id}`);
  };

  const adminUsersProps = { adminUsers, selectAdminUser };

  return (
    isLoading ? (
      <AppLoader />
    ) : (
      <WithChildren {...props} {...adminUsersProps} children={children} />
    )
  );
};
