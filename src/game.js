class Game {
  defaultOptions = {
    cellSize: 10,
    cellsX: 80,
    cellsY: 100,
    cellColor: '#FF9A24',
    gridColor: '#FFDBB0',
    canvasColor: '#38342E',
  };
  grid;
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = this.setOptions(options);
    this.initGrid();
  }
  setOptions(options) {
    return { ...this.defaultOptions, ...options };
  }
  initGrid() {
    this.grid = new Array(this.options.cellsX).fill(
      new Array(this.options.cellsY).fill(false)
    );
  }
}

export default Game;
