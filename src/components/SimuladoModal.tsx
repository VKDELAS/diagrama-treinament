import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  Award,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SimuladoExamView } from './SimuladoExamView';
import { FlashcardsView } from './FlashcardsView';
import { MultipleChoiceView } from './MultipleChoiceView';
import { DiagramChallengeView } from './DiagramChallengeView';

export type SimuladoTab = 'simulado' | 'flashcards' | 'treino' | 'diagrama';

interface SimuladoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: SimuladoTab;
}

export const SimuladoModal: React.FC<SimuladoModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'simulado',
}) => {
  const [activeTab, setActiveTab] = useState<SimuladoTab>(defaultTab);
  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);

  if (defaultTab !== prevDefaultTab) {
    setPrevDefaultTab(defaultTab);
    setActiveTab(defaultTab);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[94vh]">
        {/* Cabeçalho do Modal */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-2xl shadow-lg shadow-blue-500/25 shrink-0">
              <FileCheck2 size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-600/60 text-blue-300">
                  UNIP • Prova NP1
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Engenharia de Software Ágil • Prof. Valter
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide mt-0.5">
                Simulador de Prova & Fixação ADS
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Abas de Navegação */}
        <div className="flex items-center justify-between px-3 sm:px-6 pt-2.5 bg-slate-950/70 border-b border-slate-800/80 gap-1.5 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Aba 1: Simulado Oficial */}
            <button
              onClick={() => setActiveTab('simulado')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'simulado'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Award size={15} className="shrink-0" />
              <span>Simulado Oficial NP1</span>
            </button>

            {/* Aba 2: Flashcards */}
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'border-indigo-500 text-indigo-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Sparkles size={15} className="shrink-0 text-amber-400" />
              <span>Flashcards</span>
            </button>

            {/* Aba 3: Treino Múltipla Escolha */}
            <button
              onClick={() => setActiveTab('treino')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'treino'
                  ? 'border-cyan-500 text-cyan-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <HelpCircle size={15} className="shrink-0" />
              <span>Múltipla Escolha</span>
            </button>

            {/* Aba 4: Diagrama da Prova Q7 */}
            <button
              onClick={() => setActiveTab('diagrama')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'diagrama'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Layers size={15} className="shrink-0 text-emerald-400" />
              <span>Diagrama da Prova (Q7)</span>
            </button>
          </div>
        </div>

        {/* Corpo com Scroll do Conteúdo */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 select-text">
          {activeTab === 'simulado' && <SimuladoExamView onOpenCanvas={onClose} />}
          {activeTab === 'flashcards' && <FlashcardsView />}
          {activeTab === 'treino' && <MultipleChoiceView />}
          {activeTab === 'diagrama' && <DiagramChallengeView onOpenCanvas={onClose} />}
        </div>
      </div>
    </div>
  );
};
