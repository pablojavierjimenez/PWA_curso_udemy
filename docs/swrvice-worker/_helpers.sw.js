/**
 *
 */

function updateDynamicCache(dynamicCache, req, res) {
    console.log('se ejecuto el helper');
    if ( res.ok ) {
        caches.open( dynamicCache ).then( cache => {
            cache.put( req, res.clone() );
            return res.clone();
        });
    } else {
        return res;
    }
}
