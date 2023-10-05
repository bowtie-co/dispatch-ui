import React, { useState, useEffect, useCallback } from 'react';
import { api, notifier } from '../../lib';
import { AppLoader } from '../../atoms';
import { WithChildren } from '../Global';

export const WithAdminUser = ({ children, ...props }) => {
  const { userId } = props;

  const [ isLoading, setIsLoading ] = useState(true);
  const [ adminUser, setAdminUser ] = useState();

  useEffect(() => {
      setIsLoading(true);

      api.get(`admins/${userId}`).then(({ data }) => {
        setAdminUser(data);
        setIsLoading(false);
      }).catch((err) => {
        notifier.bad(err);
        setIsLoading(false);
      });
  }, [ userId ]);

  const updateAdminUser = useCallback((data) => {
    setIsLoading(true);

    api.put(`admins/${userId}`, data).then(({ data }) => {
      notifier.success('User has been updated');
      setAdminUser(data);
      // setIsLoading(false);
      window.location.assign('/admin/users');
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  }, [ userId ]);

  const deleteAdminUser = useCallback((data) => {
    if (window.confirm('Are you sure?')) {
      setIsLoading(true);

      api.deletePlain(`admins/${userId}`).then(({ data }) => {
        notifier.success('User has been deleted');
        // setIsLoading(false);
        window.location.assign('/admin/users');
      }).catch((err) => {
        notifier.bad(err);
        setIsLoading(false);
      });
    }
  }, [ userId ]);

  const adminUserProps = { adminUser, updateAdminUser, deleteAdminUser };

  return (
    isLoading ? (
      <AppLoader />
    ) : (
      <WithChildren {...props} {...adminUserProps} children={children} />
    )
  );
};
