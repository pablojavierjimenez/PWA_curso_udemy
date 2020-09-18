
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
})