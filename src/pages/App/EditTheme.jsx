import React from 'react';
import { WithApp, WithAdminAuth } from '../../ecosystems';
import { AdminNav } from '../../molecules';
import { ThemeEdit } from '../../organisms';

export const PageEditTheme = (props) => {
  return (
    <WithAdminAuth {...props}>
      <WithApp>
        <AdminNav />
        <ThemeEdit />
      </WithApp>
    </WithAdminAuth>
  );
};
