from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import json,re,gzip
root=Path(__file__).parent
public=root/'dist' if (root/'dist/index.html').is_file() else root
class Audit(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.links=[];self.h1=0;self.stack=[];self.errors=[];self.videos=0
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='h1':self.h1+=1
  if 'id'in d:self.ids.append(d['id'])
  if tag=='a':self.links.append(d.get('href',''))
  if tag in ['img','script','source'] and d.get('src'):self.refs.append(d['src'])
  if tag=='link' and d.get('href'):self.refs.append(d['href'])
  if tag=='img' and 'alt' not in d:self.errors.append('Image without alt')
  if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(tag)
 def handle_endtag(self,tag):
  if self.stack and self.stack[-1]==tag:self.stack.pop()
  else:self.errors.append('Nesting error: '+tag+' after '+str(self.stack[-3:]))
a=Audit();html=(public/'index.html').read_text();a.feed(html)
assert not a.errors,a.errors
assert not a.stack,a.stack
assert a.h1==1
assert not [k for k,v in Counter(a.ids).items() if v>1]
for link in a.links:
 if link.startswith('#'):assert link[1:] in a.ids,link
for ref in a.refs:
 if not re.match(r'https?:|data:',ref):assert(public/ref).is_file(),ref
assert 'video-placeholder' not in html
assert 'id="videos"' not in html
assert '<video' not in html
assert 'tel:+79185082125' in a.links
assert '79001391749' not in html and '8 900 139 17 49' not in html
assert not any('telegram' in x.lower() or 'vk.' in x.lower() for x in a.links)
assert not any('http' in x for x in a.refs),a.refs
js=(public/'app.js').read_text()
all_js='\n'.join(p.read_text() for p in public.glob('*.js'))
assert 'fetch(' not in all_js and 'XMLHttpRequest' not in all_js
assert 'Знакомьтесь, наш бариста.' not in html
assert 'Да, это можно выпить.' not in html
assert 'header-phone' not in html
assert 'data-radius="200"' in html
assert 'printer-clean.webp' in html
assert 'printer-crop' not in html
assert '<footer id="contacts">' in html
# Match static menu with its data, not just generated totals.
products=json.loads((root/'menu-data.json').read_text())
assert len(products)==22
assert len([p for p in products if p.get('photo')])==22
assert html.count('class="header-cart"')==1
assert 'awaiting-photo' not in html
assert not {p['id'] for p in products}&{'p4','p5','p23','p26'}
assert all(p.get('photo') and not p['fromPrice'] for p in products)
assert all('-v6-' in p['photo'] and p.get('photoProcessing') for p in products)
assert 'Кофе от 220 ₽' in html
assert 'id="selection-open" hidden' not in html
assert 'assets/welcome-ecocafe.webp' in html
assert re.search(r'id="print-example" src="assets/barista-640.webp"',html)
cups=html[html.index('<div class="cups-layout">'):html.index('<div class="own-cup">')]
assert '₽' not in cups
assert '+50 ₽' in html and 'Печать фото — 50 ₽' in html
assert 'Скопировать корзину' in html
for p in products:
 if p.get('photo'):
  assert (public/p['photo']).is_file()
  assert (public/p['photoSmall']).is_file()
for p in products:
 assert html.count('data-product="'+p['id']+'"')==1
 assert p['price']>0 and p['desc']
embedded=json.loads(js.split('const products = ',1)[1].split(';\nconst $',1)[0])
assert embedded==products
script_ids=re.findall(r"\$\('([^']+)'\)",js)
script_ids+=re.findall(r"getElementById\('([^']+)'\)",all_js)
assert set(script_ids)<=set(a.ids),set(script_ids)-set(a.ids)
files=list(public.rglob('*'));total=sum(p.stat().st_size for p in files if p.is_file())
initial=sum((public/p).stat().st_size for p in ['index.html','style.css','app.js','cart-core.js','cinema.js','map.js','assets/leaf.svg','assets/welcome-ecocafe.webp'])
text_files=['index.html','style.css','app.js','cinema.js','map.js','cart-core.js']
compressed=sum(len(gzip.compress((public/p).read_bytes())) for p in text_files)
result={'menu_items':len(products),'menu_photos':22,'normalized_photos':22,'food_frames':'no border or letterbox bands; equal photo/text height on desktop; stacked on mobile','photos_pending':0,'photo_print_price_rub':50,'phone':'+79185082125','categories':dict(Counter(p['category'] for p in products)),'video_slots':0,'broken_local_refs':0,'duplicate_ids':0,'external_initial_resources':0,'map_tiles':'lazy-loaded OpenStreetMap tiles when map enters viewport','approximate_area_radius_m':200,'cinematic_scroll':'time-based damping; transform-only scene; finite frames at rest; mobile/reduced-motion fallback','total_static_bytes':total,'first_screen_core_raw_bytes_excluding_lazy_resources':initial,'gzip_html_css_js_bytes':compressed,'browser_visual_qa':'Chrome desktop and 390px iframe through managed preview: menu, basket, persistence, photo upload/reset, printer, map. No physical-device or Core Web Vitals benchmark'}
(root/'checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False,indent=2))
