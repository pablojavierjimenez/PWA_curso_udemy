function sumarUno(numero) {
  var promesa = new Promise(function (resolve, reject) {

    if ( numero >= 8 ) {
        reject('numero demasiado alto');
    }
    setTimeout(function () {
      resolve(numero + 1);
    }, 800);
  });

  return promesa;
}

sumarUno( 5 )
    .then( sumarUno)
    .then( sumarUno)
    .then( sumarUno)
    .then( valorFinal => {
        console.log(valorFinal); 
    });