import React from 'react';
import { WithApp, WithAdminAuth } from '../../ecosystems';
import { ThemeAll } from '../../organisms';
import { AdminNav } from '../../molecules';

export const PageTheme = (props) => {
  return (
    <WithAdminAuth>
      <WithApp {...props}>
        <AdminNav />
        <ThemeAll />
      </WithApp>
    </WithAdminAuth>
  );
};
