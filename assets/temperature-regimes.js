/* Temperature regimes and silicon doping scenarios. No new external dependencies.
 * Thermal-equilibrium, nondegenerate carrier model with incomplete ionization.
 */
(function () {
  'use strict';
  var KB = 8.617333262145e-5, NC300 = 2.86e19, NV300 = 2.66e19;
  var COLORS = { major:'#2475c1', dopant:'#16835c', thermal:'#d76a2b' };
  function txt(lang,tr,en) { return lang==='en'?en:tr; }
  function element(tag,cls,content) {
    var node=document.createElement(tag);
    if(cls)node.className=cls;
    if(content!==undefined)node.textContent=content;
    return node;
  }
  function bandgap(T) { return 1.169-4.9e-4*T*T/(T+655); }
  function energyScales(T) {
    var thermal=KB*T,gap=bandgap(T);
    return {thermal:thermal,gap:gap,donor:0.045,acceptor:0.046,
      donorRatio:0.045/thermal,gapRatio:gap/thermal};
  }
  function intrinsic(T) {
    var scale=Math.pow(T/300,1.5), kT=KB*T;
    return Math.sqrt(NC300*NV300)*scale*Math.exp(-bandgap(T)/(2*kT));
  }
  function solve(ND,NA,T) {
    var Eg=bandgap(T),kT=KB*T,scale=Math.pow(T/300,1.5);
    var NC=NC300*scale,NV=NV300*scale,donor=Eg-0.045,acceptor=0.045;
    function at(EF) {
      var n=NC*Math.exp((EF-Eg)/kT),p=NV*Math.exp(-EF/kT);
      var a=2*Math.exp((EF-donor)/kT),b=4*Math.exp((acceptor-EF)/kT);
      var NDp=ND/(1+a),NAm=NA/(1+b);
      // Avoid subtracting two ~1e16 ion densities that agree to machine precision.
      var signed=(ND-NA+ND*b-NA*a)/((1+a)*(1+b));
      return {n:n,p:p,NDp:NDp,NAm:NAm,signed:signed};
    }
    var lo=-0.2,hi=Eg+0.2;
    for(var j=0;j<90;j++) {
      var mid=(lo+hi)/2,s=at(mid);
      if(s.p+s.signed>s.n)lo=mid;else hi=mid;
    }
    var result=at((lo+hi)/2);
    result.ni=intrinsic(T);
    result.net=Math.abs(result.signed);
    result.major=Math.max(result.n,result.p);
    result.minor=Math.min(result.n,result.p);
    result.type=Math.abs(result.n-result.p)<1e-6*result.major?'i':result.n>result.p?'n':'p';
    return result;
  }
  function scenario(key,exp) {
    var n=Math.pow(10,exp);
    switch(key) {
      case 'donor': return {ND:n,NA:0};
      case 'acceptor': return {ND:0,NA:n};
      case 'comp-n': return {ND:n,NA:.9*n};
      case 'comp-p': return {ND:.9*n,NA:n};
      case 'balanced': return {ND:n,NA:n};
      case 'heavy': return {ND:1e19,NA:0,heavy:true};
      default: return {ND:0,NA:0};
    }
  }
  function notation(n) { return n===0?'0':n.toExponential(2).replace('e+',' × 10^'); }
  function renderExplanation(view,lang) {
    var en=lang==='en',items=en?[
      ['First separate dopant type from temperature regime','<p><b>Donor/acceptor</b> identifies the impurity: phosphorus has five valence electrons and donates a weakly bound electron; boron has three and accepts an electron, leaving a mobile hole. <b>Freeze-out, extrinsic and intrinsic</b> describe which mechanism controls the free carriers at a given temperature. They are not three dopant species.</p>'],
      ['What changes as silicon warms?','<p><b>Freeze-out (cold):</b> many donors or acceptors remain neutral. <b>Extrinsic (moderate T):</b> the impurity species is largely ionized and thermal pair generation is small, so the majority-carrier concentration follows the net ionized dopant density. <b>Intrinsic (hot):</b> electron–hole generation becomes larger than the net dopant contribution, with n≈p≈nᵢ. Every crossover is gradual and depends on doping.</p>'],
      ['Why is the fifth phosphorus electron weakly bound?','<p>The extra electron sees a screened Coulomb attraction to the fixed P⁺ ion. Silicon’s relative permittivity (≈11.7) and the electron effective mass give a <b>hydrogen-like shallow donor</b>, not a miniature classical orbit. The measured phosphorus binding energy is about <b>45.6 meV</b>, versus 13.6 eV for hydrogen. Boron is a shallow acceptor of roughly 46 meV. Donor ions become P⁺; accepting an electron makes a fixed B⁻. The crystal remains electrically neutral.</p>'],
      ['What do 0.026, 0.045 and 1.12 eV mean?','<p>At <b>300 K</b>, \\(k_BT=(8.617\\times10^{-5}\\,\\mathrm{eV/K})(300\\,\\mathrm K)\\approx\\mathbf{0.026\\,eV}\\): a <b>thermal energy scale</b>, not a separate electronic level or a maximum energy. A shallow Si:P donor is about <b>0.045 eV below the conduction edge</b> (\\(E_c-E_D\\)), while a Si:B acceptor is about <b>0.045–0.046 eV above the valence edge</b> (\\(E_A-E_v\\)). Silicon’s <b>1.12 eV</b> is the much larger <b>band gap</b> \\(E_g=E_c-E_v\\) near 300 K—not a thermal energy. In the schematic, P and B levels lie inside the gap near opposite edges.</p><p>At 300 K, \\(E_{\\rm ion}/k_BT\\approx1.7\\), but \\(E_g/k_BT\\approx43\\). <b>Because \\(k_BT\\) is a distribution scale, not a rigid cutoff, ionization can occur even if \\(k_BT<E_{\\rm ion}\\).</b> The actual ionized fraction also depends on Fermi occupancy and available states; \\(e^{-E_{\\rm ion}/k_BT}\\) alone is not the ionized fraction. The thermal voltage \\(k_BT/q\\approx26\\,\\mathrm{mV}\\) has voltage units and should not be confused with 0.026 eV.</p>'],
      ['Three concentration curves—not three different particles','<p>At thermal equilibrium, <b>majority concentration = |ionized donors − ionized acceptors| + minority concentration</b>, following charge neutrality \\(n+N_A^-=p+N_D^+\\). The last term counts electron–hole pairs: a thermal pair supplies one electron and one hole. The impurity contribution uses <b>Nᴅ⁺ and Nᴀ⁻</b>, not raw Nᴅ/Nᴀ, because ionization can be incomplete. In intrinsic silicon the impurity term is zero and n=p=nᵢ.</p>'],
      ['Which silicon cases require separate thought?','<p><b>Intrinsic Si:</b> no intentional dopants, so no impurity-controlled plateau. <b>Si:P / Si:B:</b> electron-majority or hole-majority versions of the classical regimes. <b>Weak doping:</b> a plateau may be short or absent. <b>Compensation:</b> both impurities are present; net ionized charge, not the sum, controls the majority carrier. <b>Nearly equal donors and acceptors:</b> a pronounced plateau may disappear. <b>Very heavy doping:</b> overlapping impurity states, degeneracy, band-gap narrowing and the Si:P metal–insulator transition around 3–4×10¹⁸ cm⁻³ invalidate the isolated-dopant curve.</p>'],
      ['Conditions and limits','<p>The simulator models <b>uniform silicon in thermal equilibrium</b> with temperature-dependent band gap and effective densities of states, Boltzmann band carriers and incomplete shallow-dopant ionization. It is not a measurement or a model of heavy doping, trap-assisted transport, hopping, illumination, carrier injection or a spatially varying p–n junction. Temperature boundaries are <b>not universal fixed numbers</b>; the regime labels in the simulator are illustrative.</p>']
    ]:[
      ['Önce katkı türünü sıcaklık rejiminden ayıralım','<p><b>Donör/akseptör</b>, kristale eklenen atomun türünü belirtir: beş değerlik elektronlu fosfor zayıf bağlı bir elektron verebilir; üç değerlik elektronlu bor bir elektron alarak hareketli bir hol oluşturabilir. <b>Freeze-out, extrinsic, intrinsic</b> ise belirli sıcaklıkta hangi taşıyıcı oluşum mekanizmasının baskın olduğunu anlatır. Üç farklı katkı türü değildir.</p>'],
      ['Silisyum ısındıkça neler değişir?','<p><b>Freeze-out (soğuk):</b> birçok donör veya akseptör iyonlaşmamıştır. <b>Extrinsic (orta sıcaklık):</b> katkıların büyük kısmı iyonlaşmıştır ve ısıl çift üretimi azdır; çoğunluk taşıyıcı sayısını net iyonlaşmış katkı belirler. <b>Intrinsic (sıcak):</b> elektron–hol üretimi net katkıyı geçer, n≈p≈nᵢ olur. Bu geçişler keskin ve evrensel sıcaklık eşikleri değildir.</p>'],
      ['Fosforun beşinci elektronu neden zayıf bağlıdır?','<p>Fosforun fazladan elektronu, sabit P⁺ iyonunun <b>silisyum tarafından perdelenmiş</b> Coulomb alanını hisseder. Silisyumun bağıl dielektrik sabiti (≈11,7) ve elektronun etkin kütlesi nedeniyle <b>hidrojen benzeri sığ donör</b> oluşur; klasik küçük yörünge resmi doğru değildir. P bağlanma enerjisi yaklaşık <b>45,6 meV</b>, hidrojeninki 13,6 eV’tur. Borun akseptör enerjisi yaklaşık 46 meV’tur. İyonlaşınca P⁺ ve B⁻ iyonları kristalde sabit kalır; kristalin toplam yükü nötrdür.</p>'],
      ['0,026 · 0,045 · 1,12 eV ne anlama gelir?','<p><b>300 K</b> sıcaklıkta \\(k_BT=(8{,}617\\times10^{-5}\\,\\mathrm{eV/K})(300\\,\\mathrm K)\\approx\\mathbf{0{,}026\\,eV}\\): bu <b>ısıl enerji ölçeğidir</b>, ayrı bir elektron seviyesi ya da enerjinin üst sınırı değildir. Si:P donörü <b>iletim bandı kenarından yaklaşık 0,045 eV aşağıda</b> (\\(E_c-E_D\\)), Si:B akseptörü ise <b>değerlik bandından yaklaşık 0,045–0,046 eV yukarıdadır</b> (\\(E_A-E_v\\)). Silisyumun <b>1,12 eV</b> değeri ise 300 K civarında <b>bant aralığıdır</b>: \\(E_g=E_c-E_v\\). Termal enerji değildir. Görselde P ve B seviyeleri yasak bant içinde farklı kenarlara yakındır.</p><p>300 K’de \\(E_{\\rm ion}/k_BT\\approx1{,}7\\), ama \\(E_g/k_BT\\approx43\\). <b>\\(k_BT\\) kesin bir eşik değil dağılım ölçeği olduğundan, \\(k_BT<E_{\\rm ion}\\) olsa da iyonlaşma gerçekleşebilir.</b> Gerçek iyonlaşma oranı Fermi doluluğuna ve durum yoğunluğuna da bağlıdır; tek başına \\(e^{-E_{\\rm ion}/k_BT}\\) iyonlaşma yüzdesi değildir. \\(k_BT/q\\approx26\\,\\mathrm{mV}\\) ise enerji değil <b>ısıl gerilim</b> birimindedir.</p>'],
      ['Üç yoğunluk eğrisi, üç farklı parçacık değildir','<p>Isıl dengede <b>çoğunluk taşıyıcı = |iyonlaşmış donör − iyonlaşmış akseptör| + azınlık taşıyıcı</b>. Matematiksel temeli \\(n+N_A^-=p+N_D^+\\) yük nötrlüğü denklemidir. Son terim, bir elektron ve bir hol birlikte oluşturan ısıl çift katkısını sayar. Katkı terimi toplam Nᴅ/Nᴀ değil, eksik iyonlaşmayı da içeren <b>Nᴅ⁺ ve Nᴀ⁻</b> kullanır. Has silisyumda katkı terimi sıfırdır; n=p=nᵢ olur.</p>'],
      ['Hangi silisyum senaryolarında eğriler değişir?','<p><b>Katkısız Si:</b> katkı platosu yoktur. <b>Si:P / Si:B:</b> elektron veya hol çoğunluklu klasik üç bölge. <b>Çok az katkılama:</b> plato kısa kalabilir ya da belirgin olmayabilir. <b>Kompanzasyon:</b> iki katkı birlikte vardır; taşıyıcıyı toplam değil net iyonlaşmış yük belirler. <b>Nᴅ≈Nᴀ:</b> plato zayıflayabilir. <b>Aşırı katkılama:</b> safsızlık seviyeleri örtüşür; dejenerelik, bant daralması ve Si:P’de yaklaşık 3–4×10¹⁸ cm⁻³ civarındaki metal–yalıtkan geçişi bağımsız donör modelini bozar.</p>'],
      ['Modelin geçerlilik sınırları','<p>Simülatör <b>homojen ve ısıl dengedeki</b> silisyum için sıcaklığa bağlı bant aralığı, etkin durum yoğunluğu, Boltzmann bant taşıyıcıları ve eksik sığ katkı iyonlaşması kullanır. Ölçüm değildir; aşırı katkılama, tuzaklı/sıçramalı iletim, ışık, enjeksiyon veya uzaysal p–n eklemi için geçerli değildir. Bölge etiketleri <b>öğretici eşiklerdir</b>, evrensel sıcaklık sınırları değildir.</p>']
    ];
    var root=element('section','physics-lesson-intro regime-explanation');
    items.forEach(function(item){
      var section=element('section','physics-lesson-intro-section');
      section.appendChild(element('h3','',item[0]));
      var body=element('div');body.innerHTML=item[1];section.appendChild(body);root.appendChild(section);
    });
    view.appendChild(root);
  }
  function renderMath(view,lang) {
    view.appendChild(element('h3','',txt(lang,'Üç farklı enerji ölçeği (300 K)','Three distinct energy scales (300 K)')));
    var scales=element('div','physics-topic-formula');
    scales.innerHTML='\\[k_BT=(8.617\\times10^{-5}\\,\\mathrm{eV/K})(300\\,\\mathrm K)\\approx0.02585\\,\\mathrm{eV}\\]'+
      '\\[E_c-E_D\\approx0.045\\,\\mathrm{eV},\\quad E_A-E_v\\approx0.046\\,\\mathrm{eV}\\]'+
      '\\[E_g=E_c-E_v\\approx1.12\\,\\mathrm{eV},\\qquad\\frac{E_{\\rm ion}}{k_BT}\\approx1.7,\\quad\\frac{E_g}{k_BT}\\approx43.\\]';
    view.appendChild(scales);
    view.appendChild(element('p','',txt(lang,
      'kBT enerji dağılımının ölçeğidir; tek tek elektronların kesin veya en yüksek enerjisi değildir. Eion ise sığ katkı ile bant kenarı arasındaki farktır. Gerçek iyonlaşma oranını Fermi doluluğu belirler.',
      'kBT sets an energy-distribution scale, not the exact or maximum energy of each electron. Eion is a shallow dopant-to-band-edge energy separation; Fermi occupancy determines the ionized fraction.')));
    var title=element('h3','',txt(lang,'Tam iyonlaşmada net katkı ve çoğunluk taşıyıcı','Net doping and majority carriers with full ionization'));
    view.appendChild(title);
    var box=element('div','physics-topic-formula');
    box.innerHTML='\\[\\Delta N=N_D-N_A,\\quad n=\\frac{\\Delta N+\\sqrt{\\Delta N^2+4n_i^2}}{2},\\quad p=\\frac{n_i^2}{n}.\\]';
    view.appendChild(box);
    var note=element('p','',txt(lang,'Bu tam iyonlaşma formülü freeze-out veya dejenere rejim için yeterli değildir. Isıl çift katkısı n-tipi için p, p-tipi için n kadardır.','The complete-ionization formula alone cannot describe freeze-out or degeneracy. The thermal-pair contribution is p for n-type and n for p-type.'));
    view.appendChild(note);
    var details=element('details','derive'),summary=element('summary','',txt(lang,'Eksik iyonlaşma ve hidrojenik donör yaklaşımı','Incomplete ionization and hydrogenic donors'));
    details.appendChild(summary);
    var inner=element('div');
    inner.innerHTML='\\[N_D^+=\\frac{N_D}{1+2e^{(E_F-E_D)/k_BT}},\\qquad N_A^-=\\frac{N_A}{1+4e^{(E_A-E_F)/k_BT}}.\\]'+
      '\\[E_{B}^{*}\\approx13.6\\,\\mathrm{eV}\\,\\frac{m^{*}/m_e}{\\varepsilon_r^2},\\qquad a_B^{*}\\approx a_0\\frac{\\varepsilon_r}{m^{*}/m_e}.\\]';
    details.appendChild(inner);view.appendChild(details);
  }
  function renderQuestions(view,lang) {
    var en=lang==='en';
    var qs=en?[
      ['Can a boron-doped crystal have freeze-out?','Yes. At low temperature acceptors may remain neutral, so the free-hole concentration falls below the boron density.','Freeze-out applies to both donors and acceptors; it is not synonymous with n-type.','Saying only phosphorus freezes out ignores acceptor ionization.'],
      ['Does intrinsic behaviour mean that phosphorus disappears?','No. The dopant ions remain, but thermal electron–hole pairs dominate the mobile populations.','A mechanism can cease to dominate without disappearing.','Intrinsic behaviour is not a chemical removal of dopants.'],
      ['Is the impurity contribution always Nᴅ + Nᴀ?','No. Charge neutrality uses the signed difference of ionized donors and acceptors: Nᴅ⁺−Nᴀ⁻.','Opposite fixed ionic charges compensate; adding them counts scattering centres, not net carrier charge.','The sum can be relevant for scattering, but not as net mobile charge.'],
      ['May the thermal contribution in n-type material simply be labelled nᵢ?','No. Its electron–hole pair contribution is p=nᵢ²/n in the nondegenerate equilibrium model.','Every thermally excited pair adds equal electrons and holes.','nᵢ is the intrinsic-reference density, not an additional amount directly added to Nᴅ.'],
      ['Are 0.026, 0.045 and 1.12 eV three impurity levels?','No. Around 300 K, 0.026 eV is kBT, 0.045 eV is shallow-dopant ionization energy, and 1.12 eV is silicon’s band gap.','These quantities describe a thermal energy scale, a dopant-to-band-edge distance and a valence-to-conduction-band separation, respectively.','kBT is not a level in the gap, and the band gap is not the average thermal energy.'],
      ['Does kBT ≈ 0.026 eV prevent a 0.045 eV phosphorus donor from ionizing at 300 K?','No. Thermal energies are distributed rather than capped at kBT; donor occupancy also depends on the Fermi level.','The ratio Eion/kBT ≈ 1.7 does not define a hard threshold or directly give an ionization percentage.','Treating kBT as a maximum energy would incorrectly predict that almost no donors ionize at room temperature.']
    ]:[
      ['Bor katkılı kristalde freeze-out olur mu?','Evet. Düşük sıcaklıkta akseptörlerin bir kısmı nötr kalabilir; serbest hol yoğunluğu bor yoğunluğunun altına iner.','Freeze-out hem donör hem akseptör için vardır; N-tipinin eş anlamlısı değildir.','Sadece fosforun donduğunu düşünmek akseptör iyonlaşmasını gözden kaçırır.'],
      ['Intrinsic davranış başlayınca fosfor atomları kaybolur mu?','Hayır. Katkı iyonları yerinde kalır; ısıl elektron–hol çiftlerinin sayısı baskın hâle gelir.','Bir mekanizma baskınlığını yitirse de fiziksel olarak ortadan kalkmış olmaz.','Intrinsic bölge katkının kimyasal olarak silinmesi değildir.'],
      ['Impurity katkısı her zaman Nᴅ + Nᴀ mıdır?','Hayır. Yük nötrlüğü iyonlaşmış donör ve akseptörlerin işaretli farkını kullanır: Nᴅ⁺−Nᴀ⁻.','Zıt iyonlar birbirini telafi eder; toplamları net yük değil saçılma merkezi sayısı için önemlidir.','Toplam iyon yoğunluğu saçılmada kullanılabilir ama net hareketli taşıyıcı yükünü vermez.'],
      ['N-tipi malzemedeki ısıl katkıya doğrudan nᵢ diyebilir miyiz?','Hayır. Dejenere olmayan ısıl dengede elektron–hol çift katkısı p=nᵢ²/n kadardır.','Her ısıl çift eşit sayıda elektron ve hol sağlar.','nᵢ öz malzemenin referans yoğunluğudur; Nᴅ üzerine doğrudan eklenen bir yoğunluk değildir.'],
      ['0,026, 0,045 ve 1,12 eV üç ayrı safsızlık seviyesi midir?','Hayır. Yaklaşık 300 K’de 0,026 eV kBT ısıl ölçeği; 0,045 eV sığ katkı iyonlaşma enerjisi; 1,12 eV ise Si bant aralığıdır.','Bunlar sırasıyla sıcaklıkla ilişkili enerji ölçeğini, katkı–bant kenarı mesafesini ve değerlik–iletim bandı uzaklığını anlatır.','kBT bant aralığında çizilen bir seviye değildir; Eg de ortalama ısıl enerji değildir.'],
      ['kBT ≈ 0,026 eV olması, 0,045 eV fosfor donörünün 300 K’de iyonlaşmasını engeller mi?','Hayır. Termal enerji dağılımının üst sınırı kBT değildir; donör doluluğu Fermi seviyesine de bağlıdır.','Eion/kBT ≈ 1,7 oranı katı eşik veya doğrudan iyonlaşma yüzdesi vermez.','kBT değerini azami enerji sanmak, oda sıcaklığındaki donör iyonlaşmasını yanlış açıklamaya yol açar.']
    ];
    qs.forEach(function(row){
      var qa=element('div','qa physics-topic-question');
      qa.appendChild(element('p','q',row[0]));
      var details=element('details'),sum=element('summary','',txt(lang,'Çözümü göster','Show solution'));
      details.appendChild(sum);details.appendChild(element('p','',row[1]));
      var reasons=element('div','physics-qa-reason');
      var correct=element('p','physics-qa-correct');correct.appendChild(element('strong','',txt(lang,'Doğru çünkü: ','Correct because: ')));correct.appendChild(element('span','',row[2]));reasons.appendChild(correct);
      var misconception=element('p','physics-qa-misconception');misconception.appendChild(element('strong','',txt(lang,'Sık yanılgı: ','Common mistake: ')));misconception.appendChild(element('span','',row[3]));reasons.appendChild(misconception);
      var back=element('button','physics-qa-reference',txt(lang,'İlgili konuyu Anlatımda incele →','Review the Explanation →'));
      back.type='button';back.addEventListener('click',function(){if(typeof window.showSub==='function')window.showSub('anlatim');});
      reasons.appendChild(back);details.appendChild(reasons);qa.appendChild(details);view.appendChild(qa);
    });
  }
  function renderOutcomes(view,lang) {
    var en=lang==='en';
    var outcomes=en?[
      'Distinguish donor/acceptor species from the three temperature regimes.',
      'Explain P/B ionization energies and distinguish kBT, dopant levels and the Si band gap.',
      'Identify freeze-out, extrinsic and intrinsic regions on T and 1000/T plots.',
      'Separate majority, net ionized impurity and thermal-pair concentrations.',
      'Predict net carrier type when donors and acceptors compensate.',
      'Recognize the limits of the nondegenerate shallow-impurity model.'
    ]:[
      'Donör/akseptör türü ile üç sıcaklık rejimini birbirinden ayırır.',
      'P/B iyonlaşma enerjisini açıklar; kBT, katkı seviyesi ve Si bant aralığını ayırt eder.',
      'Freeze-out, extrinsic ve intrinsic bölgelerini T ve 1000/T grafiklerinde tanır.',
      'Çoğunluk, net iyonlaşmış katkı ve ısıl çift yoğunluklarını ayırt eder.',
      'Donör–akseptör telafisinde çoğunluk taşıyıcı türünü öngörür.',
      'Dejenere olmayan sığ katkı modelinin sınırlarını belirtir.'
    ];
    var block=element('section','physics-learning-outcomes');
    block.appendChild(element('h3','',txt(lang,'Kazanımlar','Learning outcomes')));
    var list=element('ol');outcomes.forEach(function(s){list.appendChild(element('li','',s));});
    block.appendChild(list);view.appendChild(block);
  }
  function plotMarkup(samples,current,axis,lang) {
    var W=810,H=375,left=72,right=22,top=28,bottom=64,innerW=W-left-right,innerH=H-top-bottom;
    var tmin=50,tmax=1100,xmin=1000/1100,xmax=20;
    var xpos=function(T){return left+innerW*((axis==='inverse'?(1000/T-xmin)/(xmax-xmin):(T-tmin)/(tmax-tmin)));};
    var ypos=function(v){return top+innerH*(1-Math.max(0,Math.min(20,Math.log10(Math.max(1,v))))/20);};
    var svg=['<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+txt(lang,'Sıcaklık ve taşıyıcı yoğunluklarının logaritmik grafiği','Logarithmic chart of temperature and carrier concentrations')+'" xmlns="http://www.w3.org/2000/svg">'];
    [0,4,8,12,16,20].forEach(function(e){
      var y=top+innerH*(1-e/20);
      svg.push('<line x1="'+left+'" x2="'+(W-right)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" stroke-opacity=".13"/>');
      svg.push('<text x="'+(left-8)+'" y="'+(y+4)+'" font-size="12" text-anchor="end" fill="currentColor">10^'+e+'</text>');
    });
    var ticks=axis==='inverse'?[1,3,6,10,14,18,20]:[50,250,450,650,850,1050];
    ticks.forEach(function(tick){
      var x=axis==='inverse'?left+innerW*(tick-xmin)/(xmax-xmin):xpos(tick);
      svg.push('<line x1="'+x+'" x2="'+x+'" y1="'+top+'" y2="'+(H-bottom)+'" stroke="currentColor" stroke-opacity=".08"/>');
      svg.push('<text x="'+x+'" y="'+(H-bottom+21)+'" font-size="12" text-anchor="middle" fill="currentColor">'+tick+'</text>');
    });
    svg.push('<text x="'+(left+innerW/2)+'" y="'+(H-9)+'" font-size="14" text-anchor="middle" fill="currentColor">'+(axis==='inverse'?'1000/T (K⁻¹)':txt(lang,'Sıcaklık T (K)','Temperature T (K)'))+'</text>');
    svg.push('<text x="14" y="'+(top+innerH/2)+'" font-size="13" text-anchor="middle" transform="rotate(-90 14 '+(top+innerH/2)+')" fill="currentColor">'+txt(lang,'Yoğunluk (cm⁻³)','Concentration (cm⁻³)')+'</text>');
    var ordered=axis==='inverse'?samples.slice().reverse():samples;
    [['major',COLORS.major],['net',COLORS.dopant],['minor',COLORS.thermal]].forEach(function(pair){
      var d='',active=false;
      ordered.forEach(function(s){
        var value=s[pair[0]];
        if(value<1){active=false;return;}
        d+=(active?'L':'M')+xpos(s.T).toFixed(2)+' '+ypos(value).toFixed(2)+' ';
        active=true;
      });
      svg.push('<path d="'+d+'" fill="none" stroke="'+pair[1]+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>');
    });
    var x0=xpos(current.T);
    svg.push('<line x1="'+x0+'" x2="'+x0+'" y1="'+top+'" y2="'+(H-bottom)+'" stroke="currentColor" stroke-dasharray="5 4" stroke-opacity=".6"/>');
    [['major',COLORS.major],['net',COLORS.dopant],['minor',COLORS.thermal]].forEach(function(pair){
      if(current[pair[0]]>=1)svg.push('<circle cx="'+x0+'" cy="'+ypos(current[pair[0]])+'" r="5.5" stroke="white" stroke-width="1.5" fill="'+pair[1]+'"/>');
    });
    svg.push('</svg>');return svg.join('');
  }
  function energyLevelMarkup(T,lang) {
    var e=energyScales(T);
    var svg=[
      '<svg viewBox="0 0 800 305" role="img" aria-label="'+txt(lang,
        'Silisyumun iletim ve değerlik bantları, fosfor donör ve bor akseptör seviyeleri; ölçekli değil',
        'Silicon conduction and valence bands with phosphorus donor and boron acceptor levels; not to scale')+'" xmlns="http://www.w3.org/2000/svg">',
      '<rect x="92" y="38" width="616" height="45" rx="7" fill="#e1eefe"/>',
      '<rect x="92" y="220" width="616" height="45" rx="7" fill="#f0e6fa"/>',
      '<line x1="92" x2="708" y1="83" y2="83" stroke="#2475c1" stroke-width="3"/>',
      '<line x1="92" x2="708" y1="220" y2="220" stroke="#8752a1" stroke-width="3"/>',
      '<text x="109" y="65" fill="#174c83" font-size="16" font-weight="700">Eᶜ · '+txt(lang,'İletim bandı','Conduction band')+'</text>',
      '<text x="109" y="248" fill="#673d80" font-size="16" font-weight="700">Eᵛ · '+txt(lang,'Değerlik bandı','Valence band')+'</text>',
      '<line x1="108" x2="312" y1="110" y2="110" stroke="#16835c" stroke-width="4" stroke-dasharray="8 4"/>',
      '<text x="112" y="104" fill="#126b4b" font-size="16" font-weight="700">Eᴅ · Si:P</text>',
      '<line x1="312" x2="312" y1="85" y2="108" stroke="#16835c" stroke-width="2"/>',
      '<path d="M306 90 L312 83 L318 90 M306 103 L312 110 L318 103" fill="none" stroke="#16835c" stroke-width="2"/>',
      '<text x="325" y="101" fill="#126b4b" font-size="15" font-weight="600">0.045 eV</text>',
      '<line x1="495" x2="695" y1="194" y2="194" stroke="#ce6b28" stroke-width="4" stroke-dasharray="8 4"/>',
      '<text x="516" y="185" fill="#a64d1c" font-size="16" font-weight="700">Eₐ · Si:B</text>',
      '<line x1="495" x2="495" y1="196" y2="218" stroke="#ce6b28" stroke-width="2"/>',
      '<path d="M489 202 L495 195 L501 202 M489 212 L495 219 L501 212" fill="none" stroke="#ce6b28" stroke-width="2"/>',
      '<text x="510" y="213" fill="#a64d1c" font-size="15" font-weight="600">0.046 eV</text>',
      '<line x1="405" x2="405" y1="88" y2="215" stroke="#526274" stroke-width="2"/>',
      '<path d="M399 96 L405 84 L411 96 M399 207 L405 219 L411 207" fill="none" stroke="#526274" stroke-width="2"/>',
      '<rect x="354" y="134" width="103" height="37" rx="8" fill="#fff" stroke="#ced9e5"/>',
      '<text x="405" y="158" text-anchor="middle" fill="#334155" font-size="17" font-weight="700">E_g ≈ '+e.gap.toFixed(2)+' eV</text>',
      '<text x="400" y="296" text-anchor="middle" fill="#64748b" font-size="13">'+txt(lang,
        'Şematik enerji diyagramı — uzaklıklar gerçek oranları göstermez',
        'Schematic energy diagram — distances are not to scale')+'</text>',
      '</svg>'
    ];
    var cards=[
      ['kBT',e.thermal.toFixed(3)+' eV',txt(lang,'Isıl enerji ölçeği · '+T+' K','Thermal energy scale · '+T+' K')],
      ['Eion · P / B','0.045 / 0.046 eV',txt(lang,'Sığ katkı iyonlaşması','Shallow-dopant ionization')],
      ['Eg',e.gap.toFixed(2)+' eV',txt(lang,'Bant aralığı · '+T+' K','Band gap · '+T+' K')]
    ];
    var html='<div class="regime-energy-metrics">';
    cards.forEach(function(card){html+='<div class="regime-energy-metric"><span>'+card[0]+'</span><strong>'+card[1]+'</strong><small>'+card[2]+'</small></div>';});
    html+='</div><div class="regime-energy-diagram">'+svg.join('')+'</div>';
    html+='<p class="regime-energy-note">'+txt(lang,
      'Bu sıcaklıkta fosfor için Eion/kBT ≈ '+e.donorRatio.toFixed(1)+' ve Eg/kBT ≈ '+e.gapRatio.toFixed(0)+'. kBT <b>bir bant seviyesi veya en büyük elektron enerjisi değildir</b>; iyonlaşma, enerji dağılımına ve Fermi doluluğuna bağlıdır. Donör ve akseptör enerjileri burada yaklaşık sabit kabul edilir.',
      'At this temperature Eion/kBT ≈ '+e.donorRatio.toFixed(1)+' and Eg/kBT ≈ '+e.gapRatio.toFixed(0)+'. kBT is <b>not a band level or maximum electron energy</b>; ionization depends on energy distribution and Fermi occupancy. Dopant binding energies are treated as approximately constant here.')+'</p>';
    return html;
  }
  function renderSimulation(view,lang) {
    var en=lang==='en';
    var root=element('section','regime-lab');root.appendChild(element('h3','',txt(lang,'Üç taşıyıcı katkısı — T ve 1000/T','Three carrier contributions — T and 1000/T')));
    root.appendChild(element('p','regime-lead',txt(lang,'Örnek seçip sıcaklığı ve yoğunluğu değiştirin. Mavi toplam çoğunluk taşıyıcısı, yeşil net iyonlaşmış katkı, turuncu ise ısıl elektron–hol çiftleri katkısıdır.','Choose a silicon sample, temperature and concentration. Blue is the majority-carrier total, green the net ionized-impurity contribution, and orange the thermal-pair contribution.')));
    var controls=element('div','regime-controls'),scenarios=element('label','regime-field'),options=element('select');
    scenarios.appendChild(element('span','',txt(lang,'Silisyum senaryosu','Silicon scenario')));
    var choices=[
      ['donor','Si:P — '+txt(lang,'N-tipi donör','N-type donor')],
      ['acceptor','Si:B — '+txt(lang,'P-tipi akseptör','P-type acceptor')],
      ['intrinsic',txt(lang,'Katkısız has Si','Undoped intrinsic Si')],
      ['comp-n',txt(lang,'Kompanzasyon — donör fazla','Compensated — donors dominate')],
      ['comp-p',txt(lang,'Kompanzasyon — akseptör fazla','Compensated — acceptors dominate')],
      ['balanced',txt(lang,'Nᴅ = Nᴀ — tam telafi','Nᴅ = Nᴀ — full compensation')],
      ['heavy',txt(lang,'Aşırı katkılı Si:P — model sınırı','Heavily doped Si:P — model limit')]
    ];
    choices.forEach(function(row){var o=element('option','',row[1]);o.value=row[0];options.appendChild(o);});
    options.value='donor';scenarios.appendChild(options);controls.appendChild(scenarios);
    function slider(caption,min,max,step,value){
      var label=element('label','regime-field'),span=element('span','',caption),input=element('input'),out=element('output');
      input.type='range';input.min=min;input.max=max;input.step=step;input.value=value;
      label.appendChild(span);label.appendChild(input);label.appendChild(out);controls.appendChild(label);
      return {input:input,output:out};
    }
    var concentration=slider(txt(lang,'log₁₀ katkı (cm⁻³)','log₁₀ doping (cm⁻³)'),10,17.5,.5,16);
    var temperature=slider(txt(lang,'Sıcaklık T','Temperature T'),50,1100,10,300);
    var axisField=element('label','regime-field'),axisSelect=element('select');
    axisField.appendChild(element('span','',txt(lang,'Yatay eksen','Horizontal axis')));
    [['temp','T (K)'],['inverse','1000/T (K⁻¹)']].forEach(function(row){var o=element('option','',row[1]);o.value=row[0];axisSelect.appendChild(o);});
    axisSelect.value='temp';axisField.appendChild(axisSelect);controls.appendChild(axisField);root.appendChild(controls);
    var modeField=element('label','regime-field'),modeSelect=element('select');
    modeField.appendChild(element('span','',txt(lang,'Grafik görünümü','Chart view')));
    [['contributions',txt(lang,'Çoğunluk / katkı / ısıl üretim','Majority / dopants / thermal pairs')],
      ['three-donor',txt(lang,'Si:P — üç farklı donör yoğunluğu','Si:P — three donor concentrations')]].forEach(function(row){
      var option=element('option','',row[1]);option.value=row[0];modeSelect.appendChild(option);
    });
    modeSelect.value='contributions';modeField.appendChild(modeSelect);controls.appendChild(modeField);
    var legend=element('div','regime-legend');
    function setLegend(pairs){
      legend.innerHTML='';
      pairs.forEach(function(pair){
        var item=element('span'),swatch=element('i');swatch.setAttribute('style','background:'+pair[0]);item.appendChild(swatch);item.appendChild(element('span','',pair[1]));legend.appendChild(item);
      });
    }
    root.appendChild(legend);
    var scroller=element('div','regime-chart-scroll'),plot=element('div','regime-chart');scroller.appendChild(plot);root.appendChild(scroller);
    var readout=element('div','regime-readout');readout.setAttribute('aria-live','polite');root.appendChild(readout);
    var note=element('p','regime-caution');root.appendChild(note);
    var energySection=element('section','regime-energy-panel');
    energySection.appendChild(element('h3','',txt(lang,'Bant aralığı, katkı seviyesi ve kBT','Band gap, impurity levels and kBT')));
    energySection.appendChild(element('p','regime-energy-lead',txt(lang,
      'Sıcaklığı değiştirin: kBT ve bant aralığı güncellenir. Fosfor ile borun enerji seviyelerinin farklı bant kenarlarına yakın olduğuna dikkat edin.',
      'Move the temperature slider: kBT and the band gap update. Notice that phosphorus and boron levels lie near opposite band edges.')));
    var energyPlot=element('div','regime-energy-content');energySection.appendChild(energyPlot);root.appendChild(energySection);
    view.appendChild(root);
    function render(){
      var key=options.value,exp=Number(concentration.input.value),T=Number(temperature.input.value),config=scenario(key,exp);
      energyPlot.innerHTML=energyLevelMarkup(T,lang);
      var comparing=modeSelect.value==='three-donor';
      options.disabled=comparing;
      concentration.input.disabled=comparing||key==='intrinsic'||key==='heavy';
      concentration.output.textContent=key==='intrinsic'?txt(lang,'katkı yok','none'):key==='heavy'?'10¹⁹':String(exp);
      temperature.output.textContent=T+' K';
      if(comparing){
        var donorLevels=[1e14,1e16,1e17],lineKeys=['major','net','minor'];
        var data=[];
        for(var t=50;t<=1100;t+=10){
          var item={T:t};
          donorLevels.forEach(function(ND,i){item[lineKeys[i]]=solve(ND,0,t).n;});
          data.push(item);
        }
        var cur={T:T};
        donorLevels.forEach(function(ND,i){cur[lineKeys[i]]=solve(ND,0,T).n;});
        plot.innerHTML=plotMarkup(data,cur,axisSelect.value,lang);
        setLegend([[COLORS.major,'Si:P Nᴅ=10¹⁴ cm⁻³'],[COLORS.dopant,'Si:P Nᴅ=10¹⁶ cm⁻³'],[COLORS.thermal,'Si:P Nᴅ=10¹⁷ cm⁻³']]);
        readout.textContent='T = '+T+' K · '+donorLevels.map(function(ND,i){
          return 'Nᴅ='+notation(ND)+' → n='+notation(cur[lineKeys[i]])+' cm⁻³';
        }).join(' · ');
        note.textContent=txt(lang,
          'Karşılaştırmada üç eğrinin tamamı elektron yoğunluğu n(T) değeridir. Bunlar üç ayrı mekanizma değildir. 1000/T ekseninde sağa gidildikçe sıcaklık azalır; donma bölgesi sağda, öz üretim solda görünür.',
          'All three comparison curves are the electron concentration n(T), not three carrier mechanisms. With the 1000/T axis, temperature falls to the right: freeze-out appears on the right and intrinsic generation on the left.');
        return;
      }
      setLegend([[COLORS.major,txt(lang,'Çoğunluk toplamı','Majority total')],[COLORS.dopant,txt(lang,'Net iyonlaşmış katkı','Net ionized dopants')],[COLORS.thermal,txt(lang,'Isıl çiftler (azınlık)','Thermal pairs (minority)')]]);
      if(config.heavy){
        plot.innerHTML='<div class="regime-model-limit">'+txt(lang,
          'Bu senaryoda 10¹⁹ cm⁻³ katkı, basit Boltzmann + bağımsız donör modelinin geçerlilik alanının dışındadır. Sahte kesinlikte eğri çizmek yerine 5. haftadaki Mott geçişi ve dejenere istatistik modelleri incelenmelidir.',
          'At 10¹⁹ cm⁻³ the independent-donor Boltzmann model is outside its domain. Rather than plotting misleading curves, study the Mott transition and degenerate statistics in Week 5.')+'</div>';
        readout.textContent=txt(lang,'Yüksek katkılama: Mott geçişi, safsızlık bandı, bant daralması ve Fermi–Dirac istatistiği gerekli.','Heavy doping: impurity bands, band-gap narrowing and Fermi–Dirac statistics are required.');
        note.textContent=txt(lang,'Yüksek katkılama sıcaklık eğrisi burada hesaplanmaz.','The heavy-doping temperature curve is intentionally not computed here.');return;
      }
      var data=[];for(var t=50;t<=1100;t+=10){var s=solve(config.ND,config.NA,t);s.T=t;data.push(s);}
      var cur=solve(config.ND,config.NA,T);cur.T=T;
      plot.innerHTML=plotMarkup(data,cur,axisSelect.value,lang);
      var dominant=key==='intrinsic'||cur.net<cur.minor*.1?'intrinsic':
        key==='balanced'?'compensated':cur.minor>=cur.net*.1?'transition':'extrinsic';
      if(dominant==='extrinsic'){
        // Net compensation can freeze out even while 90% of donors are ionized:
        // subtracting the acceptor charge amplifies that partial ionization.
        var nominalNet=Math.abs(config.ND-config.NA);
        if(nominalNet>0&&cur.net/nominalNet<.9)dominant='freeze-out';
      }
      var label={intrinsic:txt(lang,'Intrinsic / öz üretim','Intrinsic / thermal'),
        transition:txt(lang,'Geçiş / ısıl çiftler artıyor','Transition / thermal pairs rising'),
        compensated:txt(lang,'Kompanzasyon / belirgin katkı platosu yok','Compensation / no clear doping plateau'),
        extrinsic:'Extrinsic', 'freeze-out':'Freeze-out'}[dominant];
      readout.textContent='T = '+T+' K · Nᴅ = '+notation(config.ND)+' · Nᴀ = '+notation(config.NA)+' cm⁻³ · '+
        'n = '+notation(cur.n)+' · p = '+notation(cur.p)+' · nᵢ = '+notation(cur.ni)+' · '+
        'Nᴅ⁺ = '+notation(cur.NDp)+' · Nᴀ⁻ = '+notation(cur.NAm)+' cm⁻³ · '+txt(lang,'Yaklaşık rejim: ','Approximate regime: ')+label;
      note.textContent=txt(lang,
        'Isıl çift katkısı azınlık yoğunluğu kadar, katkı katkısı |Nᴅ⁺−Nᴀ⁻| kadardır: ikisinin toplamı çoğunluk yoğunluğunu verir. 1 cm⁻³ altındaki eğri parçaları logaritmik ölçekte gizlidir. Rejim sınırları öğretici %10/%90 eşikleri kullanır.',
        'The thermal-pair contribution equals the minority concentration; the impurity term is |Nᴅ⁺−Nᴀ⁻|. Their sum is the majority concentration. Values below 1 cm⁻³ are hidden on the log plot. Regime markers use illustrative 10%/90% thresholds.');
    }
    options.addEventListener('change',render);
    concentration.input.addEventListener('input',render);
    temperature.input.addEventListener('input',render);
    axisSelect.addEventListener('change',render);
    modeSelect.addEventListener('change',render);
    render();
  }
  var GAME_ROUNDS = [
    {tr:['300 K’de orta katkılı Si:P örneğinde hangi taşıyıcı baskındır?','Elektronlar','Holler','Donörler hareketli parçacıklara dönüşür',0,'P donörü elektronlarını iletim bandına sağlayabilir; sabit P⁺ iyonları hareketli değildir.','Holleri çoğunluk saymak veya P⁺ iyonlarının hareket ettiğini düşünmek yanlıştır.'],
     en:['At 300 K in moderately doped Si:P, what is the majority carrier?','Electrons','Holes','Donor ions become mobile',0,'P donors supply electrons to the conduction band; the P⁺ ions stay fixed.','Holes are minority carriers and P⁺ dopant ions are not mobile.']},
    {tr:['Bor katkılı silisyum çok soğutulursa ne olur?','Bor atomları yok olur','Akseptörler eksik iyonlaşır; hol yoğunluğu azalır','Bütün elektronlar iletime geçer',1,'Freeze-out, B akseptörlerinin valans bandından elektron kabul etmeye yeterince iyonlaşamamasıdır.','Freeze-out kimyasal atom kaybı veya tüm elektronların serbestleşmesi değildir.'],
     en:['What happens when boron-doped silicon becomes very cold?','Boron disappears','Incomplete acceptor ionization reduces holes','Every electron enters conduction',1,'Freeze-out includes incomplete boron-acceptor ionization and fewer mobile holes.','Freeze-out is neither chemical disappearance nor universal conduction.']},
    {tr:['Yüksek sıcaklıkta Si:P intrinsic olmaya yaklaşınca hangi ifade doğrudur?','Fosfor silinir','n ve p birbirine yaklaşır','Yalnızca Nᴅ artar',1,'Isıl elektron–hol çiftleri baskınlaştığında n≈p≈nᵢ olur; katkı yerinde kalır.','Fosfor atomları ortadan kaybolmaz ve Nᴅ sıcaklıkla kendiliğinden artmaz.'],
     en:['When hot Si:P approaches intrinsic behaviour, what is true?','Phosphorus vanishes','n and p approach each other','Only Nᴅ increases',1,'Thermal electron–hole pairs dominate and n≈p≈nᵢ while dopants remain.','The dopants do not vanish or multiply with temperature.']},
    {tr:['Nᴅ=Nᴀ=10¹⁶ cm⁻³ iken tam iyonlaşmada net katkı kaçtır?','2×10¹⁶','10¹⁶','0',2,'Donörlerin artı, akseptörlerin eksi iyon yükleri birbirini telafi eder.','Nᴅ ve Nᴀ toplanmaz; net hareketli yük fark ile bulunur.'],
     en:['With Nᴅ=Nᴀ=10¹⁶ cm⁻³ and complete ionization, what is net doping?','2×10¹⁶','10¹⁶','0',2,'Positive donor and negative acceptor charges compensate each other.','Adding Nᴅ and Nᴀ does not give net free-carrier charge.']},
    {tr:['10¹⁹ cm⁻³ Si:P için basit izole donör grafiği güvenilir midir?','Evet, her sıcaklıkta','Hayır, dejenere ve safsızlık bandı etkileri önemlidir','Yalnız sıcaklık eksenini değiştirmek yeter',1,'Bu yoğunluk Si:P metal–yalıtkan geçiş ölçeğinin üzerindedir; bağımsız donör resmi bozulur.','Basit modelin görünüşte düzgün bir eğri vermesi fiziksel geçerliliği kanıtlamaz.'],
     en:['Is the isolated-donor model reliable for 10¹⁹ cm⁻³ Si:P?','Yes, at all temperatures','No, degeneracy and impurity bands matter','Just rescale the axis',1,'This concentration is above the Si:P metal–insulator transition scale.','A smooth curve alone does not establish a model’s validity.']},
    {tr:['Bant diyagramında Si:P donör seviyesi Eᴅ nerededir?','İletim bandının yaklaşık 0,045 eV altında','Değerlik bandının yaklaşık 1,12 eV altında','0,026 eV her zaman Eᴅ seviyesidir',0,'P donörünün bağlanma enerjisi E_c−E_D≈0,045 eV’dir. Yakındaki iletim bandına elektron vermesi görece kolaydır.','E_g bütün bant aralığıdır; kBT ise donörün konumunu gösteren enerji seviyesi değildir.'],
     en:['Where is the Si:P donor level E_D in the band diagram?','About 0.045 eV below the conduction band','About 1.12 eV below the valence band','0.026 eV is always the E_D level',0,'The P donor binding energy is E_c−E_D≈0.045 eV, so an electron can enter the nearby conduction band.','E_g spans the full gap, whereas kBT is not an electronic donor level.']},
    {tr:['Si:B akseptörünün yaklaşık 0,046 eV seviyesi nasıl yorumlanır?','İletim bandına 0,046 eV uzaklıktadır','Değerlik bandından 0,046 eV yukarıdadır','Silisyumun bant aralığı 0,046 eV’dir',1,'Bor akseptörü E_A−E_v≈0,046 eV seviyesindedir. Değerlik bandından elektron kabul edilmesi hareketli bir hol bırakabilir.','Akseptör ile donör zıt bant kenarlarına yakındır; 1,12 eV silisyumun esas bant aralığıdır.'],
     en:['How should Si:B’s approximately 0.046 eV acceptor level be interpreted?','It lies 0.046 eV from the conduction band','It lies 0.046 eV above the valence band','The Si band gap is 0.046 eV',1,'The B acceptor is E_A−E_v≈0.046 eV, and accepting a valence electron can leave a mobile hole.','Donor and acceptor levels lie by opposite band edges; silicon’s band gap is about 1.12 eV.']}
  ];
  var GAME_CONTRIBUTIONS = [
    {tr:['N-tipi dengede toplam elektron sayısı hangi eşitlikle ayrılır?','n=Nᴅ⁺+p (Nᴀ=0)','n=Nᴅ+nᵢ','n=Nᴅ⁺−p',0,'Nötrlükten n=p+Nᴅ⁺; p kadar ısıl elektron–hol çifti katkısı vardır.','nᵢ doğrudan eklenen bir sayı değildir; p işareti de eksi değildir.'],
     en:['How is the electron concentration separated in n-type equilibrium?','n=Nᴅ⁺+p (Nᴀ=0)','n=Nᴅ+nᵢ','n=Nᴅ⁺−p',0,'Neutrality gives n=p+Nᴅ⁺, with p electrons from thermal pairs.','nᵢ is not simply added to Nᴅ and the hole term is not negative.']},
    {tr:['Kompanzasyonda net iyonlaşmış katkı hangisidir?','Nᴅ⁺+Nᴀ⁻','|Nᴅ⁺−Nᴀ⁻|','Nᴅ×Nᴀ',1,'Donör ve akseptörün sabit yükleri zıt işaretlidir; fark, çoğunluk ve azınlık yoğunluklarının farkına eşittir.','Toplam iyon yoğunluğu saçılmada anlamlıdır, ancak net hareketli yük değildir.'],
     en:['What is the net ionized dopant term under compensation?','Nᴅ⁺+Nᴀ⁻','|Nᴅ⁺−Nᴀ⁻|','Nᴅ×Nᴀ',1,'Fixed donors and acceptors have opposite ionic charges; the difference fixes majority minus minority.','The sum can inform scattering, but not net mobile charge.']},
    {tr:['1000/T ekseninde sağa gidince ne olur?','Sıcaklık artar','Sıcaklık azalır','Katkı türü değişir',1,'1000/T arttığında T küçülür: intrinsic solda, freeze-out sağda görülür.','1000/T, T ile doğru değil ters orantılıdır; katkı türü değişmez.'],
     en:['What happens as 1000/T increases to the right?','Temperature rises','Temperature falls','Dopant type changes',1,'Increasing 1000/T means decreasing T, so intrinsic is left and freeze-out right.','The reciprocal axis does not increase with T or change dopant identity.']},
    {tr:['Katkısız dengedeki silisyumun taşıyıcıları için hangisi doğrudur?','n=p=nᵢ','n=Nᴅ','p=0',0,'Katkı yokken taşıyıcılar çiftler halinde üretilir; iki yoğunluk eşittir.','Katkısız kristalde Nᴅ bulunmaz ve ısıl denge holleri sıfır değildir.'],
     en:['Which relation holds for intrinsic equilibrium silicon?','n=p=nᵢ','n=Nᴅ','p=0',0,'Thermal pair generation gives equal electron and hole densities.','There are no intentional donors, and thermal holes are not identically zero.']},
    {tr:['300 K’deki 0,026 eV değeri fiziksel olarak nedir?','Silisyumun bant aralığı','Fosforun Eᴅ seviyesi','kBT ısıl enerji ölçeği',2,'kB≈8,617×10⁻⁵ eV/K olduğundan kBT≈0,02585 eV’dir. Tek elektronun üst enerji sınırı değildir.','1,12 eV bant aralığıdır; 0,045 eV ise donör iyonlaşma enerjisidir. 0,026 eV bant içinde bir seviye olarak çizilmez.'],
     en:['What does the 0.026 eV value mean at 300 K?','The silicon band gap','The phosphorus E_D level','The kBT thermal energy scale',2,'With kB≈8.617×10⁻⁵ eV/K, kBT≈0.02585 eV. It does not impose a maximum energy on each electron.','The gap is about 1.12 eV and donor binding about 0.045 eV; kBT is not a band-gap level.']},
    {tr:['300 K’de kBT≈0,026 eV, P iyonlaşma enerjisi≈0,045 eV. Hangisi doğrudur?','0,026<0,045 olduğu için hiçbir P donörü iyonlaşamaz','İyonlaşma olabilir; kBT kesin eşik değildir, Fermi doluluğu da önemlidir','0,045 eV doğrudan elektron yoğunluğudur',1,'Enerji dağılımının kuyruğunda daha yüksek enerjili durumlar bulunur. İyonlaşmış pay, Fermi seviyesi ve durum yoğunluğuna da bağlıdır.','kBT değerini tek elektron için üst sınır sanmak hatalıdır; eV enerji, cm⁻³ ise yoğunluk birimidir.'],
     en:['At 300 K kBT≈0.026 eV and P ionization energy≈0.045 eV. What follows?','Since 0.026<0.045, no P donor can ionize','Ionization is possible: kBT is not a cutoff and Fermi occupancy matters','0.045 eV directly specifies electron concentration',1,'Thermal distributions extend above their characteristic scale, and Fermi occupancy and states also affect the ionized fraction.','kBT is not an individual energy cap; eV measures energy whereas cm⁻³ measures concentration.']}
  ];
  function renderGames(view,lang) {
    var en=lang==='en',root=element('section','regime-games');
    var tabs=element('div','physics-game-switch'),panes=[];
    var banks=[GAME_ROUNDS,GAME_CONTRIBUTIONS],descriptions=[
      txt(lang,'Oyun 1 · Sıcaklık rejimini ve katkı türünü yorumla','Game 1 · Identify regimes and dopant types'),
      txt(lang,'Oyun 2 · Yoğunlukları ve grafik eksenini yorumla','Game 2 · Read concentrations and axes')
    ];
    banks.forEach(function(bank,index){
      var pane=element('div','regime-game-instance'),page=element('section','physics-learning-game');
      pane.appendChild(page);
      page.appendChild(element('h3','',descriptions[index]));
      page.appendChild(element('p','physics-game-help',txt(lang,'Her cevapta gerekçe ve yaygın yanılgı açıklanır. Konu anlatımına geri dönebilirsiniz.','Each answer explains the reasoning and a common misconception; you can return to the Explanation.')));
      page.appendChild(element('p','physics-game-covered',txt(lang,'Hedeflenen kazanımlar: ','Learning objectives: ')+(index===0?'1, 2, 3, 5, 6':'3, 4, 5')));
      var prompt=element('p','physics-game-question'),options=element('div','regime-game-options');
      var feedback=element('div','physics-game-feedback');feedback.setAttribute('role','status');
      var next=element('button','sim-btn',txt(lang,'Sonraki soru →','Next question →'));next.type='button';
      page.appendChild(prompt);page.appendChild(options);page.appendChild(feedback);page.appendChild(next);
      var round=0;
      function draw(){
        var item=bank[round][en?'en':'tr'];
        prompt.textContent=(round+1)+' / '+bank.length+' — '+item[0];
        options.innerHTML='';feedback.innerHTML='';feedback.className='physics-game-feedback';next.hidden=true;
        for(var i=1;i<=3;i++)(function(choice){
          var button=element('button','regime-game-option'),title=element('strong','',item[choice]);
          button.type='button';button.setAttribute('aria-pressed','false');button.appendChild(title);
          button.appendChild(element('small','',txt(lang,'Bu yorumu seç','Choose this interpretation')));
          button.addEventListener('click',function(){
            Array.from(options.children).forEach(function(other){other.setAttribute('aria-pressed','false');other.classList.remove('is-correct-answer');other.classList.remove('is-incorrect-answer');});
            var correct=choice-1===item[4];button.setAttribute('aria-pressed','true');
            button.classList.add(correct?'is-correct-answer':'is-incorrect-answer');
            feedback.innerHTML='';feedback.className='physics-game-feedback '+(correct?'is-correct':'is-incorrect');
            feedback.appendChild(element('strong','',correct?txt(lang,'✓ Doğru çünkü: ','✓ Correct because: '):txt(lang,'↻ Yanlış çünkü: ','↻ Not quite because: ')));
            feedback.appendChild(element('p','',correct?item[5]:item[6]+' '+item[5]));
            var back=element('button','physics-game-lesson-link',txt(lang,'İlgili anlatımı aç →','Open the explanation →'));back.type='button';
            back.addEventListener('click',function(){if(typeof window.showSub==='function')window.showSub('anlatim');});feedback.appendChild(back);
            next.hidden=!correct;
          });
          options.appendChild(button);
        })(i);
      }
      next.addEventListener('click',function(){round=(round+1)%bank.length;draw();});
      draw();pane.hidden=index!==0;root.appendChild(pane);panes.push(pane);
    });
    [0,1].forEach(function(i){
      var button=element('button','physics-game-switch-button',txt(lang,'Oyun ','Game ')+(i+1));button.type='button';
      button.setAttribute('role','tab');button.setAttribute('aria-selected',String(i===0));
      button.addEventListener('click',function(){
        panes.forEach(function(p,j){p.hidden=j!==i;});
        Array.from(tabs.children).forEach(function(b,j){b.setAttribute('aria-selected',String(j===i));});
      });tabs.appendChild(button);
    });
    view.appendChild(tabs);view.appendChild(root);
  }
  function mount(views,lang) {
    if(!views.regimes)return;
    renderExplanation(views.regimes.anlatim,lang);
    renderOutcomes(views.regimes.anlatim,lang);
    renderMath(views.regimes.matematik,lang);
    renderSimulation(views.regimes.gorsel,lang);
    renderQuestions(views.regimes.soru,lang);
    renderGames(views.regimes.oyun,lang);
  }
  window.SemiconductorTemperatureRegimes={mount:mount,_test:{solve:solve,scenario:scenario,intrinsic:intrinsic,bandgap:bandgap,energyScales:energyScales}};
})();
