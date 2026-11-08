import React, { useState } from 'react';
import { Sparkles, TrendingUp, Compass, Check, ArrowRight, ShieldCheck, SunMedium, Server, Award } from 'lucide-react';
import smartGridControlCenter from '../assets/images/smart_grid_control_center_1794120964028.jpg';

interface StrategyAnalysisProps {
  lang: 'tr' | 'en';
  onOpenCommitment: () => void;
}

export const StrategyAnalysis: React.FC<StrategyAnalysisProps> = ({ lang, onOpenCommitment }) => {
  const isTr = lang === 'tr';

  const [orgType, setOrgType] = useState<string>('hyperscale');
  const [region, setRegion] = useState<string>('antalya');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const t = {
    title: isTr ? 'Akdeniz Temiz Enerji & AI Strateji Analiz Merkezi' : 'Mediterranean Clean Energy & AI Strategic Analysis Center',
    subtitle: isTr
      ? 'COP31 Antalya Zirvesi kararları doğrultusunda yapay zekânın enerji talebini Akdeniz havzası yenilenebilir kaynaklarıyla entegre eden uzun vadeli stratejik yol haritası.'
      : 'Long-term strategic roadmap aligning AI compute expansion with Mediterranean renewable corridors under the UN COP31 framework.',
    comparisonTitle: isTr ? 'Geleneksel Model vs. COP31 Antalya Modeli' : 'Traditional Model vs. COP31 Antalya Model',
    generatorTitle: isTr ? 'Kurumunuza Özel COP31 Uyum Stratejisi Oluşturun' : 'Generate Tailored COP31 Alignment Strategy',
    generatorDesc: isTr
      ? 'Kuruluş profilinizi seçin; yapay zekâ destekli analiz motorumuz 2026-2030 elektrifikasyon ve CFE yol haritanızı derlesin.'
      : 'Select your organizational profile; our strategic engine synthesizes your custom 2026–2030 electrification pathway.',
    btnAnalyze: isTr ? 'Stratejik Yol Haritasını Derle' : 'Generate Strategic Pathway',
    btnAnalyzing: isTr ? 'Analiz Ediliyor...' : 'Analyzing Strategy...',
  };

  const handleGenerateStrategy = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        organization: orgType === 'hyperscale' ? 'Hiper-Ölçekli Bulut & AI Sağlayıcı' : orgType === 'telco' ? 'Ulusal Telekomünikasyon & Veri Merkezi' : 'Kamu & Akademik Süper Bilgisayar Merkezi',
        targetPUE: orgType === 'hyperscale' ? '1.10' : '1.14',
        solarPeakShare: '68%',
        carbonReduction: '%74 Net Emisyon Azaltımı',
        waterSavings: 'Yılda ~42 Milyon Litre Tatlı Su Koruması',
        milestones: [
          { year: '2026', step: isTr ? 'Akdeniz 24/7 CFE Şebeke Uyum Protokolü ve Akıllı Sayaç Entegrasyonu' : 'Mediterranean 24/7 CFE Grid Protocol & Smart Meter Integration' },
          { year: '2027', step: isTr ? 'Gündüz 10:00 - 15:00 LLM eğitim yüklerinin dinamik kaydırılması (%50 esneklik)' : 'Daytime 10:00-15:00 LLM training workload temporal shifting (50% flexibility)' },
          { year: '2028', step: isTr ? 'Kapalı devre direkt çipe sıvı soğutma (DLC) geçişi ile PUE ≤ 1.15 tescili' : 'Full closed-loop Direct-to-Chip DLC transition hitting PUE ≤ 1.15' },
          { year: '2030', step: isTr ? 'Paris Madde 6 uyumlu sıfır karbonlu bölgesel ihracat sertifikasyonu' : 'Paris Article 6 compliant net-zero certified sovereign AI node' },
        ],
      });
    }, 600);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{isTr ? 'COP31 Diplomatik & Teknik Strateji Belgeliği' : 'COP31 Diplomatic & Technical Strategy Dossier'}</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-slate-500 dark:text-slate-400 font-mono">UNFCCC Article 6 & Net-Zero 2050</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Control Room Photography Spotlight */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={smartGridControlCenter}
            alt="Mediterranean Smart Grid Control Center"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center max-w-xl text-white space-y-3">
            <div className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
              {isTr ? 'Akdeniz Şebeke Koordinasyon Merkezi' : 'Mediterranean Grid Dispatch Center'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {isTr ? 'Yapay Zekâ ve Şebekenin Çift Yönlü Entegrasyonu' : 'Bi-Directional AI & Grid Co-Optimization'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isTr
                ? 'Geleneksel pasif tüketicilerin aksine, COP31 veri merkezleri güneş üretiminin zirve yaptığı saatlerde gigawatt ölçekli talep sağlayarak şebekenin aşırı gerilimini önler ve yeşil enerjinin israf olmasını engeller.'
                : 'Unlike passive loads, COP31 data centers act as dynamic grid shock-absorbers, soaking up gigawatts of midday Mediterranean solar to prevent clean energy curtailment.'}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Traditional vs COP31 Antalya */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.comparisonTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {isTr ? 'Mevcut Durum' : 'Baseline Baseline'}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {isTr ? 'Geleneksel Veri Merkezi' : 'Traditional Data Center'}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded">
                PUE ≥ 1.55
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>{isTr ? 'Sabit Tüketim Profili:' : 'Flat Power Draw:'}</strong> {isTr ? 'Gece ve akşam fosil pik saatlerinde şebekeyi zorlar.' : 'Draws high power blindly during evening fossil peaks.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>{isTr ? 'Buharlaşmalı Soğutma:' : 'Evaporative Towers:'}</strong> {isTr ? 'Milyonlarca litre içilebilir tatlı su buharlaştırır.' : 'Consumes millions of liters of scarce fresh water.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>{isTr ? 'Yıllık Mahsuplaşma Yanılsaması:' : 'Annual Net-Zero Illusion:'}</strong> {isTr ? 'Yılda bir kez alınan yeşil sertifika anlık karbonu gizler.' : 'Annual RECs mask real-time reliance on dirty coal/gas.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>{isTr ? 'Yüksek Karbon Ayak İzi:' : 'High Carbon Intensity:'}</strong> {isTr ? 'Ortalama 380–450 gCO₂/kWh elektrik karması.' : 'Avg 380–450 gCO₂/kWh emission factor.'}</span>
              </li>
            </ul>
          </div>

          {/* COP31 Antalya Model Card */}
          <div className="bg-emerald-950 text-white rounded-2xl border border-emerald-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  {isTr ? 'COP31 Çözümü' : 'COP31 Protocol'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {isTr ? 'Antalya Akıllı Şebeke Modeli' : 'Antalya Smart Grid Model'}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded border border-emerald-700">
                PUE ≤ 1.15
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>{isTr ? 'Güneş Senkronizasyonu:' : 'Solar Synchronization:'}</strong> {isTr ? 'LLM antrenmanları 10:00–15:00 güneş zirvesine kaydırılır.' : 'Compute ramps automatically during midday solar peak.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>{isTr ? 'Kapalı Devre Sıvı Soğutma:' : 'Closed-Loop DLC:'}</strong> {isTr ? 'Sıfır tatlı su tüketimi, atık ısı sera ısıtmasına aktarılır.' : 'Zero fresh water waste; heat re-used for regional greenhouses.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>{isTr ? '24/7 Saatlik CFE Eşleşmesi:' : '24/7 Hourly CFE Tracking:'}</strong> {isTr ? 'Her saat tüketilen enerjinin temiz kaynaktan geldiği doğrulanır.' : 'Smart meters certify real-time hourly clean power matching.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>{isTr ? 'AB AI Act Madde 50 Uyumlu:' : 'EU AI Act Article 50:'}</strong> {isTr ? 'Şeffaf karbon ve enerji beyannamesi uluslararası geçerlidir.' : 'Standardized verifiable carbon declarations recognized globally.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Strategy Synthesis Tool */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.generatorTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t.generatorDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{isTr ? 'Kurum Türü' : 'Organization Type'}</label>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="hyperscale">{isTr ? 'Hiper-Ölçekli Bulut / AI Sağlayıcı' : 'Hyperscale Cloud / AI'}</option>
              <option value="telco">{isTr ? 'Telekomünikasyon & Kolokasyon Veri Merkezi' : 'Telco & Colocation'}</option>
              <option value="academic">{isTr ? 'Kamu / Üniversite Süper Bilgisayar' : 'Public / Academic HPC'}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{isTr ? 'Hedef Bölge' : 'Region'}</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="antalya">Antalya & Batı Akdeniz (GES Odaklı)</option>
              <option value="izmir">İzmir & Ege Koridoru (RES & GES Karma)</option>
              <option value="marmara">Marmara & Trakya Sanayi Şebekesi</option>
              <option value="cappadocia">İç Anadolu (Güneş & Rüzgar Depolama)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateStrategy}
              disabled={analyzing}
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {analyzing ? t.btnAnalyzing : t.btnAnalyze}
            </button>
          </div>
        </div>

        {/* Strategy Roadmap Card if generated */}
        {analysisResult && (
          <div className="p-6 rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 dark:border-emerald-800/60 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                  {isTr ? 'Özel Strateji Özeti' : 'Strategic Roadmap Profile'}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {analysisResult.organization}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded">
                  PUE: {analysisResult.targetPUE}
                </span>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded">
                  {analysisResult.carbonReduction}
                </span>
              </div>
            </div>

            {/* Milestones timeline */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {isTr ? '2026–2030 Uygulama Kilometre Taşları:' : '2026–2030 Execution Milestones:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {analysisResult.milestones.map((m: any) => (
                  <div key={m.year} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 block">
                      {m.year}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      {m.step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {isTr ? 'Bu stratejik planı resmi taahhütnamenize ekleyebilirsiniz.' : 'You can attach this strategy to your official commitment.'}
              </span>
              <button
                onClick={onOpenCommitment}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>{isTr ? 'Taahhüde Bağla & İmzala' : 'Link to Commitment & Sign'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
