let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let figures = []

function addFigure() {
    if (Math.random() > 0.5) {
        addRectangle();
    } else {
        addCircle();
    }

    drawFigures();
}

function drawFigures() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw(context);
    }
}

function addRectangle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = getOpcionColor(posX, posY);
    let rect = new Rect(posX, posY, 100, 100, color, context);
    figures.push(rect);
}

function addCircle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = getOpcionColor(posX, posY);
    let circle = new Circle(posX, posY, 50, color, context);
    figures.push(circle);
}


// Evento temporal para agregar figuras
function addFigures() {
    addFigure();
    if (figures.length < 10) {
        setTimeout(addFigures, 333);
    }
}

setTimeout(() => {
    addFigures();
}, 333)
// Fin Evento temporal para agregar figuras

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getOpcionColor(posX, posY){
    let opcion = Math.round(Math.random() * 2);
    if(opcion == 0){
        return randomRGBA();
    }
    if(opcion == 1){
        let gradiente = context.createLinearGradient(0,0,800,0);
        gradiente.addColorStop(0,randomRGBA());
        gradiente.addColorStop(1,randomRGBA());
        return gradiente;
    }
    if(opcion == 2){
        let img = new Image();
        img.src = "./images/ficha.jpg";
        let imagen = context.createPattern(img, "repeat");
        return imagen;
    }
    
}

function clearCanvas() {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}