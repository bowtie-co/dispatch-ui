import React from 'react';
import { WithApp, WithAdminAuth } from '../../ecosystems';
import { AdminUserInvite } from '../../organisms';
import { AdminNav } from '../../molecules';

export const PageInviteUser = (props) => {
  return (
    <WithAdminAuth {...props}>
      <WithApp>
        <AdminNav />
        <AdminUserInvite />
      </WithApp>
    </WithAdminAuth>
  );
};
