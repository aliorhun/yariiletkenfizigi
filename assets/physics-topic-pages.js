/* Independent semiconductor-physics lessons with separate learning panels.
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
 ['regimes','Sıcaklık rejimleri ve katkılama senaryoları','Temperature regimes and doping scenarios'],
 ['transport','Taşıyıcı hareketi ve geçiş','Carrier transport and transition']
];
var TABS=[
 ['anlatim','Anlatım','Explanation'],
 ['matematik','Matematiksel temel','Mathematical foundations'],
 ['gorsel','Görsel / Simülasyon','Visuals / Simulations'],
 ['soru','Soru–Cevap','Questions & Answers'],
 ['oyun','Oyun','Game']
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
 regimes:[
 'Isıl dengede üç rejim, iyonlaşmış katkı yoğunluğu ile ısıl elektron–hol çiftlerinin yarışından doğar:',
 'The three temperature regimes emerge from competition between ionized dopants and thermal electron–hole pairs:',
 '\\[n+N_A^-=p+N_D^+,\\qquad np=n_i^2,\\qquad n_{\\mathrm{majority}}=|N_D^+-N_A^-|+n_{\\mathrm{minority}}.\\]',
 'Son eşitlik hem n hem p tipi için geçerlidir. Donör/akseptörler eksik iyonlaştığında N_D ve N_A yerine iyonlaşmış yoğunlukları kullanın; çok yüksek katkıda klasik model yetersizdir.',
 'The last identity works for either majority-carrier type. Use ionized, not total, dopant densities when ionization is incomplete; the classical model fails at very heavy doping.'
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
 regimes:['Üç sıcaklık rejiminin sınırı her katkılı Si örneğinde aynı mıdır?','Hayır. Net iyonlaşmış katkı, safsızlık enerjisi ve n_i(T) geçişi belirler.','Do all doped silicon samples have the same three temperature thresholds?','No. Ionized net doping, impurity binding energy and n_i(T) set the transitions.'],
 transport:['Elektron sürüklenme hızı alanın yönünde midir?','Hayır, negatif yük nedeniyle alanın ters yönündedir.','Does electron drift velocity point along the electric field?','No. It points opposite to the field because electrons are negatively charged.']
};

var QA_REASONS={
 crystal:[
  'Elmas-kübik Si örgüsünde aynı atomun dört en yakın bağı bulunur; örgü sabiti ile bağ uzunluğu farklıdır.',
  'Diamond-cubic Si has four nearest-neighbour bonds; lattice constant and bond length are different.',
  'Kübik birim hücreyi basit kübik yapı sanmak veya a değerini doğrudan bağ uzunluğu almak yanlış sonuç verir.',
  'Treating a diamond cell as simple cubic, or using a as the bond length, gives the wrong geometry.'
 ],
 'bloch-electron':[
  'Bloch dalgası periyodik bir çarpan ve hücreler arasında e^(ika) faz ilerlemesi içerir.',
  'A Bloch state combines a periodic factor with an e^(ika) phase advance between cells.',
  'Dalga fonksiyonunun fazı değişebilir; bu, olasılık yoğunluğunun her hücrede değişmesi gerektiği anlamına gelmez.',
  'A changing phase does not imply that the probability density must change from cell to cell.'
 ],
 bands:[
  'Özdeş atomlar etkileştiğinde ayrık orbital düzeyleri ayrılır; çok atomlu yapıda düzeyler sıklaşarak bant oluşturur.',
  'Interacting atoms split discrete orbital levels; for many atoms these levels crowd into bands.',
  'Bant oluşmasını bütün elektronların serbest olması veya bant genişliğinin sınırsız büyümesi sanmak yanlıştır.',
  'Band formation does not mean all electrons are free, nor that bandwidth increases without bound.'
 ],
 edges:[
  'Yasak aralık Ec−Ev arasındaki izinli hacimsel durum bulunmayan enerji bölgesidir; yeterli uyarılma çift oluşturabilir.',
  'The gap Ec−Ev lacks allowed ideal bulk states; sufficient excitation can produce an electron–hole pair.',
  'İletim bandına çıkan elektron kristalden kopmak zorunda değildir; hâlâ katının bir elektronik durumundadır.',
  'A conduction-band electron need not leave the solid; it still occupies a state within the crystal.'
 ],
 dos:[
  'DOS kullanılabilir durumları, Fermi–Dirac ise bunların doluluk oranını anlatır; n için ikisi birlikte kullanılır.',
  'DOS counts available states; Fermi–Dirac gives occupancy. Both are needed to compute n.',
  'DOS grafiğini doğrudan elektron sayısı olarak okumak yanlıştır; boş durumlar da DOS’a dahildir.',
  'A DOS curve is not the electron count: unoccupied states are included as well.'
 ],
 holes:[
  'Hol, dolu değerlik bandındaki eksik elektron durumunun +q etkin yüklü kuaziparçacık gösterimidir.',
  'A hole represents a missing valence-band electron and acts as an effective +q quasiparticle.',
  'Holü proton ya da elektronla aynı yönde sıçrayan bağımsız bir cisim gibi düşünmek yanlıştır.',
  'A hole is not a proton or an independent object that hops in the same direction as an electron.'
 ],
 fermi:[
  'Fermi seviyesi doluluk olasılığını belirler; E=EF ve T>0 için mevcut bir durumun doluluğu %50’dir.',
  'The Fermi level controls occupancy; an available state at E=EF has 50% occupancy for T>0.',
  'Fermi seviyesi yasak aralıkta bulunabilir; orada mutlaka bir elektron bulunduğu sonucu çıkmaz.',
  'EF may lie within a gap, where there need not be an electronic state at all.'
 ],
 equilibrium:[
  'Isıl dengede net üretim ile yeniden birleşme dengededir ve tek Fermi seviyesi tanımlanır.',
  'Thermal equilibrium balances generation and recombination and permits a single Fermi level.',
  'Zamanla değişmeyen her durumu ısıl denge saymak yanlıştır; sürekli ışık altında kararlı fakat dengesiz durum olabilir.',
  'A steady state is not necessarily thermal equilibrium; continuous illumination can sustain nonequilibrium.'
 ],
 doping:[
  'Donör ve akseptörler hareketli taşıyıcı oranlarını değiştirir; iyonlaşmış katkı iyonları yük nötrlüğünü korur.',
  'Donors and acceptors change carrier populations, while ionized dopants help maintain charge neutrality.',
  'n tipi malzemenin bütün olarak negatif yüklü olduğunu veya her sıcaklıkta n=ND olduğunu sanmak yanlıştır.',
  'An n-type sample is not net negative, and n=ND is not valid at every temperature.'
 ],
 regimes:[
  'Rejim sınırları, eksik iyonlaşmanın bitişi ve ısıl elektron–hol üretiminin net iyonlaşmış katkıya yaklaşmasıyla belirlenir.',
  'The thresholds depend on donor/acceptor ionization and when thermal pairs approach the net ionized dopant density.',
  'Freeze-out, extrinsic ve intrinsic terimlerini donör/akseptör türleriyle veya sabit sıcaklık sayılarıyla eşleştirmek yanlış olur.',
  'Do not equate freeze-out, extrinsic and intrinsic with dopant species or universal fixed temperatures.'
 ],
 transport:[
  'Elektrik alan elektron ve holleri zıt sürüklenme yönlerine yöneltir; difüzyon ise yoğunluk gradyanıyla oluşur.',
  'Electrons and holes drift in opposite directions under an electric field; diffusion follows concentration gradients.',
  'Elektronun sürüklenme yönünü akım yönüyle aynı almak veya difüzyonu elektrik alanın kendisi sanmak yanlıştır.',
  'Electron drift is opposite conventional current, and diffusion is not itself an electric-field effect.'
 ]
};
var LEGACY_REASONS={
 1:['Elmas-kübik Si için bağ uzunluğu d=√3a/4 geometrisinden gelir.','Diamond-cubic geometry gives d=√3a/4.',
    'd=a demek birim hücre kenarı ile en yakın komşu bağını karıştırır.','Setting d=a confuses the unit-cell edge with a nearest-neighbour bond.'],
 2:['Konvansiyonel elmas-kübik birim hücrede 8 atom bulunur; N=8/a³ hesaplanır.','A conventional diamond-cubic cell contains 8 atoms, so N=8/a³.',
    'Köşe ve yüz atomlarını tek hücreye bütünüyle saymak atom yoğunluğunu fazla verir.','Counting shared corner and face atoms as whole atoms overestimates density.'],
 3:['ni ısıl dengede hareketli elektron/hol yoğunluğudur, kristaldeki atom sayısı değildir.','ni counts mobile carriers at equilibrium, not atoms.',
    'Yaklaşık 10^10 taşıyıcı/cm³ ile 10^22 atom/cm³ ölçeklerini karıştırmamak gerekir.','Do not confuse carrier concentrations near 10^10/cm³ with atomic densities near 10^22/cm³.'],
 4:['Bir elektron değerlikten iletime uyarılırken eski durumunda boşluk bırakır; çift birlikte oluşur.','Exciting a valence electron into conduction leaves a hole; the pair forms together.',
    'Elektron oluştuğu için katının toplam yükü otomatik negatif olmaz.','Creating an electron–hole pair does not make the solid net negative.'],
 5:['Hol bir eksik değerlik durumu ve etkin +q taşıyıcı olarak tanımlanır.','A hole is a missing valence state represented by an effective +q carrier.',
    'Proton veya kristal içinde gezen bağımsız pozitif temel parçacık değildir.','It is not a proton or a separate positive elementary particle moving through the crystal.'],
 6:['Tam iyonlaşma ve dejenere olmayan koşullarda n≈ND, p≈ni²/n yaklaşımı geçerlidir.','With complete ionization and nondegenerate statistics, n≈ND and p≈ni²/n.',
    'Donör sayısını atom yoğunluğuna veya her koşulda serbest elektron sayısına eşitlemek doğru değildir.','Dopant density is neither the atomic density nor always the free-electron density.'],
 7:['Akseptör katkı p tipinde çoğunluk holleri oluşturur; azınlık elektronlar np=ni² ile bulunur.','Acceptors make holes the majority carriers; minority electrons follow np=ni².',
    'NA değerini elektron yoğunluğu olarak doğrudan almak çoğunluk/azınlığı ters çevirir.','Using NA directly as electron density reverses the majority/minority roles.'],
 8:['Kompanzasyonda net iyonlaşmış katkı farkı ND−NA belirleyicidir.','Compensation depends on the net ionized dopant difference ND−NA.',
    'Donör ile akseptörü toplamak, birbirlerini elektriksel olarak dengelediklerini göz ardı eder.','Adding donor and acceptor densities ignores their compensating charges.'],
 9:['Özdirenç, taşıyıcı sayısı kadar elektron ve hol hareketliliklerine de bağlıdır.','Resistivity depends on carrier mobility as well as concentration.',
    'Sadece katkı atomlarını sayıp σ=q(nμn+pμp) bağıntısını atlamak hatalıdır.','Counting dopants without using σ=q(nμn+pμp) misses transport physics.'],
 10:['Hareketli elektronların yükü, pozitif iyonlaşmış donörlerle dengelenir.','The mobile electron charge is balanced by positively ionized donors.',
     'n tipi ile net negatif yük kavramlarını aynı saymak yük nötrlüğünü ihmal eder.','Equating n-type with net negative charge ignores charge neutrality.'],
 11:['Öz Fermi seviyesi NC ve NV etkin durum yoğunlukları farklıysa tam orta noktada olmayabilir.','The intrinsic Fermi level can shift from mid-gap when NC and NV differ.',
     'Ei değerini her malzemede geometrik bant ortası kabul etmek yaklaşımın sınırını unutturur.','Assuming Ei always equals exact mid-gap ignores differing effective densities of states.'],
 12:['Öz taşıyıcı yoğunluğu ni(T) katkı düzeyiyle karşılaştırılabilir olunca öz davranış başlar.','Intrinsic behaviour emerges when ni(T) becomes comparable to doping.',
     'Bütün katkılı örnekler için tek bir sabit geçiş sıcaklığı yoktur.','There is no universal transition temperature for every doped sample.'],
 13:['Düşük sıcaklıkta donörler bütünüyle iyonlaşmayabilir; buna freeze-out denir.','Donors may not be fully ionized at low temperatures (freeze-out).',
     'n=ND yaklaşımını mutlak sıfıra kadar sürdürmek hatalıdır.','Extrapolating n=ND down to absolute zero is incorrect.'],
 14:['Sıcaklık artınca öz üretim büyür ve katkının göreli etkisi küçülür.','Intrinsic generation rises with temperature until it outweighs doping effects.',
     'Katkı atomlarının yok olduğunu düşünmek yanlıştır; yalnız taşıyıcı dengesi değişir.','Dopants do not disappear; the carrier balance changes.'],
 15:['D=μkBT/q ve L=√(Dτ) bağıntıları birlikte kullanılır.','Use D=μkBT/q and L=√(Dτ) together.',
     'Difüzyon katsayısını hareketlilikle veya uzunluğu Dτ ile özdeşlemek birimce yanlıştır.','Equating D with mobility or L with Dτ gives incorrect units.'],
 16:['Isıl fononlar ve kusurlar elektron saçılmasına katkı verir; gerçek kristal bütünüyle durağan değildir.','Thermal phonons and defects cause scattering; real crystals are not static.',
     'Mükemmel periyodik potansiyelin kendisini rastgele çarpışma saymak da, her saçılmayı yok saymak da hatalıdır.','Neither every periodic potential nor zero scattering is a sound model of all conditions.'],
 17:['μ=qτm/m* bağıntısıyla momentum gevşeme süresi, uygun hızla serbest yol bulunur.','Use μ=qτm/m* for momentum relaxation time, then a suitable speed for mean free path.',
     'Hareketlilik ve serbest yolun doğrudan aynı fiziksel nicelik olduğunu sanmak yanlıştır.','Mobility and mean free path are not the same physical quantity.'],
 18:['Soğumayla fonon saçılması azalırken iyonize katkı saçılması göreli olarak önem kazanabilir.','Cooling weakens phonon scattering while ionized-impurity scattering may become dominant.',
     'Hareketlilik her malzemede sıcaklıkla tek yönlü değişmez.','Mobility does not vary monotonically with temperature in every regime.'],
 19:['Foton enerji taşır; dolaylı geçişte fonon kristal momentumu farkını karşılamaya yardımcı olabilir.','Photons supply energy; phonons can help conserve crystal momentum in indirect transitions.',
     'Foton ile fononun görevlerini aynı görmek optik geçiş koşullarını gizler.','Treating photons and phonons as interchangeable hides transition requirements.'],
 20:['GaAs doğrudan, Si dolaylı bant aralıklıdır; ışınımlı birleşme olasılıkları çok farklıdır.','GaAs has a direct gap, Si an indirect gap; radiative efficiency differs strongly.',
     'Silisyumun hiç ışık yayamayacağını söylemek yanlış; mesele düşük verimdir.','Silicon can emit light, but typically with poor efficiency.'],
 21:['Isıl dengede taşıyıcıların rastgele hareketlerinin ortalama yönlü akımı sıfırlanır.','At thermal equilibrium random carrier motion gives no net directional current.',
     'Akım sıfır diye elektronların tamamen hareketsiz kaldığını düşünmek yanlıştır.','Zero current does not mean carriers stop moving.'],
 22:['Sürekli ışık kararlı durum oluşturabilir ama ısıl dengeyi bozup ayrı kuazi-Fermi seviyeleri doğurabilir.','Constant illumination can yield steady nonequilibrium with separate quasi-Fermi levels.',
     'Zamana göre sabit olmak, np=ni² denge bağıntısını otomatik olarak geçerli kılmaz.','Time independence alone does not guarantee the equilibrium relation np=ni².']
};

function langPick(v,lang){return v[lang==='en'?1:0];}
function elem(tag,cls){var e=document.createElement(tag);if(cls)e.className=cls;return e;}
function appendWhy(qa,reason,lang){
 if(!reason)return;
 var details=Array.from(qa.children).find(function(node){return node.tagName==='DETAILS';});
 if(!details)return;
 var box=elem('div','physics-qa-reason');
 function paragraph(css,label,explanation){
  var p=elem('p',css),strong=elem('strong');
  strong.textContent=label;
  p.appendChild(strong);
  var content=elem('span');content.textContent=' '+explanation;
  p.appendChild(content);box.appendChild(p);
 }
 paragraph('physics-qa-correct',lang==='en'?'Correct because:':'Doğru çünkü:',lang==='en'?reason[1]:reason[0]);
 paragraph('physics-qa-misconception',lang==='en'?'Common mistake — why it is wrong:':'Sık yanılgı — neden yanlış:',lang==='en'?reason[3]:reason[2]);
 var link=elem('button','physics-qa-reference');link.type='button';
 link.textContent=lang==='en'?'Review this topic in Explanation →':'İlgili konuyu Anlatımda incele →';
 link.addEventListener('click',function(){if(typeof window.showSub==='function')window.showSub('anlatim');});
 box.appendChild(link);
 details.appendChild(box);
}
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
 'p-f0-regime':'regimes','p-dop':'doping','p-f0-sweep':'doping',
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
  var number=match?Number(match[1]):0;
  views[QUESTION_TOPICS[number]||'bands'].soru.appendChild(n);
  appendWhy(n,LEGACY_REASONS[number],lang);
 });
 TOPICS.forEach(function(t){
  var a=PROMPTS[t[0]],qa=elem('div','qa physics-topic-question');
  var title=elem('p','q');title.textContent=lang==='en'?a[2]:a[0];
  var details=elem('details'),sum=elem('summary');sum.textContent=lang==='en'?'Show explanation':'Çözümü göster';
  var p=elem('p');p.textContent=lang==='en'?a[3]:a[1];
  details.appendChild(sum);details.appendChild(p);qa.appendChild(title);qa.appendChild(details);
  appendWhy(qa,QA_REASONS[t[0]],lang);
  views[t[0]].soru.insertBefore(qa,views[t[0]].soru.firstChild);
 });
}
function holeDemo(view,lang){
 var en=lang==='en',root=elem('section','physics-hole-sim');
 var title=elem('h3');title.textContent=en?'Electron and hole: a 2D model':'Elektron ve hol: 2B model';
 var lead=elem('p','physics-hole-help');
 lead.textContent=en?
  'The blue dots represent occupied valence states; the orange ring marks a missing electron (a hole). Select a neighbouring electron or advance one step. This is an analogy for charge transport, not a literal picture of localized electrons in silicon.':
  'Mavi noktalar dolu değerlik durumlarını, turuncu halka eksik elektronu (holü) gösterir. Komşu bir elektronu seçin veya bir adım ilerleyin. Bu gösterim, silisyumdaki elektronların gerçek konumlarını değil taşıyıcı hareketinin analojisini anlatır.';
 var modeBar=elem('div','physics-hole-modebar');
 modeBar.setAttribute('role','group');
 modeBar.setAttribute('aria-label',en?'Simulation mode':'Simülasyon modu');
 var modes=[
  ['transfer',en?'1 · Hole motion':'1 · Hol hareketi'],
  ['pair',en?'2 · Pair creation':'2 · Çift oluşumu'],
  ['field',en?'3 · Electric field':'3 · Elektrik alan']
 ];
 var modeButtons={};
 var controls=elem('div','physics-hole-controls');
 var next=elem('button','sim-btn'),auto=elem('button','sim-btn'),reset=elem('button','sim-btn');
 next.type=auto.type=reset.type='button';
 reset.textContent=en?'Reset':'Sıfırla';
 var inputs=elem('div','physics-hole-inputs');
 var pairInput=elem('label','physics-hole-input');
 var energyText=elem('span'),energy=elem('input'),energyOut=elem('strong');
 energy.type='range';energy.min='0.5';energy.max='2';energy.step='0.1';energy.value='1.5';
 energy.setAttribute('aria-label',en?'Photon energy in electronvolts':'Foton enerjisi (eV)');
 energyText.textContent=en?'Photon energy':'Foton enerjisi';
 pairInput.appendChild(energyText);pairInput.appendChild(energy);pairInput.appendChild(energyOut);
 var fieldInput=elem('label','physics-hole-input');
 var fieldText=elem('span'),field=elem('input'),fieldOut=elem('strong');
 field.type='range';field.min='-3';field.max='3';field.step='1';field.value='1';
 field.setAttribute('aria-label',en?'Electric field direction and strength':'Elektrik alanın yönü ve şiddeti');
 fieldText.textContent=en?'Electric field':'Elektrik alan';
 fieldInput.appendChild(fieldText);fieldInput.appendChild(field);fieldInput.appendChild(fieldOut);
 inputs.appendChild(pairInput);inputs.appendChild(fieldInput);
 var legend=elem('div','physics-hole-legend');
 var electronLabel=elem('span'),holeLabel=elem('span');
 electronLabel.textContent=en?'● Filled state / electron':'● Dolu durum / elektron';
 holeLabel.textContent=en?'○ Empty state / hole':'○ Boş durum / hol';
 electronLabel.className='physics-hole-legend-electron';
 holeLabel.className='physics-hole-legend-hole';
 legend.appendChild(electronLabel);legend.appendChild(holeLabel);
 var boards=elem('div','physics-hole-boards');
 var valence=elem('section','physics-hole-board'),conduction=elem('section','physics-hole-board');
 var valenceTitle=elem('h4'),conductionTitle=elem('h4');
 valenceTitle.textContent=en?'Valence states (top view)':'Değerlik durumları (üstten görünüm)';
 conductionTitle.textContent=en?'Conduction states (top view)':'İletim durumları (üstten görünüm)';
 var valenceCells=elem('div','physics-hole-sites'),conductionCells=elem('div','physics-hole-sites');
 valenceCells.setAttribute('role','group');
 valenceCells.setAttribute('aria-label',en?'Valence-state grid':'Değerlik durumu örgüsü');
 conductionCells.setAttribute('role','img');
 conductionCells.setAttribute('aria-label',en?'Conduction-state grid':'İletim durumu örgüsü');
 valence.appendChild(valenceTitle);valence.appendChild(valenceCells);
 conduction.appendChild(conductionTitle);conduction.appendChild(conductionCells);
 boards.appendChild(valence);boards.appendChild(conduction);
 var status=elem('p','physics-hole-note'),caution=elem('p','physics-hole-caution');
 caution.textContent=en?
  'Conceptual grid only: actual band states are quantum-mechanical and can extend across the crystal. The 1.1 eV photon threshold is illustrative; silicon also requires momentum conservation (often phonons). Recombination is not necessarily light-emitting.':
  'Kavramsal örgü modeli: gerçek bant durumları kristale yayılabilen kuantum durumlarıdır. Foton için kullanılan 1,1 eV eşik örnektir; silisyumda momentum korunumu (çoğu kez fonon) da önemlidir. Yeniden birleşme mutlaka ışık yaymaz.';
 var mode='transfer',hole={x:2,y:2},carrier={x:4,y:2},pair=false,step=0,timer=null;
 var cols=7,rows=5,Eg=1.1,lastMove='';
 function stop(){
  if(timer!==null){clearInterval(timer);timer=null;}
  auto.textContent=en?'Play':'Oynat';
 }
 function resetState(){
  stop();hole={x:2,y:2};carrier={x:4,y:2};pair=false;step=0;lastMove='';
 }
 function direction(dx,dy){
  if(dx>0)return en?'right':'sağa';
  if(dx<0)return en?'left':'sola';
  if(dy>0)return en?'down':'aşağı';
  return en?'up':'yukarı';
 }
 function moveHole(x,y){
  var dx=x-hole.x,dy=y-hole.y;
  if(Math.abs(dx)+Math.abs(dy)!==1||x<0||x>=cols||y<0||y>=rows)return false;
  hole={x:x,y:y};step++;
  lastMove=en?
   'Electron moved '+direction(-dx,-dy)+'; hole appears to move '+direction(dx,dy)+'.':
   'Elektron '+direction(-dx,-dy)+' geçti; hol '+direction(dx,dy)+' ilerlemiş gibi göründü.';
  return true;
 }
 function advance(){
  if(mode==='transfer'){
   var deltas=[[1,0],[0,1],[-1,0],[0,-1]];
   var offset=step%4,found=false;
   for(var j=0;j<4;j++){
    var d=deltas[(offset+j)%4];
    if(moveHole(hole.x+d[0],hole.y+d[1])){found=true;break;}
   }
   return found;
  }
  if(mode==='field'){
   var sign=Math.sign(Number(field.value));
   if(!sign){lastMove=en?'No net drift when E = 0.':'E = 0 iken net sürüklenme yoktur.';return false;}
   var holeX=Math.max(0,Math.min(cols-1,hole.x+sign));
   var electronX=Math.max(0,Math.min(cols-1,carrier.x-sign));
   if(holeX===hole.x&&electronX===carrier.x){
    lastMove=en?'Carriers reached the model boundary.':'Taşıyıcılar model sınırına ulaştı.';return false;
   }
   hole.x=holeX;carrier.x=electronX;step++;
   lastMove=en?
    'Hole drifts '+direction(sign,0)+'; conduction electron drifts '+direction(-sign,0)+'.':
    'Hol '+direction(sign,0)+', iletim elektronu '+direction(-sign,0)+' sürüklenir.';
   return true;
  }
  return false;
 }
 function makeSite(x,y,kind,interactive){
  var cls='physics-site '+(kind==='hole'?'is-hole':kind==='electron'?'is-electron':kind==='carrier'?'is-carrier':'is-empty');
  var cell=elem(interactive?'button':'span',cls);
  cell.dataset.x=String(x);cell.dataset.y=String(y);
  if(interactive){
   cell.type='button';
   var near=Math.abs(x-hole.x)+Math.abs(y-hole.y)===1;
   cell.disabled=!near;
   if(near)cell.classList.add('is-available');
   cell.addEventListener('click',function(){if(moveHole(x,y)){stop();draw();}});
  }
  cell.setAttribute('aria-label',(en?
   (kind==='hole'?'Hole, empty state':kind==='electron'?'Occupied valence state':kind==='carrier'?'Conduction electron':'Empty conduction state'):
   (kind==='hole'?'Hol, boş durum':kind==='electron'?'Dolu değerlik durumu':kind==='carrier'?'İletim elektronu':'Boş iletim durumu'))+' ('+(x+1)+','+(y+1)+')');
  return cell;
 }
 function renderGrid(target,isConduction){
  target.innerHTML='';
  for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){
   var occupied=isConduction?
    (mode==='field'||(mode==='pair'&&pair))&&x===carrier.x&&y===carrier.y:
    !(mode==='pair'&&!pair)&&(x===hole.x&&y===hole.y);
   var kind=isConduction?(occupied?'carrier':'empty'):(occupied?'hole':'electron');
   target.appendChild(makeSite(x,y,kind,mode==='transfer'&&!isConduction&&kind==='electron'));
  }
 }
 function draw(){
  modes.forEach(function(m){
   var active=mode===m[0],b=modeButtons[m[0]];
   b.setAttribute('aria-pressed',String(active));b.classList.toggle('is-active',active);
  });
  boards.classList.toggle('is-double',mode!=='transfer');
  conduction.hidden=mode==='transfer';
  pairInput.hidden=mode!=='pair';fieldInput.hidden=mode!=='field';
  renderGrid(valenceCells,false);
  if(mode!=='transfer')renderGrid(conductionCells,true);
  energyOut.textContent=Number(energy.value).toFixed(1)+' eV';
  var e=Number(field.value);
  fieldOut.textContent=e===0?'E = 0':(e>0?'E → ':'E ← ')+Math.abs(e);
  next.textContent=mode==='pair'?
   (pair?(en?'Recombine':'Yeniden birleştir'):(en?'Send photon':'Foton gönder')):
   (en?'One step':'Bir adım');
  auto.hidden=mode==='pair';
  if(mode==='transfer')status.textContent=lastMove||(en?
    'Select an adjacent blue electron. An electron fills the hole, leaving a new hole at its former position.':
    'Turuncu halkaya komşu mavi elektrona dokunun. Elektron boşluğu doldururken eski konumunda yeni bir hol oluşur.');
  else if(mode==='pair')status.textContent=lastMove||(en?
    'Send a photon to lift one electron from a valence state into a conduction state.':
    'Bir foton göndererek elektronun değerlik durumundan iletim durumuna uyarılmasını gözleyin.');
  else status.textContent=lastMove||(en?
    'E → : holes drift right, conduction electrons drift left. Change the field and advance.':
    'E → : holler sağa, iletim elektronları sola sürüklenir. Alanı değiştirip adım ilerleyin.');
 }
 function chooseMode(id){
  mode=id;resetState();draw();
 }
 modes.forEach(function(m){
  var b=elem('button','physics-hole-mode');b.type='button';b.textContent=m[1];
  b.addEventListener('click',function(){chooseMode(m[0]);});
  b.dataset.mode=m[0];modeButtons[m[0]]=b;modeBar.appendChild(b);
 });
 next.addEventListener('click',function(){
  if(mode==='pair'){
   if(pair){pair=false;lastMove=en?
    'Recombination: a conduction electron fills the hole.':
    'Yeniden birleşme: iletim elektronu boş değerlik durumunu doldurur.';}
   else if(Number(energy.value)<Eg){lastMove=en?
    'Photon energy is below the illustrative 1.1 eV band gap; no pair is created.':
    'Foton enerjisi örnek 1,1 eV bant aralığının altında; çift oluşmadı.';}
   else{pair=true;hole={x:3,y:2};carrier={x:3,y:2};lastMove=en?
    'An electron–hole pair formed: one conduction electron and one empty valence state.':
    'Elektron–hol çifti oluştu: bir iletim elektronu ve bir boş değerlik durumu.';}
  }else{
   var moved=advance();
   if(!moved)stop();
  }
  draw();
 });
 auto.addEventListener('click',function(){
  if(timer!==null){stop();return;}
  if(mode==='pair')return;
  timer=setInterval(function(){
   var page=root.closest&&root.closest('.physics-topic-page');
   var pane=root.closest&&root.closest('.physics-topic-pane');
   if(!root.isConnected||(page&&page.hidden)||(pane&&!pane.classList.contains('active'))){stop();return;}
   if(!advance()){stop();draw();return;}
   draw();
  },mode==='field'?Math.max(250,950-150*Math.abs(Number(field.value))):650);
  auto.textContent=en?'Pause':'Duraklat';
 });
 reset.addEventListener('click',function(){resetState();draw();});
 energy.addEventListener('input',function(){lastMove='';draw();});
 field.addEventListener('input',function(){stop();lastMove='';draw();});
 controls.appendChild(next);controls.appendChild(auto);controls.appendChild(reset);
 root.appendChild(title);root.appendChild(lead);root.appendChild(modeBar);root.appendChild(legend);
 root.appendChild(boards);root.appendChild(inputs);root.appendChild(controls);
 root.appendChild(status);root.appendChild(caution);view.appendChild(root);draw();
}
function createPage(topic,i,lang,views){
 var page=elem('article','physics-topic-page');page.dataset.physicsTopic=topic[0];page.hidden=true;
 var header=elem('header','physics-lesson-heading');
 var n=elem('span','physics-lesson-index');n.textContent=String(i+1).padStart(2,'0');
 var h=elem('h2');h.textContent=langPick([topic[1],topic[2]],lang);
 header.appendChild(n);header.appendChild(h);page.appendChild(header);
 var pageTabs=i<7||topic[0]==='regimes'?TABS:TABS.slice(0,4);
 var tabs=elem('div','subtabs physics-topic-tabs');tabs.setAttribute('role','tablist');
 pageTabs.forEach(function(t){
  var b=elem('button');b.type='button';b.dataset.sub=t[0];
  b.setAttribute('role','tab');b.setAttribute('aria-selected','false');
  b.textContent=langPick([t[1],t[2]],lang);
  b.addEventListener('click',function(){window.showSub(t[0]);});
  tabs.appendChild(b);
 });
 page.appendChild(tabs);
 pageTabs.forEach(function(t){
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
 // Each lesson owns a complete conceptual introduction independent of legacy Week 1 anchors.
 if(window.PhysicsLessonExplanations)window.PhysicsLessonExplanations.inject(views,lang);
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
 if(window.PhysicsLearningGames)window.PhysicsLearningGames.mount(views,lang);
 if(window.SemiconductorTemperatureRegimes)window.SemiconductorTemperatureRegimes.mount(views,lang);
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
 if(!Array.from(shown.querySelectorAll(':scope > .physics-topic-pane')).some(function(p){return p.dataset.pane===key;}))return false;
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
