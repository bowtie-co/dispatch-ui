import React from 'react';
import { WithApp } from '../../ecosystems';
import { AdminForgotPasswordForm } from '../../organisms';

export const PageForgotPassword = (props) => {
  return (
    <WithApp {...props}>
      <AdminForgotPasswordForm />
    </WithApp>
  );
};
