class Cell {
  constructor(value) {
    if(value === null) {
      this.value = floor(random(2));
    } else {
      this.value = value;
    }
  }
}

let grid;
let cols;
let rows;
let resolution = 10;
let rects = [];
let playing = false;

class MyRect {
  constructor() {
    this.px = pwinMouseX - (pwinMouseX % resolution);
    this.py = pwinMouseY - (pwinMouseY % resolution);
    this.x = winMouseX - (winMouseX % resolution);
    this.y = winMouseY - (winMouseY % resolution);
  }
  show() {
    stroke(0);
    fill(255);
    rect(this.px, this.py, resolution, resolution);
  }
}

function setup() {
  createCanvas(800, 500);
  cols = width / resolution;
  rows = height / resolution;

  console.log("COLUMNS == ", cols);
  console.log("ROWS == ", rows);
  
  grid = make2DArray(cols, rows);

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(0);
    }
  }
}

function draw() {
  background(0);

  if(!playing) {
    if(mouseIsPressed) {
      let rect = new MyRect();
      rects.push(rect);
  
      let i = rect.px / resolution;
      let j = rect.py / resolution;
      console.log("i(collumn) == ", i, " e j(row) == ", j);
      
      if(i < cols && j < rows) {
        grid[i][j].value = 1;
      }
    }
  
    for(let rect of rects) {
      rect.show();
    }

  } else {
    
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;

        if(grid[i][j].value == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }

    let next = make2DArray(cols, rows);
    // Compute next based on grid
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {

        let state = grid[i][j].value;
        // Count live neighbors!
        let neighbors = countNeighbors(grid, i, j);

        if(state == 0 && neighbors == 3) {
          next[i][j] = new Cell(1);

        } else if(state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = new Cell(0);

        } else {
          next[i][j] = new Cell(state);
        }
      }
    }
    grid = next;
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row].value;
    }
  }
  sum -= grid[x][y].value;
  return sum;
}

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-button');
  playButton.onclick = () => {
    playing = !playing;
  };
});