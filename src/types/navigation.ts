export type AppModule =
  | 'hub'
  | 'subject'
  | 'resumo'
  | 'simulado'
  | 'flashcards'
  | 'diagramas';

export type SubjectStatus = 'available' | 'upcoming';

export interface SubjectModuleInfo {
  id: 'resumo' | 'simulado' | 'flashcards' | 'diagramas';
  title: string;
  tag: string;
  badge: string;
  description: string;
  available: boolean;
}

export interface SubjectItem {
  id: string;
  title: string;
  code: string;
  semester: string;
  category: string;
  description: string;
  status: SubjectStatus;
  accentColor: string;
  gradient: string;
  borderHover: string;
  iconBg: string;
  tagColor: string;
  badgeColor: string;
  modulesCount: number;
  stats: {
    flashcards?: number;
    questions?: number;
    topics?: number;
    exercises?: number;
  };
  modules: SubjectModuleInfo[];
}
