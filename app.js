'use strict';
(() => {
const products = [{"id": "p0", "name": "«Утренний парк»", "price": 390, "volume": "300 мл", "desc": "Латте, сливочная карамель и щепотка морской соли.", "category": "author", "included": true, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p0-v6-800.webp", "photoSmall": "assets/menu/p0-v6-480.webp", "sourcePhoto": "jS8OAXSO.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p1", "name": "«Зелёный день»", "price": 400, "volume": "300 мл", "desc": "Капучино с матчей и свежей мятой.", "category": "author", "included": true, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p1-v6-800.webp", "photoSmall": "assets/menu/p1-v6-480.webp", "sourcePhoto": "fV1IauXO.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p2", "name": "«Тёплый вечер»", "price": 420, "volume": "300 мл", "desc": "Раф с малиной и белым шоколадом.", "category": "author", "included": true, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p2-v6-800.webp", "photoSmall": "assets/menu/p2-v6-480.webp", "sourcePhoto": "ZZNAFLLF.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p3", "name": "«Цитрус-тоник»", "price": 360, "volume": "350 мл", "desc": "Эспрессо, тоник, лайм и апельсин. Без печати.", "category": "author", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p3-v6-800.webp", "photoSmall": "assets/menu/p3-v6-480.webp", "sourcePhoto": "Z6ltNnLj.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p6", "name": "Американо", "price": 220, "volume": "200 мл", "desc": "Эспрессо с горячей водой.", "category": "coffee", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p6-v6-800.webp", "photoSmall": "assets/menu/p6-v6-480.webp", "sourcePhoto": "pfz44isV.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p7", "name": "Капучино", "price": 280, "volume": "200 мл", "desc": "Эспрессо и взбитое молоко.", "category": "coffee", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p7-v6-800.webp", "photoSmall": "assets/menu/p7-v6-480.webp", "sourcePhoto": "vHx7Avd8.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p8", "name": "Латте", "price": 300, "volume": "300 мл", "desc": "Мягкий кофе с большим количеством молока.", "category": "coffee", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p8-v6-800.webp", "photoSmall": "assets/menu/p8-v6-480.webp", "sourcePhoto": "aSFr45vu.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p9", "name": "Флэт Уайт", "price": 310, "volume": "200 мл", "desc": "Двойной эспрессо и тонкий слой молока.", "category": "coffee", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p9-v6-800.webp", "photoSmall": "assets/menu/p9-v6-480.webp", "sourcePhoto": "Eet6VFbk.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p10", "name": "Раф", "price": 350, "volume": "300 мл", "desc": "Эспрессо, сливки и ваниль.", "category": "coffee", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p10-v6-800.webp", "photoSmall": "assets/menu/p10-v6-480.webp", "sourcePhoto": "_TjjWie1.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p11", "name": "Мокко", "price": 340, "volume": "300 мл", "desc": "Кофе с шоколадом и молочной пенкой.", "category": "coffee", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p11-v6-800.webp", "photoSmall": "assets/menu/p11-v6-480.webp", "sourcePhoto": "UjCk276U.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p21", "name": "Какао", "price": 340, "volume": "300 мл", "desc": "Какао на молоке с зефирной пенкой.", "category": "drinks", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p21-v6-800.webp", "photoSmall": "assets/menu/p21-v6-480.webp", "sourcePhoto": "WNlAbxHA.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p22", "name": "Матча Латте", "price": 390, "volume": "300 мл", "desc": "Японский зелёный чай с молоком.", "category": "drinks", "included": false, "eligible": true, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p22-v6-800.webp", "photoSmall": "assets/menu/p22-v6-480.webp", "sourcePhoto": "EXNLOINS.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p24", "name": "Облепиховый чай", "price": 350, "volume": "300 мл", "desc": "Облепиха, апельсин и цветочный мёд.", "category": "drinks", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p24-v6-800.webp", "photoSmall": "assets/menu/p24-v6-480.webp", "sourcePhoto": "ibfi7zK8.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p25", "name": "Домашний лимонад", "price": 340, "volume": "400 мл", "desc": "Фрукты, цитрусы, мята и газированная вода.", "category": "drinks", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p25-v6-800.webp", "photoSmall": "assets/menu/p25-v6-480.webp", "sourcePhoto": "a9xE55m7.jpg", "photoWidth": 800, "photoHeight": 1000, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p27", "name": "Круассан с миндалём", "price": 320, "volume": "135 г", "desc": "Круассан с миндальной начинкой и лепестками.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p27-v6-800.webp", "photoSmall": "assets/menu/p27-v6-480.webp", "sourcePhoto": "ed0lkNzj.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p28", "name": "Синнабон", "price": 340, "volume": "160 г", "desc": "Булочка с корицей и сливочно-сырной глазурью.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p28-v6-800.webp", "photoSmall": "assets/menu/p28-v6-480.webp", "sourcePhoto": "ltBP_P0X.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p29", "name": "Чизкейк", "price": 390, "volume": "150 г", "desc": "Нежный сливочный чизкейк.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p29-v6-800.webp", "photoSmall": "assets/menu/p29-v6-480.webp", "sourcePhoto": "qV0XoY4z.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p30", "name": "Маффин", "price": 250, "volume": "110 г", "desc": "Маффин с ягодами.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p30-v6-800.webp", "photoSmall": "assets/menu/p30-v6-480.webp", "sourcePhoto": "-bvboCSd.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p31", "name": "Печенье (3 шт.)", "price": 220, "volume": "120 г", "desc": "Печенье с шоколадной крошкой.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p31-v6-800.webp", "photoSmall": "assets/menu/p31-v6-480.webp", "sourcePhoto": "IImCMvGx.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p32", "name": "Сэндвич с курицей", "price": 380, "volume": "210 г", "desc": "Курица, овощи и соус.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p32-v6-800.webp", "photoSmall": "assets/menu/p32-v6-480.webp", "sourcePhoto": "QFnhJpEj.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p33", "name": "Панини с сыром", "price": 360, "volume": "195 г", "desc": "Моцарелла, томаты и соус песто.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p33-v6-800.webp", "photoSmall": "assets/menu/p33-v6-480.webp", "sourcePhoto": "kJWWGxp6.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}, {"id": "p34", "name": "Круассан с лососем", "price": 540, "volume": "210 г", "desc": "Лосось, сливочный сыр и микрозелень.", "category": "food", "included": false, "eligible": false, "fromPrice": false, "printPrice": 50, "photo": "assets/menu/p34-v6-800.webp", "photoSmall": "assets/menu/p34-v6-480.webp", "sourcePhoto": "lq89f12a.jpg", "photoWidth": 800, "photoHeight": 600, "photoProcessing": "ИИ-редактирование исходного снимка: центрирование продукта, единый масштаб и фон, удаление крупных надписей."}];
const $ = id => document.getElementById(id);
const byId = new Map(products.map(p => [p.id,p]));
const selection = new Map();
const prints = new Set();
try {
  const saved = JSON.parse(localStorage.getItem('ecocafe-cart-v1') || 'null');
  if (saved && Array.isArray(saved.rows)) for (const row of saved.rows.slice(0,100)) {
    const p = byId.get(row.id), qty = Math.min(99, Math.max(0, Math.floor(Number(row.qty) || 0)));
    if (!p || !qty) continue;
    selection.set(p.id,qty);
    if (row.printed && p.eligible && !p.included) prints.add(p.id);
  }
} catch { /* Basket remains usable if storage is blocked. */ }
function saveSelection() {
  try { localStorage.setItem('ecocafe-cart-v1',JSON.stringify({rows:[...selection].map(([id,qty])=>({id,qty,printed:prints.has(id)}))})); } catch { /* Optional persistence. */ }
}
const money = n => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
const announce = message => { $('live-status').textContent = message; };
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('[data-group]').forEach(group => { group.hidden = category !== 'all' && group.dataset.group !== category; });
  announce('Категория: ' + button.textContent);
}));
const dialog = $('selection-dialog');
function renderSelection() {
  const summary = EcoCart.calculate(products,selection,prints);
  saveSelection();
  $('selection-count').textContent = summary.count;
  $('selection-open').setAttribute('aria-label','Открыть корзину, товаров: '+summary.count);
  $('copy-list').disabled = summary.count === 0;
  $('copy-status').textContent = '';
  $('selection-items').replaceChildren();
  if (!summary.count) {
    const p=document.createElement('p');p.className='empty-list';p.textContent='Корзина пока пуста. Выберите любимый напиток или что-нибудь к кофе.';$('selection-items').append(p);
  }
  for (const {product:p,qty,printed,lineTotal} of summary.rows) {
    const row=document.createElement('div');row.className='selection-row';
    const info=document.createElement('div');info.className='cart-product-info';
    const name=document.createElement('h3');name.textContent=p.name;
    const cost=document.createElement('p');cost.textContent=(p.fromPrice?'от ':'')+money(p.price)+' × '+qty+(p.included?' · печать включена':'');
    info.append(name,cost);
    if(p.eligible && !p.included) {
      const label=document.createElement('label');label.className='cart-print-option';
      const input=document.createElement('input');input.type='checkbox';input.checked=printed;input.dataset.print=p.id;
      const text=document.createElement('span');text.textContent='Фото на пенке +50 ₽ / напиток';
      label.append(input,text);info.append(label);
    }
    const subtotal=document.createElement('strong');subtotal.className='cart-line-total';subtotal.textContent=(p.fromPrice?'от ':'')+money(lineTotal);info.append(subtotal);
    const controls=document.createElement('div');controls.className='quantity';
    for(const delta of [-1,1]) {
      const button=document.createElement('button');button.type='button';button.textContent=delta<0?'−':'+';
      button.setAttribute('aria-label',(delta<0?'Уменьшить':'Увеличить')+' количество: '+p.name);button.dataset.change=p.id;button.dataset.delta=String(delta);button.disabled=delta>0&&qty>=99;
      if(delta>0){const value=document.createElement('span');value.textContent=qty;controls.append(value);}
      controls.append(button);
    }
    row.append(info,controls);$('selection-items').append(row);
  }
  $('selection-total').textContent=money(summary.total);
}
function refreshAddButton(id) {
  const button=document.querySelector('[data-add="'+id+'"]');if(!button)return;
  const qty=selection.get(id)||0;button.classList.toggle('is-added',qty>0);button.firstChild.textContent=qty>0?'В корзине: '+qty+' ':'В корзину ';
}
document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
  const id=button.dataset.add;if(!byId.has(id))return;
  const qty=Math.min(99,(selection.get(id)||0)+1);selection.set(id,qty);renderSelection();refreshAddButton(id);
  announce(byId.get(id).name+' добавлено в корзину. Количество: '+qty+'. Заказ ещё не отправлен.');
}));
$('selection-items').addEventListener('click',event => {
  const button=event.target.closest('[data-change]');if(!button)return;
  const id=button.dataset.change,delta=Number(button.dataset.delta);
  const next=Math.min(99,(selection.get(id)||0)+delta);
  if(next>0)selection.set(id,next);else{selection.delete(id);prints.delete(id);}
  renderSelection();refreshAddButton(id);
  const replacement=[...$('selection-items').querySelectorAll('[data-change]')].find(b=>b.dataset.change===id&&Number(b.dataset.delta)===delta);
  if(replacement&&!replacement.disabled)replacement.focus();else $('selection-close').focus();
  announce('Корзина обновлена. Итого '+$('selection-total').textContent);
});
$('selection-items').addEventListener('change',event => {
  const input=event.target.closest('[data-print]');if(!input)return;
  const id=input.dataset.print,p=byId.get(id);if(!p||!p.eligible||p.included)return;
  input.checked?prints.add(id):prints.delete(id);renderSelection();
  const replacement=$('selection-items').querySelector('[data-print="'+id+'"]');if(replacement)replacement.focus();
  announce('Стоимость печати обновлена. Итого '+$('selection-total').textContent);
});
$('selection-open').addEventListener('click',() => {
  renderSelection();
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.classList.add('dialog-fallback');}
});
const closeCart=() => {if(typeof dialog.close==='function')dialog.close();else{dialog.removeAttribute('open');dialog.classList.remove('dialog-fallback');$('selection-open').focus();}};
$('selection-close').addEventListener('click',closeCart);
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeCart();});
dialog.addEventListener('close',()=>$('selection-open').focus());
document.documentElement.classList.add('js');
function listText() {
  const summary=EcoCart.calculate(products,selection,prints);
  const lines=['Корзина EcoCafe (заказ ещё не отправлен):'];
  for(const {product:p,qty,printed,lineTotal} of summary.rows) {
    lines.push(p.name+' — '+qty+' шт. × '+(p.fromPrice?'от ':'')+money(p.price)+(p.included?' (печать включена)':printed?' + печать 50 ₽ × '+qty:'')+' = '+(p.fromPrice?'от ':'')+money(lineTotal));
  }
  lines.push('Итого: '+money(summary.total),'Итоговую цену, наличие и время получения согласовать с бариста.','Телефон: 8 918 508 21 25');
  return lines.join('\n');
}
$('copy-list').addEventListener('click',async()=>{
  const text=listText();
  try{if(!navigator.clipboard||!window.isSecureContext)throw Error('clipboard unavailable');await navigator.clipboard.writeText(text);$('copy-status').textContent='Корзина скопирована. Чтобы согласовать заказ, позвоните в кафе.';}
  catch{
    $('copy-status').replaceChildren();const label=document.createElement('label');label.textContent='Выделите и скопируйте состав корзины вручную:';
    const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.rows=8;area.className='cart-copy-text';label.append(area);$('copy-status').append(label);area.focus();area.select();
  }
});

// The visitor's photo is used only in this browser. No upload, analytics or storage.
let currentPhotoUrl = null;
let photoSequence = 0;
$('preview-controls').hidden = false;
$('photo-input').addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const token = ++photoSequence;
  $('photo-message').textContent = '';
  if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
    $('photo-message').textContent = 'Выберите JPEG, PNG или WebP размером до 8 МБ.';
    event.target.value = ''; return;
  }
  const candidate = URL.createObjectURL(file);
  const probe = new Image();
  probe.onload = () => {
    if (token !== photoSequence) { URL.revokeObjectURL(candidate); return; }
    if (probe.naturalWidth * probe.naturalHeight > 24000000) {
      URL.revokeObjectURL(candidate);
      $('photo-message').textContent = 'Это фото слишком большое по разрешению. Выберите уменьшенную копию до 24 мегапикселей.';
      event.target.value = ''; return;
    }
    // A small browser-local preview avoids repeatedly rendering a full-resolution upload.
    const canvas = document.createElement('canvas');
    const ratio = Math.min(1,800 / Math.max(probe.naturalWidth,probe.naturalHeight));
    canvas.width = Math.max(1,Math.round(probe.naturalWidth * ratio));
    canvas.height = Math.max(1,Math.round(probe.naturalHeight * ratio));
    const context = canvas.getContext('2d');
    if (!context) { URL.revokeObjectURL(candidate); $('photo-message').textContent = 'Предпросмотр недоступен в этом браузере. Фото можно показать бариста.'; return; }
    context.drawImage(probe,0,0,canvas.width,canvas.height);
    URL.revokeObjectURL(candidate);
    canvas.toBlob(blob => {
      if (!blob || token !== photoSequence) return;
      if (currentPhotoUrl) URL.revokeObjectURL(currentPhotoUrl);
      currentPhotoUrl = URL.createObjectURL(blob);
      $('preview-image').src = currentPhotoUrl;
      $('preview-overlay').hidden = false;
      $('print-example').alt = '';
      $('preview-reset').hidden = false;
      $('preview-caption').textContent = 'Ваша примерка · приблизительный результат';
      $('photo-message').textContent = 'Фото открыто только у вас. Для печати покажите оригинал бариста.';
    },'image/jpeg',0.85);
  };
  probe.onerror = () => {
    URL.revokeObjectURL(candidate);
    if (token !== photoSequence) return;
    $('photo-message').textContent = 'Не удалось прочитать изображение. Попробуйте другой файл.';
    event.target.value = '';
  };
  probe.src = candidate;
});
$('preview-reset').addEventListener('click', () => {
  ++photoSequence;
  $('preview-overlay').hidden = true;
  $('preview-image').removeAttribute('src');
  if (currentPhotoUrl) URL.revokeObjectURL(currentPhotoUrl);
  currentPhotoUrl = null;
  $('print-example').alt = 'Пример селфи-портрета бариста на пенке кофе';
  $('preview-reset').hidden = true;
  $('photo-input').value = '';
  $('photo-message').textContent = '';
  $('preview-caption').textContent = 'Пример печати · селфи нашего бариста';
  $('photo-input').focus();
});
renderSelection();
products.forEach(p=>refreshAddButton(p.id));
if (document.documentElement.classList.contains('js')) {
  filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === 'coffee')));
  document.querySelectorAll('[data-group]').forEach(g => { g.hidden = g.dataset.group !== 'coffee'; });
}

})();
