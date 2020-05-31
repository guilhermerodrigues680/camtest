'use strict';

const DIV_OUTPUT_JS = document.querySelector('#output-js');

const videoElement = document.querySelector('#video');
const videoSelect = document.querySelector('select#videoSource');
const btnShare = document.querySelector('#btn-share-photo');
const btnTake = document.querySelector('#btn-take-photo');
const btnSeePhoto = document.querySelector('#btn-see-photo');
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

btnShare.onclick = function (event) {
  start();
}

btnTake.onclick = function (event) {
  console.log('Video size: ', videoElement.videoWidth, videoElement.videoHeight)
  console.log('Video Container: ', videoElement.clientWidth, videoElement.clientHeight)
  // canvas.getContext('2d').filter = "sepia(0.8)";
  // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

  let ctx = canvas.getContext('2d');
  // const f = new FontFace("Permanent Marker", "url(https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap)");
  // f.load().then(function () {
  // });
    ctx.font = "normal 30px 'Permanent Marker'";

    let grd = ctx.createLinearGradient(canvas.width - 130, canvas.height - 130, canvas.width - 10, canvas.height - 10);
    // grd.addColorStop(0, "red");
    // grd.addColorStop(1, "white");
    // grd.addColorStop(0, "#656fd8bb");
    // grd.addColorStop(1, "#9fa7ffbb");
    grd.addColorStop(0, "#9fa7ffdd");
    grd.addColorStop(1, "#ffffffdd");
    ctx.fillStyle = grd;
    
    // ctx.fillStyle = "#656fd8";
    // ctx.fillStyle = "#9fa7ff";//

    ctx.textAlign = "end";
    ctx.fillText("Academia da Lari", canvas.width - 10, canvas.height -10);
    // ctx.strokeStyle = "#656fd8";
    ctx.strokeStyle = "#00000066";
    ctx.strokeText("Academia da Lari", canvas.width - 10, canvas.height -10);

    const icon = document.querySelector('#icon-academia-lari');
    ctx.drawImage(icon, 0, 0, 180, 180, canvas.width - 310, canvas.height - 45, 40, 40)

}

btnSeePhoto.onclick = function (event) {
  window.location.href = canvas.toDataURL();
}

// btnShare.click();