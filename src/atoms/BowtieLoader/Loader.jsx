import React from 'react';
import loading from './bowtie-loader.gif';

export const BowtieLoader = () => {
  return (
    <div className='loader'>
      <img src={loading} className='loaderimg' alt='loading' />
    </div>
  );
};
