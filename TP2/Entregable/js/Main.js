let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//ACOMODAR LAS FICHAS PARA QUE SE ADAPTE AL TABLERO
//ACOMODAR CUANDO SE INICIA EL JUEGO POR PRIMERA VEZ, QUE APAREZCAN LAS FICHAS Y EL TABLERO
//ACOMODAR QUE EL TABLERO ANTERIRO DESAPAREZCA, MARCA COLUMNAS QUE YA NO EXISTE
//ACOMODAR CUANDO SE INSERTA FICHA, QUE NO SIGA INSERTANDO OTRAS (puede ser por el)

function comenzarJuego(){

    let lastClickedFigure = null;
    let isMouseDown = false;
    
    let board = new Board(context);
    let tamañoTablero = board.getTamaño();
    board.createBoard();
    
    let figures = [];
    let fichaSelect;
    let colorFicha; 
    addFigures();
    let jugador = "rojo";

    function cambiaJugador(){
        if(jugador == "rojo")
            jugador = "amarillo";
        else
            jugador = "rojo";
    }

    window.onmousemove = function(event){
        let x = event.clientX;
        let y = event.clientY;
        document.querySelector("#x").value = x;
        document.querySelector("#y").value = y;
    }

    function addFigureRed() {
        //x:70 - 200 <-> y:600 - 730
        let posX = Math.random() * (200 - 70) + 70;
        let posY = Math.random() * (730 - 600) + 600; 
        let color = "red";
        let circle = new Figure(posX, posY, 50, color, context, getImg("images/ficha_roja.png"), "rojo");
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
        let circle = new Figure(posX, posY, 40, color, context, getImg("images/ficha_amarilla.png"), "amarillo");
        figures.push(circle);
    }
    
    function addFigures() {
        
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
        board.imprimeBoard();
    }
    
    function findClickedFigure(x, y){
        for(let i = 0; i < figures.length; i++){
            const element = figures[i];
            if(element.isPointInside(x, y)){
                fichaSelect = i;
                colorFicha = element.getColor();
                if(colorFicha == jugador)
                    return element;
                else
                    return null;
            }
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
        if((event.layerY > 35) && (event.layerY < 52)){
            //300 la ficha en X siempre es fija - nunca cambia... cada 100 pasa a la siguiente columna
            //MOVER LA FICHA ENTRE SU VALOR Y -10 Y +10
            let finalColumna = ((board.getColumna() - 1) * 100) + 330;
            if((event.layerX > 310) && (event.layerX < finalColumna)){
                let columnaJugada = 0;
                let posMouse = 330;
                while ((posMouse < finalColumna) && (posMouse < event.layerX)){
                    columnaJugada++;
                    posMouse += 100;
                }
                chequearJugada(columnaJugada);
                cambiaJugador();
            } 
        }
    }

    function chequearJugada(columna){
        let continua = true;
        for(let i = board.getFila() - 1; (i >= 0) && (continua == true); i--){
            let cuadrado = board.getSquare(columna,i);
            if(cuadrado.getColor() == null){
                if(colorFicha == "rojo"){
                        cuadrado.setImage("./images/tablero_ficha_roja.png");
                        cuadrado.setColor("rojo");
                        }
                    else{
                        cuadrado.setImage("./images/tablero_ficha_amarilla.png");
                        cuadrado.setColor("amarillo");
                    }
                continua = false;
                figures.splice(fichaSelect,1); //borra la ficha seleccion
                chequeaGanador(i,columna);
            }
        }
    }

    function chequeaGanador(fila,columna){
        
    }
}
    
document.querySelector("#btnComenzar").addEventListener("click", comenzarJuego);
