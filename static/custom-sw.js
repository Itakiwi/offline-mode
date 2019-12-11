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
    '/static/*'
]

self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching assets')
            cache.addAll(assets)
        })
    )
})    

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key)))
        })
    )
}) 

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCache).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                return fetchRes;
            })
        });
      })
  )
}) 