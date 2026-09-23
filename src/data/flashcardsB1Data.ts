export interface Flashcard {
  id: number;
  categoria: 'Questões da Prova' | 'Conceitos do Resumo' | 'Gabarito e Regras';
  frente: string;
  verso: string;
  motivo: string;
}

export const FLASHCARDS_B1_DATA: Flashcard[] = [
  {
    id: 1,
    categoria: 'Questões da Prova',
    frente: 'Q1: Por que é incorreto dizer que bancos relacionais e não relacionais possuem desempenho e escalabilidade semelhantes?',
    verso: 'Resposta C: Desempenho e escalabilidade não são equivalentes por regra.',
    motivo: 'Eles dependem do SGBD, da arquitetura e da carga de trabalho; NoSQL costuma ser superior em escalabilidade horizontal.',
  },
  {
    id: 2,
    categoria: 'Questões da Prova',
    frente: 'Q2: Qual é o nível de representação retratado pelo DER?',
    verso: 'Resposta C: Representa a estrutura conceitual (entidades, atributos e relacionamentos).',
    motivo: 'Tabelas, campos, chaves e tipos concretos de dados pertencem ao modelo lógico ou físico, não ao DER.',
  },
  {
    id: 3,
    categoria: 'Questões da Prova',
    frente: 'Q3: O que as entidades representam em um DER?',
    verso: 'Resposta D: Objetos ou conceitos do mundo real que podem ser armazenados ou consultados.',
    motivo: 'Exemplos: Cliente e Disciplina. Atributos descrevem a entidade e relacionamentos as associam.',
  },
  {
    id: 4,
    categoria: 'Questões da Prova',
    frente: 'Q4: O nome de uma pessoa pode ser considerado um atributo determinante?',
    verso: 'Resposta A: Não, essa afirmação é incorreta.',
    motivo: 'Pessoas distintas podem ter o mesmo nome (homônimos); identificadores determinantes exigem unicidade, como RA ou Código.',
  },
  {
    id: 5,
    categoria: 'Questões da Prova',
    frente: 'Q5: No DER Cliente (1,1) -- Emite -- (0,N) Compra, o cliente é obrigado a ter compras?',
    verso: 'Resposta C: Não, dizer que "Todo cliente deve emitir ao menos uma compra" está incorreto.',
    motivo: 'O par (0,N) junto de Compra estabelece cardinalidade mínima zero: o cliente pode existir cadastrado sem nenhuma compra.',
  },
  {
    id: 6,
    categoria: 'Questões da Prova',
    frente: 'Q6: Em um relacionamento Aluno e Disciplina, onde deve ficar o atributo "Nota"?',
    verso: 'Resposta D: No relacionamento CURSA com cardinalidades ALUNO (0,n) e (1,n) DISCIPLINA.',
    motivo: 'A nota é única por par aluno-disciplina, não podendo pertencer isoladamente nem à Disciplina nem ao Aluno.',
  },
  {
    id: 7,
    categoria: 'Questões da Prova',
    frente: 'Q7: Como a relação N:N entre Aluno e Disciplina é convertida no modelo lógico?',
    verso: 'Resposta B: Em uma tabela associativa CURSA com FK_DisciplinaId + FK_AlunoRa formando a PK composta.',
    motivo: 'A chave primária composta pelas duas chaves estrangeiras garante que não existam notas duplicadas para o mesmo par.',
  },
  {
    id: 8,
    categoria: 'Gabarito e Regras',
    frente: 'Qual é o gabarito oficial completo das 7 questões da Prova B1?',
    verso: '1-C | 2-C | 3-D | 4-A | 5-C | 6-D | 7-B',
    motivo: 'Memorize essa sequência direta para conferência rápida de todas as questões da prova.',
  },
  {
    id: 9,
    categoria: 'Gabarito e Regras',
    frente: 'Como interpretar o par de cardinalidade na convenção adotada pela prova?',
    verso: 'O par escrito perto de uma entidade diz quantas ocorrências dessa entidade se ligam a cada ocorrência da outra.',
    motivo: 'Exemplo: (0,N) perto de Compra = cada cliente tem de zero a muitas compras associadas a ele.',
  },
  {
    id: 10,
    categoria: 'Conceitos do Resumo',
    frente: 'O que caracteriza um atributo identificador (determinante)?',
    verso: 'É o atributo que identifica unicamente cada ocorrência da entidade.',
    motivo: 'Exemplo da prova: Código de Cliente, Número de Compra ou RA de Aluno.',
  },
  {
    id: 11,
    categoria: 'Conceitos do Resumo',
    frente: 'O que é um atributo multivalorado e qual o exemplo dado na prova?',
    verso: 'É um atributo que pode assumir um ou múltiplos valores para a mesma entidade.',
    motivo: 'Exemplo da prova: uma pessoa possuir vários endereços de e-mail.',
  },
  {
    id: 12,
    categoria: 'Conceitos do Resumo',
    frente: 'O que é um atributo derivado e por que a Idade é um exemplo dele?',
    verso: 'É um atributo calculado que não deve ser armazenado diretamente no banco.',
    motivo: 'A idade muda anualmente e deve ser calculada em tempo real com base na Data de Nascimento.',
  },
  {
    id: 13,
    categoria: 'Conceitos do Resumo',
    frente: 'O que é um atributo composto e qual o exemplo da prova?',
    verso: 'É um atributo formado por partes menores que juntas compõem um todo.',
    motivo: 'Exemplo da prova: Endereço, subdividido em Logradouro, Rua, Bairro, CEP etc.',
  },
  {
    id: 14,
    categoria: 'Conceitos do Resumo',
    frente: 'Qual a diferença essencial entre Modelo Conceitual e Modelo Lógico?',
    verso: 'Conceitual foca em entidades e relações do negócio; Lógico define tabelas, colunas, tipos e FKs.',
    motivo: 'O DER é puramente conceitual; já diagramas relacionais com PK e FK pertencem ao modelo lógico.',
  },
  {
    id: 15,
    categoria: 'Conceitos do Resumo',
    frente: 'O que acontece obrigatoriamente quando transformamos um relacionamento N:N em modelo lógico?',
    verso: 'Cria-se uma tabela associativa intermediária.',
    motivo: 'Não é possível colocar FK direta em tabelas N:N sem duplicar linhas ou violar a primeira forma normal.',
  },
  {
    id: 16,
    categoria: 'Conceitos do Resumo',
    frente: 'Por que a tabela CURSA utiliza uma PK composta pelas duas FKs?',
    verso: 'Para impedir que um mesmo aluno receba duas notas na mesma disciplina.',
    motivo: 'A unicidade da combinação (FK_AlunoRa + FK_DisciplinaId) garante a integridade da matrícula e da nota única.',
  },
  {
    id: 17,
    categoria: 'Conceitos do Resumo',
    frente: 'No DER Cliente (1,1) -- Emite -- (0,N) Compra, o que significa o (1,1) junto a Cliente?',
    verso: 'Significa que cada compra pertence obrigatoriamente a exatamente um cliente.',
    motivo: 'Mínimo 1 (toda compra tem ao menos um cliente) e máximo 1 (toda compra tem no máximo um cliente).',
  },
  {
    id: 18,
    categoria: 'Conceitos do Resumo',
    frente: 'Qual é a principal diferença de esquema entre bancos relacionais e não relacionais?',
    verso: 'Relacionais exigem esquema rígido pré-definido; não relacionais não exigem esquema prévio.',
    motivo: 'Bancos NoSQL oferecem flexibilidade estrutural de documentos ou grafos antes do início do uso.',
  },
  {
    id: 19,
    categoria: 'Conceitos do Resumo',
    frente: 'Qual banco é geralmente mais indicado para consultas complexas via SQL?',
    verso: 'Bancos de dados relacionais.',
    motivo: 'A linguagem SQL possui alta versatilidade, padronização e otimização para junções e agregações complexas.',
  },
  {
    id: 20,
    categoria: 'Conceitos do Resumo',
    frente: 'Na Q6, por que a cardinalidade junto de Aluno é (0,n) e não (1,n)?',
    verso: 'Porque o enunciado especifica que "Pode haver Disciplinas sem Alunos".',
    motivo: 'Se uma disciplina pode não ter alunos matriculados, a quantidade mínima de alunos associados a ela é zero (0).',
  },
  {
    id: 21,
    categoria: 'Conceitos do Resumo',
    frente: 'Na Q6, por que a cardinalidade junto de Disciplina é (1,n) e não (0,n)?',
    verso: 'Porque o enunciado especifica que "jamais haverá Alunos sem disciplinas".',
    motivo: 'A participação do aluno é obrigatória: cada aluno deve estar matriculado em ao menos uma disciplina (mínimo 1).',
  },
  {
    id: 22,
    categoria: 'Conceitos do Resumo',
    frente: 'Qual a notação gráfica de entidade, atributo identificador e atributo comum no DER?',
    verso: 'Entidade = Retângulo; Identificador = Círculo Cheio; Atributo Comum = Círculo Vazio.',
    motivo: 'Esta é a notação conceitual padrão adotada nas questões com diagramas da prova.',
  },
];
