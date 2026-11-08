import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, SunMedium, Activity, Building2, Download, ExternalLink, Sparkles } from 'lucide-react';
import { Signatory, INITIAL_SIGNATORIES } from '../data/mockData';

interface ShowcaseViewProps {
  onOpenCommitment: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToTransformation: () => void;
  onNavigateToAgenda: () => void;
  lang: 'tr' | 'en';
  setLang: (lang: 'tr' | 'en') => void;
  signatories: Signatory[];
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({
  onOpenCommitment,
  onNavigateToSimulator,
  onNavigateToTransformation,
  onNavigateToAgenda,
  lang,
  setLang,
  signatories,
}) => {
  const isTr = lang === 'tr';

  const t = {
    eyebrowPre: isTr ? 'Birleşmiş Milletler COP31 Antalya' : 'United Nations COP31 Antalya',
    eyebrowSub: isTr ? 'Akdeniz Yeşil Teknoloji & Şebeke Girişimi' : 'Mediterranean Green Tech & Grid Initiative',
    langToggle: isTr ? 'Switch to English' : 'Türkçe\'ye Geç',
    headline: isTr
      ? 'Yapay Zekânın Gücü,\nAkdeniz’in Temiz Enerjisiyle\nBuluşuyor'
      : 'The Power of AI Meets\nthe Clean Energy of\nthe Mediterranean',
    subtitle: isTr
      ? 'COP31 Antalya Yapay Zekâ Taahhüdü; veri merkezlerinin hesaplama gücünü 24/7 temiz enerjiyle besleyen, yüksek iş yüklerini güneş fazlası saatlere kaydırarak şebekeyi dengeleyen tarihi bir yeşil mutabakattır.'
      : 'The COP31 Antalya AI Commitment is a historic green compact powering data centers with 24/7 carbon-free energy and shifting compute workloads into surplus solar hours to balance the regional grid.',
    btnSign: isTr ? 'Taahhüdü İmzala & Katıl' : 'Sign & Join Commitment',
    btnSim: isTr ? 'Canlı Şebeke Dengeleme Simülatörü' : 'Live Grid Balancing Simulator',
    badgeVerify: isTr ? 'Doğrulanabilir Karbon Beyanı' : 'Verifiable Carbon Certification',
    badgeAiAct: isTr ? 'AB Yapay Zekâ Yasası (AI Act) Madde 50 Uyumlu' : 'EU AI Act Article 50 Compliant',
    pavilionCaptionTitle: isTr ? 'Antalya Yeşil İnovasyon Pavyonu' : 'Antalya Green Innovation Pavilion',
    pavilionCaptionSub: isTr ? 'COP31 Uluslararası İklim Zirvesi • Akdeniz Zirvesi' : 'COP31 International Climate Summit • Mediterranean Summit',
    stat1Label: isTr ? 'Hedef Veri Merkezi Verimliliği' : 'Target Data Center Efficiency',
    stat2Label: isTr ? 'Karbonsuz Enerji (CFE) Sertifikası' : 'Carbon-Free Energy (CFE) Standard',
    stat3Label: isTr ? 'Esnek Şebeke Talep Yanıtı' : 'Flexible Grid Demand Response',
    stat4Label: isTr ? 'İmzalayan Kamu & Özel Paydaş' : 'Signatory Public & Private Partners',
    pillarHeading: isTr ? 'Girişimin 3 Temel Mimari Sütunu' : '3 Core Architectural Pillars of the Compact',
    pillarSub: isTr
      ? 'Veri merkezlerinin hiper ölçekli güç talebini, Akdeniz havzasının temiz elektrik potansiyeliyle uyumlayan teknoloji protokolleri.'
      : 'Engineering protocols aligning hyperscale AI computing demand with the Mediterranean basin clean energy surplus.',
    signatoriesHeading: isTr ? 'Resmi Taahhütte Bulunan Kurumlar & Paydaşlar' : 'Official Signatory Institutions & Partners',
    signatoriesSub: isTr ? 'COP31 Antalya Zirvesi öncesinde 24/7 CFE ve PUE ≤ 1.15 taahhüdünü onaylayan öncü kuruluşlar.' : 'Pioneering organizations committed to 24/7 CFE and PUE ≤ 1.15 ahead of the COP31 Antalya Summit.',
  };

  const totalCommittedMW = signatories.reduce((acc, s) => acc + s.capacityMW, 0);

  return (
    <div className="space-y-12">
      {/* Main Hero Container matching the screenshot */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-slate-700 dark:text-slate-300">{t.eyebrowPre}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 dark:text-slate-300">{t.eyebrowSub}</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setLang(isTr ? 'en' : 'tr')}
                className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                {t.langToggle}
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] whitespace-pre-line text-balance">
              {t.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenCommitment}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow group cursor-pointer"
              >
                <span>{t.btnSign}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onNavigateToSimulator}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>{t.btnSim}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="inline-flex items-center gap-1.5 font-medium text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.badgeVerify}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-normal">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{t.badgeAiAct}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Antalya Pavilion Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-[16/10] sm:aspect-[16/10] bg-slate-900">
              <img
                src="/src/assets/images/antalya_green_pavilion_1794120963679.jpg"
                alt="Antalya Sustainable Tech Summit Green Innovation Pavilion"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-emerald-300 tracking-wide">
                  {t.pavilionCaptionTitle}
                </div>
                <div className="text-[11px] text-slate-200 opacity-90 mt-0.5">
                  {t.pavilionCaptionSub}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Strip */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              PUE ≤ 1.15
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stat1Label}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800 pl-4 sm:pl-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
              %100 24/7
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stat2Label}
            </div>
          </div>

          <div className="space-y-1 lg:border-l border-slate-200 dark:border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              2.4 GW
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stat3Label}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800 pl-4 sm:pl-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {signatories.length} {isTr ? 'Kurum' : 'Partners'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stat4Label}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Architectural Pillars */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.pillarHeading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.pillarSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <SunMedium className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isTr ? '01. Akdeniz Güneş Senkronizasyonu' : '01. Mediterranean Solar Synchronization'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isTr
                  ? 'Gündüz 10:00 - 15:00 saatleri arasındaki yüksek güneş ışınımı fazlası, doğrudan yapay zekâ veri merkezlerine yönlendirilerek şebekeden sıfır fosil yakıt çekilmesi garanti edilir.'
                  : 'Surplus solar output between 10:00 and 15:00 is routed directly to AI clusters, guaranteeing zero fossil fuel reliance during high irradiance windows.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>{isTr ? 'Saatlik CFE Eşleşmesi' : 'Hourly CFE Matching'}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">100% Zero-Carbon</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isTr ? '02. Esnek İş Yükü Zamanlaması' : '02. Compute Temporal Workload Shifting'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isTr
                  ? 'Gecikmeye duyarsız büyük dil modeli (LLM) eğitimleri ve toplu çıkarımlar, şebekenin en temiz olduğu saatlere akıllı algoritmalarla otomatik olarak kaydırılır.'
                  : 'Delay-tolerant foundation model training and batch inference jobs are programmatically shifted to intervals when grid carbon intensity hits rock bottom.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>{isTr ? 'Şebeke Dengeleme Katkısı' : 'Grid Relief Peak'}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">~850 MW Flexible</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isTr ? '03. Sıfır Tatlı Su & Kapalı Sıvı Soğutma' : '03. Zero Fresh Water & Direct Liquid Cooling'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isTr
                  ? 'Akdeniz’in kuraklık hassasiyetine yanıt olarak buharlaşmalı kuleler yerine kapalı devre sıvı soğutma ve daldırma teknolojisiyle su tüketim indeksi (WUE) 0.00’a çekilir.'
                  : 'Responding to Mediterranean drought vulnerability, evaporative towers are eliminated in favor of closed-loop liquid and two-phase immersion cooling (WUE ~ 0.00).'}
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>{isTr ? 'Su Tüketim İndeksi' : 'Water Usage Index'}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">WUE ≤ 0.05 L/kWh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signatories & Live Partnership Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.signatoriesHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.signatoriesSub}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {isTr ? 'Toplam Taahhüt Kapasitesi' : 'Total Committed Capacity'}
              </div>
              <div className="text-lg font-bold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
                {totalCommittedMW} MW
              </div>
            </div>
            <button
              onClick={onOpenCommitment}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {isTr ? '+ Kurumunuzu Ekleyin' : '+ Register Organization'}
            </button>
          </div>
        </div>

        {/* Signatories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signatories.map((sig) => (
            <div
              key={sig.id}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors bg-slate-50/50 dark:bg-slate-800/60 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                  {isTr ? sig.category : sig.categoryEn}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {sig.id}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">
                  {sig.name}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {sig.country}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans block">{isTr ? 'Kapasite' : 'Capacity'}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200">{sig.capacityMW} MW</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans block">{isTr ? 'PUE Hedefi' : 'Target PUE'}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">≤ {sig.targetPUE}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans block">{isTr ? 'Hedef Yıl' : 'Year'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{sig.targetYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Module Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white space-y-4 border border-emerald-950">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isTr ? 'Veri Merkezi E-Dönüşüm' : 'Data Center E-Transformation'}</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {isTr
              ? 'Kendi Veri Merkezinizin COP31 Uyumunu Test Edin'
              : 'Audit Your Facility’s COP31 Compliance'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isTr
              ? 'Sunucu kabin sayısı, soğutma metodu ve PUE değerlerinizi girerek anlık karbon tasarrufunuzu ve AB Yapay Zekâ Yasası Madde 50 uyum skorunuzu hesaplayın.'
              : 'Calculate instant carbon offsets, PUE optimization pathway, and EU AI Act Article 50 transparency compliance.'}
          </p>
          <button
            onClick={onNavigateToTransformation}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <span>{isTr ? 'E-Dönüşüm Aracını Başlat' : 'Open Transformation Calculator'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-900/90 text-white space-y-4 border border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>{isTr ? 'Akdeniz 24h Canlı Şebeke Simülatörü' : 'Mediterranean 24h Grid Simulator'}</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {isTr
              ? 'Güneş Üretim Fazlasını ve Yük Kaydırmayı Canlı İzleyin'
              : 'Simulate Solar Surplus & AI Workload Shifting'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isTr
              ? 'Antalya ve Doğu Akdeniz şebekesinde 4.4 GW güneş fazlası oluştuğunda AI iş yüklerinin otomatik artışını ve fosil yakıt tüketiminin sıfırlanışını simüle edin.'
              : 'Explore the 24-hour dispatch curve, battery storage absorption, and real-time carbon intensity reductions.'}
          </p>
          <button
            onClick={onNavigateToSimulator}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <span>{isTr ? 'Şebeke Simülatörüne Git' : 'Launch Grid Simulator'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
