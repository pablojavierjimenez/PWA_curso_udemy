

/*
 * APP SHELL: es todo aquello que si o si necesita nuestra app
 * para funcionar, offline y puede variar mucho segun cada aplicacion
 */



const CACHE_STATIC = 'static_v2';
const CACHE_DYNAMIC = 'dynamic_v1';
const CACHE_INMUTABLE = 'inmutable_v1';

function cleanCache( cacheName, totalItems) {

    caches.open(cacheName)
        .then( cache => {
            return cache.keys()
                .then( keys => {
                    if ( keys.length > totalItems ) {
                        
                        cache.delete( keys[0] )
                            .then(cleanCache(cacheName, totalItems))
                    }
                })
        })
}

self.addEventListener('install', ev => {

    const appShell = caches.open(CACHE_STATIC).then( cache => {

        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/css/style.css'
        ]);
    });
    
    const cacheDynamic = caches.open( CACHE_INMUTABLE ).then( cache => {
        cache.addAll(['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css']) 
    });


    ev.waitUntil( Promise.all([appShell, cacheDynamic]) );
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
           //console.log('no existe en el cache', ev.request.url);

           return fetch( ev.request )
                   .then( newRes => {

                        // con esta parte lo que hacemos es que si ese archivo
                        // que no teniamos en cache, ademas de ir a buscarlo a internet,
                        // lo agregamos al cache para la proxima
                       caches.open( CACHE_DYNAMIC )
                           .then( cache => {
                               cache.put( ev.request, newRes );
                               cleanCache( CACHE_DYNAMIC, 4);
                           });
                       return newRes.clone();
                   });
       });
   
   ev.respondWith(requestedFile)

});