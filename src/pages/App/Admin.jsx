import React from 'react';
import { WithApp, WithAdminAuth } from '../../ecosystems';
import { AdminContainer } from '../../organisms';
import { AdminNav } from '../../molecules';

export const PageAdmin = (props) => {
  return (
    <WithAdminAuth>
      <WithApp {...props}>
        <AdminNav />
        <AdminContainer />
      </WithApp>
    </WithAdminAuth>
  );
};
