import Game from '../src/game';
import { describe, it, expect } from 'vitest';

const gameOptions = {
  cellSize: 10,
  cellsX: 80,
  cellsY: 100,
  cellColor: '#FF9A24',
  gridColor: '#FFDBB0',
  canvasColor: '#38342E',
};

describe('game', () => {
  const canvas = document.createElement('canvas');

  it('initialies canvas with default options', () => {
    const game = new Game(canvas);

    expect(game.canvas).toBe(canvas);
    expect(game.options).toStrictEqual(gameOptions);
  });

  it('initialises default arrray with false values', () => {
    const game = new Game(canvas);

    expect(game.grid.length).toBe(gameOptions.cellsX);
    expect(game.grid[0].length).toBe(gameOptions.cellsY);
    expect(game.grid[0][0]).toBe(false);
  });
});
