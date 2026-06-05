import React from 'react';
import { useRef, useLayoutEffect } from 'react';
import { ga } from '../../lib';
import { AppSanitizeHTML } from '../../atoms';
import { Spinner } from 'reactstrap';
const { REACT_APP_API_ROOT } = process.env;

export const ShareLink = (props) => {
  const { post, theme, styles, postDownloadUrl } = props;
  const linkRef = useRef(null);
  const baseShareUrl = `${REACT_APP_API_ROOT}/posts/${post._id}/event`;
  const eventHref = (metric) => `${baseShareUrl}?metric=${metric}`;
  const [loaded, setLoaded] = React.useState(false);
  const [mediaFile, setMediaFile] = React.useState(null);
  const [isIosDevice, setIsIosDevice] = React.useState(false);

  const isVideo = /^video\//.test(post.filetype);

  useLayoutEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setIsIosDevice(true);
    }

    fetch(postDownloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const sanitizedTitle = theme.shareTitleText
          ? theme.shareTitleText.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_')
          : null;
        const filename = isVideo
          ? `${sanitizedTitle || 'Dispatch_Video'}.mp4`
          : `${sanitizedTitle || 'Dispatch_Image'}.jpg`;
        setMediaFile(new File([blob], filename, { type: blob.type }));
        setLoaded(true);
      })
      .catch(error => {
        console.log('Error fetching media:', error);
      });
  }, []);

  const sendGAandDownload = async (url) => {
    const eventName = eventHref('share_download');
    const defaultTitle = isVideo ? 'Dispatch Video' : 'Dispatch Image';
    const title = theme.shareTitleText || defaultTitle;
    const text = 'Share your keepsake and tag us!';
    ga.pageView(eventName);

    let data;
    if (isIosDevice) {
      data = { files: [mediaFile], title, text };
    } else {
      data = { title, text, url };
    }

    try {
      await navigator.share(data);
    } catch (error) {
      // share cancelled or failed silently
    }
  };

  return (
    <div className='shareLink'>
      {/* invisible anchor used for programmatic download fallback */}
      <a className={'shareTool-item'} ref={linkRef} rel="noopener noreferrer" href={postDownloadUrl} download />
      {!loaded ? (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Spinner />
          <AppSanitizeHTML html={'Enabling Share...'} />
        </div>
      ) : (
        <a id='download' className={'shareTool-item'} rel="noopener noreferrer" onClick={() => sendGAandDownload(post.shareUrl)}>
          <div className='primary-text' style={styles.bodyContent}>
            <AppSanitizeHTML html={theme.shareButtonText || 'Click to Share'} className={'btn btn-outline wrapper-share'} />
            <style dangerouslySetInnerHTML={{__html: `
              .primary-text a { color: ${styles.linkContent.color} }
            `}} />
          </div>
        </a>
      )}
    </div>
  );
};
