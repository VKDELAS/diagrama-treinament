import React from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trophy,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const {
    validationResult,
    dismissValidation,
    setExercise,
    currentExerciseIndex,
    exercises,
  } = useDiagramStore();

  if (!validationResult) return null;

  const { isComplete, pontosObtidos, totalPontos, detalhes } =
    validationResult;

  const hasNextExercise = currentExerciseIndex < exercises.length - 1;

  const handleNext = () => {
    dismissValidation();
    if (hasNextExercise) {
      setExercise(currentExerciseIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Topo do Feedback */}
        <div
          className={`p-5 flex items-center justify-between border-b ${
            isComplete
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-slate-800/80 border-slate-700 text-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isComplete
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-amber-500/20 border-amber-400 text-amber-300'
              }`}
            >
              {isComplete ? <Trophy size={24} /> : <AlertTriangle size={24} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {isComplete
                  ? 'Diagrama 100% Correto!'
                  : 'Resultado da Verificação'}
              </h2>
              <p className="text-xs text-slate-300">
                Pontuação:{' '}
                <strong className={isComplete ? 'text-emerald-300' : 'text-amber-300'}>
                  {pontosObtidos} / {totalPontos}
                </strong>{' '}
                itens corretos ({Math.round((pontosObtidos / totalPontos) * 100)}%)
              </p>
            </div>
          </div>

          <button
            onClick={dismissValidation}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de Diagnósticos e Detalhes */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-800/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Detalhamento por Elemento:
          </p>

          {detalhes.map((det, idx) => (
            <div key={idx} className="pt-2.5 flex items-start gap-2.5 text-xs">
              <div className="mt-0.5 shrink-0">
                {det.tipo === 'sucesso' && (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                )}
                {det.tipo === 'erro' && (
                  <XCircle size={16} className="text-rose-400" />
                )}
                {det.tipo === 'aviso' && (
                  <AlertTriangle size={16} className="text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={
                    det.tipo === 'sucesso'
                      ? 'text-slate-200'
                      : det.tipo === 'erro'
                      ? 'text-rose-200 font-medium'
                      : 'text-amber-200'
                  }
                >
                  {det.mensagem}
                </span>
                {det.dica && (
                  <p className="text-[11px] text-slate-400 mt-1 pl-2 border-l-2 border-slate-700 italic flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-400 shrink-0" />
                    <span>{det.dica}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé de Ações */}
        <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={dismissValidation}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            Ver no Canvas (Cores Destacadas)
          </button>

          {isComplete && hasNextExercise ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Próximo Exercício</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={dismissValidation}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
