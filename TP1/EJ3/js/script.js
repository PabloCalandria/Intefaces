let ctx = document.querySelector("#myCanvas").getContext("2d");

let width = 350;
let height = 350;
let imageData = ctx.createImageData(width, height);

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, 255, 128, 0, 255);
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