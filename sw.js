/* Service worker : garde l'application en cache pour qu'elle se rouvre
   même sans connexion. Les flux radio et la météo ne sont pas interceptés. */
var CACHE = 'reveil-v3';

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(['./', './index.html']);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  // supprime les anciennes versions en cache
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // réseau d'abord (pour recevoir les mises à jour), cache en secours
  var fresh;
  try { fresh = new Request(req.url, { cache: 'no-cache' }); } catch (er) { fresh = req; }
  e.respondWith(fetch(fresh).then(function (res) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
    return res;
  }).catch(function () {
    return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
