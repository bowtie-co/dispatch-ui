import React from 'react';
import { WithApp } from '../../ecosystems';
import { AppHome } from '../../organisms';

export const PageHome = (props) => {
  return (
    <WithApp {...props}>
      <AppHome />
    </WithApp>
  );
};
