/* Solid-state foundations: pedagogical 1D Bloch, finite-chain tight binding,
   and d-dimensional parabolic E(k) / DOS. Works with existing Plotly.
   All models declare their scope; no ab-initio/first-principles claim. */
(function(){
  'use strict';
  var HBAR2_OVER_2M0 = 0.03809982; // eV nm^2
  var T0 = 0.72; // eV; effective two-band hopping at r0 (illustrative)
  var MATERIALS = {
    si:{name:'Si',r0:2.35,eg:1.12},
    ge:{name:'Ge',r0:2.45,eg:0.66},
    gaas:{name:'GaAs',r0:2.45,eg:1.42}
  };
  var values={k:0.35,width:0.29,vg:0.17,n:16,ratio:1,material:'si',dimension:3,mass:0.26,probe:0.20};
  var root=null,lang='tr';
  function tr(trText,enText){return lang==='en'?enText:trText;}
  function el(selector){return root&&root.querySelector(selector);}
  function col(name,fallback){return getComputedStyle(document.documentElement).getPropertyValue(name).trim()||fallback;}
  function num(x,n){return Number(x).toFixed(n);}
  function legendLayout(extras){
    var rule=col('--rule','#ccd2dc'), ink=col('--ink','#16202b');
    return Object.assign({
      autosize:true,paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',
      font:{family:'Arial, sans-serif',color:ink,size:12},
      margin:{l:55,r:35,t:36,b:62},
      xaxis:{gridcolor:rule,zerolinecolor:rule,automargin:true},
      yaxis:{gridcolor:rule,zerolinecolor:rule,automargin:true},
      legend:{orientation:'h',x:0,y:-0.22},showlegend:true,hovermode:'closest'
    },extras||{});
  }
  var config={responsive:true,displaylogo:false,scrollZoom:false,modeBarButtonsToRemove:['lasso2d','select2d']};
  function draw(id,traces,layout){
    var target=el('[data-ss-plot="'+id+'"]');
    if(!target)return;
    if(!window.Plotly){target.textContent=tr('Grafik kitaplığı henüz yüklenmedi.','Chart library did not load.');return;}
    var result=window.Plotly.react(target,traces,legendLayout(layout),config);
    if(result&&typeof result.catch==='function')result.catch(function(){target.textContent=tr('Grafik çizilemedi.','Unable to draw chart.');});
  }
  function trace(name,x,y,c,extra){
    return Object.assign({type:'scatter',mode:'lines',name:name,x:x,y:y,line:{color:c,width:2.5}},extra||{});
  }
  var EXPLAINS={
    bloch:{
      tr:'<h5>1. Atomun elektronu ile kristal elektronunun farkı</h5>'+
         '<p>Tek atomdaki elektron, belirli enerjili atomik kuantum durumlarıyla betimlenir. Periyodik kristalde elektronların durumları tek tek atomlara ait olmak zorunda değildir: bütün kristale yayılan <b>Bloch dalgaları</b> olabilir. Burada elektronun gezegen gibi bir yörüngede dolaştığını düşünmek yanıltıcıdır. Dalga fonksiyonu, elektronun hangi konumlarda ölçülebileceğinin olasılık genliğini verir.</p>'+
         '<h5>2. Bloch teoremi tam olarak ne söyler?</h5>'+
         '<p>Bir boyutta örgü sabiti \\(a\\) ve periyodik potansiyel \\(V(x+a)=V(x)\\) varsa, enerji özdurumları \\(\\psi_k(x)=e^{ikx}u_k(x)\\) biçiminde seçilebilir ve \\(u_k(x+a)=u_k(x)\\) olur. Buradan \\(\\psi_k(x+a)=e^{ika}\\psi_k(x)\\) çıkar: <b>komşu hücrede dalga fonksiyonunun fazı değişebilir, hücre içi şekil tekrarlanır.</b> Ayrıca \\(|\\psi_k(x+a)|^2=|\\psi_k(x)|^2\\) olduğundan olasılık yoğunluğu periyodiktir.</p>'+
         '<div class="ss-equation">\\[\\underbrace{\\psi_k(x)}_{\\text{Bloch dalgası}}=\\underbrace{e^{ikx}}_{\\text{hücreler arası faz}}\\underbrace{u_k(x)}_{\\text{periyodik hücre şekli}},\\quad u_k(x+a)=u_k(x)\\]</div>'+
         '<h5>3. Kristal momentumu, Brillouin bölgesi ve yasak enerjiler</h5>'+
         '<p>\\(k\\) dalga vektörüdür; \\(\\hbar k\\) <b>kristal momentumu</b> (kuazimomentum) olarak adlandırılır, serbest elektronun sıradan mekanik momentumu ile her zaman aynı değildir. Bir boyutlu örgüde birbirine \\(2\\pi/a\\) kadar farklı \\(k\\) değerleri kristal açısından eşdeğer kabul edilebilir. Bu yüzden ilk Brillouin bölgesi \\(-\\pi/a\\leq k\\leq\\pi/a\\) seçilir. Bölge sınırında \\(k\\) ile \\(k-2\\pi/a\\) bileşenleri periyodik potansiyel tarafından karıştırılabilir; birbirine eş enerji seviyelerinin ayrılması <b>bant boşluğu</b> açabilir. Boşluğun büyüklüğü potansiyelin Fourier bileşenine bağlıdır; her malzemede yalnızca atom mesafesinden hesaplanmaz.</p>'+
         '<p class="ss-lab-note">Görsellerdeki <b>Bloch dalgası laboratuvarı</b> içinde \\(k\\) ve atomik orbital yayılımını değiştirin. Aynı örüntünün hücreden hücreye nasıl bir fazla tekrarlandığını gözleyin.</p>'+
         '<details class="ss-question"><summary>Kontrol sorusu: \\(k=\\pi/a\\) için komşu hücreye geçince ne olur?</summary><p>\\(e^{ika}=e^{i\\pi}=-1\\). Dalga fonksiyonunun işareti değişir; fakat \\(|\\psi|^2\\) değişmez. Bu, elektronun her ikinci atomda kaybolduğu anlamına gelmez.</p></details>',
      en:'<h5>1. Electrons in atoms versus electrons in crystals</h5>'+
         '<p>An isolated atom has discrete quantum states. Electrons in a periodic crystal can occupy states delocalized across the entire lattice: <b>Bloch waves</b>. They should not be pictured as planets orbiting nuclei. A wavefunction is a probability amplitude, not a classical trajectory.</p>'+
         '<h5>2. What does Bloch theorem actually state?</h5>'+
         '<p>For a one-dimensional periodic potential \\(V(x+a)=V(x)\\), eigenstates can be chosen as \\(\\psi_k(x)=e^{ikx}u_k(x)\\), where \\(u_k(x+a)=u_k(x)\\). Hence \\(\\psi_k(x+a)=e^{ika}\\psi_k(x)\\): <b>translation changes the phase while repeating the within-cell pattern</b>. The probability density is periodic because \\(|\\psi_k(x+a)|^2=|\\psi_k(x)|^2\\).</p>'+
         '<div class="ss-equation">\\[\\underbrace{\\psi_k(x)}_{\\text{Bloch wave}}=\\underbrace{e^{ikx}}_{\\text{intercell phase}}\\underbrace{u_k(x)}_{\\text{periodic factor}},\\quad u_k(x+a)=u_k(x)\\]</div>'+
         '<h5>3. Crystal momentum, Brillouin zone and band gaps</h5>'+
         '<p>\\(k\\) is a wave vector and \\(\\hbar k\\) is <b>crystal quasi-momentum</b>, not always ordinary mechanical momentum. In a 1D lattice, wave vectors differing by \\(2\\pi/a\\) can be treated as equivalent. The first Brillouin zone is \\(-\\pi/a\\leq k\\leq\\pi/a\\). At its boundary, Fourier components at \\(k\\) and \\(k-2\\pi/a\\) can couple through the periodic potential, splitting degenerate energies to open a <b>band gap</b>. Its size depends on Fourier components of the potential, not merely the interatomic distance.</p>'+
         '<p class="ss-lab-note">Change \\(k\\) and the orbital spread in the <b>Bloch-wave lab</b> under Visuals; observe the phase shift between otherwise repeating unit cells.</p>'+
         '<details class="ss-question"><summary>Check: what happens on translation by one cell at \\(k=\\pi/a\\)?</summary><p>Since \\(e^{ika}=e^{i\\pi}=-1\\), the wavefunction changes sign but \\(|\\psi|^2\\) does not. The electron does not vanish at every other site.</p></details>'
    },
    bands:{
      tr:'<h5>1. İki atomdan \\(N\\) atomlu kristale</h5>'+
         '<p>İki özdeş atomun aynı enerjili orbitalleri birbirini etkilediğinde, bağlayıcı ve karşıt-bağlayıcı kombinasyonlar farklı enerjiler alır. \\(N\\) atomdan birer orbital seçilirse (spin hariç) \\(N\\) ayrı enerji düzeyi elde edilir; \\(N\\) çok büyük olduğunda seviyeler birbirine yaklaşır ve bant gibi görünür. <b>Yeni elektron durumları yoktan oluşmaz:</b> başlangıçta bulunan atomik durumlar, kristal etkileşimi altında yeniden düzenlenir.</p>'+
         '<h5>2. Basit tight-binding modeli neden işe yarar?</h5>'+
         '<p>Tek boyutlu, \\(N\\) atomlu <i>açık uçlu</i> zincirde tek bir etkin orbital ve yalnızca yakın komşu etkileşimi için enerji özdeğerleri \\(E_j=\\varepsilon_0-2t\\cos[j\\pi/(N+1)]\\), \\(j=1,\\dots,N\\) olur. Burada \\(t\\), komşu atomlar arasındaki elektronun etkin sıçrama/örtüşme parametresidir (eV). \\(N\\) büyürken bant genişliği yaklaşık \\(4t\\) olur; ortalama seviye aralığı küçülür. Sonsuz periyodik zincirde \\(E(k)=\\varepsilon_0-2t\\cos(ka)\\) elde edilir. Bu, Bloch teoremiyle bağlantıdır.</p>'+
         '<div class="ss-equation">\\[E_j=\\varepsilon_0-2t\\cos\\!\\left(\\frac{j\\pi}{N+1}\\right),\\qquad E(k)=\\varepsilon_0-2t\\cos(ka)\\]</div>'+
         '<h5>3. Değerlik bandı neden dolu, iletim bandı neden boş olabilir?</h5>'+
         '<p>Gerçek Si atomu dört değerlik elektronuna ve çok sayıda orbital kanalına sahiptir. Eğitim simülasyonunda ise <b>iki etkin orbital ailesi</b> kullanılır: düşük enerjili bağlayıcı değerlik durumları ve yüksek enerjili karşıt-bağlayıcı iletim durumları. Her ailede \\(N\\) spin-dejenereli düzey vardır; her düzeye zıt spinli en fazla iki elektron yerleşebilir. Yeterli elektron olduğunda alttaki bant dolarken üstteki bant boş kalabilir. <b>Bu model gerçek Si orbitallerinin, çok boyutlu kristal simetrisinin veya hibritleşmesinin tam hesabı değildir.</b></p>'+
         '<p class="ss-lab-note">Görsellerdeki <b>Atomik seviyelerden bantlara</b> deneyinde \\(N\\) sayısını 2’den başlayarak artırın. Sonra uzaklığı artırıp örtüşme azaldığında bantların nasıl daraldığını izleyin. Denge uzaklığında gösterilen \\(E_g\\), modelin eşlediği referans değerdir; genel \\(E_g(r)\\) sonucu deneysel malzeme hesabı sayılmaz.</p>'+
         '<details class="ss-question"><summary>Kontrol sorusu: atom sayısı artarsa bant genişliği de sınırsız artar mı?</summary><p>Hayır. Sabit yakın-komşu \\(t\\) altında seviye sayısı artarken genişlik \\(4t\\) sınırına yaklaşır. Sıklığı artan şey, aynı genişlik içindeki izinli durumların sayısıdır.</p></details>',
      en:'<h5>1. From two atoms to a crystal of \\(N\\) atoms</h5>'+
         '<p>Coupling two identical atomic orbitals yields bonding and antibonding combinations with split energies. Starting from one orbital per atom, \\(N\\) atoms give \\(N\\) levels (before spin multiplicity). For large \\(N\\), densely spaced levels look like a band. <b>States do not appear from nothing:</b> atomic states reorganize when atoms interact.</p>'+
         '<h5>2. A tractable tight-binding model</h5>'+
         '<p>For a finite <i>open-ended</i> chain of \\(N\\) sites with one effective orbital and nearest-neighbour hopping, \\(E_j=\\varepsilon_0-2t\\cos[j\\pi/(N+1)]\\), \\(j=1,\\dots,N\\). The hopping \\(t\\) (eV) represents effective coupling between neighbouring sites. The bandwidth approaches \\(4t\\) as \\(N\\) grows; individual level spacing shrinks. In an infinite periodic chain, \\(E(k)=\\varepsilon_0-2t\\cos(ka)\\), connecting the model to Bloch waves.</p>'+
         '<div class="ss-equation">\\[E_j=\\varepsilon_0-2t\\cos\\!\\left(\\frac{j\\pi}{N+1}\\right),\\qquad E(k)=\\varepsilon_0-2t\\cos(ka)\\]</div>'+
         '<h5>3. Why can valence states be filled and conduction states empty?</h5>'+
         '<p>Real silicon has four valence electrons per atom and many orbital channels. This laboratory instead uses <b>two effective orbital families</b>: lower-energy bonding valence states and higher-energy antibonding conduction states. Each family has \\(N\\) spin-degenerate levels; each level can accommodate at most two electrons of opposite spin. With the appropriate electron count, the lower group is full and the upper group empty. <b>This is not a complete calculation of silicon orbitals, hybridization or crystal symmetry.</b></p>'+
         '<p class="ss-lab-note">Use the <b>Atomic levels to bands</b> lab to increase \\(N\\) from two atoms and then increase the separation to reduce overlap. At equilibrium spacing, the shown gap is calibrated to the reference material; the computed \\(E_g(r)\\) should not be read as an experimental pressure response.</p>'+
         '<details class="ss-question"><summary>Check: does the bandwidth grow without limit when more atoms are added?</summary><p>No. At fixed hopping \\(t\\), the width approaches \\(4t\\). Adding more atoms packs more allowed states into nearly the same interval.</p></details>'
    },
    dos:{
      tr:'<h5>1. E(k) grafiği, DOS grafiği değildir</h5>'+
         '<p>\\(E(k)\\) bir <b>kuantum durumunun enerjisinin dalga vektörüne bağlılığını</b> söyler. Durum yoğunluğu \\(g(E)\\) ise <b>enerji başına ve birim uzunluk/alan/hacimde kaç farklı durum bulunduğunu</b> sayar. Aynı enerjiye farklı \\(\\mathbf{k}\\) noktaları karşılık gelebilir. Bu nedenle sadece bir \\(E(k)\\) eğrisinin dikey uzunluğunu ölçerek durum yoğunluğu elde edilemez: k-uzayındaki noktaları saymak gerekir.</p>'+
         '<h5>2. k-uzayından enerjiye durum sayma</h5>'+
         '<p>İzotropik parabolik bir bant kenarında \\(E(\\mathbf{k})-E_c=\\hbar^2 k^2/(2m^*)\\) olur. \\(d\\) boyutta enerjisi \\(E\\) altında kalan durum sayısı, k-uzayındaki \\(d\\) boyutlu küreye karşılık gelir: \\(\\mathcal{N}_d(E)\\propto k^d\\propto(E-E_c)^{d/2}\\). Bunun türevi enerjiye göre durum yoğunluğunu verir:</p>'+
         '<div class="ss-equation">\\[g_d(E)=\\frac{d\\mathcal{N}_d}{dE}\\propto(E-E_c)^{\\frac d2-1},\\quad \\begin{cases}d=1:\\ (E-E_c)^{-1/2}\\\\ d=2:\\ \\mathrm{sabit}\\\\ d=3:\\ (E-E_c)^{1/2}.\\end{cases}\\]</div>'+
         '<p><b>Şaşırtıcı sonuç:</b> Üç boyutta bant kenarında DOS sıfırdan başlar; iki boyutta bir basamak oluşur; bir boyutta ideal modelde bant kenarında tekillik (van Hove türü) vardır. Fark \\(E(k)\\) parabolünün değişmesinden değil, <b>saydığımız k noktalarının geometrisinden</b> kaynaklanır.</p>'+
         '<h5>3. Doluluk olasılığını ayrıca hesaplamak gerekir</h5>'+
         '<p>\\(g(E)\\), yalnızca kullanılabilir durumları sayar. Gerçek elektron yoğunluğu \\(n=\\int_{E_c}^{\\infty}g_c(E)f(E,T)\\,dE\\) integralidir. Etkin kütle \\(m^*\\), bant eğriliğini değiştirir; seçilen malzemedeki çoklu vadiler, anizotropi, kusurlar veya kuantum sınırlaması daha gelişmiş hesaplar gerektirir. Birinci haftanın diğer DOS ve Fermi–Dirac grafikleri bu ikinci aşamayı gösterir.</p>'+
         '<p class="ss-lab-note">Görsellerde <b>E(k) → DOS</b> deneyinde 1B, 2B ve 3B seçimi yapın: parabolik dispersiyon aynı tutulduğu halde durum sayısının enerjiyle değişimi farklılaşır. Kütleyi değiştirerek bant eğriliğini de karşılaştırın.</p>'+
         '<details class="ss-question"><summary>Kontrol sorusu: 3B DOS bant kenarında sıfırken elektronlar neden bant kenarına yerleşebilir?</summary><p>Belirli bir <i>tek enerji noktasındaki</i> diferansiyel DOS sıfır limitine gider, fakat bant kenarının hemen üstündeki her sonlu enerji aralığında pozitif sayıda durum vardır. Termal taşıyıcı yoğunluğu bir integraldir.</p></details>',
      en:'<h5>1. E(k) is not the same graph as DOS</h5>'+
         '<p>\\(E(k)\\) gives the <b>energy of a quantum state as a function of wave vector</b>. The DOS \\(g(E)\\) counts <b>how many states occur per energy and per unit length, area, or volume</b>. Many different \\(\\mathbf{k}\\) vectors may share the same energy. DOS therefore requires counting allowed k-space points, not just examining a vertical range of an \\(E(k)\\) plot.</p>'+
         '<h5>2. Counting states in k-space</h5>'+
         '<p>Near an isotropic parabolic band edge, \\(E(\\mathbf{k})-E_c=\\hbar^2k^2/(2m^*)\\). In \\(d\\) dimensions, the number of states below energy \\(E\\) is proportional to the volume of a \\(d\\)-dimensional k-space ball: \\(\\mathcal{N}_d(E)\\propto k^d\\propto(E-E_c)^{d/2}\\). Differentiation yields the DOS:</p>'+
         '<div class="ss-equation">\\[g_d(E)=\\frac{d\\mathcal{N}_d}{dE}\\propto(E-E_c)^{\\frac d2-1},\\quad \\begin{cases}d=1:\\ (E-E_c)^{-1/2}\\\\ d=2:\\ \\mathrm{constant}\\\\ d=3:\\ (E-E_c)^{1/2}.\\end{cases}\\]</div>'+
         '<p><b>Surprising result:</b> In 3D DOS vanishes at the edge; in 2D it steps to a constant; in ideal 1D it has a band-edge singularity (van Hove type). The dispersion curve can be identical: <b>it is the geometry of k-space counting that changes</b>.</p>'+
         '<h5>3. Occupation probability is a separate step</h5>'+
         '<p>\\(g(E)\\) counts available states. Actual electron density requires \\(n=\\int_{E_c}^{\\infty}g_c(E)f(E,T)\\,dE\\). Effective mass \\(m^*\\) changes band curvature. Real materials may have multiple valleys, anisotropy, defects or quantum confinement that require more advanced models. Other Week 1 DOS and Fermi–Dirac plots show the occupancy step.</p>'+
         '<p class="ss-lab-note">In the <b>E(k) → DOS</b> lab, change dimensionality between 1D, 2D and 3D. The parabola stays the same while the energy dependence of DOS changes. Try changing mass to see how the parabola curvature changes.</p>'+
         '<details class="ss-question"><summary>Check: if 3D DOS vanishes at the band edge, how can electrons occupy near-edge states?</summary><p>The differential DOS tends to zero at an <i>individual energy point</i>, but any finite interval above the edge contains a positive number of states. Carrier density is an energy integral.</p></details>'
    }
  };
  function insertDeepExplanations(){
    [
      ['#course-topic-bloch-electron','bloch'],
      ['#course-note-bands','bands'],
      ['#course-topic-dos','dos']
    ].forEach(function(entry){
      var host=el(entry[0]);if(!host||host.querySelector('.ss-deep-explain'))return;
      var article=document.createElement('div');article.className='ss-deep-explain';
      article.innerHTML=EXPLAINS[entry[1]][lang==='en'?'en':'tr'];host.appendChild(article);
    });
  }
  function range(key,description,min,max,step){
    return '<label>'+description+'<input type="range" data-ss-input="'+key+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+values[key]+'"><output data-ss-output="'+key+'"></output></label>';
  }
  function choose(key,description,opts){
    return '<label>'+description+'<select data-ss-input="'+key+'">'+opts.map(function(p){return '<option value="'+p[0]+'">'+p[1]+'</option>';}).join('')+'</select></label>';
  }
  function panel(id){return '<div data-ss-plot="'+id+'" class="ss-plot" role="img" aria-label="'+id+'"></div>';}
  function lab(title,intro,control,readout,charts,limit){
    var a=document.createElement('section');a.className='fig';
    a.innerHTML='<div class="ss-lab-title">'+tr('FİZİK LABORATUVARI','PHYSICS LAB')+'</div>'+
      '<h3>'+title+'</h3><p class="why">'+intro+'</p>'+
      '<div class="ss-controls">'+control+'</div>'+
      '<div class="ss-readout" data-ss-output-area="'+readout+'" aria-live="polite"></div>'+charts+
      '<p class="ss-limits">'+limit+'</p>';
    return a;
  }
  function createLabs(){
    var group=document.createElement('div');group.className='ss-lab';
    group.appendChild(lab(
      tr('1. Bloch dalgası: aynı hücre şekli, farklı faz','1. Bloch wave: repeated unit cell with a phase shift'),
      tr('Atomlar arası mesafe a ile ölçeklenmiş bir boyutlu periyodik zincirde dalganın gerçek kısmını, periyodik Bloch çarpanını ve olasılık yoğunluğunu karşılaştırın.',
         'Compare the real Bloch wave, its periodic factor, and its probability density on a 1D periodic chain with positions normalized by lattice spacing a.'),
      range('k',tr('Dalga vektörü k / (π/a)','Wave vector k / (π/a)'),-1,1,0.05)+
      range('width',tr('Orbital yayılımı σ/a','Orbital spread σ/a'),0.16,0.45,0.01)+
      range('vg',tr('Periyodik potansiyel karışımı |Vᴳ| (eV)','Periodic-potential coupling |Vᴳ| (eV)'),0,0.5,0.01),
      'bloch',panel('bloch')+
      '<p class="why"><b>'+tr('Bragg sınırında enerji ayrışması:','Band splitting at the Bragg boundary:')+'</b> '+tr('Birinci Brillouin sınırındaki iki düzlem dalgasının etkileşimi, iki enerji kolu arasına yasak aralık açabilir.','Coupling two plane waves at the first Brillouin-zone edge can open a gap between two energy branches.')+'</p>'+panel('bragg'),
      tr('Şematik 1B Bloch toplamı: komşu hücrelerde aynı Gauss-tipi yerel orbital, faz çarpanı exp(ikna). Kenar etkisini azaltmak için çizim aralığının dışındaki atomlar da hesaba katılır; bu gerçek Si dalga fonksiyonu veya Schrödinger özdeğer çözümü değildir. Bragg grafiği de yaklaşık iki-düzlem-dalga modelidir; boşluk Δ=2|Vᴳ| olup gerçek kristalin bant aralığı değildir.',
         'Illustrative 1D Bloch sum: repeating Gaussian-like orbitals with phases exp(ikna). Atoms beyond the plot window suppress edge artefacts. This is not a real Si wavefunction or solved Schrödinger eigenstate. The Bragg chart is a two-plane-wave approximation; Δ=2|Vᴳ| is not a measured material band gap.')
    ));
    group.appendChild(lab(
      tr('2. Ayrık atomik seviyelerden izinli bantlara','2. From discrete atomic levels to allowed bands'),
      tr('Atom sayısını artırınca iki etkin orbital ailesindeki enerji seviyeleri sıklaşır. Atom uzaklığını artırmak yakın komşu etkileşimini azaltır ve bant genişliğini daraltır.',
         'More atoms produce increasingly dense energy levels in two effective orbital families. Increasing separation weakens nearest-neighbour coupling and narrows the bands.'),
      choose('material',tr('Referans malzeme','Reference material'),[['si','Si'],['ge','Ge'],['gaas','GaAs']])+
      range('n',tr('Atom sayısı N','Number of atoms N'),2,160,1)+
      range('ratio',tr('Uzaklık r/r₀','Separation r/r₀'),1,1.9,0.01),
      'levels',panel('levels'),
      tr('N atomlu açık uçlu iki-etkin-orbital tight-binding modeli (spin dejenereliği ayrıca belirtilir). Denge noktasında bant aralığı 300 K malzeme referansına eşlenmiştir. Şemadaki bağımsız iki orbital kanalı, gerçek Si sp³ hibritleşmesi ya da E(k) çoklu vadi hesabı değildir.',
         'Finite open-chain, two-effective-orbital tight-binding model (spin degeneracy noted separately). The equilibrium gap is calibrated to a 300 K reference. Two independent channels are not a calculation of real Si sp³ hybridization or multivalley E(k).')
    ));
    group.appendChild(lab(
      tr('3. E(k) eğrisinden 1B / 2B / 3B durum yoğunluğuna','3. From E(k) to 1D / 2D / 3D density of states'),
      tr('Aynı parabolik dağılımın altında kalan k-uzayı durumlarının sayısı boyuta bağlıdır. Boyutu değiştirerek DOS şeklini, etkin kütleyi değiştirerek parabol eğriliğini inceleyin.',
         'The number of k-states below a parabolic dispersion depends on dimension. Change dimension to see the DOS exponent and change effective mass to see band curvature.'),
      choose('dimension',tr('Sistem boyutu','System dimension'),[['1','1B / 1D'],['2','2B / 2D'],['3','3B / 3D']])+
      range('mass',tr('İzotropik etkin kütle m*/m₀','Isotropic effective mass m*/m₀'),0.1,1.2,0.02)+
      range('probe',tr('İncelenen enerji E−Eᶜ (eV)','Probe energy E−Eᶜ (eV)'),0.02,0.60,0.01),
      'ekdos','<div class="ss-side-by-side">'+panel('dispersion')+panel('dimdos')+'</div>',
      tr('İdeal izotropik parabolik bant ve tek vadi modeli; spin iki katlı sayılır. DOS eğrisi yalnızca ŞEKİL karşılaştırması için 0,20 eV noktasında normalize edilmiştir. Sayısal durum yoğunluğu ise boyuta özgü cm⁻ᵈ eV⁻¹ birimleriyle verilir. 1B sıfırdaki tekillik sonlu enerji örneklemesiyle kesilir.',
         'Ideal isotropic parabolic single-valley band; spin degeneracy included. DOS curves are normalized at 0.20 eV only for SHAPE comparison. Numeric DOS retains dimensional units cm⁻ᵈ eV⁻¹. The 1D band-edge singularity is truncated by finite sampling.')
    ));
    return group;
  }
  function blochAt(x,k,sigma){
    var re=0,im=0;
    for(var n=-12;n<=24;n++){
      var z=(x-n)/sigma,amp=Math.exp(-.5*z*z),phase=k*n;
      re+=amp*Math.cos(phase);im+=amp*Math.sin(phase);
    }
    return {re:re,im:im};
  }
  function blochData(){
    var x=[],real=[],periodic=[],density=[],ratio=values.k,k=Math.PI*ratio;
    for(var i=0;i<=600;i++){
      var v=-.5+i*12/600,w=blochAt(v,k,values.width),c=Math.cos(k*v),s=Math.sin(k*v);
      x.push(v);real.push(w.re);periodic.push(w.re*c+w.im*s);density.push(w.re*w.re+w.im*w.im);
    }
    var a=4.21,p=blochAt(a,k,values.width),q=blochAt(a+1,k,values.width);
    var rhsRe=p.re*Math.cos(k)-p.im*Math.sin(k),rhsIm=p.re*Math.sin(k)+p.im*Math.cos(k);
    var err=Math.hypot(q.re-rhsRe,q.im-rhsIm)/Math.max(1e-9,Math.hypot(p.re,p.im));
    var lineShapes=[];for(var site=0;site<12;site++)
      lineShapes.push({type:'line',x0:site,x1:site,y0:0,y1:1,yref:'paper',line:{color:col('--rule','#cbd3dc'),width:1,dash:'dot'}});
    draw('bloch',[
      trace(tr('Re ψₖ(x) — Bloch dalgası','Re ψₖ(x) — Bloch wave'),x,real,col('--elec','#2b5fd9')),
      trace(tr('Re uₖ(x) — periyodik çarpan','Re uₖ(x) — periodic factor'),x,periodic,col('--hole','#c8354a')),
      trace('|ψₖ(x)|²',x,density,col('--fermi','#1f8a5b'),{yaxis:'y2',line:{color:col('--fermi','#1f8a5b'),width:2.2,dash:'dash'}})
    ],{
      xaxis:{title:'x/a',range:[-.5,11.5],gridcolor:col('--rule','#cbd3dc')},
      yaxis:{title:tr('Dalga genliği (göreli)','Wave amplitude (relative)'),gridcolor:col('--rule','#cbd3dc')},
      yaxis2:{title:'|ψ|²',overlaying:'y',side:'right',rangemode:'tozero',showgrid:false},
      shapes:lineShapes,margin:{l:65,r:65,t:30,b:72}
    });
    var ro=el('[data-ss-output-area="bloch"]');
    if(ro)ro.innerHTML='<b>k = '+num(ratio,2)+' π/a</b> · ka = '+num(180*ratio,0)+'° · '+
      tr('Komşu hücre fazı: ','Cell-to-cell phase: ')+'e<sup>ika</sup> · '+
      tr('İç bölgede Bloch eşitliği sayısal hatası: ','Numerical Bloch relation error in the interior: ')+err.toExponential(1);
  }

  // Nearly-free electron: two plane-wave basis states coupled by V_G.
  // k is measured in π/a; G=2π/a. This is a local two-wave approximation.
  function braggBands(vg){
    var q=[],lower=[],upper=[],alpha=0.45;
    for(var i=0;i<=220;i++){
      var ki=i*2/220,e1=alpha*ki*ki,e2=alpha*(ki-2)*(ki-2);
      var middle=(e1+e2)/2,delta=(e1-e2)/2,split=Math.hypot(delta,vg);
      q.push(ki);lower.push(middle-split);upper.push(middle+split);
    }
    return {q:q,lower:lower,upper:upper,gap:2*vg};
  }
  function braggData(){
    var spectrum=braggBands(values.vg);
    var lower=col('--hole','#c8354a'),upper=col('--elec','#2b5fd9'),ink=col('--ink','#16202b');
    draw('bragg',[
      trace(tr('Alt enerji kolu','Lower energy branch'),spectrum.q,spectrum.lower,lower),
      trace(tr('Üst enerji kolu','Upper energy branch'),spectrum.q,spectrum.upper,upper)
    ],{
      xaxis:{title:'k / (π/a)',range:[0,2],gridcolor:col('--rule','#ccd6de')},
      yaxis:{title:tr('Enerji (model eV)','Energy (model eV)'),gridcolor:col('--rule','#ccd6de'),range:[0,2]},
      shapes:[{type:'line',x0:1,x1:1,y0:0,y1:1,yref:'paper',line:{color:ink,dash:'dash',width:1.4}}],
      annotations:[{x:1,y:.45,showarrow:false,text:'Δ = 2|Vᴳ| = '+num(spectrum.gap,2)+' eV',yshift:-18,font:{size:12}}],
      margin:{l:62,r:20,t:36,b:63}
    });
    var readout=el('[data-ss-output-area="bloch"]');
    if(readout)readout.innerHTML+=' · '+tr('Bragg sınırındaki model bant boşluğu: ','Model Bragg gap: ')+num(spectrum.gap,2)+' eV';
  }
  function tightBindingSpectrum(key,n,ratio){
    var m=MATERIALS[key],r=m.r0*ratio,
      t=T0*Math.exp(-2.8*(ratio-1)),delta=m.eg+4*T0,
      valence=[],conduction=[];
    for(var j=1;j<=n;j++){
      var shift=-2*t*Math.cos(j*Math.PI/(n+1));
      valence.push(-delta/2+shift);
      conduction.push(delta/2+shift);
    }
    var valenceTop=valence[n-1],conductionBottom=conduction[0];
    return {material:m,r:r,t:t,delta:delta,valence:valence,conduction:conduction,
      gap:conductionBottom-valenceTop,bandwidth:valenceTop-valence[0],
      gapBulk:delta-4*t,valenceTop:valenceTop,conductionBottom:conductionBottom};
  }
  function levelsData(){
    var n=values.n,model=tightBindingSpectrum(values.material,n,values.ratio),
      m=model.material,r=model.r,t=model.t,delta=model.delta,
      gap=model.gap,bw=model.bandwidth,
      valenceTop=model.valenceTop,conductionBottom=model.conductionBottom,
      valx=[],valy=[],conx=[],cony=[];
    for(var j=0;j<n;j++){
      var eV=model.valence[j],eC=model.conduction[j];
      valx.push(.24,.88,null);valy.push(eV,eV,null);
      conx.push(1.12,1.76,null);cony.push(eC,eC,null);
    }
    var val=col('--hole','#c8354a'),cond=col('--elec','#2b5fd9'),fermi=col('--fermi','#1f8a5b');
    draw('levels',[
      trace(tr('Değerlik — N izinli seviye','Valence — N allowed levels'),valx,valy,val,{line:{color:val,width:n>55?1.4:2}}),
      trace(tr('İletim — N izinli seviye','Conduction — N allowed levels'),conx,cony,cond,{line:{color:cond,width:n>55?1.4:2}})
    ],{
      xaxis:{tickvals:[.56,1.44],ticktext:[tr('Değerlik (bağlayıcı)','Valence (bonding)'),tr('İletim (karşıt bağlayıcı)','Conduction (antibonding)')],range:[0,2],gridcolor:col('--rule','#cbd3dc')},
      yaxis:{title:tr('Enerji, E (göreli eV)','Energy, E (relative eV)'),range:[-delta/2-2*T0-.5,delta/2+2*T0+.5],gridcolor:col('--rule','#cbd3dc')},
      shapes:[
        {type:'rect',xref:'paper',x0:0,x1:1,y0:valenceTop,y1:conductionBottom,fillcolor:'rgba(31,138,91,.07)',line:{width:0}},
        {type:'line',xref:'paper',x0:0,x1:1,y0:0,y1:0,line:{color:fermi,width:1,dash:'dot'}}
      ],
      annotations:[{xref:'paper',x:0.5,y:gap/2,showarrow:false,text:'Eg(N) = '+num(gap,2)+' eV',font:{size:13,color:fermi}}],
      margin:{l:69,r:20,t:34,b:75}
    });
    var ro=el('[data-ss-output-area="levels"]');
    if(ro)ro.innerHTML=m.name+' · <b>N = '+n+'</b> · r₀ = '+num(m.r0,2)+' Å · r = '+num(r,2)+' Å · '+
      '<b>t = '+num(t,3)+' eV</b> · '+
      tr('Her bantta izinli düzey: ','Allowed levels in each band: ')+n+' · '+
      tr('Bant genişliği: ','Bandwidth: ')+num(bw,3)+' eV · '+
      'Eg(N) = '+num(gap,3)+' eV · '+
      tr('N→∞ modeli için Eg = ','For N→∞, model Eg = ')+num(delta-4*t,3)+' eV';
  }
  function numericDOS(energy,mass,dim){
    var a=HBAR2_OVER_2M0/mass;
    if(energy<=0)return dim===1?Infinity:dim===2?1/(2*Math.PI*a)*1e14:0;
    if(dim===1)return 1/(Math.PI*Math.sqrt(a*energy))*1e7;
    if(dim===2)return 1/(2*Math.PI*a)*1e14;
    return Math.sqrt(energy)/(2*Math.PI*Math.PI*Math.pow(a,1.5))*1e21;
  }
  function dispersionData(){
    var mass=values.mass, dim=values.dimension, a=HBAR2_OVER_2M0/mass,
      kmax=5,ks=[],en=[],eng=[],normalized=[];
    for(var i=0;i<=220;i++){
      var k=-kmax+i*2*kmax/220;ks.push(k);en.push(a*k*k);
    }
    for(var j=0;j<=240;j++){
      var energy=.004+j*(.746/240);
      var ratio=energy/.2, g=Math.pow(ratio,dim/2-1);
      eng.push(energy);normalized.push(g);
    }
    var blue=col('--elec','#2b5fd9'),green=col('--fermi','#1f8a5b'),rule=col('--rule','#ccd6de');
    draw('dispersion',[
      trace('E(k) = ℏ²k²/(2m*)',ks,en,blue,{hovertemplate:'k = %{x:.2f} nm⁻¹<br>E−Ec = %{y:.3f} eV<extra></extra>'})
    ],{
      xaxis:{title:'k (nm⁻¹)',gridcolor:rule,range:[-kmax,kmax]},
      yaxis:{title:'E−Ec (eV)',gridcolor:rule,range:[0,1.05]},
      shapes:[{type:'line',x0:-kmax,x1:kmax,y0:values.probe,y1:values.probe,line:{color:green,width:1.5,dash:'dash'}}],
      margin:{l:61,r:15,t:30,b:58},showlegend:false
    });
    draw('dimdos',[
      trace(tr(dim+'B durum yoğunluğu (normalize)','Normalized '+dim+'D DOS'),normalized,eng,green,{
        hovertemplate:'g/g(0.20 eV) = %{x:.3f}<br>E−Ec = %{y:.3f} eV<extra></extra>'})
    ],{
      xaxis:{title:'g(E)/g(Ec+0.20 eV)',gridcolor:rule,range:[0,Math.max(3.7,Math.min(7.5,Math.pow(.004/.2,dim/2-1)*1.03))]},
      yaxis:{title:'E−Ec (eV)',gridcolor:rule,range:[0,.79]},
      shapes:[{type:'line',xref:'paper',x0:0,x1:1,y0:values.probe,y1:values.probe,line:{color:blue,width:1.5,dash:'dash'}}],
      margin:{l:61,r:16,t:30,b:58},showlegend:false
    });
    var units=dim===1?'cm⁻¹ eV⁻¹':dim===2?'cm⁻² eV⁻¹':'cm⁻³ eV⁻¹';
    var g=numericDOS(values.probe,mass,dim);
    var selectedk=Math.sqrt(values.probe/a);
    var ro=el('[data-ss-output-area="ekdos"]');
    if(ro)ro.innerHTML='<b>'+dim+(lang==='en'?'D':'B')+'</b> · m*/m₀ = '+num(mass,2)+' · '+
      tr('İncelenen enerji: ','Probe energy: ')+num(values.probe,2)+' eV · '+
      '|k| = '+num(selectedk,2)+' nm⁻¹ · '+
      'g(E) = <b>'+g.toExponential(3)+'</b> '+units+' · '+
      tr('Enerji üssü: ','Energy exponent: ')+num(dim/2-1,1);
  }
  function updateControls(){
    if(!root)return;
    root.querySelectorAll('[data-ss-input]').forEach(function(input){
      var key=input.dataset.ssInput;input.value=values[key];
      var out=root.querySelector('[data-ss-output="'+key+'"]');if(!out)return;
      out.textContent=key==='k'?num(values[key],2)+' π/a':
        key==='width'?num(values[key],2)+' a':
        key==='vg'?num(values[key],2)+' eV':
        key==='ratio'?num(values[key],2)+' r₀':
        key==='mass'?num(values[key],2)+' m₀':
        key==='probe'?num(values[key],2)+' eV':
        key==='n'?String(values[key]):'';
    });
  }
  function visualActive(){
    return Boolean(root&&root.isConnected&&root.querySelector('.pane[data-pane="gorsel"].active'));
  }
  function render(target){
    if(!visualActive())return;
    updateControls();
    if(!target||target==='bloch'){blochData();braggData();}
    if(!target||target==='levels')levelsData();
    if(!target||target==='ekdos')dispersionData();
  }
  function mount(main,language){
    root=main;lang=language==='en'?'en':'tr';
    insertDeepExplanations();
    var pane=main.querySelector('.pane[data-pane="gorsel"]');
    if(!pane||pane.querySelector('.ss-lab'))return;
    var labs=createLabs();
    pane.insertBefore(labs,pane.querySelector('.sf-interactive')||pane.querySelector('section.fig'));
    labs.querySelectorAll('[data-ss-input]').forEach(function(input){
      var key=input.dataset.ssInput;
      input.value=values[key];
      input.addEventListener(input.tagName==='SELECT'?'change':'input',function(){
        values[key]=(key==='material')?input.value:Number(input.value);
        var group=(key==='k'||key==='width'||key==='vg')?'bloch':(key==='n'||key==='ratio'||key==='material')?'levels':'ekdos';
        render(group);
      });
    });
    updateControls();
  }
  window.SolidStateFoundations={
    mount:mount,render:render,
    // Expose small deterministic model primitives for regression testing.
    _test:{blochAt:blochAt,braggBands:braggBands,numericDOS:numericDOS,tightBindingSpectrum:tightBindingSpectrum,hbarCoefficient:HBAR2_OVER_2M0}
  };
})();