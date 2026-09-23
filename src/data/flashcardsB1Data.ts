export interface Flashcard {
  id: number;
  categoria:
    | 'Questões da Prova'
    | 'Relacional vs NoSQL'
    | 'Atributos & Chaves'
    | 'Cardinalidades'
    | 'Transformação Lógica'
    | 'Pegadinhas da Prova'
    | 'NoSQL na Prática';
  frente: string;
  verso: string;
  motivo: string;
}

export const FLASHCARDS_B1_DATA: Flashcard[] = [
  // ================= 1. QUESTÕES OFICIAIS DA PROVA B1 =================
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
    categoria: 'Questões da Prova',
    frente: 'Qual é o gabarito oficial completo das 7 questões da Prova B1?',
    verso: '1-C | 2-C | 3-D | 4-A | 5-C | 6-D | 7-B',
    motivo: 'Memorize essa sequência direta para conferência rápida de todas as questões da prova.',
  },

  // ================= 2. RELACIONAL VS NOSQL =================
  {
    id: 9,
    categoria: 'Relacional vs NoSQL',
    frente: 'Qual é a principal diferença de esquema entre bancos relacionais e não relacionais?',
    verso: 'Relacionais exigem esquema rígido pré-definido; NoSQL não exige esquema antes do uso (schemaless).',
    motivo: 'Bancos relacionais necessitam de tabelas e tipos prévios; NoSQL permite salvar documentos com estruturas dinâmicas.',
  },
  {
    id: 10,
    categoria: 'Relacional vs NoSQL',
    frente: 'Quais são as 4 principais famílias de bancos de dados NoSQL e exemplos?',
    verso: 'Chave-Valor (Redis), Documentos (MongoDB), Família de Colunas (Cassandra) e Grafos (Neo4j).',
    motivo: 'Cada modelo atende a um padrão: Redis para cache ultrarrápido, Mongo para JSONs, Cassandra para Big Data e Neo4j para conexões.',
  },
  {
    id: 11,
    categoria: 'Relacional vs NoSQL',
    frente: 'Como se comparam a Escalabilidade Vertical e a Escalabilidade Horizontal?',
    verso: 'Vertical (Scale-Up) aumenta poder de um único servidor (CPU/RAM); Horizontal (Scale-Out) adiciona novas máquinas ao cluster.',
    motivo: 'Relacionais tradicionalmente usam escalabilidade vertical; NoSQL foi projetado nativamente para escalabilidade horizontal.',
  },
  {
    id: 12,
    categoria: 'Relacional vs NoSQL',
    frente: 'O que significa a sigla ACID garantida pelos bancos de dados relacionais?',
    verso: 'Atomicidade (tudo ou nada), Consistência (regras válidas), Isolamento (transações separadas) e Durabilidade (persiste no disco).',
    motivo: 'Garante que transações críticas (como transferências bancárias) nunca deixem o banco em estado inconsistente ou corrompido.',
  },
  {
    id: 13,
    categoria: 'Relacional vs NoSQL',
    frente: 'O que prega o Teorema CAP para bancos de dados distribuídos?',
    verso: 'Só é possível garantir 2 de 3 propriedades simultaneamente: Consistência (C), Disponibilidade (A) e Tolerância a Partição (P).',
    motivo: 'Em redes sujeitas a falhas de comunicação (P), o arquiteto deve optar entre consistência estrita (CP) ou disponibilidade ininterrupta (AP).',
  },
  {
    id: 14,
    categoria: 'Relacional vs NoSQL',
    frente: 'Por que bancos relacionais são considerados superiores em consultas analíticas complexas?',
    verso: 'Pela maturidade e versatilidade da linguagem SQL em realizar múltiplos JOINs, filtros e agregações.',
    motivo: 'NoSQL costuma desnormalizar os dados para leitura rápida pontual, tornando consultas com múltiplos relacionamentos menos eficientes.',
  },

  // ================= 3. ATRIBUTOS & CHAVES =================
  {
    id: 15,
    categoria: 'Atributos & Chaves',
    frente: 'O que é um atributo identificador (determinante) no modelo de dados?',
    verso: 'É o atributo com valor único capaz de distinguir individualmente cada ocorrência da entidade.',
    motivo: 'Exemplos: RA do aluno, CPF do cliente ou CNPJ da empresa. Não podem existir dois registros com o mesmo identificador.',
  },
  {
    id: 16,
    categoria: 'Atributos & Chaves',
    frente: 'O que é um atributo multivalorado e qual a sua representação?',
    verso: 'É aquele que pode conter mais de um valor para uma mesma entidade (ex: telefones de contato).',
    motivo: 'No modelo relacional, atributos multivalorados violam a 1ª Forma Normal e devem virar uma tabela filha.',
  },
  {
    id: 17,
    categoria: 'Atributos & Chaves',
    frente: 'O que é um atributo derivado e por que ele NÃO deve ser armazenado?',
    verso: 'É um valor calculado a partir de outros dados (ex: Idade calculada a partir da Data de Nascimento).',
    motivo: 'Armazenar dados derivados gera redundância e risco de desatualização periódica.',
  },
  {
    id: 18,
    categoria: 'Atributos & Chaves',
    frente: 'O que é um atributo composto no DER?',
    verso: 'É um atributo formado pela união de partes menores que juntas compõem o dado.',
    motivo: 'Exemplo: Endereço subdividido em Rua, Número, Bairro, Cidade e CEP.',
  },
  {
    id: 19,
    categoria: 'Atributos & Chaves',
    frente: 'Qual a diferença entre Chave Primária (PK) e Chave Estrangeira (FK)?',
    verso: 'PK identifica unicamente a linha na própria tabela; FK aponta para a PK de outra tabela para criar vínculo.',
    motivo: 'A FK implementa o relacionamento e preserva a Integridade Referencial do banco.',
  },
  {
    id: 20,
    categoria: 'Atributos & Chaves',
    frente: 'O que é uma Chave Primária Composta?',
    verso: 'Uma PK formada pela junção de duas ou mais colunas que, juntas, garantem a unicidade da linha.',
    motivo: 'Utilizada essencialmente em tabelas associativas N:N (ex: FK_Aluno + FK_Disciplina na tabela CURSA).',
  },
  {
    id: 21,
    categoria: 'Atributos & Chaves',
    frente: 'Qual é a notação gráfica oficial de Chen (brModelo) para atributos?',
    verso: 'Atributo Identificador = Círculo Cheio (preto); Atributo Comum = Círculo Vazio.',
    motivo: 'Entidade é representada por retângulo e relacionamento por losango.',
  },

  // ================= 4. CARDINALIDADES =================
  {
    id: 22,
    categoria: 'Cardinalidades',
    frente: 'Como ler o par de cardinalidade na convenção adotada pela prova?',
    verso: 'O par perto de uma entidade diz QUANTAS ocorrências dessa entidade se ligam a CADA ocorrência da outra.',
    motivo: 'Exemplo: (0,N) perto de Compra = cada cliente tem de 0 a muitas compras vinculadas.',
  },
  {
    id: 23,
    categoria: 'Cardinalidades',
    frente: 'O que significa a cardinalidade mínima ser ZERO (0)?',
    verso: 'Significa participação opcional: a entidade pode existir no banco sem estar relacionada a nenhuma da outra.',
    motivo: 'Exemplo: Um cliente recém-cadastrado pode não ter nenhuma compra ainda.',
  },
  {
    id: 24,
    categoria: 'Cardinalidades',
    frente: 'O que significa a cardinalidade mínima ser UM (1)?',
    verso: 'Significa participação obrigatória: a entidade não pode existir sem estar vinculada a pelo menos uma da outra.',
    motivo: 'Exemplo: Toda compra deve obrigatoriamente pertencer a pelo menos 1 cliente.',
  },
  {
    id: 25,
    categoria: 'Cardinalidades',
    frente: 'Na questão 6 da prova, por que a cardinalidade junto de Aluno é (0,n)?',
    verso: 'Porque o enunciado declara que "Pode haver Disciplinas sem Alunos".',
    motivo: 'Se uma disciplina pode ter zero alunos inscritos, a cardinalidade mínima de alunos é 0.',
  },
  {
    id: 26,
    categoria: 'Cardinalidades',
    frente: 'Na questão 6 da prova, por que a cardinalidade junto de Disciplina é (1,n)?',
    verso: 'Porque o enunciado declara que "jamais haverá Alunos sem disciplinas".',
    motivo: 'Todo aluno é obrigado a cursar ao menos uma matéria, portanto a cardinalidade mínima é 1.',
  },
  {
    id: 27,
    categoria: 'Cardinalidades',
    frente: 'O que é uma cardinalidade (1,1) perto de uma entidade?',
    verso: 'Obrigatoriedade e unicidade: exatamente uma ocorrência (nem zero, nem mais de uma).',
    motivo: 'Exemplo: Cada compra pertence a exatamente 1 cliente.',
  },

  // ================= 5. TRANSFORMAÇÃO LÓGICA & NORMALIZAÇÃO =================
  {
    id: 28,
    categoria: 'Transformação Lógica',
    frente: 'O que acontece obrigatoriamente com relacionamentos N:N na passagem para o Modelo Lógico?',
    verso: 'É gerada uma Tabela Associativa intermediária contendo as chaves estrangeiras das duas entidades.',
    motivo: 'Não é possível colocar uma FK simples em tabelas N:N sem gerar repetições ou campos multivalorados.',
  },
  {
    id: 29,
    categoria: 'Transformação Lógica',
    frente: 'Em um relacionamento 1:N (ex: Departamento 1:N Funcionários), onde vai a Chave Estrangeira (FK)?',
    verso: 'A FK vai sempre para o lado N (na tabela Funcionário).',
    motivo: 'Cada funcionário aponta para 1 departamento (coluna FK_Depto); já o departamento possui muitos funcionários.',
  },
  {
    id: 30,
    categoria: 'Transformação Lógica',
    frente: 'Onde deve ser armazenado um atributo que pertence ao relacionamento (ex: Nota em CURSA)?',
    verso: 'Dentro da Tabela Associativa intermediária resultante do relacionamento.',
    motivo: 'A nota não é propriedade nem exclusiva do aluno nem da disciplina, mas sim do vínculo entre os dois.',
  },
  {
    id: 31,
    categoria: 'Transformação Lógica',
    frente: 'O que determina a Primeira Forma Normal (1FN)?',
    verso: 'Eliminar atributos multivalorados e compostos; todos os campos devem conter valores atômicos indivisíveis.',
    motivo: 'Garante que nenhuma célula da tabela contenha listas de valores (como vários telefones numa string).',
  },
  {
    id: 32,
    categoria: 'Transformação Lógica',
    frente: 'O que determina a Segunda Forma Normal (2FN)?',
    verso: 'Estar na 1FN e nenhum atributo não-chave depender de parte de uma chave primária composta.',
    motivo: 'Elimina dependência parcial: cada coluna deve depender da totalidade da chave primária.',
  },
  {
    id: 33,
    categoria: 'Transformação Lógica',
    frente: 'O que determina a Terceira Forma Normal (3FN)?',
    verso: 'Estar na 2FN e nenhum atributo não-chave depender de outro atributo não-chave (elimina dependência transitiva).',
    motivo: 'Exemplo: Cidade depende de CEP, não diretamente do ID do Cliente. Deve ser movida para tabela própria.',
  },
  {
    id: 34,
    categoria: 'Transformação Lógica',
    frente: 'Qual a diferença entre Modelo Conceitual, Lógico e Físico?',
    verso: 'Conceitual = entidades/DER; Lógico = tabelas, PKs e FKs relacionais; Físico = scripts SQL DDL e índices.',
    motivo: 'O conceitual descreve a regra de negócio; o lógico organiza os dados; o físico implementa no SGBD.',
  },

  // ================= 6. PEGADINHAS DA PROVA =================
  {
    id: 35,
    categoria: 'Pegadinhas da Prova',
    frente: 'Pegadinha Q4: Por que "Nome de Aluno" não pode ser atributo determinante nem chave primária?',
    verso: 'Porque nomes de pessoas sofrem de homônimos (pessoas diferentes com o mesmo nome).',
    motivo: 'Atributos identificadores exigem garantia absoluta de unicidade (como RA, CPF ou ID sequencial).',
  },
  {
    id: 36,
    categoria: 'Pegadinhas da Prova',
    frente: 'Pegadinha Q5: Ler o número perto de Cliente e achar que é a quantidade de compras dele.',
    verso: 'Incorreto! O número (1,1) perto de Cliente diz que toda compra pertence a 1 cliente.',
    motivo: 'Para saber as compras do cliente, olhe o par (0,N) escrito perto da entidade Compra!',
  },
  {
    id: 37,
    categoria: 'Pegadinhas da Prova',
    frente: 'Pegadinha Q6: Colocar a "Nota" dentro da entidade Aluno ou da entidade Disciplina.',
    verso: 'Incorreto! A nota pertence exclusivamente ao relacionamento associativo CURSA.',
    motivo: 'Se colocar em Aluno, ele só tem uma nota para a vida toda. Se colocar em Disciplina, a nota é a mesma para todos os alunos.',
  },
  {
    id: 38,
    categoria: 'Pegadinhas da Prova',
    frente: 'Pegadinha Q7: Esquecer que a PK da tabela associativa é COMPOSTA.',
    verso: 'As chaves estrangeiras (FK_Aluno + FK_Disciplina) juntas formam a PK da tabela CURSA.',
    motivo: 'Isso é crucial: impede que o mesmo aluno tenha duas notas registradas na mesma matéria.',
  },
  {
    id: 39,
    categoria: 'Pegadinhas da Prova',
    frente: 'Pegadinha Q1: Supor que bancos relacionais e NoSQL possuem desempenho igual.',
    verso: 'Totalmente incorreto! Depende da arquitetura, volume de dados e tipo de consulta.',
    motivo: 'NoSQL brilha em alto volume e escrita distribuída, enquanto Relacionais brilham em integridade e consultas analíticas.',
  },

  // ================= 7. NOSQL NA PRÁTICA =================
  {
    id: 40,
    categoria: 'NoSQL na Prática',
    frente: 'Quando um banco de dados NoSQL do tipo Chave-Valor (ex: Redis) é ideal?',
    verso: 'Para cache em memória de alta performance, sessões de usuários e contadores em tempo real.',
    motivo: 'O acesso via chave direta em memória RAM atinge latência de sub-milissegundos.',
  },
  {
    id: 41,
    categoria: 'NoSQL na Prática',
    frente: 'Quando um banco de dados NoSQL Orientado a Documentos (ex: MongoDB) é ideal?',
    verso: 'Para dados semiestruturados, catálogos de e-commerce e dados que variam de formato por registro.',
    motivo: 'Armazena documentos em BSON/JSON hierárquico, dispensando JOINs complexos para ler entidades inteiras.',
  },
  {
    id: 42,
    categoria: 'NoSQL na Prática',
    frente: 'Quando um banco NoSQL Orientado a Grafos (ex: Neo4j) é a melhor escolha?',
    verso: 'Para redes sociais, sistemas de recomendação, prevenção de fraudes e rotas de transporte.',
    motivo: 'Nós e arestas são tratados como cidadãos de primeira classe, permitindo navegar por conexões profundas com máxima velocidade.',
  },
  {
    id: 43,
    categoria: 'NoSQL na Prática',
    frente: 'Em que cenário NUNCA se deve substituir um banco relacional por NoSQL?',
    verso: 'Sistemas com forte exigência de conformidade financeira, contabilidade e regras de integridade transacional estritas.',
    motivo: 'A garantia ACID e a consistência forte imediata de um banco SQL são indispensáveis onde qualquer divergência financeira é inaceitável.',
  },
];
