'use strict';

const DIV_OUTPUT_JS = document.querySelector('#output-js');

const videoElement = document.querySelector('#video');
const videoSelect = document.querySelector('select#videoSource');

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

    if (device.kind === 'videoinput') {
      option.value = device.deviceId;
      option.text = device.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
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

  // Se houver device id preenche
  const constraints = {
    audio: false,
    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
  };

  console.log(constraints)
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}


videoSelect.onchange = start;

// Preenche as opcoes disponiveis
// navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

start();