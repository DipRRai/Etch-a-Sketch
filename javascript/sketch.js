const container = document.querySelector('.container');
const size = document.querySelector('.size');
const setSize = document.querySelector('.setSize');
const clear = document.querySelector('.clear');
const statusbar = document.querySelector('.status');
const colorpicker = document.querySelector('.colorpalette');

clear.addEventListener('click', clearcanvas);
setSize.addEventListener('click', resetGrid);
colorpicker.oninput = (e) => paintColor = e.target.value;

function resetGrid(){
  if (isNaN(parseInt(size.value)) == true){
    statusbar.textContent = 'Please enter integers only in canvas size field';
  } else {
    container.innerHTML = '';
    makeGrid(size.value, size.value);
    container.style.justifyContent = 'center';
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
  tempGrid.style.width = '100%';
  tempGrid.style.height = '10%';
  tempGrid.style.display = 'grid';
  tempGrid.style.gridTemplateColumns = 'repeat('+ cols +', auto)';
  tempGrid.style.gridTemplateRows = 'repeat('+ cols +', auto)';
  for (let i = 0; i<rows; i++){
    for (let j = 0; j<cols; j++){
      let tempcol = document.createElement('div');
      tempcol.addEventListener('mouseover', color);
      tempcol.classList.add("gridbox")
      tempcol.style.backgroundColor = 'black';
      tempcol.style.padding = '3px';
      tempGrid.appendChild(tempcol);
    }
  }
}

let mouseDown = false
let paintColor = 'red';
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

makeGrid(64,64);
//comment
  
