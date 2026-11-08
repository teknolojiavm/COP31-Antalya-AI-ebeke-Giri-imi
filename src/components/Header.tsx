import React from 'react';
import { Calendar, Globe2, ShieldCheck, Zap, Moon, Sun } from 'lucide-react';

export type ActiveTab = 'agenda' | 'strategy' | 'showcase' | 'transformation' | 'simulator';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCommitment: () => void;
  lang: 'tr' | 'en';
  setLang: (lang: 'tr' | 'en') => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCommitment,
  lang,
  setLang,
  isDark,
  toggleDark,
}) => {
  const t = {
    tr: {
      brand: 'COP31 Antalya AI & Şebeke Girişimi',
      agenda: 'COP31 Gündemi',
      strategy: 'Strateji Analizi',
      showcase: 'AI & Şebeke Vitrini',
      transformation: 'E-Dönüşüm Modülü',
      simulator: 'Şebeke Simülatörü',
      cta: 'Taahhüt İmzala',
      noticeLeader: 'Kritik Liderler Zirvesi: 11–12 Kasım 2026, Antalya Uluslararası Zirve Alanı',
      noticeGoal: '1.5°C Paris Eşiği ve Aşım (Overshoot) Politikaları',
      noticeArticle: 'Madde 6 Doğrulanabilir Dijital Karbon Takas Defteri Standardı',
      langSwitch: 'EN',
    },
    en: {
      brand: 'COP31 Antalya AI & Grid Initiative',
      agenda: 'COP31 Agenda',
      strategy: 'Strategy Analysis',
      showcase: 'AI & Grid Showcase',
      transformation: 'E-Transformation Module',
      simulator: 'Grid Simulator',
      cta: 'Sign Commitment',
      noticeLeader: 'Critical World Leaders Summit: 11–12 November 2026, Antalya Summit Arena',
      noticeGoal: '1.5°C Paris Threshold & Overshoot Protocols',
      noticeArticle: 'Article 6 Verifiable Digital Carbon Credit Standard',
      langSwitch: 'TR',
    },
  }[lang];

  return (
    <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Diplomatic High-Priority Notification Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white text-xs px-4 py-1.5 border-b border-slate-800 dark:border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {t.noticeLeader}
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300">
              {t.noticeGoal}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              {t.noticeArticle}
            </span>
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe2 className="w-3 h-3 text-emerald-400" />
              {t.langSwitch}
            </button>
            <button
              onClick={toggleDark}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Açık</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-300" />
                  <span className="hidden sm:inline">Koyu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Zone 1 - Zone 2 - Zone 3) */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('showcase')}
          className="text-left font-bold text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <div className="w-6 h-6 rounded bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>{t.brand}</span>
        </button>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'agenda'
                ? 'text-emerald-800 dark:text-emerald-400 border-emerald-700 dark:border-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.agenda}
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'strategy'
                ? 'text-emerald-800 dark:text-emerald-400 border-emerald-700 dark:border-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.strategy}
          </button>
          <button
            onClick={() => setActiveTab('showcase')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'showcase'
                ? 'text-emerald-800 dark:text-emerald-400 border-emerald-700 dark:border-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.showcase}
          </button>
          <button
            onClick={() => setActiveTab('transformation')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'transformation'
                ? 'text-emerald-800 dark:text-emerald-400 border-emerald-700 dark:border-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.transformation}
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'simulator'
                ? 'text-emerald-800 dark:text-emerald-400 border-emerald-700 dark:border-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.simulator}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCommitment}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            {t.cta}
          </button>
        </div>
      </header>

      {/* Mobile nav bar row for smaller screens */}
      <div className="md:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('showcase')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'showcase' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t.showcase}
        </button>
        <button
          onClick={() => setActiveTab('agenda')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'agenda' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t.agenda}
        </button>
        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'strategy' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t.strategy}
        </button>
        <button
          onClick={() => setActiveTab('transformation')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'transformation' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t.transformation}
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'simulator' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t.simulator}
        </button>
      </div>
    </div>
  );
};
