import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Search,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';

interface ResumoViewProps {
  onBack: () => void;
}

interface TopicItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tag: string;
  bullets: string[];
  destaque?: string;
  complemento?: string;
}

export const ResumoView: React.FC<ResumoViewProps> = ({ onBack }) => {
  // Lista de tópicos estritamente baseados nos DADOS da prova B1
  const topics: TopicItem[] = [
    {
      id: 'topico-1',
      number: 1,
      title: 'Relacional x Não Relacional (SQL, Esquema e Escalabilidade)',
      subtitle: 'Comparações essenciais e a ressalva mandatória da Q1',
      tag: 'Questão 1',
      bullets: [
        'Relacionais usam SQL (Linguagem Estruturada) para definição e manipulação; não relacionais geralmente não usam SQL.',
        'Relacionais armazenam em tabelas e colunas com esquema predefinido; não relacionais não exigem esquema antes do uso.',
        'Relacionais destacam-se em consultas complexas e integridade; não relacionais são ideais onde escalabilidade horizontal é crucial.',
        'Ressalva da Q1: Não existe desempenho ou escalabilidade horizontal equivalente como regra geral (depende de SGBD, arquitetura e carga).',
        'As diferenças também envolvem modelos de armazenamento e compromissos de consistência.',
      ],
      destaque:
        'Cuidado na prova: Afirmar que relacionais e não relacionais possuem desempenho e escalabilidade horizontal semelhantes está INCORRETO.',
      complemento:
        'Complemento: Bancos relacionais priorizam ACID (atomicidade/consistência), enquanto NoSQL costuma priorizar partição e disponibilidade.',
    },
    {
      id: 'topico-2',
      number: 2,
      title: 'DER e Níveis de Modelagem de Dados',
      subtitle: 'Diferença entre modelo conceitual, lógico e físico',
      tag: 'Questão 2',
      bullets: [
        'Modelo Conceitual (DER): Representa a estrutura conceitual mostrando entidades, seus atributos e os relacionamentos entre elas.',
        'Modelo Lógico: Representa tabelas, campos, chaves primárias/estrangeiras e tipos de dados lógicos.',
        'Modelo Físico: Técnica que detalha a implementação e armazenamento em um SGBD específico.',
        'O DER não é usado para manipulação direta de dados nem para detalhar tabelas físicas concretas.',
      ],
      destaque:
        'Regra da Q2: O DER retrata entidades, atributos e relacionamentos puramente no nível conceitual.',
    },
    {
      id: 'topico-3',
      number: 3,
      title: 'Entidade, Atributo e Relacionamento',
      subtitle: 'Definições fundamentais dos elementos de um DER',
      tag: 'Questão 3',
      bullets: [
        'Entidade: Representa objetos ou conceitos do mundo real que podem ser armazenados ou consultados (ex.: Cliente, Disciplina, Aluno).',
        'Atributo: Descreve e detalha as propriedades específicas de uma entidade (ex.: Nome, RA, Carga Horária).',
        'Relacionamento: Associa e conecta instâncias de entidades entre si (ex.: EMITE, CURSA).',
        'Entidades NÃO representam atributos, nem são meras operações de consulta ou só ligações entre tabelas.',
      ],
      destaque:
        'Revisão rápida: Entidade = objeto/conceito; Atributo = descreve a entidade; Relacionamento = associa entidades.',
    },
    {
      id: 'topico-4',
      number: 4,
      title: 'Tipos de Atributo (com exemplos da prova)',
      subtitle: 'Identificador, multivalorado, derivado e composto',
      tag: 'Questão 4',
      bullets: [
        'Identificador (Determinante): Chave que identifica exclusivamente uma entidade. (Ex.: RA ou Código). Nome NÃO é determinante porque nomes se repetem.',
        'Multivalorado: Aceita um ou mais valores para uma mesma entidade (ex.: Vários e-mails por pessoa).',
        'Derivado: Não deve ser armazenado; é calculado a partir de outro dado (ex.: Idade calculada a partir da Data de Nascimento).',
        'Composto: Contém partes que formam um todo (ex.: Endereço formado por Logradouro, Rua, Bairro etc.).',
      ],
      destaque:
        'Pegadinha da Q4: Nome de pessoa NUNCA pode ser atributo determinante só por "determinar quem ela é".',
    },
    {
      id: 'topico-5',
      number: 5,
      title: 'Cardinalidade Mínima/Máxima e Leitura do Par',
      subtitle: 'Convenção oficial usada nas questões de prova',
      tag: 'Questão 5',
      bullets: [
        'Convenção: O par escrito perto de uma entidade diz QUANTAS ocorrências dessa entidade se ligam a cada ocorrência da outra.',
        'Exemplo da prova: CLIENTE (1,1) -- EMITE -- (0,N) COMPRA.',
        '(0,N) junto de Compra: Cada cliente tem de zero a muitas compras (compra é opcional para o cliente; ele pode ainda não ter comprado).',
        '(1,1) junto de Cliente: Cada compra tem no mínimo 1 e no máximo 1 cliente (toda compra pertence a exatamente um cliente).',
        'Portanto: Um cliente pode emitir várias compras, e toda compra deve ter ao menos um cliente.',
      ],
      destaque:
        'Pegadinha da Q5: Dizer que "Todo cliente deve emitir ao menos uma compra" é INCORRETO, pois a cardinalidade mínima de Compra é zero (0,N).',
    },
    {
      id: 'topico-6',
      number: 6,
      title: 'Relacionamento N:N, Participação e Atributo de Relacionamento',
      subtitle: 'Requisitos do DER entre Aluno e Disciplina',
      tag: 'Questão 6',
      bullets: [
        'Aluno cursa várias disciplinas e não pode ficar sem disciplinas: (1,n) junto da entidade DISCIPLINA.',
        'Disciplina tem vários alunos, mas pode existir disciplina sem alunos: (0,n) junto da entidade ALUNO.',
        'Ambos os lados admitem vários: cardinalidade máxima N:N.',
        'Atributo de Relacionamento: A Nota pertence ao relacionamento CURSA, pois depende exclusivamente do par Aluno-Disciplina.',
        'A Nota NÃO pode ser atributo direto de Aluno nem de Disciplina, pois cada aluno tem sua própria nota em cada matéria.',
      ],
      destaque:
        'Resultado da Q6: ALUNO (0,n) -- CURSA [Nota] -- (1,n) DISCIPLINA atende perfeitamente aos requisitos.',
    },
    {
      id: 'topico-7',
      number: 7,
      title: 'Do DER ao Modelo Lógico (Tabela Associativa e Chave Composta)',
      subtitle: 'Regras de transformação relacional para cardinalidade N:N',
      tag: 'Questão 7',
      bullets: [
        'Relacionamentos N:N originam obrigatoriamente uma Tabela Associativa intermediária (tabela CURSA).',
        'Tabela ALUNO: (AlunoRa PK, AlunoNome); Tabela DISCIPLINA: (DisciplinaId PK, Nome, CargaHoraria).',
        'Tabela CURSA: Contém as chaves estrangeiras FK_AlunoRa e FK_DisciplinaId, além do atributo Nota.',
        'Chave Primária Composta: As duas FKs juntas formam a PK da tabela CURSA, impedindo duas notas para o mesmo par.',
        'Mapeamento lógico: ALUNO (0,1)--(0,n) CURSA e DISCIPLINA (1,1)--(1,n) CURSA.',
      ],
      destaque:
        'Estrutura correta: ALUNO(RA, Nome); DISCIPLINA(ID, Nome, CargaHoraria); CURSA(RA_Aluno, ID_Disciplina, Nota) com PK composta.',
    },
  ];

  // Pegadinhas oficiais extraídas diretamente das 7 questões
  const pegadinhas = [
    {
      questao: 'Q1',
      titulo: 'Equivalência de desempenho e escalabilidade',
      erro: 'Afirmar que relacionais e não relacionais têm escalabilidade horizontal e desempenho equivalentes.',
      correcao:
        'Desempenho e escalabilidade dependem do SGBD, da arquitetura e da carga de trabalho; NoSQL costuma ser superior em escalabilidade horizontal.',
    },
    {
      questao: 'Q2',
      titulo: 'Nível conceitual vs físico do DER',
      erro: 'Achar que DER serve para manipulação física de dados ou detalhamento de tabelas e tipos concretos.',
      correcao:
        'O DER opera estritamente no nível conceitual (entidades, atributos e relacionamentos). Tabelas e tipos pertencem ao modelo lógico/físico.',
    },
    {
      questao: 'Q3',
      titulo: 'Confundir Entidade com Atributo ou Consulta',
      erro: 'Dizer que entidades representam atributos ou especificam comandos SQL de consulta.',
      correcao:
        'Entidades são objetos ou conceitos do mundo real (Cliente, Aluno). Atributos são suas características (Nome, RA).',
    },
    {
      questao: 'Q4',
      titulo: 'Nome como Atributo Determinante',
      erro: 'Considerar o Nome de uma pessoa como determinante porque ele "determina quem ela é".',
      correcao:
        'Nomes repetem entre indivíduos (homônimos). Atributos determinantes exigem unicidade absoluta, como RA ou Código.',
    },
    {
      questao: 'Q5',
      titulo: 'Interpretação invertida da Cardinalidade Mínima',
      erro: 'Afirmar que todo cliente é obrigado a emitir compra quando há (0,N) perto de Compra.',
      correcao:
        'O mínimo 0 indica participação opcional: o cliente pode existir cadastrado sem nenhuma compra registrada.',
    },
    {
      questao: 'Q6',
      titulo: 'Localização do Atributo em Relacionamento N:N',
      erro: 'Colocar o atributo "Nota" dentro da entidade Aluno ou dentro de Disciplina.',
      correcao:
        'A Nota depende conjuntamente do Aluno E da Disciplina. Ela deve ficar vinculada ao relacionamento CURSA.',
    },
    {
      questao: 'Q7',
      titulo: 'Modelo Lógico sem Tabela Associativa',
      erro: 'Tentar resolver N:N com apenas 2 tabelas ou esquecer a PK composta na associativa.',
      correcao:
        'Relação N:N exige tabela associativa CURSA com FK_Aluno + FK_Disciplina compondo a PK para evitar notas duplicadas.',
    },
  ];

  // Estado de controle dos acordeões (todos abertos inicialmente para facilitar leitura)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'topico-1': true,
    'topico-2': true,
    'topico-3': true,
    'topico-4': true,
    'topico-5': true,
    'topico-6': true,
    'topico-7': true,
    pegadinhas: true,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = { pegadinhas: true };
    topics.forEach((t) => (all[t.id] = true));
    setOpenSections(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = { pegadinhas: false };
    topics.forEach((t) => (all[t.id] = false));
    setOpenSections(all);
  };

  // Filtragem rápida
  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.bullets.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-blue-600/30">
      {/* Cabeçalho do Módulo com Botão Voltar ao Início */}
      <ModuleHeader
        title="Resumo Teórico B1"
        subtitle="Banco de Dados e NoSQL • Conteúdo Oficial da Prova"
        badge="B1 • 7 Tópicos"
        icon={BookOpen}
        badgeColor="bg-blue-900/60 border-blue-700/60 text-blue-300"
        onBack={onBack}
      />

      {/* Barra Superior de Controles e Busca */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-8 py-3 shrink-0 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.replace(/<[^>]*>?/gm, '').slice(0, 80))}
            placeholder="Buscar por tópico, regra ou palavra-chave..."
            className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 touch-manipulation"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Expandir todos
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Recolher todos
          </button>
        </div>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Caixa de Destaque da Convenção da Prova */}
          <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-800/60 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 shrink-0">
                <Sparkles size={20} />
              </div>
              <div className="text-xs sm:text-sm">
                <h3 className="font-bold text-blue-300 text-sm sm:text-base">
                  Regra de Ouro: Convenção de Leitura da Prova
                </h3>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  O par escrito perto de uma entidade diz{' '}
                  <strong className="text-white">QUANTAS ocorrências</strong> dessa
                  entidade se ligam a cada ocorrência da outra.
                </p>
                <div className="mt-2 p-2 rounded-lg bg-slate-950/60 font-mono text-xs text-blue-300 border border-blue-900/60">
                  Exemplo: (0,N) perto de Compra = cada cliente tem de zero a muitas compras.
                </div>
              </div>
            </div>
          </div>

          {/* Acordeão dos 7 Tópicos */}
          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const isOpen = openSections[topic.id];
              return (
                <div
                  key={topic.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200 shadow-md hover:border-slate-700"
                >
                  {/* Cabeçalho do Acordeão */}
                  <button
                    onClick={() => toggleSection(topic.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                        {topic.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm sm:text-base font-bold text-white">
                            {topic.title}
                          </h2>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hidden sm:inline">
                            {topic.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {topic.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-slate-400">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Corpo do Acordeão (Máx 5 bullets / 6 linhas) */}
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 border-t border-slate-800/70 text-xs sm:text-sm text-slate-300 space-y-3">
                      <ul className="space-y-2 list-none">
                        {topic.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {topic.destaque && (
                        <div className="mt-3 p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-blue-200 text-xs flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                          <p>{topic.destaque}</p>
                        </div>
                      )}

                      {topic.complemento && (
                        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs">
                          {topic.complemento}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Seção Especial: Pegadinhas da Prova */}
          <div className="bg-slate-900/90 border border-amber-900/60 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleSection('pegadinhas')}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer bg-amber-950/20 hover:bg-amber-950/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-900/40 border border-amber-700/60 text-amber-400 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-amber-300">
                    Pegadinhas da Prova (Erros mais comuns)
                  </h2>
                  <p className="text-xs text-slate-400">
                    As armadilhas testadas em cada uma das questões da prova B1
                  </p>
                </div>
              </div>

              <div className="text-amber-400">
                {openSections['pegadinhas'] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </button>

            {openSections['pegadinhas'] && (
              <div className="p-4 sm:p-6 border-t border-amber-900/40 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {pegadinhas.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-xs text-white">
                          {item.titulo}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                          {item.questao}
                        </span>
                      </div>
                      <div className="text-xs text-rose-300/90 bg-rose-950/30 border border-rose-900/40 p-2 rounded-lg mb-2">
                        <strong>Armadilha:</strong> {item.erro}
                      </div>
                      <div className="text-xs text-emerald-300/90 bg-emerald-950/30 border border-emerald-900/40 p-2 rounded-lg">
                        <strong>O Correto:</strong> {item.correcao}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
