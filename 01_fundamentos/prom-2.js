function sumarUno(numero) {
  var promesa = new Promise(function (resolve, reject) {

    console.log(numero);
    if ( numero >= 8 ) {
        reject('numero demasiado alto');
    }
    setTimeout(function () {
      resolve(numero + 1);
    }, 800);
  });

  return promesa;
}

// Creando promesas
sumarUno( 4 )
    .then( sumarUno)
    .then( sumarUno)
    .then( valorFinal => {
        console.log(valorFinal); 
    });


// manejando error con catch 
sumarUno( 8 )
    .then( nuevoNumero => {
        console.log(nuevoNumero);
    })
    .catch( error => {
        console.log('Error en Promesa: ', error)
    })