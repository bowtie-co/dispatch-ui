// UNUSED FILE for reference only

'use strict';


var isIosDevice = false;
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  console.log("This is an iOS device.");
  isIosDevice = true;
  document.getElementById("share").style.display = "block";

} else {

  document.getElementById("download").style.display = "block";
  document.querySelector(".loading").style.display = "none";

  console.log("This is not an iOS device!");
}


var video = null;
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
  document.querySelector('#output').appendChild(p);
  p.appendChild(document.createTextNode(message));
}

function logError(message) {
  // disabled for production. enable to debug on phone
  // logText(message, true);
}

function setShareButtonsEnabled(enabled) {
document.querySelector('#share').disabled = !enabled;
// document.querySelector('#share-no-gesture').disabled = !enabled;
}

function checkboxChanged(e) {
const checkbox = e.target;
const textfield = document.querySelector('#' + checkbox.id.split('_')[0]);

textfield.disabled = !checkbox.checked;
if (!checkbox.checked)
  textfield.value = '';
}

function checkBasicFileShare() {
// XXX: There is no straightforward API to do this.
// For now, assume that text/plain is supported everywhere.
const txt = new Blob(['Hello, world!'], {type: 'text/plain'});
// XXX: Blob support? https://github.com/w3c/web-share/issues/181
const file = new File([txt], "test.txt");
return navigator.canShare({ files: [file] });
}

async function testWebShare() {



  const title = "test";
  const text = undefined;
  const url = undefined;
  const files = undefined;

  // files[1] = video;

  console.log(navigator.canShare);

  if (files && files.length > 0) {

    if(!isIosDevice) {

    }else{


      if (!navigator.canShare) {
        logError('Warning: canShare is not supported. File sharing may not be supported at all.');
      } else if (!checkBasicFileShare()) {
        logError('Error: File sharing is not supported in this browser.');
        setShareButtonsEnabled(true);
        return;
      } else if (!navigator.canShare({files})) {
        logError('Error: share() does not support the given files');
        for (const file of files) {
          logError(`File info: name - ${file.name}, size ${file.size}, type ${file.type}`);
        }
        setShareButtonsEnabled(true);
        return;
      }


    }


  }

  setShareButtonsEnabled(false);

    try {
      const data = {
      files: [
      video,
      ],
      title: title,
      text: text,
      url: url,

    };
    console.log(navigator);


    await navigator.share(data);

    logText('Successfully sent share');
  } catch (error) {
    logError('Error sharing: ' + error);
  }
  setShareButtonsEnabled(true);
}

async function testWebShareDelay() {
  setShareButtonsEnabled(false);
  await sleep(6000);
  testWebShare();
}

function onLoad() {


let videourl = "./Keepsake_Video.mp4";


fetch(videourl)
  .then(response => response.blob())
  .then(blob => {

    video = new File([blob], 'Keepsake_Video.mp4', { type: blob.type });

    document.querySelector(".loading").style.display = "none";
    console.log(video);


  })
  .catch(error => {
    console.error('Error fetching the video:', error);
  });



document.querySelector('#share').addEventListener('click', testWebShare);


if (navigator.share === undefined) {
  setShareButtonsEnabled(false);
  if (window.location.protocol === 'http:') {
    window.location.replace(window.location.href.replace(/^http:/, 'https:'));
  } else {
    logError('Error: You need to use a browser that supports this draft ' + 'proposal.');
  }
}
}

window.addEventListener('load', onLoad);