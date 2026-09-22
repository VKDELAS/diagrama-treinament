import { create } from 'zustand';
import {
  type Node,
  type Edge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import confetti from 'canvas-confetti';
import type {
  CustomEdgeData,
  CustomNodeData,
  EdgeType,
  Exercise,
  NodeType,
  ValidationResult,
} from '../types';
import { EXERCICIOS } from '../data/exercicios';
import { validateDiagram } from '../utils/validation';

interface ConnectModeState {
  active: boolean;
  sourceNodeId: string | null;
}

interface ConnectionDialogState {
  isOpen: boolean;
  sourceId: string;
  targetId: string;
}

interface DiagramStore {
  exercises: Exercise[];
  currentExerciseIndex: number;
  currentExercise: Exercise;
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
  completedExercises: string[];
  savedDiagrams: Record<
    string,
    { nodes: Node<CustomNodeData>[]; edges: Edge<CustomEdgeData>[] }
  >;

  connectMode: ConnectModeState;
  connectionDialog: ConnectionDialogState | null;
  validationResult: ValidationResult | null;
  showExercisePrompt: boolean;

  // Actions
  setExercise: (index: number) => void;
  toggleExercisePrompt: () => void;
  onNodesChange: (changes: NodeChange<Node<CustomNodeData>>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge<CustomEdgeData>>[]) => void;

  addNode: (
    tipo: NodeType,
    position?: { x: number; y: number },
    label?: string
  ) => void;
  updateNodeLabel: (id: string, label: string) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  clearCanvas: () => void;

  startConnectMode: () => void;
  cancelConnectMode: () => void;
  handleNodeClickInConnectMode: (nodeId: string) => void;

  openConnectDialog: (sourceId: string, targetId: string) => void;
  closeConnectDialog: () => void;
  confirmConnection: (tipo: EdgeType, inverted?: boolean) => void;

  validateCurrentDiagram: () => void;
  dismissValidation: () => void;
}

export const useDiagramStore = create<DiagramStore>((set, get) => ({
  exercises: EXERCICIOS,
  currentExerciseIndex: 0,
  currentExercise: EXERCICIOS[0],
  nodes: [],
  edges: [],
  completedExercises: [],
  savedDiagrams: {},

  connectMode: {
    active: false,
    sourceNodeId: null,
  },
  connectionDialog: null,
  validationResult: null,
  showExercisePrompt: true,

  toggleExercisePrompt: () => {
    set((state) => ({ showExercisePrompt: !state.showExercisePrompt }));
  },

  setExercise: (index: number) => {
    const { exercises, currentExercise, nodes, edges, savedDiagrams } = get();
    if (index < 0 || index >= exercises.length) return;

    // Salvar estado atual do exercício
    const updatedSaved = {
      ...savedDiagrams,
      [currentExercise.id]: { nodes, edges },
    };

    const nextExercise = exercises[index];
    const savedForNext = updatedSaved[nextExercise.id];

    set({
      currentExerciseIndex: index,
      currentExercise: nextExercise,
      savedDiagrams: updatedSaved,
      nodes: savedForNext ? savedForNext.nodes : [],
      edges: savedForNext ? savedForNext.edges : [],
      validationResult: null,
      connectMode: { active: false, sourceNodeId: null },
      connectionDialog: null,
    });
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  addNode: (tipo: NodeType, position, label) => {
    const { nodes } = get();
    const id = `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    // Posição padrão se não fornecida (espalha levemente)
    const posX = position?.x ?? 250 + (nodes.length % 4) * 60;
    const posY = position?.y ?? 180 + (nodes.length % 3) * 50;

    const defaultLabel = label || (tipo === 'ator' ? 'Novo Ator' : 'Novo Caso de Uso');

    const newNode: Node<CustomNodeData> = {
      id,
      type: tipo,
      position: { x: posX, y: posY },
      data: {
        label: defaultLabel,
        tipo,
        status: 'neutral',
        isEditing: !label, // se for adicionado sem label prévio, entra em modo edição igual brModelo
      },
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
      validationResult: null, // reseta validação
    }));
  },

  updateNodeLabel: (id: string, label: string) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label,
                isEditing: false,
                status: 'neutral',
              },
            }
          : node
      ),
      validationResult: null,
    }));
  },

  deleteNode: (id: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      validationResult: null,
    }));
  },

  deleteEdge: (id: string) => {
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
      validationResult: null,
    }));
  },

  clearCanvas: () => {
    set({
      nodes: [],
      edges: [],
      validationResult: null,
      connectMode: { active: false, sourceNodeId: null },
      connectionDialog: null,
    });
  },

  startConnectMode: () => {
    set({
      connectMode: { active: true, sourceNodeId: null },
      validationResult: null,
    });
  },

  cancelConnectMode: () => {
    set({
      connectMode: { active: false, sourceNodeId: null },
    });
  },

  handleNodeClickInConnectMode: (nodeId: string) => {
    const { connectMode } = get();
    if (!connectMode.active) return;

    if (!connectMode.sourceNodeId) {
      // Primeiro clique: seleciona nó de origem
      set({
        connectMode: { active: true, sourceNodeId: nodeId },
      });
    } else {
      // Segundo clique: nó de destino
      if (connectMode.sourceNodeId === nodeId) {
        // Clicou no mesmo nó, cancela seleção
        set({
          connectMode: { active: true, sourceNodeId: null },
        });
        return;
      }

      const sourceId = connectMode.sourceNodeId;
      set({
        connectMode: { active: false, sourceNodeId: null },
        connectionDialog: {
          isOpen: true,
          sourceId,
          targetId: nodeId,
        },
      });
    }
  },

  openConnectDialog: (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    set({
      connectionDialog: {
        isOpen: true,
        sourceId,
        targetId,
      },
    });
  },

  closeConnectDialog: () => {
    set({ connectionDialog: null });
  },

  confirmConnection: (tipo: EdgeType, inverted = false) => {
    const { connectionDialog, edges } = get();
    if (!connectionDialog) return;

    const finalSource = inverted
      ? connectionDialog.targetId
      : connectionDialog.sourceId;
    const finalTarget = inverted
      ? connectionDialog.sourceId
      : connectionDialog.targetId;

    // Verificar se já existe aresta idêntica
    const existing = edges.find(
      (e) =>
        (e.source === finalSource && e.target === finalTarget) ||
        (tipo === 'associacao' &&
          e.source === finalTarget &&
          e.target === finalSource)
    );

    if (existing) {
      // Atualiza o tipo da aresta existente
      set((state) => ({
        edges: state.edges.map((e) =>
          e.id === existing.id
            ? {
                ...e,
                source: finalSource,
                target: finalTarget,
                data: { ...e.data, tipo, status: 'neutral' },
              }
            : e
        ),
        connectionDialog: null,
        validationResult: null,
      }));
      return;
    }

    const newEdge: Edge<CustomEdgeData> = {
      id: `edge-${finalSource}-${finalTarget}-${Date.now()}`,
      source: finalSource,
      target: finalTarget,
      type: 'umlEdge',
      data: {
        tipo,
        status: 'neutral',
      },
    };

    set((state) => ({
      edges: [...state.edges, newEdge],
      connectionDialog: null,
      validationResult: null,
    }));
  },

  validateCurrentDiagram: () => {
    const { currentExercise, nodes, edges, completedExercises } = get();
    const result = validateDiagram(currentExercise, nodes, edges);

    // Atualizar status visual dos nós
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        status: result.nodeStatuses[node.id] || 'neutral',
      },
    }));

    // Atualizar status visual das edges
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        tipo: edge.data?.tipo || 'associacao',
        status: result.edgeStatuses[edge.id] || 'neutral',
      },
    }));

    let updatedCompleted = completedExercises;
    if (result.isComplete && !completedExercises.includes(currentExercise.id)) {
      updatedCompleted = [...completedExercises, currentExercise.id];

      // Efeito festivo de Confetti ao completar 100%!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#06b6d4', '#f59e0b'],
        });
      } catch {
        // Ignora caso ambiente sem canvas
      }
    }

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
      validationResult: result,
      completedExercises: updatedCompleted,
    });
  },

  dismissValidation: () => {
    set({ validationResult: null });
  },
}));
