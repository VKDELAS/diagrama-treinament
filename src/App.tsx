import React, { useState, useEffect } from 'react';
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
import { RedesResumoView } from './components/RedesResumoView';
import { RedesSimuladoView } from './components/RedesSimuladoView';
import { RedesFlashcardsView } from './components/RedesFlashcardsView';
import { RedesLabView } from './components/RedesLabView';
import { ProgCResumoView } from './components/ProgCResumoView';
import { ProgCSimuladoView } from './components/ProgCSimuladoView';
import { ProgCFlashcardsView } from './components/ProgCFlashcardsView';
import { ProgCLabView } from './components/ProgCLabView';
import { BottomBarAdjusterModal } from './components/BottomBarAdjusterModal';
import { AmbientBackground } from './components/AmbientBackground';
import { DEFAULT_SUBJECTS } from './data/subjects';
import { getSavedBottomNavSettings } from './utils/bottomNavDetector';
import type { AppModule, SubjectItem } from './types/navigation';

export const App: React.FC = () => {
  // Controle de navegação central do Hub, Matérias e Módulos específicos
  const [currentModule, setCurrentModule] = useState<AppModule>('hub');
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(
    DEFAULT_SUBJECTS[0]
  );
  const [isBottomBarModalOpen, setIsBottomBarModalOpen] = useState(false);
  const [labInitialQuestion, setLabInitialQuestion] = useState<9 | 10>(9);

  // Inicializa a detecção de botões de navegação no primeiro carregamento
  useEffect(() => {
    getSavedBottomNavSettings();
  }, []);

  const openBottomBarSettings = () => {
    setIsBottomBarModalOpen(true);
  };

  return (
    <>
      {/* Fundo estático e spotlight de mouse elegante que oculta ao passar sobre elementos */}
      <AmbientBackground />

      {/* Modal Inteligente de Ajuste da Barra de 3 Botões do Celular */}
      <BottomBarAdjusterModal
        isOpen={isBottomBarModalOpen}
        onClose={() => setIsBottomBarModalOpen(false)}
      />

      {/* 1. Hub Principal: Contém estritamente as MATÉRIAS */}
      {currentModule === 'hub' && (
        <HubView
          onSelectSubject={(subject) => {
            setSelectedSubject(subject);
            setCurrentModule('subject');
          }}
          onQuickLaunchModule={(subject, module) => {
            setSelectedSubject(subject);
            setCurrentModule(module);
          }}
          onOpenBottomBarSettings={openBottomBarSettings}
        />
      )}

      {/* 2. Visão Detalhada da Matéria Selecionada */}
      {currentModule === 'subject' && (
        <SubjectDetailView
          subject={selectedSubject}
          onBackToHub={() => setCurrentModule('hub')}
          onSelectModule={(mod) => setCurrentModule(mod)}
          onOpenBottomBarSettings={openBottomBarSettings}
        />
      )}

      {/* 3. Módulo de Resumo Teórico da Matéria Selecionada */}
      {currentModule === 'resumo' &&
        (selectedSubject.id === 'programacao-em-c' ? (
          <ProgCResumoView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
            onOpenLab={(qId) => {
              setLabInitialQuestion(qId);
              setCurrentModule('diagramas');
            }}
          />
        ) : selectedSubject.id === 'redes-sistemas-distribuidos' ? (
          <RedesResumoView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
          />
        ) : (
          <ResumoView onBack={() => setCurrentModule('subject')} />
        ))}

      {/* 4. Módulo do Simulado Oficial da Matéria Selecionada */}
      {currentModule === 'simulado' &&
        (selectedSubject.id === 'programacao-em-c' ? (
          <ProgCSimuladoView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
            onOpenLab={(qId) => {
              setLabInitialQuestion(qId);
              setCurrentModule('diagramas');
            }}
          />
        ) : selectedSubject.id === 'redes-sistemas-distribuidos' ? (
          <RedesSimuladoView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
          />
        ) : (
          <SimuladoView onBack={() => setCurrentModule('subject')} />
        ))}

      {/* 5. Módulo de Flashcards de Fixação da Matéria Selecionada */}
      {currentModule === 'flashcards' &&
        (selectedSubject.id === 'programacao-em-c' ? (
          <ProgCFlashcardsView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
          />
        ) : selectedSubject.id === 'redes-sistemas-distribuidos' ? (
          <RedesFlashcardsView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
          />
        ) : (
          <FlashcardsB1View onBack={() => setCurrentModule('subject')} />
        ))}

      {/* 6. Módulo de Treino Prático / Laboratório da Matéria Selecionada */}
      {currentModule === 'diagramas' &&
        (selectedSubject.id === 'programacao-em-c' ? (
          <ProgCLabView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
            initialQuestionId={labInitialQuestion}
          />
        ) : selectedSubject.id === 'redes-sistemas-distribuidos' ? (
          <RedesLabView
            onBack={() => setCurrentModule('subject')}
            onOpenBottomBarSettings={openBottomBarSettings}
          />
        ) : (
          <div className="w-screen h-screen h-[100dvh] flex flex-col overflow-hidden bg-[#080b11]/90 text-slate-100 font-sans antialiased relative z-10">
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
        ))}
    </>
  );
};

export default App;
