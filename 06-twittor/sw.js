
/**
 * TODO: creart un objeto 
 * const CACHE = {
 *  static: `static-v1`
 * ....
 * }
 */
const STATIC_CACHE = "static-v1";
const DINAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

/**
 * TODO: creart un objeto 
 * const SHELL = {
 *  inmutable: [....]
 *  * ....
 * }
 */
const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'js/app.js',
    'img/favicon.ico'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'css/animate.css',
    'js/libs/jquery.js'
];


self.addEventListener('install', event => {
    const cacheStatic = caches.open( STATIC_CACHE )
        .then( cache => cache.addAll( APP_SHELL ) );
    const cacheInmutable = caches.open( INMUTABLE_CACHE )
        .then( cache => cache.addAll( APP_SHELL_INMUTABLE ) );
    event.waitUntil(
        Promise.all([ cacheStatic, cacheInmutable])  
    );
});

self.addEventListener('activate', event => {

    const response = caches.keys().then( keys => {
        keys.forEach( key => {
            if ( key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }
        })
    });

    event.waitUntil(response);
});