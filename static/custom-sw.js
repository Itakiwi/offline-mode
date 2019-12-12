console.log('Custom service worker!')

const staticCacheName = 'site-static';
const dynamicCache = 'site-dynamic-v1';

const assets = [
    '/',
    'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.ttf?v=4.7.95',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
    '_/nuxt/*',
    'https://jsonplaceholder.typicode.com/users',
    '/static/*',
    '/static/favicon.ico'

]

self.addEventListener('install', event => {
    // console.log('service worker has been installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching assets')
            cache.addAll(assets)
        })
    )
})    

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key)))
        })
    )
}) 

self.addEventListener('fetch', event => {
    console.log("Inside fetch")
    if(event.request.method === "POST") {
        console.log('Handling fetch event for', event.request);
        indexedDB.open('requests', 1, function(upgradeDB) {
            var store = upgradeDB.createObjectStore('POST', {
              keyPath: 'id'
            });
            store.put({URL: event.request.url, body: event.request.body});
          });
    }
    else {
    event.respondWith(
            caches.match(event.request)
            .then(cacheRes => {
                console.log("this is not a post")

                return cacheRes || fetch(event.request).then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    })
                });
            })
        )
    }
}) 