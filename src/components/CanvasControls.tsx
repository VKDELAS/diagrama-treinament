import React from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  Link2,
  CheckCircle,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';

export const CanvasControls: React.FC = () => {
  const {
    connectMode,
    startConnectMode,
    cancelConnectMode,
    validateCurrentDiagram,
    clearCanvas,
    nodes,
  } = useDiagramStore();

  const hasNodes = nodes.length > 0;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
      {/* Barra de Ações Principais */}
      <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md">
        {/* Botão Conectar */}
        <button
          onClick={connectMode.active ? cancelConnectMode : startConnectMode}
          disabled={!hasNodes}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer touch-manipulation ${
            connectMode.active
              ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 font-bold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-800'
          }`}
          title="Ativar modo de conexão: clique na origem e depois no destino"
        >
          <Link2 size={15} />
          <span>{connectMode.active ? 'Conectando...' : 'Conectar'}</span>
        </button>

        <div className="h-5 w-[1px] bg-slate-700/80 mx-0.5" />

        {/* Botão Verificar */}
        <button
          onClick={validateCurrentDiagram}
          disabled={!hasNodes}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer touch-manipulation"
          title="Verificar o diagrama contra o gabarito"
        >
          <CheckCircle size={15} />
          <span>Verificar</span>
        </button>

        <div className="h-5 w-[1px] bg-slate-700/80 mx-0.5" />

        {/* Botão Limpar Canvas */}
        <button
          onClick={clearCanvas}
          disabled={!hasNodes}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 border border-transparent hover:border-rose-500/40 rounded-xl text-xs font-medium transition-all disabled:opacity-40 disabled:hover:bg-slate-800 disabled:hover:text-slate-400 cursor-pointer touch-manipulation"
          title="Limpar todos os elementos do exercício atual"
        >
          <RotateCcw size={14} />
          <span>Limpar</span>
        </button>
      </div>

      {/* Banner de Ajuda quando Modo Conectar está Ativo */}
      {connectMode.active && (
        <div className="pointer-events-auto flex items-center gap-2 bg-cyan-950/95 border border-cyan-500 text-cyan-200 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-xl animate-in fade-in duration-150">
          <Sparkles size={14} className="text-cyan-400 animate-spin" />
          <span>
            {connectMode.sourceNodeId
              ? 'Agora clique na peça de DESTINO'
              : 'Clique na 1ª peça (ORIGEM)'}
          </span>
          <button
            onClick={cancelConnectMode}
            className="p-0.5 hover:bg-cyan-900 rounded-full text-cyan-300 hover:text-white ml-1"
            title="Cancelar conexão"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
