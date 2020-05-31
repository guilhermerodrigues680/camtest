'use strict';

const DIV_OUTPUT_JS = document.querySelector('#output-js');

const videoElement = document.querySelector('#video');
const videoSelect = document.querySelector('select#videoSource');
const btnShare = document.querySelector('#btn-share-photo');
const btnTake = document.querySelector('#btn-take-photo');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;

  console.log(stream);
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfo) {
  while (videoSelect.firstChild) {
    videoSelect.removeChild(videoSelect.firstChild);
  }

  for (let idx = 0; idx < deviceInfo.length; idx++) {
    const device = deviceInfo[idx];
    const option = document.createElement('option');
    // const option2 = document.createElement('option');

    if (device.kind === 'videoinput') {
      option.value = device.deviceId;
      option.text = device.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);

      // option2.value = device.deviceId;
      // option2.text = device.label || `camera ${videoSelect.length + 1}`;
      // videoSelect.appendChild(option2);
    }
    
    console.log(device);
  }

  console.log(deviceInfo);
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
  // Se houver algum processo para eles
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  console.log(videoSource)

  // Se houver device id preenche
  const constraints = {
    audio: false,
    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
  };

  console.log(constraints)
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}


videoSelect.onchange = start;

// navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

btnShare.onclick = function (params) {
  console.log('ola mundo')
  start();
}

btnTake.onclick = function (params) {
  console.log(params)
  canvas.getContext('2d').filter = "sepia(0.8)";
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}