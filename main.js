import './style.css';
import Game from './src/game';

const roundEl = document.getElementById('round-value');
const playEl = document.getElementById('play');
const nextEl = document.getElementById('next');
const clearEL = document.getElementById('clear');
const randomiseEL = document.getElementById('randomise');

const game = new Game(document.getElementById('canvas'));
