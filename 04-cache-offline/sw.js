

/*
 * APP SHELL: es todo aquello que si o si necesita nuestra app
 * para funcionar, offline y puede variar mucho segun cada aplicacion
 */
const CACHE_NAME = 'appshell_v1';
 self.addEventListener('install', ev => {

    const appShell = caches.open('appshell_v1')
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/js/app.js',
                '/css/style.css',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ]);

        });

    ev.waitUntil( appShell )
 });

/*
 * estrategias de cache
 */
self.addEventListener('fetch', ev => {

   /**
    * ESTRATEGIA 1: Cache Only
    */
   //ev.respondWith( caches.match( ev.request ) );
   
   /**
    * ESTRATEGIA 1: Cache With Network Fallback
    * si el archivo no se encuentra en el Cache
    * recien ahi ir a buscarlo a la internet
    */
   const requestedFile =  caches.match( ev.request )
       .then( res => {
           if ( res ) return res;

           // pero si el archivo no existe en cache
           // tengo que ir a buscarlo en la web
           console.log('no existe en el cache', ev.request.url);

           return fetch( ev.request )
                   .then( newRes => {

                        // con esta parte lo que hacemos es que si ese archivo
                        // que no teniamos en cache, ademas de ir a buscarlo a internet,
                        // lo agregamos al cache para la proxima
                       caches.open(CACHE_NAME)
                           .then( cache => {
                               cache.put( ev.request, newRes );
                           });
                       return newRes.clone();
                   });
       });
   
   ev.respondWith(requestedFile)

});