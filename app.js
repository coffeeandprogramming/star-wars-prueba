const ant = document.getElementById("anterior")  // boton 'anterior'
const sig = document.getElementById("siguiente")  // boton 'sig'

const nombre = document.getElementById("nombre");
const planeta = document.getElementById("planeta");
const peliculas = document.getElementById("peliculas");
const caracteristica1 = document.getElementById("altura");
const caracteristica2 = document.getElementById("colorojos");
const caracteristica3 = document.getElementById("genero"); // me traigo las caracteristicas a mostrar en el segundo recuadro

const pj1 = document.getElementById("uno")
const pj2 = document.getElementById("dos")
const pj3 = document.getElementById("tres")
const pj4 = document.getElementById("cuatro")
const pj5 = document.getElementById("cinco")
const pj6 = document.getElementById("seis")
const pj7 = document.getElementById("siete")
const pj8 = document.getElementById("ocho")
const pj9 = document.getElementById("nueve")
const pj10 = document.getElementById("diez")

const url = 'https://swapi-node.now.sh/api/people?page=';

let arregloPersonajes = [pj1, pj2, pj3, pj4, pj5, pj6, pj7, pj8, pj9, pj10] /* me traigo los 10 personajes a listar y 
                                                                  los guardo en un arreglo para mayor comodidad*/

let info;

// variable utilizada par aguardar lo que me devuelva fetch
function tirarFetch(pagActual) {
    // console.log("hola" + url + pagActual)
    fetch(url + pagActual)
        .then(Response => Response.json())
        .then(data => {
            info = data
            console.log('info: ', info)
            asignarNombres()
        })
        .catch(error => alert("se produjo un error"))
}
tirarFetch(1);


for (let i = 0; i < 10; i++) {
    const pj = arregloPersonajes[i]               // a cada personaje listado le añado el EventListener click 
    pj.addEventListener('click', () => traerDatos(i)) // para que a la hora de clickearlos se ejecute TraerDatos()

}
let paginaActual = 1;


ant.addEventListener('click', antPagina)
sig.addEventListener('click', sigPagina)

function antPagina() {
    if (paginaActual > 1) { // No utilizamos la pagina 0 de la api ya que el puntero previo de la 1 está en null
        paginaActual--

        if (info.previous != null) {
            tirarFetch(paginaActual);
        }


    }
    else { alert('no hay pagina anterior') }
}

function sigPagina() {
    if (paginaActual < 9) {
        paginaActual++
        if (info.next != null) {
            // console.log('URL SIGUIENTE:' + url + paginaActual)
            tirarFetch(paginaActual)
        }
    }
    else { alert('no hay pagina siguiente') }
}

function asignarNombres() {
    for (let i = 0; i < arregloPersonajes.length; i++) {
        console.log(info);
        if (i < info.results.length) {
            arregloPersonajes[i].textContent = info.results[i].fields.name;
        }
        else {
            arregloPersonajes[i].textContent = " ";
        }

        // le asigno a cada personaje su nombre
    }
}


function traerDatos(i) {
    nombre.textContent = info.results[i].fields.name;
    planeta.textContent = info.results[i].fields.planet;
    /*for (let peli of info.results[i].fields.films) {
        const li = document.createElement("li");
        li.textContent = peli
        peliculas.appendChild(li);
    } */
    caracteristica1.textContent = info.results[i].fields.height;
    caracteristica2.textContent = info.results[i].fields.eye_color;
    caracteristica3.textContent = info.results[i].fields.gender;
}