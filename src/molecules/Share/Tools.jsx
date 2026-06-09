import React, { useEffect } from 'react';
const { REACT_APP_API_ROOT } = process.env;

const extFromMime = (mimeType) => {
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'video/mp4') return 'mp4';
  if (mimeType === 'video/quicktime') return 'mov';
  return 'jpg';
};

export const ShareTools = (props) => {
  const { post, theme, postDownloadUrl } = props;
  const baseShareUrl = `${REACT_APP_API_ROOT}/posts/${post._id}/event`;
  const eventHref = (metric) => `${baseShareUrl}?metric=${metric}`;
  const [isIosDevice, setIsIosDevice] = React.useState(false);

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setIsIosDevice(true);
    }
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(postDownloadUrl);
      const blob = await response.blob();
      const ext = extFromMime(blob.type);
      const sanitizedTitle = theme.shareTitleText
        ? theme.shareTitleText.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_')
        : null;
      const isVideo = /^video\//.test(blob.type);
      const filename = isVideo
        ? `${sanitizedTitle || 'Dispatch_Video'}.${ext}`
        : `${sanitizedTitle || 'Dispatch_Image'}.${ext}`;
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className='ShareTools'>
      {!isIosDevice && (
        <>
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
          <a className={'shareTool-item'} onClick={handleDownload} style={{ cursor: 'pointer' }}>
            <img src={`${theme.baseUploadUrl}/${theme.downloadIconImage}`} alt="Download Link" />
          </a>
        )}
      </>
      )}
    </div>
  );
};
