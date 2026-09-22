import React, { useState } from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import { User, CircleDot, Brain, Heart } from 'lucide-react';
import type { NodeType } from '../types';
import { HumorousClueModal } from './HumorousClueModal';

export const PieceTray: React.FC = () => {
  const { addNode, currentExercise, nodes } = useDiagramStore();
  const [isClueModalOpen, setIsClueModalOpen] = useState(false);
  const [showPistasBar, setShowPistasBar] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    tipo: NodeType,
    label?: string
  ) => {
    e.dataTransfer.setData('application/reactflow/type', tipo);
    if (label) {
      e.dataTransfer.setData('application/reactflow/label', label);
    }
    e.dataTransfer.effectAllowed = 'move';
  };

  // Termos sugeridos presentes no gabarito/enunciado
  const atoresDisponiveis = currentExercise?.pecas.atores || [];
  const casosDisponiveis = currentExercise?.pecas.casosDeUso || [];

  // Checar quais termos já estão no canvas
  const labelsNoCanvas = new Set(
    nodes.map((n) => (n.data.label || '').trim().toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-slate-900/98 border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] px-3 sm:px-5 py-2.5 z-30 flex flex-col gap-2">
        {/* Linha Principal de Peças e Ações */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Peças Genéricas (Mecânica brModelo: solte e renomeie) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
            {/* Peça Genérica: Ator */}
            <button
              draggable
              onDragStart={(e) => handleDragStart(e, 'ator')}
              onClick={() => addNode('ator')}
              title="Clique ou arraste para adicionar um Ator"
              className="flex-1 sm:flex-initial group flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/90 hover:bg-blue-600/20 active:bg-blue-600/30 border border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer hover:scale-105 transition-all shadow-md select-none touch-manipulation min-h-[44px]"
            >
              <div className="p-1 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <User size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-200 group-hover:text-white flex items-center gap-1">
                  + Ator
                </span>
                <span className="text-[10px] text-slate-400 hidden xs:inline">
                  Boneco UML
                </span>
              </div>
            </button>

            {/* Peça Genérica: Caso de Uso */}
            <button
              draggable
              onDragStart={(e) => handleDragStart(e, 'casoDeUso')}
              onClick={() => addNode('casoDeUso')}
              title="Clique ou arraste para adicionar um Caso de Uso"
              className="flex-1 sm:flex-initial group flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/90 hover:bg-cyan-600/20 active:bg-cyan-600/30 border border-slate-700 hover:border-cyan-500 rounded-xl cursor-pointer hover:scale-105 transition-all shadow-md select-none touch-manipulation min-h-[44px]"
            >
              <div className="p-1 bg-cyan-500/20 text-cyan-400 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <CircleDot size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-200 group-hover:text-white flex items-center gap-1">
                  + Caso de Uso
                </span>
                <span className="text-[10px] text-slate-400 hidden xs:inline">
                  Elipse UML
                </span>
              </div>
            </button>
          </div>

          {/* Botão de Dica / Colinha Zoeira e Chips de Pistas */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => {
                setIsClueModalOpen(true);
                setShowPistasBar(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-sm cursor-pointer min-h-[40px] touch-manipulation animate-pulse"
              title="Pedir colinha com zoeira e dicas do exercício"
            >
              <Brain size={15} className="text-amber-400" />
              <span>🤯 Pedir Colinha</span>
            </button>

            {/* Chips de Pistas (aparecem se o usuário pedir ou expandir) */}
            {showPistasBar && (
              <div className="hidden lg:flex items-center gap-1.5 animate-in fade-in duration-200">
                {atoresDisponiveis.map((ator) => {
                  const jaUsado = labelsNoCanvas.has(ator.trim().toLowerCase());
                  return (
                    <button
                      key={ator}
                      onClick={() => addNode('ator', undefined, ator)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                        jaUsado
                          ? 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-blue-950/40 border-blue-800/60 text-blue-300 hover:bg-blue-900/60 hover:border-blue-500 cursor-pointer'
                      }`}
                    >
                      <User size={10} className="text-blue-400" />
                      <span>{ator}</span>
                      {jaUsado && <span className="text-[9px] text-emerald-400 ml-0.5">✓</span>}
                    </button>
                  );
                })}

                {casosDisponiveis.map((caso) => {
                  const jaUsado = labelsNoCanvas.has(caso.trim().toLowerCase());
                  return (
                    <button
                      key={caso}
                      onClick={() => addNode('casoDeUso', undefined, caso)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                        jaUsado
                          ? 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-cyan-950/40 border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-500 cursor-pointer'
                      }`}
                    >
                      <CircleDot size={10} className="text-cyan-400" />
                      <span>{caso}</span>
                      {jaUsado && <span className="text-[9px] text-emerald-400 ml-0.5">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Rodapé de Créditos Solicitado pelo Usuário */}
        <div className="pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <span>Desenvolvido com</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 shrink-0" />
            <span>por</span>
            <strong className="text-slate-200 font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Enzzo Pontes Baraldo
            </strong>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 shrink-0">
            ADS • 2º Semestre
          </span>
        </div>
      </div>

      {/* Modal da Zoeira / Colinha */}
      <HumorousClueModal
        isOpen={isClueModalOpen}
        onClose={() => setIsClueModalOpen(false)}
      />
    </>
  );
};
