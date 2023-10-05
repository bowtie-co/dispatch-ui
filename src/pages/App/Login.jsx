import React from 'react';
import { WithApp } from '../../ecosystems';
import { AdminLoginForm } from '../../organisms';

export const PageLogin = (props) => {
  return (
    <WithApp {...props}>
      <AdminLoginForm />
    </WithApp>
  );
};