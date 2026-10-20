/* Choice-driven learning labs and measurable objectives for the first seven physics topics. */
(function(){
'use strict';
var KEYS=['crystal','bloch-electron','bands','edges','dos','holes','fermi'];
var OUTCOMES={
 'crystal':[
 ['Kristal örgüsü, birim hücre ve örgü sabiti kavramlarını ayırt eder.','Distinguish a crystal lattice, unit cell, and lattice constant.'],
 ['Silisyumun elmas-kübik kristal yapısını ve dört en yakın komşusunu tanır.','Identify silicon’s diamond-cubic structure and four nearest neighbours.'],
 ['Örgü sabiti a ile en yakın komşu uzaklığı d=√3a/4 ilişkisini kullanır.','Apply d=√3a/4 to relate lattice constant and nearest-neighbour distance.'],
 ['Atom konumlarının iki boyutlu çizimini üç boyutlu bağ yapısının temsili olarak yorumlar.','Interpret a 2D projection as a representation of 3D bonding.']
 ],
 'bloch-electron':[
 ['Tek atomdaki yerel orbital ile kristalde yayılabilen Bloch durumunu karşılaştırır.','Compare atomic orbitals with extended Bloch states.'],
 ['Komşu hücreler arasındaki faz farkını Δφ=ka ile ilişkilendirir.','Relate neighbouring-cell phase difference to Δφ=ka.'],
 ['Dalga fonksiyonunun fazı ile olasılık yoğunluğunun farklı nicelikler olduğunu açıklar.','Explain the distinction between wavefunction phase and probability density.'],
 ['k=0 ve k=π/a için komşu hücrelerin göreli fazını öngörür.','Predict relative phases at k=0 and k=π/a.']
 ],
 'bands':[
 ['İki atomun etkileşmesiyle ayrılan enerji düzeylerini açıklar.','Explain energy-level splitting when two atoms interact.'],
 ['N atomlu basit zincirde N izinli orbital düzeyi oluştuğunu gösterir (spin hariç).','Identify N orbital energy levels in a simple N-site chain (ignoring spin).'],
 ['Atom sayısı arttıkça düzeylerin sıklaşıp bant oluşturduğunu görselleştirir.','Visualize levels crowding into a band as atom count grows.'],
 ['Basit sıkı-bağ (tight-binding) modelinin silisyumun tam bant yapısı olmadığını ayırt eder.','Recognize that a simple tight-binding chain is not silicon’s full band structure.']
 ],
 'edges':[
 ['Değerlik bandı, iletim bandı ve yasak bant aralığını ayırt eder.','Distinguish the valence band, conduction band, and band gap.'],
 ['Bant aralığını Eg=Ec−Ev olarak ifade eder.','Express the gap as Eg=Ec−Ev.'],
 ['Enerji eşiğini geçen bir uyarılmanın elektron–hol çifti oluşturabileceğini öngörür.','Predict that sufficient excitation can create an electron–hole pair.'],
 ['İletim bandına çıkan elektronun kristalden ayrılmadığını açıklar.','Explain that a conduction-band electron remains in the solid.']
 ],
 'dos':[
 ['Durum yoğunluğu g(E) ile elektron doluluk olasılığı f(E) ayrımını yapar.','Distinguish density of states g(E) from occupation probability f(E).'],
 ['Parabolik bant yaklaşımında 1B, 2B ve 3B DOS eğilimlerini karşılaştırır.','Compare 1D, 2D, and 3D DOS trends near a parabolic band edge.'],
 ['Bir boyutta bant kenarına yakın DOS artışını ve iki boyuttaki sabitliği tanımlar.','Recognize the 1D edge enhancement and 2D constant DOS.'],
 ['Taşıyıcı sayısının yalnızca DOS’a değil doluluk fonksiyonuna da bağlı olduğunu açıklar.','Explain that carrier concentration depends on occupancy as well as DOS.']
 ],
 'holes':[
 ['Holün gerçek pozitif parçacık değil, eksik değerlik elektronu olduğunu açıklar.','Explain that a hole is a missing valence electron, not a literal positive particle.'],
 ['Bir elektron boş durumu doldurunca holün ters yönde görünür hareketini izler.','Trace apparent hole motion opposite to the filling electron.'],
 ['Elektrik alan altında hol ve elektron sürüklenme yönlerini karşılaştırır.','Compare electron and hole drift directions in an electric field.'],
 ['Bir 2B örgüde doğru komşu elektron hareketlerini seçerek holü hedefe taşır.','Guide a hole through a 2D lattice by choosing neighbouring electron moves.']
 ],
 'fermi':[
 ['Fermi–Dirac olasılığını enerji farkı ve sıcaklığa bağlar.','Relate Fermi–Dirac occupation to energy difference and temperature.'],
 ['E=EF için T>0 olduğunda doluluk olasılığının %50 olduğunu hesaplar.','Calculate 50% occupancy at E=EF for T>0.'],
 ['EF altındaki/üstündeki mevcut durumların doluluk eğilimini öngörür.','Predict occupancy above and below EF.'],
 ['Sıcaklık arttıkça doluluk geçişinin genişlediğini açıklar.','Explain thermal broadening of the occupancy transition.']
 ]
};
function L(tr,en,lang){return lang==='en'?en:tr;}
function el(tag,cls,text){
 var x=document.createElement(tag);if(cls)x.className=cls;
 if(text!==undefined)x.textContent=text;
 return x;
}
function textRow(parent,cls,text){var p=el('p',cls,text);parent.appendChild(p);return p;}
function button(text,handler,cls){
 var b=el('button',cls||'physics-game-choice',text);b.type='button';b.addEventListener('click',handler);return b;
}
function choiceGroup(parent,lang,number,tr,en,hintTr,hintEn){
 var group=el('fieldset','physics-game-choice-group');
 group.appendChild(el('legend','physics-game-choice-heading',
  String(number).padStart(2,'0')+' · '+L(tr,en,lang)));
 if(hintTr)group.appendChild(el('p','physics-game-choice-hint',L(hintTr,hintEn,lang)));
 var grid=el('div','physics-game-options');
 group.appendChild(grid);parent.appendChild(group);return grid;
}
var feedbackSerial=0,lastFeedbackGood=false;
function clearChoices(into){
 Array.from(into.children).forEach(function(card){
  card.setAttribute('aria-pressed','false');
  card.classList.remove('is-correct-answer');card.classList.remove('is-incorrect-answer');
 });
}
function setChoices(into,items,onPick){
 into.innerHTML='';
 items.forEach(function(item,i){
  var title=typeof item==='string'?item:(Array.isArray(item)?item[0]:item.title);
  var detail=typeof item==='string'?'':(Array.isArray(item)?item[1]:item.detail);
  var card=el('button','physics-game-choice');card.type='button';
  card.setAttribute('aria-pressed','false');
  card.appendChild(el('strong','physics-game-choice-title',title));
  if(detail)card.appendChild(el('span','physics-game-choice-detail',detail));
  card.addEventListener('click',function(){
   Array.from(into.children).forEach(function(other,index){
    other.setAttribute('aria-pressed',String(index===i));
    other.classList.remove('is-correct-answer');other.classList.remove('is-incorrect-answer');
   });
   var serial=feedbackSerial,good=onPick(i);
   if(typeof good!=='boolean'&&feedbackSerial!==serial)good=lastFeedbackGood;
   if(typeof good==='boolean'&&Array.from(into.children).indexOf(card)!==-1){
    card.classList.add(good?'is-correct-answer':'is-incorrect-answer');
   }
  });
  into.appendChild(card);
 });
}
function feedback(elm,good,explanation){
 feedbackSerial++;lastFeedbackGood=good;
 elm.innerHTML='';
 elm.className='physics-game-feedback '+(good?'is-correct':'is-incorrect');
 elm.setAttribute('role','status');
 var context=elm._learning||{},lang=context.lang||'tr';
 elm.appendChild(el('strong','physics-game-result',good?L('✓ Doğru seçim','✓ Correct choice',lang):L('↻ Bir daha düşün','↻ Think again',lang)));
 textRow(elm,'physics-game-brief',explanation);
 var topic=GAME_GUIDANCE[context.key],part=topic&&topic[context.part-1];
 var entry=part&&part[context.focus||0];
 if(entry){
  var pair=entry[lang==='en'?1:0],why=good?pair[0]:pair[1];
  textRow(elm,'physics-game-why',
   (good?L('Doğru çünkü: ','Correct because: ',lang):L('Yanlış çünkü: ','Not quite because: ',lang))+why);
  var link=button(L('Anlatım: ','Explanation: ',lang)+pair[2]+' →',function(){
   if(typeof window.showSub==='function')window.showSub('anlatim');
  },'physics-game-lesson-link');
  elm.appendChild(link);
 }
}
function frame(target,lang,title,help){
 var root=el('section','physics-learning-game');
 root.appendChild(el('h3','',title));
 textRow(root,'physics-game-help',help);
 var scene=el('div','physics-game-scene'),question=el('p','physics-game-question');
 var controls=el('div','physics-game-choices'),response=el('div','physics-game-feedback');
 response.setAttribute('role','status');
 response._learning={key:target.dataset.gameKey,part:Number(target.dataset.gamePart)||1,focus:0,lang:lang};
 root.appendChild(scene);root.appendChild(question);root.appendChild(controls);root.appendChild(response);
 target.appendChild(root);
 return {root:root,scene:scene,question:question,controls:controls,response:response};
}
function addOutcomes(into,lang,key){
 var section=el('section','physics-learning-outcomes');
 section.appendChild(el('h3','',L('Kazanımlar','Learning outcomes',lang)));
 var list=el('ol');
 OUTCOMES[key].forEach(function(pair){list.appendChild(el('li','',L(pair[0],pair[1],lang)));});
 section.appendChild(list);into.appendChild(section);
}
function gameCrystal(target,lang){
 var v=frame(target,lang,L('Örgü dedektifi','Crystal detective',lang),
  L('Yapıyı seç, 2B şemayı gözle ve kristal ipuçlarını çöz. Çizim gerçek 3B örgünün izdüşümüdür.','Choose a structure, inspect its schematic 2D projection, and solve crystal clues. This is not a full 3D lattice.',lang));
 var rounds=[
  {q:['Silisyumun kristal yapısı hangisidir?','Which crystal structure does silicon have?'],
   opts:[['Basit kübik','Simple cubic'],['Hacim merkezli kübik','Body-centred cubic'],['Elmas-kübik','Diamond cubic']],ok:2,
   why:['Silisyum elmas-kübik yapıdadır.','Silicon has a diamond-cubic lattice.']},
  {q:['Bir Si atomunun en yakın komşu sayısı kaçtır?','How many nearest neighbours surround one Si atom?'],
   opts:[['4','4'],['6','6'],['8','8']],ok:0,
   why:['Elmas-kübik örgüde koordinasyon sayısı 4’tür.','Diamond-cubic silicon has coordination number 4.']},
  {q:['Örgü sabiti a ile bağ uzunluğu d ilişkisi hangisidir?','Which relation connects lattice constant a and bond length d?'],
   opts:[['d = a','d = a'],['d = √3a/4','d = √3a/4'],['d = a/2','d = a/2']],ok:1,
   why:['En yakın komşu uzaklığı d=√3a/4’tür.','Nearest-neighbour distance is d=√3a/4.']}
 ];
 var round=0,options=choiceGroup(v.controls,lang,1,
  'Kristal cevabını seç','Choose the crystal answer',
  'Sorudaki yapıyı, komşu sayısını veya bağıntıyı karşılaştır.','Compare the structure, neighbour count, or relation.'),next=button(L('Sonraki ipucu','Next clue',lang),function(){round=(round+1)%rounds.length;draw();},'sim-btn');
 next.hidden=true;v.root.appendChild(next);
 function grid(selected){
  v.scene.innerHTML='';
  var title=el('p','physics-game-visual-label',L('Örgü izdüşümü (şematik)','Lattice projection (schematic)',lang));
  var map=el('div','physics-game-atom-grid');
  for(var r=0;r<5;r++)for(var c=0;c<5;c++){
   var atom=el('span','physics-game-atom');
   if(selected===1&&r%2===1&&c%2===1)atom.classList.add('is-centre');
   if(selected===2&&(r+c)%2===0)atom.classList.add('is-bond');
   map.appendChild(atom);
  }
  v.scene.appendChild(title);v.scene.appendChild(map);
 }
 function draw(){
  clearChoices(options);
  var row=rounds[round];v.response._learning.focus=round;v.question.textContent=L(row.q[0],row.q[1],lang);
  next.hidden=true;v.response.innerHTML='';grid(round===0?0:2);
  setChoices(options,row.opts.map(function(a,i){return [L(a[0],a[1],lang),
    L(round===0?['Köşelerde atomlar','Köşeler + merkez','Tetrahedral ağ'][i]:round===1?
      ['Dört en yakın atom','Altı en yakın atom','Sekiz en yakın atom'][i]:
      ['Kenarla aynı','Elmas-kübik bağıntı','Kenarın yarısı'][i],
      round===0?['Atoms at corners','Corners and centre','Tetrahedral network'][i]:round===1?
      ['Four neighbours','Six neighbours','Eight neighbours'][i]:
      ['Equal to cell edge','Diamond-cubic relation','Half the edge'][i],lang)];}),function(i){
   grid(round===0?i:2);
   feedback(v.response,i===row.ok,(i===row.ok?L('Doğru! ','Correct! ',lang):L('Tekrar düşün. ','Try again. ',lang))+L(row.why[0],row.why[1],lang));
   next.hidden=i!==row.ok;return i===row.ok;
  });
 }
 draw();
}
function gameBloch(target,lang){
 var v=frame(target,lang,L('Bloch fazı laboratuvarı','Bloch phase lab',lang),
  L('Dalga vektörünü seç; komşu örgü hücresinin faz farkını tahmin et. Δφ = ka.','Select the wave vector and predict the phase shift between neighbouring cells: Δφ = ka.',lang));
 var kOptions=['k = 0','k = π/(2a)','k = π/a'],phases=[0,90,180],chosen=1;
 var kBar=choiceGroup(v.controls,lang,1,'Dalga vektörü','Wave vector',
   'Fazı belirleyen k değerini seç.','Select the k value that controls phase.');
 var predict=choiceGroup(v.controls,lang,2,'Faz farkı tahmini','Predict the phase step',
   'Yan yana iki birim hücre arasındaki açısal fark.','Angular difference between adjacent unit cells.');
 function draw(reveal){
  v.scene.innerHTML='';
  var cells=el('div','physics-game-phase-cells');
  for(var i=0;i<5;i++){
   var card=el('div','physics-game-phase-cell');
   var arrow=el('span','physics-game-phase-arrow','↑');
   arrow.setAttribute('style','transform:rotate('+(reveal?i*phases[chosen]:0)+'deg)');
   card.appendChild(arrow);
   card.appendChild(el('span','',reveal?((i*phases[chosen])%360)+'°':'?'));
   cells.appendChild(card);
  }
  v.scene.appendChild(cells);
 }
 function pickK(i){chosen=i;v.response.innerHTML='';clearChoices(predict);v.question.textContent=L('Komşu hücrelerin faz farkı kaç derece?','What is the phase difference between adjacent cells?',lang);draw(false);
  Array.from(kBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===chosen));});
 }
 setChoices(kBar,kOptions.map(function(k,i){return [k,L(
   ['Durağan faz örüntüsü','Orta dalga vektörü','Brillouin sınırı'][i],
   ['No phase progression','Intermediate wave vector','Zone-edge wave vector'][i],lang)];}),pickK);
 setChoices(predict,[['0°',L('Faz farkı yok','No phase offset',lang)],
  ['90°',L('Çeyrek tur','Quarter turn',lang)],['180°',L('Yarım tur','Half turn',lang)]],function(i){
  var good=phases[chosen]===phases[i];
  feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Henüz değil. ','Not quite. ',lang))+
   L('Bloch fazı komşu hücrede ka kadar değişir; |ψ|² faza bağlı değildir.','Bloch phase advances by ka; |ψ|² is independent of this phase.',lang));
  draw(true);return good;
 });
 pickK(1);
}
function gameBands(target,lang){
 var v=frame(target,lang,L('Atomdan banda','From atoms to bands',lang),
  L('Hedefteki izinli düzey sayısını üretmek için zincirde kaç atom olması gerektiğini seç.','Choose the number of atoms needed to produce the target number of allowed orbital levels.',lang));
 var targets=[2,4,8],round=0;
 var options=choiceGroup(v.controls,lang,1,'Zincirdeki atom sayısı','Atoms in the chain',
  'Hedeflenen izinli orbital düzey sayısını oluştur.','Build the target number of allowed orbital levels.');
 var next=button(L('Sonraki hedef','Next target',lang),function(){round=(round+1)%targets.length;draw();},'sim-btn');
 next.hidden=true;v.root.appendChild(next);
 function ladder(n){
  v.scene.innerHTML='';
  var track=el('div','physics-game-energy-ladder');
  for(var j=1;j<=n;j++){
   var e=-2*Math.cos(j*Math.PI/(n+1));
   var line=el('span','physics-game-energy-level');
   line.setAttribute('style','bottom:'+((e+2)*25)+'%');
   track.appendChild(line);
  }
  v.scene.appendChild(track);
  textRow(v.scene,'physics-game-visual-label',L(n+' atom → '+n+' orbital enerji düzeyi',n+' atoms → '+n+' orbital energy levels',lang));
 }
 function draw(){
  clearChoices(options);
  next.hidden=true;v.response.innerHTML='';v.question.textContent=L('Hedef: '+targets[round]+' farklı orbital enerji düzeyi oluştur.','Target: create '+targets[round]+' distinct orbital energy levels.',lang);
  ladder(2);
 }
 setChoices(options,[2,4,8].map(function(n){return [n+' '+L('atom','atoms',lang),
    L(n+' bağlı orbital → '+n+' düzey',n+' linked orbitals → '+n+' levels',lang)];}),function(i){
  var n=targets[i];ladder(n);var good=n===targets[round];
  feedback(v.response,good,(good?L('Başardın! ','Well done! ',lang):L('Bu sayı hedefe uymuyor. ','Not the target count. ',lang))+
   L('Bu basit zincirde spin hariç N atom, N orbital düzeyi verir.','In this simple spinless chain, N sites give N orbital levels.',lang));
  next.hidden=!good;return good;
 });
 draw();
}
function gameEdges(target,lang){
 var v=frame(target,lang,L('Bant aralığı kapısı','Band-gap gate',lang),
  L('Foton enerjisini seç ve elektronun iletim bandına uyarılıp uyarılamayacağını tahmin et (örnek Eg≈1,1 eV).','Choose the photon energy and predict whether it can excite an electron into the conduction band (illustrative Eg≈1.1 eV).',lang));
 var energies=[0.6,1.0,1.2,1.8],chosen=2,revealed=false;
 var energyBar=choiceGroup(v.controls,lang,1,'Foton enerjisi','Photon energy',
   'Eg ≈ 1,1 eV eşiği ile karşılaştıracağın fotonu seç.','Select a photon to compare with Eg ≈ 1.1 eV.');
 var predict=choiceGroup(v.controls,lang,2,'Geçiş tahmini','Predict the transition',
   'Bu foton, bantlar arası uyarılmaya enerji sağlayabilir mi?','Can this photon supply the energy for interband excitation?');
 function render(){
  v.scene.innerHTML='';
  var bands=el('div','physics-game-bands');
  var conduction=el('div','physics-game-band is-conduction',L('İletim bandı','Conduction band',lang));
  var gap=el('div','physics-game-gap','Eg ≈ 1.1 eV');
  var valence=el('div','physics-game-band is-valence',L('Değerlik bandı','Valence band',lang));
  if(revealed&&energies[chosen]>=1.1)conduction.classList.add('is-excited');
  bands.appendChild(conduction);bands.appendChild(gap);bands.appendChild(valence);
  v.scene.appendChild(bands);
  textRow(v.scene,'physics-game-visual-label',
   L('Seçilen foton: ','Selected photon: ',lang)+energies[chosen].toFixed(1)+' eV');
 }
 function pickEnergy(i){chosen=i;revealed=false;v.response.innerHTML='';clearChoices(predict);render();
  Array.from(energyBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 setChoices(energyBar,energies.map(function(e,i){return [e.toFixed(1)+' eV',
    L(['Düşük enerji','Eşiğe yakın','Eşik civarında','Yüksek enerji'][i],
      ['Low energy','Near threshold','Around threshold','High energy'][i],lang)];}),pickEnergy);
 setChoices(predict,[
   [L('Uyarılabilir','Excitation possible',lang),L('Elektron–hol çifti oluşabilir','Electron–hole pair may form',lang)],
   [L('Uyarılamaz','No excitation',lang),L('Tek foton eşiğe yetmez','One photon does not reach the threshold',lang)]
  ],function(i){
  revealed=true;var can=energies[chosen]>=1.1,good=(i===0)===can;
  render();
  feedback(v.response,good,(good?L('Doğru! ','Correct! ',lang):L('Tekrar dene. ','Try again. ',lang))+
   (can?L('Enerji eşiğin üstünde; enerji bakımından geçiş mümkündür.','Energy exceeds the gap; excitation is energetically possible.',lang):
        L('Bu fotonun enerjisi örnek bant aralığından küçüktür.','This photon energy lies below the example band gap.',lang)));
   return good;
 });
 v.question.textContent=L('Bu enerji elektron–hol çifti oluşturmak için yeterli mi?','Is this enough energy to create an electron–hole pair?',lang);
 textRow(v.root,'physics-game-footnote',L(
  'Model yalnızca enerji eşiğini karşılaştırır; Si’nin dolaylı aralığında momentum korunumu ve fononlar da önemlidir.',
  'This compares energy thresholds only; indirect-gap silicon also requires momentum conservation, often involving phonons.',lang));
 pickEnergy(2);
}
function gameDos(target,lang){
 var v=frame(target,lang,L('Durum yoğunluğu tahmincisi','Density-of-states predictor',lang),
  L('Boyutu seç, bant kenarından uzaklaştıkça kullanılabilir durum yoğunluğunun şeklini tahmin et.','Choose dimensionality and predict how the available density of states changes above the band edge.',lang));
 var chosen=2,dimensions=[1,2,3];
 var dimensionBar=choiceGroup(v.controls,lang,1,'Modelin boyutu','Model dimensionality',
   'Elektronun serbestçe hareket edebildiği boyut sayısı.','Number of directions where an electron can move freely.');
 var predict=choiceGroup(v.controls,lang,2,'DOS eğilimini yorumla','Predict the DOS trend',
   'Ec bant kenarından daha yüksek enerjiye doğru bak.','Read the graph moving to higher energy from Ec.');
 function plot(){
  v.scene.innerHTML='';
  var bars=el('div','physics-game-dos-bars');
  var values=[];
  for(var i=0;i<9;i++){var e=.1+i*.1;values.push(Math.pow(e,chosen/2-1));}
  var max=Math.max.apply(null,values);
  values.forEach(function(x,i){
   var b=el('span','physics-game-dos-bar');
   b.setAttribute('style','height:'+Math.round(12+78*x/max)+'%');
   b.setAttribute('aria-label',L('Enerji dilimi ','Energy bin ',lang)+(i+1));
   bars.appendChild(b);
  });
  v.scene.appendChild(bars);
  textRow(v.scene,'physics-game-visual-label',
   L('Enerji: Ec’den başlayıp sağa artar. Bu grafik durumları gösterir, elektron doluluğunu değil.',
     'Energy increases rightward from Ec. These bars show available states, not occupied electrons.',lang));
 }
 function setDim(i){chosen=dimensions[i];v.response.innerHTML='';clearChoices(predict);plot();
  Array.from(dimensionBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 setChoices(dimensionBar,[
  ['1B · 1D',L('İdeal kuantum tel','Ideal quantum wire',lang)],
  ['2B · 2D',L('İdeal ince tabaka','Ideal quantum well',lang)],
  ['3B · 3D',L('Hacimsel kristal','Bulk crystal',lang)]
 ],setDim);
 setChoices(predict,[
   [L('Azalır','Decreases',lang),L('Yüksekten düşüğe','From high to low',lang)],
   [L('Sabit kalır','Stays constant',lang),L('Yatay eğilim','Flat trend',lang)],
   [L('Artar','Increases',lang),L('Düşükten yükseğe','From low to high',lang)]
  ],function(i){
  var expected=chosen===1?0:chosen===2?1:2,good=i===expected;
  feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Bu boyut için tekrar düşün. ','Reconsider this dimension. ',lang))+
   L('Parabolik bantta g(E) ∝ (E−Ec)^(d/2−1); taşıyıcı sayısı için doluluk da gerekir.',
     'For a parabolic band g(E) ∝ (E−Ec)^(d/2−1); carrier count also requires occupancy.',lang));
 });
 v.question.textContent=L('Ec’den uzaklaştıkça DOS nasıl değişir?','What happens to DOS moving away from Ec?',lang);
 setDim(2);
}
function gameHoles(target,lang){
 var v=frame(target,lang,L('Holü hedefe götür','Guide the hole',lang),
  L('Oklar elektronun hareket yönünü gösterir. Komşu elektronları doğru yönde kaydırarak turuncu holü yeşil hedefe ulaştır.','Arrows indicate electron motion. Move neighbouring electrons so the orange hole reaches the green target.',lang));
 var hole={x:1,y:1},goal={x:3,y:2},moves=0,finished=false,maxMoves=6;
 var movesGroup=choiceGroup(v.controls,lang,1,'Elektron hareketi','Electron movement',
   'Oklar elektronun boş hücreyi doldurmak üzere hareket ettiği yönü gösterir; hol ters yönde ilerler.',
   'Arrows show how an electron fills the vacancy; the hole moves in the opposite direction.');
 function draw(){
  v.scene.innerHTML='';
  var grid=el('div','physics-game-hole-grid');
  for(var y=0;y<5;y++)for(var x=0;x<5;x++){
   var cell=el('span','physics-game-hole-cell');
   if(x===goal.x&&y===goal.y)cell.classList.add('is-target');
   if(x===hole.x&&y===hole.y)cell.classList.add('is-hole');
   else cell.classList.add('is-electron');
   cell.setAttribute('aria-label',(x===hole.x&&y===hole.y?L('Hol','Hole',lang):L('Elektron','Electron',lang))+' ('+(x+1)+','+(y+1)+')');
   grid.appendChild(cell);
  }
  v.scene.appendChild(grid);
  textRow(v.scene,'physics-game-visual-label',
   L('Adım: ','Moves: ',lang)+moves+'/'+maxMoves+' · '+L('Hedef: yeşil çerçeve','Target: green outline',lang));
 }
 function moveElectron(dx,dy){
  if(finished)return;
  var nx=hole.x-dx,ny=hole.y-dy;
  if(nx<0||nx>=5||ny<0||ny>=5){
   feedback(v.response,false,L('Sınır dışına çıkılamaz.','Cannot cross the boundary.',lang));return;
  }
  var before=Math.abs(hole.x-goal.x)+Math.abs(hole.y-goal.y);
  hole={x:nx,y:ny};moves++;finished=nx===goal.x&&ny===goal.y||moves>=maxMoves;draw();
  var after=Math.abs(hole.x-goal.x)+Math.abs(hole.y-goal.y);
  if(nx===goal.x&&ny===goal.y)feedback(v.response,true,L('Hedefe ulaştın! Elektron hareketinin tersindeki hol yolu tamamlandı.','Target reached! The hole completed the path opposite to electron motion.',lang));
  else if(finished)feedback(v.response,false,L('Hamle sınırına ulaştın. Hedefe yaklaşan daha kısa elektron hareketlerini dene.','Move limit reached. Try shorter electron moves that bring the hole closer.',lang));
  else if(after<before)feedback(v.response,true,L('Hol hedefe bir kare yaklaştı. Elektronun hareketine ters yönde ilerlediğini izle.','The hole moved one cell closer. Notice its direction is opposite to the electron.',lang));
  else feedback(v.response,false,L('Bu hamlede hol hedefinden uzaklaştı. Elektronun yönünü ters seçersen hol hedefe yaklaşır.','This move took the hole farther away. Reverse the electron move to guide the hole closer.',lang));
 }
 setChoices(movesGroup,[
   ['←',L('Elektron sola, hol sağa','Electron left, hole right',lang)],
   ['→',L('Elektron sağa, hol sola','Electron right, hole left',lang)],
   ['↑',L('Elektron yukarı, hol aşağı','Electron up, hole down',lang)],
   ['↓',L('Elektron aşağı, hol yukarı','Electron down, hole up',lang)]
  ],function(i){
  var deltas=[[-1,0],[1,0],[0,-1],[0,1]];moveElectron(deltas[i][0],deltas[i][1]);
 });
 var reset=button(L('Yeniden başla','Restart',lang),function(){
  hole={x:1,y:1};moves=0;finished=false;v.response.innerHTML='';draw();
 },'sim-btn');
 v.root.appendChild(reset);
 v.question.textContent=L('Hol iki hücre sağa, bir hücre aşağı ulaşmalı. Elektronlara hangi yönde hareket ettirirsin?',
  'The hole must move two cells right and one cell down. Which electron moves will achieve this?',lang);
 draw();
}

/* Fermi controls use labelled card groups rather than ungrouped button rows. */
function fermiGroup(controls,heading,hint,extra){
 var field=el('fieldset','physics-fermi-option-group'+(extra?' '+extra:''));
 field.appendChild(el('legend','physics-fermi-option-heading',heading));
 field.appendChild(el('p','physics-fermi-option-hint',hint));
 var items=el('div','physics-fermi-option-grid');
 field.appendChild(items);controls.appendChild(field);return items;
}
function fermiCards(into,items,onPick){
 into.innerHTML='';
 items.forEach(function(item,i){
  var choice=el('button','physics-fermi-card');choice.type='button';
  choice.setAttribute('aria-pressed','false');
  choice.appendChild(el('strong','physics-fermi-card-value',item[0]));
  choice.appendChild(el('span','physics-fermi-card-caption',item[1]));
  choice.addEventListener('click',function(){onPick(i);});
  into.appendChild(choice);
 });
}
function fermiSelection(group,index){
 Array.from(group.children).forEach(function(button,i){button.setAttribute('aria-pressed',String(index===i));});
}
function fermiClearAnswer(group){
 Array.from(group.children).forEach(function(button){
  button.setAttribute('aria-pressed','false');
  button.classList.remove('is-correct-answer');
  button.classList.remove('is-incorrect-answer');
 });
}
function fermiAnswer(group,index,good){
 fermiClearAnswer(group);
 var chosen=group.children[index];
 if(chosen){chosen.setAttribute('aria-pressed','true');chosen.classList.add(good?'is-correct-answer':'is-incorrect-answer');}
}

function gameFermi(target,lang){
 var v=frame(target,lang,L('Fermi olasılık oyunu','Fermi probability game',lang),
  L('Önce enerji ile sıcaklığı belirle, sonra Fermi–Dirac doluluk olasılığını tahmin et.','Set energy and temperature, then predict the Fermi–Dirac occupation probability.',lang));
 v.root.classList.add('physics-fermi-game');
 v.controls.classList.add('physics-fermi-controls');
 var offsets=[-.1,0,.1],offsetIndex=2,T=300,revealed=false;
 var energyBar=fermiGroup(v.controls,L('01 · Enerji konumu','01 · Energy position',lang),
  L('Fermi seviyesine (EF) göre seç','Choose relative to the Fermi level (EF)',lang));
 var tempBar=fermiGroup(v.controls,L('02 · Sıcaklık','02 · Temperature',lang),
  L('Termal etkisini değiştir','Change thermal excitation',lang));
 var predict=fermiGroup(v.controls,L('03 · Doluluk tahmini','03 · Occupancy prediction',lang),
  L('Bu durumun dolu olma olasılığını seç','Pick the chance that this state is occupied',lang),'is-prediction');
 function probability(){return 1/(1+Math.exp(offsets[offsetIndex]/(8.617333262145e-5*T)));}
 function display(){
  v.scene.innerHTML='';
  var p=probability(),percent=(p*100).toFixed(1);
  var card=el('div','physics-fermi-meter');
  card.appendChild(el('span','physics-fermi-meter-overline',L('FERMİ–DİRAC OLASILIĞI','FERMI–DIRAC PROBABILITY',lang)));
  card.appendChild(el('strong','physics-fermi-meter-value',revealed?percent+'%':'?'));
  card.appendChild(el('span','physics-fermi-meter-subtitle',revealed?
   L('Seçilen enerji durumunun doluluk olasılığı','Occupation probability for the selected energy',lang):
   L('Tahmininden sonra kesin değer gösterilecek','The calculated value appears after your prediction',lang)));
  var meter=el('div','physics-fermi-meter-track');
  meter.setAttribute('role','progressbar');
  meter.setAttribute('aria-label',L('Doluluk olasılığı','Occupation probability',lang));
  meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');
  if(revealed)meter.setAttribute('aria-valuenow',percent);
  var fill=el('div','physics-fermi-meter-fill');
  fill.setAttribute('style','width:'+(revealed?percent:0)+'%');
  meter.appendChild(fill);card.appendChild(meter);
  var ticks=el('div','physics-fermi-meter-ticks');
  ['0%','50%','100%'].forEach(function(x){ticks.appendChild(el('span','',x));});
  card.appendChild(ticks);v.scene.appendChild(card);
 }
 function resetPrediction(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';fermiClearAnswer(predict);display();
 }
 fermiCards(energyBar,[
  ['−0.10 eV',L('Fermi altında','Below EF',lang)],
  ['E = EF',L('Fermi düzeyinde','At EF',lang)],
  ['+0.10 eV',L('Fermi üstünde','Above EF',lang)]
 ],function(i){offsetIndex=i;fermiSelection(energyBar,i);resetPrediction();});
 fermiCards(tempBar,[
  ['300 K',L('Oda sıcaklığına yakın','Near room temperature',lang)],
  ['600 K',L('Daha sıcak','Warmer material',lang)]
 ],function(i){T=i===0?300:600;fermiSelection(tempBar,i);resetPrediction();});
 fermiCards(predict,[
  [L('Düşük','Low',lang),L('%25’ten az','Below 25%',lang)],
  [L('Orta','Mid-range',lang),L('Yaklaşık %50','Around 50%',lang)],
  [L('Yüksek','High',lang),L('%75’ten fazla','Above 75%',lang)]
 ],function(i){
  revealed=true;var p=probability(),expected=p<.25?0:p>.75?2:1,good=i===expected;
  fermiAnswer(predict,i,good);display();
  feedback(v.response,good,(good?L('Doğru! ','Correct! ',lang):L('Yeniden değerlendir. ','Try again. ',lang))+
   L('f(E)=1/[1+exp((E−EF)/kBT)] ve E=EF için f=%50.','f(E)=1/[1+exp((E−EF)/kBT)], with 50% occupancy at E=EF.',lang));
 });
 v.question.textContent=L('Seçtiğin enerji ve sıcaklıkta bu durumun doluluk olasılığı kaçtır?',
  'At your selected energy and temperature, how likely is this state to be occupied?',lang);
 fermiSelection(energyBar,offsetIndex);fermiSelection(tempBar,0);display();
}

/* Each pair: correct reasoning, specific misconception, matching Explanation heading. */
var GAME_GUIDANCE={
 crystal:[
  [
   [['Elmas-kübik örgü dört tetrahedral komşuya sahiptir.','Silisyumu basit veya hacim-merkezli kübik saymak komşu geometrisini değiştirir.','Silisyum kristalini düşünelim'],
    ['Diamond-cubic silicon has four tetrahedral neighbours.','Treating Si as simple or body-centred cubic changes its nearest-neighbour geometry.','Consider a silicon crystal']],
   [['Her Si atomu dört en yakın atomla kovalent bağ yapar.','6 veya 8 komşu farklı kristal geometrilerine aittir.','Silisyum kristalini düşünelim'],
    ['Every Si atom bonds to four nearest neighbours.','Six or eight neighbours correspond to different crystal geometries.','Consider a silicon crystal']],
   [['Kübik elmas yapıda komşu uzunluğu d=√3a/4 olur.','Birim hücre kenarını komşu bağ uzunluğuyla eşitlemek yanlıştır.','Silisyum kristalini düşünelim'],
    ['Diamond-cubic geometry gives d=√3a/4.','A unit-cell edge is not a nearest-neighbour bond.','Consider a silicon crystal']]
  ],
  [
   [['Formülde önce seçilen a değerini kullanıp √3/4 ile çarpmalısın.','a/2 veya a seçmek elmas-kübik bağ geometrisini göz ardı eder.','Silisyum kristalini düşünelim'],
    ['Multiply the chosen a by √3/4.','Using a/2 or a ignores diamond-cubic bonding geometry.','Consider a silicon crystal']],
   [['İki boyutlu resim, tetrahedral komşuların uzayda dağıldığını göstermek için sadeleştirilmiştir.','Resimde dört noktayı görmek dört bağın aynı düzlemde olduğu anlamına gelmez.','Silisyum kristalini düşünelim'],
    ['The 2D drawing simplifies the tetrahedral arrangement in space.','Four points on a picture do not mean all four bonds are coplanar.','Consider a silicon crystal']],
   [['Birim hücre tekrar eden en küçük uygun yapı örneğidir; a kübik geometriyi belirtir.','Birim hücre tek atom olmak zorunda değildir ve a doğrudan Si–Si bağı değildir.','Kristal düzeni neden önemli?'],
    ['A unit cell is a repeated structural building block and a defines the cubic geometry.','A unit cell need not be one atom, and a is not the Si–Si bond length.','Why is crystalline order important?']]
  ]
 ],
 'bloch-electron':[
  [[['Hücreler arası faz farkı ka olduğundan k=0, π/(2a), π/a için sırasıyla 0°, 90°, 180° olur.','Fazı ka yerine yalnızca k sayısı veya atomlar arası mesafeden bağımsız okumak doğru değildir.','Bloch dalgasında ne tekrar eder?'],
    ['The phase step ka is 0°, 90°, or 180° at the three selected k values.','The phase difference comes from ka, not k without lattice spacing.','What repeats in a Bloch wave?']]],
  [
   [['Bloch fazı değişse bile eşdeğer hücre konumlarında |ψ|² tekrarlanır.','İşaret veya faz değişimini olasılık yoğunluğunun sıfırlanması sanma.','Bloch dalgasında ne tekrar eder?'],
    ['Bloch phase may change while |ψ|² repeats at equivalent lattice sites.','A phase or sign change does not force probability density to vanish.','What repeats in a Bloch wave?']],
   [['Kristal potansiyeli periyodiktir; Bloch durumu birden çok hücreye yayılabilir.','Tek atomdaki yerel orbital ile kristale yayılmış Bloch durumunu özdeşleştirme.','Tek atomdaki elektron neden farklıdır?'],
    ['Periodic crystals can support Bloch states extending through many cells.','Do not confuse a localized atomic orbital with an extended Bloch state.','Why is an electron in a crystal different?']]
  ]
 ],
 bands:[
  [[['Tek-orbitalli N atomlu zincirde spin hariç N orbital durumu bulunur.','Bir atomun eklenmesini yeni bir izinli durum oluşmayacak sanmak yanlıştır.','Aynı atomik enerjiden çok sayıda enerjiye'],
    ['An N-site single-orbital chain has N orbital states, ignoring spin.','Adding sites increases the allowed orbital-state count.','From atomic levels to many crystal states']]],
  [
   [['İki atom etkileşince bağlayıcı ve karşı-bağlayıcı bileşimlerin enerjileri ayrılır.','İki bağımsız atomunki gibi aynı enerjide kalmaları yalnızca etkileşim yokken geçerlidir.','Aynı atomik enerjiden çok sayıda enerjiye'],
    ['Coupling splits bonding and antibonding energies.','Their degenerate energy persists only without coupling.','From atomic levels to many crystal states']],
   [['Çok atom aynı sınırlı enerji aralığında daha fazla izinli düzey oluşturur.','Düzey sayısı artarken bant genişliğinin sınırsız artması gerekmez.','Bantların genişliğini ne belirler?'],
    ['Many sites produce more allowed levels within a finite energy band.','More sites do not force unlimited bandwidth growth.','What controls the bandwidth?']],
   [['Bu model 1B ve tek orbitallidir; Si gerçek durumda 3B ve çok orbitallidir.','Öğretici zinciri silisyumun gerçek tam bant diyagramıyla eşitleme.','Bantların genişliğini ne belirler?'],
    ['The teaching chain is 1D with one orbital; real Si is 3D and multi-orbital.','This is not a full silicon band-structure calculation.','What controls the bandwidth?']]
  ]
 ],
 edges:[
  [[['Eşik Eg civarını geçen foton yeterli enerjiyi sağlayabilir; gerçek geçişte momentum seçimi de önemlidir.','Eşiğin altındaki foton tek başına bu basit banttan banda geçişe yetmez.','Elektron enerji kazanırsa ne olur?'],
    ['A photon above the gap can supply enough energy, although momentum conditions also matter.','A subgap photon cannot cause this idealized band-to-band transition by itself.','What happens when an electron is excited?']]],
  [
   [['Yasak aralık iki bant kenarı arasındaki farktır: Eg=Ec−Ev.','Ec veya Ev değerini tek başına Eg sanmak ya da toplamını almak yanlıştır.','Bant kenarları: Ev, Ec ve yasak enerji aralığı'],
    ['The gap is a difference, Eg=Ec−Ev.','Neither edge alone, nor their sum, is the band gap.','Band edges Ev and Ec, and the forbidden gap']],
   [['İletim bandı kristalin kendi elektronik durumlarının bir kümesidir.','İletim elektronunu kristalden dışarı atılmış serbest elektronla karıştırma.','Önce temel fikir: “bant” ve “dolu bant” aynı şey mi?'],
    ['Conduction-band states still belong to the solid.','Do not confuse excitation within a crystal with ejecting a free electron outside.','First distinction: an allowed band is not necessarily filled']]
  ]
 ],
 dos:[
  [[['Boyuta göre parabolik banttaki DOS, (E−Ec)^(d/2−1) eğilimi gösterir.','1B’de artan yerine azalan, 2B’de eğimli yerine sabit, 3B’de azalan biçim seçilmez.','Durum yoğunluğu neyi sayar?'],
    ['For a parabolic band, DOS follows (E−Ec)^(d/2−1).','1D decreases, 2D is constant, and 3D increases away from the edge.','What exactly does DOS count?']]],
  [
   [['Belirli enerji aralığındaki beklenen dolu durum sayısı kullanılabilir durum sayısı ile f(E) çarpımıdır.','DOS değerinin tamamını dolu elektron saymak boş durumları yok sayar.','Grafikten hangi hesap yapılır?'],
    ['Expected occupied states equal available states in an energy bin times f(E).','Equating DOS with electrons incorrectly counts empty states as occupied.','What can we calculate from DOS?']]
  ]
 ],
 holes:[
  [[['Komşu elektron boş yere ilerlediğinde hol elektronun ters yönünde yer değiştirir.','Holü tek başına hareket eden bir proton gibi düşünmek taşıyıcı modelini bozar.','Elektron sağa giderse hol neden sola gider?'],
    ['When a neighbour electron fills the vacancy, the hole shifts the opposite way.','A hole is not a physical proton moving independently through the lattice.','Why does a hole move opposite to an electron hop?']]],
  [
   [['Elektrik alan kuvveti yük işaretine bağlıdır: elektron −q, hol etkin +q taşır.','İki taşıyıcının da alan yönünde sürüklendiğini varsaymak negatif elektron yükünü unutur.','Hol neden bir parçacık gibi ele alınır?'],
    ['Drift direction follows charge sign: electron −q, effective hole +q.','Both carriers do not drift with the field because electrons are negative.','Why describe a missing electron as a particle?']],
   [['Hol, değerlik bandındaki eksik elektron doluluğunu temsil eden etkin taşıyıcıdır.','Gerçek proton ile elektriksel olarak pozitif görünen kuaziparçacık aynı değildir.','Hol neden bir parçacık gibi ele alınır?'],
    ['A hole is a missing valence electron represented as an effective carrier.','An effective positive quasiparticle is not an actual proton.','Why describe a missing electron as a particle?']]
  ]
 ],
 fermi:[
  [[['E−EF enerji farkı ve kBT, f(E) değerini belirler; E=EF için sonuç %50’dir.','Enerjinin EF üstünde olması o durumun mutlaka boş, altında olması mutlaka dolu olduğu anlamına gelmez.','Sıcaklık doluluk olasılığını değiştirir'],
    ['E−EF and kBT determine f(E), which is exactly 50% at E=EF.','A state above EF is not necessarily empty and one below is not certainly full at finite T.','Temperature changes occupancy']]],
  [
   [['Yüksek sıcaklık EF çevresindeki doluluk geçişini genişletir; üstteki doluluk artarken alttaki azalır.','Isınmanın tüm enerjilerde doluluğu aynı yönde değiştirdiğini düşünmek yanlıştır.','Sıcaklık doluluk olasılığını değiştirir'],
    ['Higher T broadens occupancy around EF: above-EF occupancy increases, below-EF decreases.','Heating does not move occupancy in the same direction at all energies.','Temperature changes occupancy']]
  ]
 ]
};

/* Follow-up learning games: each asks learners to predict a complementary concept. */
function secondCrystal(target,lang){
 var v=frame(target,lang,L('Birim hücre ve bağ uzunluğu','Unit cell and bond length',lang),
  L('Örgü sabitini seç; uzaklığı hesapla ve 2B çizimin 3B yapıyı nasıl temsil ettiğini sorgula.','Choose a lattice constant, calculate the bond distance, then interpret a 2D diagram of 3D bonding.',lang));
 var values=[5.431,6.000],aIndex=0,round=0,ready=false;
 var setting=choiceGroup(v.controls,lang,1,'Örgü sabitini ayarla','Set lattice constant',
   'Kübik birim hücrenin kenar uzunluğu a.','Edge length a of the cubic unit cell.');
 var picks=choiceGroup(v.controls,lang,2,'Hesap ve yorum','Calculate and interpret',
   'Verilen duruma uygun yanıtı seç.','Choose the answer that fits the situation.');
 var next=button(L('Sonraki aşama','Next stage',lang),function(){round=(round+1)%3;ready=false;draw();},'sim-btn');
 v.root.appendChild(next);
 setChoices(setting,values.map(function(a,i){return ['a = '+a.toFixed(3)+' Å',
   L(i===0?'Si için yaklaşık değer':'Karşılaştırma için örnek değer',
     i===0?'Approximate Si value':'Alternative comparison value',lang)];}),function(i){aIndex=i;ready=false;draw();});
 function diagram(){
  var tile=el('div','physics-game-tetra');
  ['+z','−z','Si','+z','−z'].forEach(function(label,i){
   var dot=el('span','physics-game-tetra-dot '+(i===2?'is-core':'is-neighbour'),label);
   if(i!==2)dot.classList.add('is-depth');
   tile.appendChild(dot);
  });
  v.scene.appendChild(tile);
  textRow(v.scene,'physics-game-visual-label',L(
   'Şematik izdüşüm: 4 komşu 3B uzaydadır; işaretler yaklaşık derinliği anlatır.',
   'Schematic projection: four neighbours are arranged in 3D; labels indicate approximate depth.',lang));
 }
 function draw(){
  clearChoices(picks);
  var a=values[aIndex],d=a*Math.sqrt(3)/4;
  Array.from(setting.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===aIndex));});
  v.scene.innerHTML='';v.response._learning.focus=round;diagram();
  next.hidden=!ready;v.response.innerHTML='';
  if(round===0){
   v.question.textContent=L('a = '+a.toFixed(3)+' Å için en yakın Si–Si bağı yaklaşık kaç Å?','For a = '+a.toFixed(3)+' Å, what is the nearest Si–Si distance?',lang);
   var options=[a/2,d,a];
   setChoices(picks,options.map(function(x,i){return [x.toFixed(2)+' Å',
    ['d = a/2','d = √3a/4','d = a'][i]];}),function(i){
    var ok=i===1;ready=ok;
    feedback(v.response,ok,(ok?L('Doğru. ','Correct. ',lang):L('Bu uzaklık uygun değil. ','Not that distance. ',lang))+
     L('Birim hücre kenarı a, bağ uzunluğu d=√3a/4 ≈ '+d.toFixed(2)+' Å.','Cell edge a differs from d=√3a/4 ≈ '+d.toFixed(2)+' Å.',lang));
    next.hidden=!ok;
   });
  }else if(round===1){
   v.question.textContent=L('Bu 2B çizim dört Si–Si bağının aynı düzlemde olduğunu kanıtlar mı?','Does this 2D diagram prove all four Si–Si bonds lie in one plane?',lang);
   setChoices(picks,[
    [L('Evet, aynı düzlemde','Yes, all coplanar',lang),L('Dört bağ 2B kabul edilir','Treat all bonds as 2D',lang)],
    [L('Hayır, 3B izdüşüm','No, a 3D projection',lang),L('Tetrahedral doğrultular','Tetrahedral directions',lang)]
   ],function(i){
    var ok=i===1;ready=ok;
    feedback(v.response,ok,(ok?L('Doğru. ','Correct. ',lang):L('İzdüşümü tekrar yorumla. ','Revisit the projection. ',lang))+
     L('Si elmas-kübik yapıdadır; dört bağ tetrahedral doğrultulara yönelir.','Diamond-cubic Si has four bonds in tetrahedral directions.',lang));
    next.hidden=!ok;
   });
  }else{
   v.question.textContent=L('Birim hücre ve örgü sabiti tanımlarından hangisi doğrudur?','Which description of unit cell and lattice constant is correct?',lang);
   setChoices(picks,[
    [L('Tekrarlanan birim','Repeating unit',lang),L('a: kübik birim hücre kenarı','a: cubic cell edge',lang)],
    [L('Tek atom varsayımı','Single atom assumption',lang),L('a: doğrudan Si–Si bağı','a: direct Si–Si bond length',lang)]
   ],function(i){
    var ok=i===0;ready=ok;
    feedback(v.response,ok,(ok?L('Doğru. ','Correct. ',lang):L('Tanımları yeniden ayır. ','Separate the definitions. ',lang))+
     L('Birim hücre periyodik yapıyı tekrarlar; örgü sabiti a bir geometrik parametredir ve Si–Si bağına eşit değildir.','A unit cell repeats the lattice; a is a geometric parameter, not the Si–Si bond length.',lang));
    next.hidden=!ok;
   });
  }
 }
 draw();
}
function secondBloch(target,lang){
 var v=frame(target,lang,L('Faz ve yoğunluk ayrımı','Phase versus density',lang),
  L('Aynı Bloch durumundaki komşu hücrelerin fazlarını ve göreli yoğunluklarını karşılaştır.','Compare the phase and relative density in neighbouring cells of one Bloch state.',lang));
 var phaseIndex=1,phases=[0,180],round=0,ready=false;
 var controls=choiceGroup(v.controls,lang,1,'Bloch dalga vektörü','Bloch wave vector',
  'Komşu hücrelerin göreli fazını belirler.','Sets the relative phase across neighbouring cells.');
 var picks=choiceGroup(v.controls,lang,2,'Fiziksel yorumu seç','Choose the interpretation',
  'Faz ve olasılık yoğunluğunu birbirinden ayır.','Distinguish phase from probability density.');
 var next=button(L('Sonraki soru','Next question',lang),function(){round=(round+1)%2;ready=false;draw();},'sim-btn');
 v.root.appendChild(next);
 setChoices(controls,[['k = 0',L('Komşular aynı fazda','Same phase across cells',lang)],
  ['k = π/a',L('Komşular ters fazda','Opposite phase across cells',lang)]],
  function(i){phaseIndex=i;ready=false;draw();});
 function draw(){
  clearChoices(picks);
  v.response._learning.focus=round;
  Array.from(controls.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===phaseIndex));});
  v.scene.innerHTML='';var cells=el('div','physics-game-phase-cells');
  for(var i=0;i<4;i++){
   var cell=el('div','physics-game-phase-cell');
   var arrow=el('span','physics-game-phase-arrow','↑');
   arrow.setAttribute('style','transform:rotate('+(i*phases[phaseIndex])+'deg)');
   cell.appendChild(arrow);cell.appendChild(el('span','',L('Aynı |ψ|²','Equal |ψ|²',lang)));cells.appendChild(cell);
  }
  v.scene.appendChild(cells);
  textRow(v.scene,'physics-game-visual-label',L(
   'Bir Bloch durumunda örgü çevirisi fazı değiştirir; aynı bağıl konumun |ψ|² değeri hücreler arasında aynıdır.',
   'For one Bloch state, lattice translation changes phase but preserves |ψ|² at equivalent positions.',lang));
  v.response.innerHTML='';next.hidden=!ready;
  if(round===0){
   v.question.textContent=L('Komşu hücrelerdeki faz değişimi tek başına hangi sonucu gerektirir?','What does phase advance alone imply between neighbouring cells?',lang);
   setChoices(picks,[
    [L('Faz değişebilir','Phase may change',lang),L('|ψ|² aynı kalabilir','|ψ|² may remain equal',lang)],
    [L('Yoğunluk sıfırlanır','Density vanishes',lang),L('Komşuda |ψ|² sıfır olur','Next-cell |ψ|² becomes zero',lang)]
   ],function(i){
    var good=i===0;ready=good;feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Faz ile yoğunluğu ayır. ','Distinguish phase from density. ',lang))+
     L('Çünkü |e^(ika)|²=1; faz çarpanı olasılık yoğunluğunu değiştirmez.','Because |e^(ika)|²=1, the phase factor alone does not change probability density.',lang));next.hidden=!good;
   });
  }else{
   v.question.textContent=L('Bloch durumu tek bir atomun çevresine hapsolmuş bir orbital midir?','Is a Bloch state an orbital confined to just one atom?',lang);
   setChoices(picks,[
    [L('Tek atomla sınırlı','Localized to one atom',lang),L('Yalnızca atomik orbital','Atomic orbital only',lang)],
    [L('Kristale yayılabilir','Extends through the crystal',lang),L('Periyodik Bloch durumu','Periodic Bloch state',lang)]
   ],function(i){
    var good=i===1;ready=good;feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Kristal periyodunu düşün. ','Consider crystal periodicity. ',lang))+
     L('Bloch durumu periyodik örgü boyunca uzanabilir; yerel atomik orbitalden farklıdır.','A Bloch state may extend through a periodic lattice, unlike a localized atomic orbital.',lang));next.hidden=!good;
   });
  }
 }
 draw();
}
function secondBands(target,lang){
 var v=frame(target,lang,L('Etkileşimden bantlara','Interactions to bands',lang),
  L('Önce iki atomun düzey ayrışmasını, sonra çok atomlu zinciri yorumla.','First inspect two-atom splitting, then interpret a longer chain.',lang));
 var round=0,ready=false;
 var picks=choiceGroup(v.controls,lang,1,'Enerji düzeyi yorumun','Interpret the energy levels',
  'Grafiği incele ve modelin ne anlattığını seç.','Inspect the graph and choose what the model shows.');
 var next=button(L('Sonraki aşama','Next stage',lang),function(){round=(round+1)%3;ready=false;draw();},'sim-btn');
 v.root.appendChild(next);
 function draw(){
  clearChoices(picks);
  v.response._learning.focus=round;
  v.scene.innerHTML='';v.response.innerHTML='';next.hidden=!ready;
  var ladder=el('div','physics-game-double-ladders');
  var ns=round===0?[2,2]:[2,8];
  ns.forEach(function(n,index){
   var panel=el('div','physics-game-ladder-panel');
   panel.appendChild(el('strong','',round===0?(index===0?L('Etkileşim yok','No coupling',lang):L('Etkileşim var','Coupling',lang)):n+' '+L('atom','atoms',lang)));
   var track=el('div','physics-game-energy-ladder');
   for(var j=1;j<=n;j++){
    var e=round===0&&index===0?0:-2*Math.cos(j*Math.PI/(n+1));
    var line=el('span','physics-game-energy-level');
    line.setAttribute('style','bottom:'+(50+e*21)+'%');track.appendChild(line);
   }
   panel.appendChild(track);ladder.appendChild(panel);
  });v.scene.appendChild(ladder);
  if(round===0){
   v.question.textContent=L('İki özdeş atom etkileşmeye başlayınca enerji düzeylerine ne olur?','When two identical atoms interact, what happens to their energy levels?',lang);
   setChoices(picks,[
   [L('İki düzeye ayrışır','Splits into two levels',lang),L('Bağlayıcı ve karşı-bağlayıcı','Bonding and antibonding',lang)],
   [L('Tek düzey kalır','Stays one level',lang),L('Enerji ayrışması yok','No energy splitting',lang)]
  ],function(i){
    evaluate(i===0,L('Etkileşim, bağlanan ve karşı-bağlanan bileşimleri farklı enerjilere ayırır.','Coupling splits bonding and antibonding combinations in energy.',lang));
   });
  }else if(round===1){
   v.question.textContent=L('Aynı enerji aralığında 2 yerine 8 atomun düzeyi olursa ne değişir?','If eight instead of two levels occupy a comparable energy range, what changes?',lang);
   setChoices(picks,[
   [L('Düzeyler sıklaşır','Levels become denser',lang),L('Aynı aralıkta daha çok düzey','More levels in a similar range',lang)],
   [L('Düzey sayısı azalır','Fewer levels',lang),L('Enerji düzeyleri seyrekleşir','Levels spread apart',lang)]
  ],function(i){
    evaluate(i===0,L('N atomlu basit zincir N orbital durumu verir; çok atomda düzeyler bant gibi sıklaşır.','A simple N-site chain yields N orbital states, crowding into a band for large N.',lang));
   });
  }else{
   v.question.textContent=L('Bu tek-orbitalli 1B zincir Si’nin tam gerçek bant yapısı mıdır?','Is this 1D single-orbital chain silicon’s complete band structure?',lang);
   setChoices(picks,[
   [L('Evet, tam model','Yes, complete model',lang),L('Si için gerçekçi tüm orbitaller','All realistic Si orbitals',lang)],
   [L('Hayır, sade model','No, simplified model',lang),L('1B zincir, tek orbital','1D chain, one orbital',lang)]
  ],function(i){
    evaluate(i===1,L('Gerçek Si çok orbitalli, 3B kristal bantları gerektirir.','Real silicon needs a three-dimensional, multi-orbital band description.',lang));
   });
  }
 }
 function evaluate(good,msg){
  ready=good;feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Tekrar değerlendir. ','Reconsider. ',lang))+msg);next.hidden=!good;
 }
 draw();
}
function secondEdges(target,lang){
 var v=frame(target,lang,L('Bant kenarı hesaplayıcısı','Band-edge calculator',lang),
  L('Ev ve Ec konumlarını değiştirerek yasak aralığı hesapla; sonra iletim elektronunun nerede olduğunu düşün.','Change Ev and Ec to compute the gap, then reason about where the conduction electron remains.',lang));
 var settings=[[0,1.1],[0.4,1.7]],selection=0,round=0,ready=false;
 var config=choiceGroup(v.controls,lang,1,'Bant kenarı senaryosu','Band-edge scenario',
  'Ev ve Ec değerlerini değiştir.','Adjust the valence and conduction edges.');
 var picks=choiceGroup(v.controls,lang,2,'Hesaplama ve yorum','Calculation and interpretation',
  'Enerji farkını veya elektronun bulunduğu yeri seç.','Choose the gap or locate the excited electron.');
 var next=button(L('Sonraki aşama','Next stage',lang),function(){round=(round+1)%2;ready=false;draw();},'sim-btn');
 v.root.appendChild(next);
 setChoices(config,settings.map(function(x,i){return [
   L('Senaryo ','Scenario ',lang)+(i+1),
   'Ev = '+x[0].toFixed(1)+' eV · Ec = '+x[1].toFixed(1)+' eV'];}),function(i){selection=i;ready=false;draw();});
 function draw(){
  clearChoices(picks);
  Array.from(config.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===selection));});
  var a=settings[selection],gap=a[1]-a[0];v.response._learning.focus=round;
  v.scene.innerHTML='';
  var band=el('div','physics-game-bands');
  band.appendChild(el('div','physics-game-band is-conduction','Ec = '+a[1].toFixed(1)+' eV'));
  band.appendChild(el('div','physics-game-gap','Eg = Ec − Ev = ?'));
  band.appendChild(el('div','physics-game-band is-valence','Ev = '+a[0].toFixed(1)+' eV'));
  v.scene.appendChild(band);
  v.response.innerHTML='';next.hidden=!ready;
  if(round===0){
   v.question.textContent=L('Bu iki bant kenarı arasındaki yasak bant aralığı kaç eV?','What is the gap between these band edges?',lang);
   setChoices(picks,['0.7 eV','1.1 eV','1.3 eV','1.7 eV'].map(function(x){return [
     x,L('Önerilen Eg değeri','Candidate Eg value',lang)];}),function(i){
    var opts=[.7,1.1,1.3,1.7],good=Math.abs(opts[i]-gap)<.001;ready=good;
    feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Çıkarma yapmayı dene. ','Subtract the edges. ',lang))+
     'Eg = '+a[1].toFixed(1)+' − '+a[0].toFixed(1)+' = '+gap.toFixed(1)+' eV.');next.hidden=!good;
   });
  }else{
   v.question.textContent=L('Bir elektron Ec üzerinde izinli duruma uyarıldığında katıyı terk etmiş midir?','Does an electron leave the solid when excited into an allowed state above Ec?',lang);
   setChoices(picks,[
    [L('Kristali terk eder','Leaves the crystal',lang),L('Katı dışındaki serbest elektron','Free electron outside the solid',lang)],
    [L('Kristalde kalır','Remains in the crystal',lang),L('İletim bandında izinli durum','Allowed conduction-band state',lang)]
   ],function(i){
    var good=i===1;ready=good;
    feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('İletim bandının tanımını düşün. ','Recall what the conduction band means. ',lang))+
     L('İletim bandı kristalin izinli enerji durumlarından oluşur; iyonlaşmayla aynı şey değildir.','The conduction band consists of allowed crystal states; excitation is not necessarily ionization.',lang));next.hidden=!good;
   });
  }
 }
 draw();
}

function secondDos(target,lang){
 var v=frame(target,lang,L('Durum mu, dolu elektron mu?','Available states or occupied electrons?',lang),
  L('Dar bir enerji aralığındaki durum sayısını ve doluluk olasılığını seç; beklenen dolu durum sayısını bul.','Choose the available states and occupancy in a narrow energy bin; calculate the expected occupied count.',lang));
 var totals=[10,20],probs=[.2,.8],ni=0,pi=0,revealed=false;
 var nBar=choiceGroup(v.controls,lang,1,'Kullanılabilir durumlar','Available states',
  'Dar enerji aralığında g(E)ΔE ile temsil edilen durum sayısı.','Number of states g(E)ΔE in a narrow energy bin.');
 var fBar=choiceGroup(v.controls,lang,2,'Doluluk olasılığı','Occupancy probability',
  'Bir durumun dolu bulunma olasılığı f(E).','Chance f(E) of finding a state occupied.');
 var choices=choiceGroup(v.controls,lang,3,'Beklenen dolu durum sayısı','Expected occupied count',
  'Sadece mevcut durumları değil, doluluğu da hesaba kat.','Combine the available states with their occupancy.');
 setChoices(nBar,totals.map(function(n){return ['g(E)ΔE = '+n,
   L(n+' kullanılabilir durum',n+' available states',lang)];}),function(i){ni=i;revealed=false;draw();});
 setChoices(fBar,probs.map(function(p){return ['f(E) = '+(p*100)+'%',
   L('Her durum için ortalama doluluk','Average occupancy per state',lang)];}),function(i){pi=i;revealed=false;draw();});
 function draw(){
  clearChoices(choices);
  Array.from(nBar.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===ni));});
  Array.from(fBar.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===pi));});
  var total=totals[ni],occupied=Math.round(total*probs[pi]);
  v.scene.innerHTML='';var dots=el('div','physics-game-fermi-dots');
  for(var i=0;i<total;i++){
   var dot=el('span','physics-game-fermi-dot');
   if(revealed&&i<occupied)dot.classList.add('is-filled');
   dots.appendChild(dot);
  }
  v.scene.appendChild(dots);
  textRow(v.scene,'physics-game-visual-label',L(
   'Mavi kutular yalnızca tahminden sonra görünen beklenen doluluğu temsil eder.',
   'Blue cells show the expected occupancy only after a prediction.',lang));
  v.question.textContent=L('Bu enerji diliminde beklenen dolu durum sayısı kaçtır?','How many occupied states are expected in this energy bin?',lang);
  v.response.innerHTML='';
  var choicesNum=[Math.round(total*.2),Math.round(total*.5),Math.round(total*.8)];
  setChoices(choices,choicesNum.map(function(n){return [n+' '+L('durum','states',lang),
    L('Dolu durum sayısı tahmini','Predicted occupied count',lang)];}),function(i){
   revealed=true;var good=choicesNum[i]===occupied;
   var expected=total+' × '+probs[pi].toFixed(1)+' = '+occupied;
   drawResult(good,L('Beklenen dolu sayı = g(E)ΔE × f(E) = '+expected+'. DOS, elektron sayısını tek başına vermez.',
    'Expected occupied count = g(E)ΔE × f(E) = '+expected+'. DOS alone does not count occupied electrons.',lang));
  });
 }
 function drawResult(good,msg){
  var total=totals[ni],occupied=Math.round(total*probs[pi]);
  v.scene.innerHTML='';var dots=el('div','physics-game-fermi-dots');
  for(var i=0;i<total;i++){var dot=el('span','physics-game-fermi-dot');if(i<occupied)dot.classList.add('is-filled');dots.appendChild(dot);}
  v.scene.appendChild(dots);
  textRow(v.scene,'physics-game-visual-label',L('Mavi: beklenen dolu / açık: kullanılabilir ama boş','Blue: expected occupied / pale: available but empty',lang));
  feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Bu sayı değil. ','Not this count. ',lang))+msg);
 }
 draw();
}
function secondHoles(target,lang){
 var v=frame(target,lang,L('Elektrik alan yön oyunu','Electric-field direction game',lang),
  L('Elektrik alanın yönünü seç; elektron ve holün sürüklenme yönlerini ayırt et.','Choose the electric-field direction and compare electron versus hole drift.',lang));
 var direction=1,round=0,ready=false;
 var fields=choiceGroup(v.controls,lang,1,'Elektrik alan yönü','Electric-field direction',
  'E vektörünün yatay yönünü belirle.','Set the horizontal direction of E.');
 var picks=choiceGroup(v.controls,lang,2,'Taşıyıcı hareketi','Carrier movement',
  'Elektron ve holün etkin sürüklenmesini karşılaştır.','Compare effective electron and hole drift.');
 var next=button(L('Sonraki aşama','Next stage',lang),function(){round=(round+1)%2;ready=false;draw();},'sim-btn');
 v.root.appendChild(next);
 setChoices(fields,[
  ['E ←',L('Alan sola','Field points left',lang)],
  ['E →',L('Alan sağa','Field points right',lang)]
 ],function(i){direction=i;ready=false;draw();});
 function draw(){
  clearChoices(picks);
  v.response._learning.focus=round;
  Array.from(fields.children).forEach(function(b,i){b.setAttribute('aria-pressed',String(i===direction));});
  v.scene.innerHTML='';
  var fieldArrow=direction===1?'→':'←',electron=direction===1?'←':'→',hole=fieldArrow;
  var track=el('div','physics-game-drift-track');
  track.appendChild(el('div','',L('Elektrik alan E: ','Electric field E: ',lang)+fieldArrow));
  track.appendChild(el('div','physics-game-drift-electron',L('Elektron (−q): ','Electron (−q): ',lang)+(ready?electron:'?')));
  track.appendChild(el('div','physics-game-drift-hole',L('Hol (+q): ','Hole (+q): ',lang)+(ready?hole:'?')));
  v.scene.appendChild(track);
  v.response.innerHTML='';next.hidden=!ready;
  if(round===0){
   v.question.textContent=L('Alan '+fieldArrow+' yönündeyken hangi sürüklenme çifti doğrudur?','For a field '+fieldArrow+', which drift pair is correct?',lang);
   var choices=[
    [L('Elektron ← · Hol →','Electron ← · Hole →',lang),L('Ters yönlerde sürüklenme','Opposite drift directions',lang)],
    [L('Elektron → · Hol ←','Electron → · Hole ←',lang),L('Ters yönlerde sürüklenme','Opposite drift directions',lang)],
    [L('İkisi de E yönünde','Both follow E',lang),L('Aynı yönde sürüklenme','Same drift direction',lang)]
   ];
   var ok=direction===1?0:1;
   setChoices(picks,choices,function(i){
    ready=i===ok;
    feedback(v.response,ready,(ready?L('Doğru. ','Correct. ',lang):L('Yük işaretlerini incele. ','Check charge signs. ',lang))+
     L('Negatif elektron alanın tersine, pozitif etkin yüklü hol alan yönüne sürüklenir.','Negative electrons drift opposite the field; effective positive holes drift with it.',lang));
    next.hidden=!ready;drawTrack();
   });
  }else{
   v.question.textContent=L('Holü bu modelde proton gibi ayrı bir pozitif parçacık saymak doğru mudur?','Should a hole be treated as a separate positive elementary particle such as a proton?',lang);
   setChoices(picks,[
    [L('Gerçek pozitif parçacık','A real positive particle',lang),L('Proton gibi ayrı yük','Independent charge like a proton',lang)],
    [L('Eksik elektron durumu','A missing electron state',lang),L('Değerlik bandındaki boşluk','Vacancy in the valence band',lang)]
   ],function(i){
    ready=i===1;
    feedback(v.response,ready,(ready?L('Doğru. ','Correct. ',lang):L('Holün tanımına dön. ','Recall the hole definition. ',lang))+
     L('Hol bir eksik doluluk durumudur; +q yük ve sürüklenme yönü etkin taşıyıcı tanımıdır.','A hole is a missing occupied state; +q and drift direction are effective carrier properties.',lang));
    next.hidden=!ready;drawTrack();
   });
  }
 }
 function drawTrack(){
  var fieldArrow=direction===1?'→':'←',electron=direction===1?'←':'→';
  v.scene.innerHTML='';
  var track=el('div','physics-game-drift-track');
  track.appendChild(el('div','',L('Alan E: ','Field E: ',lang)+fieldArrow));
  track.appendChild(el('div','physics-game-drift-electron',L('Elektron (−q): ','Electron (−q): ',lang)+(ready?electron:'?')));
  track.appendChild(el('div','physics-game-drift-hole',L('Hol (+q): ','Hole (+q): ',lang)+(ready?fieldArrow:'?')));
  v.scene.appendChild(track);
 }
 draw();
}

function secondFermi(target,lang){
 var v=frame(target,lang,L('Sıcaklık etkisi karşılaştırması','Temperature broadening challenge',lang),
  L('Enerjiyi EF’ye göre seç; sıcaklık 300 K’den 600 K’ye çıkınca olasılığın nasıl değişeceğini tahmin et.','Choose energy relative to EF; predict what changes when temperature rises from 300 K to 600 K.',lang));
 v.root.classList.add('physics-fermi-game');
 v.controls.classList.add('physics-fermi-controls');v.controls.classList.add('is-comparison');
 var offsets=[-.10,0,.10],selected=2,revealed=false;
 var choices=fermiGroup(v.controls,L('01 · Enerji konumu','01 · Energy position',lang),
  L('Karşılaştırılacak enerji durumunu seç','Select the state to compare',lang));
 var predict=fermiGroup(v.controls,L('02 · Sıcaklığın etkisi','02 · Thermal effect',lang),
  L('300 K → 600 K olduğunda ne olur?','What happens from 300 K to 600 K?',lang),'is-prediction');
 function probability(delta,T){return 1/(1+Math.exp(delta/(8.617333262145e-5*T)));}
 function draw(){
  v.scene.innerHTML='';
  [300,600].forEach(function(t){
   var p=probability(offsets[selected],t),row=el('div','physics-game-prob-row');
   row.appendChild(el('span','',t+' K'));
   var track=el('span','physics-game-prob-track'),bar=el('span','physics-game-prob-bar');
   bar.setAttribute('style','width:'+(revealed?(p*100).toFixed(1):0)+'%');
   track.appendChild(bar);row.appendChild(track);
   row.appendChild(el('span','',revealed?(100*p).toFixed(1)+'%':'?'));
   v.scene.appendChild(row);
  });
  textRow(v.scene,'physics-game-visual-label',L('f(E)=1/[1+exp((E−EF)/kBT)] · EF’de %50 sabit.',
   'f(E)=1/[1+exp((E−EF)/kBT)] · 50% exactly at EF.',lang));
 }
 fermiCards(choices,[
  ['−0.10 eV',L('Fermi altında','Below EF',lang)],
  ['E = EF',L('Fermi düzeyinde','At EF',lang)],
  ['+0.10 eV',L('Fermi üstünde','Above EF',lang)]
 ],function(i){selected=i;fermiSelection(choices,i);revealed=false;fermiClearAnswer(predict);v.response.innerHTML='';v.response.className='physics-game-feedback';draw();});
 fermiCards(predict,[
  [L('Artar','Increases',lang),L('Doluluk yükselir','More likely occupied',lang)],
  [L('Değişmez','No change',lang),L('Aynı olasılık','Same probability',lang)],
  [L('Azalır','Decreases',lang),L('Doluluk düşer','Less likely occupied',lang)]
 ],function(i){
  revealed=true;var expected=selected===0?2:selected===1?1:0,good=i===expected;
  var before=(100*probability(offsets[selected],300)).toFixed(1)+'%';
  var after=(100*probability(offsets[selected],600)).toFixed(1)+'%';
  fermiAnswer(predict,i,good);draw();
  feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Sıcaklık etkisini tekrar incele. ','Revisit thermal broadening. ',lang))+
   L('300 K: '+before+'; 600 K: '+after+'. Isınma, Fermi çevresindeki geçişi %50 etrafında genişletir.',
     '300 K: '+before+'; 600 K: '+after+'. Warming broadens the transition around 50%.',lang));
 });
 v.question.textContent=L('Sıcaklık yükseldiğinde seçtiğin durumun doluluk olasılığı nasıl değişir?',
  'As temperature increases, how does the selected state’s occupancy change?',lang);
 fermiSelection(choices,selected);draw();
}

var GAMES={
 'crystal':gameCrystal,'bloch-electron':gameBloch,'bands':gameBands,
 'edges':gameEdges,'dos':gameDos,'holes':gameHoles,'fermi':gameFermi
};
var SECOND_GAMES={
 crystal:secondCrystal,'bloch-electron':secondBloch,bands:secondBands,
 edges:secondEdges,dos:secondDos,holes:secondHoles,fermi:secondFermi
};
/* Indices refer to the four measurable objectives per topic, starting at 1. */
var GAME_COVERAGE={
 crystal:[[1,2,3],[1,3,4]],
 'bloch-electron':[[2,4],[1,3]],
 bands:[[2,3],[1,3,4]],
 edges:[[1,3],[1,2,4]],
 dos:[[2,3],[1,4]],
 holes:[[2,4],[1,3]],
 fermi:[[1,2,3],[1,4]]
};
function mount(views,lang){
 KEYS.forEach(function(key){
  if(!views[key]||!views[key].anlatim||!views[key].oyun)return;
  addOutcomes(views[key].anlatim,lang,key);
  var pane=views[key].oyun;
  var switcher=el('div','physics-game-switch');
  switcher.setAttribute('role','tablist');
  switcher.setAttribute('aria-label',L('Oyun seçimi','Game selection',lang));
  var screens=[el('div','physics-game-instance'),el('div','physics-game-instance')];
  screens.forEach(function(screen,index){
   screen.dataset.gameKey=key;screen.dataset.gamePart=String(index+1);
   screen.setAttribute('id','physics-'+key+'-game-'+(index+1));
   pane.appendChild(screen);
  });
  var buttons=[1,2].map(function(n,i){
   var b=button(L('Oyun ','Game ',lang)+n,function(){show(i);},'physics-game-switch-button');
   b.setAttribute('role','tab');
   b.setAttribute('aria-controls',screens[i].attributes.id);
   switcher.appendChild(b);return b;
  });
  pane.insertBefore(switcher,screens[0]);
  GAMES[key](screens[0],lang);
  SECOND_GAMES[key](screens[1],lang);
  screens.forEach(function(screen,i){
   screen.firstChild.appendChild(el('p','physics-game-covered',
    L('Bu oyunun hedeflediği kazanımlar: ','Learning objectives in this game: ',lang)+GAME_COVERAGE[key][i].join(', ')));
  });
  function show(active){
   screens.forEach(function(screen,i){screen.hidden=i!==active;screen.setAttribute('role','tabpanel');});
   buttons.forEach(function(b,i){b.setAttribute('aria-selected',String(i===active));b.setAttribute('tabindex',i===active?'0':'-1');});
  }
  show(0);
 });
}
window.PhysicsLearningGames={mount:mount,topicIds:KEYS.slice(),outcomes:OUTCOMES,coverage:GAME_COVERAGE};
})();
