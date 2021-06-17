var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var qrForm = document.getElementById("qrForm");
var qrFormInput = document.getElementById("qrFormInput");

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Use facingMode: environment to attempt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

function tick() {
  loadingMessage.innerText = "⌛ Loading video...";

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    
    if (code) {

      drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#a98467");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#a98467");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#a98467");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#a98467");

      outputMessage.hidden = true;
      qrForm.hidden = false;
      qrFormInput.value = code.data;
      var qrcode = code.data;
      console.log(code.data);

    }
  }
  
  requestAnimationFrame(tick);
}
