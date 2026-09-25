import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Play,
  ListChecks,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ModuleHeader } from './ModuleHeader';
import {
  PROG_C_SIMULADO_QUESTIONS,
  type CSimuladoQuestion,
} from '../data/progCSimuladoData';
import { highlightCCode } from '../utils/cHighlighter';

interface ProgCSimuladoViewProps {
  onBack: () => void;
  onOpenBottomBarSettings?: () => void;
  onOpenLab?: (questionId: 9 | 10) => void;
}

export const ProgCSimuladoView: React.FC<ProgCSimuladoViewProps> = ({
  onBack,
  onOpenBottomBarSettings,
  onOpenLab,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, 'a' | 'b' | 'c' | 'd'>
  >({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>(
    {}
  );
  const [revealedDiscursive, setRevealedDiscursive] = useState<
    Record<number, boolean>
  >({});
  const [isFinished, setIsFinished] = useState(false);
  const [studyMode, setStudyMode] = useState(true); // Feedback imediato

  const questions = PROG_C_SIMULADO_QUESTIONS;
  const totalQuestions = questions.length;
  const currentQuestion: CSimuladoQuestion = questions[currentIndex];

  const handleSelectOption = (optId: 'a' | 'b' | 'c' | 'd') => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Cálculo da pontuação nas 8 questões objetivas + discursivas marcadas como estudadas
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (!q.isDiscursive) {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct += 1;
        }
      } else {
        // Discursivas pontuam se o aluno redigiu algo ou revelou e estudou o gabarito
        if (
          revealedDiscursive[q.id] ||
          (writtenAnswers[q.id] && writtenAnswers[q.id].trim().length > 20)
        ) {
          correct += 1;
        }
      }
    });
    return correct;
  };

  const handleFinish = () => {
    setIsFinished(true);
    const score = calculateScore();
    if (score >= 7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setWrittenAnswers({});
    setRevealedDiscursive({});
    setIsFinished(false);
    setCurrentIndex(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/85 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10"
    >
      <ModuleHeader
        title="Simulado Oficial • Programação em C"
        subtitle="10 Questões da Prova • Objetivas e Discursivas com Correção Detalhada"
        badge="B1 • PROGRAMAÇÃO EM C"
        badgeColor="bg-sky-950/80 border-sky-800 text-sky-300"
        icon={Award}
        onBack={onBack}
        onOpenBottomBarSettings={onOpenBottomBarSettings}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col gap-4">
        {/* Barra Superior de Controle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {questions.map((q, idx) => {
              const isAnswered = !q.isDiscursive
                ? !!selectedAnswers[q.id]
                : !!revealedDiscursive[q.id] ||
                  !!(writtenAnswers[q.id] && writtenAnswers[q.id].length > 10);
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400'
                      : isAnswered
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {q.questionNumber}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setStudyMode((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                studyMode
                  ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                  : 'bg-white/[0.04] text-zinc-400 border-white/[0.08]'
              }`}
            >
              {studyMode ? '⚡ Modo Estudo (Gabarito Ativo)' : '📝 Modo Prova'}
            </button>
          </div>
        </div>

        {/* Tela do Simulado Concluído */}
        {isFinished ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center space-y-6 animate-fade-in">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
              <Award size={48} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Simulado Finalizado!
              </h2>
              <p className="text-sm text-zinc-400">
                Confira o seu aproveitamento geral no Simulado de Programação em C:
              </p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] min-w-[120px]">
                <div className="text-3xl font-bold font-mono text-blue-400">
                  {score}/{totalQuestions}
                </div>
                <div className="text-xs text-zinc-400">Questões Acertadas</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] min-w-[120px]">
                <div
                  className={`text-3xl font-bold font-mono ${
                    percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {percentage}%
                </div>
                <div className="text-xs text-zinc-400">Aproveitamento</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
              {percentage >= 80 ? (
                <span className="text-emerald-300 font-semibold">
                  Excelente resultado! Você está preparadíssimo para fechar a prova com nota 10.
                </span>
              ) : percentage >= 60 ? (
                <span className="text-amber-300 font-semibold">
                  Bom desempenho! Revise os pontos onde teve dúvida nos flashcards e treine as questões discursivas no laboratório.
                </span>
              ) : (
                <span className="text-rose-300 font-semibold">
                  Recomendamos ler o Resumo Teórico com calma e praticar os códigos no Laboratório antes da prova!
                </span>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 font-semibold text-white text-sm transition-all cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <RotateCcw size={16} />
                <span>Refazer Simulado</span>
              </button>
            </div>
          </div>
        ) : (
          /* Card da Questão Atual */
          <div className="p-5 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-5 shadow-xl">
            {/* Header da Questão */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Questão {currentQuestion.questionNumber} de {totalQuestions}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {currentQuestion.category}
                </span>
              </div>

              {currentQuestion.isDiscursive && (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Discursiva de Código
                </span>
              )}
            </div>

            {/* Título e Enunciado */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {currentQuestion.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans whitespace-pre-line">
                {currentQuestion.enunciado}
              </p>
            </div>

            {/* Trecho de Código opcional no enunciado com Cores Coddy */}
            {currentQuestion.codeSnippet && (
              <div className="p-3.5 rounded-xl bg-[#03060a] border border-white/[0.08] font-mono text-xs sm:text-sm overflow-x-auto">
                <pre
                  dangerouslySetInnerHTML={{
                    __html: highlightCCode(currentQuestion.codeSnippet),
                  }}
                />
              </div>
            )}

            {/* 1. Modo Questão Objetiva (Q1 a Q8) */}
            {!currentQuestion.isDiscursive && currentQuestion.options && (
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                  const isCorrect = option.id === currentQuestion.correctAnswer;
                  const showFeedback = studyMode && selectedAnswers[currentQuestion.id];

                  let optionStyle =
                    'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] text-zinc-200';

                  if (showFeedback) {
                    if (isCorrect) {
                      optionStyle =
                        'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold shadow-sm';
                    } else if (isSelected) {
                      optionStyle =
                        'bg-rose-950/40 border-rose-500/60 text-rose-200 font-semibold';
                    } else {
                      optionStyle = 'bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'bg-blue-900/30 border-blue-500 text-white font-semibold shadow-md';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer touch-manipulation ${optionStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 uppercase ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/[0.05] text-zinc-400'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="text-xs sm:text-sm font-mono leading-relaxed pt-0.5">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Modo Questão Discursiva (Q9 e Q10) */}
            {currentQuestion.isDiscursive && (
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono">Área de Rascunho / Resposta do Aluno:</span>
                    <span className="text-[11px] text-zinc-500">
                      Você pode digitar seu código ou ir direto para o Laboratório
                    </span>
                  </div>

                  <textarea
                    value={writtenAnswers[currentQuestion.id] || ''}
                    onChange={(e) =>
                      setWrittenAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: e.target.value,
                      }))
                    }
                    placeholder={`Escreva aqui o código em C para a Questão ${currentQuestion.questionNumber}...`}
                    rows={6}
                    className="w-full p-3.5 rounded-xl bg-[#03060a] border border-white/[0.08] text-emerald-400 font-mono text-xs sm:text-sm outline-none resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() =>
                      setRevealedDiscursive((prev) => ({
                        ...prev,
                        [currentQuestion.id]: !prev[currentQuestion.id],
                      }))
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-zinc-200 transition-all cursor-pointer"
                  >
                    <ListChecks size={14} className="text-amber-400" />
                    <span>
                      {revealedDiscursive[currentQuestion.id]
                        ? 'Ocultar Gabarito Comentado'
                        : 'Ver Gabarito da Prova & Critérios'}
                    </span>
                  </button>

                  {onOpenLab && (
                    <button
                      onClick={() =>
                        onOpenLab(currentQuestion.questionNumber as 9 | 10)
                      }
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <Play size={13} fill="currentColor" />
                      <span>Abrir no Laboratório C Interativo</span>
                    </button>
                  )}
                </div>

                {/* Gabarito e Critérios Revelados para Q9 e Q10 */}
                {revealedDiscursive[currentQuestion.id] && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 animate-fade-in">
                    <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles size={14} />
                      <span>Gabarito Oficial da Prova:</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#03060a] border border-white/[0.08] font-mono text-xs sm:text-sm overflow-x-auto">
                      <pre
                        dangerouslySetInnerHTML={{
                          __html: highlightCCode(
                            currentQuestion.expectedCode || ''
                          ),
                        }}
                      />
                    </div>

                    {currentQuestion.checkCriteria && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-semibold text-zinc-300">
                          Critérios Avaliados pelo Professor:
                        </div>
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {currentQuestion.checkCriteria.map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Feedback no Modo Estudo para Objetivas */}
            {!currentQuestion.isDiscursive &&
              studyMode &&
              selectedAnswers[currentQuestion.id] && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    {selectedAnswers[currentQuestion.id] ===
                    currentQuestion.correctAnswer ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <CheckCircle2 size={16} />
                        <span>Resposta Correta!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                        <XCircle size={16} />
                        <span>
                          Resposta Incorreta (Gabarito: {currentQuestion.correctAnswer?.toUpperCase()})
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>

                  <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs flex items-center gap-2">
                    <Zap size={14} className="shrink-0 text-amber-400" />
                    <span>{currentQuestion.decorebaRapida}</span>
                  </div>
                </div>
              )}

            {/* Barra de Navegação Inferior */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={handleFinish}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-white text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Award size={14} />
                    <span>Finalizar Simulado</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Próxima</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
