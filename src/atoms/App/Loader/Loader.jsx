import React from 'react';
import loading from './loader.svg';

export const AppLoader = ({ blocking = false }) => {
  const blockingClass = blocking ? 'loader-blocking': '';

  return (
    <div className={`loader ${blockingClass}`}>
      <img src={loading} className='loaderimg' alt='loading' />
    </div>
  );
};
