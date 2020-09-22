


self.addEventListener('fetch', event => {

    /**
     * STEP: 1
     * detectar cuando esta offline y enviaruna respuesta
     */
    // const offlineResponse = new Response(`
    //     Bienvenido  a mi sitio web 
    //     disculpa las molestias
    // `);

    /**
     * STEP: 2
     * respondeos  con un un html personalizado
     * el siguiente codigo no funciona porque devuelve un error de js
     * o el clasico Object[object]
     * no se puede utilizar fetch para requerir un archivo .html de este modo
     * entonces en el siguiente paso se vera como hacer
     *  const offlineTemplate = fetch('./pages/offline.html');
     */

    const offlineResponse = new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
       <h1> Lo sentimos pero no tienes conneccion 😱</h1> 
    </body>
    </html>
    `,
    {
        headers:{
            'Content-Type':'text/html'
        }
    }
    );



    const res = fetch( event.request )
                    .catch( () => offlineResponse )



    event.respondWith( res );
    console.log(event);
})