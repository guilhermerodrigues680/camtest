function hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
  
  if (hasGetUserMedia()) {
    alert('ok! getUserMedia() is supported in your browser');
  } else {
    alert('getUserMedia() is not supported in your browser');
  }