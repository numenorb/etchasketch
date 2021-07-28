const sketchBox = document.querySelector("#sketch-box");
const grid = document.querySelector("#grid");
const resetButton = document.querySelector("#reset-btn");
const selectedColor = document.querySelector("#color-choice");
let size = document.querySelector("#size");

createGrid(makeChoice("#size"));

function createGrid(dim){
    grid.style.gridTemplateRows = `repeat(${dim}, 1fr)`;
    grid.style.gridTemplateColumns= `repeat(${dim}, 1fr)`;

    for (let i = 0; i < dim ** 2; i++){
        const gridBox = document.createElement("div");
        gridBox.classList.add("grid-box");
        gridBox.addEventListener("mouseover",changeColor);
        grid.append(gridBox);
    }
}
const gridList = document.querySelectorAll(".grid-box"); // NodeList of createGrid(dim)

function changeColor(e){
    e.target.style.backgroundColor= makeChoice("#color-choice");
}

function makeChoice(element){  //element should be entered with CSS notation
    let newElement = document.querySelector(element).value;
    return newElement;
}


function resetGrid(){ //to run after rest is clicked
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    createGrid(makeChoice("#size")); //already has value from makeChoice
    gridList.forEach(gridList => gridList.style.backgroundColor = 'rgb(200, 200, 200)');
    
}


function btnTest(){
    console.log("click");
}

resetButton.onclick = function(){resetGrid()};

size.addEventListener('mouseup', function() {resetGrid();});


/*  PSUEDO CODE
    Be able to create a grid of 16x16 units
    - done - createGrid(dim)
    Can change color of square
    - done - added to createGrid(dim) & chageColor(e)
    Hovering over a square changes the colors of that square
    - done
    Create a button that: clears the current styling on the grid
    Create option for choosing size (max 100x100)
    - use buttons and prompts
    - works if you change size, clears old and puts in new
    add toggle/scale that allows random color and grayscale
    - grayscale is 10% dark, go over it a second time, and 
    - add 10% more, until full
    Option: courtney's hidden message thing


*/