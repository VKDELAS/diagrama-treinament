import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Header } from './components/Header';
import { ExercisePrompt } from './components/ExercisePrompt';
import { DiagramCanvas } from './components/DiagramCanvas';
import { PieceTray } from './components/PieceTray';
import { ConnectionModal } from './components/ConnectionModal';
import { FeedbackModal } from './components/FeedbackModal';

export const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#090d16] text-slate-100 font-sans antialiased">
      {/* Provedor Global do React Flow */}
      <ReactFlowProvider>
        {/* Cabeçalho de Navegação e Status */}
        <Header />

        {/* Painel Colapsável de Enunciado e Regra de Ouro */}
        <ExercisePrompt />

        {/* Canvas de Modelagem Interativo */}
        <DiagramCanvas />

        {/* Bandeja Inferior Fixa de Peças Estilo brModelo */}
        <PieceTray />

        {/* Modais Globais */}
        <ConnectionModal />
        <FeedbackModal />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
