// audio and params
let audioContext = new AudioContext();

let sourceNode = audioContext.createBufferSource();
let pannerNode = audioContext.createStereoPanner();

function startLoop(audioBuffer, pan = 0, rate = 1) {

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 5.05;
    sourceNode.loopEnd = 12.02;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);

}
fetch('itsgonnarainClip.wav')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        startLoop(audioBuffer, -1);
        startLoop(audioBuffer, 1, 1.004);
    })
    .catch(e => console.error(e));

// toggle btwn imgs and play/pause onclick
let ppbutton = document.getElementById("playPause");
ppbutton.addEventListener("click", playPause);

let isPaused = true;
function playPause() {
    if (isPaused) {
        sourceNode.start(0, 5.05);
        isPaused = false;
        canvasSpinner.style.display = "block";
        canvas.style.display = "none";
    }
    else {
        sourceNode.stop(12.02, 1.12)
        isPaused = true;
        canvas.style.display = "block";
        canvasSpinner.style.display = "none";
    }

};

// draw img of play button --> canvas:
var canvas = document.getElementById('play');
var context = canvas.getContext('2d');
var imageObj = new Image();

imageObj.onload = function () {
    context.drawImage(imageObj, 125, 40);
};
imageObj.src = 'play-64.png';

// draw spinner --> canvas:
var canvasSpinner = document.getElementById('spin');
canvasSpinner.style.display = "none"
var contextSpinner = canvasSpinner.getContext('2d');
var imageObjSpinner = new Image();

imageObjSpinner.onload = function () {
    contextSpinner.drawImage(imageObjSpinner, 125, 40);
};
imageObjSpinner.src = 'spin'

// draw canvas on img where the loop is, illustrate with lines the two loops as it plays:

