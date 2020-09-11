self.addEventListener('fetch', event => {
    // step: 1
    if (event.request.url.includes('.jpg')) {
        // let defaultImg = null;
        let defaultImg = fetch( event.request.url);        
        event.respondWith(defaultImg)
    }

    

});