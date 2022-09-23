import Game from '../src/game';
import { describe, it, expect } from 'vitest';

describe('game', () => {
  it('initialies canvas with default options', () => {
    const canvas = document.createElement('canvas');
    const game = new Game(canvas);

    expect(game.canvas).toBe(canvas);
    expect(game.options).toStrictEqual({
      cellSize: 10,
      cellsX: 80,
      cellsY: 100,
      cellColor: '#FF9A24',
      gridColor: '#FFDBB0',
      canvasColor: '#38342E',
    });
  });
});
