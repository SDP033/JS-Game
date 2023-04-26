let canvas= document.getElementById("arkanoidCanvas");
let contexto = canvas.getContext("2d");       // Hacemos referencia al canvas y le damos un contexto de 2 dimensiones para poder pintar los elementos del juego



var x=canvas.width / 2;
var y=canvas.height- 50;
var radio = 10;
contexto.beginPath();
contexto.arc(x, y, radio, 0, 2 * Math.PI);
contexto.fillStyle= "blue";
contexto.fill();
contexto.closePath();