import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import {
  PROG_C_FLASHCARDS_DATA,
  type CFlashcard,
} from '../data/progCFlashcardsData';

interface ProgCFlashcardsViewProps {
  onBack: () => void;
  onOpenBottomBarSettings?: () => void;
}

export const ProgCFlashcardsView: React.FC<ProgCFlashcardsViewProps> = ({
  onBack,
  onOpenBottomBarSettings,
}) => {
  const [deck, setDeck] = useState<CFlashcard[]>(PROG_C_FLASHCARDS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<number[]>([]);
  const [unknownCardIds, setUnknownCardIds] = useState<number[]>([]);
  const [onlyUnknownMode, setOnlyUnknownMode] = useState(false);

  // Lista única de categorias
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(PROG_C_FLASHCARDS_DATA.map((c) => c.categoria))
    );
    return ['Todas', ...cats];
  }, []);

  // Deck filtrado
  const activeDeck = useMemo(() => {
    return deck.filter((c) => {
      const matchCat =
        selectedCategory === 'Todas' || c.categoria === selectedCategory;
      const matchUnknown = !onlyUnknownMode || unknownCardIds.includes(c.id);
      return matchCat && matchUnknown;
    });
  }, [deck, selectedCategory, onlyUnknownMode, unknownCardIds]);

  const totalCards = activeDeck.length;
  const currentCard = activeDeck[currentIndex] || activeDeck[0];

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < totalCards - 1 ? prev + 1 : 0));
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(totalCards - 1, 0)));
  }, [totalCards]);

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleResetProgress = () => {
    setKnownCardIds([]);
    setUnknownCardIds([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setDeck(PROG_C_FLASHCARDS_DATA);
  };

  const markKnown = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentCard) return;
    if (!knownCardIds.includes(currentCard.id)) {
      setKnownCardIds((prev) => [...prev, currentCard.id]);
    }
    setUnknownCardIds((prev) => prev.filter((id) => id !== currentCard.id));
    handleNext();
  };

  const markUnknown = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentCard) return;
    if (!unknownCardIds.includes(currentCard.id)) {
      setUnknownCardIds((prev) => [...prev, currentCard.id]);
    }
    setKnownCardIds((prev) => prev.filter((id) => id !== currentCard.id));
    handleNext();
  };

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const isCurrentKnown = currentCard
    ? knownCardIds.includes(currentCard.id)
    : false;
  const isCurrentUnknown = currentCard
    ? unknownCardIds.includes(currentCard.id)
    : false;

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/85 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10"
    >
      <ModuleHeader
        title="Flashcards de Fixação • Programação em C"
        subtitle="Repetição Ativa • Sintaxe, Operadores, Laços, Vetores, Matrizes e Código da Prova"
        badge="B1 • PROGRAMAÇÃO EM C"
        badgeColor="bg-sky-950/80 border-sky-800 text-sky-300"
        icon={Sparkles}
        onBack={onBack}
        onOpenBottomBarSettings={onOpenBottomBarSettings}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col gap-4">
        {/* Barra de Categorias e Filtros */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition-all cursor-pointer"
              title="Embaralhar cartas"
            >
              <Shuffle size={13} />
              <span className="hidden sm:inline">Embaralhar</span>
            </button>

            <button
              onClick={() => {
                setOnlyUnknownMode((prev) => !prev);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                onlyUnknownMode
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                  : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]'
              }`}
            >
              <HelpCircle size={13} />
              <span>Apenas Revisar ({unknownCardIds.length})</span>
            </button>
          </div>
        </div>

        {/* Estatísticas Rápidas de Progresso */}
        <div className="flex items-center justify-between px-2 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <CheckCircle2 size={13} /> {knownCardIds.length} sei
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-mono">
              <XCircle size={13} /> {unknownCardIds.length} revisar
            </span>
          </div>

          <div className="font-mono text-zinc-400">
            {totalCards > 0 ? currentIndex + 1 : 0} / {totalCards} cartas
          </div>
        </div>

        {/* Flashcard 3D Interativo */}
        {totalCards > 0 && currentCard ? (
          <div className="perspective-1000 w-full min-h-[340px] sm:min-h-[380px] flex">
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className={`w-full flex-1 rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 border relative ${
                isFlipped
                  ? 'bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-[#040813] border-blue-500/50 shadow-2xl shadow-blue-950/40'
                  : 'bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.01] border-white/[0.1] hover:border-white/[0.2] shadow-xl'
              }`}
            >
              {/* Topo do Card */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                  {currentCard.categoria}
                </span>

                <span className="text-[11px] font-mono text-zinc-500">
                  {isFlipped ? 'VERSO (RESPOSTA)' : 'FRENTE (PERGUNTA)'} • Toque para virar
                </span>
              </div>

              {/* Centro do Card */}
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                {!isFlipped ? (
                  <h2 className="text-lg sm:text-2xl font-bold text-white max-w-xl leading-relaxed">
                    {currentCard.pergunta}
                  </h2>
                ) : (
                  <div className="space-y-4 max-w-xl text-left w-full">
                    <p className="text-sm sm:text-base text-zinc-100 whitespace-pre-line leading-relaxed font-sans">
                      {currentCard.resposta}
                    </p>

                    {currentCard.codigoExemplo && (
                      <div className="p-3 rounded-xl bg-[#03060a] border border-white/[0.08] font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto">
                        <pre>{currentCard.codigoExemplo}</pre>
                      </div>
                    )}

                    {currentCard.dica && (
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs flex items-start gap-2">
                        <Zap size={14} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{currentCard.dica}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Rodapé do Card */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  {isCurrentKnown && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Marcado como Dominado
                    </span>
                  )}
                  {isCurrentUnknown && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                      Marcado para Revisar
                    </span>
                  )}
                </div>

                <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                  Espaço: vira • Setas: navega
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-3">
            <Sparkles size={32} className="mx-auto text-blue-400" />
            <p className="text-sm text-zinc-300">
              Nenhum flashcard encontrado com os filtros selecionados.
            </p>
            <button
              onClick={handleResetProgress}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Resetar Filtros
            </button>
          </div>
        )}

        {/* Botões de Ação Inferiores: Não Sei vs Sei + Navegação */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Card anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={markUnknown}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 active:scale-95 border border-rose-800/60 text-xs sm:text-sm font-semibold text-rose-300 transition-all cursor-pointer touch-manipulation shadow-lg shadow-rose-950/20"
            >
              <XCircle size={16} />
              <span>Preciso Revisar</span>
            </button>

            <button
              onClick={markKnown}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 active:scale-95 border border-emerald-800/60 text-xs sm:text-sm font-semibold text-emerald-300 transition-all cursor-pointer touch-manipulation shadow-lg shadow-emerald-950/20"
            >
              <CheckCircle2 size={16} />
              <span>Já Sei!</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Próximo card"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};
