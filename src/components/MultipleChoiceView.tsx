import React, { useState } from 'react';
import { BANCO_QUESTOES, type SimuladoQuestion } from '../data/simuladoData';
import {
  CheckCircle2,
  XCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

export const MultipleChoiceView: React.FC = () => {
  const [questions, setQuestions] = useState<SimuladoQuestion[]>(BANCO_QUESTOES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState({ hits: 0, misses: 0 });

  const currentQ = questions[currentIndex];

  const handleSelect = (altId: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (selectedAnswer !== null) return; // Não troca após responder
    setSelectedAnswer(altId);
    setShowExplanation(true);

    if (altId === currentQ.correta) {
      setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
    } else {
      setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const handleShuffle = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
  };

  const totalAnswered = stats.hits + stats.misses;
  const accuracy = totalAnswered > 0 ? Math.round((stats.hits / totalAnswered) * 100) : 0;

  if (!currentQ) return null;

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full space-y-4 animate-in fade-in duration-150">
      {/* Barra de Progresso e Estatísticas */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/80">
            Questão {currentIndex + 1} de {questions.length}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            {currentQ.origem}
          </span>
          <span className="text-slate-400 hidden sm:inline">• {currentQ.categoria}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Sortear ordem das perguntas"
          >
            <Shuffle size={13} />
            <span className="hidden xs:inline">Sortear</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-emerald-400 font-semibold">Acertos: {stats.hits}</span>
            <span className="text-rose-400 font-semibold">Erros: {stats.misses}</span>
            {totalAnswered > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-blue-950/90 text-blue-300 border border-blue-800/50">
                {accuracy}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card da Questão */}
      <div className="p-5 sm:p-6 bg-slate-950/90 border border-slate-800 rounded-3xl shadow-xl space-y-5">
        {/* Cabeçalho do Enunciado */}
        <div>
          {currentQ.contexto && (
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {currentQ.contexto}
            </span>
          )}
          <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed whitespace-pre-line">
            {currentQ.enunciado}
          </h3>
        </div>

        {/* Lista de Alternativas (A, B, C, D, E) */}
        <div className="space-y-2.5">
          {currentQ.alternativas.map((alt) => {
            const isSelected = selectedAnswer === alt.id;
            const isCorrect = alt.id === currentQ.correta;

            let btnStyle =
              'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

            if (selectedAnswer !== null) {
              if (isCorrect) {
                btnStyle =
                  'bg-emerald-950/70 border-emerald-500/80 text-emerald-100 shadow-md shadow-emerald-950';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-400';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/70 border-rose-500/80 text-rose-100 shadow-md shadow-rose-950';
                badgeStyle = 'bg-rose-600 text-white border-rose-400';
              } else {
                btnStyle = 'opacity-50 bg-slate-950 border-slate-850 text-slate-400';
              }
            }

            return (
              <button
                key={alt.id}
                onClick={() => handleSelect(alt.id)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border mt-0.5 ${badgeStyle}`}
                >
                  {selectedAnswer !== null ? (
                    isCorrect ? (
                      <CheckCircle2 size={16} />
                    ) : isSelected ? (
                      <XCircle size={16} />
                    ) : (
                      alt.id
                    )
                  ) : (
                    alt.id
                  )}
                </div>

                <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                  {alt.texto}
                  {selectedAnswer !== null && (isSelected || isCorrect) && (
                    <div
                      className={`mt-2 p-2.5 rounded-xl text-xs font-normal border ${
                        isCorrect
                          ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-200'
                          : 'bg-rose-950/50 border-rose-700/50 text-rose-200'
                      }`}
                    >
                      <strong>{isCorrect ? '✅ Justificativa Correta: ' : '❌ Pegadinha: '}</strong>
                      {alt.explicacao}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explicação Geral (Revelada após responder) */}
        {showExplanation && (
          <div className="p-4 bg-blue-950/40 border border-blue-700/40 rounded-2xl space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
              <Info size={15} />
              <span>Explicação Pedagógica Geral:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.explicacaoGeral}
            </p>
          </div>
        )}
      </div>

      {/* Navegação Inferior */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        {selectedAnswer !== null && (
          <span className="text-xs font-semibold text-slate-400">
            {selectedAnswer === currentQ.correta ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={15} /> Resposta Correta!
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <XCircle size={15} /> Resposta Incorreta (Gabarito: {currentQ.correta})
              </span>
            )}
          </span>
        )}

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
        >
          <span>{currentIndex === questions.length - 1 ? 'Recomeçar' : 'Próxima Questão'}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
