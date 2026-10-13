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
  function renderHome(main,lang,onGroup) {
    main.innerHTML = '';
    var intro=document.createElement('div');
    intro.className='course-home-intro';
    var eyebrow=document.createElement('p');
    eyebrow.className='course-home-eyebrow';
    eyebrow.textContent=trEn(lang,'Ders içerikleri','Course contents');
    var h=document.createElement('h2');
    h.textContent=trEn(lang,'Ne öğrenmek istiyorsunuz?','What would you like to study?');
    var p=document.createElement('p');
    p.textContent=trEn(lang,
      'Önce yarıiletkenlerin temel fiziğini öğrenin veya bu ilkelerin cihazlardaki uygulamalarına geçin.',
      'Start with the underlying physics, or explore how these principles are applied in semiconductor devices.');
    intro.appendChild(eyebrow);intro.appendChild(h);intro.appendChild(p);
    main.appendChild(intro);
    var cards=document.createElement('div');cards.className='course-home-cards';
    GROUPS.forEach(function(group){
      var b=document.createElement('button');b.type='button';b.className='course-home-card';
      b.dataset.course=group.id;
      var num=document.createElement('span');num.className='course-home-num';num.textContent=group.number;
      var body=document.createElement('span');body.className='course-home-card-body';
      var name=document.createElement('strong');name.textContent=trEn(lang,group.tr,group.en);
      var desc=document.createElement('span');desc.className='course-home-card-desc';
      desc.textContent=group.id==='physics'
        ?trEn(lang,'Kristal yapı, elektronlar, bant teorisi, durum yoğunluğu, Fermi seviyesi ve taşıyıcılar.',
                 'Crystal structures, electrons, band theory, density of states, Fermi levels and carriers.')
        :trEn(lang,'p-n eklemleri, diyotlar, transistörler, MOSFET ve gelişmiş yarıiletken aygıtlar.',
                 'p-n junctions, diodes, transistors, MOSFETs and advanced semiconductor devices.');
      body.appendChild(name);body.appendChild(desc);
      var arrow=document.createElement('span');arrow.className='course-home-arrow';
      arrow.setAttribute('aria-hidden','true');arrow.textContent='→';
      b.appendChild(num);b.appendChild(body);b.appendChild(arrow);
      b.addEventListener('click',function(){onGroup(group.id);});
      cards.appendChild(b);
    });
    main.appendChild(cards);
  }
  function renderNavigation(nav,weeks,titleFor,lang,active,current,selectedTopic,onWeek,onTopic,onBack) {
    var top=document.getElementById('courseSections');
    if(!top)return;
    top.innerHTML='';nav.innerHTML='';
    if(!active)return;
    top.setAttribute('aria-label',trEn(lang,'Seçili bölüm','Selected part'));
    var back=document.createElement('button');back.type='button';back.className='course-back';
    var backArrow=document.createElement('span');backArrow.setAttribute('aria-hidden','true');backArrow.textContent='←';
    var backText=document.createElement('span');backText.textContent=trEn(lang,'Geri · Ana bölümler','Back · Course parts');
    back.appendChild(backArrow);back.appendChild(backText);
    back.addEventListener('click',onBack);
    top.appendChild(back);
    var currentGroup=GROUPS.find(function(g){return g.id===active;});
    var heading=document.createElement('div');heading.className='course-current-heading';
    var roman=document.createElement('span');roman.className='course-current-number';
    roman.textContent=currentGroup.number;
    var title=document.createElement('strong');
    title.textContent=trEn(lang,currentGroup.tr,currentGroup.en);
    heading.appendChild(roman);heading.appendChild(title);top.appendChild(heading);
    nav.setAttribute('aria-label',trEn(lang,'Bölüm konuları','Topics in this part'));
    nav.removeAttribute('role');
    function separator(trText,enText){
      var a=document.createElement('div');a.className='course-nav-caption';
      a.textContent=trEn(lang,trText,enText);nav.appendChild(a);
    }
    function navButton(id,number,textLabel,selected,cb){
      var b=document.createElement('button');b.type='button';
      b.className='course-nav-item';b.dataset[id.indexOf('topic:')===0?'topic':'week']=id.split(':')[1];
      if(selected){b.classList.add('is-current');b.setAttribute('aria-current','location');}
      var num=document.createElement('span');num.className='course-nav-number';num.textContent=number;
      var label=document.createElement('span');label.className='course-nav-label';label.textContent=textLabel;
      b.appendChild(num);b.appendChild(label);
      b.addEventListener('click',cb);nav.appendChild(b);
    }
    if(active==='physics'){
      separator('Temel konular','Foundations');
      LESSONS.forEach(function(topic,index){
        navButton('topic:'+topic[0],String(index+1).padStart(2,'0'),
          trEn(lang,topic[1],topic[2]),current===1&&topic[0]===selectedTopic,
          function(){onTopic(topic[0]);});
      });
      separator('Diğer fizik konuları','Other physics topics');
      weeks.filter(function(w){return groupForWeek(w.n)==='physics'&&w.n!==1;}).forEach(function(w){
        navButton('week:'+w.n,String(w.n),titleFor(w),current===w.n,function(){onWeek(w.n);});
      });
    }else{
      separator('Cihaz konuları','Device topics');
      var visible=weeks.filter(function(w){return groupForWeek(w.n)==='devices';});
      visible.forEach(function(w,i){
        if(w.modern&&(i===0||!visible[i-1].modern))separator('İleri cihazlar ve yapılar','Advanced devices and structures');
        navButton('week:'+w.n,String(w.n),titleFor(w),current===w.n,function(){onWeek(w.n);});
      });
    }
  }
  function topicLabel(lang,id) {
    var topic=LESSONS.find(function(v){return v[0]===id;});
    return topic?trEn(lang,topic[1],topic[2]):'';
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
      tr:'<p><b>Atomdaki elektron</b> ile <b>kristaldeki elektron</b> aynı şekilde düşünülmemelidir. Tek bir atomda elektronlar ayrık orbitallerde bulunur. Düzenli bir kristalde ise elektronun dalga fonksiyonu bütün örgü boyunca yayılabilir. Bloch teoremi bu durumu \\(\\psi_{n\\mathbf{k}}(\\mathbf{r})=u_{n\\mathbf{k}}(\\mathbf{r})e^{i\\mathbf{k}\\cdot\\mathbf{r}}\\) biçiminde yazar.</p><p><b>Buradaki k nedir?</b> Kristal dalgasının dalga vektörüdür; \\(\\hbar\\mathbf{k}\\) kristal momentumu (kuazimomentum) ile ilişkilidir. Enerji \\(E_n(\\mathbf{k})\\) ile ifade edilir. Elektron çekirdeğin çevresinde küçük bir gezegen gibi dönmez; dağılan bir kuantum dalgasıdır. Bu bakış, elektronun niçin iletilebildiğini ve etkin kütlenin nereden geldiğini anlamamızı sağlar.</p>',
      en:'<p>An <b>electron in an atom</b> is not best pictured the same way as an <b>electron in a crystal</b>. An isolated atom supports discrete orbitals; in a periodic crystal, electronic wavefunctions can extend across the lattice. Bloch’s theorem writes these as \\(\\psi_{n\\mathbf{k}}(\\mathbf{r})=u_{n\\mathbf{k}}(\\mathbf{r})e^{i\\mathbf{k}\\cdot\\mathbf{r}}\\).</p><p><b>What is k?</b> The wave vector associated with crystal quasi-momentum \\(\\hbar\\mathbf{k}\\). The band energy is \\(E_n(\\mathbf{k})\\). Electrons do not orbit nuclei like tiny planets: they occupy quantum states. This picture explains transport and effective mass.</p>'
    },
    'bands':{
      tr:'<p><b>İlk düşünce deneyi:</b> Yan yana yalnızca iki özdeş atom koyduğumuzu düşünelim. İki atomun aynı enerjili düzeyleri etkileşimle farklı enerjilere ayrılabilir. Atom sayısı çok büyüdüğünde bu düzeyler çok sıklaşır ve bir enerji bandı oluşturur. Pauli dışarlama ilkesi, iki elektronun aynı kuantum durumunu aynı anda paylaşmasını engeller.</p><p><b>Önemli ayrım:</b> Bir bandın oluşması, elektronun otomatik olarak serbest taşıyıcı olması demek değildir. Taşınım, bandın doluluk durumuna ve erişilebilir yakın durumlara bağlıdır. Ayrıca bant aralığı yalnızca atomlar arası uzaklığa değil orbital örtüşmesine, kristal simetrisine ve malzemenin bağ yapısına bağlıdır.</p>',
      en:'<p><b>Thought experiment:</b> Start with two identical atoms. Interaction can split what were equal-energy atomic levels. With very many atoms, the densely packed allowed energies form a band. The Pauli exclusion principle prevents two electrons from occupying the same complete quantum state.</p><p><b>Important distinction:</b> Forming a band does not automatically create mobile carriers. Transport depends on which states are occupied and which nearby states are available. The band gap also depends on orbitals, symmetry and bonding—not on atomic separation alone.</p>'
    },
    'edges':{
      tr:'<p><b>Değerlik bandı</b>, ideal ve katkısız bir yarıiletkende 0 K’de en üstteki dolu bandı; <b>iletim bandı</b> ise onun üzerindeki ilk boş enerji bandını belirtir. Bu bantların sırasıyla üst ve alt kenarları \\(E_v\\) ve \\(E_c\\) olarak gösterilir. Aralarındaki fark \\(E_g=E_c-E_v\\) bant aralığıdır.</p><p>Elektron enerji kazanıp iletim bandına çıktığında kristali veya atomu terk etmesi gerekmez. <b>İletim bandında hareketli bir elektron</b> ve değerlik bandında <b>boş kalan bir durum (hol)</b> oluşabilir. Yasak aralık, ideal kristalde izinli hacimsel elektronik durumların bulunmadığı enerji bölgesidir; kusurlar bu aralıkta ek durumlar oluşturabilir.</p>',
      en:'<p>In an ideal intrinsic semiconductor at 0 K, the <b>valence band</b> is the highest occupied band and the <b>conduction band</b> is the next available higher band. Their edges are \\(E_v\\) and \\(E_c\\), and the gap is \\(E_g=E_c-E_v\\).</p><p>Exciting an electron into the conduction band does <b>not</b> mean removing it from the crystal. It can leave a mobile conduction electron and an <b>empty valence-band state (a hole)</b>. An ideal bulk gap contains no allowed states; defects may introduce gap states.</p>'
    },
    'dos':{
      tr:'<p><b>İki soru birbirinden farklıdır:</b> “Bu enerjide elektronun gidebileceği <i>kaç durum</i> var?” sorusunun cevabı <b>durum yoğunluğu \\(g(E)\\)</b>; “bu durumlardan <i>kaçı dolu</i>?” sorusunun cevabı <b>Fermi–Dirac olasılığı \\(f(E)\\)</b>dır.</p><p>Üç boyutlu parabolik bant yaklaşımında, iletim bandı kenarından yukarı doğru \\(g_c(E)\\propto (m^*_{\\mathrm{DOS}})^{3/2}\\sqrt{E-E_c}\\) artar. Birim \\( \\mathrm{cm}^{-3}\\,\\mathrm{eV}^{-1}\\) dir. İdeal yasak aralıkta durum yoğunluğu sıfırdır. <b>Elektron yoğunluğu</b> için iki kavramı çarpar, enerjide toplarız: \\(n=\\int_{E_c}^{\\infty}g_c(E)f(E)\\,dE\\). Görseller sekmesinde malzeme ve \\(\\Delta E\\) değişkenlerini deneyin.</p>',
      en:'<p><b>Two different questions:</b> “How many states <i>exist</i> at this energy?” is answered by the <b>density of states \\(g(E)\\)</b>. “What fraction is <i>occupied</i>?” is answered by the <b>Fermi–Dirac probability \\(f(E)\\)</b>.</p><p>Near a 3D parabolic conduction-band edge, \\(g_c(E)\\propto(m^*_{\\mathrm{DOS}})^{3/2}\\sqrt{E-E_c}\\), with units of states per \\(\\mathrm{cm}^3\\) and eV. The ideal gap has zero DOS. To obtain <b>electron concentration</b>, multiply and integrate: \\(n=\\int_{E_c}^{\\infty}g_c(E)f(E)\\,dE\\). Explore the material and \\(\\Delta E\\) controls in Visuals.</p>'
    },
    'holes':{
      tr:'<p><b>Hol gerçek bir proton değildir.</b> Değerlik bandında dolu olması beklenen bir kuantum durumunun boş kalmasını anlatan yararlı bir kuaziparçacık modelidir. Komşu bağlı elektron boş durumu doldurdukça boş durum ters yönde ilerliyormuş gibi davranır. Holün etkin elektrik yükü \\(+q\\) olarak tanımlanır; bu nedenle elektrik alan karşısında elektronlardan farklı yönde katkı verir.</p><p>Hol sayısı değerlik bandındaki <b>boş durumları</b> sayar: \\(p=\\int_{-\\infty}^{E_v}g_v(E)[1-f(E)]\\,dE\\). Bir elektron–hol çiftinin üretilmesi kristalin elektriksel bakımdan yüksüzlüğünü kendiliğinden değiştirmez.</p>',
      en:'<p><b>A hole is not a literal proton.</b> It is a useful quasiparticle description of a missing electron in an otherwise occupied valence-band state. When neighbouring electrons fill the vacancy, the missing state appears to move in the opposite direction. The hole carries an effective charge \\(+q\\) for transport calculations.</p><p>The hole concentration counts <b>empty valence states</b>: \\(p=\\int_{-\\infty}^{E_v}g_v(E)[1-f(E)]\\,dE\\). Creating an electron–hole pair does not by itself give the whole crystal net charge.</p>'
    },
    'fermi':{
      tr:'<p><b>Fermi seviyesi \\(E_F\\)</b>, ısıl dengedeki elektronların kimyasal potansiyelidir. Sıcaklık \\(T>0\\) iken enerji \\(E=E_F\\) için bir <i>mevcut</i> durumun elektronla dolu olma olasılığı %50’dir. Fermi seviyesi bant aralığında da bulunabilir; burada durum olmayabileceği için “Fermi seviyesinde mutlaka elektron bulunur” demek yanlıştır.</p><p>Olasılık \\(f(E,T)=\\frac{1}{1+\\exp[(E-E_F)/(k_BT)]}\\) ile hesaplanır. \\(E_F\\) iletim bandına yaklaştığında elektron, değerlik bandına yaklaştığında hol yoğunluğu artma eğilimindedir. \\(E-E_F\\gtrsim3k_BT\\) olduğunda elektronlar için Boltzmann yaklaşımının bağıl hatası yaklaşık %5’in altındadır.</p>',
      en:'<p>The <b>Fermi level \\(E_F\\)</b> is the electron chemical potential at thermal equilibrium. At \\(T>0\\), an <i>available state</i> with \\(E=E_F\\) has a 50% probability of electron occupancy. The Fermi level can lie inside a gap where no state exists—so “an electron must be at the Fermi level” is wrong.</p><p>Occupancy obeys \\(f(E,T)=\\frac{1}{1+\\exp[(E-E_F)/(k_BT)]}\\). Moving \\(E_F\\) towards the conduction band generally raises electron density; moving it towards the valence band raises hole density. For \\(E-E_F\\gtrsim3k_BT\\), the electron Boltzmann-tail approximation has less than about 5% relative error.</p>'
    },
    'equilibrium':{
      tr:'<p><b>Isıl denge</b> yalnızca “değerlerin zamanla değişmemesi” demek değildir: dışarıdan sürekli ışık, akım enjeksiyonu veya elektriksel zorlamayla sistem sürülmüyordur. Isıl dengede elektron üretimi ile yeniden birleşme dengededir ve tek bir \\(E_F\\) tanımlanır. <b>Kararlı durum</b> ise, sürekli aydınlatılan bir fotodiyotta olduğu gibi, dış etkiler sürerken de oluşabilir; bu durumda elektron ve holler için ayrı kuazi-Fermi seviyeleri gerekebilir.</p><p>Dejenere olmayan ısıl dengeli yarıiletkende <b>kütle etkisi yasası</b> \\(np=n_i^2\\) geçerlidir. Örneğin n tipi katkı elektron yoğunluğunu artırırsa aynı sıcaklıkta denge hol yoğunluğu azalır. Bu yasa kuvvetli aydınlatılmış dengeden uzak sistemlere doğrudan uygulanmaz.</p>',
      en:'<p><b>Thermal equilibrium</b> is more restrictive than “numbers no longer change”: the system is not continuously driven by light or current injection. Generation and recombination balance, and a single \\(E_F\\) applies. A <b>steady state</b> can also exist under constant illumination; then separate electron and hole quasi-Fermi levels may be necessary.</p><p>For a nondegenerate semiconductor at thermal equilibrium, the <b>mass-action law</b> is \\(np=n_i^2\\). Increasing equilibrium electron concentration by donor doping reduces hole concentration at the same temperature. Do not apply this rule unmodified under strong photoexcitation.</p>'
    },
    'doping':{
      tr:'<p><b>Has (öz/intrinsic) yarıiletken</b>, elektriksel taşıyıcılarını ideal durumda çoğunlukla kendi ısıl uyarılmasından üretir; ısıl dengede \\(n=p=n_i\\) olur. <b>Katkılı (extrinsic) yarıiletken</b> ise kasıtlı eklenen az sayıdaki atomla taşıyıcı dengesinin ayarlandığı malzemedir. Silisyumda P gibi donörler elektron sağlayarak n tipi; B gibi akseptörler hol sağlayarak p tipi davranış oluşturabilir.</p><p><b>Katkı atomu sayısı = serbest taşıyıcı sayısı</b> her koşulda doğru değildir. Düşük sıcaklıkta eksik iyonlaşma (freeze-out), yüksek sıcaklıkta öz taşıyıcı üretimi ve çok yüksek katkıda dejenerelik önem kazanır. Bu nedenle sıcaklığa bağlı davranışı ayrı incelemek gerekir.</p>',
      en:'<p>An <b>intrinsic semiconductor</b> obtains its carriers mainly from thermal excitation; at equilibrium \\(n=p=n_i\\). An <b>extrinsic semiconductor</b> has a small density of deliberately added atoms to control carriers. In silicon, donors such as P support n-type behaviour; acceptors such as B support p-type behaviour.</p><p><b>Dopant atom count is not always free-carrier count.</b> Incomplete ionization at low temperature (freeze-out), intrinsic generation at high temperature and degeneracy at extreme doping can all invalidate the simplest approximation.</p>'
    },
    'transport':{
      tr:'<p><b>Son bağlantı:</b> Bantlar hangi enerji durumlarının mümkün olduğunu; Fermi–Dirac bu durumların ne kadar dolu olduğunu; <b>taşınım</b> ise bu elektron ve hollerin nasıl akım oluşturduğunu açıklar. Elektrik alan taşıyıcıları sürükler, yoğunluk farkı ise difüzyon oluşturur. Düşük alanlarda \\(J_n=q\\mu_n n\\mathcal{E}+qD_n\\nabla n\\), \\(J_p=q\\mu_p p\\mathcal{E}-qD_p\\nabla p\\) bağıntıları kullanılır (tek boyutlu gösterim).</p><p>Bundan sonraki <b>Yarıiletken Cihazları</b> bölümünde p-n eklemi ve transistörlerin çalışması, tam olarak bu bant, doluluk ve akım kavramlarının birleşmesiyle açıklanır.</p>',
      en:'<p><b>The final connection:</b> Bands determine which states can exist; Fermi–Dirac tells us which are occupied; <b>transport</b> explains how electrons and holes form current. Electric fields drive drift, while concentration gradients drive diffusion. At low electric fields, \\(J_n=q\\mu_n n\\mathcal{E}+qD_n\\nabla n\\) and \\(J_p=q\\mu_p p\\mathcal{E}-qD_p\\nabla p\\) apply (one-dimensional notation).</p><p>In the <b>Semiconductor Devices</b> part, p-n junctions and transistors follow directly from the combined ideas of bands, occupancy and transport.</p>'
    }
  };
  function makeNote(topic,lang) {
    var doc=NOTES[topic];if(!doc)return null;
    var el=document.createElement('section');
    el.className='course-concept';el.id=(topic==='bands'||topic==='holes'||topic==='doping')?'course-note-'+topic:'course-topic-'+topic;
    var label=LESSONS.find(function(x){return x[0]===topic;});
    var h=document.createElement('h4');h.textContent=trEn(lang,label[1],label[2]);
    el.appendChild(h);
    var body=document.createElement('div');body.className='course-concept-body';
    body.innerHTML=doc[lang==='en'?'en':'tr'];el.appendChild(body);
    return el;
  }
  function mountLesson(main,lang) {
    var prose=main.querySelector('.pane[data-pane="anlatim"] .prose');
    if(!prose || prose.querySelector('#course-topic-bloch-electron'))return;
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

  }
  window.SemiconductorCourseOutline={
    groupForWeek:groupForWeek,groupTitle:groupTitle,renderHome:renderHome,renderNavigation:renderNavigation,topicLabel:topicLabel,mountLesson:mountLesson
  };
})();