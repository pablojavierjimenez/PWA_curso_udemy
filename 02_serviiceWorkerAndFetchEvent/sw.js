self.addEventListener('fetch', event => {

    console.log('fetch: ', event )

    if ( event.request.url.includes('style.css') ) {
        event.respondWith( null )

    }

    event.respondWith( fetch( event.request ) )

});