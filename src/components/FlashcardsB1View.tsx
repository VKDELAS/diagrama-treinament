import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Filter,
  Layers,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import { FLASHCARDS_B1_DATA, type Flashcard } from '../data/flashcardsB1Data';

interface FlashcardsB1ViewProps {
  onBack: () => void;
}

export const FlashcardsB1View: React.FC<FlashcardsB1ViewProps> = ({ onBack }) => {
  const [deck, setDeck] = useState<Flashcard[]>(FLASHCARDS_B1_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<number[]>([]);
  const [unknownCardIds, setUnknownCardIds] = useState<number[]>([]);
  const [onlyUnknownMode, setOnlyUnknownMode] = useState(false);

  // Lista única de categorias para as abas de variedade
  const categories = useMemo(() => {
    const cats = Array.from(new Set(FLASHCARDS_B1_DATA.map((c) => c.categoria)));
    return ['Todas', ...cats];
  }, []);

  // Filtragem composta: Categoria + Modo "Apenas Não Sei"
  const activeDeck = useMemo(() => {
    return deck.filter((c) => {
      const matchCat =
        selectedCategory === 'Todas' || c.categoria === selectedCategory;
      const matchUnknown =
        !onlyUnknownMode || unknownCardIds.includes(c.id);
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
      setCurrentIndex(Math.max(0, totalCards - 1));
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

  const handleCategoryChange = (cat: string) => {
    setIsFlipped(false);
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  const handleResetProgress = () => {
    setKnownCardIds([]);
    setUnknownCardIds([]);
    setOnlyUnknownMode(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#080b11] text-slate-100 font-sans antialiased selection:bg-indigo-600/30">
      {/* Cabeçalho do Módulo */}
      <ModuleHeader
        title="Flashcards de Banco de Dados"
        subtitle="43 cartas divididas por variedades de conteúdo e pegadinhas de prova"
        badge="B1 • 43 CARTAS"
        icon={Sparkles}
        badgeColor="bg-indigo-900/60 border-indigo-700/60 text-indigo-300"
        onBack={onBack}
      />

      {/* Barra de Seleção de Variedades / Categorias (Scroll Horizontal no Celular) */}
      <div className="bg-slate-950/70 border-b border-white/[0.06] px-3 sm:px-8 py-2 shrink-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-manipulation">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 mr-1 shrink-0">
          <Layers size={13} className="text-indigo-400" />
          <span className="hidden sm:inline">Variedades:</span>
        </div>
        {categories.map((cat) => {
          const count =
            cat === 'Todas'
              ? FLASHCARDS_B1_DATA.length
              : FLASHCARDS_B1_DATA.filter((c) => c.categoria === cat).length;
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer touch-manipulation active:scale-95 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Barra de Controles e Placar - Mobile Friendly */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-3 sm:px-8 py-2.5 sm:py-3 shrink-0 backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5">
        {/* Contadores */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300">
            <CheckCircle2 size={14} />
            <span>Sei: {knownCardIds.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300">
            <XCircle size={14} />
            <span>Não sei: {unknownCardIds.length}</span>
          </div>

          <span className="text-slate-400 font-mono hidden md:inline text-xs">
            {knownCardIds.length + unknownCardIds.length}/{deck.length} cartas avaliadas
          </span>
        </div>

        {/* Botões de Ação com Toque Otimizado */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleOnlyUnknown}
            disabled={unknownCardIds.length === 0 && !onlyUnknownMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border touch-manipulation active:scale-95 ${
              onlyUnknownMode
                ? 'bg-rose-950 border-rose-700 text-rose-300 shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 disabled:opacity-40 disabled:pointer-events-none'
            }`}
            title="Estudar somente as cartas marcadas como Não Sei"
          >
            <Filter size={13} />
            <span>{onlyUnknownMode ? 'Ver Todas' : 'Só "Não sei"'}</span>
          </button>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer touch-manipulation"
            title="Embaralhar as cartas"
          >
            <Shuffle size={13} />
            <span className="hidden sm:inline">Embaralhar</span>
          </button>

          <button
            onClick={handleResetProgress}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-400 hover:text-white border border-slate-700 transition-all cursor-pointer touch-manipulation"
            title="Zerar progresso"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Área Central com o Flashcard 3D */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center">
        {totalCards > 0 && currentCard ? (
          <div className="w-full max-w-xl flex flex-col items-center">
            {/* Indicador de Posição da Carta */}
            <div className="flex items-center justify-between w-full mb-3 px-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 font-bold text-[11px]">
                {currentCard.categoria}
              </span>
              <span className="text-[11px] font-medium text-zinc-400">
                Carta {currentIndex + 1} de {totalCards}
              </span>
            </div>

            {/* Container da Carta com Flip 3D Fluido */}
            <div className="w-full perspective-1000 min-h-[300px] sm:min-h-[340px]">
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`relative w-full h-full min-h-[300px] sm:min-h-[340px] transform-style-3d transition-transform duration-500 cursor-pointer select-none rounded-3xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Lado FRENTE */}
                <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                      FRENTE (CONCEITO / PERGUNTA)
                    </span>
                    <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                      Toque para virar ↺
                    </span>
                  </div>

                  <div className="my-auto py-4">
                    <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed text-center">
                      {currentCard.frente}
                    </h3>
                  </div>

                  <div className="text-center text-[11px] text-slate-500 font-medium">
                    Toque no card para revelar a resposta oficial
                  </div>
                </div>

                {/* Lado VERSO */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 border-2 border-indigo-600/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 flex flex-col justify-between overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                      VERSO (RESPOSTA & MOTIVO)
                    </span>
                    <span className="text-xs text-indigo-300 font-medium flex items-center gap-1">
                      Toque para voltar ↺
                    </span>
                  </div>

                  <div className="my-auto py-3 space-y-3">
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 text-center">
                      <p className="text-sm sm:text-base font-extrabold text-indigo-200 leading-snug">
                        {currentCard.verso}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                      <strong className="text-amber-400">Por quê?</strong>{' '}
                      {currentCard.motivo}
                    </div>
                  </div>

                  <div className="text-center text-[11px] text-slate-500 font-medium">
                    Avalie abaixo se você dominou esta carta
                  </div>
                </div>
              </div>
            </div>

            {/* Controles Inferiores Grandes para Celular */}
            <div className="w-full mt-5 flex items-center justify-between gap-2.5">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer touch-manipulation"
                aria-label="Carta anterior"
              >
                <ChevronLeft size={16} />
                <span className="hidden xs:inline">Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkUnknown(currentCard.id)}
                  className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-700/80 active:scale-95 text-rose-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md touch-manipulation"
                >
                  <XCircle size={16} />
                  <span>Não sei</span>
                </button>

                <button
                  onClick={() => handleMarkKnown(currentCard.id)}
                  className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 active:scale-95 text-emerald-200 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md touch-manipulation"
                >
                  <CheckCircle2 size={16} />
                  <span>Sei!</span>
                </button>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-indigo-600/30 touch-manipulation"
                aria-label="Próxima carta"
              >
                <span className="hidden xs:inline">Próxima</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-md animate-scale-up">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              Todas as cartas desta variedade foram dominadas!
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Você não possui nenhuma carta pendente no filtro selecionado.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={() => setOnlyUnknownMode(false)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs transition-all cursor-pointer touch-manipulation"
              >
                Rever cartas desta variedade
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setOnlyUnknownMode(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold text-xs transition-all cursor-pointer touch-manipulation"
              >
                Ver todas as 43 cartas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
