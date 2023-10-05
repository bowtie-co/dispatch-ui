import React from 'react';
import { Button } from 'reactstrap';
export const ButtonBasic = ({ children, className, color = 'outline', disabled = false, active = false, ...props }) => {
  // console.debug('ButtonBasic', { props });
  return (
    <Button className={`ButtonBasic ${className || ''}`} color={color} disabled={disabled} active={active} {...props}>
      {children}
    </Button>
  );
};
