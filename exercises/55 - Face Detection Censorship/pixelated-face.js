const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector({ fastMode: true });
const optionsInputs = document.querySelectorAll(
  '.controls input[type="range"]'
);

// write a function that will populate a users video.

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}
function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  console.log({ width, height, top, left });
}

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawFace);
  // ask the browser when the next animation frame is, and tell it to run detect for us.
  requestAnimationFrame(detect);
}

populateVideo().then(detect);
