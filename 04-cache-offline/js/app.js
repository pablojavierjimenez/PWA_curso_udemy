

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('./sw.js');
}


if ( window.caches ) {

    // caches.open con este comando creamos nuevas 
    // """Tablas""" dentro del Cache Storage
    caches.open('prueba-1');
    caches.open('prueba-2');
    
    // caches.has nos permite saber si existe una determinada
    // """Tabla""" dentro del Cache Storage
    caches.has('prueba-3').then( exist => console.log(exist))
    
    // caches.delete nos permite eliminar una 
    // """Tabla""" dentro del Cache Storage
    caches.delete('prueba-1').then( isDeleted => console.log('prueba 1 fue borada?: ', isDeleted) )
    
    // con cache.open ademas de crear """Tabla"""en el cache storage,
    // utilizando el metodo then que nos devuelve, podemos manipular 
    // esa tabla en particular asi como agregar registros dentro de ella o 
    // crearlos leerlos, eliminarlos o sobreescribirlos
    caches.open('prueba-v1.1')
        .then( cache => {

            cache.add('/index.html');

            cache.addAll([
                './js/app.js',
                './img/main.jpg',
                '/css/style.css'
            ]).then( () => {
                
                // el borrado se colo co aca porque tarda mas en escribir
                // en cache, asi que una vez resulve la promesa de 
                // salvar los archivos en cache lo elimino
                cache.delete('/css/style.css');

                // medante el comando PUT commando podemos sobreescribir un registro en el cache
                // en este en este caso sobreescribimos el contenido de el archivo index.html
                cache.put('index.html', new Response('Hola Offline Mundo!!'));

            });
        });

    caches.match('/index.html')
        .then( res => {
            res.text().then( console.log );
        });
    
    caches.keys().then( console.log )
}