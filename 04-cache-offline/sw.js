/*
 * APP SHELL: es todo aquello que si o si necesita nuestra app
 * para funcionar, offline y puede variar mucho segun cada aplicacion
 */

const CACHE_STATIC = 'static_v2';
const CACHE_DYNAMIC = 'dynamic_v1';
const CACHE_INMUTABLE = 'inmutable_v1';
const CACHE_DYNAMIC_LIMIT = 10;

self.addEventListener('install', (ev) => {
    const appShell = caches.open(CACHE_STATIC).then((cache) => {
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/css/style.css',
            '/img/no-img.jpg'
        ]);
    });

    const cacheDynamic = caches.open(CACHE_INMUTABLE).then((cache) => {
        cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        ]);
    });

    ev.waitUntil(Promise.all([appShell, cacheDynamic]));
});

/*
 * estrategias de cache
 */
self.addEventListener('fetch', (ev) => {
    if (!ev.request.url.includes('chrome-extension://')) {
        /**
         * ESTRATEGIA 1: Cache Only
         */
        // const response = cacheOnly(ev);

        /**
         * ESTRATEGIA 2: Cache With Network Fallback
         * si el archivo no se encuentra en el Cache
         * recien ahi ir a buscarlo a la internet
         */
        // const response = cacheWithNetworkFallback(ev);

        /**
         * ESTRATEGIA 3: Network Fallback with Cache Fallback
         */
        // const response = networkWithCacheFallback(ev);
        
        /**
         * ESTRATEGIA 4: Cache With Network Update
         */
        // if (ev.request.url.includes('bootstrap') ) {
        //     ev.respondWith( caches.match( ev.request))
        // }
        // const response = cacheWithNetworkUpdate(ev);
        
        /**
         * ESTRATEGIA 5: Cache and Network Race
         */
        const response = cacheAndNetworkRace(ev);


        ev.respondWith( response );
    }
});

function cleanCache(cacheName, totalItems) {
    caches.open(cacheName).then((cache) => {
        return cache.keys().then((keys) => {
            if (keys.length > totalItems) {
                cache.delete(keys[0]).then(cleanCache(cacheName, totalItems));
            }
        });
    });
}

function cacheOnly(ev) {
    return ev.respondWith(caches.match(ev.request));
}

function cacheWithNetworkFallback(ev) {
    const response = caches.match(ev.request).then((res) => {
        if (res) return res;

        // pero si el archivo no existe en cache
        // tengo que ir a buscarlo en la web
        //console.log('no existe en el cache', ev.request.url);

        return fetch(ev.request).then((newRes) => {
            // con esta parte lo que hacemos es que si ese archivo
            // que no teniamos en cache, ademas de ir a buscarlo a internet,
            // lo agregamos al cache para la proxima
            caches.open(CACHE_DYNAMIC).then((cache) => {
                cache.put(ev.request, newRes);
                cleanCache(CACHE_DYNAMIC, 4);
            });
            return newRes.clone();
        });
    });

    return response;
}

function networkWithCacheFallback(ev) {
    const response = fetch(ev.request)
        .then((res) => {
            // esta linea de abajo se agrega porque un 404 no es atrapado por el catch
            // asi que hay que hacer un fallback a eso tambien
            if (!res) return caches.match(ev.request);

            caches.open(CACHE_DYNAMIC).then((cache) => {
                cache.put(ev.request, res);
                cleanCache(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT);
            });

            return res.clone();
        })
        .catch((err) => {
            return caches.match(ev.request);
        });

    return response;
}

function cacheWithNetworkUpdate(ev) {
    return caches.open(CACHE_STATIC).then( cache => {
        
        fetch( ev.request ).then( res => cache.put( ev.request, res ) );

        return cache.match( ev.request );
    })
}

function cacheAndNetworkRace(ev) {

    return new Promise( (resolve, reject) => {
        let isRrejected = false;

        const requestFail = () => {
            if ( isRrejected ) {
                if ( /\.(png|jpg)$/i.test( ev.request.url ) ) {

                    resolve( caches.match( '/img/no-img.jpg') );                
                } else {
                    reject('no se encontro el archivo')
                    
                }
            } else {
                isRrejected = true;
            }
        };


        fetch( ev.request )
            .then( res => {
                res.ok ? resolve(res) : requestFail();
            })
            .catch( requestFail );

        caches.match( ev.request ).then( res => {
            res ? resolve(res) : requestFail();
        });
        
    });
}