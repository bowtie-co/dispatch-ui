import React from 'react';

const { REACT_APP_API_ROOT } = process.env;

export const ShareTools = (props) => {
  const { post, theme } = props;

  const baseShareUrl = `${REACT_APP_API_ROOT}/posts/${post._id}/event`;
  const eventHref = (metric) => `${baseShareUrl}?metric=${metric}`;

  return (
    <div className='ShareTools'>
      {theme.facebookIconImage && (
        <a className={'shareTool-item'} href={eventHref('share_facebook')} target="_blank" rel="noopener noreferrer">
          <img src={`${theme.baseUploadUrl}/${theme.facebookIconImage}`} alt="Facebook Social Link" />
        </a>
      )}

      {theme.twitterIconImage && (
        <a className={'shareTool-item'} href={eventHref('share_twitter')} target="_blank" rel="noopener noreferrer">
          <img src={`${theme.baseUploadUrl}/${theme.twitterIconImage}`} alt="Twitter Social Link" />
        </a>
      )}

      {theme.downloadIconImage && (
        <a className={'shareTool-item'} target="_blank" rel="noopener noreferrer" download={post.filename} href={eventHref('share_download')}>
          <img src={`${theme.baseUploadUrl}/${theme.downloadIconImage}`} alt="Facebook Social Link" />
        </a>
      )}
    </div>
  );
};
