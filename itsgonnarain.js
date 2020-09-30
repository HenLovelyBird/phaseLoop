let audioContext = new AudioContext();

fetch('itsgonnarainClip.wav')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        let sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = false;
        sourceNode.loopStart = 5.00;
        sourceNode.loopEnd = 9.00;
        sourceNode.connect(audioContext.destination);
        sourceNode.start(0, 5.00);
    })
    .catch(e => console.error(e));