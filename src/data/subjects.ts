import type { SubjectItem } from '../types/navigation';

export const DEFAULT_SUBJECTS: SubjectItem[] = [
  {
    id: 'banco-de-dados',
    title: 'Banco de Dados & NoSQL',
    code: 'BD-101',
    semester: 'B1',
    category: 'Banco de Dados',
    description:
      'Modelagem relacional (DER e brModelo), NoSQL (Key-Value, Documentos, Colunas, Grafos), cardinalidades e pegadinhas da prova.',
    status: 'available',
    accentColor: 'text-blue-400',
    gradient: 'from-blue-600/20 via-slate-900 to-cyan-900/10',
    borderHover: 'hover:border-blue-500/60',
    iconBg: 'bg-blue-600/20 border-blue-500/40 text-blue-400',
    tagColor: 'text-blue-400 bg-blue-950/80 border-blue-800/60',
    badgeColor: 'bg-blue-950 text-blue-400 border-blue-800/80',
    modulesCount: 4,
    stats: {
      flashcards: 20,
      questions: 7,
      topics: 7,
      exercises: 52,
    },
    modules: [
      {
        id: 'resumo',
        title: 'Resumo Teórico da Matéria',
        tag: '7 Tópicos Essenciais',
        badge: 'Teoria Direta',
        description:
          'Relacional vs NoSQL, DER e níveis (conceitual, lógico, físico), tipos de atributos e cardinalidades da prova.',
        available: true,
      },
      {
        id: 'simulado',
        title: 'Simulado Oficial da Matéria',
        tag: '7 Questões • Vale 10,0',
        badge: 'Simulação de Prova',
        description:
          'Enunciados e alternativas originais, navegação 1 a 1, diagramas SVG redesenhados e correção detalhada no final.',
        available: true,
      },
      {
        id: 'flashcards',
        title: 'Flashcards de Fixação da Matéria',
        tag: '+20 Cartas Interativas',
        badge: 'Repetição Ativa',
        description:
          'Flashcards exclusivos de Banco de Dados com frente e verso para memorizar gabaritos, cardinalidades e pegadinhas.',
        available: true,
      },
      {
        id: 'diagramas',
        title: 'Treino de Diagramas da Matéria',
        tag: '52 Exercícios Práticos',
        badge: 'Modelagem Interativa',
        description:
          'Canvas interativo com peças estilo brModelo para montar e conectar entidades, atributos e relacionamentos.',
        available: true,
      },
    ],
  },
  {
    id: 'eng-software',
    title: 'Engenharia de Software',
    code: 'ES-201',
    semester: 'B1',
    category: 'Engenharia',
    description:
      'Metodologias ágeis (Scrum, Kanban), engenharia de requisitos, histórias de usuário, critérios de aceite e modelagem de casos de uso.',
    status: 'upcoming',
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-600/20 via-slate-900 to-teal-900/10',
    borderHover: 'hover:border-emerald-500/60',
    iconBg: 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400',
    tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
    badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/80',
    modulesCount: 4,
    stats: {
      flashcards: 18,
      questions: 10,
      topics: 5,
      exercises: 15,
    },
    modules: [
      {
        id: 'flashcards',
        title: 'Flashcards de Métodos Ágeis',
        tag: '18 Cartas',
        badge: 'Em Preparação',
        description:
          'Cerimônias do Scrum, papéis (PO, SM, Dev), artefatos e estimativas ágeis.',
        available: false,
      },
      {
        id: 'resumo',
        title: 'Resumo de Requisitos & Casos de Uso',
        tag: '5 Tópicos',
        badge: 'Em Preparação',
        description:
          'Requisitos funcionais vs não-funcionais, regras de negócio e diagramas UML.',
        available: false,
      },
      {
        id: 'simulado',
        title: 'Simulado de Engenharia de Software',
        tag: '10 Questões',
        badge: 'Em Preparação',
        description:
          'Questões contextualizadas de provas anteriores sobre ciclo de vida de software.',
        available: false,
      },
      {
        id: 'diagramas',
        title: 'Prática de Casos de Uso (UML)',
        tag: '15 Exercícios',
        badge: 'Em Preparação',
        description:
          'Prática interativa de atores, casos de uso, inclusões («include») e extensões («extend»).',
        available: false,
      },
    ],
  },
  {
    id: 'estrutura-dados',
    title: 'Estrutura de Dados & Algoritmos',
    code: 'ED-301',
    semester: 'B2',
    category: 'Ciência da Computação',
    description:
      'Análise assintótica (Notação Big-O), vetores, listas encadeadas, pilhas, filas, recursão, árvores binárias e algoritmos de busca.',
    status: 'upcoming',
    accentColor: 'text-purple-400',
    gradient: 'from-purple-600/20 via-slate-900 to-indigo-900/10',
    borderHover: 'hover:border-purple-500/60',
    iconBg: 'bg-purple-600/20 border-purple-500/40 text-purple-400',
    tagColor: 'text-purple-400 bg-purple-950/80 border-purple-800/60',
    badgeColor: 'bg-purple-950 text-purple-400 border-purple-800/80',
    modulesCount: 4,
    stats: {
      flashcards: 24,
      questions: 12,
      topics: 6,
      exercises: 20,
    },
    modules: [
      {
        id: 'flashcards',
        title: 'Flashcards de Notação Big-O & Estruturas',
        tag: '24 Cartas',
        badge: 'Em Preparação',
        description:
          'Memorização de complexidades de tempo/espaço e funcionamento de pilhas e filas.',
        available: false,
      },
      {
        id: 'resumo',
        title: 'Resumo de Ponteiros & Árvores',
        tag: '6 Tópicos',
        badge: 'Em Preparação',
        description:
          'Alocação dinâmica, nós encadeados, percursos em árvore (pré, em e pós-ordem).',
        available: false,
      },
      {
        id: 'simulado',
        title: 'Simulado de Estrutura de Dados',
        tag: '12 Questões',
        badge: 'Em Preparação',
        description:
          'Questões de raciocínio lógico e rastreio de ponteiros com gabarito comentado.',
        available: false,
      },
      {
        id: 'diagramas',
        title: 'Laboratório de Algoritmos',
        tag: '20 Exercícios',
        badge: 'Em Preparação',
        description:
          'Exercícios de ordenação e simulação de memória visual.',
        available: false,
      },
    ],
  },
  {
    id: 'poo-programacao',
    title: 'Programação Orientada a Objetos',
    code: 'POO-401',
    semester: 'B1',
    category: 'Desenvolvimento',
    description:
      'Paradigmas de orientação a objetos: classes, objetos, atributos, métodos, encapsulamento, herança, polimorfismo e interfaces.',
    status: 'upcoming',
    accentColor: 'text-amber-400',
    gradient: 'from-amber-600/20 via-slate-900 to-yellow-900/10',
    borderHover: 'hover:border-amber-500/60',
    iconBg: 'bg-amber-600/20 border-amber-500/40 text-amber-400',
    tagColor: 'text-amber-400 bg-amber-950/80 border-amber-800/60',
    badgeColor: 'bg-amber-950 text-amber-400 border-amber-800/80',
    modulesCount: 4,
    stats: {
      flashcards: 22,
      questions: 8,
      topics: 4,
      exercises: 16,
    },
    modules: [
      {
        id: 'flashcards',
        title: 'Flashcards dos 4 Pilares de POO',
        tag: '22 Cartas',
        badge: 'Em Preparação',
        description:
          'Herança vs Composição, Sobrecarga vs Sobrescrita, Modificadores de Acesso.',
        available: false,
      },
      {
        id: 'resumo',
        title: 'Resumo Teórico de POO & SOLID',
        tag: '4 Tópicos',
        badge: 'Em Preparação',
        description:
          'Conceitos fundamentais de orientação a objetos e boas práticas de arquitetura.',
        available: false,
      },
      {
        id: 'simulado',
        title: 'Simulado de Conceitos & Código POO',
        tag: '8 Questões',
        badge: 'Em Preparação',
        description:
          'Trechos de código para identificar saídas, polimorfismo e erros comuns de compilação.',
        available: false,
      },
      {
        id: 'diagramas',
        title: 'Modelagem de Classes (UML)',
        tag: '16 Exercícios',
        badge: 'Em Preparação',
        description:
          'Construção de diagramas de classes com visibilidade (+, -, #) e relacionamentos.',
        available: false,
      },
    ],
  },
];
