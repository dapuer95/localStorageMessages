//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//EvenListeners
evenListeners();

function evenListeners() {
    formulario.addEventListener('submit', agregarTweet);
}


//Funciones
function agregarTweet(e) {
    e.preventDefault();

    console.log('agregando tweet');
}