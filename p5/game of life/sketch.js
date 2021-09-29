let grid;
let cols;
let rows;
let resolution = 40;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(400,400);
  cols = width / resolution;
  rows = height / resolution;
  
  grid = make2DArray(10,10);
  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if(grid[i][j] == 1) {
        
        stroke(0);
        fill(255);
        // O quadrado que é criado é automaticamente branco
        rect(x,y,resolution,resolution);
      }
    }
  }
  
  let next = make2DArray(cols, rows);
  // Compute next based on grid
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {

      // Edges
      if(i == 0 || i == (cols - 1) || j == 0 || j == (rows - 1)) {
        next[i][j] = grid[i][j];
      } else {

        // Count live neighbors
        let neighbors = countNeighbors(grid, i, j);
        let state = grid[i][j];    

        if(state == 0 && neighbors == 3) {
          next[i][j] = 1;

        } else if(state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;

        } else {
          next[i][j] = state;
        }
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  let i = -1,j = -1;
  let stoppingPointInRows = 2;
  let stoppingPointInColumns = 2;

  // if(x == 0) {
  //   j = 0;
  // }
  // if(y == 0) {
  //   i = 0;
  // }
  // if(x == (cols - 1)) {
  //   stoppingPointInColumns = 1;
  // }
  // if(y == (rows - 1)) {
  //   stoppingPointInRows = 1;
  // }

  for(; i < stoppingPointInRows; i++) {
    for(; j < stoppingPointInColumns; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[x][y];
  return sum;
}