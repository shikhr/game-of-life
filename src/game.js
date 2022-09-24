class Game {
  defaultOptions = {
    cellSize: 15,
    cellsX: 40,
    cellsY: 40,
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
    this.setCanvas();
    this.initGrid();
    this.round = 0;
  }
  setCanvas() {
    this.canvas.width = this.options.cellsX * this.options.cellSize;
    this.canvas.height = this.options.cellsY * this.options.cellSize;
  }
  draw() {
    this.cleanGrid();
    this.drawGrid();
    this.drawCells();
  }
  drawCells() {
    const gap = 0.5;
    this.ctx.fillStyle = this.options.cellColor;
    for (let i = 0; i < this.options.cellsX; i++) {
      for (let j = 0; j < this.options.cellsY; j++) {
        if (this.grid[i][j]) {
          this.ctx.fillRect(
            i * this.options.cellSize + 0.5,
            j * this.options.cellSize + 0.5,
            this.options.cellSize,
            this.options.cellSize
          );
        }
      }
    }
  }
  cleanGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawGrid() {
    const gap = 0.5;
    for (let i = 0; i <= this.options.cellsX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.options.cellSize + gap, 0);
      this.ctx.lineTo(i * this.options.cellSize + gap, this.canvas.height);
      this.ctx.stroke();
    }
    for (let j = 0; j <= this.options.cellsY; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j * this.options.cellSize + gap);
      this.ctx.lineTo(this.canvas.width, j * this.options.cellSize + gap);
      this.ctx.stroke();
    }
  }
  setOptions(options) {
    return { ...this.defaultOptions, ...options };
  }

  initGrid() {
    this.grid = new Array(this.options.cellsX);
    for (let i = 0; i < this.options.cellsX; i++) {
      this.grid[i] = new Array(this.options.cellsY).fill(false);
    }
    this.draw();
  }

  setPoints(points) {
    points.forEach((point) => {
      const [x, y] = point;
      this.grid[x][y] = true;
    });
    this.draw();
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
    this.draw();
  }
  clearGrid() {
    this.initGrid();
    this.round = 0;
    this.draw();
  }
  randomise() {
    this.clearGrid();
    for (let i = 0; i < this.options.cellsX; i++) {
      for (let j = 0; j < this.options.cellsY; j++) {
        this.grid[i][j] = Math.random() < 0.3;
      }
    }
    this.draw();
  }
}

export default Game;
