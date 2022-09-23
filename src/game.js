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
    /**@type {HTMLCanvasElement} */
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.options = this.setOptions(options);
    this.initGrid();
  }
  setOptions(options) {
    return { ...this.defaultOptions, ...options };
  }
  initGrid() {
    this.grid = new Array(this.options.cellsX);
    for (let i = 0; i < this.options.cellsX; i++) {
      this.grid[i] = new Array(this.options.cellsY).fill(false);
    }
  }
  setPoints(points) {
    points.forEach((point) => {
      const [x, y] = point;
      this.grid[x][y] = true;
    });
  }
  calculateNeighbours(x, y) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (
          i < 0 ||
          i > this.options.cellsX ||
          j < 0 ||
          j > this.options.cellsY
        ) {
          continue;
        }
        if (i === x && j === y) {
          continue;
        }
        if (this.grid[i][j]) {
          count++;
        }
      }
    }
    return count;
  }
}

export default Game;
