import React, { useState } from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileCode2,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import { ClassSummaryModal } from './ClassSummaryModal';
import { ExercisePickerModal } from './ExercisePickerModal';

export const Header: React.FC = () => {
  const {
    exercises,
    currentExerciseIndex,
    currentExercise,
    setExercise,
    completedExercises,
    showExercisePrompt,
    toggleExercisePrompt,
  } = useDiagramStore();

  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isCurrentCompleted = completedExercises.includes(currentExercise.id);
  const totalExercises = exercises.length;

  return (
    <>
      <header className="w-full min-h-[52px] h-14 bg-slate-900/98 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between z-40 select-none backdrop-blur-md gap-2">
        {/* Logo e Nome da Aplicação */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold shrink-0">
            <FileCode2 size={18} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Treino UML
              </h1>
              <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-blue-950 border border-blue-800/80 text-blue-400 font-semibold hidden xs:inline">
                ADS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">
              Modelagem interativa no estilo brModelo
            </p>
          </div>
        </div>

        {/* Navegação entre Exercícios (1 / 52 com Picker) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-950/80 border border-slate-800 px-1.5 sm:px-2 py-1 rounded-xl">
          <button
            onClick={() => setExercise(currentExerciseIndex - 1)}
            disabled={currentExerciseIndex === 0}
            title="Exercício anterior"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors cursor-pointer touch-manipulation"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Botão que abre a lista completa de 52 exercícios */}
          <button
            onClick={() => setIsPickerOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-800/90 text-slate-200 transition-all cursor-pointer"
            title="Clique para ver todos os exercícios"
          >
            <span className="text-xs font-mono font-bold text-blue-400">
              {currentExerciseIndex + 1}/{totalExercises}
            </span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline truncate max-w-[120px] md:max-w-[160px]">
              {currentExercise.titulo}
            </span>
            <span className="text-[10px] text-slate-500">▼</span>
            {isCurrentCompleted && (
              <span className="flex items-center text-emerald-400 ml-0.5" title="Concluído">
                <CheckCircle2 size={13} />
              </span>
            )}
          </button>

          <button
            onClick={() => setExercise(currentExerciseIndex + 1)}
            disabled={currentExerciseIndex === exercises.length - 1}
            title="Próximo exercício"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors cursor-pointer touch-manipulation"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Ações da Direita: Resumo da Aula & Toggle Enunciado */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Botão Resumo da Aula (Solicitado pelo usuário) */}
          <button
            onClick={() => setIsSummaryOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer min-h-[36px] touch-manipulation"
            title="Abrir o resumo completo da aula de hoje"
          >
            <BookOpen size={14} className="shrink-0" />
            <span className="hidden xs:inline">Resumo da Aula</span>
            <span className="xs:hidden">Resumo</span>
          </button>

          {/* Botão Ver/Ocultar Enunciado */}
          <button
            onClick={toggleExercisePrompt}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer min-h-[36px] touch-manipulation ${
              showExercisePrompt
                ? 'bg-blue-950/70 border-blue-700 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={showExercisePrompt ? 'Ocultar enunciado' : 'Mostrar enunciado'}
          >
            {showExercisePrompt ? <EyeOff size={14} /> : <Eye size={14} />}
            <span className="hidden lg:inline">
              {showExercisePrompt ? 'Ocultar' : 'Enunciado'}
            </span>
          </button>
        </div>
      </header>

      {/* Modais de Resumo e Picker */}
      <ClassSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
      <ExercisePickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
      />
    </>
  );
};
