import React, { useState } from 'react';
import { Cpu, Server, Droplets, Zap, ShieldCheck, Download, Check, AlertCircle, FileCheck2 } from 'lucide-react';

interface EmbeddedModuleViewProps {
  lang: 'tr' | 'en';
  onOpenCommitment: () => void;
}

export const EmbeddedModuleView: React.FC<EmbeddedModuleViewProps> = ({ lang, onOpenCommitment }) => {
  const isTr = lang === 'tr';

  // Calculator states
  const [rackCount, setRackCount] = useState<number>(120);
  const [hardwareType, setHardwareType] = useState<string>('h100');
  const [coolingType, setCoolingType] = useState<string>('dlc');
  const [pue, setPue] = useState<number>(1.13);
  const [solarPpaShare, setSolarPpaShare] = useState<number>(85); // 85% clean energy
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Constants
  const rackPowerKwMap: Record<string, number> = {
    h100: 38, // 38 kW per AI rack
    b200: 75, // 75 kW per high-density Blackwell rack
    tpu: 35,
    general: 18,
  };

  const kwPerRack = rackPowerKwMap[hardwareType] || 35;
  const itLoadKw = rackCount * kwPerRack;
  const totalFacilityLoadKw = itLoadKw * pue;
  const annualEnergyMWh = Math.round((totalFacilityLoadKw * 8760) / 1000);
  
  // Baseline comparison (standard air cooling PUE 1.55, grid average 380 gCO2/kWh)
  const baselineEnergyMWh = Math.round(((itLoadKw * 1.55) * 8760) / 1000);
  const energySavedMWh = Math.max(0, baselineEnergyMWh - annualEnergyMWh);
  
  // Carbon calculations
  const gridFactor = 0.380; // tCO2 per MWh
  const cleanFactor = 0.025; // tCO2 per MWh for CFE
  const actualEmissions = Math.round(annualEnergyMWh * ((1 - solarPpaShare / 100) * gridFactor + (solarPpaShare / 100) * cleanFactor));
  const baselineEmissions = Math.round(baselineEnergyMWh * gridFactor);
  const carbonAvoidedTons = Math.max(0, baselineEmissions - actualEmissions);

  // Water savings (immersion or DLC saves ~1.8 L per kWh over evaporative towers)
  const waterSavedLiters = coolingType !== 'air'
    ? Math.round(annualEnergyMWh * 1800)
    : 0;

  // EU AI Act Article 50 & COP31 score
  const isPueCompliant = pue <= 1.15;
  const isCfeCompliant = solarPpaShare >= 80;
  const isWaterCompliant = coolingType !== 'air';
  const complianceScore = (isPueCompliant ? 35 : 15) + (isCfeCompliant ? 35 : 15) + (isWaterCompliant ? 30 : 10);

  const t = {
    title: isTr ? 'Veri Merkezi E-Dönüşüm ve Karbon Beyan Modülü' : 'Data Center E-Transformation & Carbon Audit Module',
    subtitle: isTr
      ? 'Tesisinizin bilgi işlem yükünü, soğutma altyapısını ve enerji tedarikini COP31 Antalya kriterlerine ve AB Yapay Zekâ Yasası Madde 50 standartlarına göre denetleyin.'
      : 'Audit your compute infrastructure, cooling architecture, and power sourcing against COP31 Antalya thresholds and EU AI Act Article 50 standards.',
    secParameters: isTr ? 'Tesis Teknik Parametreleri' : 'Facility Technical Parameters',
    rackLabel: isTr ? 'Sunucu Kabin Sayısı (Racks):' : 'Compute Rack Count:',
    hwLabel: isTr ? 'Donanım & GPU Mimarisi:' : 'Hardware & GPU Architecture:',
    coolingLabel: isTr ? 'Soğutma Altyapısı:' : 'Cooling Infrastructure:',
    pueLabel: isTr ? 'Tesis Hedef PUE Değeri:' : 'Facility Target PUE:',
    cfeLabel: isTr ? '24/7 Karbonsuz Enerji (CFE) Oranı (%):' : '24/7 Carbon-Free Energy Share (%):',
    secResults: isTr ? 'COP31 Çevresel Etki ve Tasarruf Karnesi' : 'COP31 Environmental Impact Scorecard',
    annualLoad: isTr ? 'Yıllık Güç Tüketimi' : 'Annual Power Consumption',
    carbonSaved: isTr ? 'Önlenen Karbon Emisyonu' : 'Avoided Carbon Emissions',
    waterSaved: isTr ? 'Tasarruf Edilen Tatlı Su' : 'Conserved Fresh Water',
    complianceHeading: isTr ? 'AB AI Act Madde 50 & COP31 Uyum Derecesi' : 'EU AI Act Article 50 & COP31 Rating',
    btnGenCert: isTr ? 'Resmi COP31 Karbon Beyannamesi Oluştur' : 'Generate Official Carbon Declaration',
  };

  return (
    <div className="space-y-8">
      {/* Module Title Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>{isTr ? 'Resmi COP31 Teknik Değerlendirme Aracı' : 'Official COP31 Technical Audit Tool'}</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 font-mono">ISO 14064 & GHG Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Two Column Grid: Inputs on Left, Real-time Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            {t.secParameters}
          </h2>

          {/* Rack Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label>{t.rackLabel}</label>
              <span className="font-mono font-bold text-emerald-800">{rackCount} Kabin</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={rackCount}
              onChange={(e) => setRackCount(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10 Racks (Edge)</span>
              <span>250 Racks</span>
              <span>500 Racks (Hyperscale)</span>
            </div>
          </div>

          {/* Hardware Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">{t.hwLabel}</label>
            <select
              value={hardwareType}
              onChange={(e) => setHardwareType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="h100">NVIDIA H100 / H200 SuperPOD (38 kW/rack)</option>
              <option value="b200">NVIDIA Blackwell B200 Ultra-Dense (75 kW/rack)</option>
              <option value="tpu">Google TPU v5e / Cloud AI Pods (35 kW/rack)</option>
              <option value="general">Karma Bulut & Standart CPU / GPU (18 kW/rack)</option>
            </select>
          </div>

          {/* Cooling Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">{t.coolingLabel}</label>
            <select
              value={coolingType}
              onChange={(e) => {
                const val = e.target.value;
                setCoolingType(val);
                if (val === 'immersion') setPue(1.08);
                else if (val === 'dlc') setPue(1.13);
                else setPue(1.45);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="dlc">Direkt Çipe Sıvı Soğutma (DLC - Closed Loop)</option>
              <option value="immersion">İki Fazlı / Tek Fazlı Sıvı Daldırma (Immersion)</option>
              <option value="air">Geleneksel Soğuk Koridor Hava Soğutma (Air Cooling)</option>
            </select>
          </div>

          {/* PUE Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label>{t.pueLabel}</label>
              <span className={`font-mono font-bold ${pue <= 1.15 ? 'text-emerald-700' : 'text-amber-600'}`}>
                {pue.toFixed(2)} {pue <= 1.15 ? '✓ (COP31 Uyumlu)' : '⚠️ (> 1.15 Eşik Dışı)'}
              </span>
            </div>
            <input
              type="range"
              min="1.05"
              max="1.65"
              step="0.01"
              value={pue}
              onChange={(e) => setPue(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Clean Energy Share */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <label>{t.cfeLabel}</label>
              <span className="font-mono font-bold text-emerald-800">%{solarPpaShare}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={solarPpaShare}
              onChange={(e) => setSolarPpaShare(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Calculated Metrics & Article 50 Scorecard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {t.secResults}
              </h2>
              <span className="text-xs font-mono text-slate-500">
                {itLoadKw.toLocaleString()} kW Toplam IT Gücü
              </span>
            </div>

            {/* Metric Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.annualLoad}</span>
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {annualEnergyMWh.toLocaleString()} <span className="text-xs font-sans font-normal text-slate-500">MWh/yıl</span>
                </div>
                <div className="text-[11px] text-emerald-700">
                  ~{energySavedMWh.toLocaleString()} MWh tasarruf
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.carbonSaved}</span>
                </div>
                <div className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
                  {carbonAvoidedTons.toLocaleString()} <span className="text-xs font-sans font-normal text-emerald-600">Ton CO₂e/yıl</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  %{Math.round((carbonAvoidedTons / baselineEmissions) * 100)} emisyon azaltımı
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-cyan-800 font-medium">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t.waterSaved}</span>
                </div>
                <div className="text-xl font-bold font-mono text-cyan-900 tabular-nums">
                  {(waterSavedLiters / 1000000).toFixed(1)} <span className="text-xs font-sans font-normal text-cyan-700">Milyon Litre</span>
                </div>
                <div className="text-[11px] text-cyan-700">
                  {coolingType !== 'air' ? 'Sıfır tatlı su tüketimi' : 'Yüksek su sarfiyatı'}
                </div>
              </div>
            </div>

            {/* Compliance Progress Checklist */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t.complianceHeading}</h3>
                  <p className="text-xs text-slate-500">
                    {isTr ? 'COP31 Antalya yeşil deklarasyon kriterlerine uygunluk puanı' : 'Compliance score based on COP31 declaration rules'}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-black font-mono ${complianceScore >= 80 ? 'text-emerald-700' : 'text-amber-600'}`}>
                    {complianceScore}/100
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${complianceScore >= 80 ? 'bg-emerald-700' : 'bg-amber-500'}`}
                  style={{ width: `${complianceScore}%` }}
                ></div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  {isPueCompliant ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span><strong>PUE Hedefi:</strong> Tesis verimliliği ≤ 1.15 eşiğini sağlıyor ({pue.toFixed(2)})</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  {isCfeCompliant ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span><strong>Temiz Enerji Oranı:</strong> 24/7 CFE sertifikasyonu ≥ %80 ({solarPpaShare}%)</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  {isWaterCompliant ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span><strong>Akdeniz Su Tasarrufu:</strong> Kapalı devre sıvı / daldırma soğutma ile buharlaşmalı kule kullanılmıyor.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>{t.btnGenCert}</span>
              </button>

              <button
                onClick={onOpenCommitment}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <span>{isTr ? 'Bu Değerlerle Taahhüde Katıl' : 'Register with These Metrics'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                Birleşmiş Milletler COP31 Antalya İklim Zirvesi
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Resmi Karbon & E-Dönüşüm Uygunluk Beyannamesi
              </h3>
              <div className="text-xs text-slate-500 font-mono">
                Belge No: COP31-AUDIT-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Hesaplama Kapasitesi:</span>
                <span className="font-bold text-slate-900">{rackCount} Kabin ({hardwareType.toUpperCase()})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Tesis PUE Katsayısı:</span>
                <span className="font-bold text-slate-900">{pue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">24/7 CFE Temiz Enerji Payı:</span>
                <span className="font-bold text-emerald-700">%{solarPpaShare}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Yıllık Önlenecek Karbon:</span>
                <span className="font-bold text-emerald-800">{carbonAvoidedTons.toLocaleString()} Ton CO₂e</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500">AB Yapay Zekâ Yasası Uyum Puanı:</span>
                <span className="font-bold text-slate-900">{complianceScore}/100</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Bu beyan, COP31 Antalya Zirvesi Dijital Şeffaflık Protokolü ve AB AI Act Madde 50 teknik raporlama standartlarına uygun olarak otomatik olarak derlenmiştir.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Yazdır / PDF Olarak Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
