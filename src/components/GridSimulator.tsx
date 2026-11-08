import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Sun, Wind, Battery, TrendingDown, Info, ShieldCheck } from 'lucide-react';
import { HOURLY_GRID_DATA } from '../data/mockData';

interface GridSimulatorProps {
  lang: 'tr' | 'en';
  onOpenCommitment: () => void;
}

export const GridSimulator: React.FC<GridSimulatorProps> = ({ lang, onOpenCommitment }) => {
  const isTr = lang === 'tr';
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(6); // 12:00
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [flexibilityRate, setFlexibilityRate] = useState<number>(65); // 65% flexible workload
  const [batteryStorageMWh, setBatteryStorageMWh] = useState<number>(800); // 800 MWh
  const [pueValue, setPueValue] = useState<number>(1.12);

  // Auto-play clock ticker
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentHourIndex((prev) => (prev + 1) % HOURLY_GRID_DATA.length);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentData = HOURLY_GRID_DATA[currentHourIndex];

  // Dynamic calculations based on user controls
  const totalRenewable = currentData.solar + currentData.wind + currentData.hydro;
  const isSolarSurplusHour = currentData.solar > 2500;
  
  // Dynamic AI data center demand
  const shiftedLoad = isSolarSurplusHour
    ? currentData.dataCenterFlat + (flexibilityRate / 100) * 450
    : currentData.dataCenterFlat - (flexibilityRate / 100) * 220;

  const totalGridDemand = currentData.baseLoad + (shiftedLoad * (pueValue / 1.15));
  const renewableSurplus = Math.max(0, totalRenewable - totalGridDemand);
  const fossilRequired = Math.max(0, totalGridDemand - totalRenewable - (batteryStorageMWh * 0.15));
  
  // Real-time calculated carbon intensity
  const calculatedCarbon = Math.round(
    Math.max(18, (currentData.carbonIntensity * (1 - (flexibilityRate / 100) * 0.45) * (pueValue / 1.15)))
  );

  const t = {
    title: isTr ? 'Akdeniz Şebekesi & Yapay Zekâ Yük Dengeleme Simülatörü' : 'Mediterranean Grid & AI Workload Balancing Simulator',
    subtitle: isTr
      ? 'Veri merkezlerinin hesaplama yüklerini güneş enerjisi pik saatlerine kaydırarak şebekeyi nasıl dengelediğini ve fosil yakıt tüketimini nasıl sıfırladığını interaktif olarak deneyimleyin.'
      : 'Interactively simulate how shifting compute workloads into midday solar surplus hours stabilizes the electrical grid and displaces fossil generation.',
    btnPlay: isTr ? '24 Saat Döngüsünü Başlat' : 'Start 24h Loop',
    btnPause: isTr ? 'Durdur' : 'Pause',
    btnReset: isTr ? 'Sıfırla' : 'Reset',
    currentHour: isTr ? 'Simülasyon Saati:' : 'Simulation Time:',
    controlFlex: isTr ? 'AI İş Yükü Esneklik Oranı (%):' : 'AI Workload Shifting Flexibility (%):',
    controlFlexDesc: isTr ? 'Gecikmeye duyarsız LLM antrenmanı ve batch inference görevlerinin güneş saatlerine aktarılma payı.' : 'Percentage of delay-tolerant compute shifted into surplus solar hours.',
    controlBattery: isTr ? 'Akdeniz Batarya & Hidro Depolama (MWh):' : 'Battery & Pumped Hydro Storage (MWh):',
    controlPue: isTr ? 'Veri Merkezi PUE Katsayısı:' : 'Data Center PUE Ratio:',
    cardSolar: isTr ? 'Güneş Üretimi' : 'Solar Generation',
    cardWind: isTr ? 'Rüzgar Üretimi' : 'Wind Generation',
    cardAiLoad: isTr ? 'AI Veri Merkezi Çekişi' : 'AI Compute Power Draw',
    cardCarbon: isTr ? 'Anlık Karbon Yoğunluğu' : 'Grid Carbon Intensity',
    chartTitle: isTr ? '24 Saatlik Akdeniz Üretim ve AI Yük Eğrisi' : '24-Hour Mediterranean Generation & AI Load Profile',
    chartLegendSolar: isTr ? 'Güneş (Solar PV)' : 'Solar PV',
    chartLegendWind: isTr ? 'Rüzgar & Hidro' : 'Wind & Hydro',
    chartLegendFlat: isTr ? 'Geleneksel Sabit AI Yükü' : 'Flat AI Load (Uncontrolled)',
    chartLegendFlex: isTr ? 'COP31 Akıllı Kaydırılmış AI Yükü' : 'COP31 Solar-Synchronized Load',
    statusFossil: isTr ? 'Fosil Yakıt Tasarrufu' : 'Fossil Fuel Displaced',
    statusCurtailed: isTr ? 'Kurtarılan Güneş Fazlası' : 'Solar Curtailment Rescued',
    statusCFE: isTr ? 'Saatlik CFE Eşleşme Oranı' : 'Hourly CFE Match Rate',
  };

  return (
    <div className="space-y-8">
      {/* Simulation Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isTr ? 'Canlı Akdeniz Şebeke Modeli' : 'Live Mediterranean Grid Model'}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="font-mono text-slate-500 dark:text-slate-400">TEİAŞ & COP31 Framework</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              {t.subtitle}
            </p>
          </div>

          {/* Time & Play Controls */}
          <div className="flex items-center gap-3 shrink-0 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                isPlaying ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-emerald-800 dark:bg-emerald-600 text-white hover:bg-emerald-900 dark:hover:bg-emerald-500'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? t.btnPause : t.btnPlay}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentHourIndex(6);
                setFlexibilityRate(65);
              }}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title={t.btnReset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="pl-3 border-l border-slate-300 dark:border-slate-700 text-right">
              <div className="text-[10px] text-slate-400 font-medium">{t.currentHour}</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">{currentData.hour}</div>
            </div>
          </div>
        </div>

        {/* 24-Hour Timeline Selector Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
            <span>00:00 (Gece)</span>
            <span>12:00 (Güneş Zirvesi)</span>
            <span>22:00 (Akşam Piki)</span>
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            {HOURLY_GRID_DATA.map((item, idx) => (
              <button
                key={item.hour}
                onClick={() => setCurrentHourIndex(idx)}
                className={`py-2 px-1 text-center rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentHourIndex === idx
                    ? 'bg-emerald-800 dark:bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.hour.split(':')[0]}h
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Snapshot Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.cardSolar}</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {currentData.solar} <span className="text-sm font-sans font-medium text-slate-500 dark:text-slate-400">MW</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {currentData.solar > 2000 ? (isTr ? 'Güneş Fazlası Aktif' : 'Solar Surplus High') : (isTr ? 'Düşük Güneş Işıması' : 'Low Irradiance')}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.cardWind}</span>
            <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {currentData.wind + currentData.hydro} <span className="text-sm font-sans font-medium text-slate-500 dark:text-slate-400">MW</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isTr ? 'Temel Akdeniz Rüzgar & Hidro' : 'Base Wind & Hydro Dispatch'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.cardAiLoad}</span>
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
            {Math.round(shiftedLoad)} <span className="text-sm font-sans font-medium text-slate-500 dark:text-slate-400">MW</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            {isSolarSurplusHour
              ? (isTr ? `+${Math.round(shiftedLoad - currentData.dataCenterFlat)} MW Güneş Tüketimi` : `+${Math.round(shiftedLoad - currentData.dataCenterFlat)} MW Solar Absorption`)
              : (isTr ? `-${Math.round(currentData.dataCenterFlat - shiftedLoad)} MW Gece Yük Tıraşlama` : `-${Math.round(currentData.dataCenterFlat - shiftedLoad)} MW Night Load Shedding`)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.cardCarbon}</span>
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {calculatedCarbon} <span className="text-sm font-sans font-medium text-slate-500 dark:text-slate-400">gCO₂/kWh</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            {isTr ? `%${Math.round(((currentData.carbonIntensity - calculatedCarbon) / currentData.carbonIntensity) * 100)} Temiz Enerji İyileşmesi` : `%${Math.round(((currentData.carbonIntensity - calculatedCarbon) / currentData.carbonIntensity) * 100)} Carbon Improvement`}
          </div>
        </div>
      </div>

      {/* Interactive Controls & Parameter Adjustments */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {isTr ? 'Şebeke Dengeleme ve AI Esneklik Parametreleri' : 'Grid Balancing & AI Flexibility Controls'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Flexibility */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t.controlFlex}</span>
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-sm">%{flexibilityRate}</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={flexibilityRate}
              onChange={(e) => setFlexibilityRate(Number(e.target.value))}
              className="w-full accent-emerald-700 dark:accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {t.controlFlexDesc}
            </p>
          </div>

          {/* Slider 2: Battery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t.controlBattery}</span>
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-sm">{batteryStorageMWh} MWh</span>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              step="50"
              value={batteryStorageMWh}
              onChange={(e) => setBatteryStorageMWh(Number(e.target.value))}
              className="w-full accent-emerald-700 dark:accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {isTr ? 'Gündüz güneş fazlasını depolayıp akşam zirvesinde AI yükünü besleyen batarya parkı.' : 'Stationary storage buffering midday surplus to power compute during evening peaks.'}
            </p>
          </div>

          {/* Slider 3: PUE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t.controlPue}</span>
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-sm">{pueValue.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.08"
              max="1.45"
              step="0.01"
              value={pueValue}
              onChange={(e) => setPueValue(Number(e.target.value))}
              className="w-full accent-emerald-700 dark:accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {isTr ? 'Kapalı devre sıvı soğutma ile hedeflenen ultra yüksek verimlilik seviyesi.' : 'Direct liquid cooling target efficiency ratio (PUE ≤ 1.15 COP31 criteria).'}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Interactive Profile Chart (Pure SVG for sharpness and responsiveness) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.chartTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTr ? 'Güneş üretimi tavan yaptığında AI veri merkezi tüketiminin kontrollü olarak artışı.' : 'Dynamic compute scaling synchronized with midday solar production.'}
            </p>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
              <span className="text-slate-600 dark:text-slate-400">{t.chartLegendSolar}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-700 dark:bg-emerald-500"></span>
              <span className="text-slate-900 dark:text-white font-semibold">{t.chartLegendFlex}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-400 dark:bg-slate-500"></span>
              <span className="text-slate-500 dark:text-slate-400">{t.chartLegendFlat}</span>
            </div>
          </div>
        </div>

        {/* SVG Chart Rendering */}
        <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 overflow-hidden border border-slate-100 dark:border-slate-800">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1100 220" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="1100" y2="40" stroke="#cbd5e1" strokeDasharray="4 4" className="stroke-slate-300 dark:stroke-slate-800" />
            <line x1="0" y1="100" x2="1100" y2="100" stroke="#cbd5e1" strokeDasharray="4 4" className="stroke-slate-300 dark:stroke-slate-800" />
            <line x1="0" y1="160" x2="1100" y2="160" stroke="#cbd5e1" strokeDasharray="4 4" className="stroke-slate-300 dark:stroke-slate-800" />

            {/* Solar Area */}
            <path
              d={`M 0 200 
                L 0 200
                L 100 200
                L 200 200
                L 300 190
                L 400 145
                L 500 50
                L 600 20
                L 700 35
                L 800 100
                L 900 180
                L 1000 200
                L 1100 200
                Z`}
              fill="rgba(251, 191, 36, 0.25)"
            />
            {/* Solar Line */}
            <path
              d={`M 0 200 
                L 100 200
                L 200 200
                L 300 190
                L 400 145
                L 500 50
                L 600 20
                L 700 35
                L 800 100
                L 900 180
                L 1000 200
                L 1100 200`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            {/* Flat Data Center Load (Reference Line) */}
            <line x1="0" y1="150" x2="1100" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />

            {/* Flexible COP31 AI Load Line */}
            <path
              d={`M 0 170 
                L 100 172
                L 200 175
                L 300 168
                L 400 155
                L 500 ${150 - (flexibilityRate * 0.9)}
                L 600 ${150 - (flexibilityRate * 1.25)}
                L 700 ${150 - (flexibilityRate * 1.15)}
                L 800 ${150 - (flexibilityRate * 0.7)}
                L 900 165
                L 1000 170
                L 1100 172`}
              fill="none"
              stroke="#059669"
              strokeWidth="3.5"
            />

            {/* Current Hour Indicator Needle */}
            <line
              x1={(currentHourIndex / (HOURLY_GRID_DATA.length - 1)) * 1100}
              y1="0"
              x2={(currentHourIndex / (HOURLY_GRID_DATA.length - 1)) * 1100}
              y2="220"
              stroke="#64748b"
              strokeWidth="2"
            />
            <circle
              cx={(currentHourIndex / (HOURLY_GRID_DATA.length - 1)) * 1100}
              cy="20"
              r="5"
              fill="#10b981"
            />
          </svg>
        </div>

        {/* Impact Summary Bar */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.statusFossil}</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              ~{Math.round(flexibilityRate * 14.5)} MWh / {isTr ? 'gün' : 'day'}
            </div>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg">
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">{t.statusCurtailed}</div>
            <div className="text-lg font-bold text-emerald-800 dark:text-emerald-400 font-mono">
              ~{Math.round(flexibilityRate * 11.2)} MWh {isTr ? 'korundu' : 'saved'}
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.statusCFE}</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              % {Math.min(100, Math.round(75 + (flexibilityRate * 0.3)))} 24/7 CFE
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-6 bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1">
          <h4 className="text-lg font-bold">
            {isTr ? 'Bu Şebeke Dengeleme Protokolüne Kurumunuzu Katın' : 'Enroll Your Data Center into the Grid Compact'}
          </h4>
          <p className="text-xs text-slate-300">
            {isTr
              ? 'COP31 Antalya deklarasyonu ile veri merkezinizin esnek talep kapasitesini şebeke operatörlerine tescil ettirin.'
              : 'Register your dynamic demand-response capacity with transmission system operators ahead of COP31.'}
          </p>
        </div>
        <button
          onClick={onOpenCommitment}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          {isTr ? 'Resmi Taahhüdü İmzala' : 'Sign Official Compact'}
        </button>
      </div>
    </div>
  );
};
