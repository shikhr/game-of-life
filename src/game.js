class Game {
  defaultOptions = {
    cellSize: 10,
    cellsX: 70,
    cellsY: 70,
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
    this.canvas.width = this.options.cellsX * this.options.cellSize;
    this.canvas.height = this.options.cellsY * this.options.cellSize;
    this.initGrid();
    this.round = 0;
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
          i > this.options.cellsX - 1 ||
          j < 0 ||
          j > this.options.cellsY - 1
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

  step() {
    const buffer = JSON.parse(JSON.stringify(this.grid));

    for (let i = 0; i < this.options.cellsX; i++) {
      for (let j = 0; j < this.options.cellsY; j++) {
        const aliveCount = this.calculateNeighbours(i, j);
        if (this.grid[i][j]) {
          if (aliveCount < 2 || aliveCount > 3) {
            buffer[i][j] = false;
          }
        } else {
          if (aliveCount === 3) {
            buffer[i][j] = true;
          }
        }
      }
    }
    this.grid = buffer;
    this.round++;
  }
  clearGrid() {
    this.initGrid();
    this.round = 0;
  }
  randomise() {
    this.clearGrid();
    for (let i = 0; i < this.options.cellsX; i++) {
      for (let j = 0; j < this.options.cellsY; j++) {
        this.grid[i][j] = Math.random() < 0.3;
      }
    }
  }
}

export default Game;
