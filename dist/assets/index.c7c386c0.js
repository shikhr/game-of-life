var f = Object.defineProperty;
var p = (n, e, t) =>
  e in n
    ? f(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (n[e] = t);
var h = (n, e, t) => (p(n, typeof e != 'symbol' ? e + '' : e, t), t);
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === 'childList')
        for (const d of o.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
      i.crossorigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossorigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = t(i);
    fetch(i.href, o);
  }
})();
class g {
  constructor(e, t = {}) {
    h(this, 'defaultOptions', {
      cellSize: 15,
      cellsX: 40,
      cellsY: 40,
      cellColor: '#FF9A24',
      gridColor: '#5a544b',
      canvasColor: '#38342E',
    });
    h(this, 'grid');
    (this.canvas = e),
      (this.ctx = this.canvas.getContext('2d')),
      (this.options = this.setOptions(t)),
      this.setCanvas(),
      this.initGrid(),
      (this.round = 0);
  }
  setCanvas() {
    (this.canvas.width = this.options.cellsX * this.options.cellSize),
      (this.canvas.height = this.options.cellsY * this.options.cellSize);
  }
  draw() {
    this.cleanGrid(), this.drawGrid(), this.drawCells();
  }
  drawCells() {
    this.ctx.fillStyle = this.options.cellColor;
    for (let t = 0; t < this.options.cellsX; t++)
      for (let s = 0; s < this.options.cellsY; s++)
        this.grid[t][s] &&
          this.ctx.fillRect(
            t * this.options.cellSize + 0.5,
            s * this.options.cellSize + 0.5,
            this.options.cellSize,
            this.options.cellSize
          );
  }
  cleanGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawGrid() {
    this.ctx.strokeStyle = this.options.gridColor;
    const e = 0.5;
    for (let t = 0; t <= this.options.cellsX; t++)
      this.ctx.beginPath(),
        this.ctx.moveTo(t * this.options.cellSize + e, 0),
        this.ctx.lineTo(t * this.options.cellSize + e, this.canvas.height),
        this.ctx.stroke();
    for (let t = 0; t <= this.options.cellsY; t++)
      this.ctx.beginPath(),
        this.ctx.moveTo(0, t * this.options.cellSize + e),
        this.ctx.lineTo(this.canvas.width, t * this.options.cellSize + e),
        this.ctx.stroke();
  }
  setOptions(e) {
    return { ...this.defaultOptions, ...e };
  }
  initGrid() {
    this.grid = new Array(this.options.cellsX);
    for (let e = 0; e < this.options.cellsX; e++)
      this.grid[e] = new Array(this.options.cellsY).fill(!1);
    this.draw();
  }
  setPoints(e) {
    e.forEach((t) => {
      const [s, i] = t;
      this.grid[s][i] = !0;
    }),
      this.draw();
  }
  togglePoint(e, t) {
    const s = Math.floor(e / this.options.cellSize),
      i = Math.floor(t / this.options.cellSize);
    (this.grid[s][i] = !this.grid[s][i]), this.draw();
  }
  calculateNeighbours(e, t) {
    let s = 0;
    for (let i = e - 1; i <= e + 1; i++)
      for (let o = t - 1; o <= t + 1; o++)
        i < 0 ||
          i > this.options.cellsX - 1 ||
          o < 0 ||
          o > this.options.cellsY - 1 ||
          (i === e && o === t) ||
          (this.grid[i][o] && s++);
    return s;
  }
  step() {
    const e = JSON.parse(JSON.stringify(this.grid));
    for (let t = 0; t < this.options.cellsX; t++)
      for (let s = 0; s < this.options.cellsY; s++) {
        const i = this.calculateNeighbours(t, s);
        this.grid[t][s]
          ? (i < 2 || i > 3) && (e[t][s] = !1)
          : i === 3 && (e[t][s] = !0);
      }
    (this.grid = e), this.round++, this.draw();
  }
  clearGrid() {
    this.initGrid(), (this.round = 0), this.draw();
  }
  randomise() {
    this.clearGrid();
    for (let e = 0; e < this.options.cellsX; e++)
      for (let t = 0; t < this.options.cellsY; t++)
        this.grid[e][t] = Math.random() < 0.3;
    (this.round = 0), this.draw();
  }
}
const a = document.getElementById('round-value'),
  c = document.getElementById('play'),
  m = document.getElementById('next'),
  v = document.getElementById('clear'),
  y = document.getElementById('randomise'),
  u = document.getElementById('canvas'),
  l = new g(u);
let r;
const x = () => {
    clearInterval(r),
      (r = void 0),
      l.clearGrid(),
      (c.textContent = 'Play'),
      (a.textContent = l.round);
  },
  E = () => {
    clearInterval(r), (r = void 0), (c.textContent = 'Play');
  };
y.addEventListener('click', (n) => {
  r || (l.randomise(), (a.textContent = l.round));
});
m.addEventListener('click', (n) => {
  r || (l.step(), (a.textContent = l.round));
});
c.addEventListener('click', (n) => {
  if (r) {
    E();
    return;
  }
  (c.textContent = 'Pause'),
    (r = setInterval(() => {
      l.step(), (a.textContent = l.round);
    }, 200));
});
v.addEventListener('click', (n) => {
  x();
});
u.addEventListener('click', (n) => {
  if (r) return;
  const e = n.currentTarget.getBoundingClientRect(),
    t = n.clientX - e.left,
    s = n.clientY - e.top;
  l.togglePoint(t, s);
});
