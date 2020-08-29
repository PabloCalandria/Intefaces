let ctx = document.querySelector("#myCanvas").getContext("2d");

let width = 500;
let height = 500;
let imageData = ctx.createImageData(width, height);

//De negro a amarillo y de amarillo a rojo
//Negro: 0 , 0 , 0
//Amarillo: 255 , 255 , 0
//Rojo: 255 , 0 , 0

/*let r;
let g;
let b = 0;
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, 255);
        if(x <= width / 2){
            r = 255 / (width / 2) * x;
            g = 255 / (width / 2) * x;
        }
        else{
            r = 255 / (width / 2) * x;
            g = 510 - (255 / (width / 2) * x);
        }
    }
}*/

//OTRA FORMA DE HACERLO, ES SUMANDO DE A UNO EL RGB 
let r = 255;
let g = 0;
let b = 0;
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, 255);
    }
    if(x <= width / 4){
        g += 1;
        b -= 1;
    }
    else{
        r -= 1;
        g += 1;
        b += 1;
    }
}

ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4; //el 4 son el R-G-B-A (RedGreenBlueAlpha)
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}