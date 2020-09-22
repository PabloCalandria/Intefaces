let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//FIJARSE EL CLEAR CANVAS
//FIJARSE RESETEAR EL CANVAS Y QUE NO QUEDE GUARDADO EL UTLIMO
//ACOMODAR LAS FICHAS PARA QUE SE ADAPTE AL TABLERO
//ACOMODAR CUANDO SE INICIA EL JUEGO POR PRIMERA VEZ, QUE APAREZCAN LAS FICHAS 

function comenzarJuego(){
    
    let lastClickedFigure = null;
    let isMouseDown = false;
    
    let board = new Board(context);
    let tamañoTablero = board.getTamaño();
    board.createBoard();
    
    let figures = [];
    addFiguresRed();
    
    function addFigureRed() {
        //x:70 - 200 <-> y:600 - 730
        let posX = Math.random() * (200 - 70) + 70;
        let posY = Math.random() * (730 - 600) + 600; 
        let color = "red";
        let circle = new Figure(posX, posY, 50, color, context, getImg("images/ficha_roja.png"));
        figures.push(circle);
    }

    function getImg(src){
        let img = new Image();
        img.src = src;
        return img;
    }
    
    function addFigureYellow() {
        //x:70 - 200 <-> y:600 - 730
        let posX = Math.random() * (1230 - 1100) + 1100;
        let posY = Math.random() * (730 - 600) + 600; 
        let color = "yellow";
        let circle = new Figure(posX, posY, 40, color, context, getImg("images/ficha_amarilla.png"));
        figures.push(circle);
    }
    
    function addFiguresRed() {
        
        let i = 0;
        while(i < tamañoTablero){
            addFigureRed();
            i++;
            if(i < tamañoTablero){
                addFigureYellow();
                i++
            }
        }

        drawFigures();
        
        canvas.addEventListener("mousedown", onMouseDown, false);
        canvas.addEventListener("mouseup", onMouseUp, false);
        canvas.addEventListener("mousemove", onMouseMoved, false);
    }
    
    function drawFigures(){
        clearCanvas();
        for (let i = 0; i < figures.length; i++) {
            if(figures[i] != lastClickedFigure) {
                figures[i].draw();
            }
        }
        if(lastClickedFigure != null) {
            lastClickedFigure.draw();
        }
    }

    
    function clearCanvas() {
        context.fillStyle = '#F8F8FF';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        board.createBoard();
    }
    
    function findClickedFigure(x, y){
        for(let i = 0; i < figures.length; i++){
            const element = figures[i];
            if(element.isPointInside(x, y))
                return element;
        }
    }
    
    function onMouseDown(event){
        isMouseDown = true;
        
        if(lastClickedFigure != null){
            lastClickedFigure.setHighlighted(false);
            lastClickedFigure = null;
        }
        
        let clickedFigure = findClickedFigure(event.layerX, event.layerY);
        if(clickedFigure != null){
            clickedFigure.setHighlighted(true);
            lastClickedFigure = clickedFigure;
        }

        drawFigures();
    }
    
    function onMouseMoved(event){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(event.layerX, event.layerY);
            drawFigures();
        }
    }
    
    function onMouseUp(event){
        isMouseDown = false;
    }
}
    
document.querySelector("#btnComenzar").addEventListener("click", comenzarJuego);
