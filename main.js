import './style.css';
import Game from './src/game';

const roundEl = document.getElementById('round-value');
const playEl = document.getElementById('play');
const nextEl = document.getElementById('next');
const clearEL = document.getElementById('clear');
const randomiseEL = document.getElementById('randomise');

const game = new Game(document.getElementById('canvas'));

let timer = undefined;

const stopGame = () => {
  clearInterval(timer);
  timer = undefined;
  game.clearGrid();
  playEl.textContent = 'Play';
  roundEl.textContent = game.round;
};

const pauseGame = () => {
  clearInterval(timer);
  timer = undefined;
  playEl.textContent = 'Play';
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
  timer = setInterval(() => {
    game.step();
    roundEl.textContent = game.round;
  }, 200);
});

clearEL.addEventListener('click', (e) => {
  stopGame();
});
