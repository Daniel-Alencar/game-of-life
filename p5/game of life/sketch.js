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
      // Count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j); 
    }
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  let i = -1,j = -1;

  for(; i < stopped; i++) {
    for(; j < stopped; j++) {
      sum += grid[x + i][y + j]
    }
  }
  sum -= grid[x][y];
  return sum;
}