/* Ten independent semiconductor-physics lessons, four panels each.
   Existing Week 1 nodes are MOVED (not duplicated) so IDs and events are preserved. */
(function(){
'use strict';
var TOPICS=[
 ['crystal','Kristal yapı ve atomlar','Crystal structures and atoms'],
 ['bloch-electron','Kristal içindeki elektron','Electron in a crystal'],
 ['bands','Enerji band teorisi','Energy-band theory'],
 ['edges','Değerlik ve iletim bandı','Valence and conduction bands'],
 ['dos','Enerji bantlarında durum yoğunluğu','Density of states'],
 ['holes','Hol (boşluk) kavramı','The hole concept'],
 ['fermi','Fermi seviyesi ve olasılık','Fermi level and occupancy'],
 ['equilibrium','Elektron–hol dengesi','Electron–hole equilibrium'],
 ['doping','Has ve katkılı yarıiletkenler','Intrinsic and doped semiconductors'],
 ['transport','Taşıyıcı hareketi ve geçiş','Carrier transport and transition']
];
var TABS=[
 ['anlatim','Anlatım','Explanation'],
 ['matematik','Matematiksel temel','Mathematical foundations'],
 ['gorsel','Görsel / Simülasyon','Visuals / Simulations'],
 ['soru','Soru–Cevap','Questions & Answers']
];
var FORMULAS={
 crystal:[
 'Kübik elmas yapısındaki en yakın komşu mesafesi ve atom yoğunluğu:',
 'Nearest-neighbour separation and atomic density in diamond-cubic silicon:',
 '\\[d=\\frac{\\sqrt{3}}4 a,\\qquad N_{atom}=\\frac{8}{a^3}.\\]',
 'a=5.431 Å olan Si için d≈2.35 Å. Örgü sabiti atomlar arası bağ uzunluğu değildir.',
 'For Si with a=5.431 Å, d≈2.35 Å. Lattice constant is not the bond length.'
 ],
 'bloch-electron':[
 'Periyodik potansiyelde Bloch dalgası ve komşu hücre ilişkisi:',
 'Bloch wave in a periodic potential and translation by one unit cell:',
 '\\[\\psi_k(x)=e^{ikx}u_k(x),\\quad u_k(x+a)=u_k(x),\\quad \\psi_k(x+a)=e^{ika}\\psi_k(x).\\]',
 'Dalga fonksiyonunun fazı değişir; olasılık yoğunluğu periyodiktir. Bragg sınırında iki durumun karışması Δ=2|V_G| açabilir.',
 'The phase changes while probability density remains periodic. Two-wave Bragg coupling can open a gap Δ=2|V_G|.'
 ],
 bands:[
 'N atomlu açık uçlu yakın komşu tight-binding zincirindeki izinli düzeyler:',
 'Energy levels of a finite nearest-neighbour open tight-binding chain:',
 '\\[E_j=\\varepsilon_0-2t\\cos\\!\\left(\\frac{j\\pi}{N+1}\\right),\\quad j=1,\\dots,N.\\]',
 'N büyürken enerji seviyeleri sıklaşır, bant genişliği yaklaşık 4|t| sınırına yaklaşır. Gerçek Si sp³ yapısını bütünüyle açıklamaz.',
 'As N grows, the levels crowd into a bandwidth approaching 4|t|. This is not a complete model of sp³ silicon.'
 ],
 edges:[
 'İzinli iki bant arasında enerji aralığı ve etkin kütle yaklaşımı:',
 'Gap between two allowed bands and the effective-mass approximation:',
 '\\[E_g=E_c-E_v,\\qquad E_c(k)\\simeq E_c+\\frac{\\hbar^2(k-k_c)^2}{2m_e^*}.\\]',
 'Doğrudan bant aralığında bant kenarları aynı k noktasındadır, dolaylı aralıkta farklıdır. Parabolik bağıntı bant kenarı yakınındadır.',
 'For direct gaps both extrema have the same k; for indirect gaps they differ. The parabolic law applies near the band edge.'
 ],
 dos:[
 'k-uzayındaki durumların enerjiye göre türevi:',
 'The energy derivative of the number of available k-states:',
 '\\[\\mathcal N_d(E)\\propto(E-E_c)^{d/2},\\quad g_d(E)\\propto(E-E_c)^{d/2-1}.\\]',
 '1B ters karekök, 2B sabit, 3B karekök davranışı verir. Elektron yoğunluğu ise n=∫g_c(E)f(E)dE ile bulunur.',
 'This yields inverse-square-root 1D, constant 2D, and square-root 3D DOS. Electron concentration requires n=∫g_c(E)f(E)dE.'
 ],
 holes:[
 'Değerlik bandındaki boş durumların yoğunluğu:',
 'Counting empty states in the valence band:',
 '\\[p=\\int_{-\\infty}^{E_v}g_v(E)[1-f(E,T)]\\,dE.\\]',
 'Hol +q etkin yüklü bir kuaziparçacıktır; değerlik bandındaki eksik elektronu temsil eder, proton değildir.',
 'A hole is an effective +q quasiparticle representing a missing valence electron, not a proton.'
 ],
 fermi:[
 'Bir enerji durumunun elektronla dolu olma olasılığı:',
 'Electron occupation probability for an available energy state:',
 '\\[f(E,T)=\\frac{1}{1+e^{(E-E_F)/(k_BT)}}.\\]',
 'E=E_F için T>0 durumunda f=1/2. Boltzmann kuyruğu E−E_F≥3k_BT bölgesinde yaklaşık %5 hata sınırına iner.',
 'For E=E_F at T>0, f=1/2. The Boltzmann tail reaches about 5% relative error when E−E_F≥3k_BT.'
 ],
 equilibrium:[
 'Dejenere olmayan ısıl denge için kütle etkisi ve yük nötrlüğü:',
 'Mass-action and charge-neutrality laws in nondegenerate thermal equilibrium:',
 '\\[np=n_i^2,\\qquad n+N_A^-=p+N_D^+.\\]',
 'Kararlı durum mutlaka ısıl denge değildir. Sürekli aydınlatmada np=n_i² eşitliği genel olarak geçerli olmayabilir.',
 'A steady state is not necessarily thermal equilibrium. Under illumination, np=n_i² need not hold.'
 ],
 doping:[
 'Tam iyonlaşmış, güçlü kompanzasyon içermeyen yarıiletkenin yaklaşık taşıyıcı yoğunlukları:',
 'Approximate concentrations for fully ionized, weakly compensated semiconductors:',
 '\\[n\\simeq N_D\\quad(n\\text{-type}),\\qquad p\\simeq N_A\\quad(p\\text{-type}),\\qquad np=n_i^2.\\]',
 'Düşük sıcaklıkta eksik iyonlaşma ve yüksek katkıda dejenerelik bu yaklaşık ifadeleri bozabilir.',
 'Low-temperature incomplete ionization and high-doping degeneracy can invalidate these approximations.'
 ],
 transport:[
 'Elektron ve hol akımı, sürüklenme ve difüzyon katkılarının toplamıdır:',
 'Electron and hole currents combine drift and diffusion:',
 '\\[J_n=qn\\mu_n\\mathcal E+qD_n\\frac{dn}{dx},\\qquad J_p=qp\\mu_p\\mathcal E-qD_p\\frac{dp}{dx}.\\]',
 'Dejenere olmayan dengede Einstein bağıntısı D/μ=k_BT/q geçerlidir. Taşıyıcı üretimi ve rekombinasyon süreklilik denklemlerine girer.',
 'In the nondegenerate equilibrium limit D/μ=k_BT/q. Generation and recombination enter the continuity equations.'
 ]
};
var PROMPTS={
 crystal:['Örgü sabitiyle bağ uzunluğu aynı mıdır?','Hayır. Si için d=√3a/4.','Are lattice constant and bond length identical?','No. In diamond-cubic Si, d=√3a/4.'],
 'bloch-electron':['Bloch dalgası her hücrede aynı işareti mi taşır?','Hayır. Komşu hücreye geçerken exp(ika) fazı kazanabilir; |ψ|² periyodiktir.','Does a Bloch wave have the same sign in every cell?','No. It gains a phase exp(ika), while |ψ|² is periodic.'],
 bands:['N artınca bant genişliği sınırsız artar mı?','Hayır; sabit t için yaklaşık 4|t| sınırına yaklaşır.','Does the bandwidth increase without limit as N grows?','No. At fixed hopping t, it approaches 4|t|.'],
 edges:['İletim bandındaki elektron kristali terk etmiş midir?','Hayır, hâlâ kristal içindeki izinli bir kuantum durumundadır.','Has a conduction-band electron left the crystal?','No. It remains in an allowed state inside the solid.'],
 dos:['DOS, elektron sayısını mı verir?','Hayır. DOS kullanılabilir durumları sayar; elektron sayısı için Fermi doluluğu da gerekir.','Is DOS the number of electrons?','No. DOS counts available states; occupation requires the Fermi function.'],
 holes:['Hol proton mudur?','Hayır. Dolu değerlik bandındaki eksik elektronun kuaziparçacık modelidir.','Is a hole a proton?','No. It is a quasiparticle representing a missing valence electron.'],
 fermi:['Fermi seviyesi yasak aralıkta olabilir mi?','Evet. Orada elektron durumu olmasa da kimyasal potansiyel tanımlıdır.','Can the Fermi level lie inside the band gap?','Yes. The chemical potential can exist where there is no allowed electronic state.'],
 equilibrium:['Sabit ışık altındaki malzeme ısıl dengede midir?','Her zaman değil; kararlı durum ile ısıl denge farklıdır.','Is constant illumination equivalent to thermal equilibrium?','No. Steady state and thermal equilibrium are different.'],
 doping:['n tipi Si toplamda negatif yüklü müdür?','Hayır. Hareketli elektronlar pozitif donör iyonlarıyla dengelenir.','Does n-type silicon have a net negative charge?','No. Ionized donors balance the mobile electrons.'],
 transport:['Elektron sürüklenme hızı alanın yönünde midir?','Hayır, negatif yük nedeniyle alanın ters yönündedir.','Does electron drift velocity point along the electric field?','No. It points opposite to the field because electrons are negatively charged.']
};
function langPick(v,lang){return v[lang==='en'?1:0];}
function elem(tag,cls){var e=document.createElement(tag);if(cls)e.className=cls;return e;}
function topicForHeading(n){
 if(n===1)return 'crystal';if(n===2)return 'bands';if(n===3)return 'holes';
 if(n===4||n===8)return 'equilibrium';
 if(n>=5&&n<=7)return 'doping';return 'transport';
}
function narrativeTopic(node,otherwise){
 var id=node.id||'';
 var special={
  'course-topic-bloch-electron':'bloch-electron','course-note-bands':'bands',
  'course-note-edges':'edges','course-topic-dos':'dos',
  'course-note-holes':'holes','course-topic-fermi':'fermi',
  'course-topic-equilibrium':'equilibrium','course-note-doping':'doping',
  'course-topic-transport':'transport'
 };
 return special[id]||otherwise;
}
function moveNarrative(source,views){
 var prose=source.querySelector('.prose');if(!prose)return;
 var active='crystal';
 Array.from(prose.children).forEach(function(n){
   if(n.tagName==='H3'){
     var match=n.textContent.trim().match(/^1\.(\d+)\b/);
     if(match)active=topicForHeading(Number(match[1]));
   }
   views[narrativeTopic(n,active)].anlatim.appendChild(n);
 });
}
function moveMath(source,views,lang){
 var prose=source.querySelector('.prose')||source,section=0;
 Array.from(prose.children).forEach(function(n){
   if(n.tagName==='H3')section++;
   var key=section<=2?'edges':section===3?'dos':section===4?'equilibrium':
    section>=5&&section<=8?'doping':'transport';
   views[key].matematik.appendChild(n);
 });
 TOPICS.forEach(function(t){
   var data=FORMULAS[t[0]],panel=elem('section','physics-topic-formula');
   var h=elem('h3');h.textContent=langPick([data[0],data[1]],lang);
   panel.appendChild(h);
   var formula=elem('div','physics-formula');formula.textContent=data[2];panel.appendChild(formula);
   var note=elem('p');note.textContent=langPick([data[3],data[4]],lang);panel.appendChild(note);
   views[t[0]].matematik.insertBefore(panel,views[t[0]].matematik.firstChild);
 });
}
var PLOT_TOPICS={
 'p-lattice':'crystal','p-ek':'edges','p-egscale':'edges',
 'p-f0-lattice':'doping','p-fd':'fermi','p-ni':'equilibrium',
 'p-f0-regime':'doping','p-dop':'doping','p-f0-sweep':'doping',
 'p-mob':'transport','p-scat':'transport','p-sc-mu':'transport','p-hs':'transport'
};
function appendFigure(fig,views,key,containerClass){
 var into=views[key].gorsel;
 if(containerClass){
  var group=into.querySelector('.'+containerClass);
  if(!group){group=elem('div',containerClass);into.appendChild(group);}
  group.appendChild(fig);
 }else into.appendChild(fig);
}
function moveVisuals(source,views,lang){
 Array.from(source.children).forEach(function(node){
  if(node.classList.contains('ss-lab')||node.classList.contains('sf-interactive')){
    var first=node.classList.contains('ss-lab'),keys=first?
      ['bloch-electron','bands','dos']:['bands','dos','fermi'];
    Array.from(node.children).forEach(function(fig,i){
      appendFigure(fig,views,keys[i]||'bands',first?'ss-lab':'sf-interactive');
    });
  }else if(node.matches('section.fig')){
    var plot=node.querySelector('.plot[id]');
    appendFigure(node,views,(plot&&PLOT_TOPICS[plot.id])||'bands');
  }else{
    views.crystal.gorsel.appendChild(node);
  }
 });
 holeDemo(views.holes.gorsel,lang);
}
var QUESTION_TOPICS={
 1:'crystal',2:'crystal',3:'equilibrium',4:'holes',5:'holes',
 6:'doping',7:'doping',8:'doping',9:'doping',10:'doping',
 11:'fermi',12:'equilibrium',13:'doping',14:'doping',
 15:'transport',16:'transport',17:'transport',18:'transport',
 19:'edges',20:'edges',21:'equilibrium',22:'equilibrium'
};
function moveQuestions(source,views,lang){
 Array.from(source.children).forEach(function(n){
  var question=n.querySelector&&n.querySelector('.q');
  var match=question&&question.textContent.match(/^\s*(\d+)\./);
  views[QUESTION_TOPICS[match?Number(match[1]):0]||'bands'].soru.appendChild(n);
 });
 TOPICS.forEach(function(t){
  var a=PROMPTS[t[0]],qa=elem('div','qa physics-topic-question');
  var title=elem('p','q');title.textContent=lang==='en'?a[2]:a[0];
  var details=elem('details'),sum=elem('summary');sum.textContent=lang==='en'?'Show explanation':'Çözümü göster';
  var p=elem('p');p.textContent=lang==='en'?a[3]:a[1];
  details.appendChild(sum);details.appendChild(p);qa.appendChild(title);qa.appendChild(details);
  views[t[0]].soru.insertBefore(qa,views[t[0]].soru.firstChild);
 });
}
function holeDemo(view,lang){
 var root=elem('section','physics-hole-sim');
 var title=elem('h3');title.textContent=lang==='en'?'Motion of a hole':'Holün hareketi';
 var help=elem('p');help.textContent=lang==='en'?
  'One electron fills the neighbouring empty state; the vacancy effectively moves in the opposite direction.':
  'Komşu elektron boş durumu doldurur; boşluk, yani hol, etkin olarak ters yönde ilerler.';
 var cells=elem('div','physics-hole-sites');cells.setAttribute('role','img');
 var controls=elem('div','physics-hole-controls'),next=elem('button','sim-btn'),reset=elem('button','sim-btn');
 var status=elem('p','physics-hole-note');
 next.type=reset.type='button';next.textContent=lang==='en'?'Electron → / hole ←':'Elektron → / hol ←';
 reset.textContent=lang==='en'?'Reset':'Sıfırla';
 var step=0;
 function draw(){
  cells.innerHTML='';
  var vacancy=6-step;
  for(var i=0;i<7;i++){
   var cell=elem('span',vacancy===i?'physics-site is-hole':'physics-site is-electron');
   cell.textContent=vacancy===i?'○':'●';cell.setAttribute('aria-label',
      lang==='en'?(vacancy===i?'Vacant state':'Occupied state'):(vacancy===i?'Boş durum':'Dolu durum'));
   cells.appendChild(cell);
  }
  status.textContent=(lang==='en'?'Vacancy at site ':'Holün konumu: ')+(vacancy+1)+'/7';
 }
 next.addEventListener('click',function(){step=(step+1)%7;draw();});
 reset.addEventListener('click',function(){step=0;draw();});
 controls.appendChild(next);controls.appendChild(reset);
 root.appendChild(title);root.appendChild(help);root.appendChild(cells);root.appendChild(controls);
 root.appendChild(status);view.appendChild(root);draw();
}
function createPage(topic,i,lang,views){
 var page=elem('article','physics-topic-page');page.dataset.physicsTopic=topic[0];page.hidden=true;
 var header=elem('header','physics-lesson-heading');
 var n=elem('span','physics-lesson-index');n.textContent=String(i+1).padStart(2,'0');
 var h=elem('h2');h.textContent=langPick([topic[1],topic[2]],lang);
 header.appendChild(n);header.appendChild(h);page.appendChild(header);
 var tabs=elem('div','subtabs physics-topic-tabs');tabs.setAttribute('role','tablist');
 TABS.forEach(function(t){
  var b=elem('button');b.type='button';b.dataset.sub=t[0];
  b.setAttribute('role','tab');b.setAttribute('aria-selected','false');
  b.textContent=langPick([t[1],t[2]],lang);
  b.addEventListener('click',function(){window.showSub(t[0]);});
  tabs.appendChild(b);
 });
 page.appendChild(tabs);
 TABS.forEach(function(t){
  var pane=elem('section','pane physics-topic-pane');pane.dataset.pane=t[0];pane.setAttribute('role','tabpanel');
  if(t[0]==='anlatim'||t[0]==='matematik'){
   var prose=elem('div','prose');pane.appendChild(prose);views[topic[0]][t[0]]=prose;
  }else views[topic[0]][t[0]]=pane;
  page.appendChild(pane);
 });
 return page;
}
function mount(main,lang,initialTopic){
 if(main.querySelector('[data-physics-pages]'))return;
 var old={};
 ['anlatim','matematik','gorsel','soru','urun'].forEach(function(t){
   old[t]=Array.from(main.children).find(function(c){return c.classList&&c.classList.contains('pane')&&c.dataset.pane===t;});
 });
 if(!old.anlatim||!old.matematik||!old.gorsel||!old.soru)return;
 var views={},wrapper=elem('div','physics-topic-pages');
 wrapper.setAttribute('data-physics-pages','');
 TOPICS.forEach(function(t){views[t[0]]={};});
 TOPICS.forEach(function(t,i){wrapper.appendChild(createPage(t,i,lang,views));});
 Array.from(main.children).forEach(function(c){
   if(c.classList&&(c.classList.contains('week-head')||c.classList.contains('subtabs')))c.remove();
 });
 main.appendChild(wrapper);
 moveNarrative(old.anlatim,views);
 moveMath(old.matematik,views,lang);
 moveVisuals(old.gorsel,views,lang);
 moveQuestions(old.soru,views,lang);
 if(old.urun){
  var details=elem('details','physics-optional-products'),summary=elem('summary');
  summary.textContent=lang==='en'?'Semiconductor product and manufacturing examples':'Yarıiletken ürün ve üretim örnekleri';
  details.appendChild(summary);
  Array.from(old.urun.children).forEach(function(c){details.appendChild(c);});
  views.transport.anlatim.appendChild(details);
 }
 Object.keys(old).forEach(function(t){if(old[t])old[t].remove();});
 showTopic(main,initialTopic||'crystal');
}
function page(main){return main&&main.querySelector('.physics-topic-page:not([hidden])');}
function showTopic(main,key){
 if(!main||!TOPICS.some(function(x){return x[0]===key;}))return false;
 var all=main.querySelector('[data-physics-pages]');if(!all)return false;
 Array.from(all.children).forEach(function(p){
   p.hidden=p.dataset.physicsTopic!==key;
   p.querySelectorAll('.physics-topic-pane.active').forEach(function(pane){pane.classList.remove('active');});
 });
 showSub(main,'anlatim');return true;
}
function showSub(main,key){
 var shown=page(main);if(!shown||!TABS.some(function(x){return x[0]===key;}))return false;
 shown.querySelectorAll(':scope > .physics-topic-tabs button').forEach(function(b){
   b.setAttribute('aria-selected',String(b.dataset.sub===key));
 });
 shown.querySelectorAll(':scope > .physics-topic-pane').forEach(function(p){
   p.classList.toggle('active',p.dataset.pane===key);
 });
 return true;
}
window.PhysicsTopicPages={mount:mount,showTopic:showTopic,showSub:showSub,topicIds:TOPICS.map(function(x){return x[0];})};
})();