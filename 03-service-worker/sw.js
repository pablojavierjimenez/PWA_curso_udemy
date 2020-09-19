
// Ciclo de vida del SW

self.addEventListener('install', event => {
    /**
     * STEP: 1
     * que hacemos normalmente en este hook:
     * - cargamos assets
     * - creariamos cache etc.
     * 
     * - todo lo que yo ejecute aqui dentro ocurre 
     * solamente la primera vez mientras el serviceworker, 
     * o la nueva version de el mismo esten siendo instalados
     */
    console.log('sw-v2:', event)

    /**
     * STEP: 2-b
     * Esta funcion fuerza a la activacion de la nueva version del SW
     * pero no es recomendable utilizarla por riesgo a perder informacion sensible
     * durante la activacion de la nueva version,
     * por eso es que lo dejaremos comentado por ahora
     */
    // self.skipWaiting();

    /**
     * STEP: 3
     * en esta parte simularemos con un timeout la carga/instalacion
     * de archivos, para poder probar la funcion waitUntil
     
     * STEP: 3-b
     * para poder escapar de los errores de sincronismo
     * utilizaremos la funcion  waitUntil en conbinacion
     * con una promesa
     */
    const onInstallationEnd = new Promise( ( resolve, reject ) => {
        
        setTimeout( () => {
            self.skipWaiting();
            resolve();
            console.log('SW: La simulacion de descarga finalizo!')
        }, 3000)
    })

    event.waitUntil( onInstallationEnd );
})

// Cuando el SW toma el control

self.addEventListener('activate', event => {
    /**
     * STEP: 2
     * Normalmente lo que se hace en este listener es:
     * - remover cache de la version anterior
     */
    console.log('SW-v2: Activate event: event')
})

// FETCH: Manejo de Peticiones HHTP

self.addEventListener('fetch', event => {
    //  Aplicar la estrategias del cache
    
    // console.log('SW: fetch', event.request.url)
    
    // if (event.request.url.includes('https://reqres.in/')) {
        
        //     const newRes = new Response(
            //         JSON.stringify({ok: false, message: 'forbbiden'}),
            //         {
                //             headers: {'content-type': 'application/json'}
                //         }
                //     );
                
                //     event.respondWith( newRes );
                // }
                
            })
            
// SYNC: es cuando recuperamos la coneccion a internet
self.addEventListener('sync', event => {
    
    console.log('Tenemos coneccion')
    // console.log(event)
    console.log(event.tag)
})

// PUSH: manejar las push notifications

self.addEventListener('push', event => {
    console.log('Notificacion recibida')
});
