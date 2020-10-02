let canvas = null;
let ctx = null;

let centerX = 0;
let centerY = 0;
let radius = 0;
let lengthArrowHours;
let lengthArrowMinutes;
let lengthArrowSeconds;

window.addEventListener('load', onload);

function onload() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext("2d");

    //posicion central del reloj (desde donde salen las agujas)
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    //radio (medida) del reloj
    radius = (canvas.width / 2) * 0.8;

    //longitud de cada aguja del reloj
    lengthArrowHours = radius * 0.65;
    lengthArrowMinutes = radius * 0.75;
    lengthArrowSeconds = radius * 0.85;

    //determino cada cuanto voy a dibujar el sprite (framerate)
    setInterval(redraw, 1000);
}

function redraw() {
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw background
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    //get current time
    let now = new Date();

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    
    //draw Hours		
    let angle = (now.getHours() / 60) * 2 * Math.PI - Math.PI / 2;
    let px = centerX + Math.cos(angle) * lengthArrowHours;
    let py = centerY + Math.sin(angle) * lengthArrowHours;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    //draw Minutes
    ctx.lineWidth = 4;
    angle = (now.getMinutes() / 60) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * lengthArrowMinutes;
    py = centerY + Math.sin(angle) * lengthArrowMinutes;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    ctx.lineWidth = 2;
    //draw Seconds
    angle = (now.getSeconds() / 60) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * lengthArrowSeconds;
    py = centerY + Math.sin(angle) * lengthArrowSeconds;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();
}
