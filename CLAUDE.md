# CLAUDE.md - Diretrizes do Projeto Portal de Estudos ADS (NEXUS)

Este documento orienta assistentes de inteligência artificial (Claude, Antigravity, etc.) e desenvolvedores sobre a arquitetura, convenções, comandos e regras de negócio deste repositório.

---

## 📌 Visão Geral do Projeto

- **Nome:** Portal de Estudos ADS (NEXUS)
- **Objetivo:** Hub acadêmico unificado para centralizar materiais de estudo de todas as disciplinas do curso de Análise e Desenvolvimento de Sistemas (ADS).
- **Matéria Piloto Ativa:** Banco de Dados & NoSQL (Preparatório Oficial Prova B1).
- **Arquitetura Multi-Matérias:** Projetado para expansão contínua de novas disciplinas da grade (Engenharia de Software, Estrutura de Dados, Programação Orientada a Objetos, etc.).

---

## ⚠️ Regras de Ouro e Princípios Arquiteturais

1. **No Hub principal (`HubView.tsx`) ficam EXCLUSIVAMENTE as Matérias:**
   - Nunca coloque cards de flashcards, simulados ou resumos soltos diretamente na página inicial do Hub.
   - O Hub lista apenas as disciplinas em formato de grade com busca e filtros por status (`Todas`, `Disponíveis`, `Em Breve`).

2. **Cada matéria é proprietária dos seus próprios módulos de estudo:**
   - Cada disciplina possui seu próprio quarteto de ferramentas:
     - 🃏 **Flashcards de Fixação da matéria**
     - 📘 **Resumo Teórico da matéria**
     - 🏆 **Simulado Oficial da matéria**
     - 📐 **Treino Prático / Diagramas da matéria**
   - Ao clicar em uma matéria, o usuário entra no **Subject Command Center** ([`SubjectDetailView.tsx`](file:///c:/Dev/Sites/Treinamento%20Caso%20de%20uso/src/components/SubjectDetailView.tsx)) que apresenta apenas os módulos daquela matéria específica.

3. **Criação e Gestão de Matérias via Código / Assistente:**
   - **Não existe botão de cadastro via interface do usuário.** 
   - Quando o usuário quiser adicionar uma nova disciplina ou novos flashcards/questões, ele solicitará diretamente pelo chat, e as alterações devem ser implementadas no código (`src/data/subjects.ts` e arquivos de dados).

4. **Design Minimalista de Alto Nível (Linear / Raycast / Vercel style):**
   - Paleta dark mode profunda: fundo `#080b11`, superfícies com transparência sutil (`bg-white/[0.03]`), bordas ultrafinas (`border-white/[0.07]`), blur intenso (`backdrop-blur-xl`).
   - Tipografia limpa, tracking ajustado, micro-interações táteis (`active:scale-95`, transições suaves).

---

## 🛠️ Stack Tecnológica & Dependências

- **Linguagem & Framework:** React 19 + TypeScript (Strict Mode)
- **Build Tool:** Vite 8
- **Estilização:** Tailwind CSS v4 (`@import "tailwindcss";` no `index.css`)
- **Ícones:** `lucide-react`
- **Modelagem Visual & Diagramas:** `@xyflow/react` (React Flow v12) com suporte a peças personalizadas brModelo
- **Gerenciador de Estado:** `zustand` (Canvas de diagramas)
- **Efeitos:** `canvas-confetti` (Celebração de nota máxima ou conclusão de exercícios)
- **Linter:** `oxlint` (Zero avisos tolerados)

---

## 💻 Comandos Frequentes

```bash
# Iniciar o servidor de desenvolvimento Vite
npm run dev

# Compilar TypeScript e gerar build de produção
npm run build

# Executar verificação de linting ultrarrápida
npm run lint

# Visualizar o build de produção localmente
npm run preview
```

> **Atenção:** O compilador TypeScript está com regras estritas ativas. Nenhuma variável ou import não utilizado (`TS6133`) é permitido. Sempre teste com `npm run build` e `npm run lint`.

---

## 📁 Estrutura de Diretórios

```
treinamento-caso-de-uso/
├── public/                 # Assets estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── HubHeader.tsx           # Header minimalista com busca e status ao vivo
│   │   ├── HubView.tsx             # Hub principal (APENAS matérias)
│   │   ├── SubjectDetailView.tsx   # Painel da matéria (módulos da matéria selecionada)
│   │   ├── ModuleHeader.tsx        # Header padronizado com botão voltar
│   │   ├── FlashcardsB1View.tsx    # Flashcards interativos (frente/verso, sei/não sei)
│   │   ├── ResumoView.tsx          # Resumo teórico com acordeões e pegadinhas
│   │   ├── SimuladoView.tsx        # Simulado da prova com SVG e pontuação
│   │   ├── DiagramCanvas.tsx       # Canvas interativo estilo brModelo
│   │   ├── PieceTray.tsx           # Bandeja inferior fixa de peças
│   │   └── nodes/ & edges/         # Peças personalizadas do React Flow
│   ├── data/               # Banco de dados e conteúdo estático
│   │   ├── subjects.ts             # Registro central de todas as matérias e módulos
│   │   ├── flashcardsB1Data.ts     # +20 cartas de Banco de Dados B1
│   │   ├── simuladoB1Data.ts       # 7 questões oficiais do Simulado B1
│   │   ├── simuladoData.ts         # Banco de questões alternativas
│   │   └── exercicios.ts           # 52 exercícios práticos de modelagem
│   ├── store/              # Estados globais Zustand
│   │   └── useDiagramStore.ts      # Controle do canvas e exercícios
│   ├── types/              # Definições de tipos TypeScript
│   │   └── navigation.ts           # AppModule, SubjectItem, SubjectModuleInfo
│   ├── App.tsx             # Orquestrador de rotas (Hub -> Subject -> Módulo)
│   ├── index.css           # Tailwind v4, scrollbars e resets
│   └── main.tsx            # Entry point React 19
├── CLAUDE.md               # Este manual de diretrizes
├── package.json
└── vite.config.ts
```

---

## 📖 Como Adicionar uma Nova Matéria (Passo a Passo)

Sempre que o usuário pedir para adicionar uma nova matéria (ex: *Redes de Computadores*):

1. **Cadastrar no catálogo [`src/data/subjects.ts`](file:///c:/Dev/Sites/Treinamento%20Caso%20de%20uso/src/data/subjects.ts):**
   Adicione o novo objeto na lista `DEFAULT_SUBJECTS`:
   ```ts
   {
     id: 'redes-computadores',
     title: 'Redes de Computadores',
     code: 'RC-101',
     semester: 'B1',
     category: 'Infraestrutura',
     description: 'Camadas OSI/TCP-IP, roteamento, IPv4/IPv6, portas e protocolos HTTP, DNS e TLS.',
     status: 'available', // ou 'upcoming'
     accentColor: 'text-cyan-400',
     gradient: 'from-cyan-600/20 via-slate-900 to-blue-900/10',
     borderHover: 'hover:border-cyan-500/60',
     iconBg: 'bg-cyan-600/20 border-cyan-500/40 text-cyan-400',
     tagColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
     badgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-800/80',
     modulesCount: 4,
     stats: { flashcards: 20, questions: 10, topics: 6, exercises: 12 },
     modules: [
       {
         id: 'flashcards',
         title: 'Flashcards de Redes',
         tag: '20 Cartas',
         badge: 'Repetição Ativa',
         description: 'Memorização de portas conhecidas (80, 443, 53, 22), camadas e protocolos.',
         available: true,
       },
       // ... resumo, simulado, diagramas
     ]
   }
   ```

2. **Associar Ícone em [`src/components/HubView.tsx`](file:///c:/Dev/Sites/Treinamento%20Caso%20de%20uso/src/components/HubView.tsx):**
   Adicione o ícone correspondente no switch `getSubjectIcon(id)` (ex: `Wifi`, `Server`, etc.).

3. **Criar os Arquivos de Conteúdo da Matéria:**
   - Flashcards: `src/data/flashcards<Materia>Data.ts`
   - Simulado: `src/data/simulado<Materia>Data.ts`

4. **Conectar a Navegação em [`src/App.tsx`](file:///c:/Dev/Sites/Treinamento%20Caso%20de%20uso/src/App.tsx):**
   Renderize a tela correspondente de acordo com o `selectedSubject.id` e `currentModule`.

5. **Testar e Validar:**
   Execute `npm run build` e `npm run lint`.
