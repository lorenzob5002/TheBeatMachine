const drumLabels = {
  a: "KCK",
  s: "SNR",
  d: "HH",
  f: "OH",
  j: "CLP",
  k: "RD",
  l: "GLS",
  p: "HEY",
};

const sequencer = document.getElementById("sequencer");
const steps = [];
const numRows = 8;
const numCols = 16;
let currentStep = 0;
let interval;

const keys = Object.keys(drumSounds);
const gainNodes = {}; // gain node storage

for (let i = 0; i < numRows; i++) {
  const key = keys[i];

  // Row label
  const rowLabel = document.createElement("div");
  rowLabel.className = "row-label";
  rowLabel.innerText = drumLabels[key] || key;
  sequencer.appendChild(rowLabel);

  // Gain slider
  const gainSlider = document.createElement("input");
  gainSlider.type = "range";
  gainSlider.min = 0;
  gainSlider.max = 1;
  gainSlider.step = 0.01;
  gainSlider.value = 1;
  gainSlider.className = "gain-slider";
  gainSlider.dataset.key = key;
  sequencer.appendChild(gainSlider);

  // Web Audio API setup
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = gainSlider.value;
  gainNode.connect(audioCtx.destination);
  gainNodes[key] = { gainNode, audioCtx };

  gainSlider.addEventListener("input", (e) => {
    gainNodes[key].gainNode.gain.value = parseFloat(e.target.value);
  });

  // Step buttons
  for (let j = 0; j < numCols; j++) {
    const step = document.createElement("button");
    step.className = "step";
    step.dataset.row = i;
    step.dataset.col = j;

    step.addEventListener("click", () => {
      step.classList.toggle("active");
    });

    sequencer.appendChild(step);
    steps.push(step);
  }
}

function startSequencer() {
  stopSequencer();

  const bpm = typeof getTempo === "function" ? getTempo() : 120;
  const intervalMs = (60 / bpm) * 1000 / 4;

  interval = setInterval(() => {
    for (let step of steps) {
      step.classList.remove("playing");
    }

    for (let i = 0; i < numRows; i++) {
      const index = i * numCols + currentStep;
      const step = steps[index];
      step.classList.add("playing");

      if (step.classList.contains("active")) {
        playSoundForRow(i);
      }
    }

    currentStep = (currentStep + 1) % numCols;
  }, intervalMs);
}

function stopSequencer() {
  clearInterval(interval);
  for (let step of steps) {
    step.classList.remove("playing");
  }
  currentStep = 0;
}
