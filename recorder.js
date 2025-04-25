let mediaRecorder;
let recordedChunks = [];

function startRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") return;

  const dest = audioContext.createMediaStreamDestination();
  masterGain.connect(dest);

  mediaRecorder = new MediaRecorder(dest.stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) recordedChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drum-machine-output.wav";
    a.click();
    recordedChunks = [];
  };

  mediaRecorder.start();
  console.log("Recording started");
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    console.log("Recording stopped");
  }
}
