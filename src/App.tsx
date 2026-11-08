import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ShowcaseView } from './components/ShowcaseView';
import { OfficialAgendaCenter } from './components/OfficialAgendaCenter';
import { GridSimulator } from './components/GridSimulator';
import { EmbeddedModuleView } from './components/EmbeddedModuleView';
import { StrategyAnalysis } from './components/StrategyAnalysis';
import { CommitmentFormModal } from './components/CommitmentFormModal';
import { INITIAL_SIGNATORIES, Signatory } from './data/mockData';
import { Globe, Shield, ExternalLink, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('showcase');
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [signatories, setSignatories] = useState<Signatory[]>(INITIAL_SIGNATORIES);

  const isTr = lang === 'tr';

  const handleAddSignatory = (newSig: Signatory) => {
    setSignatories((prev) => [newSig, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Header & Diplomatic Notification Ticker */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommitment={() => setIsCommitmentOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'showcase' && (
          <ShowcaseView
            onOpenCommitment={() => setIsCommitmentOpen(true)}
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onNavigateToTransformation={() => setActiveTab('transformation')}
            onNavigateToAgenda={() => setActiveTab('agenda')}
            lang={lang}
            setLang={setLang}
            signatories={signatories}
          />
        )}

        {activeTab === 'agenda' && (
          <OfficialAgendaCenter lang={lang} />
        )}

        {activeTab === 'strategy' && (
          <StrategyAnalysis
            lang={lang}
            onOpenCommitment={() => setIsCommitmentOpen(true)}
          />
        )}

        {activeTab === 'transformation' && (
          <EmbeddedModuleView
            lang={lang}
            onOpenCommitment={() => setIsCommitmentOpen(true)}
          />
        )}

        {activeTab === 'simulator' && (
          <GridSimulator
            lang={lang}
            onOpenCommitment={() => setIsCommitmentOpen(true)}
          />
        )}
      </main>

      {/* Commitment Signing Modal */}
      <CommitmentFormModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        onAddSignatory={handleAddSignatory}
        lang={lang}
      />

      {/* Quiet, Compliant Institutional Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">
                COP31 Antalya Yapay Zekâ Taahhüdü & Elektrifikasyon Girişimi
              </div>
              <div className="text-[11px] text-slate-500">
                {isTr
                  ? 'Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi (UNFCCC) Akdeniz İttifakı'
                  : 'United Nations Framework Convention on Climate Change (UNFCCC) Mediterranean Alliance'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('agenda')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              {isTr ? 'Liderler Zirvesi Takvimi' : 'Leaders Summit Calendar'}
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              {isTr ? '1.5°C Aşım Raporu' : '1.5°C Overshoot Report'}
            </button>
            <button
              onClick={() => setActiveTab('transformation')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              {isTr ? 'Madde 50 Şeffaflık Formatı' : 'Article 50 Transparency'}
            </button>
            <button
              onClick={() => setIsCommitmentOpen(true)}
              className="text-emerald-800 font-semibold hover:underline cursor-pointer"
            >
              {isTr ? 'Kurumsal Taahhüt Defteri' : 'Official Registry'}
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            © 2026 COP31 Antalya. {isTr ? 'Tüm Hakları Saklıdır.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
