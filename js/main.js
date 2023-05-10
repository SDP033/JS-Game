let canvas = document.getElementById("arkanoidCanvas");
let contexto = canvas.getContext("2d"); 

var x = canvas.width / 2; 
var y = canvas.height - 50;      // Variables pelota
var radio = 10;

var raquetax= (canvas.width / 2)-50;
var raquetay=canvas.height-40;
var raquetaw=100;
var raquetah=25;

var movx= 2;
var movy=-2;

function pelota(){
contexto.beginPath();                    // Aqui pintamos un pelota
contexto.lineWidth = 5; 
contexto.strokeStyle = "#212121";
contexto.arc(x, y, radio, 0, 2 * Math.PI);
contexto.fillStyle = "blue";
contexto.stroke();
contexto.fill();
contexto.closePath();

}

function raqueta(){
    contexto.beginPath();                   // Aqui pintamos la raqueta
    contexto.lineWidth = 5; // en lugar de "border"
    contexto.strokeStyle = "#212121";
    contexto.fillStyle = "#F4511E";
    contexto.rect(raquetax, raquetay, raquetaw, raquetah);
    contexto.stroke();
    contexto.fill();
    contexto.closePath();

}

function pinta(){       // esta funcion limpia el canvas para poder repintar los elementos que pintamos
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    raqueta();
    pelota();                                                         // Aqui hacemos la logica para que la pelota no sobrepase el canvas
    if(x + movx > canvas.width - radio || x + movx < radio){
        movx = -movx;                                                 
    }
    if(y + movy < radio || y + movy > canvas.height - radio){
        movy = -movy;
    }
    x += movx;
    y += movy;

}
setInterval(pinta, 10);  // Aqui pintamos cada 10 ms todos los elementos que metamos en la funcion pinta



/*

contexto.beginPath();                  // Aqui pintamos un brick
contexto.lineWidth = 5; // en lugar de "border"
contexto.strokeStyle = "#212121";
contexto.fillStyle = "yellow";
contexto.rect(5, 5, 50, 25);
contexto.stroke();
contexto.fill();
contexto.closePath();*/
