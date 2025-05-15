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
  const [video, setVideo] = React.useState(null);
  const [isIosDevice, setIsIosDevice] = React.useState(false);
  // let video = null;
  let videourl = postDownloadUrl;

  function checkBasicFileShare() {
    // XXX: There is no straightforward API to do this.
    // For now, assume that text/plain is supported everywhere.
    const txt = new Blob(['Hello, world!'], {type: 'text/plain'});
    // XXX: Blob support? https://github.com/w3c/web-share/issues/181
    const file = new File([txt], "test.txt");
    return navigator.canShare({ files: [file] });
  }

  function sleep(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  function logText(message, isError) {
    if (isError)
      console.error(message);
    else
      console.log(message);
    const p = document.createElement('p');
    if (isError)
      p.setAttribute('class', 'error');
    p.appendChild(document.createTextNode(message));
  }
  
  function logError(message) {
    logText(message, true);
  }

  async function testWebShare() {
    const title = "test";
    const text = undefined;
    const url = undefined;
    const files = undefined;
  
    // files[1] = video;
  
  
    if (files && files.length > 0) {
  
      if(!isIosDevice) {
  
      }else{
  
  
        if (!navigator.canShare) {
          logError('Warning: canShare is not supported. File sharing may not be supported at all.');
        } else if (!checkBasicFileShare()) {
          logError('Error: File sharing is not supported in this browser.');
          return;
        } else if (!navigator.canShare({files})) {
          logError('Error: share() does not support the given files');
          for (const file of files) {
            logError(`File info: name - ${file.name}, size ${file.size}, type ${file.type}`);
          }
          return;
        }
      }
    }
  }
  async function testWebShareDelay() {
    // await sleep(6000);
    testWebShare();
  }


  useLayoutEffect(() => {

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      console.log("This is an iOS device.");
      // isIosDevice = true;
      setIsIosDevice(true);
    } else {
      // document.querySelector(".loading").style.display = "none";
      console.log("This is not an iOS device!");
    }
    testWebShareDelay();
    fetch(videourl)
      .then(response => response.blob())
      .then(blob => {

        // video = ;
        setVideo(new File([blob], 'Keepsake_Video.mp4', { type: blob.type }));
        setLoaded(true);
        // if (navigator.canShare({ files: [video] })){
        //   alert('Video loaded');
        // }
      })
      .catch(error => {
        console.log('Error fetching the video:', error);
        // alert('Error fetching the video:', error);
      });

  }, []);



  const sendGAandDownload = async (url) => {
    const eventName = eventHref('share_download');
    const title = "Keepsake Video";
    const text = 'Share your video and tag us!';
    ga.pageView(eventName);
    let data;
    if (isIosDevice) {
      data = {
        files: [video,],
        title: title,
        text: text,
      };
    } else {
      data = {
        title: title,
        text: text,
        url: url,
      };
    }
    try {
    await navigator.share(data);
  } catch (error) {
    // alert('Error sharing: ' + error);
  }
  };

  return (
    <>
      {theme.enableDownloadLink && (
        <div className='shareLink'>
        {/* invisible. to be clicked by ref() */}
          <a className={'shareTool-item'} ref={linkRef} rel="noopener noreferrer" href={postDownloadUrl} download />
          {/* visible. clicked by user to start download and send GA */}
          { !loaded ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Spinner />
              <AppSanitizeHTML html={'Enabling Share...'}  />

            </div>
            ) : (
            <a style={{marginBottom: '2em', backgroundColor: 'red', height: '60px', width: '100px'}} id='download' className={'shareTool-item'} rel="noopener noreferrer" onClick={() => sendGAandDownload(post.shareUrl)}>
              {/* <img src={`${theme.baseUploadUrl}/${theme.downloadIconImage}`} alt="Download Social Link" /> */}
              <div className='primary-text' style={styles.bodyContent}>
                <AppSanitizeHTML html={'CLICK TO SHARE'} className={'btn btn-outline wrapper-share'} />

                <style dangerouslySetInnerHTML={{__html: `
                  .primary-text a { color: ${styles.linkContent.color} }
                `}} />
              </div>
            </a>
          ) }
        </div>
      )}
    </>
  );
};
