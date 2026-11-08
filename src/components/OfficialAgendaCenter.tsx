import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, FileText, Download, Filter, AlertTriangle, Globe } from 'lucide-react';
import { COP31_AGENDA_ITEMS, AgendaItem } from '../data/mockData';

interface OfficialAgendaCenterProps {
  lang: 'tr' | 'en';
}

export const OfficialAgendaCenter: React.FC<OfficialAgendaCenterProps> = ({ lang }) => {
  const isTr = lang === 'tr';
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('AG-01');

  const themes = [
    { id: 'all', label: isTr ? 'Tüm Oturumlar' : 'All Sessions' },
    { id: 'Liderler Zirvesi', label: isTr ? 'Liderler Zirvesi (11-12 Kasım)' : 'Leaders Summit (Nov 11-12)' },
    { id: '1.5°C & Aşım', label: isTr ? '1.5°C & Aşım Politikaları' : '1.5°C & Overshoot' },
    { id: 'Yapay Zekâ & Şebeke', label: isTr ? 'Yapay Zekâ & Şebeke' : 'AI & Grid Electrification' },
    { id: 'Madde 6 Karbon', label: isTr ? 'Madde 6 Karbon Piyasası' : 'Article 6 Carbon Market' },
    { id: 'Kayıp-Zarar Fonu', label: isTr ? 'Kayıp-Zarar Fonu' : 'Loss & Damage Fund' },
  ];

  const filteredItems = selectedTheme === 'all'
    ? COP31_AGENDA_ITEMS
    : COP31_AGENDA_ITEMS.filter(item => item.theme === selectedTheme);

  const t = {
    title: isTr ? 'Resmi COP31 Antalya Zirvesi Gündem Merkezi' : 'Official COP31 Antalya Summit Agenda Center',
    subtitle: isTr
      ? '11–20 Kasım 2026 tarihlerinde Antalya’da gerçekleşecek BM İklim Değişikliği 31. Taraflar Konferansı’nın resmi diplomatik oturumları ve karar taslakları.'
      : 'Official diplomatic schedule, ministerial negotiations, and draft resolutions for the UN Climate Change Conference COP31 in Antalya, November 11–20, 2026.',
    countdownLabel: isTr ? 'Kritik Dünya Liderleri Zirvesi’ne Kalan Süre' : 'Countdown to World Leaders Summit',
    badgeOfficial: isTr ? 'Resmi BM Müzakere Takvimi' : 'Official UN Negotiation Schedule',
    downloadBrief: isTr ? 'Gündem Özet Raporunu İndir (PDF)' : 'Download Agenda Policy Brief (PDF)',
    filterLabel: isTr ? 'Müzakere Başlığına Göre Filtrele:' : 'Filter by Negotiation Pillar:',
    outcomesTitle: isTr ? 'Beklenen Kritik Kararlar & Diplomatik Çıktılar:' : 'Expected Key Decisions & Diplomatic Outcomes:',
    venue: isTr ? 'Oturum Alanı' : 'Session Venue',
    status: isTr ? 'Diplomatik Statü' : 'Diplomatic Status',
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>{t.badgeOfficial}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-600 dark:text-slate-400 font-mono">COP31 / CMP19 / CMA6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Leaders Summit Highlight Box */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-xl p-5 shrink-0 border border-slate-800 dark:border-slate-800 space-y-3 min-w-[280px]">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {t.countdownLabel}
            </div>
            <div className="text-xl font-bold font-mono tracking-tight text-white">
              11–12 {isTr ? 'Kasım' : 'November'} 2026
            </div>
            <div className="text-xs text-slate-300">
              {isTr ? 'Antalya Uluslararası Diplomasi & EXPO Merkezi' : 'Antalya International Diplomacy & EXPO Center'}
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>{isTr ? '198 Ülke Temsilcisi' : '198 State Parties'}</span>
              <span className="text-emerald-400 font-semibold">{isTr ? 'Yüksek Düzey Katılım' : 'High-Level Summit'}</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            {t.filterLabel}
          </span>
          {themes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTheme(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedTheme === tab.id
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agenda Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isLeaderSummit = item.theme === 'Liderler Zirvesi';

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-xl border transition-all ${
                isLeaderSummit
                  ? 'border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-100 dark:ring-emerald-900/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded">
                      {item.dateLabel}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-slate-600 dark:text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.time}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {isTr ? item.theme : item.themeEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                    {isTr ? item.title : item.titleEn}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    item.diplomaticStatus === 'Kritik Dönüm Noktası'
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {item.diplomaticStatus}
                  </span>
                  <button className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                    {isExpanded ? (isTr ? 'Detayı Kapat ▲' : 'Collapse ▲') : (isTr ? 'Görüntüle ▼' : 'Details ▼')}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 sm:px-6 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-800/40 rounded-b-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {isTr ? item.summary : item.summaryEn}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {t.outcomesTitle}
                    </div>
                    <ul className="space-y-1.5">
                      {(isTr ? item.keyOutcomes : item.keyOutcomesEn).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                    <span>Protokol Kodu: <strong className="font-mono text-slate-800 dark:text-slate-200">{item.id}-UNFCCC-ANT</strong></span>
                    <button
                      onClick={() => alert(isTr ? 'Resmi karar tasarısı PDF formatında hazırlandı.' : 'Official draft brief compiled in PDF format.')}
                      className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.downloadBrief}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
