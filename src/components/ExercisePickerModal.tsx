import React, { useState, useMemo } from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  ListFilter,
  CheckCircle2,
  Circle,
  Search,
  X,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface ExercisePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExercisePickerModal: React.FC<ExercisePickerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    exercises,
    currentExerciseIndex,
    setExercise,
    completedExercises,
  } = useDiagramStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Categorias únicas
  const categories = useMemo(() => {
    const set = new Set<string>();
    exercises.forEach((ex) => set.add(ex.categoria));
    return ['Todos', ...Array.from(set)];
  }, [exercises]);

  // Filtragem
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchCategory =
        selectedCategory === 'Todos' || ex.categoria === selectedCategory;
      const matchSearch =
        ex.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [exercises, selectedCategory, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]">
        {/* Cabeçalho */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 border border-blue-400 text-blue-400 rounded-2xl">
              <ListFilter size={22} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Banco de Exercícios UML
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  {exercises.length} Exercícios
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Selecione qualquer exercício para treinar ou revisar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Busca e Filtro de Categorias */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 space-y-3 shrink-0">
          {/* Campo de Busca */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, tema ou palavra do problema..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Chips de Categorias com Scroll Horizontal */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Exercícios */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredExercises.map((ex) => {
            const originalIndex = exercises.findIndex((e) => e.id === ex.id);
            const isCompleted = completedExercises.includes(ex.id);
            const isCurrent = currentExerciseIndex === originalIndex;

            return (
              <div
                key={ex.id}
                onClick={() => {
                  setExercise(originalIndex);
                  onClose();
                }}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none relative ${
                  isCurrent
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/40'
                    : isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-400">
                      #{String(originalIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 truncate max-w-[120px]">
                      {ex.categoria}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                    {ex.titulo}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {ex.enunciado}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle2 size={13} />
                      <span>Concluído</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Circle size={11} />
                      <span>Pendente</span>
                    </span>
                  )}

                  <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-medium">
                    <span>Abrir</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" />
            <span>
              {completedExercises.length} de {exercises.length} concluídos
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
