class Board {

    constructor(context) {
        this.i = document.querySelector("#inpFila").value;
        this.j = document.querySelector("#inpColumna").value;
        this.context = context;
        this.board = [];
    }

    createBoard(){
        for (let x = 0; x < this.j; x++) {
            this.board[x] = [];
            for(let y = 0; y < this.i; y++){
                let posX = (x * 100) + 270;
                let posY = (y * 100) + 90;
                let square = new Square(this.context, posX, posY);
                square.addImage(posX,posY,"./images/Casillero-Transparente.png");
                this.board[x][y] = square;
            }
        }
    }

    imprimeBoard(){
        for (let x = 0; x < this.j; x++) {
            for(let y = 0; y < this.i; y++){
                let posX = (x * 100) + 270;
                let posY = (y * 100) + 90;
                let square = new Square(this.context, posX, posY);
                let color = this.board[x][y];
                if(color.getColor() == null)
                    square.addImage(posX,posY,"./images/Casillero-Transparente.png");
                if(color.getColor() == "rojo")
                    square.addImage(posX,posY,"./images/tablero_ficha_roja.png");
                if(color.getColor() == "amarillo")
                    square.addImage(posX,posY,"./images/tablero_ficha_amarilla.png");
            }
        }
    }

    getSquare(x, y){
        return (this.board[x][y]);
    }

    getTamaño(){
        return (this.i * this.j);
    }

    getFila(){
        return this.i;
    }

    getColumna(){
        return this.j;
    }

}