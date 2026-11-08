import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Download, Printer, Award, Building, Mail, User, Globe } from 'lucide-react';
import { Signatory } from '../data/mockData';

interface CommitmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSignatory: (newSig: Signatory) => void;
  lang: 'tr' | 'en';
}

export const CommitmentFormModal: React.FC<CommitmentFormModalProps> = ({
  isOpen,
  onClose,
  onAddSignatory,
  lang,
}) => {
  const isTr = lang === 'tr';

  const [institutionName, setInstitutionName] = useState('');
  const [representative, setRepresentative] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'Kamu' | 'Enerji' | 'Veri Merkezi' | 'Teknoloji' | 'Akademi'>('Veri Merkezi');
  const [capacityMW, setCapacityMW] = useState<number>(150);
  const [targetPUE, setTargetPUE] = useState<number>(1.12);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [country, setCountry] = useState('Türkiye');

  // Checkboxes
  const [checkAiAct, setCheckAiAct] = useState(true);
  const [checkGridSync, setCheckGridSync] = useState(true);
  const [checkWater, setCheckWater] = useState(true);

  // Success state
  const [submittedCert, setSubmittedCert] = useState<{
    certCode: string;
    date: string;
    name: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName.trim() || !email.trim()) return;

    const certCode = `COP31-ANT-${Math.floor(1000 + Math.random() * 9000)}-AI`;
    const today = new Date().toISOString().split('T')[0];

    const categoryEnMap: Record<string, 'Public' | 'Energy' | 'Data Center' | 'Tech' | 'Academia'> = {
      'Kamu': 'Public',
      'Enerji': 'Energy',
      'Veri Merkezi': 'Data Center',
      'Teknoloji': 'Tech',
      'Akademi': 'Academia',
    };

    const newSig: Signatory = {
      id: certCode,
      name: institutionName.trim(),
      category: category,
      categoryEn: categoryEnMap[category] || 'Tech',
      capacityMW: Number(capacityMW),
      targetPUE: Number(targetPUE),
      targetYear: Number(targetYear),
      verified: true,
      country: country.trim() || 'Türkiye',
      dateSigned: today,
    };

    onAddSignatory(newSig);
    setSubmittedCert({
      certCode,
      date: today,
      name: institutionName.trim(),
    });
  };

  const t = {
    title: isTr ? 'COP31 Antalya Yapay Zekâ & Şebeke Taahhüdü' : 'COP31 Antalya AI & Grid Electrification Compact',
    subtitle: isTr
      ? 'Resmi Birleşmiş Milletler İklim Zirvesi 24/7 Karbonsuz Enerji (CFE) ve PUE ≤ 1.15 Kurumsal Katılım Protokolü.'
      : 'Official UN Climate Summit 24/7 Carbon-Free Energy (CFE) and PUE ≤ 1.15 Institutional Signatory Agreement.',
    instLabel: isTr ? 'Kurum / Kuruluş Adı:' : 'Organization / Institution Name:',
    repLabel: isTr ? 'Yetkili Temsilci Adı Soyadı:' : 'Authorized Representative:',
    emailLabel: isTr ? 'Kurumsal E-posta:' : 'Corporate Email:',
    catLabel: isTr ? 'Sektörel Faaliyet Alanı:' : 'Sectoral Category:',
    capLabel: isTr ? 'Taahhüt Edilen Temiz Kapasite (MW):' : 'Committed Clean Capacity (MW):',
    pueLabel: isTr ? 'Hedeflenen Veri Merkezi PUE Oranı:' : 'Target Facility PUE Ratio:',
    yearLabel: isTr ? '24/7 CFE Hedef Yılı:' : 'Target 24/7 CFE Year:',
    countryLabel: isTr ? 'Ülke / Genel Merkez:' : 'Country / Headquarters:',
    check1: isTr
      ? 'AB Yapay Zekâ Yasası (AI Act) Madde 50 uyarınca hesaplama yoğunluğu ve sera gazı emisyonlarımızı yıllık kamuoyuna doğrulanabilir şekilde açıklamayı kabul ediyoruz.'
      : 'We agree to transparently audit and report computational intensity and GHG footprints per EU AI Act Article 50 guidelines.',
    check2: isTr
      ? 'Güneş üretiminin pik yaptığı saatlerde (10:00–15:00) esnek talep yanıtı sağlayarak Akdeniz elektrik şebekesini dengelemeyi taahhüt ediyoruz.'
      : 'We commit to flexible workload demand-response during peak solar windows (10:00–15:00) to stabilize the Mediterranean grid.',
    check3: isTr
      ? 'Kapalı devre soğutma sistemlerine geçerek veri merkezinde tatlı su tüketimini sıfırlamayı kabul ediyoruz.'
      : 'We commit to zero evaporative fresh water consumption through closed-loop liquid cooling architecture.',
    btnSubmit: isTr ? 'Taahhüdü Resmi Olarak İmzala' : 'Sign & Submit Official Compact',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedCert ? (
          /* Certificate confirmation view */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
                {isTr ? 'Tescil Edilmiş Resmi Diplomatik Belge' : 'Officially Registered Diplomatic Instrument'}
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {isTr ? 'Taahhütname Başarıyla İmzalandı' : 'Compact Successfully Ratified'}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {submittedCert.certCode} · {submittedCert.date}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-3">
              <div className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                {submittedCert.name}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isTr
                  ? `Kurumunuz, COP31 Antalya Zirvesi öncesinde ${capacityMW} MW temiz enerji kapasitesi ve PUE ≤ ${targetPUE} verimlilik hedefiyle Akdeniz Yapay Zekâ Taahhüdü resmi kayıt defterine eklenmiştir.`
                  : `Your organization has been entered into the official COP31 Antalya AI Compact Registry with ${capacityMW} MW capacity and a PUE ≤ ${targetPUE} target.`}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>{isTr ? 'Doğrulama Statüsü: Resmi Katılımcı' : 'Verification: Official Signatory'}</span>
                <span className="text-emerald-700 font-bold font-mono">24/7 CFE · UN COP31</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{isTr ? 'Sertifikayı Yazdır / PDF İndir' : 'Print / Download Certificate'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {isTr ? 'Listeye Dön ve Kapat' : 'Return to Showcase'}
              </button>
            </div>
          </div>
        ) : (
          /* Form view */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.title}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isTr ? 'Yeşil Mutabakatı İmzalayın ve Katılın' : 'Join the Mediterranean Green AI Compact'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.instLabel}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={isTr ? 'Örn: Anadolu Veri Teknolojileri A.Ş.' : 'e.g. Mediterranean Cloud Systems'}
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.repLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={isTr ? 'Ad Soyad' : 'Full Name'}
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="official@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.catLabel}
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Veri Merkezi">{isTr ? 'Veri Merkezi İşletmecisi' : 'Data Center Operator'}</option>
                  <option value="Enerji">{isTr ? 'Enerji Üretim & İletim Şirketi' : 'Energy Producer / Utility'}</option>
                  <option value="Teknoloji">{isTr ? 'Bulut & AI Donanım Sağlayıcı' : 'Cloud & AI Provider'}</option>
                  <option value="Kamu">{isTr ? 'Kamu Kurumu / Düzenleyici Otorite' : 'Public Agency'}</option>
                  <option value="Akademi">{isTr ? 'Üniversite / Araştırma Enstitüsü' : 'Research Institute'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.countryLabel}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.capLabel}
                </label>
                <input
                  type="number"
                  min="5"
                  max="5000"
                  value={capacityMW}
                  onChange={(e) => setCapacityMW(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  {t.pueLabel}
                </label>
                <select
                  value={targetPUE}
                  onChange={(e) => setTargetPUE(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                >
                  <option value={1.10}>PUE ≤ 1.10 (İleri Seviye Sıvı Daldırma)</option>
                  <option value={1.12}>PUE ≤ 1.12 (Direkt Çipe Sıvı Soğutma)</option>
                  <option value={1.15}>PUE ≤ 1.15 (COP31 Tavan Eşiği)</option>
                </select>
              </div>
            </div>

            {/* Checkbox Disclosures */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkAiAct}
                  onChange={(e) => setCheckAiAct(e.target.checked)}
                  required
                  className="mt-0.5 accent-emerald-700 rounded"
                />
                <span>{t.check1}</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkGridSync}
                  onChange={(e) => setCheckGridSync(e.target.checked)}
                  required
                  className="mt-0.5 accent-emerald-700 rounded"
                />
                <span>{t.check2}</span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkWater}
                  onChange={(e) => setCheckWater(e.target.checked)}
                  required
                  className="mt-0.5 accent-emerald-700 rounded"
                />
                <span>{t.check3}</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {isTr ? 'Vazgeç' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {t.btnSubmit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
