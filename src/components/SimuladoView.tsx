import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import { SIMULADO_QUESTIONS } from '../data/simuladoB1Data';
import {
  DiagramaQ5Svg,
  DiagramaQ6Svg,
  DiagramaQ7Svg,
} from './SimuladoSvgDiagrams';

interface SimuladoViewProps {
  onBack: () => void;
}

export const SimuladoView: React.FC<SimuladoViewProps> = ({ onBack }) => {
  // Estado do simulado
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'a' | 'b' | 'c' | 'd'>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = SIMULADO_QUESTIONS.length;
  const currentQuestion = SIMULADO_QUESTIONS[currentIndex];

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // Cálculo da nota de 0 a 10.0 baseado nos pesos individuais
  const totalScore = SIMULADO_QUESTIONS.reduce((acc, q) => {
    if (selectedAnswers[q.id] === q.respostaCorreta) {
      return acc + q.pontos;
    }
    return acc;
  }, 0);

  const totalAnswered = Object.keys(selectedAnswers).length;

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-blue-600/30">
      {/* Cabeçalho do Simulado com Botão Voltar ao Início */}
      <ModuleHeader
        title="Simulado Oficial B1"
        subtitle="Banco de Dados e NoSQL • 7 Questões Oficiais (Total: 10,0 pontos)"
        badge="B1 • SIMULADO"
        icon={Award}
        badgeColor="bg-emerald-900/60 border-emerald-700/60 text-emerald-300"
        onBack={onBack}
      />

      {/* Conteúdo Principal com Scroll */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {!isFinished ? (
            /* ================= TELA DO SIMULADO (1 QUESTÃO POR TELA) ================= */
            <div className="space-y-6">
              {/* Barra de Progresso e Indicadores */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Questão {currentIndex + 1} de {totalQuestions}
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
                      Vale {currentQuestion.pontos.toFixed(1).replace('.', ',')} {currentQuestion.pontos === 1 ? 'ponto' : 'pontos'}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    Respondidas: {totalAnswered}/{totalQuestions}
                  </span>
                </div>

                {/* Barra de progresso visual */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                    }}
                  />
                </div>

                {/* Marcadores de Navegação Rápida (1 a 7) - Otimizado para Mobile */}
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar touch-manipulation">
                  {SIMULADO_QUESTIONS.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-9 h-9 sm:w-8 sm:h-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 touch-manipulation active:scale-95 ${
                          isCurrent
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                            : isAnswered
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 hover:bg-emerald-900'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cartão da Questão Atual com animação */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-xl animate-fade-in">
                {/* Assunto e Tópico */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-[11px] font-mono font-semibold mb-2">
                    <HelpCircle size={14} />
                    <span>{currentQuestion.assunto}</span>
                  </div>
                  <h2 className="text-sm sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
                    {currentQuestion.enunciado}
                  </h2>
                </div>

                {/* Diagramas SVG desenhados sob demanda para Q5, Q6 e Q7 */}
                {currentQuestion.hasSvg === 'q5' && <DiagramaQ5Svg />}
                {currentQuestion.hasSvg === 'q6' && (
                  <DiagramaQ6Svg selectedAlternative={selectedAnswers[currentQuestion.id]} />
                )}
                {currentQuestion.hasSvg === 'q7' && (
                  <DiagramaQ7Svg selectedAlternative={selectedAnswers[currentQuestion.id]} />
                )}

                {/* Lista de Alternativas (A a D) */}
                <div className="space-y-3 mt-6">
                  {currentQuestion.alternativas.map((alt) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === alt.id;
                    return (
                      <button
                        key={alt.id}
                        onClick={() => handleSelectOption(alt.id)}
                        className={`w-full text-left p-3.5 sm:p-4 min-h-[48px] rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer touch-manipulation active:scale-[0.99] ${
                          isSelected
                            ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/20 text-white ring-1 ring-blue-500/50'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold font-mono text-xs uppercase shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {alt.id}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                          {alt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Botões de Ação e Navegação */}
                <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {currentIndex < totalQuestions - 1 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-600/30"
                      >
                        <span>Próxima</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinish}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
                      >
                        <CheckCircle2 size={16} />
                        <span>Finalizar Simulado</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= TELA DE RESULTADO (NOTA DE 0 A 10 + GABARITO) ================= */
            <div className="space-y-6">
              {/* Card de Pontuação Final */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold mb-3">
                  <Sparkles size={14} />
                  Simulado Concluído com Sucesso
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Resultado do Simulado B1
                </h2>

                {/* Nota Grande */}
                <div className="my-5">
                  <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
                    {totalScore.toFixed(1).replace('.', ',')}
                  </span>
                  <span className="text-2xl text-slate-400 font-bold ml-1">/ 10,0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {totalScore >= 7.0
                    ? '🎉 Parabéns! Você atingiu a média necessária para a aprovação na prova B1!'
                    : 'Revise os tópicos com erros abaixo e consulte o Resumo Teórico para fixar os conceitos.'}
                </p>

                {/* Botões de Ação no Resultado */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    <RotateCcw size={16} />
                    <span>Refazer simulado</span>
                  </button>

                  <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-slate-700"
                  >
                    <span>Voltar ao início</span>
                  </button>
                </div>
              </div>

              {/* Correção Detalhada Questão por Questão */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Correção Detalhada (Gabarito Oficial)
                </h3>

                {SIMULADO_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.respostaCorreta;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCorrect
                          ? 'bg-slate-900/90 border-emerald-900/60'
                          : 'bg-slate-900/90 border-rose-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Questão {idx + 1} ({q.pontos.toFixed(1).replace('.', ',')} pts)
                          </span>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                              <CheckCircle2 size={16} /> Acertou
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                              <XCircle size={16} /> Errou
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-400">
                          Gabarito: <strong className="text-emerald-400 uppercase">{q.respostaCorreta}</strong>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-3 whitespace-pre-line">
                        {q.enunciado}
                      </p>

                      {/* Exibição das alternativas selecionada x correta */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div
                          className={`p-2.5 rounded-xl border ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                          }`}
                        >
                          <strong>Sua resposta:</strong>{' '}
                          {userAnswer ? (
                            <span>
                              {userAnswer.toUpperCase()}){' '}
                              {q.alternativas.find((a) => a.id === userAnswer)?.text}
                            </span>
                          ) : (
                            <span className="italic">Não respondida</span>
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl border bg-slate-950/70 border-slate-800 text-slate-300">
                          <strong className="text-emerald-400">Resposta certa:</strong>{' '}
                          {q.respostaCorreta.toUpperCase()}){' '}
                          {q.alternativas.find((a) => a.id === q.respostaCorreta)?.text}
                        </div>
                      </div>

                      {/* Explicação dos DADOS */}
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-blue-300">Explicação:</strong> {q.explicacao}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
