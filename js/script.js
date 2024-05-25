var rachaNum = 0;
var puntuacionNum = 0;
var intentoNum = 1


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function listaPalabras (basePalabras){
    var cantidadPalabras = getRandomInt(0, basePalabras.length);
    return basePalabras[cantidadPalabras];
}

//Declaración de variables
var basePalabras = ["VIVIR","UNIVERSIDAD","PROYECTO","PAGINA","HOLA","SISTEMAS","INFORMACION"];
var botonInicioPresionado = false;
var palabraRandom;
var arrayLetrasCorrectas = [];
var arrayLetrasIncorrectas =[];
var finalJuego;

//Función diseñada para agregar un nuevo elemento keyName a arrayLetras si no está ya presente en el array.
function agregarLetra (arrayLetras, keyName){
  var repetido = false;

  if (arrayLetras[0] == ""){
          arrayLetras.push(keyName);
  }else{
      for (i=0; i < arrayLetras.length; i++){
          if (keyName == arrayLetras[i]){
              repetido = true;
          }
      }
      if (!repetido){
          arrayLetras.push(keyName);
      }
  }
  return arrayLetras;
};

//Función que toma un parámetro cantidadIntentos y devuelve un valor booleano (true o false) indicando si el juego ha terminado o no.
function finJuego (cantidadIntentos){
  var fin = false;
  if (cantidadIntentos == 9){
      fin = true;
  }
  return fin;
}

//Función que determina si el usuario ha ganado un juego basado en una palabra aleatoria y una lista de letras acertadas.
function ganador (palabraRandom, aciertos){
  var fin = false;

  if (aciertos.length != 0){
      fin = true;
      for (i=0; i < palabraRandom.length; i++){
          if (fin){
              for(j=0; j<aciertos.length; j++){
                  if (palabraRandom[i] == aciertos[j]){
                      fin = true;
                      break;
                  }else{
                      fin = false;
                  }
              }
          }else{
              break;
          }
      }
  }
  return fin;
}

//Función que verifica si un carácter dado cumple con ciertas condiciones.
function validarCaracter(caracter){
  var valido = false;
  const patron = new RegExp("[A-ZÑ]");
  if (caracter.length == 1 && botonInicioPresionado && patron.test(caracter)){
      valido = true;
  }
  return valido;
}

//Función verifica si un texto cumple con ciertas condiciones.
function validarTexto (texto){
  const patron = new RegExp("[A-ZÑ]$");  //Este patrón busca que el texto termine con una letra mayúscula (A-Z) o la letra Ñ. El símbolo $ indica que la coincidencia debe ocurrir al final del texto.
  const espacio = /\s/;  //Este patrón busca espacios en blanco (\s) en el texto.
  var valido = false;
  if (patron.test(texto) && !espacio.test(texto)){
      valido = true;
  }
  return valido;
}


//secuencia principal
document.addEventListener('keydown', function(event){
  var keyName = event.key;
  keyName = keyName.toUpperCase();

  if (!finalJuego){
      if (validarCaracter(keyName)){
          const buscar = new RegExp(keyName);
          if (buscar.test(palabraRandom)){
              agregarLetra(arrayLetrasCorrectas,keyName)
          }else{
              agregarLetra(arrayLetrasIncorrectas,keyName)
          }
      }

      for (j=0; j < arrayLetrasCorrectas.length; j++){
          drawLetraCorrecta(palabraRandom,arrayLetrasCorrectas[j]);
      }

      drawLetraIncorrecta(arrayLetrasIncorrectas);

      if (finJuego (arrayLetrasIncorrectas.length)){
          drawFinJuego("Fin del Juego!");
          document.getElementById("input-text").style.display = "block";
          document.getElementById("btn-iniciar").textContent = "INICIAR JUEGO";
          document.getElementById("btn-reiniciar").textContent = "REINICIAR";
          //añadir a la tabla
          //no cambiar el orden de las siguientes lineas
          appendRow();
          puntuacionNum = 0;
          rachaNum = 0;

          
          intentoNum++;
          finalJuego = true;
      }

      if (ganador(palabraRandom,arrayLetrasCorrectas) && !finalJuego){
            drawFinJuego("Ganaste, Felicidades");
            document.getElementById("input-text").style.display = "block";
            finalJuego = true;
            iniciarJuego.style.display = "block";
            //racha y puntaje
            definirPuntaje();
            }
      definirIntento(9-arrayLetrasIncorrectas.length);      
  }
      
});

//Función que se encarga de agregar una nueva fila a la tabla HTML.
function appendRow() {
    // Obtiene el body de la tabla
    var tbody = document.querySelector(".stats-table table tbody");
  
    // Crea una nueva fila y celdas
    var row = document.createElement("tr");
    var numberCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    var winStreakCell = document.createElement("td");
  
    // Coloca el texto en la celda
    numberCell.textContent = intentoNum;
    scoreCell.textContent = puntuacionNum;
    winStreakCell.textContent = rachaNum;
  
    // Agrega las celdas a la fila
    row.appendChild(numberCell);
    row.appendChild(scoreCell);
    row.appendChild(winStreakCell);
  
    // Añade la fila a la tabla
    tbody.appendChild(row);
  }

function definirPuntaje(){
    var racha = document.querySelector("#racha");
    var puntuacion = document.querySelector("#puntuacion");
    

    rachaNum++;
    puntuacionNum = puntuacionNum + (10-arrayLetrasIncorrectas.length)*10;

    racha.textContent = "Racha: " + rachaNum;
    puntuacion.textContent = "Puntuación: " + puntuacionNum;
}

function definirIntento(numero){
    var intento = document.querySelector("#intentos");
    intento.textContent = "INTENTOS: " + (numero);
    //console.log(9-arrayLetrasIncorrectas.length);
}

//En resumen, este código maneja la lógica de inicio del juego. Cuando se carga la página, 
//se muestra un elemento de entrada de texto. Cuando se hace clic en el botón "iniciarJuego", 
// se oculta el elemento de entrada, se inicializan algunas variables, se selecciona una palabra aleatoria de una lista, se dibujan guiones para representar la palabra, y se establece una variable para indicar que se ha presionado el botón de inicio.
// se dibujan guiones para representar la palabra, y se establece una variable para indicar que se ha presionado el botón de inicio.
document.addEventListener("DOMContentLoaded", function () { 
  document.getElementById("input-text").style.display = "block";
});

var iniciarJuego = document.querySelector("#btn-iniciar");
iniciarJuego.addEventListener("click", function (evt){
  evt.preventDefault();
  
  arrayLetrasCorrectas = [];
  arrayLetrasIncorrectas =[];
  finalJuego = false;
  iniciarJuego.textContent = "CONTINUAR";
  iniciarJuego.style.display = "none";
  document.getElementById("input-text").style.display = "none";
  palabraRandom = listaPalabras(basePalabras);
  console.log(palabraRandom);

  drawGuiones(palabraRandom);
  botonInicioPresionado = true;
  
  console.log(basePalabras);

  definirIntento(9)
});

//cada vez que se refresca la pagina se carga en la lista de palabras la ultima ingresada
// por el usuario
(()=>{
  if (localStorage.getItem("palabraNueva"+ basePalabras.length) != null){
      for(i=0; i < localStorage.length; i++){
          basePalabras.push(localStorage.getItem("palabraNueva"+basePalabras.length));
      }
  }
})();

//BOTON AGREGAR
var btnAgregar = document.querySelector("#btn-agregar");
btnAgregar.addEventListener("click", function(evt){
  evt.preventDefault();
  var palabraRepetida = false;
  botonInicioPresionado = false;
  var agregarPalabra = document.querySelector("#agregar-palabra");
  var palabraNueva = agregarPalabra.value.toUpperCase();
 
  

  if (validarTexto(palabraNueva)){
      for(j=0; j < basePalabras.length; j++){
          if (basePalabras[j] == palabraNueva){
              palabraRepetida = true;
              break;
          }
      };
      for(i=0; i < localStorage.length; i++){
          if (localStorage.getItem("palabraNueva"+basePalabras.length) == palabraNueva){
              palabraRepetida = true;
              break;
          }
      };

      if (!palabraRepetida){
          localStorage.setItem("palabraNueva" + basePalabras.length,palabraNueva);
          basePalabras.push(palabraNueva);
      };
  };
  
  agregarPalabra.value = "";
})

//BOTON REINICIAR
let btnReiniciar = document.getElementById("btn-reiniciar");

btnReiniciar.addEventListener("click", function() {
// Obtener boton "btn-reiniciar" 
    let btnReiniciar = document.getElementById("btn-reiniciar");
    var racha = document.querySelector("#racha");
    var puntuacion = document.querySelector("#puntuacion");
    iniciarJuego.style.display = "block";
    iniciarJuego.textContent = "INICIAR JUEGO";

    // Coloca el texto en el boton "btn-reiniciar" 
    btnReiniciar.textContent = "REINICIAR JUEGO";
    document.getElementById("input-text").style.display = "block";
    // Coloca rachaNum y puntuacionNum en 0
    rachaNum = 0;
    puntuacionNum = 0;

    // Coloca rachaNum y puntuacionNum en 0 en la pantalla
    racha.textContent = "Racha: " + rachaNum;
    puntuacion.textContent = "Puntuación: " + puntuacionNum;

    //definir intento
    definirIntento(0);

});

