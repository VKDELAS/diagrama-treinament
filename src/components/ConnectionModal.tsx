import React, { useState } from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import type { EdgeType } from '../types';
import { ArrowRight, ArrowLeftRight, Check, X, Link2, Sparkles } from 'lucide-react';

export const ConnectionModal: React.FC = () => {
  const {
    connectionDialog,
    closeConnectDialog,
    confirmConnection,
    nodes,
    currentExercise,
  } = useDiagramStore();

  const [selectedType, setSelectedType] = useState<EdgeType>('associacao');
  const [isInverted, setIsInverted] = useState(false);

  if (!connectionDialog || !connectionDialog.isOpen) {
    return null;
  }

  const rawSource = nodes.find((n) => n.id === connectionDialog.sourceId);
  const rawTarget = nodes.find((n) => n.id === connectionDialog.targetId);

  const sourceNode = isInverted ? rawTarget : rawSource;
  const targetNode = isInverted ? rawSource : rawTarget;

  const sourceLabel = sourceNode?.data.label || 'Origem';
  const targetLabel = targetNode?.data.label || 'Destino';
  const sourceType = sourceNode?.data.tipo;
  const targetType = targetNode?.data.tipo;

  // Se for entre ator e caso de uso, sugerir associação simples por padrão
  // Se for entre 2 casos de uso, sugerir include ou extend
  const isActorUseCase =
    (sourceType === 'ator' && targetType === 'casoDeUso') ||
    (sourceType === 'casoDeUso' && targetType === 'ator');

  const handleConfirm = () => {
    confirmConnection(selectedType, isInverted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-lg text-blue-400">
              <Link2 size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Criar Relacionamento UML
              </h2>
              <p className="text-xs text-slate-400">
                Selecione o tipo de relação e a direção adequada
              </p>
            </div>
          </div>
          <button
            onClick={closeConnectDialog}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Visualizador de Direção (Origem -> Destino) */}
        <div className="mt-4 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
          {/* Origem */}
          <div className="flex-1 text-center bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-700">
            <span className="block text-[10px] uppercase font-bold text-cyan-400 mb-0.5">
              Origem ({sourceType === 'ator' ? 'Ator' : 'Caso de Uso'})
            </span>
            <span className="text-sm font-semibold text-white truncate block">
              {sourceLabel}
            </span>
          </div>

          {/* Seta e Botão de Inverter */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setIsInverted(!isInverted)}
              title="Inverter direção da relação"
              className="p-1.5 text-xs bg-slate-800 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all flex items-center gap-1 font-mono"
            >
              <ArrowLeftRight size={14} />
              <span className="text-[10px]">Inverter</span>
            </button>
            <ArrowRight size={16} className="text-slate-500" />
          </div>

          {/* Destino */}
          <div className="flex-1 text-center bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-700">
            <span className="block text-[10px] uppercase font-bold text-blue-400 mb-0.5">
              Destino ({targetType === 'ator' ? 'Ator' : 'Caso de Uso'})
            </span>
            <span className="text-sm font-semibold text-white truncate block">
              {targetLabel}
            </span>
          </div>
        </div>

        {/* Seleção do Tipo de Relação */}
        <div className="mt-4 space-y-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tipo de Relacionamento
          </label>

          {/* Opção: Associação Simples */}
          <div
            onClick={() => setSelectedType('associacao')}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedType === 'associacao'
                ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
            }`}
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedType === 'associacao'
                  ? 'border-blue-400 bg-blue-500 text-white'
                  : 'border-slate-600'
              }`}
            >
              {selectedType === 'associacao' && <Check size={11} strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-100">
                  Associação Simples
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                  ────
                </span>
                {isActorUseCase && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-900/60 text-blue-300 rounded">
                    Típico Ator ↔ Caso de Uso
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Linha sólida sem estereótipo. Liga o ator ao caso de uso que ele executa.
              </p>
            </div>
          </div>

          {/* Opção: <<include>> */}
          <div
            onClick={() => setSelectedType('include')}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedType === 'include'
                ? 'bg-sky-950/40 border-sky-500 ring-1 ring-sky-500'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
            }`}
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedType === 'include'
                  ? 'border-sky-400 bg-sky-500 text-slate-950'
                  : 'border-slate-600'
              }`}
            >
              {selectedType === 'include' && <Check size={11} strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-sky-300 font-mono">
                  &lt;&lt;include&gt;&gt;
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-sky-950 border border-sky-800 text-sky-300 rounded font-mono">
                  -- - - &gt;
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-sky-900/50 text-sky-200 rounded font-medium">
                  Obrigatório / Sempre
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                A execução de <strong className="text-slate-200">{sourceLabel}</strong>{' '}
                obrigatoriamente inclui <strong className="text-slate-200">{targetLabel}</strong>.
              </p>
            </div>
          </div>

          {/* Opção: <<extend>> */}
          <div
            onClick={() => setSelectedType('extend')}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedType === 'extend'
                ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
            }`}
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                selectedType === 'extend'
                  ? 'border-purple-400 bg-purple-500 text-white'
                  : 'border-slate-600'
              }`}
            >
              {selectedType === 'extend' && <Check size={11} strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-purple-300 font-mono">
                  &lt;&lt;extend&gt;&gt;
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-950 border border-purple-800 text-purple-300 rounded font-mono">
                  -- - - &gt;
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-900/50 text-purple-200 rounded font-medium">
                  Opcional / Se / Caso
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                <strong className="text-slate-200">{sourceLabel}</strong> estende{' '}
                <strong className="text-slate-200">{targetLabel}</strong> sob condições
                específicas (opcional).
              </p>
            </div>
          </div>
        </div>

        {/* Dica do Exercício */}
        {currentExercise?.regra && (
          <div className="mt-3.5 px-3 py-2 bg-slate-950/90 border border-slate-800 rounded-lg flex items-center gap-2 text-xs text-amber-300/90">
            <Sparkles size={14} className="shrink-0 text-amber-400" />
            <span>{currentExercise.regra}</span>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={closeConnectDialog}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Check size={16} />
            Confirmar Conexão
          </button>
        </div>
      </div>
    </div>
  );
};
