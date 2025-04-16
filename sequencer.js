const sequencer = document.getElementById("sequencer");
const steps = [];
const numRows = 8;
const numCols = 16;
let currentStep = 0;
let interval;

// build the grid immediately
const keys = Object.keys(drumSounds);

for (let i = 0; i < numRows; i++) {
  const rowLabel = document.createElement("div");
  rowLabel.className = "row-label";
  rowLabel.innerText = keys[i];
  sequencer.appendChild(rowLabel);

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
  }, 200);
}

function stopSequencer() {
  clearInterval(interval);
  for (let step of steps) {
    step.classList.remove("playing");
  }
  currentStep = 0;
}
