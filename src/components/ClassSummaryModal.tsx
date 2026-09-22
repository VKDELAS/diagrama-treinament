import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Sparkles,
  AlertCircle,
  GraduationCap,
  HelpCircle,
  Play,
  Layers,
  Clock,
  Award,
} from 'lucide-react';
import { useDiagramStore } from '../store/useDiagramStore';

interface ClassSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSimulado?: (tab?: 'simulado' | 'flashcards') => void;
}

export const ClassSummaryModal: React.FC<ClassSummaryModalProps> = ({
  isOpen,
  onClose,
  onOpenSimulado,
}) => {
  const { setExercise, exercises } = useDiagramStore();
  const [activeTab, setActiveTab] = useState<'teoria' | 'gabarito' | 'questao7'>('teoria');

  if (!isOpen) return null;

  // Função para abrir o exercício da prova no canvas
  const handleLoadExamExercise = () => {
    // Procura o exercício da prova pelo id ou título
    const examIndex = exercises.findIndex(
      (e) => e.id.includes('np1') || e.id.includes('unip') || e.titulo.includes('NP1') || e.titulo.includes('01-loja')
    );
    if (examIndex !== -1) {
      setExercise(examIndex);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Topo do Resumo Oficial UNIP */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/25 border border-blue-400/60 text-blue-400 rounded-2xl shadow-inner">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-600/60 text-blue-300">
                  UNIP • Prova NP1
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Docente: Valter Canhizares Filho • ADS
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide mt-0.5">
                Engenharia de Software Ágil • Revisão Comentada
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSimulado && (
              <button
                onClick={() => onOpenSimulado('simulado')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                title="Ir para o Simulado Oficial"
              >
                <Award size={14} />
                <span>Simulado NP1</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 bg-slate-950/70 border-b border-slate-800/80 gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('teoria')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'teoria'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <BookOpen size={16} />
              <span>Parte 1 — Conceitos & Teoria</span>
            </button>

            <button
              onClick={() => setActiveTab('gabarito')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'gabarito'
                  ? 'border-indigo-500 text-indigo-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Award size={16} />
              <span>Parte 2 — Gabarito Comentado (Q1 a Q6)</span>
            </button>

            <button
              onClick={() => setActiveTab('questao7')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'questao7'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-900/90 shadow'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Sparkles size={16} className="text-amber-400" />
              <span>Questão 7 — Dissertativa (3 Pontos)</span>
            </button>
          </div>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* ========================================================= */}
          {/* ABA 1: PARTE 1 — CONCEITOS E DEFINIÇÕES                   */}
          {/* ========================================================= */}
          {activeTab === 'teoria' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-300 flex items-center gap-2">
                <Sparkles size={16} className="shrink-0 text-amber-400" />
                <span>
                  <strong>Base teórica para a prova NP1:</strong> Este material consolida as definições cobradas para você gabaritar as questões conceituais.
                </span>
              </div>

              {/* 1. Requisitos Funcionais vs Não Funcionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* RF */}
                <div className="p-4 bg-slate-950/80 border border-blue-600/40 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={16} /> Requisitos Funcionais (RF)
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900 text-blue-200 font-bold">
                      O QUE FAZ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Descrevem funcionalidades, ações e comportamentos concretos que o usuário ou outro sistema pode acionar.
                  </p>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-blue-400">Exemplo clássico:</strong> "O sistema deve permitir que o cliente finalize uma compra" — é uma ação que o sistema executa.
                  </div>
                </div>

                {/* RNF */}
                <div className="p-4 bg-slate-950/80 border border-purple-600/40 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={16} /> Requisitos Não Funcionais (RNF)
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-bold">
                      COMO FAZ
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    São as qualidades e restrições sobre o comportamento. Não descrevem uma ação nova, mas uma <strong>condição de qualidade</strong> sobre ações existentes.
                  </p>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-purple-400">Exemplos clássicos:</strong> Desempenho (tempo de resposta), segurança (criptografia), disponibilidade (99% no ar), usabilidade, escalabilidade.
                  </div>
                </div>
              </div>

              {/* Dica Prática de Diferenciação */}
              <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={15} /> Macete de Diferenciação do Professor Valter:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>Se dá pra desenhar uma seta num diagrama de casos de uso pra representar aquilo, é FUNCIONAL.</strong> Se é uma condição de qualidade que atravessa vários casos de uso, é <strong>NÃO FUNCIONAL</strong>.
                </p>
                <p className="text-[11px] text-slate-400">
                  ⚠️ <em>Pegadinha da prova:</em> Dizer que segurança é funcional, ou que requisitos não funcionais só interessam à equipe técnica. RNF importam muito pro cliente e não são "menos importantes" que os RF!
                </p>
              </div>

              {/* 2. UML (Unified Modeling Language) */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-cyan-400" />
                  O que é a UML?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  É uma <strong>linguagem de modelagem visual</strong> — <strong>NÃO</strong> é uma metodologia e <strong>NÃO</strong> é uma linguagem de programação. Serve pra representar graficamente a estrutura e o comportamento de um sistema (antes, durante ou depois da programação).
                </p>
                <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                  <p>• É usada junto com metodologias (Scrum, RUP), mas não é metodologia em si.</p>
                  <p>• Não exige nenhuma linguagem específica ("UML precisa ser em inglês" ou "UML é só pra Java" são afirmações falsas de prova).</p>
                </div>
              </div>

              {/* 3. Diagrama de Casos de Uso */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-400" />
                  Diagrama de Casos de Uso
                </h3>
                <p className="text-xs text-slate-300">
                  Representa a <strong>visão do usuário sobre o sistema</strong> — o que cada tipo de usuário (ator) pode fazer com o sistema, sem entrar em detalhes técnicos de código-fonte nem requisitos não funcionais de desempenho.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="font-bold text-blue-400 text-xs block">👤 Ator</span>
                    <span className="text-[11px] text-slate-400">Quem interage com o sistema (pessoa ou outro sistema).</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="font-bold text-cyan-400 text-xs block">⭕ Caso de Uso</span>
                    <span className="text-[11px] text-slate-400">Uma ação ou funcionalidade que o ator realiza.</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="font-bold text-purple-400 text-xs block">🔗 Relações</span>
                    <span className="text-[11px] text-slate-400">Como os casos de uso se conectam (include, extend).</span>
                  </div>
                </div>
              </div>

              {/* 4. Relações Include e Extend */}
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle size={16} className="text-amber-400" />
                  Relações Include vs Extend
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-sky-950/40 border border-sky-600/50 rounded-xl space-y-1.5">
                    <span className="font-mono font-bold text-sky-300 text-xs block">&lt;&lt;include&gt;&gt; (Inclusão)</span>
                    <p className="text-xs text-slate-300">
                      Usa-se quando um caso de uso <strong>sempre depende de outro pra se completar</strong> — é obrigatório, sem exceção.
                    </p>
                    <p className="text-[11px] text-sky-200 font-mono">
                      "Realizar Compra" include "Processar Pagamento" (não existe compra sem pagamento).
                    </p>
                  </div>

                  <div className="p-3 bg-purple-950/40 border border-purple-600/50 rounded-xl space-y-1.5">
                    <span className="font-mono font-bold text-purple-300 text-xs block">&lt;&lt;extend&gt;&gt; (Extensão)</span>
                    <p className="text-xs text-slate-300">
                      Usa-se quando um caso de uso é <strong>opcional ou condicional</strong> — só acontece em certas situações.
                    </p>
                    <p className="text-[11px] text-purple-200 font-mono">
                      "Realizar Compra" extend "Aplicar Cupom" (só ocorre se o cliente tiver cupom).
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700/80 text-xs text-amber-300 font-semibold text-center">
                  💡 Regra prática: se o enunciado usa "sempre" ou "obrigatoriamente", é include. Se usa "caso" ou "se", é extend.
                </div>
              </div>

              {/* 5. Dívida Técnica e os Três Pilares */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    💳 Dívida Técnica
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    É o custo futuro acumulado quando uma equipe escolhe soluções rápidas (atalhos/gambiarras) no lugar de soluções bem-feitas, geralmente pra cumprir um prazo agressivo.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Funciona como dívida financeira: você "empresta" tempo agora, mas paga com juros depois em forma de bugs, retrabalho e lentidão para evoluir o sistema.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    🔺 Os Três Pilares (Tempo, Custo, Qualidade)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Conhecido como o <strong>"triângulo de restrições"</strong> da gestão de projetos.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Ideia central: raramente se otimiza os três ao mesmo tempo. Se o prazo (tempo) é apertado sem aumentar recursos (custo), <strong>quem paga o preço é a QUALIDADE</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 2: PARTE 2 — GABARITO COMENTADO (Q1 a Q6)              */}
          {/* ========================================================= */}
          {activeTab === 'gabarito' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
                <strong>Gabarito Questão a Questão:</strong> Entenda a alternativa correta e o porquê de cada pegadinha.
              </div>

              {/* Questão 1 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 1</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
                    Assinale a Incorreta
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Fatores que afetam o desenvolvimento de projetos
                </h4>
                <div className="p-2.5 bg-rose-950/30 border border-rose-500/40 rounded-xl text-xs text-rose-200">
                  <strong>Alternativa Incorreta: B) Homogeneidade do projeto</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Por que está certa a resposta:</strong> Projetos de software lidam com <strong>heterogeneidade</strong> (times, tecnologias, contextos diferentes) — <em>não com homogeneidade</em>. Heterogeneidade, segurança, escalabilidade e mudanças de negócio são desafios reais da engenharia de software. A alternativa B inverte o conceito.
                </p>
              </div>

              {/* Questão 2 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 2</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Alternativa Correta
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  UML como linguagem de modelagem
                </h4>
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
                  <strong>Alternativa Correta: B) Com a UML, é possível descrever sistemas de software orientados a objetos</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Por que as outras estão erradas:</strong> UML é linguagem de modelagem, não metodologia (elimina A). Não exige código em inglês (elimina C). Não é exclusiva do Java (elimina D). Resta a B: uma das aplicações centrais da UML é modelar sistemas orientados a objetos.
                </p>
              </div>

              {/* Questão 3 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 3</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Avalie I, II e III
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Requisitos funcionais e não funcionais
                </h4>
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
                  <strong>Alternativa Correta: B) III, apenas</strong>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• <strong>Afirmativa I (Errada):</strong> Não existe regra de que RNF são levantados depois dos RF — costumam ser elicitados em paralelo.</p>
                  <p>• <strong>Afirmativa II (Errada):</strong> Inverte o papel: quem define "como" o usuário interage de forma concreta na interface são os RNF (usabilidade), não os funcionais.</p>
                  <p>• <strong>Afirmativa III (Correta):</strong> Descreve com precisão o papel complementar dos requisitos não funcionais.</p>
                </div>
              </div>

              {/* Questão 4 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 4</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Alternativa Correta
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Diagrama de casos de uso e requisitos funcionais
                </h4>
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
                  <strong>Alternativa Correta: B) Os casos de uso têm por objetivos decidir e descrever os requisitos funcionais do sistema, mapeando o problema a partir da visão do usuário</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Explicação:</strong> Essa é a definição clássica. Casos de uso não servem para detalhamento de código-fonte (elimina A e D), nem mapeiam RNF de desempenho (elimina C).
                </p>
              </div>

              {/* Questão 5 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 5</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Alternativa Correta
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Impacto de uma arquitetura sob prazo agressivo nos três pilares
                </h4>
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
                  <strong>Alternativa Correta: D) A qualidade foi sacrificada para cumprir o prazo. A dívida técnica resultante aumentará o custo de manutenção e causará atrasos futuros, anulando o ganho de tempo inicial</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Explicação:</strong> Prazo agressivo com atalhos e falhas = dívida técnica. O pilar sacrificado foi a qualidade (não o tempo). Dívida técnica não se resolve rapidamente nem fica isolada, ela vaza para custos e prazos futuros.
                </p>
              </div>

              {/* Questão 6 */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">Questão 6</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Alternativa Correta
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Natureza e relação entre requisitos funcionais e não funcionais
                </h4>
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200">
                  <strong>Alternativa Correta: C) Embora sejam categorias com propósitos diferentes, os requisitos não funcionais complementam os funcionais ao incorporar elementos fundamentais para o cliente, atuando frequentemente como restrições de qualidade sobre o comportamento que o sistema deve oferecer</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Explicação:</strong> RNF não são levantados só depois (elimina A). Segurança, tempo de resposta e desempenho NÃO são funcionais (elimina B e D). RNF não é só "pra equipe técnica" (elimina E).
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 3: QUESTÃO 7 — DISSERTATIVA DA PROVA (3 PONTOS)       */}
          {/* ========================================================= */}
          {activeTab === 'questao7' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold font-mono">
                      Questão 7 • Vale 3 Pontos
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Dissertativa da Prova NP1
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Diagrama de Casos de Uso para Sistema de E-commerce
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Desenhar o diagrama e identificar 3 Requisitos Funcionais e 3 Requisitos Não Funcionais.
                  </p>
                </div>

                <button
                  onClick={handleLoadExamExercise}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Play size={14} />
                  <span>Treinar Esta Questão no Canvas</span>
                </button>
              </div>

              {/* Estrutura de Resposta Completa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Atores e Casos de Uso */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    1. Elementos do Diagrama
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">
                        👤 Atores:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 bg-blue-950/80 border border-blue-500/60 text-blue-200 rounded-lg text-xs font-bold">
                          Cliente
                        </span>
                        <span className="px-2.5 py-1 bg-blue-950/80 border border-blue-500/60 text-blue-200 rounded-lg text-xs font-bold">
                          Gerente
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">
                        ⭕ Casos de Uso:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs">
                          Realizar Compra
                        </span>
                        <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs">
                          Processar Pagamento
                        </span>
                        <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs">
                          Aplicar Cupom de Desconto
                        </span>
                        <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs">
                          Cadastrar Produto
                        </span>
                        <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs">
                          Validar Dados do Produto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relações Include e Extend */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    2. Relacionamentos & Regras
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-sky-950/40 border border-sky-600/40 rounded-xl">
                      <div className="font-mono text-sky-300 font-bold">
                        "Realizar Compra" &lt;&lt;include&gt;&gt; "Processar Pagamento"
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        O pagamento é <strong>obrigatório sempre</strong> que a compra é finalizada.
                      </p>
                    </div>

                    <div className="p-2.5 bg-purple-950/40 border border-purple-600/40 rounded-xl">
                      <div className="font-mono text-purple-300 font-bold">
                        "Realizar Compra" &lt;&lt;extend&gt;&gt; "Aplicar Cupom de Desconto"
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Só ocorre <strong>se o cliente tiver o cupom</strong>, ou seja, é condicional/opcional.
                      </p>
                    </div>

                    <div className="p-2.5 bg-sky-950/40 border border-sky-600/40 rounded-xl">
                      <div className="font-mono text-sky-300 font-bold">
                        "Cadastrar Produto" &lt;&lt;include&gt;&gt; "Validar Dados do Produto"
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        A validação é <strong>exigida sempre</strong> que um produto é cadastrado pelo Gerente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 RF e 3 RNF Solicitados na Prova */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3 RF */}
                <div className="p-4 bg-slate-950/90 border border-blue-600/40 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                    3 Requisitos Funcionais (RF):
                  </span>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                    <li className="leading-snug">
                      O sistema deve permitir que o <strong>Cliente</strong> finalize a compra de produtos.
                    </li>
                    <li className="leading-snug">
                      O sistema deve processar o pagamento <strong>obrigatoriamente</strong> ao final de toda compra.
                    </li>
                    <li className="leading-snug">
                      O sistema deve permitir que o <strong>Gerente</strong> cadastre novos produtos, validando os dados inseridos antes de confirmar o cadastro.
                    </li>
                  </ol>
                </div>

                {/* 3 RNF */}
                <div className="p-4 bg-slate-950/90 border border-purple-600/40 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                    3 Requisitos Não Funcionais (RNF):
                  </span>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                    <li className="leading-snug">
                      O processamento do pagamento deve ser concluído em até X segundos <strong>(Desempenho)</strong>.
                    </li>
                    <li className="leading-snug">
                      Os dados de pagamento do cliente devem ser criptografados e protegidos contra acesso não autorizado <strong>(Segurança)</strong>.
                    </li>
                    <li className="leading-snug">
                      O sistema deve manter disponibilidade mínima de 99% durante o horário de funcionamento da loja <strong>(Confiabilidade/Disponibilidade)</strong>.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Botão de Ação */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Material oficial de revisão da Prova NP1 • ADS 2º Semestre • UNIP
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleLoadExamExercise}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Play size={14} />
              <span>Treinar no Canvas</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
