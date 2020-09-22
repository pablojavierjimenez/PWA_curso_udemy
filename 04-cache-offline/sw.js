


self.addEventListener('fetch', event => {


    const offlineResponse = new Response(`
        Bienvenido  a mi sitio web 
        disculpa las molestias
    `);

    const res = fetch( event.request )
                    .catch( () => {
                        return offlineResponse
                    })



    event.respondWith( res );
    console.log(event);
})