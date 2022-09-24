import './style.css';
import Game from './src/game';

const roundEl = document.getElementById('round-value');
const playEl = document.getElementById('play');
const nextEl = document.getElementById('next');
const clearEL = document.getElementById('clear');
const randomiseEL = document.getElementById('randomise');
const canvasEl = document.getElementById('canvas');

const game = new Game(canvasEl);

let timer = undefined;

const stopGame = () => {
  clearInterval(timer);
  timer = undefined;
  game.clearGrid();
  playEl.textContent = 'Play';
  clearEL.textContent = 'Clear';
  roundEl.textContent = game.round;
  randomiseEL.disabled = false;
  nextEl.disabled = false;
};

const pauseGame = () => {
  clearInterval(timer);
  timer = undefined;
  playEl.textContent = 'Play';
  clearEL.textContent = 'Clear';
  randomiseEL.disabled = false;
  nextEl.disabled = false;
};

randomiseEL.addEventListener('click', (e) => {
  if (timer) {
    return;
  }
  game.randomise();
  roundEl.textContent = game.round;
});

nextEl.addEventListener('click', (e) => {
  if (timer) {
    return;
  }
  game.step();
  roundEl.textContent = game.round;
});

playEl.addEventListener('click', (e) => {
  if (timer) {
    pauseGame();
    return;
  }
  playEl.textContent = 'Pause';
  clearEL.textContent = 'Stop';
  randomiseEL.disabled = true;
  nextEl.disabled = true;
  timer = setInterval(() => {
    game.step();
    roundEl.textContent = game.round;
  }, 200);
});

clearEL.addEventListener('click', (e) => {
  stopGame();
});

canvasEl.addEventListener('click', (e) => {
  if (timer) {
    return;
  }
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  game.togglePoint(x, y);
});
