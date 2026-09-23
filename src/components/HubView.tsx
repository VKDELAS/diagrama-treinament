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
import { AddSubjectModal } from './AddSubjectModal';
import { loadStoredSubjects, saveStoredSubjects } from '../data/subjects';
import type { SubjectItem, AppModule } from '../types/navigation';

interface HubViewProps {
  onSelectSubject: (subject: SubjectItem) => void;
  onQuickLaunchModule: (subject: SubjectItem, module: AppModule) => void;
}

export const HubView: React.FC<HubViewProps> = ({
  onSelectSubject,
  onQuickLaunchModule,
}) => {
  const [subjects, setSubjects] = useState<SubjectItem[]>(() =>
    loadStoredSubjects()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'upcoming'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  // Manipulador de adição de nova matéria
  const handleAddSubject = (newSubject: SubjectItem) => {
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveStoredSubjects(updated);
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
    <div className="w-screen h-screen overflow-y-auto bg-[#080b11] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30">
      {/* Header Minimalista Estilo Linear/Raycast */}
      <HubHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        activeCount={activeCount}
        totalCount={totalCount}
      />

      {/* Conteúdo Principal do Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col">
        {/* Hero Minimalista */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-medium mb-3">
            <Layers3 size={13} className="text-blue-400" />
            <span>Grade Curricular Unificada</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Matérias & Disciplinas
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Selecione uma matéria para acessar seus flashcards exclusivos, resumo
            teórico, simulado oficial e exercícios práticos.
          </p>
        </div>

        {/* Barra de Filtros Segmentados */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.07]">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Todas as Matérias ({totalCount})
            </button>
            <button
              onClick={() => setSelectedFilter('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === 'upcoming'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Em Breve ({totalCount - activeCount})
            </button>
          </div>

          <span className="text-xs text-zinc-500 hidden sm:inline">
            Mostrando {filteredSubjects.length} {filteredSubjects.length === 1 ? 'matéria' : 'matérias'}
          </span>
        </div>

        {/* Grade de Matérias */}
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-16 px-4 border border-dashed border-white/[0.08] rounded-3xl bg-white/[0.01]">
            <Search size={32} className="mx-auto text-zinc-500 mb-3" />
            <h3 className="text-base font-semibold text-white">
              Nenhuma matéria encontrada
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Não encontramos resultados para &quot;{searchQuery}&quot;. Tente outro termo ou cadastre uma nova matéria.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredSubjects.map((subject) => {
              const Icon = getSubjectIcon(subject.id);
              const isAvailable = subject.status === 'available';

              return (
                <div
                  key={subject.id}
                  className={`group relative text-left bg-gradient-to-br ${subject.gradient} border border-white/[0.08] rounded-3xl p-6 sm:p-7 transition-all duration-200 ${
                    isAvailable
                      ? `${subject.borderHover} hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1`
                      : 'opacity-85 hover:border-white/[0.15]'
                  } flex flex-col justify-between`}
                >
                  <div>
                    {/* Topo do Card de Matéria */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${subject.iconBg} shadow-inner transition-transform group-hover:scale-105`}
                        >
                          <Icon size={22} />
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
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Disponível</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400">
                          <Clock size={11} />
                          <span>Em Breve</span>
                        </span>
                      )}
                    </div>

                    {/* Título e Descrição */}
                    <h2
                      onClick={() => onSelectSubject(subject)}
                      className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer"
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

                  {/* Rodapé do Card com Ações */}
                  <div className="mt-6 pt-4 border-t border-white/[0.07] flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectSubject(subject)}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isAvailable
                          ? 'bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]'
                      }`}
                    >
                      <span>{isAvailable ? 'Entrar na Matéria' : 'Ver Detalhes'}</span>
                      <ArrowRight size={14} />
                    </button>

                    {/* Atalhos Rápidos se disponível */}
                    {isAvailable && (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'flashcards')}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
                          title="Abrir Flashcards desta matéria"
                        >
                          <Sparkles size={14} className="text-indigo-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'simulado')}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
                          title="Abrir Simulado desta matéria"
                        >
                          <Award size={14} className="text-emerald-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'resumo')}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
                          title="Abrir Resumo Teórico desta matéria"
                        >
                          <BookOpen size={14} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => onQuickLaunchModule(subject, 'diagramas')}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
                          title="Abrir Treino de Diagramas desta matéria"
                        >
                          <Layers size={14} className="text-amber-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Card para Adicionar Matéria Nova */}
            <div
              onClick={() => setIsAddModalOpen(true)}
              className="group relative border-2 border-dashed border-white/[0.09] hover:border-blue-500/50 bg-white/[0.01] hover:bg-white/[0.03] rounded-3xl p-6 sm:p-7 transition-all duration-200 cursor-pointer flex flex-col justify-center items-center text-center min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] group-hover:bg-blue-600/20 group-hover:border-blue-500/40 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-all mb-3 group-hover:scale-105">
                <BookPlus size={22} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Adicionar Nova Matéria
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400 max-w-xs leading-relaxed">
                Cadastre uma nova disciplina com seus próprios flashcards, resumos e simulados personalizados.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Criar Matéria</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé Minimalista */}
      <footer className="w-full border-t border-white/[0.06] py-5 px-4 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-400">NEXUS</span>
          <span className="text-zinc-600">•</span>
          <span>Portal de Estudos Multi-Matérias</span>
        </div>
        <p>Desenvolvido para máxima fixação e preparação de provas</p>
      </footer>

      {/* Modal de Adicionar Matéria */}
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSubject={handleAddSubject}
      />
    </div>
  );
};
