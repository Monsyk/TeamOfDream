'use strict';
(() => {
  const section = document.querySelector('.cinema-scroll');
  if (!section) return;
  const stage = section.querySelector('.cinema-stage');
  const header = document.querySelector('.header');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 801px)');
  let frame = 0, visible = true, current = 0, lastTime = 0;
  const enabled = () => !reduced.matches && desktop.matches;
  const cancel = () => { if (frame) cancelAnimationFrame(frame); frame = 0; lastTime = 0; };
  function animate(time) {
    frame = 0;
    if (!enabled() || !visible) return;
    const distance = Math.max(1,section.offsetHeight - stage.offsetHeight);
    const target = Math.min(1,Math.max(0,(header.offsetHeight - section.getBoundingClientRect().top) / distance));
    // Time-based damping is independent of monitor refresh rate. Stop at rest.
    const elapsed = lastTime ? Math.min(64,time-lastTime) : 16;
    lastTime = time;
    current += (target-current) * (1-Math.exp(-elapsed/95));
    if (Math.abs(target-current) < .001) current = target;
    section.style.setProperty('--scene',current.toFixed(4));
    if (current !== target) frame = requestAnimationFrame(animate);
    else lastTime = 0;
  }
  const schedule = () => { if (enabled() && visible && !frame) frame = requestAnimationFrame(animate); };
  function applyPreference() {
    cancel(); section.classList.toggle('is-cinematic',enabled());
    if (!enabled()) { current = 0; section.style.removeProperty('--scene'); }
    else schedule();
  }
  reduced.addEventListener?.('change',applyPreference);
  desktop.addEventListener?.('change',applyPreference);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  applyPreference();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries=>{
      visible = entries[0].isIntersecting;
      if (visible) schedule(); else cancel();
    }).observe(section);
    const reveal = new IntersectionObserver(entries=>{
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending'); reveal.unobserve(entry.target);
      }
    },{threshold:.08});
    // Do not hide buttons, cards, or the first-screen offer behind animation.
    if (!reduced.matches) document.querySelectorAll('.section-heading,.own-cup').forEach(element=>{
      element.classList.add('story-reveal','reveal-pending'); reveal.observe(element);
    });
  }
})();
