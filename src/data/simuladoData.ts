export interface SimuladoQuestion {
  id: string;
  enunciado: string;
  contexto?: string;
  pontos: number;
  categoria: 'Fundamentos' | 'UML' | 'Requisitos' | 'Gestão e Pilares' | 'Casos de Uso';
  tipo: 'multipla_escolha';
  alternativas: {
    id: 'A' | 'B' | 'C' | 'D' | 'E';
    texto: string;
    explicacao: string;
  }[];
  correta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacaoGeral: string;
  origem: 'Prova Oficial UNIP NP1' | 'Variação da Prova';
}

export interface FlashcardItem {
  id: string;
  pergunta: string;
  categoria: string;
  resposta: string;
  macete?: string;
  destaque?: string;
}

// Banco de Questões cuidadosamente alinhado à prova oficial da UNIP (Prof. Valter Canhizares Filho)
export const BANCO_QUESTOES: SimuladoQuestion[] = [
  {
    id: 'q-oficial-1',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'Fundamentos',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Sobre as questões que afetam diretamente o processo de desenvolvimento de projetos, assinale a INCORRETA:',
    contexto: 'Questão 1 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'Heterogeneidade do projeto.',
        explicacao:
          'Incorreto marcar esta (a afirmativa é verdadeira): heterogeneidade de sistemas, plataformas e tecnologias é um desafio real e central da engenharia de software moderna.',
      },
      {
        id: 'B',
        texto: 'Homogeneidade do projeto.',
        explicacao:
          'Gabarito! Os sistemas reais são HETEROGÊNEOS (diferentes tecnologias, plataformas, usuários e integrações). Projetos de software não pressupõem homogeneidade, portanto essa afirmativa é a incorreta.',
      },
      {
        id: 'C',
        texto: 'Security e Trust.',
        explicacao:
          'Incorreto marcar esta (a afirmativa é verdadeira): segurança e confiança são preocupações indispensáveis no desenvolvimento de software.',
      },
      {
        id: 'D',
        texto: 'Escalabilidade do projeto.',
        explicacao:
          'Incorreto marcar esta (a afirmativa é verdadeira): a capacidade de crescer suportando mais cargas e usuários impacta o projeto diretamente.',
      },
      {
        id: 'E',
        texto: 'Mudanças na sociedade e nos negócios.',
        explicacao:
          'Incorreto marcar esta (a afirmativa é verdadeira): o dinamismo do mercado e da sociedade gera requisitos voláteis que guiam o software ágil.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'Projetos de software precisam lidar com HETEROGENEIDADE (diversidade de linguagens, dispositivos e ambientes), segurança (Security & Trust), escalabilidade e mudanças de mercado. Homogeneidade NÃO é um fator que rege o desenvolvimento de software.',
  },
  {
    id: 'q-oficial-2',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'UML',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'A UML é linguagem padrão de modelagem no campo da Engenharia de Software. Das seguintes alternativas, selecione a CORRETA:',
    contexto: 'Questão 2 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'A UML é uma metodologia de desenvolvimento de software.',
        explicacao:
          'Falso: UML é uma linguagem de modelagem gráfica (notação visual), e não uma metodologia de processo como Scrum, Kanban ou RUP.',
      },
      {
        id: 'B',
        texto: 'Com a UML, é possível descrever sistemas de software orientados a objetos.',
        explicacao:
          'Gabarito correto! A UML foi criada exatamente para modelar, visualizar, especificar e documentar artefatos de sistemas orientados a objetos.',
      },
      {
        id: 'C',
        texto: 'Quando utilizamos a UML, a análise, projeto e código fonte têm que ser feitos em inglês.',
        explicacao:
          'Falso: a UML não impõe idioma algum para artefatos, regras de negócio ou nomes de casos de uso.',
      },
      {
        id: 'D',
        texto: 'A UML é indicada para ser utilizada em projetos Java.',
        explicacao:
          'Falso: a UML é agnóstica de linguagem de programação; pode ser usada com Python, C#, PHP, TypeScript ou qualquer tecnologia orientada a objetos.',
      },
      {
        id: 'E',
        texto: 'Todas as alternativas acima estão corretas.',
        explicacao:
          'Falso: as alternativas A, C e D contêm erros conceituais clássicos de pegadinha de prova.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'A UML (Unified Modeling Language) é uma notação padrão e universal para especificação e modelagem de sistemas orientados a objetos. Não é metodologia de desenvolvimento e não é vinculada a um idioma nem a uma linguagem específica como Java.',
  },
  {
    id: 'q-oficial-3',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'Requisitos',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Requisitos funcionais e não funcionais podem definir características e funcionalidades presentes na interface a ser desenvolvida para um sistema. Em relação aos requisitos não funcionais, também chamados de requisitos de qualidade, avalie as afirmativas:\n\nI. São levantados e elicitados após os requisitos funcionais, uma vez que os requisitos funcionais determinarão as funcionalidades da interface.\nII. Sempre serão definidos de forma mais concreta, por meio de requisitos funcionais, uma vez que o usuário manipula na interface somente as funcionalidades levantadas.\nIII. Podem complementar os requisitos funcionais.\n\nÉ correto o que se afirma em:',
    contexto: 'Questão 3 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'II, apenas.',
        explicacao:
          'Incorreto: a afirmativa II confunde o papel dos requisitos não funcionais, que estabelecem propriedades de qualidade e restrições.',
      },
      {
        id: 'B',
        texto: 'III, apenas.',
        explicacao:
          'Gabarito correto! Apenas a afirmativa III é verdadeira. Os RNF complementam os funcionais adicionando restrições de qualidade.',
      },
      {
        id: 'C',
        texto: 'I e II, apenas.',
        explicacao:
          'Incorreto: a afirmativa I é falsa (RNF e RF são elicitados concomitantemente desde o início) e a II também é falsa.',
      },
      {
        id: 'D',
        texto: 'I e III, apenas.',
        explicacao:
          'Incorreto: a afirmativa I é falsa porque não há obrigatoriedade de elicitar RNF somente após RF.',
      },
      {
        id: 'E',
        texto: 'I, II e III.',
        explicacao:
          'Incorreto: tanto a afirmativa I quanto a II estão erradas conceitualmente.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'Requisitos Não Funcionais (RNF) são levantados junto com os funcionais (não depois) e qualificam como o sistema deve operar (segurança, desempenho, confiabilidade). Eles complementam diretamente os requisitos funcionais.',
  },
  {
    id: 'q-oficial-4',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'Casos de Uso',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Na engenharia de requisitos, a UML oferece ferramentas para apoiar a modelagem visual do sistema a ser desenvolvido. Considerando a relação entre o diagrama de casos de uso e os requisitos funcionais, assinale a alternativa CORRETA:',
    contexto: 'Questão 4 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'O diagrama de casos de uso é focado em mapear a solução técnica do software, detalhando os requisitos não funcionais de desempenho e segurança.',
        explicacao:
          'Falso: casos de uso mapeiam a visão externa/funcional do usuário, e não a solução técnica interna ou requisitos não funcionais.',
      },
      {
        id: 'B',
        texto: 'Os casos de uso têm por objetivos decidir e descrever os requisitos funcionais do sistema, mapeando o problema a partir da visão do usuário.',
        explicacao:
          'Gabarito correto! O diagrama de casos de uso modela exatamente as ações e comportamentos esperados (requisitos funcionais) sob a perspectiva dos atores (visão do usuário).',
      },
      {
        id: 'C',
        texto: 'Os requisitos funcionais representam restrições tecnológicas de infraestrutura, sendo modelados nos casos de uso por meio de diagramas comportamentais de banco de dados.',
        explicacao:
          'Falso: restrições tecnológicas são requisitos não funcionais, e casos de uso não modelam diagramas de banco de dados.',
      },
      {
        id: 'D',
        texto: 'A principal função do diagrama de casos de uso é detalhar a estrutura de código-fonte necessária para implementar os requisitos funcionais.',
        explicacao:
          'Falso: código-fonte e estrutura de classes são modelados por diagramas estruturais (como diagrama de classes), não casos de uso.',
      },
      {
        id: 'E',
        texto: 'Requisitos funcionais não podem ser representados por casos de uso, pois estes últimos destinam-se exclusivamente a descrever regras de negócio sem interação com atores.',
        explicacao:
          'Falso: a essência do caso de uso é justamente representar a interação entre atores e o sistema para cumprir requisitos funcionais.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'O Diagrama de Casos de Uso serve para delimitar o escopo e especificar os Requisitos Funcionais sob o olhar do ator/usuário, abstraindo detalhes de código-fonte ou banco de dados.',
  },
  {
    id: 'q-oficial-5',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'Gestão e Pilares',
    pontos: 1.5,
    tipo: 'multipla_escolha',
    enunciado:
      'Uma equipe reestrutura a arquitetura de um software sob um cronograma muito agressivo. Sem tempo hábil para treinamento, a equipe toma atalhos de implementação que geram falhas, latência e grande dívida técnica. Analisando esse cenário, qual afirmativa descreve CORRETAMENTE o impacto dessa decisão nos três pilares de projetos?',
    contexto: 'Questão 5 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'O foco no tempo e no custo foi bem-sucedido, pois a nova arquitetura naturalmente tornará a manutenção mais barata.',
        explicacao:
          'Falso: dívida técnica encarece exponencialmente as manutenções futuras.',
      },
      {
        id: 'B',
        texto: 'O tempo foi o pilar sacrificado para resolver a arquitetura, impactando secundariamente a qualidade e o custo.',
        explicacao:
          'Falso: o tempo foi priorizado (o cronograma foi acelerado), e quem foi sacrificado foi a qualidade.',
      },
      {
        id: 'C',
        texto: 'A qualidade foi comprometida a curto prazo, mas a nova arquitetura restaurará rapidamente o equilíbrio de custo e tempo.',
        explicacao:
          'Falso: sem refatoração deliberada, dívida técnica não se restaura sozinha e gera custos crescentes.',
      },
      {
        id: 'D',
        texto: 'A qualidade foi sacrificada para cumprir o prazo. A dívida técnica resultante aumentará o custo de manutenção e causará atrasos futuros, anulando o ganho de tempo inicial.',
        explicacao:
          'Gabarito correto! No triângulo de restrições (tempo, custo e qualidade), acelerar o prazo sem recursos extras sacrifica a qualidade. A dívida técnica gerada cobrará juros sob forma de retrabalho, lentidão e altos custos posteriores.',
      },
      {
        id: 'E',
        texto: 'O custo foi o único pilar prejudicado, pois exigirá contratações futuras, mantendo a qualidade e o tempo inalterados.',
        explicacao:
          'Falso: a qualidade foi diretamente arruinada por falhas e latência, e o tempo futuro será impactado.',
      },
    ],
    correta: 'D',
    explicacaoGeral:
      'Quando atalhos de implementação são adotados para cumprir um cronograma agressivo, o pilar da QUALIDADE é sacrificado. A dívida técnica gerada atrasa entregas futuras e eleva o custo de manutenção, anulando o suposto ganho inicial.',
  },
  {
    id: 'q-oficial-6',
    origem: 'Prova Oficial UNIP NP1',
    categoria: 'Requisitos',
    pontos: 1.5,
    tipo: 'multipla_escolha',
    enunciado:
      'A engenharia de requisitos exige que o analista compreenda profundamente a natureza das necessidades do sistema para especificá-lo e documentá-lo corretamente. A respeito das características, da distinção e da relação entre requisitos funcionais e não funcionais, assinale a alternativa CORRETA:',
    contexto: 'Questão 6 da Prova NP1 • Engenharia de Software Ágil',
    alternativas: [
      {
        id: 'A',
        texto: 'Requisitos não funcionais são restrições sobre as funcionalidades do sistema e, por possuírem menor importância em relação ao comportamento básico do software, devem ser levantados e elicitados apenas após a conclusão da etapa de especificação dos requisitos funcionais.',
        explicacao:
          'Falso: RNF não têm menor importância e não devem ser elicitados apenas após a conclusão dos RF.',
      },
      {
        id: 'B',
        texto: 'Os requisitos funcionais descrevem as características e propriedades de qualidade que um sistema exibe, tais como a segurança no acesso aos dados, o tempo de resposta (desempenho) e a confiabilidade na execução das rotinas.',
        explicacao:
          'Falso: segurança, tempo de resposta e confiabilidade são requisitos NÃO funcionais (qualidade).',
      },
      {
        id: 'C',
        texto: 'Embora sejam categorias com propósitos diferentes, os requisitos não funcionais complementam os funcionais ao incorporar elementos fundamentais para o cliente, atuando frequentemente como restrições de qualidade sobre o comportamento que o sistema deve oferecer.',
        explicacao:
          'Gabarito correto! Essa é a definição precisa da Engenharia de Software: RF diz o que o software faz; RNF estabelece como ele deve se comportar em qualidade (segurança, desempenho, disponibilidade).',
      },
      {
        id: 'D',
        texto: 'O desempenho e a usabilidade são classificados como requisitos funcionais, uma vez que descrevem, de forma direta, as funcionalidades da interface que permitem ao usuário controlar, aprender e memorizar o uso do sistema.',
        explicacao:
          'Falso: desempenho e usabilidade são requisitos NÃO funcionais clássicos.',
      },
      {
        id: 'E',
        texto: 'A distinção primária entre essas categorias baseia-se no seu público leitor: os requisitos funcionais são descritos sem detalhamentos técnicos para os usuários finais, enquanto os requisitos não funcionais são elaborados com alto nível de detalhes exclusivamente para a equipe de programação.',
        explicacao:
          'Falso: RNF interessam diretamente ao cliente e negócio (ex.: conformidade com LGPD, segurança e tempo de resposta tolerável).',
      },
    ],
    correta: 'C',
    explicacaoGeral:
      'Requisitos Funcionais definem as funções e fluxos operacionais; Requisitos Não Funcionais definem restrições de qualidade (performance, usabilidade, segurança) e complementam os primeiros, sendo fundamentais tanto para o usuário quanto para a viabilidade do produto.',
  },
  {
    id: 'q-var-1',
    origem: 'Variação da Prova',
    categoria: 'Casos de Uso',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'No diagrama de casos de uso da UML, qual é a principal diferença de aplicação prática entre os relacionamentos <<include>> e <<extend>>?',
    contexto: 'Conceito chave cobrado pelo Prof. Valter para a Questão 7',
    alternativas: [
      {
        id: 'A',
        texto: '<<include>> indica um comportamento opcional que só executa sob certas condições, enquanto <<extend>> é obrigatório em todas as execuções.',
        explicacao: 'Inverteu a lógica: include é obrigatório; extend é opcional/condicional.',
      },
      {
        id: 'B',
        texto: '<<include>> indica obrigatoriedade (sempre executado como parte do fluxo base), enquanto <<extend>> representa comportamento condicional/opcional.',
        explicacao:
          'Gabarito correto! Se diz "sempre" ou "obrigatoriamente", é include. Se diz "caso", "se" ou "opcionalmente", é extend.',
      },
      {
        id: 'C',
        texto: 'Tanto <<include>> quanto <<extend>> são utilizados exclusivamente entre atores e casos de uso, nunca entre dois casos de uso.',
        explicacao: 'Falso: include e extend só ocorrem entre CASOS DE USO, nunca entre ator e caso de uso.',
      },
      {
        id: 'D',
        texto: '<<extend>> liga um ator a uma generalização, enquanto <<include>> herda métodos de classes concretas.',
        explicacao: 'Falso: mistura conceitos de diagrama de classes com casos de uso.',
      },
      {
        id: 'E',
        texto: 'Não há diferença semântica na especificação UML moderna, sendo usados como sinônimos.',
        explicacao: 'Falso: a especificação UML define semânticas estritas e opostas.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'Regra de Ouro do Prof. Valter: Sempre / Obrigatoriamente = <<include>>. Caso / Se / Opcionalmente = <<extend>>.',
  },
  {
    id: 'q-var-2',
    origem: 'Variação da Prova',
    categoria: 'Casos de Uso',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Em um diagrama de casos de uso da UML, observe o sentido das setas tracejadas nos relacionamentos. Qual das seguintes afirmações sobre o sentido da ponta da seta está CORRETA?',
    contexto: 'Notação Visual UML • Regra de Apontamento',
    alternativas: [
      {
        id: 'A',
        texto: 'No <<include>>, a seta aponta do caso de uso incluído em direção ao caso de uso base.',
        explicacao: 'Falso: no include, a seta aponta DO caso base PARA o caso incluído.',
      },
      {
        id: 'B',
        texto: 'No <<extend>>, a seta aponta do caso de uso de extensão (opcional) em direção ao caso de uso base.',
        explicacao:
          'Gabarito correto! No extend, o caso estendedor "olha" para o caso base que ele estende: a flecha vai do opcional apontando para o base.',
      },
      {
        id: 'C',
        texto: 'Em ambos os casos, a seta sempre aponta obrigatoriamente para o Ator principal.',
        explicacao: 'Falso: associações com atores não usam setas tracejadas include/extend.',
      },
      {
        id: 'D',
        texto: 'A seta de <<extend>> e a de <<include>> apontam exatamente na mesma direção em relação ao caso de uso base.',
        explicacao: 'Falso: eles apontam em direções opostas em relação ao caso de uso base.',
      },
      {
        id: 'E',
        texto: 'As linhas de relacionamento entre casos de uso nunca devem possuir setas na notação oficial da UML.',
        explicacao: 'Falso: tanto include quanto extend são dependências estereotipadas com setas tracejadas.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'Direção das flechas na UML: [Caso Base] --<<include>>--> [Caso Incluído] (o base precisa do incluído); [Caso Opcional] --<<extend>>--> [Caso Base] (o opcional estende o base).',
  },
  {
    id: 'q-var-3',
    origem: 'Variação da Prova',
    categoria: 'Requisitos',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'O "Macete da Seta" ensinado em aula para distinguir Requisitos Funcionais (RF) de Não Funcionais (RNF) estabelece que:',
    contexto: 'Dica prática do docente Valter Canhizares Filho',
    alternativas: [
      {
        id: 'A',
        texto: 'Se uma exigência puder ser representada como um caso de uso (círculo) com uma seta apontando para ele ou dele, trata-se de um Requisito Funcional.',
        explicacao:
          'Gabarito correto! Se dá para modelar uma ação concreta e ligar com seta no diagrama de casos de uso, é Funcional. Se for uma restrição que perpassa o sistema (segurança, tempo de resposta), é RNF.',
      },
      {
        id: 'B',
        texto: 'Se a exigência puder ser desenhada com setas, trata-se obrigatoriamente de um Requisito Não Funcional.',
        explicacao: 'Falso: RNF geralmente não aparecem como elipses no diagrama de casos de uso.',
      },
      {
        id: 'C',
        texto: 'O macete da seta determina qual ator humano tem prioridade sobre atores computacionais.',
        explicacao: 'Falso: não tem relação com prioridade de atores.',
      },
      {
        id: 'D',
        texto: 'O macete serve apenas para diagramas de banco de dados relacional (DER).',
        explicacao: 'Falso: é um macete para diagramas de casos de uso na elicitação de requisitos.',
      },
      {
        id: 'E',
        texto: 'Todas as setas de um diagrama de caso de uso representam exclusivamente fluxos de dados de infraestrutura.',
        explicacao: 'Falso: representam comunicações ou dependências funcionais, não fluxo de dados.',
      },
    ],
    correta: 'A',
    explicacaoGeral:
      'Se você consegue encapsular a exigência em uma elipse e ligar uma seta de interação, é um REQUISITO FUNCIONAL (o que o sistema faz). Propriedades como "tempo de resposta < 2s" ou "criptografia AES" são REQUISITOS NÃO FUNCIONAIS.',
  },
  {
    id: 'q-var-4',
    origem: 'Variação da Prova',
    categoria: 'Gestão e Pilares',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'No contexto da Engenharia de Software Ágil, a metáfora da "Dívida Técnica" (Technical Debt) compara o código mal arquitetado a uma dívida financeira porque:',
    contexto: 'Conceito de Qualidade e Manutenibilidade em Projetos Ágeis',
    alternativas: [
      {
        id: 'A',
        texto: 'Ela desaparece espontaneamente à medida que novos desenvolvedores são contratados pela empresa.',
        explicacao: 'Falso: novos desenvolvedores demoram mais para entender código com dívida técnica.',
      },
      {
        id: 'B',
        texto: 'Você ganha velocidade no presente ao tomar um atalho, mas paga "juros" contínuos no futuro através de bugs, lentidão e dificuldade de manutenção.',
        explicacao:
          'Gabarito correto! A metáfora cunhada por Ward Cunningham ilustra exatamente que atalhos cobram juros crescentes até que sejam pagos (refatoração).',
      },
      {
        id: 'C',
        texto: 'Refere-se ao valor em dinheiro gasto exclusivamente com licenças de softwares proprietários.',
        explicacao: 'Falso: não se trata de custo monetário de licenças, mas de qualidade do design de software.',
      },
      {
        id: 'D',
        texto: 'Indica que o cliente final se recusa a pagar a fatura do projeto por falta de testes.',
        explicacao: 'Falso: é um conceito interno de engenharia de software.',
      },
      {
        id: 'E',
        texto: 'Representa um método ágil para eliminar completamente a necessidade de testes automatizados.',
        explicacao: 'Falso: a dívida técnica aumenta justamente quando se negligenciam testes e boa arquitetura.',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'A dívida técnica é como um empréstimo: acelera a entrega no curtíssimo prazo, mas cobra juros constantes sob forma de bugs, lentidão para implementar novos recursos e risco arquitetural.',
  },
  {
    id: 'q-var-5',
    origem: 'Variação da Prova',
    categoria: 'Requisitos',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Dentre os itens a seguir, assinale a opção que contém APENAS Requisitos Funcionais (RF):',
    contexto: 'Classificação Prática de Requisitos',
    alternativas: [
      {
        id: 'A',
        texto: 'O sistema deve ser desenvolvido em TypeScript; O banco de dados deve ser PostgreSQL; Criptografia ponta a ponta.',
        explicacao: 'Falso: são restrições tecnológicas e de segurança (RNF).',
      },
      {
        id: 'B',
        texto: 'O sistema deve responder requisições em até 200 milissegundos; Interface amigável para celulares; Disponibilidade de 99,9%.',
        explicacao: 'Falso: são requisitos não funcionais de desempenho, usabilidade e disponibilidade.',
      },
      {
        id: 'C',
        texto: 'Cadastrar novos produtos no estoque; Realizar checkout de compra; Gerar relatório financeiro mensal em PDF.',
        explicacao:
          'Gabarito correto! Todas são ações concretas que o usuário executa no sistema (o que o sistema faz = RF).',
      },
      {
        id: 'D',
        texto: 'Conformidade com a LGPD; Suportar 10.000 usuários simultâneos; Código-fonte hospedado no GitHub.',
        explicacao: 'Falso: são requisitos legais, de escalabilidade e infraestrutura (RNF/restrições).',
      },
      {
        id: 'E',
        texto: 'Arquitetura baseada em microsserviços; Facilidade de aprendizado pelos operadores; Backups a cada 6 horas.',
        explicacao: 'Falso: arquitetura, usabilidade e rotinas de backup são requisitos não funcionais.',
      },
    ],
    correta: 'C',
    explicacaoGeral:
      'Cadastrar produto, realizar checkout e gerar relatório são funcionalidades operacionais (RF). Desempenho, escalabilidade, segurança e tecnologias são RNF.',
  },
  {
    id: 'q-var-6',
    origem: 'Variação da Prova',
    categoria: 'UML',
    pontos: 1.0,
    tipo: 'multipla_escolha',
    enunciado:
      'Sobre os Atores em um Diagrama de Casos de Uso, assinale a afirmação CORRETA:',
    contexto: 'Elementos fundamentais da modelagem UML',
    alternativas: [
      {
        id: 'A',
        texto: 'Atores representam cargos específicos de funcionários registrados na folha de pagamento da empresa.',
        explicacao: 'Falso: atores representam papéis (roles), não indivíduos ou cargos específicos.',
      },
      {
        id: 'B',
        texto: 'Um ator fica sempre posicionado fora da fronteira do sistema (boundary) e pode ser um usuário humano ou um sistema externo interligado.',
        explicacao:
          'Gabarito correto! O ator é externo ao sistema; ele interage com o sistema para acionar ou ser acionado por casos de uso.',
      },
      {
        id: 'C',
        texto: 'Sistemas externos como Gateways de Pagamento não podem ser considerados atores na UML.',
        explicacao: 'Falso: sistemas externos que trocam informações com o sistema são modelados como atores.',
      },
      {
        id: 'D',
        texto: 'Casos de uso e atores compartilham a mesma notação gráfica em formato de elipse.',
        explicacao: 'Falso: atores são representados por bonecos palito (stick figures) ou retângulos com estereótipo.',
      },
      {
        id: 'E',
        texto: 'Todo diagrama de casos de uso deve conter exatamente um único ator, independentemente da complexidade.',
        explicacao: 'Falso: um sistema pode ter quantos atores forem necessários (ex.: Cliente, Gerente, Gateway).',
      },
    ],
    correta: 'B',
    explicacaoGeral:
      'Atores ficam do lado de fora do sistema e representam papéis que interagem com os casos de uso. Podem ser humanos (ex.: Cliente, Gerente) ou sistemas computacionais externos (ex.: Gateway bancário).',
  },
];

// Dados da Questão 7 da Prova NP1 (Dissertativa / Modelagem de Diagrama)
export const QUESTAO_7_PROVA = {
  titulo: 'Questão 7 (Dissertativa • Vale 3 Pontos)',
  enunciadoOriginal:
    'Crie um diagrama de casos de uso para um sistema de comércio eletrônico. O sistema deve permitir que o Cliente realize compras de produtos. Sempre que o cliente finalizar uma compra, o sistema deve obrigatoriamente processar o pagamento. Durante a realização da compra, caso o cliente possua um código promocional, poderá aplicar um cupom de desconto. Além disso, o sistema conta com um Gerente, que deve cadastrar novos produtos. O ato de cadastrar um produto sempre exige que o sistema valide os dados inseridos. Por fim, identifique 03 RF e 03 RNF do sistema proposto.',
  pontos: 3.0,
  atoresEsperados: ['Cliente', 'Gerente'],
  casosDeUsoEsperados: [
    'Realizar Compra',
    'Processar Pagamento',
    'Aplicar Cupom de Desconto',
    'Cadastrar Produto',
    'Validar Dados do Produto',
  ],
  relacoesEsperadas: [
    { source: 'Cliente', target: 'Realizar Compra', tipo: 'associacao', descricao: 'O Cliente realiza a compra' },
    { source: 'Gerente', target: 'Cadastrar Produto', tipo: 'associacao', descricao: 'O Gerente cadastra produtos' },
    { source: 'Realizar Compra', target: 'Processar Pagamento', tipo: 'include', descricao: 'Obrigatório (sempre finaliza com pagamento)' },
    { source: 'Aplicar Cupom de Desconto', target: 'Realizar Compra', tipo: 'extend', descricao: 'Condicional (caso possua código promocional)' },
    { source: 'Cadastrar Produto', target: 'Validar Dados do Produto', tipo: 'include', descricao: 'Obrigatório (sempre exige validação dos dados)' },
  ],
  sugestoesRF: [
    'RF01: O sistema deve permitir que o Cliente realize compras de produtos online.',
    'RF02: O sistema deve processar o pagamento obrigatoriamente ao finalizar cada compra.',
    'RF03: O sistema deve permitir a aplicação condicional de cupom de desconto promocional.',
    'RF04: O sistema deve permitir que o Gerente cadastre novos produtos no catálogo.',
    'RF05: O sistema deve validar os dados inseridos de cada produto antes de confirmar o cadastro.',
  ],
  sugestoesRNF: [
    'RNF01 (Segurança): O processamento de pagamento deve utilizar criptografia SSL/TLS e padrão PCI-DSS para proteger dados bancários.',
    'RNF02 (Desempenho): A validação do cupom e o cálculo do desconto devem ocorrer em tempo de resposta inferior a 1,5 segundo.',
    'RNF03 (Disponibilidade): O sistema de e-commerce deve permanecer operacional com disponibilidade mínima de 99,8% (24/7).',
    'RNF04 (Usabilidade): O fluxo de realização de compra não deve exigir mais de 3 etapas no carrinho para facilitar o uso no celular.',
  ],
};

// Flashcards de Fixação Rápida
export const FLASHCARDS_LIST: FlashcardItem[] = [
  {
    id: 'fc-1',
    categoria: 'UML',
    pergunta: 'O que é a UML e o que ela NÃO é?',
    resposta:
      'A UML é uma linguagem padrão de modelagem gráfica para especificar e documentar sistemas orientados a objetos.\n\n⚠️ Ela NÃO é uma metodologia de desenvolvimento (como Scrum ou RUP) e NÃO é uma linguagem de programação!',
    macete: 'UML = Notação visual padronizada, agnóstica de linguagem.',
  },
  {
    id: 'fc-2',
    categoria: 'Requisitos',
    pergunta: 'Qual a diferença entre Requisito Funcional (RF) e Não Funcional (RNF)?',
    resposta:
      '• RF (O QUE faz): Funcionalidades, ações e serviços concretos acionados pelo usuário ou sistema (ex.: "Realizar Compra").\n\n• RNF (COMO faz): Critérios de qualidade e restrições sobre o comportamento (ex.: "Tempo de resposta < 2s", "Criptografia SSL").',
    macete: 'Macete do Valter: Se dá pra desenhar com uma seta num caso de uso, é Funcional!',
  },
  {
    id: 'fc-3',
    categoria: 'Casos de Uso',
    pergunta: 'Quando utilizar o relacionamento <<include>> no Diagrama de Casos de Uso?',
    resposta:
      'Usa-se quando um caso de uso depende OBRIGATORIAMENTE da execução de outro caso de uso para se completar.\n\nA seta tracejada aponta do Caso Base para o Caso Incluído.',
    macete: 'Palavras-chave da prova: "sempre", "obrigatoriamente", "exige necessariamente".',
  },
  {
    id: 'fc-4',
    categoria: 'Casos de Uso',
    pergunta: 'Quando utilizar o relacionamento <<extend>> no Diagrama de Casos de Uso?',
    resposta:
      'Usa-se quando um caso de uso é CONDICIONAL ou OPCIONAL — só é executado se uma regra ou situação específica ocorrer.\n\nA seta tracejada aponta do Caso Opcional PARA o Caso Base!',
    macete: 'Palavras-chave da prova: "se", "caso", "opcionalmente", "pode aplicar".',
  },
  {
    id: 'fc-5',
    categoria: 'Casos de Uso',
    pergunta: 'Qual a direção das setas tracejadas em <<include>> vs <<extend>>?',
    resposta:
      '• <<include>>: [Caso Base] ───>> [Caso Incluído] (o caso base aponta para o que ele precisa).\n\n• <<extend>>: [Caso Opcional] ───>> [Caso Base] (o caso opcional aponta para a base que ele estende).',
    macete: 'Atenção na prova! No extend a seta "olha para trás", apontando para a base.',
  },
  {
    id: 'fc-6',
    categoria: 'Engenharia de Software',
    pergunta: 'O que é Dívida Técnica (Technical Debt)?',
    resposta:
      'É a consequência acumulada de escolher atalhos e código mal estruturado para cumprir prazos agressivos.\n\nFunciona como dívida financeira: ganha tempo agora, mas paga com "juros" sob a forma de bugs, latência, retrabalho e manutenção cara.',
    macete: 'Atalho no presente = juros altos e atrasos no futuro.',
  },
  {
    id: 'fc-7',
    categoria: 'Gestão de Projetos',
    pergunta: 'Como o prazo agressivo afeta os Três Pilares (Tempo, Custo e Qualidade)?',
    resposta:
      'Se o prazo (tempo) é encurtado sem aumento de orçamento (custo), quem paga a conta é a QUALIDADE.\n\nAtalhos geram dívida técnica, o que anula o ganho de tempo inicial por causar atrasos futuros e manutenções caras.',
    macete: 'Triângulo de ferro: não dá para acelerar tempo com custo fixo sem destruir a qualidade.',
  },
  {
    id: 'fc-8',
    categoria: 'Fundamentos',
    pergunta: 'Por que "Homogeneidade do projeto" NÃO é um fator que afeta o desenvolvimento?',
    resposta:
      'Porque sistemas modernos lidam com HETEROGENEIDADE (múltiplos dispositivos, linguagens, bancos de dados, navegadores e redes).\n\nHomogeneidade é a alternativa incorreta da Questão 1 da prova!',
    macete: 'O mundo do software é heterogêneo, nunca homogêneo.',
  },
  {
    id: 'fc-9',
    categoria: 'Casos de Uso',
    pergunta: 'Qual o objetivo principal do Diagrama de Casos de Uso?',
    resposta:
      'Mapear e descrever os requisitos funcionais do sistema a partir da VISÃO DO USUÁRIO.\n\nEle não serve para detalhar código-fonte, infraestrutura técnica ou diagramas de banco de dados.',
    macete: 'Foco no problema e no usuário, não no código interno.',
  },
  {
    id: 'fc-10',
    categoria: 'Prova NP1',
    pergunta: 'Quais os relacionamentos da Questão 7 (E-commerce da UNIP)?',
    resposta:
      '1. Cliente ── Realizar Compra (associação)\n2. Realizar Compra ──<<include>>──> Processar Pagamento (sempre)\n3. Aplicar Cupom ──<<extend>>──> Realizar Compra (caso possua código)\n4. Gerente ── Cadastrar Produto (associação)\n5. Cadastrar Produto ──<<include>>──> Validar Dados (sempre)',
    macete: 'Cliente tem 1 include e 1 extend; Gerente tem 1 include.',
  },
];
