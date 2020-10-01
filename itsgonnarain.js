// audio and params
let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 5.05;
    sourceNode.loopEnd = 12.02;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);

    sourceNode.start(0, 5.05);
    sourceNode.stop(12.02, 1.12)
}
fetch('itsgonnarainClip.wav')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        startLoop(audioBuffer, -1);
        startLoop(audioBuffer, 1, 1.004);
    })
    .catch(e => console.error(e));

// canvas image --> canvas
window.onload = function () {
    let canvas = document.getElementById("play");
    let ctx = canvas.getContext("2d");
    let img = document.getElementById("play-64.png");
    ctx.drawImage(img, 10, 10);
};

// draw a triangle inside of the circle canvas
// window.onload = function draw() {
//     var canvas = document.getElementById('play');
//     if (canvas.getContext) {
//         var context = canvas.getContext('2d');

//         context.beginPath();
//         context.moveTo(50, 50);
//         context.lineTo(100, 75);
//         context.lineTo(100, 25);
//         context.fillStyle = 'green';
//         context.fill()
//         context.lineWidth = 10;
//         context.strokeStyle = 'black';
//         cotext.strokeStyle();
//     }
// }
