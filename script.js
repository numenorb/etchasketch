const sketchBox = document.querySelector("#sketch-box");
const grid = document.querySelector("#grid");
const resetButton = document.querySelector("#reset-btn");
const selectedColor = document.querySelector("#color-choice");
const rainbowButton = document.querySelector("#rainbow");
const grayscaleButton = document.querySelector("#grayscale");
const colorButton = document.querySelector("#color-choice-btn");
const blackButton = document.querySelector("#black");
let size = document.querySelector("#size");

// maybe color,grayscale & rainbow should share one status
let colorStatus = 0; // 0= color, 1=grayscale, 2=rainbow, 3=black

createGrid(makeChoice("#size"));

function createGrid(dim){
    grid.style.gridTemplateRows = `repeat(${dim}, 1fr)`;
    grid.style.gridTemplateColumns= `repeat(${dim}, 1fr)`;
    for (let i = 0; i < dim ** 2; i++){
        const gridBox = document.createElement("div");
        gridBox.style.backgroundColor = 'rgba(0,0,0,0.0)';
        gridBox.classList.add("grid-box");
        gridBox.addEventListener("mouseover",changeColor);
        grid.append(gridBox);
    }
}
const gridList = document.querySelectorAll(".grid-box"); // NodeList of createGrid(dim)

function changeColor(e){     
    if (colorStatus == 0){
        e.target.style.backgroundColor = makeChoice("#color-choice");
    }
    if (colorStatus == 2){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } 
    if(colorStatus == 1){
        let shade = e.target.style.backgroundColor.slice(-3,-1);
        if(shade <= 0.89){
            shade = Number(shade) + 0.1;

            e.target.style.backgroundColor = `rgba(0,0,0,${shade})`;
        } else{
            e.target.style.backgroundColor = "black";
        }
    }
    if(colorStatus == 3){
        e.target.style.backgroundColor = "black";
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
    gridList.forEach(gridList => gridList.style.backgroundColor = 'rgba(240,240,240,1.0))');
    
}


function btnTest(){
    console.log("click");
}

resetButton.onclick = function(){resetGrid()};

function changeColorStatus (buttonStatus){
    resetGrid();
    return colorStatus != buttonStatus ? colorStatus = buttonStatus : colorStatus = 0; 
}


//Button & Slider Operations
size.addEventListener('mouseup', function() {resetGrid();});
rainbowButton.onclick = function(){changeColorStatus(2)}; 
grayscaleButton.onclick = function(){changeColorStatus(1)};
colorButton.onclick = function(){changeColorStatus(0)};
blackButton.onclick = function(){changeColorStatus(3)};



