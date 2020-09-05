"use strict";

function cargarPagina(){
    
    let ctx = document.querySelector("#myCanvas").getContext("2d");

    let width = 700;
    let height = 400;
    let imageData = ctx.createImageData(width, height);
    
    
    function paint(herramienta){
        
        let c = document.querySelector("#myCanvas");        
        let tamanoLapiz = document.querySelector("#selectLapiz").value;
        let tamanoGoma = document.querySelector("#selectGoma").value;
        let pintar = Boolean(false);
        let color_prim = "#f2f";
        
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

    let botonLapiz = document.querySelector("#btnLapiz");
    botonLapiz.addEventListener("click", function(e){paint("lapiz")});
    let botonGoma = document.querySelector("#btnGoma");
    botonGoma.addEventListener("click", function(e){paint("goma")});
}

document.addEventListener("DOMContentLoaded", cargarPagina);