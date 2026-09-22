import React from 'react';
import {
  BookOpen,
  X,
  Sparkles,
  AlertCircle,
  GraduationCap,
  HelpCircle,
} from 'lucide-react';

interface ClassSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassSummaryModal: React.FC<ClassSummaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Topo do Resumo */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 border border-blue-400 text-blue-400 rounded-2xl shadow-inner">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-600/60 text-blue-300">
                  ADS • 2º Semestre
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Engenharia de Software
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide mt-0.5">
                Resumo da Aula • Diagramas de Casos de Uso (UML)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Seção 1: O que é */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400" />
              1. O que é o Diagrama de Casos de Uso?
            </h3>
            <p>
              É um diagrama comportamental da UML que descreve as <strong>funcionalidades do sistema</strong> do ponto de vista do <strong>usuário externo</strong> (visão de caixa preta). Ele responde à pergunta: <em>"O QUE o sistema faz?"</em>, e <strong>NÃO</strong> <em>"COMO ele faz"</em>.
            </p>
          </div>

          {/* Seção 2: Os Componentes */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              2. Elementos Principais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Ator */}
              <div className="p-3.5 bg-slate-950/80 border border-blue-900/60 rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  👤 Ator (Actor)
                </span>
                <p className="text-xs text-slate-300">
                  Entidade externa que interage com o sistema. Pode ser uma <strong>pessoa</strong> (Cliente, Aluno, Médico) ou um <strong>sistema externo</strong> (Gateway de Pagamento, API dos Correios).
                </p>
                <p className="text-[11px] text-slate-400">
                  <strong>Representação:</strong> Boneco palito (stickman).
                </p>
              </div>

              {/* Caso de Uso */}
              <div className="p-3.5 bg-slate-950/80 border border-cyan-900/60 rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  ⭕ Caso de Uso (Use Case)
                </span>
                <p className="text-xs text-slate-300">
                  Representa um serviço ou objetivo completo entregue pelo sistema ao ator.
                </p>
                <p className="text-[11px] text-cyan-300 font-medium">
                  <strong>Regra de ouro de nome:</strong> Sempre um <strong>VERBO no infinitivo</strong> seguido de substantivo (ex: <em>"Realizar Pedido"</em>, <em>"Emitir Nota Fiscal"</em>).
                </p>
              </div>
            </div>
          </div>

          {/* Seção 3: A Grande Batalha: Include vs Extend */}
          <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                <HelpCircle size={17} className="text-purple-400" />
                3. A Regra de Ouro: &lt;&lt;include&gt;&gt; vs &lt;&lt;extend&gt;&gt;
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                O assunto que mais pega em provas e questões de concurso de ADS!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Include */}
              <div className="p-3.5 bg-sky-950/40 border border-sky-600/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-300 text-sm">
                    &lt;&lt;include&gt;&gt;
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-900/70 text-sky-200 text-[10px] font-bold">
                    OBRIGATÓRIO
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  O caso base <strong>SEMPRE</strong> executa o caso incluído. Não existe opção: toda vez que o caso base roda, o incluído é chamado.
                </p>
                <div className="p-2 bg-sky-950/80 rounded border border-sky-800/60 text-[11px] space-y-1">
                  <p className="text-sky-300 font-semibold">
                    🎯 Direção da Seta:
                  </p>
                  <p className="font-mono text-slate-300">
                    [Caso Base] ──&gt; [Caso Incluído]
                  </p>
                  <p className="text-[10px] text-slate-400">
                    A seta sai de quem obriga e aponta para o obrigatório!
                  </p>
                </div>
                <div className="text-[11px] text-slate-300">
                  <strong>Pistas no texto:</strong> "sempre", "obrigatoriamente", "exige", "deve validar".
                </div>
              </div>

              {/* Extend */}
              <div className="p-3.5 bg-purple-950/40 border border-purple-600/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-purple-300 text-sm">
                    &lt;&lt;extend&gt;&gt;
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-900/70 text-purple-200 text-[10px] font-bold">
                    OPCIONAL / CONDICIONAL
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  O caso estendido só acontece sob <strong>certas condições</strong>. O caso base consegue funcionar normalmente sem ele!
                </p>
                <div className="p-2 bg-purple-950/80 rounded border border-purple-800/60 text-[11px] space-y-1">
                  <p className="text-purple-300 font-semibold">
                    🎯 Direção da Seta (CUIDADO!):
                  </p>
                  <p className="font-mono text-slate-300">
                    [Caso Opcional] ──&gt; [Caso Base]
                  </p>
                  <p className="text-[10px] text-slate-400">
                    A seta sai da extensão/opção e aponta para a base que ela amplia!
                  </p>
                </div>
                <div className="text-[11px] text-slate-300">
                  <strong>Pistas no texto:</strong> "se", "caso", "opcionalmente", "se houver saldo", "caso ocorra erro".
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Tabela Comparativa de Macete */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              📊 Tabela de Macete Rápido
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Característica</th>
                    <th className="p-2.5 text-sky-400">&lt;&lt;include&gt;&gt;</th>
                    <th className="p-2.5 text-purple-400">&lt;&lt;extend&gt;&gt;</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-300">Obrigatoriedade</td>
                    <td className="p-2.5 text-sky-300">100% Obrigatório</td>
                    <td className="p-2.5 text-purple-300">Opcional / Condicional</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-300">A Base funciona sem ele?</td>
                    <td className="p-2.5 text-slate-300">Não (é incompleto sem ele)</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">Sim, perfeitamente</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-300">Sentido da Seta</td>
                    <td className="p-2.5 font-mono text-sky-300">Base ──&gt; Incluído</td>
                    <td className="p-2.5 font-mono text-purple-300">Extensão ──&gt; Base</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-300">Palavras do Enunciado</td>
                    <td className="p-2.5 text-slate-300">sempre, obrigatoriamente, requer</td>
                    <td className="p-2.5 text-slate-300">se, caso, opcionalmente</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dicas de Prova de ADS */}
          <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-1.5 text-amber-200 text-xs">
            <span className="font-bold flex items-center gap-1.5 text-amber-300">
              <AlertCircle size={15} /> Macete de Prova ADS (Não caia nessa pegadinha!):
            </span>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
              <li>
                <strong>NUNCA</strong> use &lt;&lt;include&gt;&gt; ou &lt;&lt;extend&gt;&gt; entre dois Atores. Eles só relacionam Casos de Uso!
              </li>
              <li>
                Entre Ator e Caso de Uso, usa-se <strong>Associação simples</strong> (linha contínua sem seta).
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé com Fechar */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Material de apoio interativo • Use para consultar a qualquer momento
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-center"
          >
            Entendido, Bora Treinar!
          </button>
        </div>
      </div>
    </div>
  );
};
