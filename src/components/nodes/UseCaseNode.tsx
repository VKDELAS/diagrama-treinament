import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { CustomNodeData } from '../../types';
import { useDiagramStore } from '../../store/useDiagramStore';
import { Pencil, Trash2, Check, Sparkles } from 'lucide-react';

export const UseCaseNode: React.FC<NodeProps<Node<CustomNodeData>>> = ({
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
  const [tempLabel, setTempLabel] = useState(data.label || 'Novo Caso de Uso');
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
    updateNodeLabel(id, trimmed || 'Caso de Uso Sem Nome');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setShowSuggestions(false);
      setTempLabel(data.label || 'Novo Caso de Uso');
    }
  };

  const isConnectSource =
    connectMode.active && connectMode.sourceNodeId === id;
  const isConnectActive = connectMode.active;

  // Status visual para a elipse UML
  let borderStyle = 'border-slate-500 hover:border-cyan-400 bg-slate-900/90 text-slate-100';

  if (data.status === 'correct') {
    borderStyle =
      'border-emerald-500 bg-emerald-950/70 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/40';
  } else if (data.status === 'incorrect') {
    borderStyle =
      'border-rose-500 bg-rose-950/70 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-2 ring-rose-500/40';
  } else if (isConnectSource) {
    borderStyle = 'border-cyan-400 ring-4 ring-cyan-400/50 bg-slate-900 animate-pulse';
  } else if (selected) {
    borderStyle = 'border-cyan-400 ring-2 ring-cyan-400/30 bg-slate-900';
  }

  return (
    <div
      onClick={(e) => {
        if (connectMode.active) {
          e.stopPropagation();
          handleNodeClickInConnectMode(id);
        }
      }}
      className={`group relative flex flex-col items-center justify-center min-w-[150px] min-h-[72px] px-6 py-4 rounded-[50%/50%] border-2 transition-all duration-200 select-none cursor-pointer shadow-md ${borderStyle} ${
        isConnectActive ? 'hover:scale-105' : ''
      }`}
    >
      {/* Handles UML nos 4 pontos cardeais da elipse */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-t"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-s"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-t"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-s"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-t"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-s"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-t"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-s"
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950 transition-transform"
      />

      {/* Botões de Ação Rápida no Hover */}
      {!connectMode.active && (
        <div className="absolute -top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900/95 border border-slate-700 rounded-md px-1 py-0.5 shadow-lg z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            title="Renomear Caso de Uso (ou dê 2 cliques)"
            className="p-1 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(id);
            }}
            title="Excluir Caso de Uso"
            className="p-1 text-slate-300 hover:text-rose-400 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {isConnectSource && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
          Origem
        </span>
      )}

      {/* Rótulo / Input de Renomear (brModelo Style) */}
      {isEditing ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-1.5 z-20"
        >
          <div className="flex items-center gap-1 bg-slate-900 border border-cyan-500 rounded-md px-2 py-1 shadow-xl">
            <input
              ref={inputRef}
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              placeholder="Nome do Caso de Uso..."
              className="bg-transparent text-white text-xs font-semibold text-center focus:outline-none w-36 px-1 py-0.5"
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="text-emerald-400 hover:text-emerald-300 p-0.5"
              title="Confirmar"
            >
              <Check size={14} />
            </button>
          </div>

          {/* Botão de Sugestões (fechado por padrão, abre com animação) */}
          {currentExercise?.pecas.casosDeUso && currentExercise.pecas.casosDeUso.length > 0 && (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setShowSuggestions((prev) => !prev);
                }}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500 text-[10px] text-cyan-300 transition-all shadow cursor-pointer"
              >
                <Sparkles size={10} className="text-amber-400" />
                <span>Sugestões</span>
                <span className={`text-[9px] transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {showSuggestions && (
                <div className="flex flex-wrap justify-center gap-1 max-w-[210px] bg-slate-950/95 p-2 rounded-xl border border-cyan-500/60 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-30">
                  {currentExercise.pecas.casosDeUso.map((caso) => (
                    <button
                      key={caso}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTempLabel(caso);
                        updateNodeLabel(id, caso);
                        setIsEditing(false);
                        setShowSuggestions(false);
                      }}
                      className="px-2 py-1 text-[11px] font-semibold bg-cyan-950 hover:bg-cyan-700 text-cyan-100 rounded-md border border-cyan-700/60 transition-all active:scale-95 shadow cursor-pointer text-center"
                    >
                      {caso}
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
          className="text-xs font-medium text-center max-w-[170px] leading-snug px-1"
          title="Dê dois cliques para renomear este Caso de Uso"
        >
          {data.label || 'Novo Caso de Uso'}
        </div>
      )}
    </div>
  );
};
