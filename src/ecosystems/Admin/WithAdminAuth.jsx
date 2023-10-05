import React from 'react';
import { WithAuth, WithChildren } from '../Global';
import { WithAdminSelf } from '.';

export const WithAdminAuth = ({ children, ...props }) => {
  return (
    <WithAuth>
      <WithAdminSelf>
        <WithChildren {...props} children={children} />
      </WithAdminSelf>
    </WithAuth>
  );
};
