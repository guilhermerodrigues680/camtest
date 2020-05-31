const DIV_OUTPUT_JS = document.querySelector('#output-js');

function hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
  
if (hasGetUserMedia()) {
    console.log('ok! getUserMedia() is supported in your browser');
    DIV_OUTPUT_JS.innerHTML = "OK!";
} else {
    console.log('getUserMedia() is not supported in your browser');
    DIV_OUTPUT_JS.innerHTML = "SEM SUPORTE"
}