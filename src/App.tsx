import React, { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Header } from './components/Header';
import { ExercisePrompt } from './components/ExercisePrompt';
import { DiagramCanvas } from './components/DiagramCanvas';
import { PieceTray } from './components/PieceTray';
import { ConnectionModal } from './components/ConnectionModal';
import { FeedbackModal } from './components/FeedbackModal';
import { HubView } from './components/HubView';
import { SubjectDetailView } from './components/SubjectDetailView';
import { ResumoView } from './components/ResumoView';
import { SimuladoView } from './components/SimuladoView';
import { FlashcardsB1View } from './components/FlashcardsB1View';
import { DEFAULT_SUBJECTS } from './data/subjects';
import type { AppModule, SubjectItem } from './types/navigation';

export const App: React.FC = () => {
  // Controle de navegação central do Hub, Matérias e Módulos específicos
  const [currentModule, setCurrentModule] = useState<AppModule>('hub');
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(
    DEFAULT_SUBJECTS[0]
  );

  // 1. Hub Principal: Contém estritamente as MATÉRIAS
  if (currentModule === 'hub') {
    return (
      <HubView
        onSelectSubject={(subject) => {
          setSelectedSubject(subject);
          setCurrentModule('subject');
        }}
        onQuickLaunchModule={(subject, module) => {
          setSelectedSubject(subject);
          setCurrentModule(module);
        }}
      />
    );
  }

  // 2. Visão Detalhada da Matéria Selecionada (onde ficam os Flashcards, Resumo, Simulado da matéria)
  if (currentModule === 'subject') {
    return (
      <SubjectDetailView
        subject={selectedSubject}
        onBackToHub={() => setCurrentModule('hub')}
        onSelectModule={(mod) => setCurrentModule(mod)}
      />
    );
  }

  // 3. Módulo de Resumo Teórico da Matéria Selecionada
  if (currentModule === 'resumo') {
    return <ResumoView onBack={() => setCurrentModule('subject')} />;
  }

  // 4. Módulo do Simulado Oficial da Matéria Selecionada
  if (currentModule === 'simulado') {
    return <SimuladoView onBack={() => setCurrentModule('subject')} />;
  }

  // 5. Módulo de Flashcards de Fixação da Matéria Selecionada
  if (currentModule === 'flashcards') {
    return <FlashcardsB1View onBack={() => setCurrentModule('subject')} />;
  }

  // 6. Módulo de Treino de Diagramas da Matéria Selecionada
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#080b11] text-slate-100 font-sans antialiased">
      <ReactFlowProvider>
        {/* Header com botão de voltar para a matéria */}
        <Header onBackToHub={() => setCurrentModule('subject')} />

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
