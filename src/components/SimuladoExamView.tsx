import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BANCO_QUESTOES,
  QUESTAO_7_PROVA,
  type SimuladoQuestion,
} from '../data/simuladoData';
import {
  CheckCircle2,
  XCircle,
  Shuffle,
  Clock,
  Award,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SimuladoExamViewProps {
  onOpenCanvas?: () => void;
}

interface UserDiagramAnswer {
  compraPagamento: 'include' | 'extend' | null;
  cupomCompra: 'include' | 'extend' | null;
  cadastroValidacao: 'include' | 'extend' | null;
  rfIdentificado: string | null;
  rnfIdentificado: string | null;
}

const getRandomExamQuestions = (): SimuladoQuestion[] => {
  const oficiais = BANCO_QUESTOES.filter((q) => q.origem === 'Prova Oficial UNIP NP1');
  const variacoes = BANCO_QUESTOES.filter((q) => q.origem === 'Variação da Prova');

  const shuffledOficiais = [...oficiais].sort(() => Math.random() - 0.5);
  const shuffledVariacoes = [...variacoes].sort(() => Math.random() - 0.5);

  const picked = [
    ...shuffledOficiais.slice(0, 3),
    ...shuffledVariacoes.slice(0, 2),
  ].sort(() => Math.random() - 0.5);

  return picked.map((q, idx) => ({
    ...q,
    pontos: idx < 3 ? 1.5 : 1.25,
  }));
};

export const SimuladoExamView: React.FC<SimuladoExamViewProps> = ({ onOpenCanvas }) => {
  // Questões sorteadas para o simulado atual (5 questões objetivas de assinalar)
  const [selectedQuestions, setSelectedQuestions] = useState<SimuladoQuestion[]>(getRandomExamQuestions);
  // Respostas do usuário para as questões objetivas (id da questão -> letra escolhida)
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  // Respostas da última questão (Diagrama Q7)
  const [diagramAnswer, setDiagramAnswer] = useState<UserDiagramAnswer>({
    compraPagamento: null,
    cupomCompra: null,
    cadastroValidacao: null,
    rfIdentificado: null,
    rnfIdentificado: null,
  });

  // Índice da questão atual (0 a 4: objetivas; 5: questão final do diagrama)
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Função geradora de novo simulado (todas as vezes que se clica, muda as perguntas)
  const generateNewExam = () => {
    setSelectedQuestions(getRandomExamQuestions());
    setUserAnswers({});
    setDiagramAnswer({
      compraPagamento: null,
      cupomCompra: null,
      cadastroValidacao: null,
      rfIdentificado: null,
      rnfIdentificado: null,
    });
    setCurrentStep(0);
    setIsFinished(false);
    setElapsedSeconds(0);
  };

  // Timer de prova
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectObjective = (altId: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isFinished) return;
    const currentQ = selectedQuestions[currentStep];
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: altId,
    }));
  };

  // Cálculo da nota
  const calculateScore = () => {
    let scoreObj = 0;
    let hitsCount = 0;

    selectedQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correta) {
        scoreObj += q.pontos;
        hitsCount++;
      }
    });

    // Diagrama (vale até 3.0 pontos)
    // 1 pt para include/extend compra-pagamento
    // 1 pt para extend cupom-compra
    // 0.5 pt para include cadastro-validacao
    // 0.5 pt para RF e RNF identificados
    let scoreDiagram = 0;
    if (diagramAnswer.compraPagamento === 'include') scoreDiagram += 1.0;
    if (diagramAnswer.cupomCompra === 'extend') scoreDiagram += 1.0;
    if (diagramAnswer.cadastroValidacao === 'include') scoreDiagram += 0.5;
    if (diagramAnswer.rfIdentificado && diagramAnswer.rnfIdentificado) scoreDiagram += 0.5;

    const total = Math.min(10, Math.round((scoreObj + scoreDiagram) * 10) / 10);
    return { scoreObj, scoreDiagram, total, hitsCount };
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    const { total } = calculateScore();
    if (total >= 6.0) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const isDiagramStep = currentStep === selectedQuestions.length;
  const currentQ = selectedQuestions[currentStep];

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full space-y-4 animate-in fade-in duration-150 text-slate-100">
      {/* Topo do Simulado: Folha de Prova UNIP + Cronômetro */}
      <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black text-sm">
            NP1
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>Simulado Oficial • Engenharia de Software Ágil</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 hidden sm:inline">
                UNIP ADS
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Perguntas sorteadas aleatoriamente a cada novo clique • Questão final de Diagrama
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Cronômetro */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
            <Clock size={14} />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Botão Novo Simulado (Muda as perguntas) */}
          <button
            onClick={generateNewExam}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            title="Sortear novo conjunto de perguntas"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Mudar Perguntas</span>
            <span className="sm:hidden">Novo</span>
          </button>
        </div>
      </div>

      {/* Cartão de Gabarito Estilo Folha da UNIP */}
      <div className="p-3.5 bg-slate-950/80 border border-slate-800/90 rounded-2xl">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 px-1">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            Folha de Gabarito da Prova:
          </span>
          <span>Clique em um número para navegar</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedQuestions.map((q, idx) => {
            const answer = userAnswers[q.id];
            const isCurrent = currentStep === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 min-w-[50px] p-2 rounded-xl text-center border transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-950/80 ring-2 ring-blue-500/30'
                    : answer
                    ? 'border-slate-700 bg-slate-900/90 text-slate-200'
                    : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] block font-mono text-slate-400">Q{idx + 1}</span>
                <span
                  className={`text-xs font-black font-mono ${
                    answer ? 'text-blue-400' : 'text-slate-600'
                  }`}
                >
                  {answer || '—'}
                </span>
              </button>
            );
          })}

          {/* Última Questão: Q7 Diagrama */}
          <button
            onClick={() => setCurrentStep(selectedQuestions.length)}
            className={`flex-1 min-w-[75px] p-2 rounded-xl text-center border transition-all cursor-pointer ${
              isDiagramStep
                ? 'border-emerald-500 bg-emerald-950/80 ring-2 ring-emerald-500/30'
                : diagramAnswer.compraPagamento
                ? 'border-emerald-700/80 bg-slate-900/90 text-emerald-300'
                : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] block font-mono text-emerald-400 font-bold">Q-Final</span>
            <span className="text-xs font-bold">Diagrama</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO PRINCIPAL: Questão Objetiva OU Questão do Diagrama OU Resultado */}
      {!isFinished ? (
        <div className="p-5 sm:p-6 bg-slate-950/90 border border-slate-800 rounded-3xl shadow-2xl space-y-5">
          {!isDiagramStep && currentQ ? (
            /* ======================================================= */
            /* QUESTÃO OBJETIVA DE ASSINALAR (A, B, C, D, E)           */
            /* ======================================================= */
            <>
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-xs font-mono font-bold border border-blue-800">
                    Questão {currentStep + 1} de {selectedQuestions.length + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Vale {currentQ.pontos.toFixed(1).replace('.', ',')} Ponto(s)
                  </span>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">{currentQ.categoria}</span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed whitespace-pre-line">
                  {currentQ.enunciado}
                </h3>
              </div>

              {/* Lista de Alternativas */}
              <div className="space-y-2.5">
                {currentQ.alternativas.map((alt) => {
                  const isSelected = userAnswers[currentQ.id] === alt.id;
                  return (
                    <button
                      key={alt.id}
                      onClick={() => handleSelectObjective(alt.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950/70 border-blue-500 text-white ring-2 ring-blue-500/20 shadow-md'
                          : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {alt.id}
                      </div>
                      <span className="flex-1 text-xs sm:text-sm leading-relaxed font-medium">
                        {alt.texto}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* ======================================================= */
            /* QUESTÃO FINAL: DIAGRAMA DE CASOS DE USO (3 PONTOS)      */
            /* ======================================================= */
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono font-bold border border-emerald-700">
                    Última Questão • Questão 7 da Prova
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    Vale 3,0 Pontos
                  </span>
                </div>
                <span className="text-xs text-slate-400">Diagrama de Casos de Uso</span>
              </div>

              {/* Enunciado da Prova */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Enunciado Oficial da Prova:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-serif">
                  "{QUESTAO_7_PROVA.enunciadoOriginal}"
                </p>
              </div>

              {/* Desafio de Assinalar as Relações do Diagrama */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>1. Assinale os relacionamentos corretos deste diagrama:</span>
                </h4>

                {/* Conexão 1 */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-blue-300 font-bold">Realizar Compra</span> ➔{' '}
                    <span className="text-blue-300 font-bold">Processar Pagamento</span>
                    <span className="text-[11px] text-slate-400 block">
                      "Ao finalizar compra, o sistema deve obrigatoriamente processar pagamento"
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, compraPagamento: 'include' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.compraPagamento === 'include'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;include&gt;&gt;
                    </button>
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, compraPagamento: 'extend' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.compraPagamento === 'extend'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;extend&gt;&gt;
                    </button>
                  </div>
                </div>

                {/* Conexão 2 */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-purple-300 font-bold">Aplicar Cupom de Desconto</span> ➔{' '}
                    <span className="text-blue-300 font-bold">Realizar Compra</span>
                    <span className="text-[11px] text-slate-400 block">
                      "Durante a compra, caso o cliente possua código promocional, poderá aplicar"
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, cupomCompra: 'include' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.cupomCompra === 'include'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;include&gt;&gt;
                    </button>
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, cupomCompra: 'extend' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.cupomCompra === 'extend'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;extend&gt;&gt;
                    </button>
                  </div>
                </div>

                {/* Conexão 3 */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-cyan-300 font-bold">Cadastrar Produto</span> ➔{' '}
                    <span className="text-cyan-300 font-bold">Validar Dados do Produto</span>
                    <span className="text-[11px] text-slate-400 block">
                      "O ato de cadastrar sempre exige que o sistema valide os dados inseridos"
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, cadastroValidacao: 'include' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.cadastroValidacao === 'include'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;include&gt;&gt;
                    </button>
                    <button
                      onClick={() =>
                        setDiagramAnswer((p) => ({ ...p, cadastroValidacao: 'extend' }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                        diagramAnswer.cadastroValidacao === 'extend'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      &lt;&lt;extend&gt;&gt;
                    </button>
                  </div>
                </div>
              </div>

              {/* Identificação de RF e RNF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-300 block">
                    2. Selecione um Requisito Funcional (RF) deste sistema:
                  </span>
                  <div className="space-y-1.5">
                    {[
                      'O sistema deve permitir que o Cliente realize compras online.',
                      'O sistema deve ter tempo de resposta inferior a 2 segundos.',
                      'O sistema deve ser hospedado em nuvem AWS.',
                    ].map((rf, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setDiagramAnswer((p) => ({ ...p, rfIdentificado: rf }))
                        }
                        className={`w-full text-left p-2 rounded-xl text-xs border transition-all cursor-pointer ${
                          diagramAnswer.rfIdentificado === rf
                            ? 'bg-blue-950 border-blue-500 text-white font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {rf}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-purple-300 block">
                    3. Selecione um Requisito Não Funcional (RNF) deste sistema:
                  </span>
                  <div className="space-y-1.5">
                    {[
                      'Segurança: Processar pagamento com criptografia SSL e tokenização bancária.',
                      'O Cliente pode aplicar cupom de desconto no carrinho.',
                      'O Gerente cadastra produtos no painel administrativo.',
                    ].map((rnf, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setDiagramAnswer((p) => ({ ...p, rnfIdentificado: rnf }))
                        }
                        className={`w-full text-left p-2 rounded-xl text-xs border transition-all cursor-pointer ${
                          diagramAnswer.rnfIdentificado === rnf
                            ? 'bg-purple-950 border-purple-500 text-white font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {rnf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão de Praticar no Canvas */}
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between gap-2">
                <span className="text-xs text-slate-300">
                  Quer montar o diagrama completo arrastando peças e ligando setas?
                </span>
                <button
                  onClick={onOpenCanvas}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Abrir no Canvas</span>
                </button>
              </div>
            </div>
          )}

          {/* Barra de Navegação Entre Questões */}
          <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </button>

            {currentStep < selectedQuestions.length ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
              >
                <span>Próxima</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black transition-all cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <Award size={18} />
                <span>Finalizar Prova & Ver Nota</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ======================================================= */
        /* TELA DE RESULTADO & BOLETIM DA PROVA                    */
        /* ======================================================= */
        <div className="p-6 sm:p-8 bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          {(() => {
            const { scoreObj, scoreDiagram, total, hitsCount } = calculateScore();
            const isApproved = total >= 6.0;

            return (
              <>
                {/* Placar de Nota */}
                <div className="text-center space-y-2">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-slate-400">
                    Resultado Oficial da NP1
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`text-5xl sm:text-6xl font-black font-mono tracking-tight ${
                        isApproved ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {total.toFixed(1).replace('.', ',')}
                    </span>
                    <span className="text-xl font-bold text-slate-500 self-end mb-2">/ 10,0</span>
                  </div>

                  <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {isApproved ? (
                      <span className="text-emerald-400 bg-emerald-950 border border-emerald-600 px-3 py-1 rounded-full flex items-center gap-1.5 justify-center">
                        <CheckCircle2 size={16} /> Aprovado na NP1! Parabéns!
                      </span>
                    ) : (
                      <span className="text-rose-400 bg-rose-950 border border-rose-600 px-3 py-1 rounded-full flex items-center gap-1.5 justify-center">
                        <XCircle size={16} /> Nota abaixo de 6,0 • Refaça o simulado para treinar!
                      </span>
                    )}
                  </div>
                </div>

                {/* Resumo Estatístico */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Tempo Total</span>
                    <span className="text-sm font-bold font-mono text-white">
                      {formatTime(elapsedSeconds)}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Acertos Objetivos</span>
                    <span className="text-sm font-bold font-mono text-blue-400">
                      {hitsCount} / {selectedQuestions.length}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Nota Objetiva</span>
                    <span className="text-sm font-bold font-mono text-indigo-400">
                      {scoreObj.toFixed(1).replace('.', ',')} / 7,0
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Nota Diagrama Q7</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {scoreDiagram.toFixed(1).replace('.', ',')} / 3,0
                    </span>
                  </div>
                </div>

                {/* Revisão Questão a Questão */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    Revisão Comentada do Gabarito:
                  </h4>

                  {selectedQuestions.map((q, idx) => {
                    const userAns = userAnswers[q.id];
                    const isHit = userAns === q.correta;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border ${
                          isHit
                            ? 'bg-emerald-950/20 border-emerald-800/40'
                            : 'bg-rose-950/20 border-rose-800/40'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold font-mono text-slate-300">
                            Questão {idx + 1} • {q.categoria}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              isHit
                                ? 'bg-emerald-900 text-emerald-300'
                                : 'bg-rose-900 text-rose-300'
                            }`}
                          >
                            {isHit ? 'Acertou' : 'Errou'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200">{q.enunciado}</p>
                        <div className="text-[11px] space-y-1">
                          <p>
                            Sua resposta:{' '}
                            <strong className={isHit ? 'text-emerald-400' : 'text-rose-400'}>
                              {userAns || 'Em branco'}
                            </strong>{' '}
                            | Gabarito correto:{' '}
                            <strong className="text-emerald-400">{q.correta}</strong>
                          </p>
                          <p className="text-slate-400">{q.explicacaoGeral}</p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Revisão do Diagrama Q7 */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold font-mono text-emerald-400">
                        Última Questão • Diagrama Q7 E-Commerce
                      </span>
                      <span className="font-mono font-bold text-amber-300">
                        {scoreDiagram.toFixed(1).replace('.', ',')} / 3,0 pts
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1">
                      <p>
                        • Compra ➔ Pagamento:{' '}
                        <strong>&lt;&lt;include&gt;&gt;</strong>{' '}
                        {diagramAnswer.compraPagamento === 'include' ? '✅' : '❌'}
                      </p>
                      <p>
                        • Cupom ➔ Compra:{' '}
                        <strong>&lt;&lt;extend&gt;&gt;</strong>{' '}
                        {diagramAnswer.cupomCompra === 'extend' ? '✅' : '❌'}
                      </p>
                      <p>
                        • Cadastro ➔ Validação:{' '}
                        <strong>&lt;&lt;include&gt;&gt;</strong>{' '}
                        {diagramAnswer.cadastroValidacao === 'include' ? '✅' : '❌'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão de Refazer com Perguntas Sorteadas */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={generateNewExam}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95"
                  >
                    <Shuffle size={16} />
                    <span>Gerar Outro Simulado (Perguntas Diferentes)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentStep(0);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer"
                  >
                    <RotateCcw size={16} />
                    <span>Refazer com Estas Mesmas Perguntas</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
