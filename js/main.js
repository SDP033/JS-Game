let canvas = document.getElementById("arkanoidCanvas");
let contexto = canvas.getContext("2d"); 

var x = canvas.width / 2; 
var y = canvas.height - 50;      // Variables pelota
var radio = 10;


var raquetaw=100;
var raquetah=25;
var raquetax= (canvas.width / 2)-(raquetaw/2);
var raquetay=canvas.height-25;

var movx= 2;
var movy=-2;

var derecha= false;
var izquierda=false;

document.addEventListener("keydown",pulsar,false);     // eventListeners que captan izda o derecha
document.addEventListener("keyup",soltar,false);


function pulsar(e){         // funcion para cuando pulsamos 
    if(e.keyCode == 37){
        izquierda = true;
    }else{
        if(e.keyCode == 39){
            derecha = true;
        }
    }

}
function soltar(e){       // funcion para cuando soltamos 
    if(e.keyCode == 37){
        izquierda = false;
    }else{
        if(e.keyCode == 39){
            derecha = false;
        }
    }

}

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

function pinta() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);   // Sirve para limpiar el canvas para que pinte las cosas
    raqueta();
    pelota();

    if (x + movx > canvas.width - radio || x + movx < radio) {  // delimitando el rebote de la pelota y de la raqueta al canvas
        movx = -movx;
    }
    if (y + movy < radio) {
        movy = -movy;
    } else {
        if (y + movy + radio > canvas.height - raquetah) {      // Rebote de la pelota en la raqueta o si cae al suelo pierdes
            if (x > raquetax && x < raquetax + raquetaw) {
                movy = -movy;
            } else { 
                if(y + movy > canvas.height - radio){                      
                alert("HAS PERDIDO");
                }
            }
        }
    }

    if (izquierda && raquetax > 0) {                      // Movimiento de la raqueta pulsando izqda o derecha
        raquetax += -10;
    }
    if (derecha && raquetax < canvas.width - raquetaw) {
        raquetax += +10;
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
