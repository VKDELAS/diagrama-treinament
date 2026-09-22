import React from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import { BookOpen, Sparkles, X } from 'lucide-react';

export const ExercisePrompt: React.FC = () => {
  const { currentExercise, showExercisePrompt, toggleExercisePrompt } =
    useDiagramStore();

  if (!showExercisePrompt) {
    return null;
  }

  // Realçar palavras-chave no enunciado (obrigatoriamente, opcionalmente, caso, se, sempre)
  const formatEnunciado = (text: string) => {
    const keywords = [
      'obrigatoriamente',
      'obrigatório',
      'sempre',
      'opcionalmente',
      'opcional',
      'caso',
      'se',
    ];

    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (
        lower === 'obrigatoriamente' ||
        lower === 'obrigatório' ||
        lower === 'sempre'
      ) {
        return (
          <span
            key={i}
            className="px-1 py-0.5 rounded bg-sky-950/80 border border-sky-600/50 text-sky-300 font-semibold underline decoration-sky-400 decoration-1"
            title="Pista forte para <<include>>"
          >
            {part}
          </span>
        );
      }
      if (
        lower === 'opcionalmente' ||
        lower === 'opcional' ||
        lower === 'caso' ||
        lower === 'se'
      ) {
        return (
          <span
            key={i}
            className="px-1 py-0.5 rounded bg-purple-950/80 border border-purple-600/50 text-purple-300 font-semibold underline decoration-purple-400 decoration-1"
            title="Pista forte para <<extend>>"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 shadow-lg px-4 py-3 z-30 transition-all animate-in slide-in-from-top-2 duration-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Enunciado e Problema */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 bg-blue-500/20 text-blue-400 rounded">
              <BookOpen size={14} />
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {currentExercise.titulo}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {currentExercise.categoria}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {formatEnunciado(currentExercise.enunciado)}
          </p>
        </div>

        {/* Regra de Ouro em Destaque */}
        <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-950/80 border border-amber-500/30 p-2.5 rounded-xl shadow-inner">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles size={14} className="text-amber-400 shrink-0" />
            <span>Regra de Ouro:</span>
          </div>
          <div className="text-[11px] text-slate-300 flex flex-wrap gap-2">
            <span className="text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/60 font-mono">
              "sempre / obrigatoriamente" → &lt;&lt;include&gt;&gt;
            </span>
            <span className="text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/60 font-mono">
              "caso / se / opcional" → &lt;&lt;extend&gt;&gt;
            </span>
          </div>

          <button
            onClick={toggleExercisePrompt}
            title="Ocultar para liberar espaço"
            className="self-end sm:self-auto p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
