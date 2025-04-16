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

const drumButtons = document.querySelectorAll(".button");
drumButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const key = this.classList[0];
    playDrumSound(key);
    animateButton(key);
  });
});

document.addEventListener("keypress", function (event) {
  const key = event.key.toLowerCase();
  if (drumSounds[key]) {
    playDrumSound(key);
    animateButton(key);
  }
});

function playDrumSound(key) {
  const soundFile = drumSounds[key];
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }
}

function animateButton(key) {
  const button = document.querySelector("." + key);
  if (button) {
    button.classList.add("animation");
    setTimeout(() => {
      button.classList.remove("animation");
    }, 100);
  }
}

// For sequencer integration
function playSoundForRow(row) {
  const keys = Object.keys(drumSounds);
  const key = keys[row];
  playDrumSound(key);
}
