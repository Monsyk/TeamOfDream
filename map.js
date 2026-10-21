'use strict';
(() => {
  const map = document.getElementById('cafe-map');
  if (!map) return;
  const tiles = document.getElementById('map-tiles');
  const zone = document.getElementById('map-zone');
  const marker = document.getElementById('uni-marker');
  const loading = document.getElementById('map-loading');
  const error = document.getElementById('map-error');
  const scale = document.getElementById('map-scale');
  const latitude = Number(map.dataset.lat), longitude = Number(map.dataset.lon);
  const radiusMeters = Number(map.dataset.radius);
  const tileTemplate = map.dataset.tileTemplate;
  // Web Mercator pixel coordinates; only tiles in the visible viewport are requested.
  const project = (lat,lon,zoom) => {
    const size = 256 * 2 ** zoom;
    const phi = Math.max(-85.05112878,Math.min(85.05112878,lat)) * Math.PI / 180;
    return {x:(lon + 180) / 360 * size,y:(1 - Math.log(Math.tan(phi) + 1/Math.cos(phi)) / Math.PI) / 2 * size};
  };
  let zoom = 16, center = project(latitude,longitude,zoom), started = false;
  let loaded = false, drawFrame = 0;
  const visibleTiles = new Map();
  const render = () => {
    drawFrame = 0;
    if (!started) return;
    const width = map.clientWidth, height = map.clientHeight;
    if (!width || !height) return;
    const left = center.x - width/2, top = center.y - height/2;
    const wanted = new Set();
    for (let x = Math.floor(left/256); x <= Math.floor((left+width-1)/256); x++) {
      for (let y = Math.floor(top/256); y <= Math.floor((top+height-1)/256); y++) {
        const key = zoom + '/' + x + '/' + y;
        wanted.add(key);
        let tile = visibleTiles.get(key);
        if (!tile) {
          tile = document.createElement('img');
          tile.alt = ''; tile.draggable = false; tile.width = tile.height = 256;
          tile.referrerPolicy = 'strict-origin-when-cross-origin';
          tile.onload = () => { loaded = true; loading.hidden = true; error.hidden = true; };
          tile.onerror = () => { if (!loaded) { loading.hidden = true; error.hidden = false; } };
          tile.src = tileTemplate.replace('{z}',zoom).replace('{x}',x).replace('{y}',y);
          visibleTiles.set(key,tile); tiles.append(tile);
        }
        tile.style.left = Math.round(x*256-left) + 'px';
        tile.style.top = Math.round(y*256-top) + 'px';
      }
    }
    for (const [key,tile] of visibleTiles) if (!wanted.has(key)) {tile.remove();visibleTiles.delete(key);}
    const campus = project(latitude,longitude,zoom);
    const px = campus.x-left, py = campus.y-top;
    const metersPerPixel = Math.cos(latitude*Math.PI/180)*40075016.686/(256*2**zoom);
    const r = radiusMeters/metersPerPixel;
    map.classList.add('map-ready');
    zone.style.cssText = 'width:'+(2*r)+'px;height:'+(2*r)+'px;left:'+(px-r)+'px;top:'+(py-r)+'px';
    marker.style.left = px+'px'; marker.style.top = py+'px';
    scale.style.width = (200/metersPerPixel)+'px';
    document.getElementById('map-plus').disabled = zoom >= 17;
    document.getElementById('map-minus').disabled = zoom <= 14;
  };
  const schedule = () => { if (!drawFrame) drawFrame = requestAnimationFrame(render); };
  const changeZoom = delta => {
    const next = Math.max(14,Math.min(17,zoom+delta));
    if (next === zoom) return;
    center = {x:center.x*2**(next-zoom),y:center.y*2**(next-zoom)};
    zoom = next; render();
  };
  document.getElementById('map-plus').addEventListener('click',() => changeZoom(1));
  document.getElementById('map-minus').addEventListener('click',() => changeZoom(-1));
  document.getElementById('map-reset').addEventListener('click',() => {zoom=16;center=project(latitude,longitude,zoom);render();});
  map.addEventListener('keydown',event => {
    if (event.target !== map) return;
    const shifts = {ArrowLeft:[-80,0],ArrowRight:[80,0],ArrowUp:[0,-80],ArrowDown:[0,80]};
    if (shifts[event.key]) {
      event.preventDefault(); center.x += shifts[event.key][0]; center.y += shifts[event.key][1]; render();
    } else if (event.key === '+' || event.key === '=') {event.preventDefault();changeZoom(1);}
    else if (event.key === '-') {event.preventDefault();changeZoom(-1);}
  });
  let drag = null;
  map.addEventListener('pointerdown',event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button,a')) return;
    drag = {x:event.clientX,y:event.clientY,cx:center.x,cy:center.y};
    map.setPointerCapture(event.pointerId); map.classList.add('is-dragging');
  });
  map.addEventListener('pointermove',event => {
    if (!drag) return;
    center.x = drag.cx-(event.clientX-drag.x);center.y=drag.cy-(event.clientY-drag.y);schedule();
  });
  const stopDrag = () => {drag=null;map.classList.remove('is-dragging');};
  map.addEventListener('pointerup',stopDrag);map.addEventListener('pointercancel',stopDrag);map.addEventListener('lostpointercapture',stopDrag);
  const start = () => {if (started) return;started=true;render();};
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e=>e.isIntersecting)) {start();observer.disconnect();}
    },{rootMargin:'0px'});observer.observe(map);
  } else start();
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(map);
  else window.addEventListener('resize',schedule,{passive:true});
})();
