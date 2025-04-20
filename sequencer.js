const keyLabels = {
  a: "KCK",
  s: "SNR",
  d: "HH",
  f:"OH",
  j: "CLP",
  k: "RD",
  l: "GLS",
  p: "HEY",
};


const sequencer = document.getElementById("sequencer");
const steps = [];
const numRows = 8;
const numCols = 32;
let currentStep = 0;
let interval;


// build the grid immediately
const keys = Object.keys(drumSounds);

for (let i = 0; i < numRows; i++) {
 const rowLabel = document.createElement("div");
 rowLabel.className = "row-label";
 rowLabel.innerText = keyLabels[keys[i]];
 sequencer.appendChild(rowLabel);

 for (let j = 0; j < numCols; j++) {
   const step = document.createElement("button");
   step.className = "step";
   step.dataset.row = i;
   step.dataset.col = j;

if (j % 4 === 0){
  step.classList.add("big-beat");
}

   step.addEventListener("click", () => {
     step.classList.toggle("active");
   });

   sequencer.appendChild(step);
   steps.push(step);
 }
}

function startSequencer() {
stopSequencer();
const intervalTime = (60 / bpm) * 1000 / 4; // 8th notes at current bpm
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
}, intervalTime);
}


function stopSequencer() {
 clearInterval(interval);
 for (let step of steps) {
   step.classList.remove("playing");
 }
 currentStep = 0;
}

//tempo controls
const tempoSlider = document.getElementById("tempo");
const bpmDisplay = document.getElementById("bpm-display");
let bpm = 120;

tempoSlider.addEventListener("input", function () {
bpm = parseInt(this.value);
bpmDisplay.innerText = bpm;
if (interval) {
  startSequencer(); // restart sequencer with new bpm
}
});
