"use strict";

function cargarPagina(){
    
    let ctx = document.querySelector("#myCanvas").getContext("2d");    
    let imageOrigin = null;
    
    function paint(herramienta){
        
        let c = document.querySelector("#myCanvas");        
        let tamanoLapiz = document.querySelector("#selectLapiz").value;
        let tamanoGoma = document.querySelector("#selectGoma").value;
        let pintar = Boolean(false);
        let color_prim = document.querySelector("#inpColor").value;
        
        c.onmousedown = function (e){
            pintar = true;
            if( herramienta == "lapiz" ){
                ctx.moveTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
            }
        }   
    
        c.onmouseup = function(){
            pintar = false;
            ctx.beginPath();
        }
        
        c.onmousemove = function(e){
            if (pintar) {
                if (herramienta == "lapiz") {
                    ctx.lineTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
                    ctx.lineWidth = tamanoLapiz;
                    ctx.strokeStyle = color_prim;
                    ctx.stroke();
                }
                else if(herramienta == "goma"){
                    ctx.beginPath();
                    ctx.clearRect(e.pageX - c.offsetLeft, e.pageY - c.offsetTop,tamanoGoma,tamanoGoma);
                }
            }
        }
        
        c.onmouseout = function(){
            pintar = false;
        };
    }

    function cargaImagen(){
        let canvas = document.querySelector("#myCanvas");
        let input = document.querySelector("#inpImagen");

        let context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = readerEvent => {
                let content = readerEvent.target.result;

                let image = new Image();

                image.src = content;

                image.onload = function(){
                    let imageScaledWidth = canvas.width;
                    let imageScaledHeight = canvas.height;
                
                    context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

                    let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

                    context.putImageData(imageData, 0, 0);
                }
            }
        }
    }

    function enBlanco(){
        let canvas = document.querySelector("#myCanvas");
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function quitarFiltro(){
        if(imageOrigin != null)
            ctx.putImageData(imageOrigin,0,0);
    }

    
    function getRed(imageData, x, y){
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index+0];
    }

    function getGreen(imageData, x, y){
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index+1];
    }

    function getBlue(imageData, x, y){
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index+2];
    }

    function agregarFiltro(){
        let opcion = document.querySelector("#selectFiltros").value;

        let canvas = document.querySelector("#myCanvas");
        let index;
        imageOrigin = ctx.getImageData(0,0,canvas.width,canvas.height);
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

        if(opcion == "negativo"){
            for(let y = 0; y < canvas.height; y++){
                for(let x = 0; x < canvas.width; x++){
                    index = (x + y * imageData.width) * 4;
                    imageData.data[index+0] = 255 - imageData.data[index+0];
                    imageData.data[index+1] = 255 - imageData.data[index+1];
                    imageData.data[index+2] = 255 - imageData.data[index+2];      
                }
            }
            ctx.putImageData(imageData,0,0);
        }

        if(opcion == "brillo"){
            let densidad = document.querySelector("#inpBrillo").value;
            for(let y = 0; y < canvas.height; y++){
                for(let x = 0; x < canvas.width; x++){
                    index = (x + y * imageData.width) * 4;
                    imageData.data[index+0] = getBrillo(imageData.data[index+0]+densidad);
                    imageData.data[index+1] = getBrillo(imageData.data[index+1]+densidad);
                    imageData.data[index+2] = getBrillo(imageData.data[index+2]+densidad);      
                }
            }

            function getBrillo(valor){
                if(valor<0)
                    return 0;
                if(valor>255)
                    return 255;
                else
                    return valor;
            }

            ctx.putImageData(imageData,0,0);
        }

        if(opcion == "sepia"){
            let red;
            let blue;
            let green;
            for(let y = 0; y < canvas.height; y++){
                for(let x = 0; x < canvas.width; x++){
                    index = (x + y * imageData.width) * 4;
                    red = 0.393 * imageData.data[index+0] + 0.769 * imageData.data[index+1] + 0.189 * imageData.data[index+2];
                    if(red > 255)
                        red = 255;
                    green = 0.349 * imageData.data[index+0] + 0.686 * imageData.data[index+1] + 0.168 * imageData.data[index+2];
                    if(green > 255)
                        green = 255;
                    blue = 0.272 * imageData.data[index+0] + 0.534 * imageData.data[index+1] + 0.131 * imageData.data[index+2];
                    if(blue > 255)
                        blue = 255;
                    imageData.data[index+0] = red;
                    imageData.data[index+1] = green;
                    imageData.data[index+2] = blue;      
                }
            }
            ctx.putImageData(imageData,0,0);
        }

        if(opcion == "binario"){
            let r;
            let b;
            let g;
            for(let y = 0; y < canvas.height; y++){
                for(let x = 0; x < canvas.width; x++){
                    index = (x + y * imageData.width) * 4;
                    
                    r = getRed(imageData,x,y);
                    g = getGreen(imageData,x,y);
                    b = getBlue(imageData,x,y);
                    
                    let promedio = (r+g+b)/3;

                    imageData.data[index+0] = promedio;
                    imageData.data[index+1] = promedio;
                    imageData.data[index+2] = promedio;
                }
            }
            ctx.putImageData(imageData,0,0);
        }
    }

    let botonLapiz = document.querySelector("#btnLapiz");
    botonLapiz.addEventListener("click", function(e){paint("lapiz")});
    let botonGoma = document.querySelector("#btnGoma");
    botonGoma.addEventListener("click", function(e){paint("goma")});

    let botonCargarImagen = document.querySelector("#inpImagen");
    botonCargarImagen.addEventListener("click", cargaImagen);

    let botonBlanco = document.querySelector("#btnBlanco");
    botonBlanco.addEventListener("click", enBlanco);

    let botonFiltro = document.querySelector("#btnFiltro");
    botonFiltro.addEventListener("click", agregarFiltro);

    let botonQuitarFiltro = document.querySelector("#btnQuitarFiltro");
    botonQuitarFiltro.addEventListener("click", quitarFiltro);

}

document.addEventListener("DOMContentLoaded", cargarPagina);