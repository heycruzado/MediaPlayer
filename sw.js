const VERSION = "v1";
/**
 * self es el this de los service workers
 * En la funcion llamamos a install y se llamara cuando el navegador instale el service worker
 */
self.addEventListener('install', event => {
    event.waitUntil(precache()); //lista de elementos en cache para regresar al navegador
});

/**
 * entramos al cache para ver si encontramos la respuesta
 */
self.addEventListener('fetch', event => {
    const request = event.request;
    //Solo utilizar peticiones get
    if (request.method !== "GET") {
        return;
    }

    //Peticion get
    //Buscar en cache
    event.respondWith(cachedResponse(request));

    //Actualizar el cache
    event.waitUntil(updateCache(request));
});

async function precache() {
    const cache = await caches.open(VERSION);//Abrimos el cache del navegador
    return cache.addAll([
    /*    '/',
        '/index.html',
        '/assets/index.js',
        '/assets/MediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/BigBuckBunny.mp4',
    */
    ]);
}

async function cachedResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request);
}

async function updateCache(request) {
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request, response);
}


