export type NodeType = 'ator' | 'casoDeUso';
export type EdgeType = 'associacao' | 'include' | 'extend';

export interface ExerciseNode {
  id: string;
  tipo: NodeType;
  label: string;
}

export interface ExerciseEdge {
  source: string; // label do nó de origem
  target: string; // label do nó de destino
  tipo: EdgeType;
}

export interface Exercise {
  id: string;
  titulo: string;
  categoria: string;
  enunciado: string;
  regra: string;
  pecas: {
    atores: string[];
    casosDeUso: string[];
  };
  gabarito: {
    nodes: ExerciseNode[];
    edges: ExerciseEdge[];
  };
}

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  tipo: NodeType;
  status?: 'neutral' | 'correct' | 'incorrect';
  isEditing?: boolean;
}

export interface CustomEdgeData extends Record<string, unknown> {
  tipo: EdgeType;
  status?: 'neutral' | 'correct' | 'incorrect';
}

export interface ValidationDetail {
  tipo: 'sucesso' | 'erro' | 'aviso';
  mensagem: string;
  dica?: string;
}

export interface ValidationResult {
  isComplete: boolean;
  totalPontos: number;
  pontosObtidos: number;
  detalhes: ValidationDetail[];
  nodeStatuses: Record<string, 'correct' | 'incorrect' | 'neutral'>;
  edgeStatuses: Record<string, 'correct' | 'incorrect' | 'neutral'>;
}
