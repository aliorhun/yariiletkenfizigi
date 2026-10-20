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
function setChoices(into,items,onPick){
 into.innerHTML='';
 items.forEach(function(item,i){into.appendChild(button(item,function(){onPick(i);}));});
}
function feedback(elm,good,text){
 elm.textContent=text;elm.className='physics-game-feedback '+(good?'is-correct':'is-incorrect');
 elm.setAttribute('role','status');
}
function frame(target,lang,title,help){
 var root=el('section','physics-learning-game');
 root.appendChild(el('h3','',title));
 textRow(root,'physics-game-help',help);
 var scene=el('div','physics-game-scene'),question=el('p','physics-game-question');
 var controls=el('div','physics-game-choices'),response=el('p','physics-game-feedback');
 response.setAttribute('role','status');
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
 var round=0,next=button(L('Sonraki ipucu','Next clue',lang),function(){round=(round+1)%rounds.length;draw();},'sim-btn');
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
  var row=rounds[round];v.question.textContent=L(row.q[0],row.q[1],lang);
  next.hidden=true;v.response.textContent='';grid(round===0?0:2);
  setChoices(v.controls,row.opts.map(function(a){return L(a[0],a[1],lang);}),function(i){
   grid(round===0?i:2);
   feedback(v.response,i===row.ok,(i===row.ok?L('Doğru! ','Correct! ',lang):L('Tekrar düşün. ','Try again. ',lang))+L(row.why[0],row.why[1],lang));
   next.hidden=i!==row.ok;
  });
 }
 draw();
}
function gameBloch(target,lang){
 var v=frame(target,lang,L('Bloch fazı laboratuvarı','Bloch phase lab',lang),
  L('Dalga vektörünü seç; komşu örgü hücresinin faz farkını tahmin et. Δφ = ka.','Select the wave vector and predict the phase shift between neighbouring cells: Δφ = ka.',lang));
 var kOptions=['k = 0','k = π/(2a)','k = π/a'],phases=[0,90,180],chosen=1;
 var kBar=el('div','physics-game-options'),predict=el('div','physics-game-options');
 v.controls.appendChild(kBar);v.controls.appendChild(predict);
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
 function pickK(i){chosen=i;v.response.textContent='';v.question.textContent=L('Komşu hücrelerin faz farkı kaç derece?','What is the phase difference between adjacent cells?',lang);draw(false);
  Array.from(kBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===chosen));});
 }
 setChoices(kBar,kOptions,pickK);
 setChoices(predict,['0°','90°','180°'],function(i){
  var good=phases[chosen]===phases[i];
  feedback(v.response,good,(good?L('Doğru. ','Correct. ',lang):L('Henüz değil. ','Not quite. ',lang))+
   L('Bloch fazı komşu hücrede ka kadar değişir; |ψ|² faza bağlı değildir.','Bloch phase advances by ka; |ψ|² is independent of this phase.',lang));
  draw(true);
 });
 pickK(1);
}
function gameBands(target,lang){
 var v=frame(target,lang,L('Atomdan banda','From atoms to bands',lang),
  L('Hedefteki izinli düzey sayısını üretmek için zincirde kaç atom olması gerektiğini seç.','Choose the number of atoms needed to produce the target number of allowed orbital levels.',lang));
 var targets=[2,4,8],round=0;
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
  next.hidden=true;v.response.textContent='';v.question.textContent=L('Hedef: '+targets[round]+' farklı orbital enerji düzeyi oluştur.','Target: create '+targets[round]+' distinct orbital energy levels.',lang);
  ladder(2);
 }
 setChoices(v.controls,['2 '+L('atom','atoms',lang),'4 '+L('atom','atoms',lang),'8 '+L('atom','atoms',lang)],function(i){
  var n=targets[i];ladder(n);var good=n===targets[round];
  feedback(v.response,good,(good?L('Başardın! ','Well done! ',lang):L('Bu sayı hedefe uymuyor. ','Not the target count. ',lang))+
   L('Bu basit zincirde spin hariç N atom, N orbital düzeyi verir.','In this simple spinless chain, N sites give N orbital levels.',lang));
  next.hidden=!good;
 });
 draw();
}
function gameEdges(target,lang){
 var v=frame(target,lang,L('Bant aralığı kapısı','Band-gap gate',lang),
  L('Foton enerjisini seç ve elektronun iletim bandına uyarılıp uyarılamayacağını tahmin et (örnek Eg≈1,1 eV).','Choose the photon energy and predict whether it can excite an electron into the conduction band (illustrative Eg≈1.1 eV).',lang));
 var energies=[0.6,1.0,1.2,1.8],chosen=2,revealed=false;
 var energyBar=el('div','physics-game-options'),predict=el('div','physics-game-options');
 v.controls.appendChild(energyBar);v.controls.appendChild(predict);
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
 function pickEnergy(i){chosen=i;revealed=false;v.response.textContent='';render();
  Array.from(energyBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 setChoices(energyBar,energies.map(function(e){return e.toFixed(1)+' eV';}),pickEnergy);
 setChoices(predict,[L('Uyarılır','Excitation possible',lang),L('Uyarılamaz','No excitation',lang)],function(i){
  revealed=true;var can=energies[chosen]>=1.1,good=(i===0)===can;
  render();
  feedback(v.response,good,(good?L('Doğru! ','Correct! ',lang):L('Tekrar dene. ','Try again. ',lang))+
   (can?L('Enerji eşiğin üstünde; enerji bakımından geçiş mümkündür.','Energy exceeds the gap; excitation is energetically possible.',lang):
        L('Bu fotonun enerjisi örnek bant aralığından küçüktür.','This photon energy lies below the example band gap.',lang)));
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
 var chosen=2,dimensions=[1,2,3],dimensionBar=el('div','physics-game-options'),predict=el('div','physics-game-options');
 v.controls.appendChild(dimensionBar);v.controls.appendChild(predict);
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
 function setDim(i){chosen=dimensions[i];v.response.textContent='';plot();
  Array.from(dimensionBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 setChoices(dimensionBar,['1B · 1D','2B · 2D','3B · 3D'],setDim);
 setChoices(predict,[L('Azalır','Decreases',lang),L('Sabit kalır','Stays constant',lang),L('Artar','Increases',lang)],function(i){
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
  hole={x:nx,y:ny};moves++;finished=nx===goal.x&&ny===goal.y||moves>=maxMoves;draw();
  if(nx===goal.x&&ny===goal.y)feedback(v.response,true,L('Hedefe ulaştın! Hol, elektron hareketinin tersine yer değiştirdi.','Target reached! The hole moved opposite to electron motion.',lang));
  else if(finished)feedback(v.response,false,L('Hamleler bitti; sıfırlayıp farklı bir yol dene.','Out of moves; reset and try another route.',lang));
  else feedback(v.response,true,L('Elektron ve hol ters yönlerde yer değiştirdi.','Electron and hole moved in opposite directions.',lang));
 }
 setChoices(v.controls,[L('Elektron ←','Electron ←',lang),L('Elektron →','Electron →',lang),L('Elektron ↑','Electron ↑',lang),L('Elektron ↓','Electron ↓',lang)],function(i){
  var deltas=[[-1,0],[1,0],[0,-1],[0,1]];moveElectron(deltas[i][0],deltas[i][1]);
 });
 var reset=button(L('Yeniden başla','Restart',lang),function(){
  hole={x:1,y:1};moves=0;finished=false;v.response.textContent='';draw();
 },'sim-btn');
 v.root.appendChild(reset);
 v.question.textContent=L('Hol iki hücre sağa, bir hücre aşağı ulaşmalı. Elektronlara hangi yönde hareket ettirirsin?',
  'The hole must move two cells right and one cell down. Which electron moves will achieve this?',lang);
 draw();
}
function gameFermi(target,lang){
 var v=frame(target,lang,L('Fermi olasılık oyunu','Fermi probability game',lang),
  L('Enerji farkı ve sıcaklığı seç; mevcut bir durumun doluluk olasılığını tahmin et.','Choose energy difference and temperature; predict occupancy of an available state.',lang));
 var offsets=[-0.1,0,0.1],offsetIndex=2,T=300,revealed=false;
 var energyBar=el('div','physics-game-options'),tempBar=el('div','physics-game-options'),predict=el('div','physics-game-options');
 v.controls.appendChild(energyBar);v.controls.appendChild(tempBar);v.controls.appendChild(predict);
 function probability(){return 1/(1+Math.exp(offsets[offsetIndex]/(8.617333262145e-5*T)));}
 function display(){
  v.scene.innerHTML='';
  var dots=el('div','physics-game-fermi-dots'),count=revealed?Math.round(probability()*20):0;
  for(var i=0;i<20;i++){
   var dot=el('span','physics-game-fermi-dot');
   if(i<count)dot.classList.add('is-filled');
   dots.appendChild(dot);
  }
  v.scene.appendChild(dots);
  textRow(v.scene,'physics-game-visual-label',revealed?
   L('Hesaplanan doluluk: ','Calculated occupancy: ',lang)+(100*probability()).toFixed(1)+'%':
   L('Tahminini seç; 20 kutu doluluk yüzdesini gösterecek.','Make a prediction; 20 cells will show the occupancy percentage.',lang));
 }
 function pickEnergy(i){offsetIndex=i;revealed=false;v.response.textContent='';display();
  Array.from(energyBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 function pickTemperature(i){T=i===0?300:600;revealed=false;v.response.textContent='';display();
  Array.from(tempBar.children).forEach(function(b,n){b.setAttribute('aria-pressed',String(n===i));});
 }
 setChoices(energyBar,['E−EF = −0.10 eV','E = EF','E−EF = +0.10 eV'],pickEnergy);
 setChoices(tempBar,['T = 300 K','T = 600 K'],pickTemperature);
 setChoices(predict,[L('%25’ten az','Below 25%',lang),L('Yaklaşık %50','About 50%',lang),L('%75’ten fazla','Above 75%',lang)],function(i){
  revealed=true;var p=probability(),expected=p<.25?0:p>.75?2:1,good=i===expected;
  display();feedback(v.response,good,(good?L('Doğru! ','Correct! ',lang):L('Yeniden değerlendir. ','Try again. ',lang))+
   L('f(E)=1/[1+exp((E−EF)/kBT)] ve E=EF için f=%50.','f(E)=1/[1+exp((E−EF)/kBT)], with 50% occupancy at E=EF.',lang));
 });
 v.question.textContent=L('Bu enerji durumunun dolu olma olasılığı hangi aralıkta?','Which range contains the occupation probability?',lang);
 pickEnergy(2);pickTemperature(0);
}
var GAMES={
 'crystal':gameCrystal,'bloch-electron':gameBloch,'bands':gameBands,
 'edges':gameEdges,'dos':gameDos,'holes':gameHoles,'fermi':gameFermi
};
function mount(views,lang){
 KEYS.forEach(function(key){
  if(!views[key]||!views[key].anlatim||!views[key].oyun)return;
  addOutcomes(views[key].anlatim,lang,key);
  GAMES[key](views[key].oyun,lang);
 });
}
window.PhysicsLearningGames={mount:mount,topicIds:KEYS.slice(),outcomes:OUTCOMES};
})();
