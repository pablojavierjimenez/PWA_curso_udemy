self.addEventListener('fetch', event => {
    // step: 1
    // if (event.request.url.includes('.jpg')) {
    //     // let defaultImg = null;
    //     let defaultImg = fetch( event.request.url);        
    //     event.respondWith(defaultImg)
    // }

    //step: 2
    if ( event.request.url.includes( 'style.css' ) ) {

        let res = new Response(`
            body {
                background-color: red !important;
                color: black;
            }
        `,{
            headers: {
                'Content-Type': 'text/css'
            }
        });

        event.respondWith( res );
    }

});