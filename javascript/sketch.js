const container = document.querySelector('.container');
const size = document.querySelector('.size');
const setSize = document.querySelector('.setSize');
const clear = document.querySelector('.clear');
const statusbar = document.querySelector('.status');
const colorpicker = document.querySelector('.colorpalette');
const sizeText = document.querySelector('.sizeText')
const displayWindow = document.querySelector('.lower')
const randomise = document.querySelector('.randomise')
const start = document.querySelector('.start')
const bfs = document.querySelector('.BFS')
var matrix = [];
var startPoint = [0,0];
var endPoint = [0,0];
var matrixSize = size.value;

bfs.addEventListener('click', bfsFunc);
randomise.addEventListener('click', funcRandomise);
clear.addEventListener('click', clearcanvas);
setSize.addEventListener('click', resetGrid);
size.addEventListener('input', updateSize);
start.addEventListener('click', funcStart)
colorpicker.oninput = (e) => paintColor = e.target.value;

function funcRandomise(){
  var i = 1;
  for (const line of matrix){
    for (const square of line){
      setTimeout(() => square.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16), 0.1*i);
      i++;
    }
  }
}

function funcStart(){
  if (startPoint[0] <= matrixSize && startPoint[1] <= matrixSize){
    matrix[startPoint[0]][startPoint[1]].style.backgroundColor = "black";
  }
  if (endPoint[0] <= matrixSize && endPoint[1] <= matrixSize){
    matrix[endPoint[0]][endPoint[1]].style.backgroundColor = "black";
  }
  startPoint = []
  endPoint = []
  startPoint.push(Math.floor(Math.random()*(matrixSize)))
  startPoint.push(Math.floor(Math.random()*(matrixSize)))
  var endPoint0 = Math.floor(Math.random()*(matrixSize));
  while (endPoint0 == startPoint[0]){
    endPoint0 = Math.floor(Math.random()*(matrixSize));
  }
  endPoint.push(endPoint0)

  var endPoint1 = Math.floor(Math.random()*(matrixSize));
  while (endPoint1 == startPoint[1]){
    endPoint1 = Math.floor(Math.random()*(matrixSize));
  }
  endPoint.push(endPoint1)
 
  matrix[startPoint[0]][startPoint[1]].style.backgroundColor = "red";
  matrix[endPoint[0]][endPoint[1]].style.backgroundColor = "blue";
}

function updateSize(){
  sizeText.innerHTML = size.value + "x" + size.value+"  Px";
}

function resetGrid(){
  if (isNaN(parseInt(size.value)) == true){
    statusbar.textContent = 'Please enter integers only in canvas size field';
  } else {
    container.innerHTML = '';
    makeGrid(size.value, size.value);
  }
}

function clearcanvas(e){
  let canvas = document.querySelectorAll('.gridbox');
  canvas.forEach(gridbox => {
    gridbox.style.backgroundColor = 'black';
  });
}

function color(e){
  if (mouseDown){
    this.style.backgroundColor = paintColor;
  }
}

function makeGrid(rows, cols) {
  let tempGrid = container
  tempGrid.style.textAlign = 'centre';
  tempGrid.style.display = 'grid';
  tempGrid.style.gridTemplateColumns = 'repeat('+ cols +', auto)';
  tempGrid.style.gridTemplateRows = 'repeat('+ cols +', auto)';
  var paddingSize = (container.clientHeight/cols)
  matrix = []
  matrixSize = rows
  for (let i = 0; i<rows; i++){
    matrix.push([])
    for (let j = 0; j<cols; j++){
      let tempcol = document.createElement('div');
      tempcol.addEventListener('mouseover', color);
      tempcol.classList.add("gridbox")
      tempcol.style.backgroundColor = 'black';
      tempcol.style.padding = (paddingSize)+"px";
      tempGrid.appendChild(tempcol);
      matrix[i].push(tempcol);
    }
  }
}

function bfsFunc(){
  var queue = [];
  const parent = {};
  queue.push({row: startPoint[0], col: startPoint[1]});
  var time = 1;
  function colorfill(time, color, cur) {
    setTimeout(() => {cur.style.backgroundColor = color}, 25*time);  
  }
  while (queue.length > 0){
    const {row, col}= queue.shift()
    const current = matrix[row][col]
    const currentKey = `${row}x${col}`
    if (row == endPoint[0] && col == endPoint[1]){
      break
    }
    if (row == startPoint[0] && col == startPoint[1]){
      colorfill(time, "red", current);
      time++;
    } else {
      colorfill(time, "grey", current);
      time++;
    }

    const neighbours = [
      {row: row-1,col},
      {row: row + 1,col},
      {row,col: col+1},
      {row,col: col-1}
    ]

    for (let i = 0; i < neighbours.length; i++){
      const nRow = neighbours[i].row;
      const nCol = neighbours[i].col;

      if (nRow < 0 || nRow > matrix.length-1){
        continue
      }
      if (nCol < 0 || nCol > matrix.length-1){
        continue
      }
      
      const key = `${nRow}x${nCol}`;

      if (key in parent){
        continue;
      }

      parent[key] = {
        key: currentKey,
        cell: current
      }
      queue.push(neighbours[i]);
    }
  }
  const path = [];
  let currentKey = `${endPoint[0]}x${endPoint[1]}`
  let current = matrix[endPoint[0]][endPoint[1]]
  while(current != matrix[startPoint[0]][startPoint[1]]){
    path.push(current);
    const {key, cell} = parent[currentKey];
    current = cell;
    currentKey = key;    
  }
  function color(time, color, i) {
    setTimeout(() => {path[i].style.backgroundColor = color}, 25*time);  
  }
  console.dir(path)
  for (i=1; i<path.length;i++){
     color(time, "white", i);
     time++;
  }
}


let mouseDown = false
let paintColor = 'red';
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

makeGrid(size.value,size.value);


//comment
  
