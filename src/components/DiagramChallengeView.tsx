import React, { useState } from 'react';
import { QUESTAO_7_PROVA } from '../data/simuladoData';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface DiagramChallengeViewProps {
  onOpenCanvas?: () => void;
}

export const DiagramChallengeView: React.FC<DiagramChallengeViewProps> = ({ onOpenCanvas }) => {
  const { setExercise, exercises } = useDiagramStore();
  const [showRfs, setShowRfs] = useState(true);
  const [showRnfs, setShowRnfs] = useState(true);
  const [testIncludeExtend, setTestIncludeExtend] = useState<Record<string, 'include' | 'extend' | null>>({});
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleOpenExamExercise = () => {
    const examIndex = exercises.findIndex(
      (e) =>
        e.id.includes('np1') ||
        e.id.includes('unip') ||
        e.titulo.includes('NP1') ||
        e.titulo.includes('01-loja')
    );
    if (examIndex !== -1) {
      setExercise(examIndex);
    }
    if (onOpenCanvas) {
      onOpenCanvas();
    }
  };

  const handleSelectRelation = (id: string, type: 'include' | 'extend') => {
    setTestIncludeExtend((prev) => ({ ...prev, [id]: type }));
  };

  const checkRelations = () => {
    const r1 = testIncludeExtend['rel1'] === 'include'; // Realizar Compra -> Processar Pagamento
    const r2 = testIncludeExtend['rel2'] === 'extend';  // Cupom -> Realizar Compra
    const r3 = testIncludeExtend['rel3'] === 'include'; // Cadastrar Produto -> Validar Dados

    if (r1 && r2 && r3) {
      setTestResult('perfect');
    } else {
      setTestResult('errors');
    }
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full space-y-6 text-slate-200 text-xs sm:text-sm animate-in fade-in duration-200">
      {/* Banner Principal da Questão 7 */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/40 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-emerald-300 font-mono font-bold text-xs border border-emerald-600/50">
              Questão 7 da Prova NP1 • 3,0 Pontos
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Modelagem Completa + RF & RNF
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-black text-white tracking-wide">
            E-Commerce da UNIP: Diagrama de Casos de Uso
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            A questão prática dissertativa mais valiosa da prova: envolve 2 Atores, 5 Casos de Uso, relações include/extend e a identificação de 3 RF e 3 RNF.
          </p>
        </div>

        {/* Botão de Ir para o Canvas */}
        <button
          onClick={handleOpenExamExercise}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95 shrink-0"
        >
          <ExternalLink size={16} />
          <span>Montar no Canvas brModelo</span>
        </button>
      </div>

      {/* Enunciado Oficial da Prova */}
      <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Layers size={15} />
          <span>Enunciado Original Impresso na Prova:</span>
        </div>
        <p className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed italic font-serif">
          "{QUESTAO_7_PROVA.enunciadoOriginal}"
        </p>
      </div>

      {/* Teste Interativo de Relações Include vs Extend */}
      <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400" />
            <span>Treino Interativo: Quais são as relações corretas?</span>
          </h3>
          <span className="text-[11px] text-slate-400">Teste rápido antes de montar</span>
        </div>

        <div className="space-y-3">
          {/* Relação 1 */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="text-xs">
              <strong className="text-blue-300">Realizar Compra</strong> ➔{' '}
              <strong className="text-blue-300">Processar Pagamento</strong>
              <span className="text-slate-400 block text-[11px]">
                "Sempre que o cliente finalizar uma compra, o sistema deve obrigatoriamente processar o pagamento."
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSelectRelation('rel1', 'include')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel1'] === 'include'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;include&gt;&gt;
              </button>
              <button
                onClick={() => handleSelectRelation('rel1', 'extend')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel1'] === 'extend'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;extend&gt;&gt;
              </button>
            </div>
          </div>

          {/* Relação 2 */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="text-xs">
              <strong className="text-purple-300">Aplicar Cupom de Desconto</strong> ➔{' '}
              <strong className="text-blue-300">Realizar Compra</strong>
              <span className="text-slate-400 block text-[11px]">
                "Durante a compra, caso o cliente possua código promocional, poderá aplicar cupom de desconto."
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSelectRelation('rel2', 'include')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel2'] === 'include'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;include&gt;&gt;
              </button>
              <button
                onClick={() => handleSelectRelation('rel2', 'extend')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel2'] === 'extend'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;extend&gt;&gt;
              </button>
            </div>
          </div>

          {/* Relação 3 */}
          <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="text-xs">
              <strong className="text-cyan-300">Cadastrar Produto</strong> ➔{' '}
              <strong className="text-cyan-300">Validar Dados do Produto</strong>
              <span className="text-slate-400 block text-[11px]">
                "O ato de cadastrar um produto sempre exige que o sistema valide os dados inseridos."
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSelectRelation('rel3', 'include')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel3'] === 'include'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;include&gt;&gt;
              </button>
              <button
                onClick={() => handleSelectRelation('rel3', 'extend')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                  testIncludeExtend['rel3'] === 'extend'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                &lt;&lt;extend&gt;&gt;
              </button>
            </div>
          </div>
        </div>

        {/* Botão de Validar Conexões */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={checkRelations}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-blue-600/30"
          >
            Conferir Minhas Relações
          </button>

          {testResult === 'perfect' && (
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 size={16} /> Perfeito! 100% correto: 2 includes e 1 extend!
            </span>
          )}

          {testResult === 'errors' && (
            <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <HelpCircle size={16} /> Há relações incorretas. Lembre-se: "sempre/obriga" = include; "caso/se" = extend!
            </span>
          )}
        </div>
      </div>

      {/* Seção dos 3 RF e 3 RNF Solicitados na Prova */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RF */}
        <div className="p-5 bg-slate-950/90 border border-blue-800/40 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={16} /> Identificação de 03 RF (Funcionais)
            </h3>
            <button
              onClick={() => setShowRfs(!showRfs)}
              className="text-slate-400 hover:text-white"
            >
              {showRfs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Ações e comportamentos que o software deve disponibilizar para o usuário:
          </p>

          {showRfs && (
            <div className="space-y-2 pt-1 animate-in fade-in">
              {QUESTAO_7_PROVA.sugestoesRF.map((rf, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="text-blue-400 font-mono font-bold shrink-0">✓</span>
                  <span>{rf}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RNF */}
        <div className="p-5 bg-slate-950/90 border border-purple-800/40 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={16} /> Identificação de 03 RNF (Não Funcionais)
            </h3>
            <button
              onClick={() => setShowRnfs(!showRnfs)}
              className="text-slate-400 hover:text-white"
            >
              {showRnfs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Critérios de qualidade, desempenho e restrições sobre as funcionalidades:
          </p>

          {showRnfs && (
            <div className="space-y-2 pt-1 animate-in fade-in">
              {QUESTAO_7_PROVA.sugestoesRNF.map((rnf, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                >
                  <span className="text-purple-400 font-mono font-bold shrink-0">✓</span>
                  <span>{rnf}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
