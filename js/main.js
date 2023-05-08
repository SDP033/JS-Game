let canvas= document.getElementById("arkanoidCanvas");
let contexto = canvas.getContext("2d");       // Hacemos referencia al canvas y le damos un contexto de 2 dimensiones para poder pintar los elementos del juego



var x=canvas.width / 2;        // Pasos para crear la pelota
var y=canvas.height- 50;
var radio = 10;
contexto.beginPath();
contexto.lineWidth = 5; 
contexto.strokeStyle = "#212121";
contexto.arc(x, y, radio, 0, 2 * Math.PI);
contexto.fillStyle= "blue";
contexto.stroke();
contexto.fill();
contexto.closePath();

contexto.beginPath();
contexto.border = 5;             // Dibujamos un rectángulo 
contexto.strokeStyle = "#212121";
contexto.fillStyle = "#F4511E";
contexto.rect(canvas.width/2, canvas.height-30, 100, 25);
contexto.stroke();
contexto.fill();
contexto.closePath();
