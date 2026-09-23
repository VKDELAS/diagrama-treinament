import React, { useState } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Filter,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import { FLASHCARDS_B1_DATA, type Flashcard } from '../data/flashcardsB1Data';

interface FlashcardsB1ViewProps {
  onBack: () => void;
}

export const FlashcardsB1View: React.FC<FlashcardsB1ViewProps> = ({ onBack }) => {
  const [deck, setDeck] = useState<Flashcard[]>(FLASHCARDS_B1_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<number[]>([]);
  const [unknownCardIds, setUnknownCardIds] = useState<number[]>([]);
  const [onlyUnknownMode, setOnlyUnknownMode] = useState(false);

  // Lista de cartas ativas conforme o filtro "Apenas Não Sei"
  const activeDeck = onlyUnknownMode
    ? deck.filter((c) => unknownCardIds.includes(c.id))
    : deck;

  const currentCard = activeDeck[currentIndex] || activeDeck[0];
  const totalCards = activeDeck.length;

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(totalCards - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleMarkKnown = (id: number) => {
    setKnownCardIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setUnknownCardIds((prev) => prev.filter((item) => item !== id));
    handleNext();
  };

  const handleMarkUnknown = (id: number) => {
    setUnknownCardIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setKnownCardIds((prev) => prev.filter((item) => item !== id));
    handleNext();
  };

  const toggleOnlyUnknown = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
    setOnlyUnknownMode((prev) => !prev);
  };

  const handleResetProgress = () => {
    setKnownCardIds([]);
    setUnknownCardIds([]);
    setOnlyUnknownMode(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-indigo-600/30">
      {/* Cabeçalho do Módulo */}
      <ModuleHeader
        title="Flashcards de Fixação B1"
        subtitle="Memorização ativa das 7 questões, conceitos e gabarito oficial"
        badge="B1 • FLASHCARDS"
        icon={Sparkles}
        badgeColor="bg-indigo-900/60 border-indigo-700/60 text-indigo-300"
        onBack={onBack}
      />

      {/* Barra de Controles e Placar */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-8 py-3 shrink-0 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Contadores */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300">
            <CheckCircle2 size={15} />
            <span>Sei: {knownCardIds.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300">
            <XCircle size={15} />
            <span>Não sei: {unknownCardIds.length}</span>
          </div>

          <span className="text-slate-400 font-mono hidden sm:inline">
            Total estudado: {knownCardIds.length + unknownCardIds.length}/{deck.length}
          </span>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleOnlyUnknown}
            disabled={unknownCardIds.length === 0 && !onlyUnknownMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              onlyUnknownMode
                ? 'bg-rose-950 border-rose-700 text-rose-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 disabled:opacity-40 disabled:pointer-events-none'
            }`}
            title="Estudar somente as cartas marcadas como Não Sei"
          >
            <Filter size={14} />
            <span>{onlyUnknownMode ? 'Ver Todas' : 'Estudar só "Não sei"'}</span>
          </button>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Embaralhar as cartas"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Embaralhar</span>
          </button>

          <button
            onClick={handleResetProgress}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all cursor-pointer"
            title="Zerar pontuação"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Área Central com o Flashcard */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center">
        {totalCards > 0 && currentCard ? (
          <div className="w-full max-w-xl flex flex-col items-center">
            {/* Indicador de Posição da Carta */}
            <div className="flex items-center justify-between w-full mb-3 px-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-300 font-bold">
                {currentCard.categoria}
              </span>
              <span>
                Carta {currentIndex + 1} de {totalCards}
              </span>
            </div>

            {/* Carta com Efeito Flip / Frente e Verso */}
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className="w-full min-h-[290px] sm:min-h-[320px] bg-slate-900 border-2 border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 transform select-none relative group"
            >
              {/* Badge indicando o lado atual */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                  {isFlipped ? 'VERSO (RESPOSTA + MOTIVO)' : 'FRENTE (CONCEITO / PERGUNTA)'}
                </span>

                <span className="text-xs text-indigo-400 font-medium group-hover:text-indigo-300 flex items-center gap-1">
                  Clique para virar ↺
                </span>
              </div>

              {/* Conteúdo da Carta */}
              <div className="my-auto py-4">
                {!isFlipped ? (
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed text-center">
                    {currentCard.frente}
                  </h3>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-800/80">
                      <p className="text-base sm:text-lg font-extrabold text-indigo-200 leading-snug">
                        {currentCard.verso}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                      <strong className="text-amber-400">Por quê?</strong>{' '}
                      {currentCard.motivo}
                    </div>
                  </div>
                )}
              </div>

              {/* Dica de rodapé do card */}
              <div className="text-center text-[11px] text-slate-500">
                Toque no card para alternar frente e verso
              </div>
            </div>

            {/* Controles Inferiores: Anterior / Sei / Não Sei / Próxima */}
            <div className="w-full mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkUnknown(currentCard.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-700/80 active:scale-95 text-rose-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md"
                >
                  <XCircle size={16} />
                  <span>Não sei</span>
                </button>

                <button
                  onClick={() => handleMarkKnown(currentCard.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 active:scale-95 text-emerald-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md"
                >
                  <CheckCircle2 size={16} />
                  <span>Sei</span>
                </button>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-indigo-600/30"
              >
                <span>Próxima</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-md">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              Todas as cartas foram dominadas!
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Você não possui nenhuma carta pendente no filtro de "Não sei".
            </p>
            <button
              onClick={() => setOnlyUnknownMode(false)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Ver todas as cartas novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
