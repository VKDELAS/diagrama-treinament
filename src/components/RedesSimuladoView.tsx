import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import {
  REDES_SIMULADO_QUESTIONS,
  type RedesSimuladoQuestion,
} from '../data/redesSimuladoData';

interface RedesSimuladoViewProps {
  onBack: () => void;
  onOpenBottomBarSettings?: () => void;
}

export const RedesSimuladoView: React.FC<RedesSimuladoViewProps> = ({
  onBack,
  onOpenBottomBarSettings,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, 'a' | 'b' | 'c' | 'd'>
  >({});
  const [isFinished, setIsFinished] = useState(false);
  const [studyMode, setStudyMode] = useState(true); // Feedback imediato ativado por padrão

  const totalQuestions = REDES_SIMULADO_QUESTIONS.length;
  const currentQuestion: RedesSimuladoQuestion =
    REDES_SIMULADO_QUESTIONS[currentIndex];

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

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsFinished(false);
    setCurrentIndex(0);
  };

  // Cálculo da Pontuação
  const calculateScore = () => {
    let correct = 0;
    REDES_SIMULADO_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;
  const currentAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = currentAnswer === currentQuestion.correctAnswer;

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/80 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-600/30 relative z-10"
    >
      <ModuleHeader
        title="Simulado Oficial • Redes & Sistemas Distribuídos"
        subtitle="10 Questões Originais • Gabarito Comentado e Análise de Pegadinhas do Prof. Fábio"
        badge={isFinished ? `Nota Final: ${score}/10` : `${answeredCount}/${totalQuestions} Respondidas`}
        icon={Award}
        badgeColor="bg-cyan-950/80 border-cyan-800 text-cyan-300"
        onBack={onBack}
        onOpenBottomBarSettings={onOpenBottomBarSettings}
      />

      <main
        data-page-bg="true"
        className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 pb-safe flex flex-col justify-between"
      >
        {/* TELA DE RESULTADOS FINAIS */}
        {isFinished ? (
          <div className="w-full max-w-3xl mx-auto my-auto py-6 animate-scale-up">
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0e172a] to-[#090e1a] border border-cyan-500/30 text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Award size={36} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Simulado Concluído!
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Prova de Redes de Computadores e Sistemas Distribuídos • Prof. Fábio
              </p>

              <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-left">
                  <span className="text-xs text-zinc-400 block">Sua Pontuação:</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400">
                    {score}{' '}
                    <span className="text-lg font-medium text-zinc-500">/ 10</span>
                  </span>
                </div>
                <div className="h-10 w-px bg-white/10 mx-2" />
                <div className="text-left text-xs space-y-1">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} /> {score} Acertos
                  </div>
                  <div className="text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle size={13} /> {totalQuestions - score} Erros
                  </div>
                </div>
              </div>

              {/* Mensagem motivacional personalizada */}
              <div className="mt-6 max-w-xl mx-auto text-xs sm:text-sm text-zinc-300 bg-cyan-950/40 border border-cyan-800/50 rounded-2xl p-4">
                {score === 10 ? (
                  <p className="text-cyan-300 font-medium">
                    🏆 <strong>Perfeito! 10/10!</strong> Você dominou o modelo OSI, TCP/IP, dispositivos, cálculo de máscaras e não caiu em nenhuma pegadinha do Fábio!
                  </p>
                ) : score >= 7 ? (
                  <p className="text-emerald-300 font-medium">
                    👏 <strong>Excelente desempenho!</strong> Você está aprovado com folga. Revise apenas os pequenos detalhes das pegadinhas de IP privado e portas.
                  </p>
                ) : (
                  <p className="text-amber-300 font-medium">
                    💡 <strong>Bom treino!</strong> Atente-se à "Cola Rápida": memorize a regra da máscara (255 copia, 0 zera) e as faixas de IP privado (172.16 a 31 e 192.168).
                  </p>
                )}
              </div>

              {/* Lista Rápida do Gabarito das 10 Questões */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] text-left">
                <h3 className="text-sm font-bold text-white mb-3">
                  Revisão Rápida de Respostas:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {REDES_SIMULADO_QUESTIONS.map((q) => {
                    const userAns = selectedAnswers[q.id];
                    const isQCorrect = userAns === q.correctAnswer;
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setIsFinished(false);
                          setCurrentIndex(q.questionNumber - 1);
                        }}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isQCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/40'
                            : 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/40'
                        }`}
                      >
                        <span className="font-bold">Q{q.questionNumber}</span>
                        <span className="font-mono uppercase font-semibold">
                          {userAns ? `${userAns} ` : '- '}
                          <span className="text-[10px] text-zinc-400">
                            (Gab: {q.correctAnswer})
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botões de Ação Final */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-600/30"
                >
                  <RotateCcw size={15} />
                  <span>Refazer Simulado</span>
                </button>

                <button
                  onClick={() => setIsFinished(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-white font-semibold text-xs transition-all border border-white/[0.08] cursor-pointer"
                >
                  Ver Questões Detalhadas
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TELA DA QUESTÃO ATIVA */
          <>
            {/* Barra de Navegação Direta de 1 a 10 */}
            <div className="w-full flex items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {REDES_SIMULADO_QUESTIONS.map((q, idx) => {
                  const hasAnswer = selectedAnswers[q.id] !== undefined;
                  const isCur = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all duration-150 cursor-pointer touch-manipulation flex items-center justify-center shrink-0 ${
                        isCur
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                          : hasAnswer
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                          : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                      }`}
                    >
                      {q.questionNumber}
                    </button>
                  );
                })}
              </div>

              {/* Botão de Alternar Modo Estudo (Feedback Imediato) */}
              <button
                onClick={() => setStudyMode((prev) => !prev)}
                className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all shrink-0 cursor-pointer touch-manipulation ${
                  studyMode
                    ? 'bg-cyan-950/70 border-cyan-700 text-cyan-300 font-semibold'
                    : 'bg-white/[0.03] border-white/[0.06] text-zinc-400'
                }`}
                title="Ativar/Desativar explicações automáticas imediatas ao clicar em uma resposta"
              >
                <Sparkles size={13} className="text-cyan-400" />
                <span className="hidden xs:inline">Feedback:</span>
                <span>{studyMode ? 'Imediato' : 'No Fim'}</span>
              </button>
            </div>

            {/* Conteúdo da Questão Atual */}
            <div className="my-auto py-4 animate-fade-in">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-800 text-cyan-300">
                  Questão {currentQuestion.questionNumber} de {totalQuestions}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {currentQuestion.title}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed mt-2 mb-5">
                {currentQuestion.enunciado}
              </h2>

              {/* Alternativas A, B, C, D */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.id;
                  const isTheCorrectOne = opt.id === currentQuestion.correctAnswer;
                  const showResultState = studyMode && isAnswered;

                  let cardStyle =
                    'bg-[#0b101b] border-white/[0.08] hover:border-cyan-500/40 text-zinc-200';
                  let letterBadge =
                    'bg-white/[0.05] border-white/10 text-zinc-400';

                  if (showResultState) {
                    if (isTheCorrectOne) {
                      cardStyle =
                        'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-950/30';
                      letterBadge =
                        'bg-emerald-600 text-slate-950 font-bold border-transparent';
                    } else if (isSelected && !isTheCorrectOne) {
                      cardStyle =
                        'bg-rose-950/40 border-rose-500/80 text-rose-200 shadow-md shadow-rose-950/30';
                      letterBadge =
                        'bg-rose-600 text-white font-bold border-transparent';
                    }
                  } else if (isSelected) {
                    cardStyle =
                      'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/30';
                    letterBadge =
                      'bg-cyan-500 text-slate-950 font-bold border-transparent';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer touch-manipulation flex items-start gap-3.5 select-none ${cardStyle}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center uppercase font-mono text-xs shrink-0 transition-transform group-hover:scale-105 ${letterBadge}`}
                      >
                        {opt.id}
                      </div>
                      <p className="text-xs sm:text-sm pt-0.5 leading-relaxed">
                        {opt.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Explicação e Dica do Fábio (Exibida no Modo Estudo após responder) */}
              {studyMode && isAnswered && (
                <div className="mt-5 p-4 rounded-2xl bg-[#09101f] border border-cyan-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-700/60">
                        <CheckCircle2 size={14} /> Resposta Correta! (Gabarito: {currentQuestion.correctAnswer.toUpperCase()})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-700/60">
                        <XCircle size={14} /> Incorreta. O gabarito oficial é a letra {currentQuestion.correctAnswer.toUpperCase()}.
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {currentQuestion.explanation}
                  </p>

                  {/* Alerta de Pegadinha do Fábio */}
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                    <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block mb-0.5">
                        Pegadinha do Prof. Fábio:
                      </strong>
                      <p className="text-amber-100/90 leading-relaxed">
                        {currentQuestion.pegadinhaFabio}
                      </p>
                    </div>
                  </div>

                  {/* Macete Rápido */}
                  <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-medium">
                    <Lightbulb size={13} className="text-cyan-400" />
                    <span>{currentQuestion.macete}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Barra Inferior com Controles Prev / Next / Finalizar */}
            <div className="w-full flex items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] text-xs font-semibold text-zinc-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-600/30"
                  >
                    <span>Próxima</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 active:scale-95 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/30"
                  >
                    <Award size={16} />
                    <span>Finalizar Prova</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
