import React from 'react';

export const AppLogo = ({ size = 'md', src, className, style }) => {
  const logoSize = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg',
    xl: 'logo-xl'
  };

  return (
    <img src={src} className={`${logoSize[size]} ${className || ''}`} style={style} alt='logo' />
  );
};
