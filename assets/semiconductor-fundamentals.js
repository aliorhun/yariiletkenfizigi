/* Interactive, explicitly educational semiconductor models; no extra dependencies. */
(function () {
  'use strict';
  var KB = 8.617333262145e-5;  // eV/K
  var DOS_FACTOR = 6.812175922140805e21; // states cm^-3 eV^-3/2 for m*=m0, spin included
  // r0 is the nearest-neighbour bond distance, NOT the cubic lattice constant.
  // The effective DOS masses are approximate values near 300 K (incl. valley multiplicity where applicable).
  var MATERIALS = {
    si:   {name:'Si',   bond:2.35, eg:1.12, mc:1.08, mv:0.56, color:'#2b5fd9'},
    ge:   {name:'Ge',   bond:2.45, eg:0.66, mc:0.55, mv:0.37, color:'#a05bc7'},
    gaas: {name:'GaAs', bond:2.45, eg:1.42, mc:0.067,mv:0.50, color:'#d47722'},
    gan:  {name:'GaN',  bond:1.95, eg:3.40, mc:0.20, mv:1.00, color:'#189f84'},
    sic:  {name:'4H-SiC',bond:1.89,eg:3.26, mc:0.42, mv:1.00, color:'#bd4a64'}
  };
  var state = {material:'si', ratio:1, dosOffset:0.16, bin:0.08, temp:450, probe:0.12};
  var root = null, language = 'tr';
  function en() { return language === 'en'; }
  function t(tr, english) { return en() ? english : tr; }
  function n(num, digits) { return Number(num).toFixed(digits); }
  function material() { return MATERIALS[state.material]; }
  function query(key) { return root && root.querySelector('[data-sf="' + key + '"]'); }
  function color(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function layout(overrides) {
    var ink=color('--ink','#16202b'), rule=color('--rule','#cfd6de');
    return Object.assign({
      paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)',
      font:{family:'Arial, sans-serif',size:12,color:ink},
      margin:{l:58,r:16,t:38,b:54}, autosize:true,
      xaxis:{gridcolor:rule,zerolinecolor:rule,automargin:true},
      yaxis:{gridcolor:rule,zerolinecolor:rule,automargin:true},
      legend:{orientation:'h',x:0,y:-0.24},
      hovermode:'closest', showlegend:true
    }, overrides || {});
  }
  var config={responsive:true,displaylogo:false,scrollZoom:false,modeBarButtonsToRemove:['lasso2d','select2d','autoScale2d']};
  function plot(target, traces, options) {
    var el=query(target);
    if (!el) return;
    if (!window.Plotly) {
      el.textContent=t('Grafik kütüphanesi yüklenemedi. İnternet bağlantısını kontrol edin.','Chart library unavailable. Check your internet connection.');
      return;
    }
    window.Plotly.react(el,traces,layout(options),config);
  }
  function line(name,x,y,stroke,extra) {
    return Object.assign({type:'scatter',mode:'lines',name:name,x:x,y:y,line:{color:stroke,width:2.7}},extra || {});
  }
  function h(html) { return html.join(''); }
  function matSelect() {
    var options=Object.keys(MATERIALS).map(function(k){return '<option value="'+k+'">'+MATERIALS[k].name+'</option>';}).join('');
    return '<label>'+t('Malzeme','Material')+'<select class="sf-material" aria-label="'+t('Yarıiletken seç','Choose semiconductor')+'">'+options+'</select></label>';
  }
  function range(key,title,min,max,step,value) {
    return '<label>'+title+'<input data-sf-control="'+key+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"><output data-sf-out="'+key+'"></output></label>';
  }
  function panel(cls, key) { return '<div class="'+cls+'" data-sf="'+key+'" role="img" aria-label="'+key+'"></div>'; }
  function figure(title, intro, controls, readout, plots, note) {
    var el=document.createElement('section');
    el.className='fig sf-block';
    el.innerHTML=h([
      '<h3>',title,'</h3><p class="why">',intro,'</p>',
      '<div class="sf-controls">',controls,'</div>',
      '<div class="sf-readout" data-sf="',readout,'" aria-live="polite"></div>',
      plots,'<p class="sf-note">',note,'</p>'
    ]);
    return el;
  }
  function explanation() {
    var d=document.createElement('div');
    d.className='sf-explain';
    d.innerHTML=en() ? h([
      '<h4>From separate atoms to a crystal: why bands form</h4>',
      '<p>An isolated atom has discrete electron energies. When many atoms approach each other, their orbitals overlap; interactions and the Pauli principle create many closely spaced allowed levels called <b>bands</b>. The upper occupied states form the valence band and the lowest available upper states form the conduction band. The region between their edges has no bulk electronic states in an ideal crystal: the <b>band gap</b>.</p>',
      '<p><b>Equilibrium distance</b> is the separation at which the total energy of the interacting atoms is lowest. Too close means strong repulsion; too far means the bond becomes weak. The plots distinguish this <i>bond-energy minimum</i> from the <i>electron-energy bands</i>: they are not the same graph or energy quantity. Bond lengths differ between materials; the values are nearest-neighbour distances, not lattice constants.</p>',
      '<h4>Density of states (DOS): how many places are available?</h4>',
      '<p>At a given energy, the <b>density of states</b> g(E) counts available quantum states per volume and energy, not the number of occupied electrons. In the ideal, three-dimensional parabolic-band approximation, g<sub>c</sub>(E) is proportional to √(E−E<sub>c</sub>), while g<sub>v</sub>(E) is proportional to √(E<sub>v</sub>−E). Both vanish inside the gap. A finite thin energy interval contains approximately g(E)ΔE states; the tool calculates its exact integral.</p>',
      '<h4>Fermi–Dirac: which available states are occupied?</h4>',
      '<p>The probability of electron occupancy of a single state at energy E is <b>f(E,T)=1/[1+exp((E−E<sub>F</sub>)/(k<sub>B</sub>T))]</b>. At E=E<sub>F</sub> the probability is 1/2 for any T&gt;0; at 0 K it is a sharp step. As temperature increases, the step is smeared out, but the total population also depends on the available DOS. Electron density follows n=∫g<sub>c</sub>(E)f(E,T)dE; hole density uses 1−f in the valence band.</p>',
      '<h4>When may we use Boltzmann instead?</h4>',
      '<p>Far above E<sub>F</sub>, exp((E−E<sub>F</sub>)/k<sub>B</sub>T) dominates 1, so f≈exp(−(E−E<sub>F</sub>)/k<sub>B</sub>T). This is the <b>nondegenerate Boltzmann approximation</b>, not a second independent distribution. At E−E<sub>F</sub>≥3k<sub>B</sub>T its relative overestimate is at most exp(−3)≈4.98%. Below E<sub>F</sub> this electron-tail approximation must not be used. A similar approximation for holes applies sufficiently below E<sub>F</sub>.</p>'
    ]) : h([
      '<h4>Tek atomdan kristale: enerji bantları neden oluşur?</h4>',
      '<p>Tek başına bir atomun elektronları yalnızca belirli, <b>kesikli enerjilerde</b> bulunabilir. Çok sayıda atom yaklaşıp orbitalleri örtüştüğünde etkileşimler ve Pauli ilkesi nedeniyle birbirine çok yakın çok sayıda izinli düzey oluşur; bunlara <b>enerji bandı</b> denir. En üst dolu durumlar değerlik bandını, üstteki kullanılabilir durumlar iletim bandını oluşturur. İdeal kristalde iki bant kenarı arasında hacimsel elektron durumu bulunmayan bölge <b>yasak enerji aralığıdır</b>.</p>',
      '<p><b>Denge uzaklığı</b>, etkileşen atomların toplam enerjisinin en düşük olduğu mesafedir. Atomlar çok yaklaşırsa itme artar; çok uzaklaşırsa bağ zayıflar. Aşağıdaki iki grafiğin enerji kavramları farklıdır: bağın <i>toplam potansiyel enerjisi</i> ile elektronların <i>bant enerjileri</i> aynı büyüklük değildir. Verilen mesafeler örgü sabiti değil, en yakın komşu atom uzaklıklarıdır.</p>',
      '<h4>Durum yoğunluğu (DOS): kaç tane yer var?</h4>',
      '<p><b>Durum yoğunluğu</b> g(E), belirli bir enerji çevresinde birim hacim ve enerji başına <i>kaç kuantum durumu bulunduğunu</i> söyler; bu durumların kaçının elektronla dolu olduğunu söylemez. İdeal üç boyutlu parabolik bant yaklaşımında iletim için g<sub>c</sub>(E) ∝ √(E−E<sub>c</sub>), değerlik için g<sub>v</sub>(E) ∝ √(E<sub>v</sub>−E) olur. Yasak aralıkta her ikisi de sıfırdır. Dar bir ΔE aralığında yaklaşık g(E)ΔE durum vardır; simülasyon tam integrali hesaplar.</p>',
      '<h4>Fermi–Dirac: bu yerlerden kaçı dolu?</h4>',
      '<p>Enerjisi E olan bir durumun elektronla dolu olma olasılığı <b>f(E,T)=1/[1+exp((E−E<sub>F</sub>)/(k<sub>B</sub>T))]</b> bağıntısıyla verilir. E=E<sub>F</sub> için T&gt;0 iken olasılık %50’dir; 0 K’de keskin bir basamak görülür. Sıcaklık yükseldikçe geçiş yumuşar. Ancak elektron sayısı yalnızca bu olasılığa değil, mevcut durumlara da bağlıdır: <b>n=∫g<sub>c</sub>(E)f(E,T)dE</b>. Holler için değerlik bandında 1−f kullanılır.</p>',
      '<h4>Boltzmann yaklaşımı ne zaman geçerli?</h4>',
      '<p>Enerji Fermi seviyesinin yeterince üzerindeyse üstel terim 1’den çok büyük olur ve <b>f≈exp(−(E−E<sub>F</sub>)/(k<sub>B</sub>T))</b> yazabiliriz. Bu, ayrı bir dağılım değil Fermi–Dirac’ın <b>dejenere olmayan sınırıdır</b>. E−E<sub>F</sub>≥3k<sub>B</sub>T koşulunda Boltzmann, gerçek olasılığı en fazla yaklaşık %4,98 fazla tahmin eder. Fermi seviyesinin altında elektronlar için bu kuyruk yaklaşımı kullanılamaz; holler için Fermi seviyesinin yeterince altında benzeri geçerlidir.</p>'
    ]);
    return d;
  }
  function makeFigures() {
    var container=document.createElement('div');
    container.className='sf-interactive';
    container.appendChild(figure(
      t('1. Atomlar yaklaşırken bantların oluşumu ve denge uzaklığı','1. Band formation and equilibrium atomic spacing'),
      t('Malzemeyi ve seçilen atomlar arası uzaklığı değiştirin. Solda izinli enerji bantlarının nitel olarak genişlemesini, sağda bağın toplam potansiyel enerji minimumunu karşılaştırın.',
        'Choose the material and atomic separation. Compare the qualitative widening of electronic bands (left) with the bond potential minimum (right).'),
      matSelect()+range('ratio','r / r₀',0.98,2.10,0.01,1.00),'bandread',
      '<div class="sf-pair">'+panel('sf-plot','bands')+panel('sf-plot','bonds')+'</div>',
      t('Fiziksel sınır: Bant şeması üst/alt kenarları göstermek için kurulmuş üstel örtüşme modelidir, DFT veya gerçek E(k) hesabı değildir. Denge kuyuları normalize Morse eğrileridir; derinlikleri ve eğrilikleri deneysel bağ enerjisi değildir. Uzak mesafedeki iki düzey gerçek Si 3s/3p atom spektrumu olarak yorumlanmamalıdır.',
        'Model limit: band widths use a schematic exponential overlap, not DFT or measured E(k). Bond potentials are normalized Morse wells, not measured bond energies or force constants. Far-separated levels are not the literal Si 3s/3p atomic spectrum.')
    ));
    container.appendChild(figure(
      t('2. Durum yoğunluğu: enerji aralığında kaç durum var?','2. Density of states: how many states per energy interval?'),
      t('Malzeme, etkin kütleler ve seçili enerji aralığı değiştikçe DOS ve mavi bant dilimindeki toplam durum sayısını izleyin. Dikey eksen enerjidir; yatay eksen durum yoğunluğudur.',
        'Change the material and the selected energy bin. The blue slice represents the number of available conduction-band states in that interval. Energy is vertical, DOS horizontal.'),
      matSelect()+range('dosOffset',t('E−Eᶜ başlangıcı (eV)','E−Eᶜ start (eV)'),0.02,0.55,0.01,0.16)
       +range('bin',t('ΔE genişliği (eV)','ΔE width (eV)'),0.01,0.20,0.01,0.08),'dosread',
      panel('sf-plot','dos'),
      t('Hesap: 3B parabolik bant, spin dahil ve yaklaşık DOS etkin kütlesi; değerler 300 K bant aralığı ve kütle parametreleriyle hesaplanır. Kusur/tuzak durumları, 2B sistemler ve bant parabolünün ötesi bu modelde yoktur.',
        'Assumptions: 3D parabolic bands with spin and approximate DOS effective masses, using 300 K band gaps. Defect states, 2D systems and nonparabolicity are excluded.')
    ));
    container.appendChild(figure(
      t('3. Fermi–Dirac dağılımı ve Boltzmann sınırı','3. Fermi–Dirac occupancy and the Boltzmann limit'),
      t('Farklı sıcaklıklarda doluluk olasılığı eğrilerini izleyin. Yeşil eğri seçtiğiniz sıcaklıktır; kesikli eğri onun Boltzmann yaklaşımıdır. İmleç enerjisindeki gerçek olasılığı ve yaklaşım hatasını karşılaştırın.',
        'Compare occupancy at different temperatures. Green is your selected temperature; the dashed line is its Boltzmann tail. Probe a relative energy to see probability and approximation error.'),
      range('temp',t('Seçili sıcaklık (K)','Chosen temperature (K)'),50,800,10,450)
      +range('probe',t('E−Eᶠ (eV)','E−Eᶠ (eV)'),-0.20,0.30,0.01,0.12),'fermiread',
      panel('sf-plot','fermi'),
      t('0 K’de Fermi–Dirac bir basamak fonksiyonudur (E=Eᶠ tek noktasının değeri ölçülebilir bir olasılık değildir). Karşılaştırma E−Eᶠ ekseninde yapıldığı için malzeme seçiminden bağımsızdır; gerçek taşıyıcı yoğunluğu için mutlaka DOS ile çarpılıp integre edilmelidir.',
        'At 0 K occupancy is a step (the single E=Eᶠ point is immaterial). Relative-energy occupancy is material-independent; real carrier density requires integrating it with DOS.')
    ));
    return container;
  }
  function clampExp(x) { return Math.exp(Math.max(-700, Math.min(700,x))); }
  function occ(de,T) { if(T===0) return de<0?1:(de>0?0:0.5); return 1/(1+clampExp(de/(KB*T))); }
  function dos(de,mass) { return de<=0?0:DOS_FACTOR*Math.pow(mass,1.5)*Math.sqrt(de); }
  function plotBands() {
    var m=material(), r0=m.bond, eAtom=m.eg+4.4, x=[],vl=[],vu=[],cl=[],cu=[];
    for(var i=0;i<=140;i++){
      var r=r0*(0.98+(2.10-0.98)*i/140), w=2.2*Math.exp(-3.0*(r/r0-1));
      x.push(r); vl.push(-eAtom/2-w); vu.push(-eAtom/2+w);
      cl.push(eAtom/2-w); cu.push(eAtom/2+w);
    }
    var current=r0*state.ratio, wnow=2.2*Math.exp(-3*(state.ratio-1));
    var gap=eAtom-2*wnow;
    var cond=color('--elec','#2b5fd9'), val=color('--hole','#c8354a'), ink=color('--ink','#16202b');
    plot('bands',[
      line('',x,vl,val,{showlegend:false,hoverinfo:'skip',line:{width:1,color:val}}),
      line(t('Değerlik bandı','Valence band'),x,vu,val,{fill:'tonexty',fillcolor:'rgba(200,53,74,0.19)',hovertemplate:'r=%{x:.2f} Å<br>Eᵥ,üst=%{y:.2f} eV<extra></extra>'}),
      line('',x,cl,cond,{showlegend:false,hoverinfo:'skip',line:{width:1,color:cond}}),
      line(t('İletim bandı','Conduction band'),x,cu,cond,{fill:'tonexty',fillcolor:'rgba(43,95,217,0.17)',hovertemplate:'r=%{x:.2f} Å<br>Eᶜ,üst=%{y:.2f} eV<extra></extra>'})
    ],{
      title:{text:t('İzinli elektron enerjileri · şematik','Allowed electron energies · schematic'),font:{size:13}},
      shapes:[
        {type:'line',x0:r0,x1:r0,y0:0,y1:1,yref:'paper',line:{color:color('--fermi','#1f8a5b'),width:2,dash:'dash'}},
        {type:'line',x0:current,x1:current,y0:0,y1:1,yref:'paper',line:{color:ink,width:1.6,dash:'dot'}}
      ],
      annotations:[{x:r0,y:1,xref:'x',yref:'paper',text:'r₀',showarrow:false,yanchor:'bottom',font:{color:color('--fermi','#1f8a5b')}}],
      xaxis:{title:'r (Å)',gridcolor:color('--rule','#ddd'),range:[r0*.96,r0*2.15]},
      yaxis:{title:'E (eV) · '+t('göreli','relative'),gridcolor:color('--rule','#ddd')},
      margin:{l:53,r:12,t:53,b:56}
    });
    var colors=Object.keys(MATERIALS);
    var xx=[];for(var j=0;j<=160;j++)xx.push(1.55+(3.62-1.55)*j/160);
    var potentials=colors.map(function(k){
      var z=MATERIALS[k], a=4.6/z.bond;
      return line(z.name,xx,xx.map(function(r){var q=1-Math.exp(-a*(r-z.bond));return q*q-1;}),z.color,
        {line:{color:z.color,width:k===state.material?3.7:1.5,dash:k===state.material?'solid':'dot'},opacity:k===state.material?1:0.68,
         hovertemplate:'r=%{x:.2f} Å<br>U/D=%{y:.3f}<extra>'+z.name+'</extra>'});
    });
    potentials.push({type:'scatter',mode:'markers',x:colors.map(function(k){return MATERIALS[k].bond;}),
      y:colors.map(function(){return -1;}),marker:{size:9,color:colors.map(function(k){return MATERIALS[k].color;})},showlegend:false,
      hovertemplate:'r₀=%{x:.2f} Å<extra></extra>'});
    plot('bonds',potentials,{
      title:{text:t('Bağ potansiyeli · denge noktaları','Bond potential · equilibrium points'),font:{size:13}},
      xaxis:{title:'r (Å)',gridcolor:color('--rule','#ddd'),range:[1.52,3.65]},
      yaxis:{title:'U/D ('+t('normalize','normalized')+')',gridcolor:color('--rule','#ddd'),range:[-1.12,1.45]},
      margin:{l:53,r:12,t:53,b:56},
      legend:{orientation:'h',x:0,y:-0.26}
    });
    query('bandread').innerHTML=t('Malzeme: ','Material: ')+m.name+' · <b>r₀ = '+n(r0,2)+' Å</b> · r = '+n(current,2)+
      ' Å · <span class="sf-chip sf-chip-c">E<sub>g</sub>(r₀) = '+n(m.eg,2)+' eV</span> · '+
      t('Şematik E<sub>g</sub>(seçili r) = ','Schematic E<sub>g</sub>(selected r) = ')+n(gap,2)+' eV';
  }
  function plotDos() {
    var m=material(), ec=m.eg/2, ev=-ec;
    var energies=[], c=[], v=[], maxD=0, from=-ec-.8, to=ec+.8;
    for(var i=0;i<=240;i++){
      var E=from+(to-from)*i/240;
      var gc=dos(E-ec,m.mc)/1e21, gv=dos(ev-E,m.mv)/1e21;
      energies.push(E);c.push(gc);v.push(gv);maxD=Math.max(maxD,gc,gv);
    }
    var a=state.dosOffset,b=a+state.bin;
    var middle=(a+b)/2, sample=dos(middle,m.mc)/1e21;
    var integral=(2/3)*DOS_FACTOR*Math.pow(m.mc,1.5)*(Math.pow(b,1.5)-Math.pow(a,1.5));
    var cond=color('--elec','#2b5fd9'), val=color('--hole','#c8354a'),rule=color('--rule','#ddd');
    plot('dos',[
      line(t('İletim bandı gᶜ(E)','Conduction gᶜ(E)'),c,energies,cond,{fill:'tozerox',fillcolor:'rgba(43,95,217,0.11)',
        hovertemplate:'g=%{x:.3f} ×10²¹ cm⁻³ eV⁻¹<br>E=%{y:.2f} eV<extra></extra>'}),
      line(t('Değerlik bandı gᵛ(E)','Valence gᵛ(E)'),v,energies,val,{fill:'tozerox',fillcolor:'rgba(200,53,74,0.11)',
        hovertemplate:'g=%{x:.3f} ×10²¹ cm⁻³ eV⁻¹<br>E=%{y:.2f} eV<extra></extra>'})
    ],{
      title:{text:t('3B durum yoğunluğu · bant ortasına göre enerji','3D density of states · energy relative to midgap'),font:{size:13}},
      xaxis:{title:'g(E) (×10²¹ cm⁻³ eV⁻¹)',range:[0,maxD*1.13],gridcolor:rule},
      yaxis:{title:'E−Eₘᵢd (eV)',range:[from,to],gridcolor:rule},
      shapes:[
        {type:'rect',x0:0,x1:Math.max(sample*1.02,.04),y0:ec+a,y1:ec+b,
         fillcolor:'rgba(43,95,217,0.35)',line:{color:cond,width:1}},
        {type:'line',x0:0,x1:maxD*1.1,y0:ec,y1:ec,line:{color:cond,width:1.3,dash:'dash'}},
        {type:'line',x0:0,x1:maxD*1.1,y0:ev,y1:ev,line:{color:val,width:1.3,dash:'dash'}}
      ],
      annotations:[{xref:'paper',x:1,y:(ec+ev)/2,text:'Eᵍ = '+n(m.eg,2)+' eV',showarrow:false,xanchor:'right',font:{size:12}}],
      margin:{l:70,r:15,t:51,b:62}
    });
    query('dosread').innerHTML=m.name+' · E<sub>g</sub> = '+n(m.eg,2)+' eV · m<sub>c,DOS</sub>*/m₀ ≈ '+m.mc+
      ' · m<sub>v,DOS</sub>*/m₀ ≈ '+m.mv+
      ' · <span class="sf-chip sf-chip-c">∫ g<sub>c</sub>(E)dE = '+integral.toExponential(2)+' cm⁻³</span> '+
      t('(seçili ΔE içindeki kullanılabilir durumlar)','(available states within selected ΔE)');
  }
  function plotFermi() {
    var es=[], ts=[0,100,300,600], ink=color('--ink','#16202b'), green=color('--fermi','#1f8a5b'),rule=color('--rule','#ddd');
    for(var i=0;i<=220;i++)es.push(-0.35+0.80*i/220);
    var palette=['#687685','#3b83d4','#c0792a','#be475f'];
    var curves=ts.map(function(T,i){return line('T = '+T+' K',es.map(function(e){return occ(e,T);}),es,palette[i],{line:{color:palette[i],width:2,dash:T===0?'dash':'solid'}});});
    curves.push(line('T = '+state.temp+' K',es.map(function(e){return occ(e,state.temp);}),es,green,{line:{color:green,width:4}}));
    var boltz=es.map(function(e){return e<0?null:Math.exp(-e/(KB*state.temp));});
    curves.push(line(t('Boltzmann (seçili T)','Boltzmann (selected T)'),boltz,es,ink,{line:{color:ink,width:2.2,dash:'dot'}}));
    var boundary=3*KB*state.temp, real=occ(state.probe,state.temp), approx=Math.exp(-state.probe/(KB*state.temp));
    plot('fermi',curves,{
      title:{text:t('Eᶠ seviyesine göre elektron doluluk olasılığı','Electron occupancy relative to Eᶠ'),font:{size:13}},
      xaxis:{title:'f(E,T)',range:[0,1.01],gridcolor:rule},
      yaxis:{title:'E−Eᶠ (eV)',range:[-.35,.45],gridcolor:rule},
      shapes:[
        {type:'rect',xref:'paper',x0:0,x1:1,y0:boundary,y1:.45,fillcolor:'rgba(31,138,91,0.08)',line:{width:0}},
        {type:'line',xref:'paper',x0:0,x1:1,y0:0,y1:0,line:{color:ink,dash:'dash',width:1}},
        {type:'line',xref:'paper',x0:0,x1:1,y0:state.probe,y1:state.probe,line:{color:green,dash:'dot',width:1.5}}
      ],
      annotations:[{xref:'paper',x:1,y:boundary,text:'3kT',xanchor:'right',yanchor:'bottom',showarrow:false,font:{color:green,size:12}}],
      margin:{l:69,r:15,t:52,b:57}
    });
    var err=state.probe>=0?100*Math.exp(-state.probe/(KB*state.temp)):null;
    query('fermiread').innerHTML=
      'k<sub>B</sub>T = '+n(KB*state.temp*1000,1)+' meV · 3k<sub>B</sub>T = '+n(boundary,3)+' eV · '+
      '<span class="sf-chip sf-chip-f">f = '+real.toPrecision(4)+'</span> · '+
      t('Boltzmann tahmini: ','Boltzmann estimate: ')+(state.probe<0?t('geçersiz','invalid'):approx.toPrecision(4))+
      ' · '+t('Bağıl hata: ','Relative error: ')+(err===null?t('tanımsız (E<Eᶠ)','undefined (E<Eᶠ)'):n(err,2)+'%')+
      ' · <b>'+((err!==null&&err<5)?t('≤ %5: yaklaşım geçerli','≤ 5%: valid approximation'):t('>%5 / geçersiz bölge','>5% / invalid region'))+'</b>';
  }
  function updateOutputs() {
    if(!root)return;
    root.querySelectorAll('.sf-material').forEach(function(sel){sel.value=state.material;});
    root.querySelectorAll('[data-sf-control]').forEach(function(input) {
      var key=input.dataset.sfControl, out=root.querySelector('[data-sf-out="'+key+'"]');
      if(!out)return;
      out.textContent=key==='ratio'?n(state.ratio,2)+' × r₀':
        key==='temp'?state.temp+' K':
        key==='probe'?(state.probe>=0?'+':'')+n(state.probe,2)+' eV':
        n(state[key],2)+' eV';
    });
  }
  function render() {
    if(!root || !root.isConnected || !root.querySelector('.pane[data-pane="gorsel"].active'))return;
    updateOutputs();
    plotBands();plotDos();plotFermi();
  }
  function mount(main, lang) {
    root=main;language=lang==='en'?'en':'tr';
    var pane=main.querySelector('.pane[data-pane="gorsel"]');
    if(!pane || pane.querySelector('.sf-interactive'))return;
    var before=pane.querySelector('section.fig');
    var figures=makeFigures();
    pane.insertBefore(figures,before);
    var prose=main.querySelector('.pane[data-pane="anlatim"] .prose');
    if(prose){
      var h3=Array.from(prose.querySelectorAll('h3')).find(function(el){return /^1\.2\b/.test(el.textContent.trim());});
      if(h3)h3.insertAdjacentElement('afterend',explanation());
    }
    figures.querySelectorAll('.sf-material').forEach(function(sel){
      sel.value=state.material;
      sel.addEventListener('change',function(){state.material=sel.value;updateOutputs();render();});
    });
    figures.querySelectorAll('[data-sf-control]').forEach(function(input){
      input.value=state[input.dataset.sfControl];
      input.addEventListener('input',function(){
        state[input.dataset.sfControl]=Number(input.value);
        updateOutputs();render();
      });
    });
    updateOutputs();
  }
  window.SemiconductorFundamentals={mount:mount,render:render};
})();