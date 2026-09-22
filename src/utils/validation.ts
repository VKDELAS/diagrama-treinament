import type { Node, Edge } from '@xyflow/react';
import type {
  CustomEdgeData,
  CustomNodeData,
  Exercise,
  ValidationDetail,
  ValidationResult,
} from '../types';

export function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

export function validateDiagram(
  exercise: Exercise,
  userNodes: Node<CustomNodeData>[],
  userEdges: Edge<CustomEdgeData>[]
): ValidationResult {
  const detalhes: ValidationDetail[] = [];
  const nodeStatuses: Record<string, 'correct' | 'incorrect' | 'neutral'> = {};
  const edgeStatuses: Record<string, 'correct' | 'incorrect' | 'neutral'> = {};

  const gabaritoNodes = exercise.gabarito.nodes;
  const gabaritoEdges = exercise.gabarito.edges;

  let pontosObtidos = 0;
  const totalPontos = gabaritoNodes.length + gabaritoEdges.length;

  // Mapa de nós do usuário por label normalizado
  const userNodeMap = new Map<string, Node<CustomNodeData>>();
  userNodes.forEach((node) => {
    const norm = normalizeText(node.data.label || '');
    if (norm) {
      userNodeMap.set(norm, node);
    }
  });

  // 1. Validar Nós do Gabarito
  gabaritoNodes.forEach((gNode) => {
    const normGabarito = normalizeText(gNode.label);
    const matchedUserNode = userNodeMap.get(normGabarito);

    if (!matchedUserNode) {
      detalhes.push({
        tipo: 'erro',
        mensagem: `Faltando no canvas: ${gNode.tipo === 'ator' ? 'o Ator' : 'o Caso de Uso'} "${gNode.label}".`,
        dica: `Adicione uma peça do tipo ${gNode.tipo === 'ator' ? 'Ator' : 'Caso de Uso'} e nomeie como "${gNode.label}".`,
      });
    } else {
      // Checar se o tipo bate
      if (matchedUserNode.data.tipo !== gNode.tipo) {
        nodeStatuses[matchedUserNode.id] = 'incorrect';
        detalhes.push({
          tipo: 'erro',
          mensagem: `Tipo incorreto para "${matchedUserNode.data.label}": esperava-se ${gNode.tipo === 'ator' ? 'um Ator' : 'um Caso de Uso'}, mas foi colocado como ${matchedUserNode.data.tipo === 'ator' ? 'Ator' : 'Caso de Uso'}.`,
        });
      } else {
        nodeStatuses[matchedUserNode.id] = 'correct';
        pontosObtidos++;
        detalhes.push({
          tipo: 'sucesso',
          mensagem: `${gNode.tipo === 'ator' ? 'Ator' : 'Caso de Uso'} "${gNode.label}" presente e correto.`,
        });
      }
    }
  });

  // Verificar nós extras que não estão no gabarito
  userNodes.forEach((uNode) => {
    const normUser = normalizeText(uNode.data.label || '');
    const existsInGabarito = gabaritoNodes.some(
      (gn) => normalizeText(gn.label) === normUser
    );

    if (!existsInGabarito) {
      nodeStatuses[uNode.id] = 'incorrect';
      detalhes.push({
        tipo: 'aviso',
        mensagem: `Elemento inesperado: "${uNode.data.label || 'Sem nome'}" não faz parte da solução deste exercício.`,
      });
    }
  });

  // 2. Validar Arestas (Edges)
  // Mapear nós por id para saber o label do nó de origem e destino
  const nodeIdToLabel = new Map<string, string>();
  userNodes.forEach((n) => {
    nodeIdToLabel.set(n.id, n.data.label || '');
  });

  // Lista de edges do usuário com labels
  const userEdgeRelations = userEdges.map((e) => {
    const sLabel = nodeIdToLabel.get(e.source) || '';
    const tLabel = nodeIdToLabel.get(e.target) || '';
    return {
      edgeId: e.id,
      sourceLabel: sLabel,
      targetLabel: tLabel,
      sourceNorm: normalizeText(sLabel),
      targetNorm: normalizeText(tLabel),
      tipo: e.data?.tipo || 'associacao',
      matched: false,
    };
  });

  // Para cada aresta do gabarito, procurar correspondente
  gabaritoEdges.forEach((gEdge) => {
    const gSourceNorm = normalizeText(gEdge.source);
    const gTargetNorm = normalizeText(gEdge.target);

    // Associação pode ser bidirecional
    if (gEdge.tipo === 'associacao') {
      const matchIndex = userEdgeRelations.findIndex(
        (ue) =>
          !ue.matched &&
          ue.tipo === 'associacao' &&
          ((ue.sourceNorm === gSourceNorm && ue.targetNorm === gTargetNorm) ||
            (ue.sourceNorm === gTargetNorm && ue.targetNorm === gSourceNorm))
      );

      if (matchIndex !== -1) {
        userEdgeRelations[matchIndex].matched = true;
        edgeStatuses[userEdgeRelations[matchIndex].edgeId] = 'correct';
        pontosObtidos++;
        detalhes.push({
          tipo: 'sucesso',
          mensagem: `Associação entre "${gEdge.source}" e "${gEdge.target}" correta.`,
        });
      } else {
        // Verificar se usuário conectou com tipo errado
        const wrongTypeMatch = userEdgeRelations.find(
          (ue) =>
            (ue.sourceNorm === gSourceNorm && ue.targetNorm === gTargetNorm) ||
            (ue.sourceNorm === gTargetNorm && ue.targetNorm === gSourceNorm)
        );

        if (wrongTypeMatch) {
          edgeStatuses[wrongTypeMatch.edgeId] = 'incorrect';
          detalhes.push({
            tipo: 'erro',
            mensagem: `A conexão entre "${gEdge.source}" e "${gEdge.target}" deveria ser uma Associação simples, mas foi definida como <<${wrongTypeMatch.tipo}>>.`,
          });
        } else {
          detalhes.push({
            tipo: 'erro',
            mensagem: `Faltando associação simples entre "${gEdge.source}" e "${gEdge.target}".`,
          });
        }
      }
    } else {
      // Include ou Extend (são direcionados!)
      const exactMatchIndex = userEdgeRelations.findIndex(
        (ue) =>
          !ue.matched &&
          ue.tipo === gEdge.tipo &&
          ue.sourceNorm === gSourceNorm &&
          ue.targetNorm === gTargetNorm
      );

      if (exactMatchIndex !== -1) {
        userEdgeRelations[exactMatchIndex].matched = true;
        edgeStatuses[userEdgeRelations[exactMatchIndex].edgeId] = 'correct';
        pontosObtidos++;
        detalhes.push({
          tipo: 'sucesso',
          mensagem: `Relação <<${gEdge.tipo}>> de "${gEdge.source}" para "${gEdge.target}" correta.`,
        });
      } else {
        // Verificar se conectou com direção invertida
        const invertedMatchIndex = userEdgeRelations.findIndex(
          (ue) =>
            !ue.matched &&
            ue.tipo === gEdge.tipo &&
            ue.sourceNorm === gTargetNorm &&
            ue.targetNorm === gSourceNorm
        );

        if (invertedMatchIndex !== -1) {
          userEdgeRelations[invertedMatchIndex].matched = true;
          edgeStatuses[userEdgeRelations[invertedMatchIndex].edgeId] = 'incorrect';
          detalhes.push({
            tipo: 'erro',
            mensagem: `A direção do <<${gEdge.tipo}>> está INVERTIDA! A seta deve apontar de "${gEdge.source}" para "${gEdge.target}".`,
            dica:
              gEdge.tipo === 'include'
                ? `Lembre-se: no <<include>>, o caso base aponta para o caso obrigatório.`
                : `Lembre-se: no <<extend>>, o caso de extensão/opcional aponta para o caso base que ele estende.`,
          });
        } else {
          // Verificar se usou o outro estereótipo (trocou include por extend ou vice-versa)
          const wrongTypeMatch = userEdgeRelations.find(
            (ue) =>
              (ue.sourceNorm === gSourceNorm && ue.targetNorm === gTargetNorm) ||
              (ue.sourceNorm === gTargetNorm && ue.targetNorm === gSourceNorm)
          );

          if (wrongTypeMatch) {
            edgeStatuses[wrongTypeMatch.edgeId] = 'incorrect';
            detalhes.push({
              tipo: 'erro',
              mensagem: `Relação incorreta entre "${gEdge.source}" e "${gEdge.target}": deveria ser <<${gEdge.tipo}>>, mas foi definida como <<${wrongTypeMatch.tipo}>>.`,
              dica: exercise.regra,
            });
          } else {
            detalhes.push({
              tipo: 'erro',
              mensagem: `Faltando a relação <<${gEdge.tipo}>> entre "${gEdge.source}" e "${gEdge.target}".`,
              dica: exercise.regra,
            });
          }
        }
      }
    }
  });

  // Verificar arestas extras do usuário que não bateram com nada do gabarito
  userEdgeRelations.forEach((ue) => {
    if (!ue.matched && !edgeStatuses[ue.edgeId]) {
      edgeStatuses[ue.edgeId] = 'incorrect';
      detalhes.push({
        tipo: 'erro',
        mensagem: `Conexão indevida: a relação <<${ue.tipo}>> entre "${ue.sourceLabel || '?'}" e "${ue.targetLabel || '?'}" não faz parte do gabarito.`,
      });
    }
  });

  // Preencher neutros para nós e edges não marcados
  userNodes.forEach((n) => {
    if (!nodeStatuses[n.id]) nodeStatuses[n.id] = 'neutral';
  });
  userEdges.forEach((e) => {
    if (!edgeStatuses[e.id]) edgeStatuses[e.id] = 'neutral';
  });

  const hasErrors = detalhes.some((d) => d.tipo === 'erro');
  const isComplete = !hasErrors && pontosObtidos === totalPontos;

  return {
    isComplete,
    totalPontos,
    pontosObtidos,
    detalhes,
    nodeStatuses,
    edgeStatuses,
  };
}
