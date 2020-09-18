
// Ciclo de vida del SW

self.addEventListener('install', event => {
    /**
     * que hacemos normalmente en este hook:
     * - cargamos assets
     * - creariamos cache etc.
     * 
     * - todo lo que yo ejecute aqui dentro ocurre 
     * solamente la primera vez mientras el serviceworker, 
     * o la nueva version de el mismo esten siendo instalados
     */
    console.log('sw-v2:', event)

    // Esta funcion fuerza a la activacion de la nueva version del SW
    // pero no es recomendable utilizarla por riesgo a perder informacion sensible
    // durante la activacion de la nueva version,
    // por eso es que lo dejaremos comentado por ahora

    self.skipWaiting();
})

// Cuando el SW toma el control

self.addEventListener('activate', event => {
    /**
     * Normalmente lo que se hace en este listener es:
     * - remover cache de la version anterior
     */
    console.log('SW-v2: Activate event: ', event)
})