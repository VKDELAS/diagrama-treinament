import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
  type Edge,
} from '@xyflow/react';
import type { CustomEdgeData } from '../../types';
import { useDiagramStore } from '../../store/useDiagramStore';
import { X } from 'lucide-react';

export const UmlEdge: React.FC<EdgeProps<Edge<CustomEdgeData>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) => {
  const { deleteEdge } = useDiagramStore();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const tipo = data?.tipo || 'associacao';
  const status = data?.status || 'neutral';

  // Cores de acordo com status de validação
  let strokeColor = '#94a3b8'; // neutro associação
  let strokeDash = undefined;
  let labelBg = 'bg-slate-900 border-slate-700 text-slate-300';
  let markerUrl = undefined;

  if (tipo === 'include') {
    strokeColor = '#38bdf8';
    strokeDash = '6, 5';
    labelBg = 'bg-sky-950/90 border-sky-600 text-sky-300';
    markerUrl = status === 'correct' ? 'url(#arrow-correct)' : status === 'incorrect' ? 'url(#arrow-incorrect)' : 'url(#arrow-include)';
  } else if (tipo === 'extend') {
    strokeColor = '#c084fc';
    strokeDash = '6, 5';
    labelBg = 'bg-purple-950/90 border-purple-600 text-purple-300';
    markerUrl = status === 'correct' ? 'url(#arrow-correct)' : status === 'incorrect' ? 'url(#arrow-incorrect)' : 'url(#arrow-extend)';
  }

  if (status === 'correct') {
    strokeColor = '#10b981';
    labelBg = 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]';
  } else if (status === 'incorrect') {
    strokeColor = '#f43f5e';
    labelBg = 'bg-rose-950/90 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse';
  } else if (selected) {
    strokeColor = '#60a5fa';
  }

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerUrl}
        style={{
          stroke: strokeColor,
          strokeWidth: selected ? 2.8 : 2,
          strokeDasharray: strokeDash,
          transition: 'stroke 0.2s, stroke-width 0.2s',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="group flex items-center gap-1"
        >
          {tipo !== 'associacao' && (
            <div
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider border shadow-md backdrop-blur-sm select-none transition-all ${labelBg}`}
            >
              {`<<${tipo}>>`}
            </div>
          )}

          {/* Botão de Excluir Aresta no hover ou seleção */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteEdge(id);
            }}
            title="Excluir conexão"
            className="opacity-0 group-hover:opacity-100 p-0.5 bg-slate-900/90 hover:bg-rose-600 text-slate-300 hover:text-white rounded-full border border-slate-700 transition-all shadow"
          >
            <X size={12} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
