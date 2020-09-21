class Board {

    constructor(context) {
        this.i = document.querySelector("#inpFila").value;
        this.j = document.querySelector("#inpColumna").value;
        this.context = context;
        this.board = [];
    }

    createBoard(){
        for (let x = 0; x < this.i; x++) {
            this.board[x] = [];
            for(let y = 0; y< this.j; y++ ){
                let posX = (x * 100)+270;
                let posY = (y * 100)+90;
                let square = new Square(this.context, posX, posY);
                square.addImage(posX,posY);
                this.board[x][y] = square;
            }
        }
    }

    getTamaño(){
        return this.i * this.j;
    }

}