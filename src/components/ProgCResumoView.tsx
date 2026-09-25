import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  BookMarked,
  Code2,
  Sparkles,
  Play,
  Copy,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';
import { C_QUESTIONS_DATA, type CQuestionInfo } from '../data/progCQuestionsData';

interface ProgCResumoViewProps {
  onBack: () => void;
  onOpenBottomBarSettings?: () => void;
  onOpenLab?: (questionId: 9 | 10) => void;
}

export const ProgCResumoView: React.FC<ProgCResumoViewProps> = ({
  onBack,
  onOpenBottomBarSettings,
  onOpenLab,
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyCode = (id: number, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredQuestions = C_QUESTIONS_DATA.filter((q) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase();
    return (
      q.title.toLowerCase().includes(term) ||
      q.category.toLowerCase().includes(term) ||
      q.question.toLowerCase().includes(term) ||
      q.porQue.toLowerCase().includes(term) ||
      q.decorebaRapida.toLowerCase().includes(term)
    );
  });

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/85 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10"
    >
      <ModuleHeader
        title="Resumo pra Prova • Programação em C"
        subtitle="Foco nas 10 questões da prova: o que cada uma cobra e como gabaritar rápido"
        badge="B1 • PROGRAMAÇÃO EM C"
        badgeColor="bg-sky-950/80 border-sky-800 text-sky-300"
        icon={BookMarked}
        onBack={onBack}
        onOpenBottomBarSettings={onOpenBottomBarSettings}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Banner de Gabarito Rápido */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-indigo-900/30 border border-blue-500/30 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                Gabarito Rápido das Questões Objetivas
              </h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Q9 e Q10 são discursivas de código
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center font-mono">
            {[
              { q: 'Q1', resp: 'A' },
              { q: 'Q2', resp: 'B' },
              { q: 'Q3', resp: 'B' },
              { q: 'Q4', resp: 'B' },
              { q: 'Q5', resp: 'C' },
              { q: 'Q6', resp: 'B' },
              { q: 'Q7', resp: 'B' },
              { q: 'Q8', resp: 'D' },
            ].map((item) => (
              <div
                key={item.q}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]"
              >
                <div className="text-[10px] text-zinc-400">{item.q}</div>
                <div className="text-base sm:text-lg font-bold text-blue-400">
                  {item.resp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Barra de Busca Rápida */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar por conceito, código, operador %, matriz, acumulador..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>

        {/* Lista das 10 Questões em Acordeão */}
        <div className="space-y-4">
          {filteredQuestions.map((q: CQuestionInfo) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-white/[0.03] border-blue-500/40 shadow-xl shadow-blue-950/20'
                    : 'bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                {/* Header do Acordeão */}
                <button
                  type="button"
                  onClick={() => toggleExpand(q.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer touch-manipulation"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        q.isDiscursive
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {q.number}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-400">
                          {q.category}
                        </span>
                        {q.isDiscursive && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Discursiva
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                        Questão {q.number} — {q.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-blue-400 font-bold hidden sm:inline">
                      {q.correctAnswerSummary}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-zinc-400" />
                    ) : (
                      <ChevronDown size={18} className="text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Conteúdo Expandido */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-white/[0.06] space-y-4">
                    {/* Enunciado */}
                    <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                      <div className="text-[11px] font-mono uppercase text-zinc-400">
                        Pergunta da Prova:
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-zinc-100 font-mono">
                        {q.question}
                      </p>
                    </div>

                    {/* Resposta Certa */}
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>Resposta certa:</strong> {q.correctAnswerSummary}
                      </div>
                    </div>

                    {/* Por quê */}
                    <div className="space-y-1 text-xs sm:text-sm text-zinc-300">
                      <div className="text-[11px] font-mono uppercase text-zinc-400">
                        Por quê:
                      </div>
                      <p className="leading-relaxed">{q.porQue}</p>
                    </div>

                    {/* Decoreba Rápida */}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
                      <Zap size={16} className="shrink-0 mt-0.5 text-amber-400" />
                      <div>
                        <strong>Decoreba rápida:</strong> {q.decorebaRapida}
                      </div>
                    </div>

                    {/* Conteúdo Especial para Q9 e Q10 (Discursivas com Código) */}
                    {q.fullCode && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                            <Code2 size={14} />
                            <span>Código Completo da Prova:</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyCode(q.id, q.fullCode || '')}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-300 transition-all cursor-pointer"
                            >
                              {copiedCodeId === q.id ? (
                                <Check size={12} className="text-emerald-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                              <span>{copiedCodeId === q.id ? 'Copiado!' : 'Copiar'}</span>
                            </button>

                            {onOpenLab && (
                              <button
                                type="button"
                                onClick={() => onOpenLab(q.number as 9 | 10)}
                                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                              >
                                <Play size={12} fill="currentColor" />
                                <span>Treinar no Laboratório</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Bloco de Código Estilo Terminal */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#03060a] border border-white/[0.08] font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed">
                          <pre>{q.fullCode}</pre>
                        </div>

                        {/* Explicação Linha a Linha */}
                        {q.lineByLineExplanation && (
                          <div className="space-y-2 pt-2">
                            <div className="text-xs font-mono font-bold text-zinc-300">
                              Explicação Linha a Linha:
                            </div>
                            <div className="space-y-2">
                              {q.lineByLineExplanation.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1"
                                >
                                  <div className="font-mono text-xs text-blue-300 font-semibold">
                                    {item.code}
                                  </div>
                                  <div className="text-xs text-zinc-400 leading-relaxed">
                                    {item.explanation}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pulo do Gato (Q10) */}
                        {q.puloDoGato && (
                          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200 text-xs sm:text-sm space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-purple-300">
                              <Sparkles size={15} />
                              <span>Sacada Principal pra Decorar (Pulo do Gato):</span>
                            </div>
                            <p className="leading-relaxed">{q.puloDoGato}</p>
                          </div>
                        )}

                        {/* Ideia Central */}
                        {q.centralIdea && (
                          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/30 text-blue-200 text-xs sm:text-sm space-y-1">
                            <div className="font-bold text-blue-300">
                              ■ Ideia central pra guardar:
                            </div>
                            <p className="leading-relaxed">{q.centralIdea}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo Final Comparativo */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2">
            <BookMarked size={18} className="text-blue-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Resumo Geral da Lógica das Duas Questões Discursivas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-1.5">
              <div className="font-bold text-blue-400 font-mono">
                Questão 9: VETOR
              </div>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 font-mono text-xs">
                <li>1 dimensão / 1 índice: <span className="text-zinc-200">vetor[i]</span></li>
                <li>1 laço for: <span className="text-zinc-200">for (int i=0; i&lt;10; i++)</span></li>
                <li>Leitura com &: <span className="text-zinc-200">scanf("%d", &vetor[i])</span></li>
                <li>Acumulador: <span className="text-zinc-200">soma += vetor[i]</span></li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-1.5">
              <div className="font-bold text-emerald-400 font-mono">
                Questão 10: MATRIZ
              </div>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 font-mono text-xs">
                <li>2 dimensões / 2 índices: <span className="text-zinc-200">matriz[i][j]</span></li>
                <li>2 laços for (um dentro do outro): <span className="text-zinc-200">for i e for j</span></li>
                <li>Leitura com &: <span className="text-zinc-200">scanf("%d", &matriz[i][j])</span></li>
                <li>Diagonal: <span className="text-zinc-200">soma += matriz[i][i]</span> fora do for j!</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            <strong>O Segredo Comum:</strong> Criar o acumulador com valor 0 ANTES do laço (<code className="font-mono bg-black/40 px-1 py-0.5 rounded">int soma = 0;</code>) e ir somando (<code className="font-mono bg-black/40 px-1 py-0.5 rounded">+=</code>) a cada volta.
          </div>
        </div>
      </main>
    </div>
  );
};
