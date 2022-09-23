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

const getTestGrid = (points) => {
  const grid = new Array(gameOptions.cellsX);
  for (let i = 0; i < gameOptions.cellsX; i++) {
    grid[i] = new Array(gameOptions.cellsY).fill(false);
  }
  if (points) {
    points.forEach((point) => {
      const [x, y] = point;
      grid[x][y] = true;
    });
  }

  return grid;
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

  it('can calculate total alive neighbours', () => {
    const game = new Game(canvas, { cellsX: 10, cellsY: 10 });
    game.setPoints([
      [5, 4],
      [5, 6],
      [4, 4],
      [4, 5],
      [0, 1], //non-neighbour
      [9, 9], //non-neighbour
    ]);

    expect(game.calculateNeighbours(5, 5)).toBe(4);
  });
});
