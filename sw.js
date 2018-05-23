let CacheName = 'restaurant-reviews';
let FilesToCache = [
  './',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/sw.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];


self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(CacheName).then(cache => {
            return cache.addAll(FilesToCache)
          })
      );
    });

    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim());
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.open(CacheName)
          .then(cache => cache.match(event.request, {ignoreSearch: true}))
          .then(response => {
          return response || fetch(event.request);
        })
      );
    });
