export interface Alternative {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface SimuladoQuestion {
  id: number;
  pontos: number;
  assunto: string;
  enunciado: string;
  alternativas: Alternative[];
  respostaCorreta: 'a' | 'b' | 'c' | 'd';
  explicacao: string;
  hasSvg?: 'q5' | 'q6' | 'q7';
}

export const SIMULADO_QUESTIONS: SimuladoQuestion[] = [
  {
    id: 1,
    pontos: 1.0,
    assunto: 'Diferenças entre bancos relacionais e não relacionais, SQL e escalabilidade.',
    enunciado: 'Relacionais x não relacionais. Qual afirmação está INCORRETA?',
    alternativas: [
      {
        id: 'a',
        text: 'Relacionais usam SQL para definir/manipular dados; não relacionais geralmente não usam SQL.',
      },
      {
        id: 'b',
        text: 'Relacionais guardam dados em tabelas e colunas (modelo relacional); não relacionais não exigem esquema predefinido.',
      },
      {
        id: 'c',
        text: 'Relacionais e não relacionais têm desempenho semelhante e escalabilidade horizontal; a diferença é só estrutura de armazenamento e linguagem de consulta.',
      },
      {
        id: 'd',
        text: 'Relacionais são bons para consultas complexas (versatilidade do SQL); não relacionais são melhores quando a escalabilidade horizontal é crucial.',
      },
    ],
    respostaCorreta: 'c',
    explicacao:
      'Resposta: C. Desempenho e escalabilidade horizontal equivalentes não são regra: dependem do SGBD, da arquitetura e da carga. As diferenças também envolvem modelo de dados e compromissos de consistência. A, B e D são generalizações didáticas (existem exceções).',
  },
  {
    id: 2,
    pontos: 1.0,
    assunto: 'DER e modelagem conceitual de dados.',
    enunciado: 'Sobre o DER, qual afirmação é VERDADEIRA?',
    alternativas: [
      {
        id: 'a',
        text: 'Usado exclusivamente para implementar operações de manipulação de dados.',
      },
      {
        id: 'b',
        text: 'Representa a estrutura lógica: tabelas, campos, tipos de dados e relacionamentos.',
      },
      {
        id: 'c',
        text: 'Representa a estrutura conceitual: entidades, atributos e relacionamentos entre elas.',
      },
      {
        id: 'd',
        text: 'É técnica de modelagem física, detalhando a implementação em um SGBD específico.',
      },
    ],
    respostaCorreta: 'c',
    explicacao:
      'Resposta: C. Tabelas, campos e tipos concretos pertencem ao modelo lógico ou físico.',
  },
  {
    id: 3,
    pontos: 1.0,
    assunto: 'Elementos do DER: entidades.',
    enunciado: 'As entidades em um DER:',
    alternativas: [
      {
        id: 'a',
        text: 'Representam os atributos.',
      },
      {
        id: 'b',
        text: 'São usadas apenas para definir relacionamentos entre tabelas.',
      },
      {
        id: 'c',
        text: 'Especificam as operações de consulta.',
      },
      {
        id: 'd',
        text: 'Representam objetos ou conceitos do mundo real que podem ser armazenados ou consultados no banco.',
      },
    ],
    respostaCorreta: 'd',
    explicacao:
      'Resposta: D. Cliente e Disciplina são entidades; Nome e RA são atributos. Revisão: entidade = objeto/conceito; atributo = descreve a entidade; relacionamento = associa entidades.',
  },
  {
    id: 4,
    pontos: 1.0,
    assunto: 'Tipos de atributo: identificador, multivalorado, derivado e composto.',
    enunciado: 'Tipos de atributo. Qual afirmação é INCORRETA?',
    alternativas: [
      {
        id: 'a',
        text: 'Nome de uma pessoa pode ser atributo determinante, pois determina quem ela é.',
      },
      {
        id: 'b',
        text: 'Vários e-mails por pessoa: atributo multivalorado.',
      },
      {
        id: 'c',
        text: 'Idade não deve ser armazenada; é atributo derivado, calculado a partir da Data de Nascimento.',
      },
      {
        id: 'd',
        text: 'Endereço é atributo composto (Logradouro, Rua, Bairro etc.).',
      },
    ],
    respostaCorreta: 'a',
    explicacao:
      'Resposta: A. Nome não identifica necessariamente uma pessoa (nomes repetem). Um RA ou outro identificador único cumpre esse papel.',
  },
  {
    id: 5,
    pontos: 2.0,
    assunto: 'Cardinalidade mínima e máxima em relacionamentos do DER.',
    enunciado:
      'DER: entidade CLIENTE (identificador Código, atributo Nome) --(1,1)-- relacionamento EMITE --(0,N)-- entidade COMPRA (identificador Número, atributo Data). O (1,1) fica junto de Cliente e o (0,N) junto de Compra. Qual alternativa é INCORRETA?',
    alternativas: [
      {
        id: 'a',
        text: 'O cliente pode emitir várias compras.',
      },
      {
        id: 'b',
        text: 'Toda compra deve ter ao menos um cliente.',
      },
      {
        id: 'c',
        text: 'Todo cliente deve emitir ao menos uma compra.',
      },
      {
        id: 'd',
        text: 'Toda compra tem no máximo 1 cliente.',
      },
    ],
    respostaCorreta: 'c',
    explicacao:
      'Resposta: C. (0,N) junto de Compra permite zero ou muitas compras por cliente; (1,1) junto de Cliente indica exatamente um cliente por compra. O cliente pode ainda não ter comprado.',
    hasSvg: 'q5',
  },
  {
    id: 6,
    pontos: 2.0,
    assunto: 'Cardinalidade N:N, participação obrigatória e atributo do relacionamento.',
    enunciado:
      'Enunciado: faculdade registra Alunos matriculados em Disciplinas. Aluno: só RA e Nome. Uma disciplina tem vários alunos e um aluno cursa várias disciplinas. Pode haver Disciplinas sem Alunos, mas jamais Alunos sem disciplinas. Disciplina tem Nome e Carga Horária. Registrar a Nota de um Aluno em uma Disciplina (uma única nota). Qual DER atende?\n(Todas as alternativas têm ALUNO com identificador AlunoRa e atributo AlunoNome; relacionamento CURSA; e DISCIPLINA com identificador DisciplinaId, DisciplinaNome e DisciplinaCargaHoraria).',
    alternativas: [
      {
        id: 'a',
        text: 'ALUNO (0,n) -- CURSA -- (0,1) DISCIPLINA; sem nota no relacionamento.',
      },
      {
        id: 'b',
        text: 'ALUNO (0,n) -- CURSA -- (1,n) DISCIPLINA; a Nota está como atributo de DISCIPLINA (DisciplinaNota).',
      },
      {
        id: 'c',
        text: 'ALUNO (0,n) -- CURSA -- (0,n) DISCIPLINA; Nota como atributo do relacionamento CURSA.',
      },
      {
        id: 'd',
        text: 'ALUNO (0,n) -- CURSA -- (1,n) DISCIPLINA; Nota como atributo do relacionamento CURSA.',
      },
    ],
    respostaCorreta: 'd',
    explicacao:
      'Resposta: D. Disciplinas sem alunos (mínimo 0), ao menos uma disciplina por aluno (mínimo 1), N:N dos dois lados. A Nota fica em CURSA: cada par Aluno-Disciplina tem sua nota.',
    hasSvg: 'q6',
  },
  {
    id: 7,
    pontos: 2.0,
    assunto: 'Transformação do DER em modelo lógico relacional; tabela associativa, chaves estrangeiras e atributo do relacionamento.',
    enunciado: 'Assinale o único modelo lógico que atende os requisitos e o DER correto da Q6.',
    alternativas: [
      {
        id: 'a',
        text: 'Só 2 tabelas: ALUNO (AlunoRa, AlunoNome, FK para Disciplina) e DISCIPLINA (DisciplinaId, Nome, CargaHoraria, DisciplinaNota); ligação (0,n)-(0,1). Sem tabela associativa.',
      },
      {
        id: 'b',
        text: 'ALUNO (AlunoRa PK, AlunoNome); DISCIPLINA (DisciplinaId PK, Nome, CargaHoraria); CURSA (FK_DisciplinaId + FK_AlunoRa como PK composta, Nota). ALUNO (0,1)--(0,n) CURSA; DISCIPLINA (1,1)--(1,n) CURSA.',
      },
      {
        id: 'c',
        text: 'ALUNO (AlunoRa, Nome); DISCIPLINA (DisciplinaId, Nome, CargaHoraria, DisciplinaNota); CURSA (FK_DisciplinaId, FK_AlunoRa) sem Nota.',
      },
      {
        id: 'd',
        text: 'ALUNO (AlunoRa, Nome, AlunoNota); DISCIPLINA (DisciplinaId, Nome, CargaHoraria); CURSA (FK_DisciplinaId, FK_AlunoRa) sem Nota.',
      },
    ],
    respostaCorreta: 'b',
    explicacao:
      'Resposta: B. N:N vira tabela associativa CURSA com as FKs de ALUNO e DISCIPLINA; a Nota fica em CURSA porque depende do par. C e D põem a nota na entidade errada; A não representa o N:N. Estrutura esperada: ALUNO(RA, Nome); DISCIPLINA(ID, Nome, CargaHoraria); CURSA(RA_Aluno, ID_Disciplina, Nota), com as 2 FKs compondo a PK para impedir duas notas para o mesmo par.',
    hasSvg: 'q7',
  },
];
