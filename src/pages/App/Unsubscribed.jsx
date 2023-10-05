import React from 'react';
import { WithApp } from '../../ecosystems';
import { AppUnsubscribed } from '../../organisms';

export const PageUnsubscribed = (props) => {
  return (
    <WithApp {...props}>
      <AppUnsubscribed />
    </WithApp>
  );
};
