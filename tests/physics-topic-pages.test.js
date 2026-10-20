'use strict';
// node tests/physics-topic-pages.test.js
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dir=path.join(__dirname,'..');
const code=fs.readFileSync(path.join(dir,'assets/physics-topic-pages.js'),'utf8');
const narrativeCode=fs.readFileSync(path.join(dir,'assets/physics-lesson-explanations.js'),'utf8');
const gamesCode=fs.readFileSync(path.join(dir,'assets/physics-learning-games.js'),'utf8');
const regimesCode=fs.readFileSync(path.join(dir,'assets/temperature-regimes.js'),'utf8');
const index=fs.readFileSync(path.join(dir,'index.html'),'utf8');
new vm.Script(code);
new vm.Script(narrativeCode);
new vm.Script(gamesCode);
new vm.Script(regimesCode);
for(const marker of [
  'assets/physics-topic-pages.js','assets/physics-topic-pages.css',
  'assets/physics-lesson-explanations.js','assets/physics-lesson-explanations.css',
  'assets/physics-learning-games.js','assets/physics-learning-games.css',
  'assets/temperature-regimes.js','assets/temperature-regimes.css',
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
    qa.appendChild(q);const details=mk('details'),summary=mk('summary');summary.textContent='Çözümü göster';details.appendChild(summary);qa.appendChild(details);panes.soru.appendChild(qa);
  }
  return main;
}
const win={lastSub:null,showSub(tab){this.lastSub=tab;}},document={createElement:tag=>new Element(tag)};
vm.runInNewContext(narrativeCode,{window:win,document});
vm.runInNewContext(gamesCode,{window:win,document});
vm.runInNewContext(regimesCode,{window:win,document});
vm.runInNewContext(code,{window:win,document});
const api=win.PhysicsTopicPages;
for(const lang of ['tr','en']){
  const main=fixture();api.mount(main,lang,'crystal');
  const all=[...main.descendants()];
  const pages=all.filter(e=>e.classList.contains('physics-topic-page'));
  assert.equal(pages.length,11);
  assert.equal(pages.filter(e=>e.hidden).length,10);
  assert.equal(all.filter(e=>e.classList.contains('physics-topic-pane')).length,55);
  assert.equal(all.filter(e=>e.classList.contains('qa')).length,37);
  const whyPanels=all.filter(e=>e.classList.contains('physics-qa-reason'));
  assert.equal(whyPanels.length,37,'all eleven topic prompts, four regime questions and 22 legacy questions need a reason');
  for(const reason of whyPanels){
    assert.equal(reason.children.length,3,'correct, misconception and explanation link');
    assert.ok(reason.children[0].classList.contains('physics-qa-correct'));
    assert.ok(reason.children[1].classList.contains('physics-qa-misconception'));
    assert.ok(reason.children[0].children[1].textContent.length>20,'correct reasoning too brief');
    assert.ok(reason.children[1].children[1].textContent.length>20,'wrong reasoning too brief');
    assert.ok(reason.children[2].classList.contains('physics-qa-reference'));
  }
  whyPanels[0].children[2].listeners.click();
  assert.equal(win.lastSub,'anlatim','reason link should switch to the same lesson Explanation tab');

  assert.equal(all.filter(e=>e.classList.contains('fig')).length,19);
  assert.equal(main.children.filter(e=>e.classList.contains('pane')).length,0);
  assert.equal(pages[0].children[1].children.length,5);
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
  assert.equal(narratives.length,11,'exactly one standalone narrative per topic');
  const topicsWithGames=['crystal','bloch-electron','bands','edges','dos','holes','fermi','equilibrium','doping','transport'];
  const gamesByTopic={},secondGamesByTopic={};
  const gameSwitchers={};
  for(const page of pages){
    const key=page.dataset.physicsTopic,prose=page.children.find(e=>e.dataset.pane==='anlatim')?.children[0];
    const last=prose.children[prose.children.length-1];
    const gamePane=page.children.find(e=>e.dataset.pane==='oyun');
    if(topicsWithGames.includes(key)){
      assert.ok(last.classList.contains('physics-learning-outcomes'),'outcomes must end '+key+' explanation');
      assert.equal(last.children[1].children.length,4,'exactly four measurable outcomes: '+key);
      assert.ok(gamePane&&gamePane.children.length===3,'each topic needs the Oyun 1 / Oyun 2 selector and both games: '+key);
      const switcher=gamePane.children[0],first=gamePane.children[1],second=gamePane.children[2];
      assert.ok(switcher.classList.contains('physics-game-switch'));
      assert.equal(switcher.children.length,2);
      assert.equal(first.hidden,false,'first game should be the default');
      assert.equal(second.hidden,true,'second game should start hidden');
      gamesByTopic[key]=first.children[0];secondGamesByTopic[key]=second.children[0];gameSwitchers[key]=switcher;
      switcher.children[1].listeners.click();
      assert.equal(first.hidden,true);assert.equal(second.hidden,false);
      assert.equal(switcher.children[1].attributes['aria-selected'],'true');
      switcher.children[0].listeners.click();
      assert.equal(first.hidden,false);assert.equal(second.hidden,true);
    }else if(key==='regimes'){
      assert.ok(last.classList.contains('physics-learning-outcomes'),'temperature regimes need outcomes');
      assert.equal(last.children[1].children.length,6,'six explicit regime learning outcomes');
      assert.ok(gamePane&&gamePane.children.length===2,'regimes need two complementary games');
      const switcher=gamePane.children[0],games=gamePane.children[1];
      assert.equal(switcher.children.length,2);
      assert.equal(games.children.length,2);
      assert.equal(games.children[0].hidden,false);
      assert.equal(games.children[1].hidden,true);
      switcher.children[1].listeners.click();
      assert.equal(games.children[1].hidden,false);
      switcher.children[0].listeners.click();
      assert.equal(games.children[0].hidden,false);
      const first=games.children[0].children[0];
      const second=games.children[1].children[0];
      for(const game of [first,second]){
        const optionCards=game.children[4];
        assert.equal(optionCards.children.length,3);
        optionCards.children[0].listeners.click();
        assert.ok(game.children[5].children.some(e=>e.classList.contains('physics-game-lesson-link')));
      }
      const sim=page.children.find(e=>e.dataset.pane==='gorsel').children.find(e=>e.classList.contains('regime-lab'));
      assert.ok(sim,'temperature simulation missing');
      const inputs=sim.children[2].children;
      assert.equal(inputs.length,5);
      const graph=sim.children[4].children[0];
      assert.ok(graph.innerHTML.includes('<svg'),'native SVG graph not mounted');
      inputs[3].children[1].value='inverse';inputs[3].children[1].listeners.change();
      assert.ok(graph.innerHTML.includes('1000/T'),'reciprocal temperature scale should render');
      inputs[4].children[1].value='three-donor';inputs[4].children[1].listeners.change();
      assert.equal(sim.children[3].children.length,3,'three Si:P doping levels should have a separate legend');
      assert.ok(sim.children[5].textContent.includes('1.00 × 10^14'),'three-level comparison should show its concentrations');
      inputs[4].children[1].value='contributions';inputs[4].children[1].listeners.change();
      inputs[0].children[1].value='heavy';inputs[0].children[1].listeners.change();
      assert.ok(graph.innerHTML.includes('regime-model-limit'),'heavy doping should flag invalid model');
    }else{
      assert.ok(!gamePane,'this lesson does not have a game tab');
      assert.ok(!last.classList.contains('physics-learning-outcomes'));
    }
  }
  // Every game uses clearly titled semantic choice groups with informative cards.
  function optionGrid(game,group=0){
    const field=game.children[4].children[group];
    assert.ok(field && field.tagName==='FIELDSET','expected fieldset in game options');
    const grid=field.children.find(e=>e.classList.contains('physics-game-options')||e.classList.contains('physics-fermi-option-grid'));
    assert.ok(grid,'expected card grid');
    return grid;
  }
  function pick(game,group,index){
    const cards=optionGrid(game,group).children;
    const card=cards[index];
    assert.ok(card&&card.tagName==='BUTTON','expected a selectable card');
    card.listeners.click();
    return game.children[5];
  }
  for(const [key,game] of [...Object.entries(gamesByTopic),...Object.entries(secondGamesByTopic)]){
    for(const field of game.children[4].children){
      assert.equal(field.tagName,'FIELDSET','named, accessible choice groups: '+key);
      assert.equal(field.children[0].tagName,'LEGEND','visible control heading: '+key);
      const cards=field.children.find(e=>e.classList.contains('physics-game-options')||e.classList.contains('physics-fermi-option-grid'));
      assert.ok(cards&&cards.children.length>=2,'meaningful choices: '+key);
      for(const card of cards.children){
        assert.equal(card.tagName,'BUTTON');
        assert.ok(card.children.length>=2,'choice needs a main label and supporting explanation: '+key);
        assert.ok(card.children[0].textContent.trim().length>0);
        assert.ok(card.children[1].textContent.trim().length>3,'sub-label missing: '+key);
        assert.ok(['true','false'].includes(card.attributes['aria-pressed']),'accessible selected state: '+key);
      }
    }
  }
  // Each game has a topic-specific choice and feedback loop in both languages.
  const crystalGame=gamesByTopic.crystal;
  pick(crystalGame,0,0);
  assert.ok(crystalGame.children[5].classList.contains('is-incorrect'));
  assert.ok(optionGrid(crystalGame,0).children[0].classList.contains('is-incorrect-answer'));
  pick(crystalGame,0,2);
  assert.ok(crystalGame.children[5].classList.contains('is-correct'));
  assert.ok(optionGrid(crystalGame,0).children[2].classList.contains('is-correct-answer'));
  assert.equal(optionGrid(crystalGame,0).children[0].attributes['aria-pressed'],'false');
  const blochGame=gamesByTopic['bloch-electron'];
  pick(blochGame,0,2); // k=π/a
  pick(blochGame,1,0); // incorrect prediction
  assert.ok(blochGame.children[5].classList.contains('is-incorrect'));
  pick(blochGame,1,2); // 180°
  assert.ok(blochGame.children[5].classList.contains('is-correct'));
  const bandsGame=gamesByTopic.bands;
  pick(bandsGame,0,1); // wrong level count
  assert.ok(bandsGame.children[5].classList.contains('is-incorrect'));
  pick(bandsGame,0,0); // two levels
  assert.ok(bandsGame.children[5].classList.contains('is-correct'));
  bandsGame.children[6].listeners.click(); // target four levels
  pick(bandsGame,0,1);
  assert.ok(bandsGame.children[5].classList.contains('is-correct'));
  const edgesGame=gamesByTopic.edges;
  pick(edgesGame,0,0); // 0.6 eV
  pick(edgesGame,1,0); // wrong excitation
  assert.ok(edgesGame.children[5].classList.contains('is-incorrect'));
  pick(edgesGame,1,1); // no excitation
  assert.ok(edgesGame.children[5].classList.contains('is-correct'));
  pick(edgesGame,0,3); // 1.8 eV
  assert.ok(!edgesGame.children[5].classList.contains('is-incorrect'),
    'new photon must clear old verdict');
  assert.equal(optionGrid(edgesGame,1).children[1].attributes['aria-pressed'],'false',
    'changing photon must reset old answer');
  pick(edgesGame,1,0);
  assert.ok(edgesGame.children[5].classList.contains('is-correct'));
  const dosGame=gamesByTopic.dos;
  pick(dosGame,0,0); // 1D
  pick(dosGame,1,2); // wrong trend
  assert.ok(dosGame.children[5].classList.contains('is-incorrect'));
  pick(dosGame,1,0); // decreases
  assert.ok(dosGame.children[5].classList.contains('is-correct'));
  pick(dosGame,0,1); // 2D
  assert.equal(optionGrid(dosGame,1).children[0].attributes['aria-pressed'],'false',
    'changing dimension must clear old trend');
  pick(dosGame,1,1); // constant
  assert.ok(dosGame.children[5].classList.contains('is-correct'));
  const holesGame=gamesByTopic.holes;
  pick(holesGame,0,1); // electron right sends the hole away from the target
  assert.ok(holesGame.children[5].classList.contains('is-incorrect'),
    'moving away from the target should give corrective guidance');
  holesGame.children[6].listeners.click(); // reset before trying a shorter route
  pick(holesGame,0,0); // electron left, hole right
  pick(holesGame,0,0);
  pick(holesGame,0,2); // electron up, hole down
  assert.ok(holesGame.children[5].classList.contains('is-correct'));
  assert.equal(holesGame.children[2].children[0].children.filter(e=>e.classList.contains('is-hole')&&e.classList.contains('is-target')).length,1);
  function fermiOption(game,group,index){return game.children[4].children[group].children[2].children[index];}
  const fermiGame=gamesByTopic.fermi;
  fermiOption(fermiGame,0,0).listeners.click(); // E-EF < 0
  fermiOption(fermiGame,2,0).listeners.click(); // wrong range
  assert.ok(fermiGame.children[5].classList.contains('is-incorrect'));
  fermiOption(fermiGame,2,2).listeners.click(); // >75%
  assert.ok(fermiGame.children[5].classList.contains('is-correct'));
  fermiOption(fermiGame,0,1).listeners.click(); // E=EF
  fermiOption(fermiGame,2,1).listeners.click(); // 50%
  assert.ok(fermiGame.children[5].classList.contains('is-correct'));
  const fermiEnergyChoices=fermiGame.children[4].children[0];
  assert.equal(fermiEnergyChoices.tagName,'FIELDSET');
  assert.equal(fermiEnergyChoices.children[0].tagName,'LEGEND');
  assert.ok(fermiOption(fermiGame,0,1).classList.contains('physics-fermi-card'));
  assert.equal(fermiOption(fermiGame,0,1).attributes['aria-pressed'],'true');
  assert.ok(fermiOption(fermiGame,2,1).classList.contains('is-correct-answer'));
  assert.ok(fermiGame.children[2].children.some(e=>e.classList.contains('physics-fermi-meter')),
    'precise occupancy meter is required instead of rounded dots');
  fermiOption(fermiGame,0,2).listeners.click();
  assert.ok(!fermiGame.children[5].classList.contains('is-correct'),
    'changing energy must clear old feedback');
  assert.equal(fermiOption(fermiGame,2,1).attributes['aria-pressed'],'false',
    'changing an input must clear old answer selection');
  fermiOption(fermiGame,2,0).listeners.click(); // correct below-25% answer at E>EF
  // A second complementary game per topic must test the previously uncovered concepts.
  const attempts=[
    ['crystal',0,1],['bloch-electron',0,1],['bands',0,1],
    ['edges',0,1],['dos',0,1],['holes',0,1],['fermi',0,1]
  ];
  for(const [key] of attempts){
    const game=secondGamesByTopic[key];
    assert.ok(game&&game.classList.contains('physics-learning-game'),'missing second game '+key);
    assert.ok(game.children[4].children.length>=1,'second game must offer choices '+key);
    assert.ok(game.children[3].textContent.length>15,'missing question '+key);
  }
  function choice(game,group,index){return pick(game,group,index);}
  const crystal2=secondGamesByTopic.crystal;
  assert.ok(choice(crystal2,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(crystal2,1,1).classList.contains('is-correct'));
  crystal2.children[6].listeners.click();
  assert.ok(choice(crystal2,1,1).classList.contains('is-correct'));
  crystal2.children[6].listeners.click();
  assert.ok(choice(crystal2,1,0).classList.contains('is-correct'));
  const bloch2=secondGamesByTopic['bloch-electron'];
  assert.ok(choice(bloch2,1,1).classList.contains('is-incorrect'));
  assert.ok(choice(bloch2,1,0).classList.contains('is-correct'));
  bloch2.children[6].listeners.click();
  assert.ok(choice(bloch2,1,1).classList.contains('is-correct'));
  const bands2=secondGamesByTopic.bands;
  assert.ok(choice(bands2,0,1).classList.contains('is-incorrect'));
  assert.ok(choice(bands2,0,0).classList.contains('is-correct'));
  bands2.children[6].listeners.click();
  assert.ok(choice(bands2,0,0).classList.contains('is-correct'));
  bands2.children[6].listeners.click();
  assert.ok(choice(bands2,0,1).classList.contains('is-correct'));
  const edges2=secondGamesByTopic.edges;
  assert.ok(choice(edges2,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(edges2,1,1).classList.contains('is-correct'));
  edges2.children[6].listeners.click();
  assert.ok(choice(edges2,1,1).classList.contains('is-correct'));
  const dos2=secondGamesByTopic.dos;
  assert.ok(choice(dos2,2,1).classList.contains('is-incorrect'));
  assert.ok(choice(dos2,2,0).classList.contains('is-correct'));
  choice(dos2,0,1);choice(dos2,1,1);
  assert.ok(choice(dos2,2,2).classList.contains('is-correct'));
  const holes2=secondGamesByTopic.holes;
  assert.ok(choice(holes2,1,2).classList.contains('is-incorrect'));
  assert.ok(choice(holes2,1,0).classList.contains('is-correct'));
  holes2.children[6].listeners.click();
  assert.ok(choice(holes2,1,1).classList.contains('is-correct'));
  const fermi2=secondGamesByTopic.fermi;
  assert.ok(choice(fermi2,1,2).classList.contains('is-incorrect'));
  assert.ok(choice(fermi2,1,0).classList.contains('is-correct'));
  choice(fermi2,0,0);
  assert.ok(choice(fermi2,1,2).classList.contains('is-correct'));
  choice(fermi2,0,1);
  assert.ok(choice(fermi2,1,1).classList.contains('is-correct'));
  // Three additional lessons each have two physically distinct, stateful games.
  const equilibrium1=gamesByTopic.equilibrium;
  assert.ok(choice(equilibrium1,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(equilibrium1,1,1).classList.contains('is-correct')); // n=1e11 -> p=1e9
  equilibrium1.children[6].listeners.click();
  assert.ok(choice(equilibrium1,1,1).classList.contains('is-correct')); // ND+=n-p
  choice(equilibrium1,0,1); // n=1e12, previous response cleared
  assert.ok(!equilibrium1.children[5].classList.contains('is-correct'));
  equilibrium1.children[6].listeners.click(); // back to mass-action stage
  assert.ok(choice(equilibrium1,1,0).classList.contains('is-correct')); // p=1e8
  const equilibrium2=secondGamesByTopic.equilibrium;
  choice(equilibrium2,0,1); // steady under continuous light
  assert.ok(choice(equilibrium2,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(equilibrium2,1,1).classList.contains('is-correct'));
  equilibrium2.children[6].listeners.click();
  assert.ok(choice(equilibrium2,1,1).classList.contains('is-correct')); // np>ni²
  const doping1=gamesByTopic.doping;
  choice(doping1,0,1); // phosphorus donor
  assert.ok(choice(doping1,1,2).classList.contains('is-incorrect'));
  assert.ok(choice(doping1,1,1).classList.contains('is-correct')); // electrons
  doping1.children[6].listeners.click();
  assert.ok(choice(doping1,1,1).classList.contains('is-correct')); // P+ fixed ion
  choice(doping1,0,2); // boron acceptor
  assert.ok(choice(doping1,1,2).classList.contains('is-correct')); // B− fixed ion
  const doping2=secondGamesByTopic.doping;
  assert.ok(choice(doping2,1,2).classList.contains('is-incorrect'));
  assert.ok(choice(doping2,1,0).classList.contains('is-correct')); // minority 1e5
  doping2.children[6].listeners.click();
  choice(doping2,0,2); // high-temperature intrinsic regime
  assert.ok(choice(doping2,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(doping2,1,2).classList.contains('is-correct'));
  const transport1=gamesByTopic.transport;
  assert.ok(choice(transport1,1,0).classList.contains('is-incorrect')); // E right: not electron right
  assert.ok(choice(transport1,1,1).classList.contains('is-correct')); // electron left, hole right
  transport1.children[6].listeners.click();
  choice(transport1,0,0); // higher electron concentration on right
  assert.ok(choice(transport1,1,0).classList.contains('is-correct')); // electron diffusion left
  const transport2=secondGamesByTopic.transport;
  assert.ok(choice(transport2,1,0).classList.contains('is-correct')); // less scattering increases mobility
  transport2.children[6].listeners.click();
  choice(transport2,0,1); // recombination
  assert.ok(choice(transport2,1,1).classList.contains('is-correct')); // fewer pairs
  transport2.children[6].listeners.click();
  choice(transport2,0,1); // 600 K
  assert.ok(choice(transport2,1,0).classList.contains('is-incorrect'));
  assert.ok(choice(transport2,1,1).classList.contains('is-correct')); // 52 mV
  // Both correct and wrong choices must teach the scientific reason and link to a real Explanation heading.
  for(const [key,game] of Object.entries(secondGamesByTopic)){
    const reason=game.children[5],link=reason.children.find(e=>e.classList.contains('physics-game-lesson-link'));
    assert.ok(link,'lesson reference missing: '+key);
    assert.ok(reason.children.find(e=>e.classList.contains('physics-game-why'))?.textContent.length>45,
      'pedagogical explanation too brief '+key);
    assert.ok(link.textContent.includes(lang==='en'?'Explanation: ':'Anlatım: '));
    const topicPage=pages.find(p=>p.dataset.physicsTopic===key);
    const lessonIntro=topicPage.children.find(p=>p.dataset.pane==='anlatim').children[0].children[0];
    assert.ok(lessonIntro.children.some(section=>link.textContent.includes(section.children[0].textContent)),
      'game must link to an exact existing narrative heading: '+key);
    link.listeners.click();
    assert.equal(win.lastSub,'anlatim','link should open lesson narrative');
  }
  for(const [key,game] of Object.entries(gamesByTopic)){
    const reason=game.children[5];
    assert.ok(reason.children.some(e=>e.classList.contains('physics-game-why')),'first-game pedagogy missing '+key);
    assert.ok(reason.children.some(e=>e.classList.contains('physics-game-lesson-link')),'first-game narrative reference missing '+key);
  }
  const coverage=win.PhysicsLearningGames.coverage;
  for(const key of topicsWithGames){
    const parts=coverage[key];
    assert.equal(parts.length,2);
    const union=new Set(parts.flat());
    assert.equal(union.size,4,'each of four objectives must be exercised across two games: '+key);
    for(let n=1;n<=4;n++)assert.ok(union.has(n),'uncovered objective '+key+' #'+n);
  }
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
    assert.equal(panes.length,5);
    for(const pane of panes)assert.ok(pane.children.length>0,'empty '+page.dataset.physicsTopic+' / '+pane.dataset.pane);
  }
  api.showTopic(main,'dos');api.showSub(main,'gorsel');
  assert.equal(pages.filter(e=>!e.hidden)[0].dataset.physicsTopic,'dos');
  assert.equal(all.filter(e=>e.classList.contains('physics-topic-pane')&&e.classList.contains('active')).length,1);
  assert.ok(api.showSub(main,'matematik'));
  api.showTopic(main,'holes');assert.ok(api.showSub(main,'oyun'));
  api.showTopic(main,'transport');assert.ok(api.showSub(main,'oyun'));
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
console.log('PASS: 22 games, 11 narratives, 46 outcomes, 37 QA, 55 lesson tabs, T/1000-T model');
