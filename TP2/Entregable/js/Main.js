let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let lastClickedFigure = null;
let isMouseDown = false;

let board = new Board(context);
let tamañoTablero = board.getTamaño();

let imgCT = new Image();
imgCT.src = "./images/Casillero-Transparente.png";
imgCT.onload = function(){

    let imgFR = new Image();
    imgFR.src = "./images/ficha_roja.png";
    imgFR.onload = function(){

        let imgFA = new Image();
        imgFA.src = "./images/ficha_amarilla.png";
        imgFA.onload = function(){

            let imgTFA = new Image();
            imgTFA.src = "./images/tablero_ficha_amarilla.png";
            imgTFA.onload = function(){

                let imgTFR = new Image();
                imgTFR.src = "./images/tablero_ficha_roja.png";
                imgTFR.onload = function(){

                    board.createBoard(imgCT);
                    
                    let figures = [];
                    let fichaSelect;
                    let colorFicha; 
                    let jugador = "rojo";
                    addFigures();
                    
                    function cambiaJugador(){
                        if(jugador != "fin"){
                            if(jugador == "rojo"){
                                jugador = "amarillo";
                            }
                            else{
                                jugador = "rojo";
                            }
                        }
                    }
                    
                    function addFigureRed() {
                        //x:70 - 200 <-> y:600 - 730
                        let posX = Math.random() * (200 - 70) + 70;
                        let posY = Math.random() * (530 - 400) + 400; 
                        let color = "red";
                        let circle = new Figure(posX, posY, 50, color, context, imgFR, "rojo");
                        figures.push(circle);
                    }
                    
                    function addFigureYellow() {
                        //x:70 - 200 <-> y:600 - 730
                        let valor = (((board.getColumna() - 1) * 100) + 330) + 70;
                        let posX = Math.random() * ((valor + 150) - valor) + valor;
                        let posY = Math.random() * (530 - 400) + 400; 
                        let color = "yellow";
                        let circle = new Figure(posX, posY, 40, color, context, imgFA, "amarillo");
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
                        if(jugador != "fin"){
                            clearCanvas();
                            for (let i = 0; i < figures.length; i++) {
                                if(figures[i] != lastClickedFigure) {
                                    figures[i].draw();
                                }
                            }
                            if(lastClickedFigure != null) {
                                lastClickedFigure.draw();
                            }

                            context.font = "25pt Verdana";
                            context.strokeStyle = "black";
                            context.lineWidth = 2;
                            context.strokeText("Turno", 10, 50);

                            context.font = "30px Comic Sans MS";
                            if(jugador == "rojo")
                                context.fillStyle = "red";
                            else
                                context.fillStyle = "yellow";
                            context.lineWidth = 2;
                            context.fillText(jugador, 10, 80);
                        }
                    }

                    function clearCanvas() {
                        context.fillStyle = '#F8F8FF';
                        context.fillRect(0, 0, canvasWidth, canvasHeight);
                        board.imprimeBoard(imgCT,imgTFA,imgTFR);
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
                        if(lastClickedFigure != null){
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
                                if(board.getSquare(columnaJugada,0).getColor() == null){
                                    chequearJugada(columnaJugada);
                                    cambiaJugador();
                                    }
                                } 
                            }                        
                            drawFigures();
                        }
                    }
                    
                    function chequearJugada(columna){
                        let continua = true;
                        for(let i = board.getFila() - 1; (i >= 0) && (continua == true); i--){
                            let cuadrado = board.getSquare(columna,i);
                            if(cuadrado.getColor() == null){
                                if(colorFicha == "rojo"){
                                    cuadrado.setImage(imgTFR);
                                    cuadrado.setColor("rojo");
                                }
                                else{
                                    cuadrado.setImage(imgTFA);
                                    cuadrado.setColor("amarillo");
                                }
                                continua = false;
                                figures.splice(fichaSelect,1); //borra la ficha seleccion
                                lastClickedFigure = null;
                                chequeaGanador(i,columna,colorFicha);
                            }
                        }
                    }
                    
                    function chequeaGanador(fila,columna,colorFicha){
                        let total = -1;
                        let f = fila;
                        let c = columna;
                        //DERECHA
                        while((c < board.getColumna()) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            c++;
                        }
                        //IZQUIERDA
                        f = fila;
                        c = columna;
                        while((c >= 0) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            c--;
                        }
                        if(total >= 4){
                            ganador();
                        }
                        //ABAJO
                        total = 0;
                        f = fila;
                        c = columna;
                        while((f < board.getFila()) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            f++;
                        }
                        if(total >= 4){
                            ganador();
                        }
                        //IZQ ABAJO
                        total = -1;
                        f = fila;
                        c = columna;
                        while((f < board.getFila()) && (c >= 0) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            f++;
                            c--;
                        }
                        //DER ARRIBA
                        f = fila;
                        c = columna;
                        while((c < board.getColumna()) && (f >= 0) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            c++;
                            f--;
                        }
                        if(total >= 4){
                            ganador();
                        }
                        //IZQ ARRIBA
                        total = -1;
                        f = fila;
                        c = columna;
                        while((f >= 0) && (c >= 0) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            f--;
                            c--;
                        }
                        //DER ABAJO
                        f = fila;
                        c = columna;
                        while((c < board.getColumna()) && (f < board.getFila()) && (board.getSquare(c,f).getColor() == colorFicha)){
                            total++;
                            c++;
                            f++;
                        }
                        if(total >= 1){
                            ganador();
                        }
                    }

                    function ganador(){
                        context.fillStyle = "rgba(0,0,0,0.8)";
                        context.fillRect(350,215,600,100);
                        context.font = "100px Comic Sans MS";
                        if(jugador == "rojo")
                            context.fillStyle = "red";
                        else
                            context.fillStyle = "yellow";
                        context.fillText("GANADOR", 400, 300);
                        jugador = "fin";
                    }
                }
            }
        }
    }
}

