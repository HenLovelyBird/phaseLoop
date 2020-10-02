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


// draw img of play button --> canvas:
var canvas = document.getElementById('play');
var context = canvas.getContext('2d');
var imageObj = new Image();

imageObj.onload = function () {
    context.drawImage(imageObj, 125, 40);
};
imageObj.src = 'play-64.png';

// toggle btwn play and spinner onclick
const ppbutton = document.getElementById("play");
ppbutton.addEventListener("click", playPause);

soundClip = document.getElementById("itsgonnarainClip.wav");
function playPause() {
    if (soundClip.paused) {
        soundClip.play();
        ppbutton.innerHTML = "Pause";
    }
    else {
        soundClip.pause();
        ppbutton.innerHTML = "Play";
    }
}

// draw canvas on img where the loop is, illustrate with lines the two loops as it plays:

