let canvas = document.getElementById("arkanoidCanvas");
let contexto = canvas.getContext("2d"); 

var x = canvas.width / 2; 
var y = canvas.height - 50;      // Variables pelota
var radio = 10;


var raquetaw=100;
var raquetah=25;
var raquetax= (canvas.width / 2)-(raquetaw/2);  // Variables raqueta
var raquetay= canvas.height-25;

var movx= 2;    // px que se movera la bola en eje x
var movy=-2;    // px que se movera la bola en eje y

var columnas= 9;
var filas=4;
var brickw= 50;
var brickh= 30;              // Variables para los ladrillos
var brickpadding= 10;
var paddingarriba = 30;
var paddingizquierda = 140;

var marcador=0;
var vidas=3;

var bricks= [];                                                   // Esta estructura es para guardar los bloques en un array
for (let i=0; i<columnas; i++){
    bricks[i]= [];
    for(let j=0; j<filas; j++){
        bricks[i][j]= {x:0, y:0, pintoladrillo: true};
    }
}  

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

function ladrillo(){           // funcion para pintar los ladrillos
    for (let i=0; i<columnas; i++){
        for(let j=0; j<filas; j++){
            
            if(bricks[i][j].pintoladrillo == true){

            var brickx= (i* (brickw+ brickpadding))+paddingizquierda;            // Con esto evitamos que pinte un ladrillo encima de otro
            var bricky= (j* (brickh+ brickpadding))+paddingarriba;

            bricks[i][j].x= brickx;                 // Aquii actualizamos el valor de x e y de cada ladrillo para usarlos en romper()
            bricks[i][j].y= bricky;

            contexto.beginPath();                           
            contexto.lineWidth = 5; 
            contexto.strokeStyle = "#212121";
            contexto.fillStyle = "yellow";
            contexto.rect(brickx, bricky, brickw, brickh);
            contexto.stroke();
            contexto.fill();
            contexto.closePath();
            
            }

        }
    }  
}
function romper() {                                    // Metodo para romper los ladrillos
    for (let i = 0; i < columnas; i++) {
        for (let j = 0; j < filas; j++) {

        let ladrillo = bricks[i][j];                // Actualiza valor para x e y

        if (ladrillo.pintoladrillo) {

            let ladrillox = ladrillo.x;
            let ladrilloy = ladrillo.y;

        if (x + radio > ladrillox && x - radio < ladrillox + brickw && y + radio > ladrilloy && y - radio < ladrilloy + brickh) {

            movy = -movy;                                   
            ladrillo.pintoladrillo = false;
            marcador ++;

        if(marcador == columnas*filas){
            alert("HAS GANADO");
        }
                    }
                }
            }
        }
    }

    function marcadore(){          // Añadimos el marcador
        contexto.lineWidth = 5; 
        contexto.font= "25px sans-serif ";
        contexto.fillStyle = "red";
        contexto.fillText("Score: " + marcador, 10, 50);
        contexto.closePath();
    }

    function vida(){          // Añadimos el marcador
        contexto.lineWidth = 5; 
        contexto.font= "25px sans-serif ";
        contexto.fillStyle = "red";
        contexto.fillText("Vidas: " + vidas, canvas.width-100, 50);
        contexto.closePath();
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

function pinta(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);   // Sirve para limpiar el canvas para que pinte las cosas
    raqueta();
    pelota();
    ladrillo();
    romper();
    marcadore();
    vida();

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
                    vidas--;
                    if(vidas < 1) {                   
                alert("HAS PERDIDO");
                }else{ 
                    x = canvas.width / 2; 
                    y = canvas.height - 50;
                    movx= 2;    
                    movy=-2;
                    }
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