import React, { Fragment } from 'react';
import { WithChildren } from '.';
import { AppAlert } from '../../organisms';

export const WithNav = ({ children, className, ...props }) => {
  return (
    <Fragment>
      <section className='app'>
        <AppAlert {...props} />
        <WithChildren children={children} {...props}  />
      </section>
    </Fragment>
  );
};
