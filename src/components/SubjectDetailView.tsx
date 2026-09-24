import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  Clock,
  Smartphone,
} from 'lucide-react';
import type { SubjectItem, AppModule } from '../types/navigation';

interface SubjectDetailViewProps {
  subject: SubjectItem;
  onBackToHub: () => void;
  onSelectModule: (module: AppModule) => void;
  onOpenBottomBarSettings?: () => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  onBackToHub,
  onSelectModule,
  onOpenBottomBarSettings,
}) => {
  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'resumo':
        return BookOpen;
      case 'simulado':
        return Award;
      case 'flashcards':
        return Sparkles;
      case 'diagramas':
        return Layers;
      default:
        return Sparkles;
    }
  };

  const getModuleColor = (id: string) => {
    switch (id) {
      case 'resumo':
        return {
          gradient: 'from-blue-600/20 via-slate-900 to-cyan-900/10',
          borderHover: 'hover:border-blue-500/60',
          iconBg: 'bg-blue-600/20 border-blue-500/40 text-blue-400',
          tagColor: 'text-blue-400 bg-blue-950/80 border-blue-800/60',
          accentColor: 'text-blue-400',
        };
      case 'simulado':
        return {
          gradient: 'from-emerald-600/20 via-slate-900 to-teal-900/10',
          borderHover: 'hover:border-emerald-500/60',
          iconBg: 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400',
          tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
          accentColor: 'text-emerald-400',
        };
      case 'flashcards':
        return {
          gradient: 'from-indigo-600/20 via-slate-900 to-purple-900/10',
          borderHover: 'hover:border-indigo-500/60',
          iconBg: 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400',
          tagColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/60',
          accentColor: 'text-indigo-400',
        };
      case 'diagramas':
        return {
          gradient: 'from-amber-600/20 via-slate-900 to-orange-900/10',
          borderHover: 'hover:border-amber-500/60',
          iconBg: 'bg-amber-600/20 border-amber-500/40 text-amber-400',
          tagColor: 'text-amber-400 bg-amber-950/80 border-amber-800/60',
          accentColor: 'text-amber-400',
        };
      default:
        return {
          gradient: 'from-slate-700/20 via-slate-900 to-slate-900/10',
          borderHover: 'hover:border-slate-500/60',
          iconBg: 'bg-slate-700/20 border-slate-600/40 text-slate-300',
          tagColor: 'text-slate-300 bg-slate-900/80 border-slate-700/60',
          accentColor: 'text-slate-300',
        };
    }
  };

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/75 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10"
    >
      {/* Header Superior Minimalista com Breadcrumb */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#080b11]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-14 px-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBackToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation shrink-0"
              title="Voltar ao Hub de Matérias"
            >
              <ArrowLeft size={14} className="text-blue-400" />
              <span className="hidden xs:inline">Todas as Matérias</span>
              <span className="xs:hidden">Matérias</span>
            </button>

            <span className="text-zinc-600 font-mono text-xs hidden sm:inline">/</span>

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-white tracking-wide truncate">
                {subject.title}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 font-semibold hidden md:inline shrink-0">
                {subject.code}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenBottomBarSettings && (
              <button
                onClick={onOpenBottomBarSettings}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 active:scale-95 border border-cyan-800/60 text-cyan-300 hover:text-white text-[11px] font-medium transition-all cursor-pointer touch-manipulation shadow-sm shadow-cyan-950/20"
                title="Ajuste de Botões do Celular (3 Botões / Gestos)"
              >
                <Smartphone size={13} className="text-cyan-400" />
                <span className="hidden xs:inline">Botões</span>
              </button>
            )}
            <span className="text-[11px] text-zinc-400 hidden xs:inline">
              Semestre {subject.semester}
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo da Matéria com animação suave de entrada */}
      <main
        data-page-bg="true"
        className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-8 py-6 sm:py-10 flex flex-col justify-center animate-fade-in"
      >
        {/* Banner da Matéria */}
        <div className="max-w-3xl mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-300 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Módulos de Estudo da Matéria</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {subject.title}
          </h1>
          <p className="mt-2 text-xs sm:text-base text-zinc-400 leading-relaxed">
            {subject.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {subject.stats.flashcards ? (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-medium">
                🃏 {subject.stats.flashcards} Flashcards
              </span>
            ) : null}
            {subject.stats.questions ? (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 font-medium">
                🏆 {subject.stats.questions} Questões de Prova
              </span>
            ) : null}
            {subject.stats.topics ? (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-300 font-medium">
                📘 {subject.stats.topics} Tópicos Teóricos
              </span>
            ) : null}
            {subject.stats.exercises ? (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-300 font-medium">
                📐 {subject.stats.exercises} Desafios Práticos
              </span>
            ) : null}
          </div>
        </div>

        {/* Grade dos Módulos Desta Matéria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {subject.modules.map((module, index) => {
            const Icon = getModuleIcon(module.id);
            const colors = getModuleColor(module.id);
            const isClickable = module.available;

            return (
              <div
                key={module.id}
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => {
                  if (isClickable) {
                    onSelectModule(module.id);
                  }
                }}
                className={`group relative text-left bg-gradient-to-br ${colors.gradient} border border-white/[0.08] rounded-3xl p-5 sm:p-7 transition-all duration-300 animate-fade-in ${
                  isClickable
                    ? `${colors.borderHover} hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1 active:scale-[0.99] cursor-pointer touch-manipulation`
                    : 'opacity-75 cursor-not-allowed'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center ${colors.iconBg} shadow-inner transition-transform group-hover:scale-105`}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${colors.tagColor}`}
                    >
                      {module.tag}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {module.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-400 group-hover:text-zinc-300">
                    {module.badge}
                  </span>
                  {isClickable ? (
                    <div
                      className={`flex items-center gap-1.5 ${colors.accentColor} group-hover:translate-x-1 transition-transform`}
                    >
                      <span>Acessar Módulo</span>
                      <ArrowRight size={14} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Clock size={13} />
                      <span>Em preparação</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lembrete da prova para Banco de Dados */}
        {subject.id === 'banco-de-dados' && (
          <div className="mt-8 sm:mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start sm:items-center gap-3 text-xs text-zinc-400">
            <Info size={18} className="text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong className="text-zinc-200">Convenção de Leitura da Prova:</strong>{' '}
              o par escrito perto de uma entidade diz quantas ocorrências dessa
              entidade se ligam a cada ocorrência da outra. Ex.:{' '}
              <code className="text-blue-300 bg-slate-900 border border-slate-800 px-1 py-0.5 rounded">
                (0,N) perto de Compra
              </code>{' '}
              = cada cliente tem de zero a muitas compras.
            </p>
          </div>
        )}

        {/* Lembrete da prova para Redes e Sistemas Distribuídos */}
        {subject.id === 'redes-sistemas-distribuidos' && (
          <div className="mt-8 sm:mt-10 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start sm:items-center gap-3 text-xs text-cyan-300">
            <Info size={18} className="text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong className="text-white">Cola Rápida do Prof. Fábio:</strong>{' '}
              OSI = 7 camadas | TCP/IP didático = 5 | Bits (Física) - Quadros (Enlace) - Pacotes (Rede) - Segmentos (Transporte) | Roteador = interliga redes | Switch = mesma rede | Privados: 10.x, 172.16-31.x, 192.168.x. Cuidado: 192.165 e 172.32 são PÚBLICOS!
            </p>
          </div>
        )}
      </main>

      {/* Rodapé Minimalista com Safe Area */}
      <footer className="w-full border-t border-white/[0.06] py-4 text-center text-xs text-zinc-500 pb-safe">
        Portal de Estudos • {subject.title} • Ciclo {subject.semester}
      </footer>
    </div>
  );
};
