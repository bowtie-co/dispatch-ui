import React from 'react';
import { WithApp, WithAdminAuth, WithAdminUser } from '../../ecosystems';
import { AdminUserEdit } from '../../organisms';
import { AdminNav } from '../../molecules';

export const PageEditUser = (props) => {
  return (
    <WithAdminAuth {...props}>
      <WithAdminUser>
        <WithApp>
          <AdminNav />
          <AdminUserEdit />
        </WithApp>
      </WithAdminUser>
    </WithAdminAuth>
  );
};
