

/*
 * APP SHELL: es todo aquello que si o si necesita nuestra app
 * para funcionar, offline y puede variar mucho segun cada aplicacion
 */

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
    ev.respondWith( caches.match( ev.request ) )
 })