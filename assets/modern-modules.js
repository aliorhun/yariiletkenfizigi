(() => {
  'use strict';

  window.MODERN_WEEKS = [
    { n:15, t:"Metal–yarıiletken kontaklar", sze:"yüksek lisans ek modülü", ready:true, modern:true },
    { n:16, t:"MOS kapasitör ve MOSFET fiziği", sze:"yüksek lisans ek modülü", ready:true, modern:true },
    { n:17, t:"Heteroeklemler ve kuantum yapıları", sze:"yüksek lisans ek modülü", ready:true, modern:true },
    { n:18, t:"Optoelektronik yarıiletken yapılar", sze:"yüksek lisans ek modülü", ready:true, modern:true },
    { n:19, t:"Hall etkisi ve elektriksel karakterizasyon", sze:"yüksek lisans ek modülü", ready:true, modern:true },
    { n:20, t:"Kusurlar, arayüzler ve malzeme karakterizasyonu", sze:"yüksek lisans ek modülü", ready:true, modern:true }
  ];
  window.MODERN_EN_TITLES = [
    "Metal–semiconductor contacts",
    "MOS capacitor and MOSFET physics",
    "Heterojunctions and quantum structures",
    "Optoelectronic semiconductor structures",
    "Hall effect and electrical characterization",
    "Defects, interfaces and material characterization"
  ];
  window.MODERN_EN_SZE = Array(6).fill("graduate supplement");

  const style = document.createElement('style');
  style.textContent = `
.week-group {
  margin:.65rem .35rem .25rem; padding:.45rem .55rem .3rem;
  border-top:1px solid var(--rule); color:var(--muted);
  font-family:var(--sans); font-size:.74rem; font-weight:600;
  letter-spacing:.08em; text-transform:uppercase;
}
.modern-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:.75rem; margin:1rem 0; }
.modern-card { border:1px solid var(--rule); border-radius:.65rem; padding:.8rem .9rem; background:var(--panel); }
.modern-card h4 { margin:.05rem 0 .35rem; }
.modern-card p { margin:.25rem 0; }
`;
  document.head.appendChild(style);

  const trBloch = String.raw`
<h4>Kristalden banda köprü: Bloch teoremi, Brillouin bölgesi ve Kronig–Penney</h4>
<p>Bir kristalde potansiyel periyodiktir: \(V(x+a)=V(x)\). Bu periyodiklik elektron dalga fonksiyonunun da özel bir biçim almasına yol açar. <b>Bloch teoremi</b> bir özdurumun \(\psi_k(x)=u_k(x)e^{ikx}\) biçiminde yazılabileceğini, \(u_k(x)\)'in örgüyle aynı periyoda sahip olduğunu söyler. Böylece elektron ne tamamen serbesttir ne de tek bir atoma bağlıdır; kristalin tamamına yayılmış bir kuantum durumudur.</p>
<p><b>Kronig–Penney modeli</b>, gerçek kristal potansiyelini basitleştirilmiş periyodik kuyular ve engeller dizisiyle temsil eder. Modelin önemli sonucu ayrıntılı cebir değil, yalnızca belirli enerji aralıklarında gerçek \(k\) çözümlerinin bulunmasıdır. Çözüm bulunan aralıklar <b>izinli bantları</b>, bulunmayan aralıklar ise <b>yasak enerji aralıklarını</b> oluşturur. Yani bant aralığı, periyodik potansiyelde izin verilen dalga çözümlerinin kesintiye uğramasından doğar.</p>
<p>Kristal momentumu \(k\), ters örgünün periyodikliği nedeniyle eşdeğer bölgelere ayrılır. Bir boyutta ilk <b>Brillouin bölgesi</b> \(-\pi/a \le k \le \pi/a\) aralığıdır. Bölge sınırlarında Bragg yansıması duran dalgalar oluşturur ve enerji seviyeleri ayrılarak bant aralığı açılabilir. Sonraki \(E(k)\) ve etkin kütle grafiklerini bu nedenle yalnızca çizim olarak değil, periyodik kristal potansiyelinin sonucu olarak okumak gerekir.</p>
<div class="note"><strong>Bu derste gereken düzey:</strong> Bloch teoremini ispatlamak veya Kronig–Penney denklemini ayrıntılı çözmek değil; periyodik potansiyelin neden bantlar ürettiğini, \(k\)'nın neden doğal değişken olduğunu ve bant eğriliğinin etkin kütleye nasıl bağlandığını kavramaktır.</div>
`;

  const enBloch = String.raw`
<h4>The bridge from crystal to bands: Bloch theorem, Brillouin zone and Kronig–Penney</h4>
<p>In a crystal the potential is periodic: \(V(x+a)=V(x)\). That periodicity gives electronic wavefunctions a special form. <b>Bloch's theorem</b> states that an eigenstate can be written as \(\psi_k(x)=u_k(x)e^{ikx}\), where \(u_k(x)\) has the periodicity of the lattice. The electron is therefore neither completely free nor attached to a single atom; it is a quantum state extended through the crystal.</p>
<p>The <b>Kronig–Penney model</b> replaces the real crystal potential by a simplified periodic sequence of wells and barriers. Its key lesson is the existence of energy intervals with real \(k\) solutions and intervals without them. The former are <b>allowed bands</b>; the latter are <b>forbidden gaps</b>.</p>
<p>Because crystal momentum is periodic in reciprocal space, it is sufficient to work inside the first <b>Brillouin zone</b>; in one dimension \(-\pi/a \le k \le \pi/a\). Bragg reflection at a zone boundary can form standing waves and split energies, opening a gap. The \(E(k)\) diagrams used later should therefore be read as consequences of the periodic lattice, not as arbitrary sketches.</p>
<div class="note"><strong>Required depth here:</strong> the goal is not to prove Bloch's theorem or solve the full Kronig–Penney equation, but to understand why periodicity creates bands, why \(k\) is the natural coordinate, and why band curvature becomes an effective mass.</div>
`;

  function insertBeforeHeading(templateId, prefix, html) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    const h = Array.from(tpl.content.querySelectorAll('h3')).find(x => x.textContent.trim().startsWith(prefix));
    if (h) h.insertAdjacentHTML('beforebegin', html);
  }
  insertBeforeHeading('week1', '1.2 Enerji bantları', trBloch);
  insertBeforeHeading('week1-en', '1.2 Energy bands', enBloch);

  const modernHtml = String.raw`
<template id="week15">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>Metal–yarıiletken temasında iş fonksiyumu ve elektron ilgisini bant diyagramına bağlamak.</li><li>Schottky ve ohmik temasın neden farklı davrandığını açıklamak.</li><li>Katkılama, bariyer genişliği ve tünelleme arasındaki ilişkiyi kurmak.</li></ul></div></div>
<h3>15.1 Metal ile yarıiletken temas ettiğinde ne olur?</h3>
<p>İki malzeme temas etmeden önce vakum seviyesi ortak referans alınabilir. Metalin <b>iş fonksiyonu</b> \(\Phi_M\), bir elektronu Fermi seviyesinden vakuma çıkarmak için gereken enerjidir. Yarıiletkende <b>elektron ilgisi</b> \(\chi\), vakum seviyesi ile iletim bandı kenarı arasındaki farktır; yarıiletken iş fonksiyumu ise katkılama nedeniyle Fermi seviyesinin konumuna bağlıdır.</p>
<p>Temas kurulduğunda termal dengede tek bir Fermi seviyesi oluşmalıdır. Bu nedenle yük aktarımı gerçekleşir, yarıiletken tarafında bantlar bükülür ve bir uzay-yük bölgesi ortaya çıkabilir. İdeal n-tipi Schottky–Mott resminde elektron bariyeri yaklaşık \(\Phi_{Bn}=\Phi_M-\chi\) olur.</p>
<h3>15.2 Schottky bariyeri ve doğrultma</h3>
<p>Metalden yarıiletkene veya ters yönde akımın önemli bir bölümü bariyer üzerinden <b>termiyonik emisyon</b> ile geçer. İdeal akım yoğunluğu yaklaşık olarak \(J=A^{**}T^2e^{-q\Phi_B/kT}\left(e^{qV/nkT}-1\right)\) biçimindedir. Schottky diyotta azınlık taşıyıcı depolanması p-n diyoda göre çok daha azdır; bu nedenle hızlı anahtarlama mümkündür.</p>
<h3>15.3 Ohmik kontak nasıl elde edilir?</h3>
<p>Bir kontakta amaç doğrultma değil, taşıyıcıların iki yönde de küçük gerilim düşümüyle geçmesiyse <b>ohmik kontak</b> istenir. Pratikte çok yoğun \(n^+\) veya \(p^+\) katkılama bariyer genişliğini küçültür; elektronlar bariyer yüksek olsa bile tünelleyebilir. Bu nedenle “bariyer yüksekliği” ile “kontak direnci” aynı şey değildir: genişlik de belirleyicidir.</p>
<h3>15.4 Gerçek arayüzler</h3>
<p>İdeal Schottky–Mott bağıntısı ilk sezgiyi verir; gerçek metal–yarıiletken arayüzlerinde arayüz durumları, metal kaynaklı yasak-aralık durumları, dipoller ve <b>Fermi-level pinning</b> bariyer yüksekliğini metal iş fonksiyonuna beklenenden daha az duyarlı hale getirebilir.</p>
<div class="note"><strong>Bağlantı:</strong> Bu konu, 5. haftadaki yoğun katkılama ve 4. haftadaki tünelleme fiziğini doğrudan gerçek kontak problemine bağlar.</div>
</div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>Si / SiC Schottky güç diyodu</h3><p>Azınlık taşıyıcı depolaması düşük olduğu için yüksek frekanslı doğrultma ve güç dönüştürmede kullanılır. SiC'nin geniş bant aralığı daha yüksek sıcaklık ve ters gerilim sağlar.</p></article><article class="product-card"><h3>CMOS kaynak/savak kontağı</h3><p>Metal silisitler ve ağır katkılı kaynak/savak bölgeleri düşük özgül kontak direnci için tasarlanır.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>Si / SiC Schottky power diode</h3><p>Low minority-carrier storage enables fast rectification and power conversion.</p></article><article class="product-card"><h3>CMOS source/drain contact</h3><p>Metal silicides and heavily doped source/drain regions are engineered for low specific contact resistance.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><h3>Schottky–Mott ve tükenim yaklaşımı</h3><p>\[\Phi_{Bn}=\Phi_M-\chi,\qquad E_C-E_F=kT\ln\frac{N_C}{N_D}\]</p><p>\[V_{bi}\approx \Phi_{Bn}-\frac{E_C-E_F}{q},\qquad W=\sqrt{\frac{2\varepsilon_s(V_{bi}-V)}{qN_D}}\]</p><p>\[J=A^{**}T^2e^{-q\Phi_B/kT}\left(e^{qV/nkT}-1\right)\]</p><p>Yoğun katkılama \(N_D\)'yi artırdığında \(W\propto N_D^{-1/2}\) küçülür ve termiyonik emisyona alan emisyonu/tünelleme katkısı eklenir.</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Schottky bariyeri: metal iş fonksiyumu ve katkılama</h3><p class="why">Metal iş fonksiyumunu ve n-tipi katkıyı değiştirin. Bariyer yüksekliği ideal resimde esas olarak \(\Phi_M-\chi\), bariyer genişliği ise katkılama ile belirlenir.</p><div class="controls"><label>\(\Phi_M\) <input type="range" id="r-ms-phi" min="4.0" max="5.5" step="0.01" value="4.8"><output id="o-ms-phi">4.80 eV</output></label><label>log₁₀ N<sub>D</sub> <input type="range" id="r-ms-nd" min="14" max="20" step="0.1" value="16"><output id="o-ms-nd">1e16.0</output></label></div><div class="readout" id="ro-msbarrier"></div><div class="plot" id="p-msbarrier"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">1. Aynı \(\Phi_B\) için \(N_D\) 100 kat artarsa bariyer genişliği yaklaşık kaç kat değişir?</p><details><summary>Çözümü göster</summary><div>\(W\propto N_D^{-1/2}\) olduğundan genişlik yaklaşık 10 kat küçülür. Bu, yoğun katkılı kontaklarda tünellemeyi kuvvetlendirir.</div></details></div><div class="qa"><p class="q">2. Schottky diyot neden hızlı olabilir?</p><details><summary>Çözümü göster</summary><div>Akım çoğunluk taşıyıcılarıyla taşınır; p-n diyottaki gibi nötr bölgelerde büyük azınlık-taşıyıcı yükü depolanmaz.</div></details></div></div>
</template>

<template id="week15-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>15.1 Metal–semiconductor contact</h3><p>The metal work function \(\Phi_M\) is the energy required to remove an electron from the Fermi level to vacuum. The semiconductor electron affinity \(\chi\) is the vacuum-to-conduction-band separation. After contact, equilibrium requires one Fermi level, so charge transfers and semiconductor bands bend.</p><p>In the ideal Schottky–Mott picture for an n-type semiconductor, \(\Phi_{Bn}\approx\Phi_M-\chi\).</p><h3>15.2 Schottky rectification</h3><p>Transport over the barrier is commonly described by thermionic emission, \(J=A^{**}T^2e^{-q\Phi_B/kT}(e^{qV/nkT}-1)\). Because a Schottky junction stores little minority-carrier charge, it can switch rapidly.</p><h3>15.3 Ohmic contacts</h3><p>Heavy \(n^+\) or \(p^+\) doping narrows the barrier and enables tunnelling. Barrier height and contact resistance are therefore not identical concepts.</p><h3>15.4 Real interfaces</h3><p>Interface states, metal-induced gap states, dipoles and Fermi-level pinning can make the measured barrier less sensitive to metal work function than the ideal model predicts.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[\Phi_{Bn}=\Phi_M-\chi,\quad E_C-E_F=kT\ln(N_C/N_D)\]</p><p>\[V_{bi}\approx\Phi_{Bn}-(E_C-E_F)/q,\quad W=\sqrt{2\varepsilon_s(V_{bi}-V)/(qN_D)}\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Schottky barrier</h3><p class="why">Change metal work function and n-type doping.</p><div class="controls"><label>\(\Phi_M\) <input type="range" id="r-ms-phi" min="4.0" max="5.5" step="0.01" value="4.8"><output id="o-ms-phi">4.80 eV</output></label><label>log₁₀ N<sub>D</sub> <input type="range" id="r-ms-nd" min="14" max="20" step="0.1" value="16"><output id="o-ms-nd">1e16.0</output></label></div><div class="readout" id="ro-msbarrier"></div><div class="plot" id="p-msbarrier"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">If \(N_D\) rises by 100×, how does depletion width change?</p><details><summary>Show solution</summary><div>It falls by about 10× because \(W\propto N_D^{-1/2}\).</div></details></div></div>
</template>

<template id="week16">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>MOS kapasitörde birikim, tükenim ve tersinimi bant bükülmesiyle açıklamak.</li><li>Flat-band ve eşik gerilimini fiziksel anlamıyla yorumlamak.</li><li>MOSFET kanalının alanla oluşturulan tersinim tabakası olduğunu görmek.</li></ul></div></div>
<h3>16.1 MOS yapısı</h3><p>İdeal MOS kapasitör kapı, yalıtkan oksit ve yarıiletkenden oluşur. Oksit DC akımı idealde engeller; kapı gerilimi elektrik alan yoluyla yarıiletken yüzeyindeki taşıyıcı dağılımını değiştirir.</p>
<h3>16.2 Birikim, tükenim ve tersinim</h3><p>p-tipi bir tabanda negatif kapı gerilimi holleri yüzeye çeker ve <b>birikim</b> oluşturur. Pozitif gerilim önce holleri yüzeyden uzaklaştırarak <b>tükenim</b> bölgesi yaratır. Yüzey potansiyeli yaklaşık \(2\phi_F\)'ye ulaştığında elektronlar yüzeyde çoğunluk hale gelir ve <b>güçlü tersinim</b> başlar.</p>
<h3>16.3 Flat-band ve eşik</h3><p><b>Flat-band gerilimi</b> \(V_{FB}\), yarıiletkende bant bükülmesinin olmadığı kapı gerilimidir; iş fonksiyumu farkı ve oksit yükleri tarafından kaydırılır. Eşik gerilimi yaklaşık \(V_T=V_{FB}+2\phi_F+\sqrt{4q\varepsilon_sN_A\phi_F}/C_{ox}\) biçimindedir.</p>
<h3>16.4 MOSFET kanalı</h3><p>nMOS'ta kapı gerilimi eşikten büyük olduğunda kaynak ile savak arasında elektronlardan oluşan ince bir tersinim tabakası ortaya çıkar. Kanal yükü uzun-kanal yaklaşımında yaklaşık \(Q_i\approx-C_{ox}(V_G-V_T-V(x))\)'dir. Savak gerilimi arttıkça kanal yükü savak ucunda azalır; \(V_{DS}\approx V_G-V_T\) olduğunda pinch-off başlar.</p>
<h3>16.5 Gerçek MOS arayüzü</h3><p>Oksit içindeki sabit yük, mobil iyonlar ve Si/SiO₂ arayüz durumları C–V eğrisini kaydırabilir ve taşıyıcı hareketliliğini düşürebilir. Yüksek-k dielektrikler ve metal kapılar bu elektrostatik problemin modern sürümüdür.</p></div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>CMOS logic transistor</h3><p>Kapı alanı tersinim kanalını açıp kapatarak çok küçük statik kapı akımıyla anahtarlama sağlar.</p></article><article class="product-card"><h3>CMOS görüntü sensörü</h3><p>MOS kapasitansları ve MOSFET'ler fotodiyot yükünü toplamak, tamponlamak ve okumak için kullanılır.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>CMOS logic transistor</h3><p>The gate field creates or removes an inversion channel with very low static gate current.</p></article><article class="product-card"><h3>CMOS image sensor</h3><p>MOS capacitances and MOSFETs collect, buffer and read photodiode charge.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[C_{ox}=\frac{\varepsilon_{ox}}{t_{ox}},\qquad \phi_F=\frac{kT}{q}\ln\frac{N_A}{n_i}\]</p><p>\[W_{d,\max}\approx\sqrt{\frac{4\varepsilon_s\phi_F}{qN_A}},\qquad C_{dep}=\frac{\varepsilon_s}{W_d}\]</p><p>\[V_T=V_{FB}+2\phi_F+\frac{\sqrt{4q\varepsilon_sN_A\phi_F}}{C_{ox}}\]</p><p>Yüksek frekans C–V'de azınlık taşıyıcıları AC sinyali takip edemez; düşük frekansta tersinim yükü yanıt verdiği için kapasitans tekrar \(C_{ox}\)'a yaklaşabilir.</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>İdeal MOS C–V</h3><p class="why">p-tipi taban için yüksek ve düşük frekans C–V eğrilerini karşılaştırın. Katkı ve oksit kalınlığını değiştirin.</p><div class="controls"><label>log₁₀ N<sub>A</sub> <input type="range" id="r-mos-na" min="14" max="18" step="0.1" value="16"><output id="o-mos-na">1e16.0</output></label><label>t<sub>ox</sub> <input type="range" id="r-mos-tox" min="2" max="50" step="1" value="10"><output id="o-mos-tox">10 nm</output></label></div><div class="readout" id="ro-moscv"></div><div class="plot" id="p-moscv"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">p-tipi MOS'ta kapıya negatif gerilim uygulanınca neden birikim oluşur?</p><details><summary>Çözümü göster</summary><div>Negatif kapı alanı pozitif yüklü çoğunluk taşıyıcı holleri Si/oksit arayüzüne çeker.</div></details></div><div class="qa"><p class="q">Oksit inceltilirse eşik geriliminin tükenim-yükü katkısı nasıl değişir?</p><details><summary>Çözümü göster</summary><div>\(C_{ox}\) büyür ve \(Q_d/C_{ox}\) küçülür.</div></details></div></div>
</template>

<template id="week16-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>16.1 MOS structure</h3><p>An ideal MOS capacitor contains a gate, insulating oxide and semiconductor. The gate field controls carrier density at the semiconductor surface.</p><h3>16.2 Accumulation, depletion and inversion</h3><p>For a p-type body, negative gate voltage attracts holes and causes accumulation. Positive voltage repels holes, creating depletion. Near \(\psi_s=2\phi_F\), electrons become dominant at the surface and strong inversion begins.</p><h3>16.3 Flat-band and threshold</h3><p>\(V_{FB}\) is the gate voltage for flat semiconductor bands. A useful threshold expression is \(V_T=V_{FB}+2\phi_F+\sqrt{4q\varepsilon_sN_A\phi_F}/C_{ox}\).</p><h3>16.4 MOSFET channel</h3><p>Above threshold an nMOS develops an electron inversion layer between source and drain. In the gradual-channel picture \(Q_i\approx-C_{ox}(V_G-V_T-V(x))\).</p><h3>16.5 Real interfaces</h3><p>Fixed oxide charge, mobile ions and interface traps shift C–V curves and degrade mobility.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[C_{ox}=\varepsilon_{ox}/t_{ox},\quad \phi_F=(kT/q)\ln(N_A/n_i)\]</p><p>\[W_{d,\max}\approx\sqrt{4\varepsilon_s\phi_F/(qN_A)},\quad V_T=V_{FB}+2\phi_F+\sqrt{4q\varepsilon_sN_A\phi_F}/C_{ox}\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Ideal MOS C–V</h3><p class="why">Compare high- and low-frequency C–V while changing doping and oxide thickness.</p><div class="controls"><label>log₁₀ N<sub>A</sub> <input type="range" id="r-mos-na" min="14" max="18" step="0.1" value="16"><output id="o-mos-na">1e16.0</output></label><label>t<sub>ox</sub> <input type="range" id="r-mos-tox" min="2" max="50" step="1" value="10"><output id="o-mos-tox">10 nm</output></label></div><div class="readout" id="ro-moscv"></div><div class="plot" id="p-moscv"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">Why does negative gate voltage cause accumulation in a p-type MOS capacitor?</p><details><summary>Show solution</summary><div>The gate field attracts positively charged majority holes toward the interface.</div></details></div></div>
</template>

<template id="week17">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>Heteroeklemde bant süreksizliklerini açıklamak.</li><li>Type-I, Type-II ve Type-III hizalanmaları ayırt etmek.</li><li>Boyut küçüldükçe enerji seviyeleri ve durum yoğunluğunun nasıl değiştiğini görmek.</li></ul></div></div>
<h3>17.1 Heteroeklem nedir?</h3><p>Farklı bant aralığına ve elektron ilgisine sahip iki yarıiletken epitaksiyel olarak birleştirildiğinde iletim ve valans bandı kenarları arayüzde süreksizlik gösterebilir. Bu farklar \(\Delta E_C\) ve \(\Delta E_V\) ile tanımlanır. Fermi seviyesi dengede süreklidir; bant ofsetleri taşıyıcıların hangi tarafta hapsolacağını belirler.</p>
<h3>17.2 Bant hizalanma tipleri</h3><p><b>Type-I</b> yapıda elektron ve holler aynı dar-bant-aralıklı malzemede hapsolabilir. <b>Type-II</b> yapıda elektron ve hol farklı katmanlarda bulunur. <b>Type-III</b> yapıda bir tarafın iletim bandı diğerinin valans bandının altına geçer.</p>
<h3>17.3 Kuantum hapsi</h3><p>Bir boyut taşıyıcının de Broglie dalga boyu mertebesine indirildiğinde sürekli \(k\) durumlarının bir kısmı ayrık alt-bantlara dönüşür. Basit sonsuz kuyu modelinde \(E_n=\hbar^2\pi^2n^2/(2m^*L^2)\); kuyu daraldıkça seviyeler \(1/L^2\) ile hızla ayrılır.</p>
<h3>17.4 Boyuta göre durum yoğunluğu</h3><p>Bulk 3B sistemde DOS \(\propto\sqrt{E-E_C}\), 2B kuantum kuyusunda basamaklı, 1B telde bant kenarlarında \(1/\sqrt{E-E_n}\) tekillikli, 0B kuantum noktada ise ayrık çizgiler biçimindedir.</p>
<h3>17.5 HBT ve HEMT bağlantısı</h3><p>SiGe HBT'de heteroeklem emetör enjeksiyon verimini yükseltir. AlGaN/GaN HEMT'de polarizasyon yükleri arayüzde yüksek yoğunluklu iki boyutlu elektron gazı (2DEG) oluşturabilir.</p></div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>GaAs/AlGaAs lazer</h3><p>Type-I kuantum kuyuları elektron ve holleri aynı aktif bölgede hapsederek ışınımsal yeniden birleşmeyi kuvvetlendirir.</p></article><article class="product-card"><h3>AlGaN/GaN HEMT</h3><p>Arayüzdeki 2DEG yüksek akım yoğunluğu ve yüksek frekanslı güç işlemini mümkün kılar.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>GaAs/AlGaAs laser</h3><p>Type-I quantum wells confine electrons and holes in the same active region.</p></article><article class="product-card"><h3>AlGaN/GaN HEMT</h3><p>An interfacial 2DEG supports high-current and high-frequency operation.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[E_n=\frac{\hbar^2\pi^2 n^2}{2m^*L^2}\]</p><p>\[g_{3D}(E)\propto\sqrt{E-E_C},\quad g_{2D}(E)=\text{basamak},\quad g_{1D}(E)\propto\frac{1}{\sqrt{E-E_n}},\quad g_{0D}(E)\sim\delta(E-E_n)\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Kuantum kuyusu: genişlik enerji seviyelerini nasıl değiştirir?</h3><p class="why">GaAs benzeri \(m^*=0.067m_0\) için sonsuz kuyu yaklaşımı.</p><div class="controls"><label>L <input type="range" id="r-qw-l" min="3" max="20" step="0.5" value="10"><output id="o-qw-l">10.0 nm</output></label></div><div class="readout" id="ro-qwell"></div><div class="plot" id="p-qwell"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">Kuantum kuyusu genişliği yarıya indirilirse aynı seviye yaklaşık kaç kat yükselir?</p><details><summary>Çözümü göster</summary><div>\(E_n\propto1/L^2\) olduğundan enerji yaklaşık 4 kat artar.</div></details></div></div>
</template>

<template id="week17-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>17.1 Heterojunctions</h3><p>Joining semiconductors with different band gaps and electron affinities can produce conduction- and valence-band offsets \(\Delta E_C\) and \(\Delta E_V\).</p><h3>17.2 Type-I, Type-II and Type-III</h3><p>Type-I confines electrons and holes in the same narrow-gap material; Type-II separates them into different layers; Type-III has a broken-gap alignment.</p><h3>17.3 Quantum confinement</h3><p>When a dimension approaches a carrier wavelength, continuous states become discrete subbands. For an infinite well \(E_n=\hbar^2\pi^2n^2/(2m^*L^2)\).</p><h3>17.4 Density of states</h3><p>3D DOS has a square-root onset, 2D is step-like, 1D contains edge singularities and 0D gives discrete levels.</p><h3>17.5 HBT and HEMT</h3><p>SiGe HBTs improve emitter injection; AlGaN/GaN HEMTs can form a high-density 2DEG at the interface.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[E_n=\hbar^2\pi^2n^2/(2m^*L^2)\]</p><p>\[g_{3D}\propto\sqrt{E-E_C},\quad g_{2D}=\text{steps},\quad g_{1D}\propto1/\sqrt{E-E_n},\quad g_{0D}\sim\delta(E-E_n)\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Quantum-well width and energy levels</h3><p class="why">Infinite-well approximation with \(m^*=0.067m_0\).</p><div class="controls"><label>L <input type="range" id="r-qw-l" min="3" max="20" step="0.5" value="10"><output id="o-qw-l">10.0 nm</output></label></div><div class="readout" id="ro-qwell"></div><div class="plot" id="p-qwell"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">If well width is halved, how does the same level energy change?</p><details><summary>Show solution</summary><div>It rises by roughly 4×.</div></details></div></div>
</template>

<template id="week18">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>Foton enerjisini bant aralığı ve \(E(k)\) ile ilişkilendirmek.</li><li>Soğurma, fotodedeksiyon ve ışık yayımını aynı bant resmiyle açıklamak.</li><li>Direkt ve dolaylı bant aralığının optoelektronik sonuçlarını görmek.</li></ul></div></div>
<h3>18.1 Foton soğurma</h3><p>Bir fotonun enerjisi \(E_\gamma=h\nu=hc/\lambda\)'dır. Bantlar arası soğurma için en azından \(h\nu\gtrsim E_g\) gerekir. Ancak kristal momentumunun korunumu da önemlidir; foton momentumu kristal ölçeğinde küçüktür.</p>
<h3>18.2 Direkt ve dolaylı yarıiletkenler</h3><p>GaAs ve GaN gibi direkt bant aralıklı malzemelerde iletim minimumu ile valans maksimumu aynı \(k\)'dadır; ışımalı yeniden birleşme güçlüdür. Si gibi dolaylı malzemelerde momentum farkını bir fononun sağlaması gerekir.</p>
<h3>18.3 Fotodiyot</h3><p>Ters kutuplu p-n veya p-i-n yapıda soğurulan foton elektron–hol çifti üretir. Tükenim bölgesindeki alan taşıyıcıları zıt yönlere süpürür ve fotokuruntu oluşturur.</p>
<h3>18.4 Güneş hücresi</h3><p>Işık altında üretim, karanlık diyot akımına ters yönde bir akım ekler. \(I=I_0(e^{qV/nkT}-1)-I_{ph}\) denklemi açık-devre gerilimi, kısa-devre akımı ve maksimum güç noktasını aynı modelde birleştirir.</p>
<h3>18.5 LED ve lazer</h3><p>İleri kutuplamada enjekte edilen elektron ve holler ışımalı olarak yeniden birleşebilir. Lazer için nüfus terslenmesi, optik kazanç ve rezonatör geri beslemesi gerekir. Kuantum kuyuları taşıyıcıları aktif bölgede yoğunlaştırabilir.</p></div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>GaN mavi LED</h3><p>Direkt geniş bant aralığı kısa dalga boyunda verimli ışık üretimine uygundur.</p></article><article class="product-card"><h3>Si fotodiyot / güneş hücresi</h3><p>Dolaylı bant aralığına rağmen olgun proses ve elektronik entegrasyon avantajı sunar.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>GaN blue LED</h3><p>A direct wide band gap enables efficient short-wavelength emission.</p></article><article class="product-card"><h3>Si photodiode / solar cell</h3><p>Despite an indirect gap, silicon offers mature processing and excellent electronics integration.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[E_\gamma=h\nu=\frac{hc}{\lambda}\approx\frac{1240\ \mathrm{eV\,nm}}{\lambda(\mathrm{nm})}\]</p><p>\[\lambda_c\approx\frac{1240}{E_g(\mathrm{eV})}\ \mathrm{nm}\]</p><p>\[I=I_0(e^{qV/nkT}-1)-I_{ph},\qquad V_{oc}\approx\frac{nkT}{q}\ln\left(1+\frac{I_{ph}}{I_0}\right)\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Foton enerjisi ile bant aralığını karşılaştır</h3><p class="why">Dalga boyunu değiştirin. Foton enerjisi seçilen malzemenin \(E_g\)'sinin üstündeyse bantlar arası soğurma enerjisel olarak mümkündür.</p><div class="controls"><label>\(\lambda\) <input type="range" id="r-opto-lam" min="300" max="2000" step="10" value="850"><output id="o-opto-lam">850 nm</output></label></div><div class="readout" id="ro-opto"></div><div class="plot" id="p-opto"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">850 nm fotonun enerjisi yaklaşık kaç eV'dir ve Si'de soğurma enerjisel olarak mümkün müdür?</p><details><summary>Çözümü göster</summary><div>\(E_\gamma\approx1240/850=1.46\) eV. Si'nin yaklaşık 1.12 eV bant aralığından büyüktür; dolaylı geçişte ayrıca fonon gerekir.</div></details></div></div>
</template>

<template id="week18-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>18.1 Photon absorption</h3><p>\(E_\gamma=h\nu=hc/\lambda\). Interband absorption requires roughly \(h\nu\gtrsim E_g\), but crystal momentum must also be conserved.</p><h3>18.2 Direct and indirect gaps</h3><p>GaAs and GaN allow strong radiative transitions; Si requires phonon assistance for interband momentum conservation.</p><h3>18.3 Photodiodes</h3><p>Absorbed photons generate electron–hole pairs; the depletion field separates them and produces photocurrent.</p><h3>18.4 Solar cells</h3><p>Illumination adds a photocurrent opposite to the dark diode current.</p><h3>18.5 LEDs and lasers</h3><p>Forward injection enables radiative recombination; a laser additionally requires optical gain and cavity feedback.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[E_\gamma\approx1240/\lambda(\mathrm{nm})\ \mathrm{eV},\quad \lambda_c\approx1240/E_g\]</p><p>\[I=I_0(e^{qV/nkT}-1)-I_{ph}\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Photon energy versus band gap</h3><p class="why">Move the wavelength and compare photon energy with common semiconductor band gaps.</p><div class="controls"><label>\(\lambda\) <input type="range" id="r-opto-lam" min="300" max="2000" step="10" value="850"><output id="o-opto-lam">850 nm</output></label></div><div class="readout" id="ro-opto"></div><div class="plot" id="p-opto"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">What is the energy of an 850 nm photon?</p><details><summary>Show solution</summary><div>\(1240/850\approx1.46\) eV.</div></details></div></div>
</template>

<template id="week19">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>Hall ölçümünden taşıyıcı işaretini ve yoğunluğunu çıkarmak.</li><li>Özdirenç ve Hall verisini birleştirerek hareketlilik hesaplamak.</li><li>I–V ve C–V ölçümlerinin hangi fiziksel bilgiyi verdiğini ayırt etmek.</li></ul></div></div>
<h3>19.1 Hall etkisi</h3><p>Akım taşıyan bir yarıiletkene akıma dik manyetik alan uygulandığında Lorentz kuvveti taşıyıcıları numunenin bir kenarına iter. Oluşan enine elektrik alan kuvveti dengelediğinde <b>Hall gerilimi</b> ölçülür. Tek taşıyıcı yaklaşımında \(R_H\approx\pm1/(qn)\); işaret çoğunluk taşıyıcısının elektron mu hol mü olduğunu gösterir.</p>
<h3>19.2 Taşıyıcı yoğunluğu ve hareketlilik</h3><p>Dikdörtgen bir numunede \(V_H=R_HIB/t\). Aynı numunenin iletkenliği \(\sigma\) biliniyorsa \(\mu=|R_H|\sigma\) ile Hall hareketliliği bulunur.</p>
<h3>19.3 Four-point probe</h3><p>Dört uçlu ölçümde dış iki uçtan akım geçirilir, iç iki uçtan gerilim okunur. Gerilim uçlarından ihmal edilebilir akım geçtiği için kontak ve kablo dirençlerinin etkisi büyük ölçüde ayrıştırılır. İnce filmlerde sonuç çoğunlukla sheet resistance \(R_\square\) olarak ifade edilir.</p>
<h3>19.4 I–V ve C–V ne söyler?</h3><p>I–V ölçümü bariyer, idealite, seri direnç, sızıntı ve kırılma hakkında bilgi verir. C–V ise tükenim genişliği ve katkı profiline duyarlıdır; MOS yapıda flat-band gerilimi, oksit kapasitansı ve arayüz durumları da incelenebilir.</p></div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>Hall sensörü</h3><p>Manyetik alanı gerilime çevirir; telefon, otomotiv ve motor komütasyonunda yaygındır.</p></article><article class="product-card"><h3>Wafer parametre ölçümü</h3><p>Hall + four-point probe proses sonrası taşıyıcı yoğunluğu, sheet resistance ve mobilite takibinde kullanılır.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>Hall sensor</h3><p>Converts magnetic field into voltage for phones, vehicles and motor commutation.</p></article><article class="product-card"><h3>Wafer parameter measurement</h3><p>Hall and four-point-probe data track carrier density, sheet resistance and mobility.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[R_H=\frac{E_y}{J_xB_z}\approx\pm\frac{1}{qn},\qquad V_H=\frac{R_H I B}{t}\]</p><p>\[\sigma=q n\mu\quad\Rightarrow\quad \mu=|R_H|\sigma\]</p><p>Çoklu bant veya eşzamanlı elektron–hol taşınımında Hall faktörü ve iki-taşıyıcı modeli gerekebilir.</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Hall gerilimi</h3><p class="why">Taşıyıcı yoğunluğu yükseldikçe Hall geriliminin neden küçüldüğünü ve elektron/hol işaret farkını görün.</p><div class="controls"><label>log₁₀ n,p <input type="range" id="r-hall-n" min="14" max="19" step="0.1" value="16"><output id="o-hall-n">1e16.0</output></label><label>I <input type="range" id="r-hall-i" min="1" max="100" step="1" value="10"><output id="o-hall-i">10 mA</output></label></div><div class="readout" id="ro-hall"></div><div class="plot" id="p-hall"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">Hall katsayısı negatif ölçülüyorsa tek-taşıyıcı yaklaşımında çoğunluk taşıyıcı tipi nedir?</p><details><summary>Çözümü göster</summary><div>Elektronlardır.</div></details></div></div>
</template>

<template id="week19-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>19.1 Hall effect</h3><p>A magnetic field perpendicular to current deflects carriers through the Lorentz force. In a one-carrier model \(R_H\approx\pm1/(qn)\).</p><h3>19.2 Density and mobility</h3><p>\(V_H=R_HIB/t\). Combining Hall coefficient with conductivity gives \(\mu=|R_H|\sigma\).</p><h3>19.3 Four-point probe</h3><p>Separate current and voltage probes largely remove contact resistance and give resistivity or sheet resistance.</p><h3>19.4 I–V and C–V</h3><p>I–V reveals barriers, leakage, ideality, series resistance and breakdown; C–V probes depletion width, doping profile, oxide capacitance and interface effects.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[R_H\approx\pm1/(qn),\quad V_H=R_HIB/t,\quad \mu=|R_H|\sigma\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Hall voltage</h3><p class="why">Change carrier density and current; compare the sign for electrons and holes.</p><div class="controls"><label>log₁₀ n,p <input type="range" id="r-hall-n" min="14" max="19" step="0.1" value="16"><output id="o-hall-n">1e16.0</output></label><label>I <input type="range" id="r-hall-i" min="1" max="100" step="1" value="10"><output id="o-hall-i">10 mA</output></label></div><div class="readout" id="ro-hall"></div><div class="plot" id="p-hall"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">What does a negative Hall coefficient indicate?</p><details><summary>Show solution</summary><div>Electron majority carriers in the one-carrier model.</div></details></div></div>
</template>

<template id="week20">
<div class="pane" data-pane="anlatim"><div class="prose">
<div class="edu-card"><div class="edu-tr"><div class="edu-label">🎯 Bu hafta ne öğreneceğiz?</div><ul><li>İdeal kristal ile gerçek cihaz arasındaki farkı kusur ve arayüz durumlarıyla açıklamak.</li><li>SRH rekombinasyonunu kusur fiziğine bağlamak.</li><li>XRD, Raman, PL ve UV–Vis ölçümlerinin hangi bilgiyi verdiğini ayırt etmek.</li></ul></div></div>
<h3>20.1 Noktasal ve uzatılmış kusurlar</h3><p>Boşluk (vacancy), arayer (interstitial), yer-değiştirmiş yabancı atom ve kompleksler yerel potansiyeli değiştirerek yasak aralıkta seviyeler oluşturabilir. Dislokasyonlar ve tane sınırları uzatılmış kusurlardır; rekombinasyon, saçılma ve sızıntı için etkin merkezler olabilir.</p>
<h3>20.2 Tuzaklar ve SRH fiziği</h3><p>Yasak aralıktaki bir tuzak önce bir taşıyıcıyı, sonra karşı tür taşıyıcıyı yakalayarak bantlar arası doğrudan geçiş gerektirmeden rekombinasyon sağlayabilir. Eşit yakalama kesitleri için orta-bant civarındaki seviyeler genellikle etkin SRH merkezleridir.</p>
<h3>20.3 Yüzey ve arayüz durumları</h3><p>Kristalin yüzeyinde periyodik bağ ağı kesilir. Doymamış bağlar ve kimyasal kusurlar yüzey durumları üretir; bunlar Fermi seviyesini sabitleyebilir, bant bükülmesine yol açabilir ve MOS arayüzünde eşik/alt-eşik davranışını etkileyebilir. Pasivasyonun amacı bu durum yoğunluğunu azaltmaktır.</p>
<h3>20.4 Yapısal ve optik karakterizasyon</h3><div class="modern-grid"><div class="modern-card"><h4>XRD</h4><p>Kristal faz, örgü parametresi, yönelim ve strain.</p></div><div class="modern-card"><h4>Raman</h4><p>Fonon modları; strain, sıcaklık ve kompozisyon.</p></div><div class="modern-card"><h4>Fotolüminesans (PL)</h4><p>Radyatif geçişler, eksitonlar ve kusur ilişkili emisyon.</p></div><div class="modern-card"><h4>UV–Vis</h4><p>Soğurma kenarı ve optik bant aralığı.</p></div></div>
<h3>20.5 Ölçüm zincirini kapatmak</h3><p>Hall elektriksel taşıyıcıları, XRD kristal yapıyı, PL optik yeniden birleşmeyi ve C–V uzay-yük/arayüz elektrostatiklerini görür. Aynı numunede bu ölçümlerin birlikte yorumlanması yapı–özellik–cihaz ilişkisini kurar.</p></div></div>
<div class="pane" data-pane="urun"><div class="edu-tr"><div class="product-grid"><article class="product-card"><h3>Si/SiO₂ arayüz pasivasyonu</h3><p>Düşük arayüz durum yoğunluğu modern MOS teknolojisinin temel başarılarından biridir.</p></article><article class="product-card"><h3>GaN epitaksi kalite kontrolü</h3><p>XRD ve Raman strain/kristal kaliteyi, PL ise optik aktif kusurları tamamlayıcı biçimde izler.</p></article></div></div><div class="edu-en"><div class="product-grid"><article class="product-card"><h3>Si/SiO₂ interface passivation</h3><p>Low interface-state density is a key achievement behind MOS technology.</p></article><article class="product-card"><h3>GaN epitaxy quality control</h3><p>XRD and Raman track structure and strain, while PL probes radiative transitions and defects.</p></article></div></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[U_{SRH}=\frac{np-n_i^2}{\tau_p(n+n_1)+\tau_n(p+p_1)}\]</p><p>\[n_1=n_i e^{(E_t-E_i)/kT},\qquad p_1=n_i e^{(E_i-E_t)/kT}\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Tuzak enerjisi ve SRH etkinliği</h3><p class="why">Basitleştirilmiş simetrik model, orta-bant tuzaklarının neden özellikle etkili olabildiğini gösterir.</p><div class="controls"><label>T <input type="range" id="r-trap-t" min="150" max="500" step="10" value="300"><output id="o-trap-t">300 K</output></label></div><div class="readout" id="ro-traps"></div><div class="plot" id="p-traps"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">Neden yalnızca XRD ölçerek bir yarıiletkenin elektriksel kalitesini tam söyleyemeyiz?</p><details><summary>Çözümü göster</summary><div>XRD uzun menzilli kristal düzen ve strain hakkında bilgi verir; taşıyıcı yoğunluğu, mobilite, elektriksel tuzaklar ve arayüz elektrostatikleri için Hall, PL, C–V gibi tamamlayıcı teknikler gerekir.</div></details></div></div>
</template>

<template id="week20-en">
<div class="pane" data-pane="anlatim"><div class="prose"><h3>20.1 Defects in real crystals</h3><p>Vacancies, interstitials, substitutional impurities and complexes can create localized gap states. Dislocations and grain boundaries may enhance recombination, scattering and leakage.</p><h3>20.2 Traps and SRH recombination</h3><p>A gap state can capture one carrier and then the opposite carrier. For comparable capture cross sections, levels near midgap are often particularly effective SRH centers.</p><h3>20.3 Surface and interface states</h3><p>Dangling bonds and chemical defects can pin the Fermi level, bend bands and alter MOS threshold and subthreshold behavior. Passivation reduces their density.</p><h3>20.4 Structural and optical characterization</h3><div class="modern-grid"><div class="modern-card"><h4>XRD</h4><p>Phase, lattice parameter, orientation and strain.</p></div><div class="modern-card"><h4>Raman</h4><p>Phonons, strain, temperature and composition.</p></div><div class="modern-card"><h4>Photoluminescence</h4><p>Radiative transitions, excitons and defect emission.</p></div><div class="modern-card"><h4>UV–Vis</h4><p>Absorption edge and optical band gap.</p></div></div><h3>20.5 Closing the measurement loop</h3><p>Hall probes carriers, XRD crystal structure, PL optical recombination and C–V electrostatics. Combining them connects structure, properties and device behavior.</p></div></div>
<div class="pane" data-pane="matematik"><div class="prose"><p>\[U_{SRH}=\frac{np-n_i^2}{\tau_p(n+n_1)+\tau_n(p+p_1)}\]</p><p>\[n_1=n_i e^{(E_t-E_i)/kT},\quad p_1=n_i e^{(E_i-E_t)/kT}\]</p></div></div>
<div class="pane" data-pane="gorsel"><div class="prose"><section class="fig"><h3>Trap energy and SRH effectiveness</h3><p class="why">A simplified symmetric model shows why midgap traps can be strong recombination centers.</p><div class="controls"><label>T <input type="range" id="r-trap-t" min="150" max="500" step="10" value="300"><output id="o-trap-t">300 K</output></label></div><div class="readout" id="ro-traps"></div><div class="plot" id="p-traps"></div></section></div></div>
<div class="pane" data-pane="soru"><div class="qa"><p class="q">Why is XRD alone insufficient to determine electrical quality?</p><details><summary>Show solution</summary><div>It does not directly measure carrier density, mobility, electrically active traps or interface electrostatics.</div></details></div></div>
</template>
`;

  document.body.insertAdjacentHTML('beforeend', modernHtml);

  window.registerModernPlots = function(ctx) {
    const PLOTS=ctx.PLOTS, val=ctx.val, lin=ctx.lin, KT300=ctx.KT300, K_B=ctx.K_B,
          NI300=ctx.NI300, EPS=ctx.EPS, Q=ctx.Q, css=ctx.css,
          baseLayout=ctx.baseLayout, CFG=ctx.CFG, L=ctx.L;

    PLOTS['p-msbarrier'] = el => {
      const phiM=val('r-ms-phi'), ND=Math.pow(10,val('r-ms-nd'));
      const chi=4.05, Nc=2.8e19, phiB=Math.max(0.05,phiM-chi);
      const dEc=KT300*Math.log(Nc/ND), vbi=Math.max(0.01,phiB-dEc);
      const Wcm=Math.sqrt(2*EPS*vbi/(Q*ND)), Wnm=Wcm*1e7;
      const x=lin(0,1,180), Ec=x.map(u=>dEc+vbi*(1-u)*(1-u));
      const ro=document.getElementById('ro-msbarrier');
      if(ro) ro.innerHTML='Φ<sub>Bn</sub> ≈ '+phiB.toFixed(2)+' eV &nbsp;|&nbsp; E<sub>C</sub>−E<sub>F</sub> ≈ '+dEc.toFixed(2)+' eV &nbsp;|&nbsp; W ≈ '+Wnm.toFixed(Wnm<10?1:0)+' nm';
      Plotly.react(el,[{x:x.map(u=>u*Wnm),y:Ec,mode:'lines',name:'E_C−E_F',line:{width:3}},{x:[0,Wnm],y:[0,0],mode:'lines',name:'E_F',line:{dash:'dash'}}],
        baseLayout({xaxis:{title:L('yarıiletkene doğru x (nm)','x into semiconductor (nm)'),color:css('--ink'),gridcolor:css('--rule')},yaxis:{title:L('enerji (eV)','energy (eV)'),color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };

    PLOTS['p-moscv'] = el => {
      const NA=Math.pow(10,val('r-mos-na')), tox=val('r-mos-tox')*1e-7;
      const epsOx=3.9*8.854e-14, Cox=epsOx/tox, phiF=KT300*Math.log(NA/NI300);
      const Wmax=Math.sqrt(4*EPS*phiF/(Q*NA)), Cdep=EPS/Wmax, Cmin=Cox*Cdep/(Cox+Cdep);
      const VT=2*phiF+Math.sqrt(4*Q*EPS*NA*phiF)/Cox;
      const vg=lin(-2,3,260), hf=[], lf=[];
      vg.forEach(v=>{
        let c;
        if(v<-0.3) c=Cox;
        else if(v<VT){
          const f=Math.min(1,Math.max(0,(v+0.3)/(VT+0.3)));
          const wd=Math.max(Wmax*0.05,Wmax*Math.sqrt(f)), cd=EPS/wd;
          c=Cox*cd/(Cox+cd);
        } else c=Cmin;
        hf.push(c/Cox);
        lf.push(v>VT ? Cmin/Cox+(1-Cmin/Cox)*(1-Math.exp(-(v-VT)*3)) : c/Cox);
      });
      const ro=document.getElementById('ro-moscv');
      if(ro) ro.innerHTML='C<sub>ox</sub> ≈ '+(Cox*1e7).toFixed(2)+' µF/cm² &nbsp;|&nbsp; 2φ<sub>F</sub> ≈ '+(2*phiF).toFixed(2)+' V &nbsp;|&nbsp; V<sub>T</sub> ≈ '+VT.toFixed(2)+' V';
      Plotly.react(el,[{x:vg,y:hf,mode:'lines',name:L('yüksek frekans','high frequency'),line:{width:3}},{x:vg,y:lf,mode:'lines',name:L('düşük frekans','low frequency'),line:{width:3,dash:'dash'}}],
        baseLayout({xaxis:{title:'V_G (V)',color:css('--ink'),gridcolor:css('--rule')},yaxis:{title:'C / C_ox',range:[0,1.08],color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };

    PLOTS['p-qwell'] = el => {
      const Lnm=val('r-qw-l'), Lm=Lnm*1e-9, hbar=1.054571817e-34, m=0.067*9.1093837e-31, qe=1.602176634e-19;
      const levels=[1,2,3].map(n=>hbar*hbar*Math.PI*Math.PI*n*n/(2*m*Lm*Lm)/qe);
      const barrier=Math.max(0.8,levels[2]*1.25);
      const traces=[{x:[-0.2,0,0,Lnm,Lnm,Lnm+0.2],y:[barrier,barrier,0,0,barrier,barrier],mode:'lines',name:L('potansiyel kuyusu','potential well'),line:{width:3}}];
      levels.forEach((E,i)=>traces.push({x:[0,Lnm],y:[E,E],mode:'lines',name:'E'+(i+1)+' = '+E.toFixed(3)+' eV',line:{dash:'dash'}}));
      const ro=document.getElementById('ro-qwell');
      if(ro) ro.innerHTML='E₁ = '+levels[0].toFixed(3)+' eV &nbsp;|&nbsp; E₂ = '+levels[1].toFixed(3)+' eV &nbsp;|&nbsp; E₃ = '+levels[2].toFixed(3)+' eV';
      Plotly.react(el,traces,baseLayout({xaxis:{title:'x (nm)',color:css('--ink'),gridcolor:css('--rule')},yaxis:{title:L('enerji (eV)','energy (eV)'),rangemode:'tozero',color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };

    PLOTS['p-opto'] = el => {
      const lam=val('r-opto-lam'), Eph=1240/lam;
      const mats=[['Ge',0.66,'indirect'],['Si',1.12,'indirect'],['InP',1.35,'direct'],['GaAs',1.42,'direct'],['4H-SiC',3.26,'indirect'],['GaN',3.40,'direct']];
      const allowed=mats.filter(m=>Eph>=m[1]).map(m=>m[0]);
      const ro=document.getElementById('ro-opto');
      if(ro) ro.innerHTML='hν ≈ '+Eph.toFixed(2)+' eV &nbsp;|&nbsp; '+L('Enerji açısından izinli','Energetically allowed')+': '+(allowed.length?allowed.join(', '):'—');
      Plotly.react(el,[{x:mats.map(m=>m[0]),y:mats.map(m=>m[1]),type:'bar',name:'E_g',text:mats.map(m=>m[2]),hovertemplate:'%{x}: %{y:.2f} eV<br>%{text}<extra></extra>'},{x:mats.map(m=>m[0]),y:mats.map(()=>Eph),mode:'lines',name:'hν = '+Eph.toFixed(2)+' eV',line:{dash:'dash',width:3}}],
        baseLayout({xaxis:{title:L('malzeme','material'),color:css('--ink')},yaxis:{title:L('enerji (eV)','energy (eV)'),range:[0,4],color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };

    PLOTS['p-hall'] = el => {
      const ncm=Math.pow(10,val('r-hall-n')), nm3=ncm*1e6, I=val('r-hall-i')/1000, t=5e-4, q=1.602176634e-19;
      const B=lin(-1,1,201), vh=B.map(b=>I*b/(q*nm3*t));
      const ro=document.getElementById('ro-hall');
      if(ro) ro.innerHTML='|V_H|(B=0.5 T) ≈ '+(Math.abs(I*0.5/(q*nm3*t))*1e3).toFixed(3)+' mV &nbsp;|&nbsp; t = 0.5 mm';
      Plotly.react(el,[{x:B,y:vh.map(v=>-v*1e3),mode:'lines',name:L('elektron (n tipi)','electron (n-type)'),line:{width:3}},{x:B,y:vh.map(v=>v*1e3),mode:'lines',name:L('hol (p tipi)','hole (p-type)'),line:{width:3,dash:'dash'}}],
        baseLayout({xaxis:{title:'B (T)',color:css('--ink'),gridcolor:css('--rule')},yaxis:{title:'V_H (mV)',color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };

    PLOTS['p-traps'] = el => {
      const T=val('r-trap-t'), kT=K_B*T, E=lin(-0.56,0.56,260);
      const eff=E.map(e=>1/Math.cosh(e/kT)), occ=E.map(e=>1/(1+Math.exp(e/kT)));
      const ro=document.getElementById('ro-traps');
      if(ro) ro.innerHTML='kT ≈ '+(kT*1000).toFixed(1)+' meV &nbsp;|&nbsp; '+L('orta-bant çevresindeki etkin pencere sıcaklıkla genişler','the effective window around midgap broadens with temperature');
      Plotly.react(el,[{x:E,y:eff,mode:'lines',name:L('bağıl SRH etkinliği','relative SRH effectiveness'),line:{width:3}},{x:E,y:occ,mode:'lines',name:L('tuzak doluluk olasılığı','trap occupancy'),line:{width:2,dash:'dash'}}],
        baseLayout({xaxis:{title:'E_t − E_i (eV)',color:css('--ink'),gridcolor:css('--rule')},yaxis:{title:L('normalize değer','normalized value'),range:[0,1.05],color:css('--ink'),gridcolor:css('--rule')}}),CFG);
    };
  };
})();