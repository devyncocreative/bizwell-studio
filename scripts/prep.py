import json,re,html,shutil,os,sys
H=sys.argv[1]; OUT=sys.argv[2]
d=json.load(open(H+'/data.json'))
KEEP={'p','h2','h3','h4','ul','ol','li','strong','em','b','i','blockquote','a','br'}
def clean(c):
    c=re.sub(r'<(script|style|iframe|figure|noscript|presto-player|svg|form)[^>]*>.*?</\1>','',c,flags=re.S)
    def tag(m):
        close,name,attrs=m.group(1),m.group(2).lower(),m.group(3)
        if name not in KEEP: return ''
        if name=='a' and not close:
            h=re.search(r'href="([^"]+)"',attrs)
            return '<a href="%s" rel="noopener">'%h.group(1) if h else '<a>'
        return '<%s%s>'%(close,name)
    c=re.sub(r'<(/?)([a-zA-Z0-9-]+)([^>]*)>',tag,c)
    c=re.sub(r'<(p|h2|h3|h4|li|strong|em)>\s*(&nbsp;)?\s*</\1>','',c)
    c=re.sub(r'\n\s*\n+','\n',c).strip()
    # kadence inline css text that leaked
    c=re.sub(r'\.k[bt]-[^<]*?\}\s*(?=<|$)','',c,flags=re.S)
    return c
def text(c): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',c))).strip()
def slugify(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
im=d['imgmap']
def item(r,kind):
    c=clean(r['content']); ex=text(r['excerpt']) or text(c)
    ex=re.sub(r'\s*(\[…\]|\[&hellip;\]|…)$','',ex)
    if len(ex)>170: ex=ex[:170].rsplit(' ',1)[0]+'…'
    tax=r.get('tax') or {}
    topics=[t['label'] for t in tax.get('business-topic',[])] if isinstance(tax,dict) else []
    places=[t['label'] for t in tax.get('place',[])] if isinstance(tax,dict) else []
    return dict(kind=kind,slug=r['slug'],title=r['title'],date=r['date'],yt=(r['yt'] or [''])[0],img=im.get(r['img'],''),excerpt=ex,html=c,topics=topics,places=places)
lib=[item(r,'podcast') for r in d['podcasts']]+[item(r,'video') for r in d['videos']]
lib.sort(key=lambda x:x['date'],reverse=True)
films=[item(r,'film') for r in d['film']]
json.dump(lib,open(OUT+'/src/data/library.json','w'),indent=1,ensure_ascii=False)
json.dump(films,open(OUT+'/src/data/films_raw.json','w'),indent=1,ensure_ascii=False)
topics=[dict(name=t['name'],slug=t['slug'],count=t['count']) for t in d['business-topic']]
json.dump(topics,open(OUT+'/src/data/topics.json','w'),indent=1)
used={x['img'] for x in lib+films if x['img']}
for f in os.listdir(H+'/img'):
    if f in used or re.search(r'Poster|Logo|logo|shutterstock|entrepreneur|2022_06_(1|2_03|3_03)\.png|_03-150x150|Sentinel_03|2850209|Terracana-Photos-14|draft-computer|Inn-Hotels|Sales-Method|Social-Share|Still00',f):
        shutil.copy(H+'/img/'+f,OUT+'/src/assets/img/'+f)
print(len(lib),'library',len(films),'films',len(os.listdir(OUT+'/src/assets/img')),'imgs')
print([ (f['slug'],len(f['html'])) for f in films]); print(films[0]['html'][:600])
