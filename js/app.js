//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//EvenListeners
evenListeners();

function evenListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuendo el documento se carga
    document.addEventListener('DOMContentLoaded', () => {
        //recupero los el arreglo de tweets del local storage
        //en caso de que no haya arreglo establezco tweets como un arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}


//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    //Validación
    if(tweet === '') {
        mostrarError('Un tweet no puede enviarse sin texto');

        return;
    }

    const tweetObj = {
        id : Date.now(),
        tweet // se puede utilizar de esta forma puesto que la clave y el valor tienen el mismo nombre
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    
    //Una vez agregado se crea el html
    crearHTML();

    //reiniciar el formulario 
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar el mensaje de error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar el mensaje de error despues de 3 s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //crear el botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'
            //añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            //crear el html
            const li = document.createElement('li');
            //anadir el texto
            li.innerText = tweet.tweet;
            //asignar el boton
            li.appendChild(btnEliminar);
            //insertarlo en el hmtl
            listaTweets.appendChild(li);
            
        });
    }

    sincornizarStorage();
}

//Agrega los tweets actuales al localstorage
function sincornizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

//limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}