

function sumarUno(numero, callback) {

      setTimeout(function () {
        callback(numero + 1);
      }, 800);
  
 }

 sumarUno( 5 , function(nuevoValor){
    sumarUno( nuevoValor, function( nuevoValor2 ) {
        console.log(nuevoValor2)
        sumarUno( nuevoValor2, function( nuevoValor3 ) {
            console.log(nuevoValor3)
        })
    })
 })