function hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
  
if (hasGetUserMedia()) {
    console.log('ok! getUserMedia() is supported in your browser');
} else {
    console.log('getUserMedia() is not supported in your browser');
}