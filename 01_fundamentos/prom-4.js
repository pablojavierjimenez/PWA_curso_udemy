
function sumarLento( numero ) {
    var promesa = new Promise( function ( resolve, reject ) {
        setTimeout( function(){
            // resolve(numero + 1);
            reject("ERROR en la funcion lenta")
        }, 800)
    })

    return promesa;
}

function sumarRapido ( numero ) {
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve(numero + 1) , 300)
    })
}


// Promise.race pone a correr todas las  promesas en paralelo
// y devuelve solo la promesa que se resuelva primero,
// y si alguna falla frena toda las ejecuciones

Promise.race( [ sumarLento(5), sumarRapido(10)] )
    .then( respuesta => {
        console.log(respuesta);
    })
    .catch( console.log );