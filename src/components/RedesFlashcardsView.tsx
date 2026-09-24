import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Filter,
  HelpCircle,
  Network,
  Award,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import {
  REDES_FLASHCARDS_DATA,
  type RedesFlashcard,
} from '../data/redesFlashcardsData';

interface RedesFlashcardsViewProps {
  onBack: () => void;
}

export const RedesFlashcardsView: React.FC<RedesFlashcardsViewProps> = ({
  onBack,
}) => {
  const [deck, setDeck] = useState<RedesFlashcard[]>(REDES_FLASHCARDS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<number[]>([]);
  const [unknownCardIds, setUnknownCardIds] = useState<number[]>([]);
  const [onlyUnknownMode, setOnlyUnknownMode] = useState(false);

  // Lista única de categorias para as abas de variedade
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(REDES_FLASHCARDS_DATA.map((c) => c.categoria))
    );
    return ['Todas', ...cats];
  }, []);

  // Filtragem composta: Categoria + Modo "Apenas Preciso Revisar"
  const activeDeck = useMemo(() => {
    return deck.filter((c) => {
      const matchCat =
        selectedCategory === 'Todas' || c.categoria === selectedCategory;
      const matchUnknown = !onlyUnknownMode || unknownCardIds.includes(c.id);
      return matchCat && matchUnknown;
    });
  }, [deck, selectedCategory, onlyUnknownMode, unknownCardIds]);

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

  const handleResetProgress = () => {
    setKnownCardIds([]);
    setUnknownCardIds([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setDeck(REDES_FLASHCARDS_DATA);
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

  // Suporte a teclado: Espaço vira a carta, Setas navegam
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
  }, [currentIndex, totalCards]);

  const isCurrentKnown = currentCard ? knownCardIds.includes(currentCard.id) : false;
  const isCurrentUnknown = currentCard ? unknownCardIds.includes(currentCard.id) : false;

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen overflow-y-auto bg-[#080b11]/80 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-600/30 relative z-10"
    >
      <ModuleHeader
        title="Flashcards de Fixação • Redes & Sistemas Distribuídos"
        subtitle="Prof. Fábio • Modelo OSI, TCP/IP, Dispositivos, IPv4 e Pegadinhas da Prova"
        badge={`${totalCards} Cartas`}
        icon={Network}
        badgeColor="bg-cyan-950/80 border-cyan-800 text-cyan-300"
        onBack={onBack}
      />

      <main
        data-page-bg="true"
        className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 pb-safe flex flex-col items-center justify-between"
      >
        {/* Barra Superior de Categorias & Filtros */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer touch-manipulation ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setOnlyUnknownMode((prev) => !prev);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`text-xs px-2.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer touch-manipulation ${
                  onlyUnknownMode
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300 font-semibold'
                    : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
                }`}
                title="Filtrar apenas as cartas que você marcou que precisa revisar"
              >
                <Filter size={12} />
                <span>Revisar ({unknownCardIds.length})</span>
              </button>

              <button
                onClick={handleShuffle}
                className="p-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-cyan-300 border border-white/[0.06] transition-all cursor-pointer touch-manipulation"
                title="Embaralhar cartas"
              >
                <Shuffle size={14} />
              </button>

              <button
                onClick={handleResetProgress}
                className="p-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-rose-400 border border-white/[0.06] transition-all cursor-pointer touch-manipulation"
                title="Resetar progresso de estudo"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Barra de Progresso com estatísticas */}
          <div className="w-full flex items-center justify-between text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <Network size={14} className="text-cyan-400" />
              Carta <strong className="text-white">{currentIndex + 1}</strong> de{' '}
              <strong className="text-white">{totalCards}</strong>
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 size={13} /> {knownCardIds.length} Sei
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <XCircle size={13} /> {unknownCardIds.length} Revisar
              </span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{
                width: `${totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Card Interativo com Efeito 3D Flip */}
        <div className="w-full my-auto py-4 flex flex-col items-center perspective-1000">
          {totalCards === 0 ? (
            <div className="w-full max-w-xl p-8 rounded-3xl bg-slate-900/90 border border-white/10 text-center">
              <Award size={40} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                Tudo revisado nesta categoria!
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Você não possui cartas pendentes de revisão com este filtro.
              </p>
              <button
                onClick={() => setOnlyUnknownMode(false)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs transition-all cursor-pointer"
              >
                Voltar a ver todas as cartas
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className={`w-full max-w-2xl min-h-[300px] sm:min-h-[340px] rounded-3xl cursor-pointer transition-transform duration-500 transform-style-3d relative select-none group shadow-2xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRENTE DA CARTA (Pergunta) */}
              <div className="absolute inset-0 w-full h-full bg-[#0b101b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-xl shadow-cyan-950/20 group-hover:border-cyan-400/60 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                      {currentCard?.categoria}
                    </span>
                    {currentCard?.camadaOuReferencia && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-300 hidden sm:inline">
                        {currentCard.camadaOuReferencia}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    #{currentCard?.id}
                  </span>
                </div>

                <div className="my-auto py-4">
                  <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed text-center">
                    {currentCard?.pergunta}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-white/[0.08]">
                  <span className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
                    <Sparkles size={12} className="text-cyan-400" /> Toque ou
                    [Espaço] para virar
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCurrentKnown && (
                      <span className="text-[11px] text-emerald-400 font-medium">
                        ✓ Dominado
                      </span>
                    )}
                    {isCurrentUnknown && (
                      <span className="text-[11px] text-rose-400 font-medium">
                        ✗ A revisar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* VERSO DA CARTA (Resposta & Dica do Fábio) */}
              <div className="absolute inset-0 w-full h-full bg-[#081224] border border-cyan-400/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xl shadow-cyan-900/30 overflow-y-auto">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400" /> Resposta
                    Oficial
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.05] px-2 py-0.5 rounded">
                    Redes • Prof. Fábio
                  </span>
                </div>

                <div className="my-auto py-3">
                  <p className="text-sm sm:text-base text-zinc-200 whitespace-pre-line leading-relaxed">
                    {currentCard?.resposta}
                  </p>

                  {currentCard?.dicaFabio && (
                    <div className="mt-4 p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200">
                      <HelpCircle
                        size={16}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <strong className="text-amber-300 block mb-0.5">
                          Dica do Prof. Fábio:
                        </strong>
                        <p className="text-amber-100/90 leading-normal">
                          {currentCard.dicaFabio}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/[0.08]">
                  <span className="text-[11px] text-zinc-500">
                    Toque para voltar à pergunta
                  </span>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    {currentCard?.categoria}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controles de Navegação e Avaliação Ativa */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Navegação Prev / Next */}
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <button
              onClick={handlePrev}
              disabled={totalCards <= 1}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] text-xs font-semibold text-zinc-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              disabled={totalCards <= 1}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] text-xs font-semibold text-zinc-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation disabled:opacity-40"
            >
              <span>Próxima</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Botões de Decisão Ativa (Acertei vs Preciso Revisar) */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto justify-center">
            <button
              onClick={markUnknown}
              disabled={!currentCard}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/90 active:scale-95 border border-rose-600/60 text-xs font-bold text-rose-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation shadow-lg shadow-rose-950/30"
              title="Marcar como 'Preciso Revisar' para estudar novamente"
            >
              <XCircle size={16} className="text-rose-400" />
              <span>Preciso Revisar</span>
            </button>

            <button
              onClick={markKnown}
              disabled={!currentCard}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 active:scale-95 border border-emerald-600/60 text-xs font-bold text-emerald-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation shadow-lg shadow-emerald-950/30"
              title="Marcar como dominada"
            >
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Já Dominei</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
