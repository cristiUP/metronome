
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const substractBeats = document.querySelector('.substract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
const accentsField = document.querySelector('.accents-field');
const tap = document.querySelectorAll('.tap');
const stressBeat = document.getElementsByClassName('accent');

let metronome = new Metronome();

tempoDisplay.textContent = metronome.tempo;
measureCount.textContent = metronome.beatsPerBar;

// loaded the first 4 beats for accents
window.addEventListener('load', () => {
  displayBeats();
});

  // Add touch effects for mobile displays
tap.forEach((element) => {
  // Add touchstart event listener
  element.addEventListener('touchstart', () => {
    element.classList.add('touch-hover-effect');
  },{ passive: true});

  element.addEventListener('touchend', () => {
    // Remove touch effect
    element.classList.remove('touch-hover-effect');
  },{ passive: true});
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
},{ passive: true});
startStopBtn.addEventListener('touchend', () => {
  startStopBtn.classList.remove('start-stop-touch');
},{ passive: true});
startStopBtn.addEventListener('click', () => {
  metronome.startStop();
  if (metronome.isRunning) {
      startStopBtn.textContent = 'stop';
  }
  else {
      startStopBtn.textContent = 'start';
  };
});

substractBeats.addEventListener('click', () => {
  if (metronome.beatsPerBar <= 2) return;
  metronome.accent.pop();
  metronome.beatsPerBar--;
  measureCount.textContent = metronome.beatsPerBar;
  accentsField.innerHTML = '';
  displayBeats();
});

addBeats.addEventListener('click', () => {
  if (metronome.beatsPerBar >= 12) return;
  metronome.accent.push(false);
  metronome.beatsPerBar++;
  measureCount.textContent = metronome.beatsPerBar;
  accentsField.innerHTML = '';
  displayBeats();
  });

function updateMetronome() {
  tempoDisplay.textContent = metronome.tempo;
  tempoSlider.value = metronome.tempo;
  tempoText.textContent = tempoString();
};
function validateTempo() {
  if (metronome.tempo <= 20) return;
  if (metronome.tempo >= 280) return;
};

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

function displayBeats() {
  for (let i = 0; i <= metronome.accent.length - 1; i++) {
    if (metronome.accent[i]) {
      let beatSpan = document.createElement('span');
      beatSpan.className = 'accent tap accent-selected';
      accentsField.appendChild(beatSpan);
    } else {
      let beatSpan = document.createElement('span');
      beatSpan.className = 'accent tap';
      accentsField.appendChild(beatSpan);
    }
  }
    updateAccent();
};

function updateAccent() {
  for (let i = 0; i < stressBeat.length; i++) {
    stressBeat[i].addEventListener('click', () => {
      if (!stressBeat[i].classList.contains('accent-selected')) {
        metronome.accent[i] = true;
        stressBeat[i].classList.add('accent-selected');
      } else {
        metronome.accent[i] = false;
        stressBeat[i].classList.remove('accent-selected');
      };
    });
  };
};
