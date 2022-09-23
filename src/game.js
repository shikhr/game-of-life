class Game {
  defaultOptions = {
    cellSize: 10,
    cellsX: 80,
    cellsY: 100,
    cellColor: '#FF9A24',
    gridColor: '#FFDBB0',
    canvasColor: '#38342E',
  };
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = this.setOptions(options);
  }
  setOptions(options) {
    return { ...this.defaultOptions, ...options };
  }
}

export default Game;
