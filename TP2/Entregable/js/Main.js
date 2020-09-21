let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let board = new Board(context);
board.createBoard();
