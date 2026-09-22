import React, { useState } from 'react';
import { FLASHCARDS_LIST, type FlashcardItem } from '../data/simuladoData';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const [cards, setCards] = useState<FlashcardItem[]>(FLASHCARDS_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleKnown = () => {
    if (!currentCard) return;
    setKnownCards((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));
  };

  const knownCount = Object.values(knownCards).filter(Boolean).length;

  if (!currentCard) return null;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full space-y-5 animate-in fade-in duration-200">
      {/* Barra Superior de Progresso e Ações */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/60">
            Card {currentIndex + 1} de {cards.length}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            • {currentCard.categoria}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            title="Embaralhar flashcards"
          >
            <Shuffle size={13} />
            <span>Embaralhar</span>
          </button>

          <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-lg flex items-center gap-1">
            <CheckCircle2 size={13} />
            <span>{knownCount}/{cards.length} dominados</span>
          </span>
        </div>
      </div>

      {/* Cartão Interativo 3D / Flip */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] sm:min-h-[340px] cursor-pointer select-none perspective-[1000px] group"
        title="Clique para virar o cartão"
      >
        <div
          className={`relative w-full h-full min-h-[300px] sm:min-h-[340px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 shadow-2xl border ${
            isFlipped
              ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-indigo-500/50 shadow-indigo-500/10'
              : 'bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/50 border-slate-700/80 hover:border-blue-500/60 shadow-blue-500/5'
          }`}
        >
          {/* Topo do Card */}
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${
                isFlipped
                  ? 'bg-indigo-900/60 border-indigo-700 text-indigo-300'
                  : 'bg-blue-900/60 border-blue-700 text-blue-300'
              }`}
            >
              {isFlipped ? '💡 Resposta / Explicação' : '❓ Pergunta / Conceito'}
            </span>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-blue-400 transition-colors">
              <RotateCw size={13} className="animate-spin-slow" />
              <span>Clique para virar</span>
            </div>
          </div>

          {/* Conteúdo Central */}
          <div className="my-auto py-4">
            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase flex items-center gap-1.5">
                  <Sparkles size={14} /> Foco da Prova NP1
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentCard.pergunta}
                </h3>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                  {currentCard.resposta}
                </p>

                {currentCard.macete && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                    <Lightbulb size={16} className="shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block">Dica de Prova / Macete do Valter:</strong>
                      {currentCard.macete}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rodapé do Card */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Layers size={13} /> {currentCard.categoria}
            </span>
            <span className="font-mono">
              {knownCards[currentCard.id] ? '✅ Marcado como aprendido' : '⏳ Em aprendizado'}
            </span>
          </div>
        </div>
      </div>

      {/* Controles Inferiores */}
      <div className="w-full flex items-center justify-between gap-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        <button
          onClick={toggleKnown}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
            knownCards[currentCard.id]
              ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
              : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300'
          }`}
        >
          <CheckCircle2 size={16} className={knownCards[currentCard.id] ? 'text-emerald-400' : ''} />
          <span>{knownCards[currentCard.id] ? 'Já aprendi!' : 'Marcar como Aprendido'}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <span>Próximo</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
