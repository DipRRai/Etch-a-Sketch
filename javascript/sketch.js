const container = document.querySelector('.container');
const size = document.querySelector('.size');
const setSize = document.querySelector('.setSize');
const clear = document.querySelector('.clear');

clear.addEventListener('click', clearcanvas);
setSize.addEventListener('click', resetGrid);

function resetGrid(){
  container.innerHTML = '';
  makeGrid(size.value, size.value);
  container.style.justifyContent = 'center';
}

function clearcanvas(e){
  let canvas = document.querySelectorAll('.gridbox');
  canvas.forEach(gridbox => {
    gridbox.style.backgroundColor = 'black';
  });
}

function color(e){
  this.style.backgroundColor="red";
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
  container.appendChild(tempGrid);
}

makeGrid(64,64);

  
