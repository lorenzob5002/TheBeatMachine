const drumSounds = {
  a: "drums/kick.wav",
  s: "drums/snare.wav",
  d: "drums/hihat.wav",
  f: "drums/openhat.wav",
  j: "drums/clap.wav",
  k: "drums/ride.wav",
  l: "drums/glass.wav",
  p: "drums/hey.wav",
};

// Audio context and gain nodes
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);
const gainNodes = {}; // Individual gain nodes per key

// Button event listeners
const drumButtons = document.querySelectorAll(".button");
drumButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.classList[0];
    playDrumSound(key);
    animateButton(key);
  });
});

// Keypress listener
document.addEventListener("keypress", function (event) {
  const key = event.key.toLowerCase();
  if (drumSounds[key]) {
    playDrumSound(key);
    animateButton(key);
  }
});

// Play drum sound using Web Audio API
function playDrumSound(key) {
  const soundFile = drumSounds[key];
  if (soundFile) {
    fetch(soundFile)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        // Create or reuse a gain node for the key
        if (!gainNodes[key]) {
          gainNodes[key] = audioContext.createGain();
          gainNodes[key].gain.value = 1;
        }

        source.connect(gainNodes[key]).connect(masterGain);
        source.start();
      });
  }
}

// animate button
function animateButton(key) {
  const button = document.querySelector("." + key);
  if (button) {
    button.classList.add("animation");
    setTimeout(() => {
      button.classList.remove("animation");
    }, 100);
  }
}

// sequencer integration
function playSoundForRow(row) {
  const keys = Object.keys(drumSounds);
  const key = keys[row];
  playDrumSound(key);
}

// update playSoundForKey to use gain sliders
function playSoundForKey(key) {
  const buffer = drumSounds[key];
  if (!buffer) return;

  const source = audioContext.createBufferSource();
  const gainNode = gainNodes[key] || audioContext.createGain();
  gainNodes[key] = gainNode;
  source.buffer = buffer;
  source.connect(gainNode);
  gainNode.connect(masterGain);
  source.start();
}

// Set up gain sliders
document.querySelectorAll(".gain-slider").forEach((slider) => {
  const key = slider.dataset.key;
  const gainNode = gainNodes[key] || audioContext.createGain();
  gainNodes[key] = gainNode;
  gainNode.gain.value = parseFloat(slider.value);
  gainNode.connect(masterGain);

  slider.addEventListener("input", () => {
    gainNode.gain.value = parseFloat(slider.value);
  });
});
