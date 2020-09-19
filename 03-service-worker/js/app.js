

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('./sw.js')
        .then( reg => {

            // SYNC: para cuando perdemos coneccion con el internet
            setTimeout( () => {
                reg.sync.register('posteo-gatitos')
                console.log('se enviaron las fotos de gatitos a sofovich')
            }, 3000 )
        })
}

// fetch('https://reqres.in/api/users')
//     .then( (res) => res.text() )
//     .then( data => console.log('users: ', data))