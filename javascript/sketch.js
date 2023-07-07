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
const matrix = [];
var startPoint = [0,0];
var endPoint = [0,0];
var matrixSize = size.value;

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
  matrix[startPoint[0]][startPoint[1]].style.backgroundColor = "black";
  matrix[endPoint[0]][endPoint[1]].style.backgroundColor = "black";
  startPoint = []
  endPoint = []
  startPoint.push(Math.floor(Math.random()*(matrixSize-1)))
  startPoint.push(Math.floor(Math.random()*(matrixSize-1)))
  endPoint.push(Math.floor(Math.random()*(matrixSize-1)))
  endPoint.push(Math.floor(Math.random()*(matrixSize-1)))
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
  matrixSize = rows;
  let tempGrid = container
  tempGrid.style.textAlign = 'centre';
  tempGrid.style.display = 'grid';
  tempGrid.style.gridTemplateColumns = 'repeat('+ cols +', auto)';
  tempGrid.style.gridTemplateRows = 'repeat('+ cols +', auto)';
  var paddingSize = (container.clientHeight/cols)
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
  console.log(matrix)
}

function startend(){

}


let mouseDown = false
let paintColor = 'red';
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

makeGrid(size.value,size.value);

if (matrix[0][0].backgroundColor == "black"){
  console.log("black");
} else {
  console.log("bruh")
}

//comment
  
