const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const publicDir=fs.existsSync('dist/index.html')?'dist/':'';
function node(id=''){
 const classes=new Set();
 return {id,children:[],events:{},dataset:{},style:{setProperty(k,v){this[k]=v},removeProperty(k){delete this[k]}},classList:{add(...a){a.forEach(x=>classes.add(x))},remove(...a){a.forEach(x=>classes.delete(x))},toggle(k,on){on??=!classes.has(k);on?classes.add(k):classes.delete(k);return on},contains:k=>classes.has(k)},addEventListener(k,fn){this.events[k]=fn},append(n){n.parent=this;this.children.push(n)},remove(){const p=this.parent;if(p)p.children=p.children.filter(x=>x!==this)},setPointerCapture(){},hidden:false,inert:false};
}
function context(){
 const observers=[],queue=[];
 return {observers,queue,console,Math,Number,Map,Set,document:null,window:{events:{},addEventListener(k,f){this.events[k]=f}},requestAnimationFrame(fn){queue.push(fn);return queue.length},cancelAnimationFrame(){queue.length=0},IntersectionObserver:class{constructor(fn){this.fn=fn;observers.push(this)}observe(){}disconnect(){}unobserve(){}},ResizeObserver:class{constructor(fn){this.fn=fn}observe(){}},flush(){while(queue.length)queue.shift()()}};
}
const ids={};['cafe-map','map-tiles','map-zone','uni-marker','map-loading','map-error','map-scale','map-plus','map-minus','map-reset'].forEach(id=>ids[id]=node(id));
const map=ids['cafe-map'];Object.assign(map,{clientWidth:600,clientHeight:470,dataset:{lat:'47.708515',lon:'40.207550',radius:'200',tileTemplate:'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}});
const ctx=context();ctx.window.IntersectionObserver=ctx.IntersectionObserver;ctx.window.ResizeObserver=ctx.ResizeObserver;ctx.document={getElementById:id=>ids[id],createElement:()=>node()};vm.createContext(ctx);vm.runInContext(fs.readFileSync(publicDir+'map.js','utf8'),ctx);
assert.equal(ids['map-tiles'].children.length,0,'Map tiles must not load before map enters viewport');
ctx.observers[0].fn([{isIntersecting:true}]);
assert.equal(ids['uni-marker'].style.left,'300px');assert.equal(ids['uni-marker'].style.top,'235px');
const diameter=()=>Number(ids['map-zone'].style.cssText.match(/width:([\d.]+)px/)[1]);
const initial=diameter();assert(initial>248&&initial<251,'200 m radius at zoom 16 near Shakhty');
assert(ids['map-tiles'].children.length<=12,'Only visible tiles requested');
ids['map-plus'].events.click();assert(Math.abs(diameter()-initial*2)<1e-7);assert.equal(ids['map-plus'].disabled,true);
ids['map-minus'].events.click();assert(Math.abs(diameter()-initial)<1e-7);
map.events.keydown({target:map,key:'ArrowRight',preventDefault(){}});assert.equal(ids['uni-marker'].style.left,'220px');
ids['map-reset'].events.click();assert.equal(ids['uni-marker'].style.left,'300px');assert(Math.abs(diameter()-initial)<1e-7);
const film=node(),stage=node(),header=node(),copy=node();film.offsetHeight=1610;stage.offsetHeight=620;header.offsetHeight=84;let top=84;film.getBoundingClientRect=()=>({top});film.querySelector=s=>s==='.cinema-stage'?stage:copy;
const c=context();c.window.IntersectionObserver=c.IntersectionObserver;
const media={matches:false,addEventListener(k,f){this.change=f}},desktop={matches:true,addEventListener(k,f){this.change=f}};
c.matchMedia=query=>query.includes('reduced')?media:desktop;c.document={querySelector:s=>s==='.cinema-scroll'?film:header,querySelectorAll:()=>[]};
let time=0;c.flush=()=>{let frames=0;while(c.queue.length){assert(++frames<200,'Animation must settle, not run forever');time+=16;c.queue.shift()(time);}};
vm.createContext(c);vm.runInContext(fs.readFileSync(publicDir+'cinema.js','utf8'),c);c.flush();
assert(film.classList.contains('is-cinematic'));assert.equal(copy.inert,false,'Hero links must remain available from the first screen');
top=84-495;c.window.events.scroll();c.window.events.scroll();assert.equal(c.queue.length,1,'Batch scroll events');c.flush();assert.equal(film.style['--scene'],'0.5000');assert.equal(c.queue.length,0,'No perpetual animation loop');
top=84-990;c.window.events.scroll();c.flush();assert.equal(film.style['--scene'],'1.0000');
c.observers[0].fn([{isIntersecting:false}]);c.window.events.scroll();assert.equal(c.queue.length,0,'No processing outside the scene');
media.matches=true;media.change();assert(!film.classList.contains('is-cinematic'));assert(!('--scene'in film.style));assert.equal(copy.inert,false);
media.matches=false;desktop.matches=false;desktop.change();assert(!film.classList.contains('is-cinematic'),'No pinned scene on mobile');
console.log('PASS: lazy map, 200m geometry, zoom, pan/reset; finite animation, accessible hero links, offscreen pause and reduced-motion/mobile fallback.');
