const visualizer = document.getElementById("visualizer");
const visual = document.getElementById("visual");
visual.width = window.innerWidth;
visual.height = window.innerHeight;

const ctx = visual.getContext("2d");
audio.crossOrigin = "anonymous";

var currentAudio = audio.src;

audio.onplay = function () {
    const audioCtx = new AudioContext()
    
    let audioSource = null;
    let analyser = null;

    if (audioSource === null | audio.src != currentAudio) {
        audioSource = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
    }

    if (audio.src != currentAudio) {
        currentAudio = audio.src;
    }

    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = visual.width / bufferLength;

    let x = 0;
    function animate() {
        x = 0;
        ctx.clearRect(0, 0, visual.width, visual.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer({ bufferLength, dataArray, barWidth });

        requestAnimationFrame(animate);
    }

    const drawVisualizer = ({ bufferLength, dataArray, barWidth }) => {
        let barHeight;
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            const red = barHeight + (25 * (i/bufferLength));
            const green = 200 * (i/bufferLength);
            const blue = 50;
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(visual.width / 2 - x, visual.height - barHeight, barWidth, barHeight)
            ctx.fillRect(visual.width / 2 + x, visual.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }
    }

    animate();

}
