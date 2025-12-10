
const CACHE = 'ranaji-v1';
const FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/camera.html',
  '/reels.html',
  '/kundli.html',
  '/horoscope.html'
];
['/icon-72.png','/icon-96.png','/icon-128.png','/icon-192.png','/icon-384.png','/icon-512.png'].forEach(i=>FILES.push(i));

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request).catch(()=>caches.match('/index.html')))
  );
});
