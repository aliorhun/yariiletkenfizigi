/* Two-part course navigation and beginner-first chapter map.
 * No third-party dependencies. Week IDs, stored progress, and source templates remain stable.
 */
(function () {
  'use strict';
  var PHYSICS = new Set([1, 5, 19, 20]);
  var GROUPS = [
    {id:'physics',number:'I',tr:'Yarıiletken Fiziği',en:'Semiconductor Physics'},
    {id:'devices',number:'II',tr:'Yarıiletken Cihazları',en:'Semiconductor Devices'}
  ];
  function groupForWeek(n) { return PHYSICS.has(Number(n)) ? 'physics' : 'devices'; }
  function trEn(lang,tr,en) { return lang==='en'?en:tr; }
  function groupTitle(lang,id) {
    var g=GROUPS.find(function(v){return v.id===id;}) || GROUPS[0];
    return trEn(lang,g.tr,g.en);
  }
  function renderNavigation(nav,weeks,titleFor,lang,active,current,onWeek,onGroup) {
    var groups=document.getElementById('courseSections');
    if(!groups)return;
    groups.innerHTML='';
    groups.setAttribute('aria-label',trEn(lang,'Ana bölümler','Course parts'));
    GROUPS.forEach(function(g){
      var b=document.createElement('button');
      b.type='button';b.className='course-section-btn';b.dataset.course=g.id;
      b.setAttribute('aria-pressed',g.id===active?'true':'false');
      var num=document.createElement('span');num.className='course-section-number';num.textContent=g.number;
      var title=document.createElement('span');title.textContent=trEn(lang,g.tr,g.en);
      b.appendChild(num);b.appendChild(title);
      b.addEventListener('click',function(){onGroup(g.id);});
      groups.appendChild(b);
    });
    nav.innerHTML='';
    var visible=weeks.filter(function(w){return groupForWeek(w.n)===active;});
    visible.forEach(function(w,i){
      if(w.modern && (i===0||!visible[i-1].modern)){
        var caption=document.createElement('div');
        caption.className='week-group';
        caption.textContent=trEn(lang,'İleri konular','Advanced topics');
        nav.appendChild(caption);
      }
      var b=document.createElement('button');b.type='button';
      b.setAttribute('role','tab');b.dataset.week=String(w.n);
      b.setAttribute('aria-selected',String(w.n===current));
      var n=document.createElement('span');n.className='n';n.textContent=String(w.n);
      var label=document.createElement('span');label.className='t';label.textContent=titleFor(w);
      if(!w.ready){
        var soon=document.createElement('span');soon.className='soon';
        soon.textContent=trEn(lang,'hazırlanıyor','in preparation');label.appendChild(soon);
      }
      b.appendChild(n);b.appendChild(label);
      b.addEventListener('click',function(){onWeek(w.n);});
      nav.appendChild(b);
    });
  }
  var LESSONS=[
    ['crystal',       'Kristal yapı ve atomlar', 'Crystal structure and atoms','1.1'],
    ['bloch-electron','Kristal içindeki elektron','Electron in a crystal','crystal'],
    ['bands',         'Enerji band teorisi','Energy-band theory','1.2'],
    ['edges',         'Değerlik ve iletim bandı','Valence and conduction bands','bands'],
    ['dos',           'Enerji bantlarında durum yoğunluğu','Density of states','edges'],
    ['holes',         'Hol (boşluk) kavramı','The hole concept','1.3'],
    ['fermi',         'Fermi seviyesi ve olasılık','Fermi level and occupancy','1.4'],
    ['equilibrium',   'Elektron–hol dengesi','Electron–hole equilibrium','fermi'],
    ['doping',        'Has ve katkılı yarıiletkenler','Intrinsic and doped semiconductors','1.5'],
    ['transport',     'Taşıyıcı hareketi ve geçiş','Carrier transport and next steps','1.12']
  ];
  // All additions supplement (rather than replace) the original technical content.
  var NOTES={
    'bloch-electron':{
      tr:'<p><b>Atomdaki elektron</b> ile <b>kristaldeki elektron</b> aynı şekilde düşünülmemelidir. Tek bir atomda elektronlar ayrık orbitallerde bulunur. Düzenli bir kristalde ise elektronun dalga fonksiyonu bütün örgü boyunca yayılabilir. Bloch teoremi bu durumu \(\u005cpsi_{n\mathbf{k}}(\mathbf{r})=u_{n\mathbf{k}}(\mathbf{r})e^{i\mathbf{k}\cdot\mathbf{r}}\) biçiminde yazar.</p><p><b>Buradaki k nedir?</b> Kristal dalgasının dalga vektörüdür; \(\hbar\mathbf{k}\) kristal momentumu (kuazimomentum) ile ilişkilidir. Enerji \(E_n(\mathbf{k})\) ile ifade edilir. Elektron çekirdeğin çevresinde küçük bir gezegen gibi dönmez; dağılan bir kuantum dalgasıdır. Bu bakış, elektronun niçin iletilebildiğini ve etkin kütlenin nereden geldiğini anlamamızı sağlar.</p>',
      en:'<p>An <b>electron in an atom</b> is not best pictured the same way as an <b>electron in a crystal</b>. An isolated atom supports discrete orbitals; in a periodic crystal, electronic wavefunctions can extend across the lattice. Bloch’s theorem writes these as \(\u005cpsi_{n\mathbf{k}}(\mathbf{r})=u_{n\mathbf{k}}(\mathbf{r})e^{i\mathbf{k}\cdot\mathbf{r}}\).</p><p><b>What is k?</b> The wave vector associated with crystal quasi-momentum \(\hbar\mathbf{k}\). The band energy is \(E_n(\mathbf{k})\). Electrons do not orbit nuclei like tiny planets: they occupy quantum states. This picture explains transport and effective mass.</p>'
    },
    'bands':{
      tr:'<p><b>İlk düşünce deneyi:</b> Yan yana yalnızca iki özdeş atom koyduğumuzu düşünelim. İki atomun aynı enerjili düzeyleri etkileşimle farklı enerjilere ayrılabilir. Atom sayısı çok büyüdüğünde bu düzeyler çok sıklaşır ve bir enerji bandı oluşturur. Pauli dışarlama ilkesi, iki elektronun aynı kuantum durumunu aynı anda paylaşmasını engeller.</p><p><b>Önemli ayrım:</b> Bir bandın oluşması, elektronun otomatik olarak serbest taşıyıcı olması demek değildir. Taşınım, bandın doluluk durumuna ve erişilebilir yakın durumlara bağlıdır. Ayrıca bant aralığı yalnızca atomlar arası uzaklığa değil orbital örtüşmesine, kristal simetrisine ve malzemenin bağ yapısına bağlıdır.</p>',
      en:'<p><b>Thought experiment:</b> Start with two identical atoms. Interaction can split what were equal-energy atomic levels. With very many atoms, the densely packed allowed energies form a band. The Pauli exclusion principle prevents two electrons from occupying the same complete quantum state.</p><p><b>Important distinction:</b> Forming a band does not automatically create mobile carriers. Transport depends on which states are occupied and which nearby states are available. The band gap also depends on orbitals, symmetry and bonding—not on atomic separation alone.</p>'
    },
    'edges':{
      tr:'<p><b>Değerlik bandı</b>, ideal ve katkısız bir yarıiletkende 0 K’de en üstteki dolu bandı; <b>iletim bandı</b> ise onun üzerindeki ilk boş enerji bandını belirtir. Bu bantların sırasıyla üst ve alt kenarları \(E_v\) ve \(E_c\) olarak gösterilir. Aralarındaki fark \(E_g=E_c-E_v\) bant aralığıdır.</p><p>Elektron enerji kazanıp iletim bandına çıktığında kristali veya atomu terk etmesi gerekmez. <b>İletim bandında hareketli bir elektron</b> ve değerlik bandında <b>boş kalan bir durum (hol)</b> oluşabilir. Yasak aralık, ideal kristalde izinli hacimsel elektronik durumların bulunmadığı enerji bölgesidir; kusurlar bu aralıkta ek durumlar oluşturabilir.</p>',
      en:'<p>In an ideal intrinsic semiconductor at 0 K, the <b>valence band</b> is the highest occupied band and the <b>conduction band</b> is the next available higher band. Their edges are \(E_v\) and \(E_c\), and the gap is \(E_g=E_c-E_v\).</p><p>Exciting an electron into the conduction band does <b>not</b> mean removing it from the crystal. It can leave a mobile conduction electron and an <b>empty valence-band state (a hole)</b>. An ideal bulk gap contains no allowed states; defects may introduce gap states.</p>'
    },
    'dos':{
      tr:'<p><b>İki soru birbirinden farklıdır:</b> “Bu enerjide elektronun gidebileceği <i>kaç durum</i> var?” sorusunun cevabı <b>durum yoğunluğu \(g(E)\)</b>; “bu durumlardan <i>kaçı dolu</i>?” sorusunun cevabı <b>Fermi–Dirac olasılığı \(f(E)\)</b>dır.</p><p>Üç boyutlu parabolik bant yaklaşımında, iletim bandı kenarından yukarı doğru \(g_c(E)\propto (m^*_{\mathrm{DOS}})^{3/2}\sqrt{E-E_c}\) artar. Birim \( \mathrm{cm}^{-3}\,\mathrm{eV}^{-1}\) dir. İdeal yasak aralıkta durum yoğunluğu sıfırdır. <b>Elektron yoğunluğu</b> için iki kavramı çarpar, enerjide toplarız: \(n=\int_{E_c}^{\infty}g_c(E)f(E)\,dE\). Görseller sekmesinde malzeme ve \(\Delta E\) değişkenlerini deneyin.</p>',
      en:'<p><b>Two different questions:</b> “How many states <i>exist</i> at this energy?” is answered by the <b>density of states \(g(E)\)</b>. “What fraction is <i>occupied</i>?” is answered by the <b>Fermi–Dirac probability \(f(E)\)</b>.</p><p>Near a 3D parabolic conduction-band edge, \(g_c(E)\propto(m^*_{\mathrm{DOS}})^{3/2}\sqrt{E-E_c}\), with units of states per \(\mathrm{cm}^3\) and eV. The ideal gap has zero DOS. To obtain <b>electron concentration</b>, multiply and integrate: \(n=\int_{E_c}^{\infty}g_c(E)f(E)\,dE\). Explore the material and \(\Delta E\) controls in Visuals.</p>'
    },
    'holes':{
      tr:'<p><b>Hol gerçek bir proton değildir.</b> Değerlik bandında dolu olması beklenen bir kuantum durumunun boş kalmasını anlatan yararlı bir kuaziparçacık modelidir. Komşu bağlı elektron boş durumu doldurdukça boş durum ters yönde ilerliyormuş gibi davranır. Holün etkin elektrik yükü \(+q\) olarak tanımlanır; bu nedenle elektrik alan karşısında elektronlardan farklı yönde katkı verir.</p><p>Hol sayısı değerlik bandındaki <b>boş durumları</b> sayar: \(p=\int_{-\infty}^{E_v}g_v(E)[1-f(E)]\,dE\). Bir elektron–hol çiftinin üretilmesi kristalin elektriksel bakımdan yüksüzlüğünü kendiliğinden değiştirmez.</p>',
      en:'<p><b>A hole is not a literal proton.</b> It is a useful quasiparticle description of a missing electron in an otherwise occupied valence-band state. When neighbouring electrons fill the vacancy, the missing state appears to move in the opposite direction. The hole carries an effective charge \(+q\) for transport calculations.</p><p>The hole concentration counts <b>empty valence states</b>: \(p=\int_{-\infty}^{E_v}g_v(E)[1-f(E)]\,dE\). Creating an electron–hole pair does not by itself give the whole crystal net charge.</p>'
    },
    'fermi':{
      tr:'<p><b>Fermi seviyesi \(E_F\)</b>, ısıl dengedeki elektronların kimyasal potansiyelidir. Sıcaklık \(T>0\) iken enerji \(E=E_F\) için bir <i>mevcut</i> durumun elektronla dolu olma olasılığı %50’dir. Fermi seviyesi bant aralığında da bulunabilir; burada durum olmayabileceği için “Fermi seviyesinde mutlaka elektron bulunur” demek yanlıştır.</p><p>Olasılık \(f(E,T)=\frac{1}{1+\exp[(E-E_F)/(k_BT)]}\) ile hesaplanır. \(E_F\) iletim bandına yaklaştığında elektron, değerlik bandına yaklaştığında hol yoğunluğu artma eğilimindedir. \(E-E_F\gtrsim3k_BT\) olduğunda elektronlar için Boltzmann yaklaşımının bağıl hatası yaklaşık %5’in altındadır.</p>',
      en:'<p>The <b>Fermi level \(E_F\)</b> is the electron chemical potential at thermal equilibrium. At \(T>0\), an <i>available state</i> with \(E=E_F\) has a 50% probability of electron occupancy. The Fermi level can lie inside a gap where no state exists—so “an electron must be at the Fermi level” is wrong.</p><p>Occupancy obeys \(f(E,T)=\frac{1}{1+\exp[(E-E_F)/(k_BT)]}\). Moving \(E_F\) towards the conduction band generally raises electron density; moving it towards the valence band raises hole density. For \(E-E_F\gtrsim3k_BT\), the electron Boltzmann-tail approximation has less than about 5% relative error.</p>'
    },
    'equilibrium':{
      tr:'<p><b>Isıl denge</b> yalnızca “değerlerin zamanla değişmemesi” demek değildir: dışarıdan sürekli ışık, akım enjeksiyonu veya elektriksel zorlamayla sistem sürülmüyordur. Isıl dengede elektron üretimi ile yeniden birleşme dengededir ve tek bir \(E_F\) tanımlanır. <b>Kararlı durum</b> ise, sürekli aydınlatılan bir fotodiyotta olduğu gibi, dış etkiler sürerken de oluşabilir; bu durumda elektron ve holler için ayrı kuazi-Fermi seviyeleri gerekebilir.</p><p>Dejenere olmayan ısıl dengeli yarıiletkende <b>kütle etkisi yasası</b> \(np=n_i^2\) geçerlidir. Örneğin n tipi katkı elektron yoğunluğunu artırırsa aynı sıcaklıkta denge hol yoğunluğu azalır. Bu yasa kuvvetli aydınlatılmış dengeden uzak sistemlere doğrudan uygulanmaz.</p>',
      en:'<p><b>Thermal equilibrium</b> is more restrictive than “numbers no longer change”: the system is not continuously driven by light or current injection. Generation and recombination balance, and a single \(E_F\) applies. A <b>steady state</b> can also exist under constant illumination; then separate electron and hole quasi-Fermi levels may be necessary.</p><p>For a nondegenerate semiconductor at thermal equilibrium, the <b>mass-action law</b> is \(np=n_i^2\). Increasing equilibrium electron concentration by donor doping reduces hole concentration at the same temperature. Do not apply this rule unmodified under strong photoexcitation.</p>'
    },
    'doping':{
      tr:'<p><b>Has (öz/intrinsic) yarıiletken</b>, elektriksel taşıyıcılarını ideal durumda çoğunlukla kendi ısıl uyarılmasından üretir; ısıl dengede \(n=p=n_i\) olur. <b>Katkılı (extrinsic) yarıiletken</b> ise kasıtlı eklenen az sayıdaki atomla taşıyıcı dengesinin ayarlandığı malzemedir. Silisyumda P gibi donörler elektron sağlayarak n tipi; B gibi akseptörler hol sağlayarak p tipi davranış oluşturabilir.</p><p><b>Katkı atomu sayısı = serbest taşıyıcı sayısı</b> her koşulda doğru değildir. Düşük sıcaklıkta eksik iyonlaşma (freeze-out), yüksek sıcaklıkta öz taşıyıcı üretimi ve çok yüksek katkıda dejenerelik önem kazanır. Bu nedenle sıcaklığa bağlı davranışı ayrı incelemek gerekir.</p>',
      en:'<p>An <b>intrinsic semiconductor</b> obtains its carriers mainly from thermal excitation; at equilibrium \(n=p=n_i\). An <b>extrinsic semiconductor</b> has a small density of deliberately added atoms to control carriers. In silicon, donors such as P support n-type behaviour; acceptors such as B support p-type behaviour.</p><p><b>Dopant atom count is not always free-carrier count.</b> Incomplete ionization at low temperature (freeze-out), intrinsic generation at high temperature and degeneracy at extreme doping can all invalidate the simplest approximation.</p>'
    },
    'transport':{
      tr:'<p><b>Son bağlantı:</b> Bantlar hangi enerji durumlarının mümkün olduğunu; Fermi–Dirac bu durumların ne kadar dolu olduğunu; <b>taşınım</b> ise bu elektron ve hollerin nasıl akım oluşturduğunu açıklar. Elektrik alan taşıyıcıları sürükler, yoğunluk farkı ise difüzyon oluşturur. Düşük alanlarda \(J_n=q\mu_n n\mathcal{E}+qD_n\nabla n\), \(J_p=q\mu_p p\mathcal{E}-qD_p\nabla p\) bağıntıları kullanılır (tek boyutlu gösterim).</p><p>Bundan sonraki <b>Yarıiletken Cihazları</b> bölümünde p-n eklemi ve transistörlerin çalışması, tam olarak bu bant, doluluk ve akım kavramlarının birleşmesiyle açıklanır.</p>',
      en:'<p><b>The final connection:</b> Bands determine which states can exist; Fermi–Dirac tells us which are occupied; <b>transport</b> explains how electrons and holes form current. Electric fields drive drift, while concentration gradients drive diffusion. At low electric fields, \(J_n=q\mu_n n\mathcal{E}+qD_n\nabla n\) and \(J_p=q\mu_p p\mathcal{E}-qD_p\nabla p\) apply (one-dimensional notation).</p><p>In the <b>Semiconductor Devices</b> part, p-n junctions and transistors follow directly from the combined ideas of bands, occupancy and transport.</p>'
    }
  };
  function makeNote(topic,lang) {
    var doc=NOTES[topic];if(!doc)return null;
    var el=document.createElement('section');
    el.className='course-concept';el.id='course-topic-'+topic;
    var label=LESSONS.find(function(x){return x[0]===topic;});
    var h=document.createElement('h4');h.textContent=trEn(lang,label[1],label[2]);
    el.appendChild(h);
    var body=document.createElement('div');body.className='course-concept-body';
    body.innerHTML=doc[lang==='en'?'en':'tr'];el.appendChild(body);
    return el;
  }
  function mountLesson(main,lang) {
    var prose=main.querySelector('.pane[data-pane="anlatim"] .prose');
    if(!prose || prose.querySelector('.course-topic-guide'))return;
    var headings=Array.from(prose.querySelectorAll('h3'));
    function heading(prefix){
      return headings.find(function(el){return el.textContent.trim().indexOf(prefix)===0;});
    }
    var crystal=heading('1.1 '),bands=heading('1.2 '),holes=heading('1.3 '),
      equilibrium=heading('1.4 '),doping=heading('1.5 '),transport=heading('1.12 ');
    if(!crystal || !bands || !holes || !equilibrium || !doping || !transport)return;
    [['crystal',crystal],['bands',bands],['holes',holes],['doping',doping]].forEach(function(item){
      item[1].id='course-topic-'+item[0];
    });
    function appendAfter(anchor,topic){
      var note=makeNote(topic,lang);
      if(note){anchor.insertAdjacentElement('afterend',note);return note;}
      return anchor;
    }
    appendAfter(crystal,'bloch-electron');
    var p=bands;p=appendAfter(p,'bands'); // 'bands' is the original h3 anchor; the concept note gets no duplicate id.
    // The lesson's existing 1.2 section is extensive: keep additions close to its opening.
    p=appendAfter(p,'edges');
    p=appendAfter(p,'dos');
    appendAfter(holes,'holes');
    p=appendAfter(equilibrium,'fermi');
    appendAfter(p,'equilibrium');
    appendAfter(doping,'doping');
    appendAfter(transport,'transport');
    equilibrium.id='course-topic-equilibrium-existing';
    var guide=document.createElement('nav');
    guide.className='course-topic-guide';
    guide.setAttribute('aria-label',trEn(lang,'Yarıiletken fiziği konu haritası','Semiconductor physics topic map'));
    var headingLabel=document.createElement('h3');
    headingLabel.textContent=trEn(lang,'Bölüm I · Temelden başlayalım','Part I · Start with the fundamentals');
    guide.appendChild(headingLabel);
    var desc=document.createElement('p');
    desc.textContent=trEn(lang,
      'Her başlığı sırayla açın. Önce “hangi durumlar var?”, sonra “hangileri dolu?”, son olarak “nasıl hareket ediyorlar?” sorularını çözün.',
      'Follow the topics in order: first which states exist, then which are occupied, finally how carriers move.');
    guide.appendChild(desc);
    var grid=document.createElement('div');grid.className='course-topic-grid';
    LESSONS.forEach(function(topic,i){
      var link=document.createElement('a');
      link.className='course-topic-link';link.href='#course-topic-'+topic[0];
      var num=document.createElement('span');num.className='course-topic-number';num.textContent=String(i+1).padStart(2,'0');
      var title=document.createElement('span');title.textContent=trEn(lang,topic[1],topic[2]);
      link.appendChild(num);link.appendChild(title);
      link.addEventListener('click',function(ev){
        ev.preventDefault();
        var target=main.querySelector('#course-topic-'+topic[0]);
        if(target){target.scrollIntoView({behavior:'smooth',block:'start'});}
      });
      grid.appendChild(link);
    });
    guide.appendChild(grid);
    // Place the roadmap before the initial 4-step atom → crystal → band → carrier summary.
    prose.insertBefore(guide,prose.firstChild);
  }
  window.SemiconductorCourseOutline={
    groupForWeek:groupForWeek,groupTitle:groupTitle,renderNavigation:renderNavigation,mountLesson:mountLesson
  };
})();