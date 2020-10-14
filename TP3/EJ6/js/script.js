"use strict"

function carga(){
    let contenedor = document.querySelector("#contenedor_carga");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = 0;
    location.href = "http://www.google.com";
}

setInterval('carga()',5000);