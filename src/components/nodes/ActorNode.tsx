import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { CustomNodeData } from '../../types';
import { useDiagramStore } from '../../store/useDiagramStore';
import { Pencil, Trash2, Check, Sparkles } from 'lucide-react';

export const ActorNode: React.FC<NodeProps<Node<CustomNodeData>>> = ({
  id,
  data,
  selected,
}) => {
  const {
    updateNodeLabel,
    deleteNode,
    connectMode,
    handleNodeClickInConnectMode,
    currentExercise,
  } = useDiagramStore();

  const [isEditing, setIsEditing] = useState(Boolean(data.isEditing));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label || 'Novo Ator');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    setShowSuggestions(false);
    const trimmed = tempLabel.trim();
    updateNodeLabel(id, trimmed || 'Ator Sem Nome');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setShowSuggestions(false);
      setTempLabel(data.label || 'Novo Ator');
    }
  };

  const isConnectSource =
    connectMode.active && connectMode.sourceNodeId === id;
  const isConnectActive = connectMode.active;

  // Status visual
  let statusBorder = 'border-slate-600 hover:border-blue-400';
  let badgeBg = 'bg-slate-800 text-slate-200 border-slate-700';

  if (data.status === 'correct') {
    statusBorder = 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500/40';
    badgeBg = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60';
  } else if (data.status === 'incorrect') {
    statusBorder = 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.35)] ring-2 ring-rose-500/40';
    badgeBg = 'bg-rose-950/80 text-rose-300 border-rose-500/60';
  } else if (isConnectSource) {
    statusBorder = 'border-cyan-400 ring-4 ring-cyan-400/40 animate-pulse';
  } else if (selected) {
    statusBorder = 'border-blue-500 ring-2 ring-blue-500/30';
  }

  return (
    <div
      onClick={(e) => {
        if (connectMode.active) {
          e.stopPropagation();
          handleNodeClickInConnectMode(id);
        }
      }}
      className={`group relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 select-none cursor-pointer ${statusBorder} ${
        isConnectActive ? 'hover:scale-105' : ''
      }`}
      style={{ minWidth: '110px' }}
    >
      {/* Handles de Conexão UML */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-t"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-s"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-t"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-s"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-t"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-s"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-t"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-s"
        className="!w-2.5 !h-2.5 !bg-blue-400 !border-slate-900 transition-opacity"
      />

      {/* Botões de Ação Rápida (Hover) */}
      {!connectMode.active && (
        <div className="absolute -top-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900/90 border border-slate-700 rounded-md px-1 py-0.5 shadow-lg z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            title="Renomear Ator (ou dê 2 cliques)"
            className="p-1 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(id);
            }}
            title="Excluir Ator"
            className="p-1 text-slate-300 hover:text-rose-400 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Ícone de Ator UML Stickman */}
      <div className="relative mb-1 flex items-center justify-center">
        <svg
          width="36"
          height="48"
          viewBox="0 0 36 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        >
          {/* Cabeça */}
          <circle cx="18" cy="8" r="6" stroke="currentColor" strokeWidth="2.4" fill="#0f172a" />
          {/* Tronco */}
          <line x1="18" y1="14" x2="18" y2="30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          {/* Braços */}
          <line x1="6" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          {/* Perna Esquerda */}
          <line x1="18" y1="30" x2="9" y2="44" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          {/* Perna Direita */}
          <line x1="18" y1="30" x2="27" y2="44" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>

        {isConnectSource && (
          <span className="absolute -top-2 -right-3 px-1.5 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full uppercase tracking-wider">
            Origem
          </span>
        )}
      </div>

      {/* Rótulo / Input de Renomear (brModelo Style) */}
      {isEditing ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-1.5 z-20"
        >
          <div className="flex items-center gap-1 bg-slate-900 border border-blue-500 rounded-md px-1.5 py-0.5 shadow-xl">
            <input
              ref={inputRef}
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              placeholder="Nome do Ator..."
              className="bg-transparent text-white text-xs font-semibold text-center focus:outline-none w-28 px-1 py-0.5"
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="text-emerald-400 hover:text-emerald-300 p-0.5"
              title="Confirmar nome"
            >
              <Check size={14} />
            </button>
          </div>

          {/* Botão de Sugestões (fechado por padrão, abre com animação) */}
          {currentExercise?.pecas.atores && currentExercise.pecas.atores.length > 0 && (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setShowSuggestions((prev) => !prev);
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 hover:bg-blue-900/60 border border-slate-700 hover:border-blue-500 text-[10px] text-blue-300 transition-all shadow cursor-pointer"
              >
                <Sparkles size={10} className="text-amber-400" />
                <span>Sugestões</span>
                <span className={`text-[9px] transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {showSuggestions && (
                <div className="flex flex-wrap justify-center gap-1 max-w-[170px] bg-slate-950/95 p-1.5 rounded-xl border border-blue-500/60 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-30">
                  {currentExercise.pecas.atores.map((ator) => (
                    <button
                      key={ator}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTempLabel(ator);
                        updateNodeLabel(id, ator);
                        setIsEditing(false);
                        setShowSuggestions(false);
                      }}
                      className="px-2 py-1 text-[11px] font-semibold bg-blue-900/80 hover:bg-blue-600 text-white rounded-md transition-all active:scale-95 shadow cursor-pointer text-center"
                    >
                      {ator}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className={`px-2.5 py-1 rounded-md border text-xs font-bold tracking-wide transition-all text-center max-w-[130px] break-words shadow-sm ${badgeBg}`}
          title="Dê dois cliques para renomear este Ator"
        >
          {data.label || 'Novo Ator'}
        </div>
      )}
    </div>
  );
};
