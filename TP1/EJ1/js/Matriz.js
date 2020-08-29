let cols = 10;
let rows = 10;

let matrix = [];
for(let i = 0; i < cols; i++) {
    matrix[i] = [];
    for (let j = 0; j < rows; j++) {
        matrix[i][j] = Math.random() * 100;        
    }    
}  

function incisoA(){
    let resultado = matrix[0][0];
    for(let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(matrix[i][j] > resultado)
                resultado = matrix[i][j];
        }    
    }   

    console.log("El numero mayor es: " + resultado);
}

function incisoB(){
    for(let i = 0; i < cols; i++) {
        if(i%2 == 0){
            let maximo = matrix[i][0];
            for (let j = 0; j < rows; j++) {
                if(matrix[i][j] > maximo)
                    maximo = matrix[i][j];
            }
            console.log("Fila " + i + ": " + maximo);
        }
        else{
            let minimo = matrix[i][0];
            for (let j = 0; j < rows; j++) {
                if(matrix[i][j] < minimo)
                    minimo = matrix[i][j];
            }
            console.log("Fila " + i + ": " + minimo);
        }    
    }
}

function incisoC(){
    let arr = [cols];
    let resultado;
    for(let i = 0; i < cols; i++) {
        resultado = 0;
        for (let j = 0; j < rows; j++) {
            resultado += matrix[i][j];
        }
        arr[i] = resultado / cols;    
    }
    console.log("Arreglo");
    for(let k = 0; k < arr.length; k++)
        console.log(arr[k]);   
}

incisoA();

incisoB();

incisoC();

console.table(matrix);