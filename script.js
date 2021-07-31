const sketchBox = document.querySelector("#sketch-box");
const grid = document.querySelector("#grid");
const resetButton = document.querySelector("#reset-btn");
const selectedColor = document.querySelector("#color-choice");
const rainbowButton = document.querySelector("#rainbow");
const grayscaleButton = document.querySelector("#grayscale");
const colorButton = document.querySelector("#color-choice-btn");
let size = document.querySelector("#size");

// maybe color,grayscale & rainbow should share one status
let colorStatus = 0; // 0= color, 1=rainbow, 2=grayscale

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
    //console.log(`rain: ${rainbowStatus} grey: ${grayscaleStatus}`);
    
    if (colorStatus == 0){
        e.target.style.backgroundColor = makeChoice("#color-choice");
    }
    if (colorStatus == 2){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } 
    if(colorStatus == 1){
        let shade = e.target.style.backgroundColor.slice(-3,-1);
        console.log("shade before: " + shade);
        if(shade <= 0.89){
            shade = Number(shade) + 0.1;
            //console.log("shade after: " + shade);
            //console.log("color? " + `rgba(0,0,0,${shade})`);
            e.target.style.backgroundColor = `rgba(0,0,0,${shade})`;
        } else{
            e.target.style.backgroundColor = "black";
        }

    }
}

function grayScale(e){

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

function changeColorStatus (buttonStatus, defaultStatus){
    rainbowButton.classList.toggle("rainbow-active");
    grayscaleButton.classList.toggle('grayscale-active');
   /* if (buttonStatus == 1){
        let allGrid = document.querySelectorAll(".grid-box");
        for (let i = 0; i < allGrid.length; i++){
            allGrid[i].style.opacity=0;
        }
    }*/
    // Trying something else to do the above first
    return colorStatus != buttonStatus ? colorStatus = buttonStatus : colorStatus = defaultStatus; // if rainbow isn't on, turn it on, if its on, turn it to basic color 
}


//Button & Slider Operations
size.addEventListener('mouseup', function() {resetGrid();});
rainbowButton.onclick = function(){changeColorStatus(2,0)}; //changes between rainbow and color 
grayscaleButton.onclick = function(){changeColorStatus(1,0)};//changes between gray and color
colorButton.onclick = function(){changeColorStatus(0,0)};



/*  PSUEDO CODE
    
    add toggle/scale that allows random color and grayscale
    - grayscale is 10% dark, go over it a second time, and 
    - add 10% more, until full
    Option: courtney's hidden message thing


*/