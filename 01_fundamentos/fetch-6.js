
/**
 * FETCH
 * handling error 404
 * un error en las respuesta del servidor no es un error de script en js,
 * por lo tanto no es un tipo de error manejado por el catch.
 * 
 */

let userId = 1000;

fetch(`https://reqres.in/apiusers/${userId}`)
.then( data => { 

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(`No existe el usuario: ${userId}`)
    }
} )
.then(console.log)
.catch( error => {
    console.log('error en la peticion: ')
    console.log(error)
});