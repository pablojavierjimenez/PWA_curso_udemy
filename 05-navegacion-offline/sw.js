

const CACHE_INMUTABLE = "cache-inmutable_v3";
const CACHE_STATIC = "cache-static_v4";
const CACHE_DINAMYC = "cache-dinamyc_v3";

self.addEventListener('install', event => {
    const cacheInmutable = caches.open(CACHE_INMUTABLE)
        .then( cache => {
            return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });
    const cacheStatic = caches.open(CACHE_STATIC)
        .then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/app.js',
                '/img/main.jpg',
                '/img/no-img.jpg',
                '/pages/offline.html'
            ])
        });
    
    //event.respondWith( new Promise.all([cacheStatic, cacheInmutable]))
    
})

self.addEventListener('activate', ev => {

    const response = caches.keys().then( keys => {

        keys.forEach( key => {
            if ( 
                key !== CACHE_STATIC
                && key.includes('static')
            ) {
                caches.delete(key);
            }
        })
    })
    ev.waitUntil(response);
})


self.addEventListener('fetch', event => {

    const response = caches.match(event.request)
        .then( res => {

            if (res) return res;

            return fetch(event.request)
                .then( newRes => {  
                    caches.open(CACHE_DINAMYC).then( cache => {
                        cache.put( event.request, newRes )
                        limpiarCache( CACHE_DINAMYC, 50 )
                    })

                    return newRes.clone();
                })
                .catch( err => {
                    console.log('fetcherror: ',err)

                    if ( event.request.headers.get('accept').includes('text/html') ) {
                        
                        console.log('no se encontro este html: ', event.request.url)
                        return caches.match('/pages/offline.html')
                            // .then( cache => {
                            //     return new Response(cache);
                            // })
                    }
                })
        })

    event.respondWith(response)
})


function limpiarCache( cacheName, numeroItems ) {
    caches.open( cacheName )
        .then( cache => {
            return cache.keys()
                .then( keys => {
                  
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });
        });
}