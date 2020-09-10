

if ( navigator.serviceWorker  ) {
    console.log('podemos usar SW')

    navigator.serviceWorker.register('./sw.js')
}
