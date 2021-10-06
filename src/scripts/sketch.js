let grid;
let cols;
let rows;
let resolution = 10;
let playing = false;

function setup() {
  createCanvas(800, 500);
  background(0);

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
  if(playing) {
    background(0);
    
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

  } else {
    if(mouseIsPressed) {
      let rect = new MyRect();
      rect.show();
  
      let i = rect.px / resolution;
      let j = rect.py / resolution;
      console.log("i(collumn) == ", i, " e j(row) == ", j);
      
      if(i < cols && j < rows && i >= 0 && j >= 0) {
        grid[i][j].value = 1;
      }
    }
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

  const playOrPause = () => {
    playing = !playing;
    playButton.value = playing ? "Pause" : "Play";
  }
  playButton.onclick = playOrPause;

  const clearButton = document.querySelector('.clear-button');
  clearButton.onclick = () => {

    background(0);

    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        grid[i][j] = new Cell(0);
      }
    }

    if(playing) {
      playing = false;
      playButton.value = "Play";
    }
  };

  const randomButton = document.querySelector('.random-button');
  randomButton.onclick = () => {

    background(0);

    if(playing) {
      playing = false;
      playButton.value = "Play";
    }

    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        grid[i][j] = new Cell(null);

        let x = i * resolution;
        let y = j * resolution;

        if(grid[i][j].value == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  };
});