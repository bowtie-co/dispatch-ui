import React from 'react';
import { WithApp, WithAdminAuth, WithAdminUsers } from '../../ecosystems';
import { AdminUserList } from '../../organisms';
import { AdminNav } from '../../molecules';

export const PageUsers = (props) => {
  return (
    <WithAdminAuth>
      <WithAdminUsers>
        <WithApp {...props}>
          <AdminNav />
          <AdminUserList />
        </WithApp>
      </WithAdminUsers>
    </WithAdminAuth>
  );
};
