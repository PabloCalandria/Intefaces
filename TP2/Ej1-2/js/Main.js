let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];

function addFigure(){
    if(Math.random() > 0.5){
        addRectangle();
    }else{
        addCircle();
    }

    drawFigures();
}

function drawFigures(){
    clearCanvas();
    for(let i = 0; i < figures.length; i++){
        figures[i].draw(context);
    }
}

function addRectangle(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let rectangle = new Rectangle(posX, posY, 20, 20, color, context);
    figures.push(rectangle);
}

function addCircle(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let circle = new Circle(posX, posY, 10, color, context);
    figures.push(circle);
}

function addFigure(){
    addFigure();
    if(figures.length < 30){
        setTimeout(addFigures, 333);
    }
}

setTimeout(() => {
    addFigure();
}, 333);