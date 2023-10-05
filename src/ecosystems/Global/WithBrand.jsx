import React from 'react';
import { WithChildren } from '..';

export const WithBrand = ({ children, ...props }) => {
  const { REACT_APP_BRAND } = process.env;
  const brand = REACT_APP_BRAND || 'falcons';

  const brandProps = {
    brand
  };

  return (
    <WithChildren children={children} {...props} {...brandProps} />
  );
};
