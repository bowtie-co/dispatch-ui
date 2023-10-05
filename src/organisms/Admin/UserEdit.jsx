import React, { Fragment } from 'react';
import { AdminUserForm } from '../../molecules';

export const AdminUserEdit = (props) => {
  const { updateAdminUser, deleteAdminUser } = props;

  return (
    <Fragment>
      <AdminUserForm onSubmit={updateAdminUser} onDelete={deleteAdminUser} {...props} />
    </Fragment>
  );
};
