import React, { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Header } from './components/Header';
import { ExercisePrompt } from './components/ExercisePrompt';
import { DiagramCanvas } from './components/DiagramCanvas';
import { PieceTray } from './components/PieceTray';
import { ConnectionModal } from './components/ConnectionModal';
import { FeedbackModal } from './components/FeedbackModal';
import { HubView } from './components/HubView';
import { ResumoView } from './components/ResumoView';
import { SimuladoView } from './components/SimuladoView';
import { FlashcardsB1View } from './components/FlashcardsB1View';
import type { AppModule } from './types/navigation';

export const App: React.FC = () => {
  // Controle de navegação central do Hub e módulos
  const [currentModule, setCurrentModule] = useState<AppModule>('hub');

  // 1. Hub Principal
  if (currentModule === 'hub') {
    return <HubView onSelectModule={setCurrentModule} />;
  }

  // 2. Módulo de Resumo Teórico B1
  if (currentModule === 'resumo') {
    return <ResumoView onBack={() => setCurrentModule('hub')} />;
  }

  // 3. Módulo do Simulado Oficial B1 (7 questões, diagramas SVG, nota 0 a 10)
  if (currentModule === 'simulado') {
    return <SimuladoView onBack={() => setCurrentModule('hub')} />;
  }

  // 4. Módulo de Flashcards de Fixação B1 (+20 cartas, flip, filtro Sei/Não sei)
  if (currentModule === 'flashcards') {
    return <FlashcardsB1View onBack={() => setCurrentModule('hub')} />;
  }

  // 5. Módulo Existente: Treino de Diagramas (UML / brModelo) intacto
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#090d16] text-slate-100 font-sans antialiased">
      <ReactFlowProvider>
        {/* Header com botão de voltar para o Hub */}
        <Header onBackToHub={() => setCurrentModule('hub')} />

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
