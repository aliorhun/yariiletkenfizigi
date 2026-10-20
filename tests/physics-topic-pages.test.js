'use strict';
// node tests/physics-topic-pages.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dir=path.join(__dirname,'..');
const code=fs.readFileSync(path.join(dir,'assets/physics-topic-pages.js'),'utf8');
const narrativeCode=fs.readFileSync(path.join(dir,'assets/physics-lesson-explanations.js'),'utf8');
const index=fs.readFileSync(path.join(dir,'index.html'),'utf8');
new vm.Script(code);
new vm.Script(narrativeCode);
for(const marker of [
  'assets/physics-topic-pages.js','assets/physics-topic-pages.css',
  'assets/physics-lesson-explanations.js','assets/physics-lesson-explanations.css',
  'PhysicsTopicPages.mount(main, LANG, currentTopic)',
  'PhysicsTopicPages.showTopic(main, id)',
  'PhysicsTopicPages.showSub(main, id)'
])assert.ok(index.includes(marker),'missing integration: '+marker);

class Element {
  constructor(tag='div'){
    this.tagName=tag.toUpperCase();this.children=[];this.parentNode=null;
    this.dataset={};this.attributes={};this._className='';this._classes=new Set();
    this.id='';this.textContent='';this.hidden=false;this.listeners={};
  }
  set className(v){this._className=v;this._classes=new Set(String(v).split(/\s+/).filter(Boolean));}
  get className(){return this._className;}
  get classList(){
    const e=this;
    return {contains(c){return e._classes.has(c)},add(c){e._classes.add(c)},
      remove(c){e._classes.delete(c)},toggle(c,on){if(on)e._classes.add(c);else e._classes.delete(c)}};
  }
  get firstChild(){return this.children[0]||null;}
  set innerHTML(v){this._html=v;if(v==='')this.children=[];}
  get innerHTML(){return this._html||'';}
  appendChild(c){
    if(c.parentNode)c.parentNode.children=c.parentNode.children.filter(x=>x!==c);
    this.children.push(c);c.parentNode=this;return c;
  }
  insertBefore(c,b){
    if(c.parentNode)c.parentNode.children=c.parentNode.children.filter(x=>x!==c);
    let i=b?this.children.indexOf(b):-1;if(i<0)i=this.children.length;
    this.children.splice(i,0,c);c.parentNode=this;return c;
  }
  remove(){
    if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this);
    this.parentNode=null;
  }
  setAttribute(k,v){this.attributes[k]=String(v);if(k==='id')this.id=v;}
  addEventListener(k,fn){this.listeners[k]=fn;}
  matches(s){return s==='section.fig'&&this.tagName==='SECTION'&&this.classList.contains('fig');}
  *descendants(){for(const c of this.children){yield c;yield* c.descendants();}}
  querySelectorAll(s){
    const all=[...this.descendants()];
    if(s===':scope > .week-head, :scope > .subtabs')
      return this.children.filter(c=>c.classList.contains('week-head')||c.classList.contains('subtabs'));
    if(s===':scope > .physics-topic-tabs button')
      return this.children.filter(c=>c.classList.contains('physics-topic-tabs')).flatMap(c=>c.children.filter(b=>b.tagName==='BUTTON'));
    if(s===':scope > .physics-topic-pane')
      return this.children.filter(c=>c.classList.contains('physics-topic-pane'));
    if(s==='.physics-topic-pane.active')
      return all.filter(c=>c.classList.contains('physics-topic-pane')&&c.classList.contains('active'));
    return [];
  }
  querySelector(s){
    const all=[...this.descendants()];
    if(s==='.prose')return all.find(x=>x.classList.contains('prose'))||null;
    if(s==='.plot[id]')return all.find(x=>x.classList.contains('plot')&&x.id)||null;
    if(s==='[data-physics-pages]')return all.find(x=>Object.hasOwn(x.attributes,'data-physics-pages'))||null;
    if(s==='.physics-topic-page:not([hidden])')return all.find(x=>x.classList.contains('physics-topic-page')&&!x.hidden)||null;
    if(s.startsWith('.'))return all.find(x=>x.classList.contains(s.slice(1)))||null;
    return null;
  }
}
const mk=(tag,cls)=>{let v=new Element(tag);v.className=cls||'';return v;};
function fixture(){
  const main=mk('main');
  main.appendChild(mk('div','week-head'));main.appendChild(mk('div','subtabs'));
  const panes={};
  for(const key of ['anlatim','matematik','gorsel','soru','urun']){
    const p=mk('div','pane');p.dataset.pane=key;main.appendChild(p);panes[key]=p;
  }
  const prose=mk('div','prose');panes.anlatim.appendChild(prose);
  for(let i=1;i<=13;i++){
    const h=mk('h3');h.textContent='1.'+i+' Heading';prose.appendChild(h);
    const p=mk('p');p.textContent='Lesson paragraph '+i;prose.appendChild(p);
  }
  for(const [id,at] of [
    ['course-topic-bloch-electron',1],['course-note-bands',2],['course-note-edges',2],
    ['course-topic-dos',2],['course-note-holes',3],['course-topic-fermi',4],
    ['course-topic-equilibrium',4],['course-note-doping',5],['course-topic-transport',12]
  ]){
    const note=mk('section');note.id=id;prose.insertBefore(note,prose.children[2*at]);
  }
  const math=mk('div','prose');panes.matematik.appendChild(math);
  for(let i=1;i<=12;i++){
    const h=mk('h3');h.textContent='Math '+i;math.appendChild(h);
    const p=mk('p');p.textContent='Derivation '+i;math.appendChild(p);
  }
  const ss=mk('div','ss-lab'),sf=mk('div','sf-interactive');
  panes.gorsel.appendChild(ss);panes.gorsel.appendChild(sf);
  for(let i=0;i<3;i++){ss.appendChild(mk('section','fig'));sf.appendChild(mk('section','fig'));}
  const ids=['p-lattice','p-ek','p-egscale','p-f0-lattice','p-fd','p-ni',
    'p-f0-regime','p-dop','p-f0-sweep','p-mob','p-scat','p-sc-mu','p-hs'];
  for(const id of ids){
    const fig=mk('section','fig'),plot=mk('div','plot');plot.id=id;
    fig.appendChild(plot);panes.gorsel.appendChild(fig);
  }
  for(let i=1;i<=22;i++){
    const qa=mk('div','qa'),q=mk('p','q');q.textContent=i+'. Question';
    qa.appendChild(q);panes.soru.appendChild(qa);
  }
  return main;
}
const win={showSub(){}},document={createElement:tag=>new Element(tag)};
vm.runInNewContext(narrativeCode,{window:win,document});
vm.runInNewContext(code,{window:win,document});
const api=win.PhysicsTopicPages;
for(const lang of ['tr','en']){
  const main=fixture();api.mount(main,lang,'crystal');
  const all=[...main.descendants()];
  const pages=all.filter(e=>e.classList.contains('physics-topic-page'));
  assert.equal(pages.length,10);
  assert.equal(pages.filter(e=>e.hidden).length,9);
  assert.equal(all.filter(e=>e.classList.contains('physics-topic-pane')).length,40);
  assert.equal(all.filter(e=>e.classList.contains('qa')).length,32);
  assert.equal(all.filter(e=>e.classList.contains('fig')).length,19);
  assert.equal(main.children.filter(e=>e.classList.contains('pane')).length,0);
  assert.equal(pages[0].children[1].children.length,4);
  assert.ok(all.some(e=>e.classList.contains('physics-hole-sim')));
  // The hole lesson must have an interactive 2D lattice and three learning modes.
  const simulation=all.find(e=>e.classList.contains('physics-hole-sim'));
  const modeButtons=simulation.children[2].children;
  const boards=simulation.children[4],valence=boards.children[0].children[1],conduction=boards.children[1].children[1];
  const actions=simulation.children[6].children;
  assert.equal(modeButtons.length,3);
  assert.equal(valence.children.length,35);
  assert.equal(valence.children.filter(e=>e.classList.contains('is-hole')).length,1);
  const adjacent=valence.children.find(e=>e.dataset.x==='3'&&e.dataset.y==='2');
  assert.ok(adjacent.classList.contains('is-available'),'adjacent electron must be clickable');
  adjacent.listeners.click();
  assert.equal(valence.children.find(e=>e.classList.contains('is-hole')).dataset.x,'3');
  // Photon below the illustrative gap cannot create a pair.
  modeButtons[1].listeners.click();
  assert.equal(valence.children.filter(e=>e.classList.contains('is-hole')).length,0);
  const photonSlider=simulation.children[5].children[0].children[1];
  photonSlider.value='0.8';photonSlider.listeners.input();
  actions[0].listeners.click();
  assert.equal(conduction.children.filter(e=>e.classList.contains('is-carrier')).length,0);
  photonSlider.value='1.5';photonSlider.listeners.input();
  actions[0].listeners.click();
  assert.equal(valence.children.filter(e=>e.classList.contains('is-hole')).length,1);
  assert.equal(conduction.children.filter(e=>e.classList.contains('is-carrier')).length,1);
  actions[0].listeners.click();
  assert.equal(valence.children.filter(e=>e.classList.contains('is-hole')).length,0);
  // In +E, a hole drifts right and a conduction electron drifts left.
  modeButtons[2].listeners.click();
  assert.equal(conduction.hidden,false);
  actions[0].listeners.click();
  assert.equal(valence.children.find(e=>e.classList.contains('is-hole')).dataset.x,'3');
  assert.equal(conduction.children.find(e=>e.classList.contains('is-carrier')).dataset.x,'3');
  const fieldSlider=simulation.children[5].children[1].children[1];
  fieldSlider.value='-2';fieldSlider.listeners.input();
  actions[0].listeners.click();
  assert.equal(valence.children.find(e=>e.classList.contains('is-hole')).dataset.x,'2');
  assert.equal(conduction.children.find(e=>e.classList.contains('is-carrier')).dataset.x,'4');

  const narratives=all.filter(e=>e.classList.contains('physics-lesson-intro'));
  assert.equal(narratives.length,10,'exactly one standalone narrative per topic');
  for(const page of pages){
    const prose=page.children.find(e=>e.dataset.pane==='anlatim')?.children[0];
    assert.ok(prose && prose.children[0]?.classList.contains('physics-lesson-intro'),
      'intro must be first in '+page.dataset.physicsTopic);
    const intro=prose.children[0];
    assert.ok(intro.children.length>=3,'missing multi-section explanation: '+page.dataset.physicsTopic);
    let content='';
    for(const block of intro.children){
      assert.ok(block.children[0].textContent.length>8,'heading missing in '+page.dataset.physicsTopic);
      content+=block.children[1].innerHTML;
    }
    assert.ok(content.length>=550,'narrative too brief: '+page.dataset.physicsTopic);
    assert.ok(content.includes('\\('),'missing mathematical context: '+page.dataset.physicsTopic);
    if(page.dataset.physicsTopic==='edges'){
      assert.ok(intro.children.length>=7,'valence/conduction explanation must be detailed');
      assert.ok(content.length>2500,'valence/conduction topic needs substantive material');
      assert.ok(content.includes('E_g=E_c-E_v'),'gap definition missing');
    }
  }
  for(const page of pages){
    const panes=page.children.filter(e=>e.classList.contains('physics-topic-pane'));
    assert.equal(panes.length,4);
    for(const pane of panes)assert.ok(pane.children.length>0,'empty '+page.dataset.physicsTopic+' / '+pane.dataset.pane);
  }
  api.showTopic(main,'dos');api.showSub(main,'gorsel');
  assert.equal(pages.filter(e=>!e.hidden)[0].dataset.physicsTopic,'dos');
  assert.equal(all.filter(e=>e.classList.contains('physics-topic-pane')&&e.classList.contains('active')).length,1);
  assert.ok(api.showSub(main,'matematik'));
  assert.ok(!api.showSub(main,'nonexistent'));
  assert.ok(!api.showTopic(main,'nonexistent'));
}
// A missing legacy note must never cause the valence/conduction explanation to disappear.
const sparse=fixture();
const edgeLegacy=[...sparse.descendants()].find(e=>e.id==='course-note-edges');
assert.ok(edgeLegacy,'fixture must contain a legacy edge note');
edgeLegacy.remove();
api.mount(sparse,'tr','edges');
const edgePage=[...sparse.descendants()].find(e=>e.dataset.physicsTopic==='edges');
const edgeProse=edgePage.children.find(e=>e.dataset.pane==='anlatim').children[0];
assert.ok(edgeProse.children[0].classList.contains('physics-lesson-intro'));
assert.ok(edgeProse.children[0].children.length>=7);
assert.ok(edgeProse.children[0].children.some(b=>b.children[1].innerHTML.includes('E_g=E_c-E_v')));
console.log('PASS: 10 lessons × 4 tabs, 2D electron-hole lab modes, 19 figures, 32 QAs, TR/EN narratives');
