const sketchBox = document.querySelector("#sketch-box");
const grid = document.querySelector("#grid");
const resetButton = document.querySelector("#reset-btn");
const selectedColor = document.querySelector("#color-choice");
const rainbowButton = document.querySelector("#rainbow");
let size = document.querySelector("#size");
let rainbowStatus = false;

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
    if (rainbowStatus){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else{
        e.target.style.backgroundColor = makeChoice("#color-choice");
    }
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
    gridList.forEach(gridList => gridList.style.backgroundColor = 'rgb(200, 200, 200,.4)');
    
}


function btnTest(){
    console.log("click");
}

resetButton.onclick = function(){resetGrid()};

size.addEventListener('mouseup', function() {resetGrid();});
rainbowButton.onclick = function(){
    if (rainbowStatus){
        rainbowButton.classList.toggle("rainbow-active");
        rainbowStatus = false;
    } else{
        rainbowButton.classList.toggle("rainbow-active");
        rainbowStatus = true;       
    }
    console.log(rainbowStatus);
}


/*  PSUEDO CODE
    
    add toggle/scale that allows random color and grayscale
    - grayscale is 10% dark, go over it a second time, and 
    - add 10% more, until full
    Option: courtney's hidden message thing


*/