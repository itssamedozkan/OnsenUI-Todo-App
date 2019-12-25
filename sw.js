const CACHE ='JS_Class'
const FILES = ['html/completed_tasks.html','html/details_task.html','html/menu.html','html/new_task.html','html/pending_tasks.html',
'images/icon192.png','js/app.js','js/controllers.js','js/services.js','index.html','manifest.json','style.css','sw.js']
function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('JS_Class', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
