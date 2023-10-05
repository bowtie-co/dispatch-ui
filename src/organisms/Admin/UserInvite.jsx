import React, { Fragment, useState } from 'react';
import { api, notifier } from '../../lib';
import { AppLoader } from '../../atoms';
import { AdminUserForm } from '../../molecules';

export const AdminUserInvite = (props) => {
  const [ isLoading, setIsLoading ] = useState(false);

  const inviteAdminUser = (userData) => {
    setIsLoading(true);

    api.post('admins', userData).then(({ data }) => {
      notifier.success(`Invited user: ${data.email} (${data.name})`);
      // setIsLoading(false);
      window.location.assign('/admin');
    }).catch((err) => {
      notifier.bad(err);
      setIsLoading(false);
    });
  };

  return (
    <Fragment>
      {isLoading ? <AppLoader /> : <AdminUserForm onSubmit={inviteAdminUser} {...props} />}
    </Fragment>
  );
};
