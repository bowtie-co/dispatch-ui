import React from 'react';
export const SimpleDivider = () => {
  const styles = {
    margin: '0.5em 1em 1.5em',
    height: '1px',
    background: 'rgba(0,0,0,0.1)'
  };
  return (
    <div className={`simple-divider`} style={styles}>
    </div>
  );
};
