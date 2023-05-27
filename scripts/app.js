import Metronome from "./metronome.js"

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const substractBeats = document.querySelector('.substract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
const accentBtn = document.querySelector('.first-beat');
const accentCheckBox = document.querySelector('.accent');
const tap = document.querySelectorAll('.tap');

let metronome = new Metronome();

tempoDisplay.textContent = metronome.tempo;
measureCount.textContent = metronome.beatsPerBar;

  // Add touch effects for mobile displays
tap.forEach((element) => {
  // Add touchstart event listener
  element.addEventListener('touchstart', () => {
    element.classList.add('touch-hover-effect');
  });

  element.addEventListener('touchend', () => {
    // Remove touch effect
    element.classList.remove('touch-hover-effect');
  });
});

decreaseTempoBtn.addEventListener('click', () => {
  validateTempo();
  metronome.tempo--;
  updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
  validateTempo();
  metronome.tempo++;
  updateMetronome();
});
tempoSlider.addEventListener('input', () => {
  metronome.tempo = tempoSlider.value;
  updateMetronome();
});

startStopBtn.addEventListener('touchstart', () => {
  startStopBtn.classList.add('start-stop-touch');
})
startStopBtn.addEventListener('touchend', () => {
  startStopBtn.classList.remove('start-stop-touch');
})
startStopBtn.addEventListener('click', (event) => {
  event.preventDefault();
  metronome.startStop();
  if (metronome.isRunning) {
      startStopBtn.textContent = 'stop';
  }
  else {
      startStopBtn.textContent = 'start';
  }
});

substractBeats.addEventListener('click', () => {
  if (metronome.beatsPerBar <= 2) return;
  metronome.beatsPerBar--;
  measureCount.textContent = metronome.beatsPerBar;
});

addBeats.addEventListener('click', () => {
  if (metronome.beatsPerBar >= 16) return;
  metronome.beatsPerBar++;
  measureCount.textContent = metronome.beatsPerBar;
});

accentBtn.addEventListener('click', () => {
  if (!accentCheckBox.classList.contains('accent-selected')) {
    metronome.accent = true;
    accentCheckBox.classList.add('accent-selected');
  } else {
    metronome.accent = false;
    accentCheckBox.classList.remove('accent-selected');
  }
});

function updateMetronome() {
  tempoDisplay.textContent = metronome.tempo;
  tempoSlider.value = metronome.tempo;
  tempoText.textContent = tempoString();
}
function validateTempo() {
  if (metronome.tempo <= 20) return;
  if (metronome.tempo >= 280) return;
}

function tempoString() {
  return metronome.tempo <= 40 ? 'Lentissimo'
      : metronome.tempo <= 60 ? 'Largo'
      : metronome.tempo <= 66 ? 'Larghetto'
      : metronome.tempo <= 76 ? 'Adagio'
      : metronome.tempo <= 108 ? 'Andante'
      : metronome.tempo <= 120 ? 'Moderato'
      : metronome.tempo <= 168 ? 'Allegro'
      : metronome.tempo <= 176 ? 'Vivace'
      : metronome.tempo <= 200 ? 'Presto'
      : 'Prestissimo'
};
