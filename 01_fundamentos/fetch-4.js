/**
 * FETCH -4
 * trabajando con blobs
 */


let img = document.querySelector('img');

 fetch( "./superman.png")
    .then( res => res.blob() )
    .then( image => {
        var imgPath = URL.createObjectURL(image);
        img.src= imgPath;
    })