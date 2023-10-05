import React from 'react';
import { WithApp } from '../../ecosystems';
import { AppNotFound } from '../../organisms';

export const PageNotFound = (props) => {
  return (
    <WithApp {...props}>
      <AppNotFound />
    </WithApp>
  );
};
