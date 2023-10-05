import React from 'react';
import { WithApp } from '../../ecosystems';
import { AppPostRemoved } from '../../organisms';

export const PagePostRemoved = (props) => {
  return (
    <WithApp {...props}>
      <AppPostRemoved />
    </WithApp>
  );
};
