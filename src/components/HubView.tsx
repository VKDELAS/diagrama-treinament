import React, { useState, useMemo } from 'react';
import {
  Database,
  Code2,
  Network,
  Cpu,
  BookPlus,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Clock,
  Layers3,
  Search,
} from 'lucide-react';
import { HubHeader } from './HubHeader';
import { DEFAULT_SUBJECTS } from '../data/subjects';
import type { SubjectItem, AppModule } from '../types/navigation';

interface HubViewProps {
  onSelectSubject: (subject: SubjectItem) => void;
  onQuickLaunchModule: (subject: SubjectItem, module: AppModule) => void;
}

export const HubView: React.FC<HubViewProps> = ({
  onSelectSubject,
  onQuickLaunchModule,
}) => {
  const subjects = DEFAULT_SUBJECTS;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'upcoming'>('all');

  // Ícones por ID ou nome
  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'banco-de-dados':
        return Database;
      case 'eng-software':
        return Code2;
      case 'estrutura-dados':
        return Network;
      case 'poo-programacao':
        return Cpu;
      default:
        return BookPlus;
    }
  };

  // Filtragem com busca
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesFilter =
        selectedFilter === 'all' || subject.status === selectedFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        subject.title.toLowerCase().includes(q) ||
        subject.code.toLowerCase().includes(q) ||
        subject.category.toLowerCase().includes(q) ||
        subject.description.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [subjects, selectedFilter, searchQuery]);

  const activeCount = subjects.filter((s) => s.status === 'available').length;
  const totalCount = subjects.length;

  return (
    <div className="w-screen h-screen overflow-y-auto bg-[#080b11]/75 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10">
      {/* Header Minimalista Estilo Linear/Raycast */}
      <HubHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCount={activeCount}
        totalCount={totalCount}
      />

      {/* Conteúdo Principal do Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-6 sm:py-10 flex flex-col">
        {/* Hero Minimalista com animação de entrada */}
        <div className="max-w-3xl mb-6 sm:mb-9 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-2.5 shadow-sm">
            <Layers3 size={13} className="text-blue-400" />
            <span>Grade Curricular ADS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Matérias & Disciplinas
          </h1>
          <p className="mt-2 text-xs sm:text-base text-zinc-400 leading-relaxed">
            Selecione uma matéria para acessar seus flashcards exclusivos, resumo
            teórico, simulado oficial e exercícios práticos.
          </p>
        </div>

        {/* Barra de Filtros Segmentados - 100% Mobile Friendly com scroll suave */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-white/[0.06] overflow-x-auto no-scrollbar">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] shrink-0">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer touch-manipulation ${
                selectedFilter === 'all'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Todas ({totalCount})
            </button>
            <button
              onClick={() => setSelectedFilter('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer touch-manipulation flex items-center gap-1.5 ${
                selectedFilter === 'available'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Disponíveis ({activeCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer touch-manipulation ${
                selectedFilter === 'upcoming'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Em Breve ({totalCount - activeCount})
            </button>
          </div>

          <span className="text-xs text-zinc-500 hidden sm:inline shrink-0">
            Mostrando {filteredSubjects.length} {filteredSubjects.length === 1 ? 'matéria' : 'matérias'}
          </span>
        </div>

        {/* Grade de Matérias com Animação Fluida */}
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-16 px-4 border border-dashed border-white/[0.08] rounded-3xl bg-white/[0.01] animate-fade-in">
            <Search size={32} className="mx-auto text-zinc-500 mb-3" />
            <h3 className="text-base font-semibold text-white">
              Nenhuma matéria encontrada
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Não encontramos resultados para &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-xs font-medium text-zinc-200 transition-all cursor-pointer touch-manipulation"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredSubjects.map((subject, index) => {
              const Icon = getSubjectIcon(subject.id);
              const isAvailable = subject.status === 'available';

              return (
                <div
                  key={subject.id}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className={`group relative text-left bg-gradient-to-br ${subject.gradient} border border-white/[0.08] rounded-3xl p-5 sm:p-7 transition-all duration-300 animate-fade-in ${
                    isAvailable
                      ? `${subject.borderHover} hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`
                      : 'opacity-85 hover:border-white/[0.15]'
                  } flex flex-col justify-between`}
                >
                  <div>
                    {/* Topo do Card de Matéria */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center ${subject.iconBg} shadow-inner transition-transform duration-300 group-hover:scale-105`}
                        >
                          <Icon size={20} className="sm:size-[22px]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-zinc-400">
                              {subject.code}
                            </span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                              {subject.semester}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-500 font-medium">
                            {subject.category}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Disponível</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 shrink-0">
                          <Clock size={11} />
                          <span>Em Breve</span>
                        </span>
                      )}
                    </div>

                    {/* Título e Descrição */}
                    <h2
                      onClick={() => onSelectSubject(subject)}
                      className="text-base sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {subject.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {subject.description}
                    </p>

                    {/* Prévia das ferramentas exclusivas desta matéria */}
                    <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold block mb-2">
                        Módulos Exclusivos desta Matéria:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {subject.modules.map((mod) => (
                          <span
                            key={mod.id}
                            className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                              isAvailable
                                ? 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                                : 'bg-white/[0.02] border-white/[0.04] text-zinc-500'
                            }`}
                          >
                            {mod.id === 'flashcards' && '🃏 Flashcards'}
                            {mod.id === 'resumo' && '📘 Resumo'}
                            {mod.id === 'simulado' && '🏆 Simulado'}
                            {mod.id === 'diagramas' && '📐 Prática'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Card com Ações Otimizadas para Celular */}
                  <div className="mt-6 pt-4 border-t border-white/[0.07] flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectSubject(subject)}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-xl text-xs font-semibold transition-all cursor-pointer touch-manipulation active:scale-95 ${
                        isAvailable
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]'
                      }`}
                    >
                      <span>{isAvailable ? 'Entrar na Matéria' : 'Ver Detalhes'}</span>
                      <ArrowRight size={14} />
                    </button>

                    {/* Atalhos Rápidos se disponível com toque confortável */}
                    {isAvailable && (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'flashcards')}
                          className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation"
                          title="Abrir Flashcards desta matéria"
                          aria-label="Abrir Flashcards"
                        >
                          <Sparkles size={16} className="text-indigo-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'simulado')}
                          className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation"
                          title="Abrir Simulado desta matéria"
                          aria-label="Abrir Simulado"
                        >
                          <Award size={16} className="text-emerald-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'resumo')}
                          className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation"
                          title="Abrir Resumo Teórico desta matéria"
                          aria-label="Abrir Resumo Teórico"
                        >
                          <BookOpen size={16} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'diagramas')}
                          className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-95 border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation"
                          title="Abrir Treino de Diagramas desta matéria"
                          aria-label="Abrir Treino de Diagramas"
                        >
                          <Layers size={16} className="text-amber-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Rodapé Minimalista com Safe Area */}
      <footer className="w-full border-t border-white/[0.06] py-5 px-4 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2 pb-safe">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-400">NEXUS</span>
          <span className="text-zinc-600">•</span>
          <span>Portal de Estudos Multi-Matérias</span>
        </div>
        <p className="text-[11px] sm:text-xs">Desenvolvido para máxima fixação e preparação de provas</p>
      </footer>
    </div>
  );
};
