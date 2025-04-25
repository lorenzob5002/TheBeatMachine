// Assuming drumSounds = { a: AudioBuffer, s: AudioBuffer, ... }
const gainNodes = {};

// Setup gain nodes for each drum sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);

for (const key in drumSounds) {
  const gain = audioContext.createGain();
  gain.connect(masterGain);
  gainNodes[key] = gain;
}

// Play function
function playSoundForKey(key) {
  const buffer = drumSounds[key];
  if (!buffer) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNodes[key]);
  source.start();
}

// Link sliders
document.querySelectorAll(".gain-slider").forEach((slider) => {
  const key = slider.dataset.key;
  slider.addEventListener("input", () => {
    gainNodes[key].gain.value = parseFloat(slider.value);
  });
});
