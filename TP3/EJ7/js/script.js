"use strict"

function cargaPagina(){

    function ocultar(i){
        document.querySelector(".div" + i).classList.toggle("ocultar");
    }
    
    let boton = document.querySelectorAll(".btn");
    for(let i = 0; i < boton.length; i++){
        boton[i].addEventListener("click", function(e){ocultar(i)});
    }    
}

document.addEventListener("DOMContentLoaded", cargaPagina);