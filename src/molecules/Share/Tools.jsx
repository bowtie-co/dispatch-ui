import React, { useEffect } from 'react';
const { REACT_APP_API_ROOT } = process.env;

export const ShareTools = (props) => {
  const { post, theme, postDownloadUrl } = props;
  const baseShareUrl = `${REACT_APP_API_ROOT}/posts/${post._id}/event`;
  const eventHref = (metric) => `${baseShareUrl}?metric=${metric}`;
  const [isIosDevice, setIsIosDevice] = React.useState(false);
  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      console.log("This is an iOS device.");
      // isIosDevice = true;
      setIsIosDevice(true);
    } else {
      // document.querySelector(".loading").style.display = "none";
      console.log("This is not an iOS device!");
    }
  }, []);

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
          <>
            <a className={'shareTool-item'} target="_blank" rel="noopener noreferrer" href={postDownloadUrl} download >
              <img src={`${theme.baseUploadUrl}/${theme.downloadIconImage}`} alt="Download Link" />
            </a>
          </>
        )}
      </>
      )}
    </div>
  );
};
