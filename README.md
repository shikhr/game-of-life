# Conway's Game Of life

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a cellular automaton that is played on a 2D square grid. Each square (or "cell") on the grid can be either alive or dead, and they evolve according to the following rules:

## Rules

- **Alive cell** – Fewer than 2 alive neighbours – **dies** (underpopulation).
- **Alive cell** – 2 or 3 neighbours – continues to **live** (perfect situation).
- **Alive cell** – More than 3 alive neighbours – **dies** (overpopulation).
- **Dead cell** – Exactly three alive neighbours – becomes **alive** (reproduction).
