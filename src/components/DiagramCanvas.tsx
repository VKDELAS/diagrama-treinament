import React, { useRef, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Connection,
  type ReactFlowInstance,
  type Node,
  type Edge,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import { useDiagramStore } from '../store/useDiagramStore';
import { ActorNode } from './nodes/ActorNode';
import { UseCaseNode } from './nodes/UseCaseNode';
import { UmlEdge } from './edges/UmlEdge';
import { CanvasControls } from './CanvasControls';
import type { NodeType, CustomNodeData, CustomEdgeData } from '../types';
import { MousePointerClick } from 'lucide-react';

export const DiagramCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance<Node<CustomNodeData>, Edge<CustomEdgeData>> | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    openConnectDialog,
    connectMode,
  } = useDiagramStore();

  const nodeTypes = useMemo(
    () => ({
      ator: ActorNode,
      casoDeUso: UseCaseNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      umlEdge: UmlEdge,
    }),
    []
  );

  // Conexão arrastando o handle (ponto magnético)
  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        openConnectDialog(connection.source, connection.target);
      }
    },
    [openConnectDialog]
  );

  // Drag and Drop de peças da bandeja inferior
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const tipo = event.dataTransfer.getData(
        'application/reactflow/type'
      ) as NodeType;
      const label = event.dataTransfer.getData(
        'application/reactflow/label'
      );

      if (!tipo) return;

      if (reactFlowInstance.current && reactFlowWrapper.current) {
        const position = reactFlowInstance.current.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        // Adiciona nó na posição exata da soltura
        addNode(tipo, position, label || undefined);
      }
    },
    [addNode]
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="relative flex-1 w-full h-full bg-[#0b1120] overflow-hidden select-none"
    >
      {/* Definições SVG de Marcadores de Seta UML (Setas Nítidas, não 'V') */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Seta Include (Azul Claro) */}
          <marker
            id="arrow-include"
            viewBox="0 0 12 12"
            refX="11"
            refY="6"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path
              d="M 1 2 L 11 6 L 1 10 L 4 6 Z"
              fill="#38bdf8"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </marker>

          {/* Seta Extend (Roxo) */}
          <marker
            id="arrow-extend"
            viewBox="0 0 12 12"
            refX="11"
            refY="6"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path
              d="M 1 2 L 11 6 L 1 10 L 4 6 Z"
              fill="#c084fc"
              stroke="#c084fc"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </marker>

          {/* Seta Validação Correta (Esmeralda) */}
          <marker
            id="arrow-correct"
            viewBox="0 0 12 12"
            refX="11"
            refY="6"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path
              d="M 1 2 L 11 6 L 1 10 L 4 6 Z"
              fill="#10b981"
              stroke="#10b981"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </marker>

          {/* Seta Validação Incorreta (Rubi) */}
          <marker
            id="arrow-incorrect"
            viewBox="0 0 12 12"
            refX="11"
            refY="6"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path
              d="M 1 2 L 11 6 L 1 10 L 4 6 Z"
              fill="#f43f5e"
              stroke="#f43f5e"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
      </svg>

      {/* Barra de Ferramentas Flutuante */}
      <CanvasControls />

      {/* Canvas Interativo do React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: 'umlEdge',
        }}
        proOptions={{ hideAttribution: true }}
        connectionLineStyle={{
          stroke: '#38bdf8',
          strokeWidth: 2,
          strokeDasharray: '5,5',
        }}
        className={connectMode.active ? 'cursor-crosshair' : 'cursor-default'}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.6}
          color="#1e293b"
        />
        <Controls
          position="bottom-left"
          className="!bg-slate-900 !border-slate-800"
        />

        {/* Guia Visual quando Canvas estiver Vazio */}
        {nodes.length === 0 && (
          <Panel position="top-center" className="mt-24 pointer-events-none">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-sm backdrop-blur-sm shadow-xl">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-full mb-3">
                <MousePointerClick size={24} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Canvas de Modelagem UML
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Arraste ou clique em uma peça (Ator ou Caso de Uso) na barra
                inferior para soltar no canvas, igual no <strong>brModelo</strong>.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  Dê 2 cliques para renomear
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  Ligue os nós
                </span>
              </div>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};
