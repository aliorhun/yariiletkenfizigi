/* Choice-driven learning labs and measurable objectives for all ten physics topics. */
(function(){
'use strict';
var KEYS=['crystal','bloch-electron','bands','edges','dos','holes','fermi','equilibrium','doping','transport'];
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
 ],
 equilibrium:[
  ['Isıl denge ile dış uyarım altında kararlı hâlin farklı kavramlar olduğunu açıklar.','Distinguish thermal equilibrium from a driven steady state.'],
  ['Dejenere olmayan ısıl dengede np=ni² bağıntısını kullanarak azınlık taşıyıcı yoğunluğunu hesaplar.','Compute the minority-carrier density from np=ni² in nondegenerate thermal equilibrium.'],
  ['Yük nötrlüğü bağıntısında hareketli ve iyonlaşmış sabit yükleri karşılaştırır.','Relate mobile charges to fixed ionized dopants in charge neutrality.'],
  ['Sürekli üretimin np=ni² durumunu bozabileceğini ve kuazi-Fermi kavramına yol açtığını açıklar.','Explain how continuous generation can violate np=ni² and require quasi-Fermi levels.']
 ],
 doping:[
  ['Has silisyumda dengede n=p=ni olduğunu, n/p tipinde çoğunluk taşıyıcısını ayırt eder.','Identify n=p=ni in intrinsic Si and the majority carrier in n/p-type material.'],
  ['P donör, B akseptör katkısının iyonlaşmış sabit yükünü ve elektriksel nötrlüğü açıklar.','Describe ionized P donors, B acceptors, and electrical neutrality.'],
  ['Toplam katkı N_D/N_A ile nötr N_D⁰/N_A⁰ ve iyonlaşmış N_D⁺/N_A⁻ yoğunluklarını ayırır.','Distinguish total N_D/N_A, neutral N_D⁰/N_A⁰ and ionized N_D⁺/N_A⁻ dopant concentrations.'],
  ['N_D⁺ ve N_A⁻ formüllerindeki Fermi seviyesi, üstel işareti ve dejenerasyon katsayılarını açıklar.','Interpret the Fermi level, exponent signs and degeneracy factors in N_D⁺ and N_A⁻ formulas.'],
  ['Tam iyonlaşma varsayımında çoğunluk ve azınlık yoğunluklarını np=ni² ile ilişkilendirir.','Relate majority/minority concentrations using np=ni² under complete ionization.'],
  ['Donma, katkı baskın ve öz taşıyıcı baskın sıcaklık rejimlerini tanır; n≈ND sınırını bilir.','Recognize freeze-out, extrinsic, and intrinsic regimes and limits of n≈ND.'],
  ['Si:P donörünün zayıf bağlanmasını dielektrik ekranlama, etkin kütle ve hidrojenik model üzerinden açıklar.','Explain weak binding of an Si:P donor through dielectric screening, effective mass and the hydrogenic model.']
 ],
 transport:[
  ['Elektron ve hol sürüklenmesini E alanına göre ayırır; elektron hızını konvansiyonel akımdan ayırır.','Predict electron/hole drift relative to E and distinguish electron velocity from conventional current.'],
  ['Elektron difüzyonunun yoğunluğu yüksek bölgeden düşük bölgeye yöneldiğini öngörür.','Predict electron diffusion from high to low concentration.'],
  ['Sürüklenme–difüzyon katkılarını ve dejenere olmayan durumda D/μ=kBT/q bağıntısını açıklar.','Explain drift/diffusion contributions and D/μ=kBT/q in the nondegenerate limit.'],
  ['Saçılma, üretim ve yeniden birleşmenin hareketlilik veya taşıyıcı sayısına etkisini ayırt eder.','Differentiate scattering, generation, and recombination effects on mobility or carrier count.']
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
 ],
 equilibrium:[
  [
   [['Isıl dengede np=ni² olduğundan p=ni²/n; seçilen n için bu çarpımı koruyan azınlık yoğunluğunu buluruz.','p=n, ni veya dopant sayısına otomatik eşit değildir; denge için çarpım önemlidir.','Elektron ve hol birlikte nasıl belirlenir?'],
    ['At equilibrium np=ni², so p=ni²/n for the chosen electron density.','The minority density is not automatically equal to n, ni, or the dopant count.','How are electrons and holes related?']],
   [['N_A=0 iken nötrlük n=p+N_D⁺, yani N_D⁺=n−p koşulunu gerektirir.','İyonlaşmış donörü n+p olarak saymak elektron ve hol yüklerinin işaretini karıştırır.','Elektron ve hol birlikte nasıl belirlenir?'],
    ['With N_A=0, charge neutrality requires n=p+N_D⁺ or N_D⁺=n−p.','Adding n and p confuses the signs of their mobile charges.','How are electrons and holes related?']]
  ],
  [
   [['Dış üretim yoksa ısıl dengede üretim ve birleşme dengelenir; sürekli aydınlatma kararlı ama denge dışı olabilir.','Zamanla sabit olmayı tek başına ısıl denge ile özdeşleştiremeyiz.','Denge ve kararlı durum farklıdır'],
    ['Without external driving, thermal equilibrium balances generation and recombination; illumination can create a nonequilibrium steady state.','A constant reading alone does not prove thermal equilibrium.','Equilibrium differs from a steady state']],
   [['Örnek ışıklı durumda iki taşıyıcı da artar ve np>ni² olabilir; elektron ve hol kuazi-Fermi seviyeleri ayrılabilir.','np=ni² bağıntısı sürülen denge dışı durumlara koşulsuz uygulanmaz.','Denge dışına çıkınca ne değişir?'],
    ['Both carriers can increase under illumination, giving np>ni² and distinct electron/hole quasi-Fermi levels.','The equilibrium mass-action law does not generally hold in a driven steady state.','What changes out of equilibrium?']]
  ]
 ],
 doping:[
  [
   [['Has Si için n=p=ni; donör elektronları, akseptör ise holleri çoğunluk taşıyıcı yapabilir.','Katkı türüyle hareketli taşıyıcının yükünü karıştırmak n/p tipini ters yorumlatır.','Katkılama ile n ve p tipi nasıl oluşur?'],
    ['Intrinsic Si has n=p=ni; donors favour electrons and acceptors favour holes.','Confusing dopant type with mobile-carrier charge reverses n/p-type behaviour.','How do n-type and p-type materials arise?']],
   [['İyonlaşmış donör sabit +, iyonlaşmış akseptör sabit − iyon bırakır; hareketli yükler bunları dengeler.','n tipi numunenin toplamda eksi yüklü olduğunu sanmak yük nötrlüğünü atlar.','Katkılama ile n ve p tipi nasıl oluşur?'],
    ['An ionized donor is a fixed positive ion; an ionized acceptor is fixed negative; mobile carriers balance them.','N-type does not mean the whole sample is negatively charged.','How do n-type and p-type materials arise?']],
   [['İyonlaşmış yoğunluk toplam katkı yoğunluğu çarpı iyonlaşma oranıdır; kalan katkılar nötrdür.','Katkı atomlarının hepsini iyonlaşmış saymak düşük sıcaklıktaki eksik iyonlaşmayı gözden kaçırır.','Toplam katkı, iyonlaşmış katkı ve hareketli taşıyıcı aynı şey değildir'],
    ['Ionized concentration is total dopant concentration times its ionized fraction; the remaining dopants are neutral.','Counting all dopants as ionized ignores incomplete ionization at low temperature.','Total dopants, ionized dopants and mobile carriers are different quantities']],
   [['P donörü elektronunu bırakınca D⁺; B akseptörü değerlik elektronu alınca A⁻ olur.','Donör ile akseptörün atom yüklerini veya hareketli taşıyıcıların işaretini eşitlemek yanlıştır.','Elektronu takip edelim: nötr ve iyonlaşmış P/B'],
    ['A P donor becomes D⁺ after releasing an electron; a B acceptor becomes A⁻ after accepting a valence electron.','Confusing donor/acceptor charge states also confuses their mobile carriers.','Follow the electron: neutral and ionized phosphorus or boron']],
   [['Si’nin büyük dielektrik sabiti çekimi ekranlar; etkin kütle ile hidrojenik model sığ P donör düzeyini açıklar.','1,12 eV bant aralığını 0,045 eV donör bağlanma enerjisiyle veya kristalde yayılmış elektron bulutunu klasik yörüngeyle karıştırmak yanlıştır.','Silisyum içinde hidrojen benzeri donör: beşinci elektron neden zayıf bağlı?'],
    ['Silicon dielectric screening and effective mass give a shallow phosphorus donor level in the hydrogenic picture.','Confusing the 1.12 eV band gap with 0.045 eV donor binding or the diffuse cloud with an electron orbit is incorrect.','Hydrogen-like donor inside silicon: why the fifth electron is weakly bound']]
  ],
  [
   [['Tam iyonlaşma ve az kompanzasyonda çoğunluk yaklaşık 10¹⁵ cm⁻³ ise ni=10¹⁰ için azınlık 10⁵ cm⁻³ olur.','Azınlığı ni veya katkı yoğunluğuna eşitlemek np=ni² bağıntısını ihlal eder.','Neden katkı sayısı her zaman taşıyıcı sayısı değildir?'],
    ['With full ionization and weak compensation, majority 10¹⁵ cm⁻³ and ni=10¹⁰ imply minority 10⁵ cm⁻³.','Setting minority density equal to ni or dopants violates np=ni².','Why aren\'t all dopants always free carriers?']],
   [['Düşük T donma, orta T katkı baskın, yüksek T ise termal öz taşıyıcılar baskın olabilir.','n≈ND her sıcaklıkta geçerli değildir; iyonlaşma ve öz üretim sıcaklıkla değişir.','Neden katkı sayısı her zaman taşıyıcı sayısı değildir?'],
    ['Low T may show freeze-out, moderate T extrinsic dominance, and high T intrinsic dominance.','n≈ND is not universal across temperatures because ionization and intrinsic generation change.','Why aren\'t all dopants always free carriers?']],
   [['Donör için N_D⁺/N_D=1/[1+2exp((E_F−E_D)/kBT)]; E_F yükseldikçe dolu nötr durumun payı büyür.','E_F−E_D üsteli yerine E_D−E_F koymak N_D⁺ ile N_D⁰ olasılıklarını karıştırır.','Üsteldeki işareti dikkatle okuyalım'],
    ['For donors N_D⁺/N_D=1/[1+2exp((E_F−E_D)/kBT)]; raising E_F favours occupied neutral donors.','Reversing E_F−E_D confuses the ionized D⁺ fraction with the neutral D⁰ fraction.','Read the exponent and its sign carefully']],
   [['Donörde g_D=2 ve akseptörde g_A=4 katsayılarıyla üsteller zıt yöndedir; bunlar yük durumlarının istatistiksel çokluklarını sayar.','Fermi seviyesinde katkı iyonlaşma payını her zaman yüzde 50 almak veya g katsayısını yok saymak yanlıştır.','E_F=E_D veya E_F=E_A ise neden yüzde 50 değil?'],
    ['Donor g_D=2 and acceptor g_A=4 give oppositely signed exponents; the factors count charge-state multiplicities.','Assuming 50% ionization at every matching energy or dropping degeneracy factors is incorrect.','What happens at exactly E_F=E_D or E_F=E_A?']]
  ]
 ],
 transport:[
  [
   [['Negatif elektron E alanının tersine, etkin pozitif hol E ile aynı yönde sürüklenir; elektronun konvansiyonel akımı hızına terstir.','Elektron hızını konvansiyonel akımla karıştırmak alan yönünü yanlış buldurur.','Sürüklenme ve difüzyonun ayrımı'],
    ['Electrons drift opposite E; holes follow E. Conventional electron current opposes electron drift velocity.','Equating electron velocity with conventional current reverses the direction.','Drift versus diffusion']],
   [['Difüzyon taşıyıcıları yüksek yoğunluktan düşük yoğunluğa taşır; elektron parçacık akışını akım işaretiyle ayırırız.','Yoğunluk gradyanı kaynaklı difüzyonu mutlaka elektrik alanın yönünde sanmak yanlıştır.','Sürüklenme ve difüzyonun ayrımı'],
    ['Diffusion moves particles from high to low concentration; electron particle flux and conventional current have opposite signs.','Diffusion need not follow any imposed electric field.','Drift versus diffusion']]
  ],
  [
   [['Daha kuvvetli saçılma hareketliliği ve düşük alan sürüklenme hızını azaltma eğilimindedir.','Saçılma olaylarının sıklaşması taşıyıcıların hız kazanmasını kolaylaştırmaz.','Saçılma ve rekombinasyon neden önemli?'],
    ['Stronger scattering tends to reduce mobility and low-field drift speed.','More scattering events do not help carriers accelerate between collisions.','Why do scattering and recombination matter?']],
   [['Üretim çift sayısını artırırken yeniden birleşme elektron–hol çiftlerini ortadan kaldırır.','Rekombinasyonu yeni serbest taşıyıcı kaynağı sanmak üretim ile birleşmeyi karıştırır.','Saçılma ve rekombinasyon neden önemli?'],
    ['Generation creates pairs; recombination removes electron–hole pairs.','Treating recombination as a free-carrier source reverses its physical meaning.','Why do scattering and recombination matter?']],
   [['Dejenere olmayan dengede D/μ=kBT/q; 300 K için yaklaşık 0,026 V, 600 K için yaklaşık 0,052 V olur.','D/μ oranı sabit bir boyutsuz sayı değildir; birimi V ve sıcaklığa bağımlıdır.','Sürüklenme ve difüzyonun ayrımı'],
    ['For nondegenerate equilibrium D/μ=kBT/q, about 0.026 V at 300 K and 0.052 V at 600 K.','The ratio has voltage units and depends on temperature.','Drift versus diffusion']]
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

/* Topics 8–10 use the same explanatory card system as the first seven lessons. */
function learningMeter(parent,title,value,percent,kind){
 var row=el('div','physics-game-metric-row'+(kind?' '+kind:''));
 row.appendChild(el('strong','physics-game-metric-title',title));
 var track=el('span','physics-game-metric-track'),fill=el('span','physics-game-metric-fill');
 fill.setAttribute('style','width:'+Math.max(0,Math.min(100,percent))+'%');
 track.appendChild(fill);row.appendChild(track);
 row.appendChild(el('span','physics-game-metric-value',value));
 parent.appendChild(row);
}
function equilibriumGame(target,lang){
 var v=frame(target,lang,L('Denge hesap laboratuvarı','Equilibrium calculation lab',lang),
  L('Önce kütle etkisinden azınlık holünü bul; sonra aynı örneğin yük nötrlüğünü değerlendir. Model: dejenere olmayan ısıl denge, ni=10¹⁰ cm⁻³.','Find the minority holes from mass action, then apply charge neutrality. Model: nondegenerate thermal equilibrium, ni=10¹⁰ cm⁻³.',lang));
 var nValues=[1e11,1e12],pValues=[1e9,1e8],selected=0,round=0,revealed=false;
 var params=choiceGroup(v.controls,lang,1,'Elektron yoğunluğu','Electron concentration',
   'n değerini seç. ni sabittir.','Select n while ni stays fixed.');
 var answers=choiceGroup(v.controls,lang,2,'Hesap sonucunu seç','Choose the result',
   'Önce n·p çarpımını, sonra yük işaretlerini düşün.','First consider n·p, then the charge signs.');
 var next=button(L('Sonraki aşama','Next stage',lang),function(){round=(round+1)%2;draw();},'sim-btn');
 v.root.appendChild(next);
 function visual(){
  v.scene.innerHTML='';
  v.scene.appendChild(el('strong','physics-game-metric-headline',L('Isıl dengedeki taşıyıcılar','Carriers at equilibrium',lang)));
  var n=nValues[selected],p=pValues[selected];
  learningMeter(v.scene,'n',n.toExponential(0)+' cm⁻³',35+20*selected,'is-electron');
  learningMeter(v.scene,'p',revealed?p.toExponential(0)+' cm⁻³':'?',revealed?18-6*selected:0,'is-hole');
  learningMeter(v.scene,'ni','1×10¹⁰ cm⁻³',28,'is-reference');
  textRow(v.scene,'physics-game-visual-label',L('Çubuklar şematiktir, sayılar kesin örnek değerlerdir.','Bars are schematic; the displayed numerical values define the example.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';
  v.response._learning.focus=round;next.hidden=true;clearChoices(answers);
  fermiSelection(params,selected);
  if(round===0){
   v.question.textContent=L('np=ni² koşuluyla p kaç cm⁻³ olur?','Using np=ni², what is p in cm⁻³?',lang);
   setChoices(answers,[1e8,1e9,1e10].map(function(x){return [x.toExponential(0)+' cm⁻³',
     L('Azınlık hol yoğunluğu adayı','Candidate minority-hole density',lang)];}),function(i){
    var p=pValues[selected],good=[1e8,1e9,1e10][i]===p;revealed=true;visual();
    feedback(v.response,good,L('p=ni²/n = 10²⁰ / '+nValues[selected].toExponential(0)+' = '+p.toExponential(0)+' cm⁻³.',
     'p=ni²/n = 10²⁰ / '+nValues[selected].toExponential(0)+' = '+p.toExponential(0)+' cm⁻³.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L('Akseptör yoksa, nötrlük için iyonlaşmış donör yoğunluğu N_D⁺ hangi bağıntıyı sağlar?',
     'Without acceptors, which relation must the ionized donor density N_D⁺ satisfy?',lang);
   setChoices(answers,[
    ['N_D⁺ = n + p',L('Yükleri toplamak','Add both carrier densities',lang)],
    ['N_D⁺ = n − p',L('Elektron ve hol farkı','Electron–hole difference',lang)],
    ['N_D⁺ = p − n',L('Ters yük farkı','Reversed charge difference',lang)]
   ],function(i){
    var good=i===1;revealed=true;visual();
    feedback(v.response,good,L('n = p + N_D⁺; dolayısıyla N_D⁺ = n − p.','n = p + N_D⁺; therefore N_D⁺ = n − p.',lang));
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 setChoices(params,nValues.map(function(n){return [n.toExponential(0)+' cm⁻³',
  L(n===1e11?'Daha az elektron':'Daha çok elektron',n===1e11?'Lower electron density':'Higher electron density',lang)];}),function(i){selected=i;draw();});
 draw();
}
function equilibriumSecondGame(target,lang){
 var v=frame(target,lang,L('Karanlık mı, sürekli ışık mı?','Darkness or continuous light?',lang),
  L('Sadeleştirilmiş iki senaryoda taşıyıcıların zamanla sabit olmasının ısıl dengeyle aynı olup olmadığını araştır.','Compare two simplified scenarios: time-independent carrier concentrations do not necessarily mean thermal equilibrium.',lang));
 var scenario=0,round=0,revealed=false;
 var params=choiceGroup(v.controls,lang,1,'Fiziksel ortam','Physical conditions',
  'Dışarıdan sürekli taşıyıcı üretimi var mı?','Is there continuous external carrier generation?');
 var answers=choiceGroup(v.controls,lang,2,'Denge yorumu','Equilibrium assessment',
  'Seçilen durumu fiziksel olarak yorumla.','Interpret the chosen physical situation.');
 var next=button(L('Sonraki sorgu','Next question',lang),function(){round=(round+1)%2;draw();},'sim-btn');v.root.appendChild(next);
 function visual(){
  v.scene.innerHTML='';
  v.scene.appendChild(el('strong','physics-game-metric-headline',scenario===0?
    L('Karanlık · dış uyarım yok','Dark · no external drive',lang):
    L('Sürekli ışık · örnek kararlı durum','Continuous light · illustrative steady state',lang)));
  var ratio=scenario===0?1:3;
  learningMeter(v.scene,'n',ratio+' × ni',ratio*24,'is-electron');
  learningMeter(v.scene,'p',ratio+' × ni',ratio*24,'is-hole');
  learningMeter(v.scene,'np / ni²',revealed?ratio*ratio+'':'?',revealed?ratio*ratio*10:0,'is-reference');
  textRow(v.scene,'physics-game-visual-label',L('Örnek: ışık altında n ve p, dengeye göre üçer kat artmış ve zamanla sabit.','Example: under light, n and p are each three times the dark equilibrium values and constant in time.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';v.response._learning.focus=round;
  clearChoices(answers);fermiSelection(params,scenario);next.hidden=true;
  if(round===0){
   v.question.textContent=L('Bu kararlı durum ısıl denge midir?','Is this steady state thermal equilibrium?',lang);
   setChoices(answers,[
    [L('Isıl denge','Thermal equilibrium',lang),L('Dışarıdan sürülmeyen durum','No sustained external drive',lang)],
    [L('Kararlı, denge dışı','Steady, not equilibrium',lang),L('Sürekli taşıyıcı üretimi olabilir','May require continuous carrier generation',lang)]
   ],function(i){var good=i===scenario;revealed=true;visual();
    feedback(v.response,good,scenario===0?
     L('Karanlık ve dış sürme yok varsayımında malzeme ısıl dengede olabilir.','With no external drive in the dark, the material can be at thermal equilibrium.',lang):
     L('Işıkla sürekli üretilen çiftler zamanla sabit kalsa bile malzeme ısıl dengede değildir.','Continuously generated pairs can be time-independent without thermal equilibrium.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L('Bu örnekte np ile ni² nasıl karşılaştırılır?','How does np compare with ni² in this example?',lang);
   setChoices(answers,[
    ['np = ni²',L('Denge kütle etkisi','Equilibrium mass-action relation',lang)],
    ['np > ni²',L('Fazla elektron–hol çiftleri','Excess electron–hole pairs',lang)]
   ],function(i){var good=i===scenario;revealed=true;visual();
    feedback(v.response,good,scenario===0?
     L('n=p=ni olduğunda np=ni²; tek Fermi seviyesi kullanılır.','When n=p=ni, np=ni² and a single equilibrium Fermi level applies.',lang):
     L('n=p=3ni olduğunda np=9ni²; kuazi-Fermi seviyeleri gerekli olabilir.','When n=p=3ni, np=9ni²; separate quasi-Fermi levels may be needed.',lang));
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 setChoices(params,[
  [L('Karanlık','Dark',lang),L('Sürekli dış üretim yok','No continuous external generation',lang)],
  [L('Sürekli ışık','Continuous light',lang),L('Ek elektron–hol çiftleri üretilir','Additional electron–hole pairs generated',lang)]
 ],function(i){scenario=i;draw();});
 draw();
}

function dopingGame(target,lang){
 var v=frame(target,lang,L('Katkı atomu dedektifi','Dopant detective',lang),
  L('Üstten görülen 2B şemada has Si, fosfor donörü ve bor akseptörünü karşılaştır. Bu görünüm gerçek 3B elmas-kübik yapının sadeleştirmesidir.','Compare intrinsic Si, phosphorus donors and boron acceptors in a schematic 2D top view, not a literal 3D bond structure.',lang));
 var selected=0,round=0,revealed=false;
 var params=choiceGroup(v.controls,lang,1,'Kristal örneği','Silicon specimen',
  'Ortadaki atomun katkı türünü seç.','Select the dopant at the centre.');
 var answers=choiceGroup(v.controls,lang,2,'Taşıyıcı ve iyon yorumu','Carrier and ion interpretation',
  'Hareketli yükleri sabit iyonlardan ayır.','Separate mobile carriers from fixed ions.');
 var next=button(L('Sonraki inceleme','Next investigation',lang),function(){round=(round+1)%5;draw();},'sim-btn');v.root.appendChild(next);
 function visual(){
  v.scene.innerHTML='';
  var grid=el('div','physics-game-dopant-lattice');
  for(var i=0;i<20;i++){
   var center=i===9,symbol=center?['Si','P','B'][selected]:'Si';
   var cell=el('span','physics-game-dopant-site'+(center?' is-centre':'')+(center&&selected===1?' is-donor':center&&selected===2?' is-acceptor':''));
   cell.appendChild(el('strong','',symbol));
   if(center&&revealed&&selected!==0)cell.appendChild(el('small','',selected===1?'+':'−'));
   grid.appendChild(cell);
  }
  v.scene.appendChild(grid);
  var pair=selected===0?L('Has · n = p = ni','Intrinsic · n = p = ni',lang):
           selected===1?L('P donör · elektron çoğunluk','P donor · electrons majority',lang):
           L('B akseptör · hol çoğunluk','B acceptor · holes majority',lang);
  textRow(v.scene,'physics-game-visual-label',revealed?pair:L('Taşıyıcı türünü tahmin et; sonra sonucu gör.','Predict the carrier type, then reveal it.',lang));
  if(round===4){
   textRow(v.scene,'physics-game-metric-headline',selected===0?
    L('Katkısız Si: sığ P/B seviyesi yok','Undoped Si: no shallow P/B state',lang):
    selected===1?'Si:P · εᵣ≈11.7 · Eᵢₒₙ≈0.045 eV':
    'Si:B · εᵣ≈11.7 · Eᵢₒₙ≈0.046 eV');
   textRow(v.scene,'physics-game-visual-label',L(
    'Bant aralığı ≈1,12 eV; sığ katkı iyonlaşması yalnızca ≈0,045 eV. Enerji ölçeklerini ayır.',
    'Band gap ≈1.12 eV; shallow dopant ionization ≈0.045 eV. Distinguish these scales.',lang));
  }
  textRow(v.scene,'physics-game-footnote',L('Katkı iyonunun işareti, onun saldığı/aldığı hareketli taşıyıcının işaretinden farklıdır.','The fixed dopant-ion sign differs from the mobile carrier it donates or accepts.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';v.response._learning.focus=round;
  clearChoices(answers);fermiSelection(params,selected);next.hidden=true;
  if(round===0){
   v.question.textContent=L('Bu örneğin denge durumunda çoğunluk taşıyıcısı hangisidir?','Which carriers dominate in this specimen at equilibrium?',lang);
   setChoices(answers,[
    ['n = p = ni',L('Has yarıiletken','Intrinsic semiconductor',lang)],
    [L('Elektronlar','Electrons',lang),L('n tipi çoğunluk taşıyıcısı','N-type majority carriers',lang)],
    [L('Holler','Holes',lang),L('p tipi çoğunluk taşıyıcısı','P-type majority carriers',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,selected===0?
     L('Kasıtlı katkı yoksa has Si için ısıl dengede n=p=ni.','Without intentional dopants, intrinsic Si has n=p=ni at equilibrium.',lang):
     selected===1?L('Fosfor donörü elektronu iletim bandına sağlayabilir; n tipi davranış oluşur.','Phosphorus donors can supply conduction electrons and yield n-type behaviour.',lang):
     L('Bor akseptörü değerlikte eksik elektron durumu yaratabilir; p tipi holler çoğunluktadır.','Boron acceptors create valence-electron vacancies, giving p-type hole majority.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===1){
   v.question.textContent=L('Uygun şekilde iyonlaştığında ortadaki katkı atomunun sabit iyon yükü nedir?','After ionization, what fixed ionic charge remains on the central dopant?',lang);
   setChoices(answers,[
    [L('Sabit iyon yok','No dopant ion',lang),L('Has silisyumda katkı bulunmaz','No intentional dopant in intrinsic silicon',lang)],
    ['P⁺',L('Elektronunu vermiş donör','Donor after releasing an electron',lang)],
    ['B⁻',L('Elektron kabul etmiş akseptör','Acceptor after taking an electron',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,selected===0?
     L('Has örnekte katkı atomu ve buna bağlı sabit iyon yoktur.','The intrinsic example contains no dopant or associated fixed dopant ion.',lang):
     selected===1?L('Donör elektron verince P⁺ sabit iyonu kalır; hareketli elektron yüküyle nötrlük sağlanır.','After donating an electron, P⁺ remains fixed and charge neutrality is preserved.',lang):
     L('Akseptör elektron alınca B⁻ sabit iyonu oluşur; hareketli hol ile yük dengelenir.','After accepting an electron, fixed B⁻ is balanced by mobile holes.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===2){
   v.question.textContent=selected===0?
    L('Has silisyumda N_D=N_A=0. İyonlaşmış katkı yoğunluğu nedir?','In intrinsic silicon N_D=N_A=0. What is the ionized dopant concentration?',lang):
    L('10¹⁶ cm⁻³ katkının %40’ının iyonlaştığını varsayalım. N_D⁺ veya N_A⁻ kaçtır?',
     'Assume 40% of 10¹⁶ cm⁻³ dopants ionize. What is N_D⁺ or N_A⁻?',lang);
   setChoices(answers,[
    ['0',L('Katkısız örnekte iyon merkezi yok','No dopant ions in intrinsic sample',lang)],
    ['4 × 10¹⁵ cm⁻³',L('Toplamın %40’ı N_D⁺ veya N_A⁻','40% of total N_D⁺ or N_A⁻',lang)],
    ['10¹⁶ cm⁻³',L('Toplam yoğunluk N_D veya N_A','Total N_D or N_A concentration',lang)]
   ],function(i){var good=i===(selected===0?0:1);revealed=true;visual();
    feedback(v.response,good,selected===0?
     L('Has örnekte N_D=N_A=0 ve iyonlaşmış katkı bulunmaz.','With no dopants, N_D=N_A=0 and no dopant ions exist.',lang):
     L('İyonlaşmış pay = 0,40 × 10¹⁶ = 4 × 10¹⁵ cm⁻³. Kalan 6 × 10¹⁵ cm⁻³ atom nötrdür; N_D ile N_D⁺ veya N_A ile N_A⁻ birbirine eşit olmak zorunda değildir.',
      'Ionized = 0.40 × 10¹⁶ = 4 × 10¹⁵ cm⁻³. The remaining 6 × 10¹⁵ cm⁻³ centres are neutral; N_D need not equal N_D⁺, or N_A equal N_A⁻.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===3){
   v.question.textContent=L('Ortadaki atomun nötr ve iyonlaşmış yük durumları hangi tepkimeyle ilişkilidir?',
    'Which reaction correctly describes the central atom’s neutral and ionized charge states?',lang);
   setChoices(answers,[
    ['Si',L('Has Si: donör/akseptör katkısı yok','Intrinsic Si: no donor or acceptor',lang)],
    ['D⁰ ⇌ D⁺ + e⁻',L('Si:P elektronunu iletim bandına bırakır','Si:P releases a conduction electron',lang)],
    ['A⁰ + e⁻ ⇌ A⁻ + h⁺',L('Si:B değerlik elektronu kabul eder, hol bırakır','Si:B takes a valence electron and leaves a hole',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,selected===0?
     L('Katkı yoksa N_D ve N_A sıfırdır; kristalde yalnızca ısıl elektron–hol çiftleri bulunabilir.','Without dopants N_D and N_A are zero; thermal electron–hole pairs may still exist.',lang):
     selected===1?
     L('P⁰ seviyesi elektronla doludur. Elektronunu iletime bırakınca sabit P⁺ oluşur ve N_D⁺ sayısı artar.','P⁰ has a bound electron; release to conduction leaves fixed P⁺ and raises N_D⁺.',lang):
     L('B⁰ değerlik elektronu kabul edince B⁻ olarak iyonlaşır ve hareketli hol bırakır. N_A⁻ sayısı artar.','When B⁰ accepts a valence electron it becomes B⁻ and leaves a mobile hole; N_A⁻ rises.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L(
    'Bu Si örneğinde sığ donör/akseptör seviyesinin varlığını ve küçük iyonlaşma enerjisini hangi açıklama doğru yorumlar?',
    'Which explanation correctly describes shallow impurity levels and their small ionization energy in this Si sample?',lang);
   setChoices(answers,[
    [L('Katkısız Si’de sığ donör/akseptör seviyesi bulunmaz','No shallow dopant state in undoped Si',lang),
      L('N_D=N_A=0 olan has numune','Intrinsic specimen with N_D=N_A=0',lang)],
    [L('Si ekranlaması ve etkin kütle katkı bağını zayıflatır','Si screening and effective mass weaken dopant binding',lang),
      L('P için Eᵢₒₙ≈0,045 eV; B için benzer sığ seviye','P has Eᵢₒₙ≈0.045 eV; B is also shallow',lang)],
    [L('İyonlaşma için mutlaka tüm 1,12 eV bant aralığı gerekir','Ionization always needs the full 1.12 eV gap',lang),
      L('Sığ katkı ile banttan banda uyarımı karıştırır','Confuses shallow dopants with band-to-band excitation',lang)]
   ],function(i){var good=i===(selected===0?0:1);revealed=true;visual();
    feedback(v.response,good,selected===0?
     L('Has Si’de kasıtlı P/B katkısı olmadığından E_D/E_A sığ katkı seviyeleri yoktur. Isıl elektron–hol üretimi yine olabilir.',
       'Without P/B dopants intrinsic Si has no associated shallow E_D/E_A levels, although thermal pairs still exist.',lang):
     selected===1?
     L('P’nin bağlı elektronu Si tarafından ekranlanır ve kristalde etkin kütle taşır. Sığ bağlanma yaklaşık 0,045 eV’dir; Si bant aralığı olan 1,12 eV değildir.',
       'The P electron sees dielectric screening and an effective mass. Shallow binding is around 0.045 eV, not the full 1.12 eV band gap.',lang):
     L('B akseptörü de sığ bir seviye oluşturur. Si ekranlaması ve hol bant yapısı bağlanma ölçeğini belirler; hol, B⁻ iyon merkezinden ayrı hareketli taşıyıcıdır.',
       'B is also a shallow acceptor. Screening and the valence-hole band structure set its binding scale; the hole is mobile while B⁻ is fixed.',lang));
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 setChoices(params,[
  ['Si',L('Has kristal · katkısız','Intrinsic · undoped',lang)],
  ['P',L('Fosfor · donör','Phosphorus · donor',lang)],
  ['B',L('Bor · akseptör','Boron · acceptor',lang)]
 ],function(i){selected=i;draw();});
 draw();
}
function dopingSecondGame(target,lang){
 var v=frame(target,lang,L('Azınlık taşıyıcısı ve sıcaklık rejimleri','Minority carriers and temperature regimes',lang),
  L('Azınlık yoğunluğu, sıcaklık rejimleri, iyonlaşma payı ve N_D⁺/N_A⁻ denklemlerini adım adım çalış.','Work through minority concentration, temperature regimes, ionization fractions and the N_D⁺/N_A⁻ equations.',lang));
 var round=0,selected=0,revealed=false;
 var options=choiceGroup(v.controls,lang,1,'Deney koşulu','Experiment conditions',
  'Sıcaklık rejimi, Fermi konumu veya katkı türünü seç.','Choose a temperature regime, Fermi position or dopant type.');
 var answers=choiceGroup(v.controls,lang,2,'Sonucu tahmin et','Predict the result',
  'Seçilen koşula göre fiziksel sonucu belirle.','Choose the physical consequence of the selected conditions.');
 var next=button(L('Sonraki deney','Next experiment',lang),function(){round=(round+1)%4;selected=0;draw();},'sim-btn');v.root.appendChild(next);
 function setParameterCards(){
  var cases=round===0?[
    [L('n tipi · donör','N-type · donor',lang),L('n ≈ ND = 10¹⁵ cm⁻³','n ≈ ND = 10¹⁵ cm⁻³',lang)],
    [L('p tipi · akseptör','P-type · acceptor',lang),L('p ≈ NA = 10¹⁵ cm⁻³','p ≈ NA = 10¹⁵ cm⁻³',lang)]
   ]:round===1?[
    [L('Çok düşük T','Very low T',lang),L('Eksik iyonlaşma olası','Incomplete ionization possible',lang)],
    [L('Orta T','Moderate T',lang),L('Katkı baskın olabilir','Dopant dominated',lang)],
    [L('Çok yüksek T','Very high T',lang),L('Termal çiftler önem kazanır','Thermal pairs grow important',lang)]
   ]:round===2?[
    ['E_F = E_D',L('Enerjiler eşit · g_D=2','Equal energies · g_D=2',lang)],
    ['E_F = E_D + 3kBT',L('Fermi donörün üzerinde','Fermi above donor level',lang)],
    ['E_F = E_D − 3kBT',L('Fermi donörün altında','Fermi below donor level',lang)]
   ]:[
    ['N_D⁺',L('Donörün iyonlaşmış payı','Ionized donor population',lang)],
    ['N_A⁻',L('Akseptörün iyonlaşmış payı','Ionized acceptor population',lang)]
   ];
  setChoices(options,cases,function(i){selected=i;draw();});
 }
 function visual(){
  v.scene.innerHTML='';
  v.scene.appendChild(el('strong','physics-game-metric-headline',round===0?
   L('ni = 10¹⁰ cm⁻³ · çoğunluk = 10¹⁵ cm⁻³','ni = 10¹⁰ cm⁻³ · majority = 10¹⁵ cm⁻³',lang):
   round===1?L('Şematik taşıyıcı rejimleri','Schematic carrier regimes',lang):
   round===2?'N_D⁺ / N_D = 1 / [1 + 2e^((E_F−E_D)/kBT)]':
   selected===0?'g_D = 2 · D⁰ ⇌ D⁺ + e⁻':'g_A = 4 · A⁰ + e⁻ ⇌ A⁻ + h⁺'));
  if(round===0){
   learningMeter(v.scene,selected===0?'n':'p','10¹⁵ cm⁻³',90,'is-electron');
   learningMeter(v.scene,selected===0?'p':'n',revealed?'10⁵ cm⁻³':'?',revealed?12:0,'is-hole');
  }else if(round===1){
   var names=[L('İyonlaşmış katkı payı','Ionized dopant fraction',lang),L('Katkı taşıyıcıları','Dopant carriers',lang),L('Öz taşıyıcılar','Intrinsic carriers',lang)];
   var widths=[[10,15,2],[90,78,6],[98,78,96]][selected];
   names.forEach(function(name,i){learningMeter(v.scene,name,revealed?L('Nitel eğilim','Qualitative trend',lang):'?',revealed?widths[i]:0,i===2?'is-hole':'is-electron');});
  }else if(round===2){
   var percentages=[100/3,100/(1+2*Math.exp(3)),100/(1+2*Math.exp(-3))];
   learningMeter(v.scene,L('İyonlaşmış P⁺ payı','Ionized P⁺ fraction',lang),
    revealed?percentages[selected].toFixed(1)+'%':'?',revealed?percentages[selected]:0,'is-electron');
  }else{
   learningMeter(v.scene,selected===0?'N_D⁺ / N_D':'N_A⁻ / N_A',
    revealed?(selected===0?'33.3%':'20%'):'?',revealed?(selected===0?33.3:20):0,selected===0?'is-electron':'is-hole');
  }
  textRow(v.scene,'physics-game-visual-label',round===0?
   L('Model: dengede, dejenere değil ve katkı tam iyonlaşmış.','Model: equilibrium, nondegenerate, fully ionized dopants.',lang):
   round===1?L('Sıcaklıklar ve oranlar nitel örnektir; geçiş sınırları katkı yoğunluğuna bağlıdır.','Qualitative illustration; regime boundaries depend on dopant concentration.',lang):
   L('İyonlaşma payı = iyonlaşmış katkı / toplam katkı; g katsayısı enerji değil durum çokluğudur.','Ionized fraction = ionized dopants / total dopants; g is state multiplicity, not an energy.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';v.response._learning.focus=round;
  next.hidden=true;clearChoices(answers);setParameterCards();fermiSelection(options,selected);
  if(round===0){
   v.question.textContent=selected===0?
    L('Bu n tipi örnekte azınlık hol yoğunluğu kaçtır?','What is the minority-hole density in this n-type example?',lang):
    L('Bu p tipi örnekte azınlık elektron yoğunluğu kaçtır?','What is the minority-electron density in this p-type example?',lang);
   setChoices(answers,[
    ['10⁵ cm⁻³',L('ni² / çoğunluk','ni² / majority',lang)],
    ['10¹⁰ cm⁻³',L('ni ile aynı','Equal to ni',lang)],
    ['10¹⁵ cm⁻³',L('Çoğunlukla aynı','Equal to majority',lang)]
   ],function(i){var good=i===0;revealed=true;visual();
    feedback(v.response,good,L('np=ni²: 10²⁰ / 10¹⁵ = 10⁵ cm⁻³.','np=ni²: 10²⁰ / 10¹⁵ = 10⁵ cm⁻³.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===1){
   v.question.textContent=L('Bu koşulda hangi fiziksel rejim baskın olmaya en uygundur?',
    'Which physical regime best represents this condition?',lang);
   setChoices(answers,[
    [L('Donma / freeze-out','Freeze-out',lang),L('Katkının bir bölümü iyonlaşmamış','Some dopants remain unionized',lang)],
    [L('Katkı baskın','Extrinsic',lang),L('Tam iyonlaşmaya yakın bölge','Near full ionization regime',lang)],
    [L('Öz taşıyıcı baskın','Intrinsic-dominated',lang),L('Termal elektron–hol üretimi baskın','Thermal pair generation dominates',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,L('Düşük T: donma; orta T: katkı baskın; çok yüksek T: öz taşıyıcılar baskınlaşabilir. n≈ND ancak uygun bölgede geçerlidir.',
     'Low T: freeze-out; moderate T: extrinsic; very high T: intrinsic carriers may dominate. n≈ND requires appropriate conditions.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===2){
   v.question.textContent=L('Seçilen E_F−E_D değerinde fosfor donörlerinin yüzde kaçı pozitif iyonlaşır?',
    'For the selected E_F−E_D, what percentage of phosphorus donors ionize positively?',lang);
   setChoices(answers,[
    ['33.3%',L('E_F = E_D → 1/(1+2)','E_F = E_D → 1/(1+2)',lang)],
    ['2.4%',L('E_F − E_D = +3kBT','E_F − E_D = +3kBT',lang)],
    ['90.9%',L('E_F − E_D = −3kBT','E_F − E_D = −3kBT',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,L('N_D⁺/N_D=1/[1+2 exp((E_F−E_D)/kBT)]. E_F yükseldikçe donör seviyesi dolu kalır ve P⁺ azalır. E_F, E_D altına düştükçe iyonlaşmış pay artar.',
     'N_D⁺/N_D=1/[1+2 exp((E_F−E_D)/kBT)]. A higher E_F favours the occupied, neutral donor and decreases P⁺; lowering E_F below E_D raises ionization.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L('Seçilen N_D⁺ veya N_A⁻ yoğunluğu için Fermi ve enerji seviyeleri hangi formülde doğru yerleştirilmiştir?',
    'Which equation correctly places the Fermi and impurity energies for the selected N_D⁺ or N_A⁻ population?',lang);
   setChoices(answers,[
    ['N_D⁺ = N_D/[1+2e^((E_F−E_D)/kBT)]',L('Donör · elektronunu kaybetmiş D⁺','Donor · electron released from D⁺',lang)],
    ['N_A⁻ = N_A/[1+4e^((E_A−E_F)/kBT)]',L('Akseptör · elektron kabul etmiş A⁻','Acceptor · electron accepted into A⁻',lang)],
    ['N_D⁺ = N_D/[1+2e^((E_D−E_F)/kBT)]',L('Üstelin işareti ters yazılmış','Exponent sign reversed',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,L('Donörün iyonlaşmış durumunda üs E_F−E_D, akseptörün iyonlaşmış durumunda ise E_A−E_F şeklindedir. Paydadaki 1+g×üstel, nötr ve iyonlaşmış yük durumlarını birlikte sayar.',
     'The ionized donor uses exponent E_F−E_D; the ionized acceptor uses E_A−E_F. The denominator 1+g×exponential counts both the neutral and ionized configurations.',lang));
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 draw();
}

function transportGame(target,lang){
 var v=frame(target,lang,L('Sürüklenme ve difüzyon yönleri','Drift and diffusion directions',lang),
  L('Önce alan altında elektron ve hol hızlarını, sonra yoğunluk farkından doğan elektron yayılımını tahmin et.','Predict electron and hole drift under a field, then electron diffusion due to a concentration difference.',lang));
 var round=0,orientation=1,revealed=false;
 var settings=choiceGroup(v.controls,lang,1,'Yön koşulu','Direction condition',
  'Önce E alanını, sonra elektron yoğunluğunun yüksek olduğu tarafı seç.','Choose E first, then the side with more electrons.');
 var answers=choiceGroup(v.controls,lang,2,'Hareket yönü tahmini','Predict the movement',
  'Elektronun hızı ile konvansiyonel akımın işaretini karıştırma.','Do not confuse electron velocity with conventional current.');
 var next=button(L('Sonraki mekanizma','Next mechanism',lang),function(){round=(round+1)%2;orientation=1;draw();},'sim-btn');v.root.appendChild(next);
 function setParameters(){
  setChoices(settings,round===0?[
    ['E ←',L('Elektrik alan sola','Field points left',lang)],
    ['E →',L('Elektrik alan sağa','Field points right',lang)]
   ]:[
    [L('Sağ taraf yoğun','High density on right',lang),L('Elektronlar sağda daha sık','More electrons on the right',lang)],
    [L('Sol taraf yoğun','High density on left',lang),L('Elektronlar solda daha sık','More electrons on the left',lang)]
   ],function(i){orientation=i;draw();});
 }
 function visual(){
  v.scene.innerHTML='';
  var grid=el('div','physics-game-transport-track');
  if(round===0){
   grid.appendChild(el('strong','physics-game-transport-head',L('Elektrik alan E','Electric field E',lang)+' '+(orientation?'→':'←')));
   var electron=orientation?'←':'→',hole=orientation?'→':'←';
   grid.appendChild(el('div','physics-game-transport-carrier is-electron',
    L('Elektron hızı','Electron velocity',lang)+' · '+(revealed?electron:'?')));
   grid.appendChild(el('div','physics-game-transport-carrier is-hole',
    L('Hol hızı','Hole velocity',lang)+' · '+(revealed?hole:'?')));
   grid.appendChild(el('div','physics-game-transport-carrier is-current',
    L('Konvansiyonel sürüklenme akımı','Conventional drift current',lang)+' · '+(revealed?(orientation?'→':'←'):'?')));
  }else{
   grid.appendChild(el('strong','physics-game-transport-head',L('Elektron yoğunluğu','Electron density',lang)));
   var cells=el('div','physics-game-density-track');
   for(var i=0;i<8;i++){
    var left=i<4,high=orientation?left:!left;
    cells.appendChild(el('span','physics-game-density-cell'+(high?' is-dense':''),high?'••':'•'));
   }
   grid.appendChild(cells);
   grid.appendChild(el('div','physics-game-transport-carrier is-electron',
    L('Elektron parçacık akışı','Electron particle flow',lang)+' · '+(revealed?(orientation?'→':'←'):'?')));
  }
  v.scene.appendChild(grid);
  textRow(v.scene,'physics-game-visual-label',round===0?
   L('Negatif elektronun konvansiyonel akımı kendi hızının ters yönündedir.','Conventional electron current is opposite electron drift velocity.',lang):
   L('Bu aşamada E=0 kabul edilir: sadece yoğunluk farkına bağlı difüzyon var.','Assume E=0 here: diffusion is driven only by the density gradient.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';v.response._learning.focus=round;
  next.hidden=true;clearChoices(answers);setParameters();fermiSelection(settings,orientation);
  if(round===0){
   v.question.textContent=L('Bu E alanında elektron ve hol sürüklenme hızlarının yönleri hangisidir?',
    'What are the electron and hole drift-velocity directions under this E field?',lang);
   setChoices(answers,[
    [L('Elektron → · Hol ←','Electron → · Hole ←',lang),L('Zıt yönlü hızlar','Opposite drift velocities',lang)],
    [L('Elektron ← · Hol →','Electron ← · Hole →',lang),L('Zıt yönlü hızlar','Opposite drift velocities',lang)],
    [L('İkisi de E yönünde','Both follow E',lang),L('Aynı yönlü hızlar','Same drift direction',lang)]
   ],function(i){var expected=orientation?1:0,good=i===expected;revealed=true;visual();
    feedback(v.response,good,L('F=qE: negatif elektron E’ye ters, hol E ile aynı yönde sürüklenir. Elektron akımı elektron hızına terstir.',
     'F=qE: negative electrons drift opposite E, holes drift with E. Conventional electron current opposes electron velocity.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L('Alan yoksa elektronlar yoğunluk farkıyla hangi yöne yayılır?',
    'Without a field, in which direction do electrons diffuse?',lang);
   setChoices(answers,[
    ['←',L('Sağa göre sol tarafa','Toward the left side',lang)],
    ['→',L('Sola göre sağ tarafa','Toward the right side',lang)]
   ],function(i){var expected=orientation?1:0,good=i===expected;revealed=true;visual();
    feedback(v.response,good,L('Elektronlar yüksek yoğunluktan düşüğe yayılır. Bu parçacık akışıdır; elektronun konvansiyonel akım yönü terstir.',
     'Electrons diffuse from high to low concentration. This is particle flow; conventional electron current has the opposite sign.',lang));
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 draw();
}
function transportSecondGame(target,lang){
 var v=frame(target,lang,L('Hareketlilik, çiftler ve Einstein bağıntısı','Mobility, pairs and Einstein relation',lang),
  L('Üç mini deneyde saçılma, üretim/yeniden birleşme ve sıcaklığın D/μ üzerindeki etkisini ayrı ayrı tahmin et.','Three mini-experiments: scattering, generation/recombination and temperature dependence of D/μ.',lang));
 var round=0,selected=0,revealed=false;
 var settings=choiceGroup(v.controls,lang,1,'Deney parametresi','Experiment parameter',
  'Fiziksel koşulu değiştir ve sonucu gözlemle.','Change the physical condition and observe the outcome.');
 var answers=choiceGroup(v.controls,lang,2,'Beklenen fiziksel etki','Predicted physical effect',
  'Sıcaklık veya süreç değişince ne olacağını seç.','Choose what happens as temperature or process changes.');
 var next=button(L('Sonraki deney','Next experiment',lang),function(){round=(round+1)%3;selected=0;draw();},'sim-btn');v.root.appendChild(next);
 var kOverQ=8.617333262145e-5;
 function parameterCards(){
  var data=round===0?[
   [L('Daha az saçılma','Less scattering',lang),L('Çarpışmalar seyrek','Fewer collisions',lang)],
   [L('Daha çok saçılma','More scattering',lang),L('Çarpışmalar sık','More frequent collisions',lang)]
  ]:round===1?[
   [L('Üretim','Generation',lang),L('Yeni elektron–hol çiftleri','New electron–hole pairs',lang)],
   [L('Yeniden birleşme','Recombination',lang),L('Bir çift ortadan kalkar','An electron–hole pair is removed',lang)]
  ]:[
   ['300 K',L('Oda sıcaklığına yakın','Near room temperature',lang)],
   ['600 K',L('Daha yüksek sıcaklık','Higher temperature',lang)]
  ];
  setChoices(settings,data,function(i){selected=i;draw();});
 }
 function visual(){
  v.scene.innerHTML='';
  var headline=round===0?L('μ · hareketlilik','μ · mobility',lang):
   round===1?L('Elektron–hol çifti sayısı','Electron–hole pair count',lang):
   'D/μ = kBT/q';
  v.scene.appendChild(el('strong','physics-game-metric-headline',headline));
  if(round===0){
   learningMeter(v.scene,'μ',revealed?L(selected===0?'Görece yüksek':'Görece düşük',selected===0?'Relatively high':'Relatively low',lang):'?',revealed?(selected===0?78:32):0,'is-electron');
  }else if(round===1){
   learningMeter(v.scene,'n, p',revealed?L(selected===0?'Artar':'Azalır',selected===0?'Increase':'Decrease',lang):'?',revealed?(selected===0?85:25):0,'is-hole');
  }else{
   var t=selected?600:300,value=kOverQ*t;
   learningMeter(v.scene,'D/μ',revealed?value.toFixed(3)+' V':'?',revealed?(selected===0?42:84):0,'is-reference');
  }
  textRow(v.scene,'physics-game-visual-label',round===0?
   L('Diğer koşullar ve düşük alan sabit tutulur.','Other conditions and low electric field are held fixed.',lang):
   round===1?L('Sade örnek: net çift sayısını diğer etkiler sabitken karşılaştır.','Simplified model: compare pair counts holding other effects fixed.',lang):
   L('Einstein bağıntısı dejenere olmayan ısıl denge yaklaşımında geçerlidir.','Einstein relation applies in the nondegenerate equilibrium approximation.',lang));
 }
 function draw(){
  revealed=false;v.response.innerHTML='';v.response.className='physics-game-feedback';v.response._learning.focus=round;
  next.hidden=true;clearChoices(answers);parameterCards();fermiSelection(settings,selected);
  if(round===0){
   v.question.textContent=L('Bu koşulda düşük alan hareketliliği referansa göre nasıl değişir?',
    'How does low-field mobility change relative to the reference?',lang);
   setChoices(answers,[
    [L('Artar','Increases',lang),L('Daha az momentum kaybı','Less momentum relaxation',lang)],
    [L('Azalır','Decreases',lang),L('Daha sık momentum kaybı','More frequent momentum relaxation',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,L('Saçılma sıklaştığında hareketlilik genel olarak azalır; seyrekleştiğinde artabilir.','Mobility generally falls with stronger scattering and may rise as scattering weakens.',lang));
    next.hidden=!good;return good;
   });
  }else if(round===1){
   v.question.textContent=L('Seçilen süreç, diğer koşullar aynıyken serbest elektron–hol çiftlerinin sayısını nasıl etkiler?',
    'How does the selected process affect free electron–hole pairs with other effects fixed?',lang);
   setChoices(answers,[
    [L('Artırır','Increases',lang),L('Yeni çiftler oluşur','New pairs form',lang)],
    [L('Azaltır','Decreases',lang),L('Çiftler birleşir','Pairs disappear',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,L('Üretim çift oluşturur; yeniden birleşme ile elektron ve hol aynı anda azalır.','Generation creates pairs; recombination removes an electron and a hole together.',lang));
    next.hidden=!good;return good;
   });
  }else{
   v.question.textContent=L('Bu sıcaklıkta D/μ yaklaşık kaç volttur?','What is the approximate D/μ in volts at this temperature?',lang);
   setChoices(answers,[
    ['0.026 V',L('Yaklaşık 26 mV','About 26 mV',lang)],
    ['0.052 V',L('Yaklaşık 52 mV','About 52 mV',lang)],
    ['0.260 V',L('Yaklaşık 260 mV','About 260 mV',lang)]
   ],function(i){var good=i===selected;revealed=true;visual();
    feedback(v.response,good,'D/μ = kBT/q ≈ '+(kOverQ*(selected?600:300)).toFixed(3)+' V.');
    next.hidden=!good;return good;
   });
  }
  visual();
 }
 draw();
}

var GAMES={
 crystal:gameCrystal,'bloch-electron':gameBloch,bands:gameBands,
 edges:gameEdges,dos:gameDos,holes:gameHoles,fermi:gameFermi,
 equilibrium:equilibriumGame,doping:dopingGame,transport:transportGame
};
var SECOND_GAMES={
 crystal:secondCrystal,'bloch-electron':secondBloch,bands:secondBands,
 edges:secondEdges,dos:secondDos,holes:secondHoles,fermi:secondFermi,
 equilibrium:equilibriumSecondGame,doping:dopingSecondGame,transport:transportSecondGame
};
/* Indices refer to each topic's measurable learning objectives, starting at 1. */
var GAME_COVERAGE={
 crystal:[[1,2,3],[1,3,4]],
 'bloch-electron':[[2,4],[1,3]],
 bands:[[2,3],[1,3,4]],
 edges:[[1,3],[1,2,4]],
 dos:[[2,3],[1,4]],
 holes:[[2,4],[1,3]],
 fermi:[[1,2,3],[1,4]],
 equilibrium:[[2,3],[1,4]],
 doping:[[1,2,3,7],[4,5,6]],
 transport:[[1,2],[3,4]]
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
