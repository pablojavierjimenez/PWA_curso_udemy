
function retornaObject() {
    return {facil:true};
}


function sumarLento( numero ) {
    var promesa = new Promise( function ( resolve, reject ) {
        setTimeout( function(){
            resolve(numero + 1);
        }, 800)
    })

    return promesa;
}

function sumarRapido ( numero ) {
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve(numero + 1) , 300)
    })
}


// promise.all puede resivir un array de cualquier cosa
let cosas = [ true, sumarLento(5), sumarRapido(10), 'que onda', retornaObject()]
Promise.all( cosas )
    .then( respuestas => {
        console.log(respuestas)
    })
    .catch( console.log )