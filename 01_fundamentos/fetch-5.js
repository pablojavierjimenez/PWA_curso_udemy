

/**
 * FETCH
 * usando  res.clone
 * para reutilizar una respuesta de una peticion
 */

fetch('https://reqres.in/api/users/1')
.then( data => { 
    data.clone().json()
        .then( usuario => {
            console.log(usuario)
        })
    data.json().then( usuario => {
        console.log(usuario)
    })
} )