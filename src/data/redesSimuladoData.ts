export interface RedesSimuladoQuestion {
  id: number;
  questionNumber: number;
  title: string;
  enunciado: string;
  options: {
    id: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  pegadinhaFabio: string;
  macete: string;
}

export const REDES_SIMULADO_QUESTIONS: RedesSimuladoQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    title: 'Camadas do Modelo OSI',
    enunciado:
      'O Modelo de Interconexão de Sistemas Abertos (OSI) foi concebido pela ISO para padronizar as funções de comunicação em redes de computadores. Assinale a alternativa que apresenta corretamente as 7 camadas do modelo OSI em sua ordem completa e padronizada (da mais alta para a mais baixa):',
    options: [
      {
        id: 'a',
        text: 'Aplicação, Apresentação, Transporte, Rede, Internet, Enlace de Dados e Física.',
      },
      {
        id: 'b',
        text: 'Aplicação, Apresentação, Sessão, Internet, Rede, Enlace de Dados e Física.',
      },
      {
        id: 'c',
        text: 'Aplicação, Apresentação, Sessão, Transporte, Enlace de Dados e Física.',
      },
      {
        id: 'd',
        text: 'Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace de Dados e Física.',
      },
    ],
    correctAnswer: 'd',
    explanation:
      'O modelo OSI possui exatamente 7 camadas, ordenadas da 7 para a 1 como: Aplicação (7), Apresentação (6), Sessão (5), Transporte (4), Rede (3), Enlace de Dados (2) e Física (1).',
    pegadinhaFabio:
      'As alternativas A e B trazem o termo "Internet", que pertence ao modelo TCP/IP, e NÃO ao modelo OSI. A alternativa C omitiu a camada de Rede (apresentando apenas 6 camadas). Portanto, a única alternativa estritamente correta é a D.',
    macete: 'Macete do Fábio: Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física.',
  },
  {
    id: 2,
    questionNumber: 2,
    title: 'Dispositivos Intermediários de Rede',
    enunciado:
      'Em uma topologia de rede, os dispositivos são categorizados entre dispositivos finais (hosts) e dispositivos intermediários. Assinale a alternativa que contém EXCLUSIVAMENTE dispositivos intermediários de rede:',
    options: [
      {
        id: 'a',
        text: 'Servidores de arquivos, Switches e Roteadores.',
      },
      {
        id: 'b',
        text: 'Hosts clientes, Roteadores e Pontos de Acesso sem fio.',
      },
      {
        id: 'c',
        text: 'Impressoras de rede, Servidores Web e Hubs.',
      },
      {
        id: 'd',
        text: 'Roteadores e Switches.',
      },
    ],
    correctAnswer: 'd',
    explanation:
      'Dispositivos intermediários são aqueles responsáveis por direcionar, filtrar e gerenciar o fluxo de dados entre os pontos da rede (como Roteadores, Switches, Hubs e Firewalls). Já computadores, servidores, celulares e impressoras de rede são dispositivos finais (hosts).',
    pegadinhaFabio:
      'Todas as opções que incluem "Hosts" ou "Servidores" estão incorretas, pois servidores e computadores são a origem ou destino da comunicação (dispositivos finais). Sobra a alternativa D.',
    macete: 'Dispositivo final = gera ou consome dados. Dispositivo intermediário = roteia e chaveia os dados.',
  },
  {
    id: 3,
    questionNumber: 3,
    title: 'Tipos de Rede por Abrangência Geográfica',
    enunciado:
      'Uma rede de computadores configurada para atender exclusivamente a um escritório corporativo, uma residência ou um prédio escolar classifica-se tipicamente como:',
    options: [
      {
        id: 'a',
        text: 'WAN (Wide Area Network).',
      },
      {
        id: 'b',
        text: 'Extranet Corporativa.',
      },
      {
        id: 'c',
        text: 'LAN (Local Area Network).',
      },
      {
        id: 'd',
        text: 'MAN (Metropolitan Area Network) Interurbana.',
      },
    ],
    correctAnswer: 'c',
    explanation:
      'Uma LAN (Local Area Network ou Rede Local) cobre uma pequena extensão geográfica delimitada, como uma casa, um escritório, uma sala de aula ou um prédio escolar.',
    pegadinhaFabio:
      'Não confunda LAN com Intranet! LAN é uma classificação de TAMANHO GEOGRÁFICO (alcance físico). Já Intranet trata de PERMISSÃO DE ACESSO (acesso privado restrito da organização).',
    macete: 'Pequena área geográfica = LAN. Grandes distâncias mundiais = WAN.',
  },
  {
    id: 4,
    questionNumber: 4,
    title: 'Função do Roteador',
    enunciado:
      'Qual dispositivo de rede atua na Camada 3 (Rede) com a função precípua de interligar redes distintas e encaminhar pacotes de dados entre elas com base no endereçamento IP?',
    options: [
      {
        id: 'a',
        text: 'Roteador.',
      },
      {
        id: 'b',
        text: 'Switch de Camada 2.',
      },
      {
        id: 'c',
        text: 'Hub Repetidor.',
      },
      {
        id: 'd',
        text: 'Modem de Acesso.',
      },
    ],
    correctAnswer: 'a',
    explanation:
      'O Roteador opera na Camada 3 (Rede) do modelo OSI e sua função é interligar redes diferentes (ex.: rede local LAN com a Internet WAN), analisando os endereços IP de destino para tomar decisões de roteamento.',
    pegadinhaFabio:
      'O Switch só conecta dispositivos dentro da MESMA rede (trabalha com endereços MAC na Camada 2). Para sair da sua rede e se comunicar com redes externas, é obrigatório o uso de um ROTEADOR.',
    macete: 'Roteador = interliga redes diferentes. Switch = conecta a mesma rede.',
  },
  {
    id: 5,
    questionNumber: 5,
    title: 'Definição Técnica de Internet',
    enunciado:
      'Sob a ótica da arquitetura de redes de computadores, a Internet pode ser definida com precisão técnica como:',
    options: [
      {
        id: 'a',
        text: 'Uma rede baseada exclusivamente no protocolo físico Ethernet com cabeamento par trançado.',
      },
      {
        id: 'b',
        text: 'Uma rede privada de telecomunicações voltada estritamente para dispositivos móveis.',
      },
      {
        id: 'c',
        text: 'A interconexão de redes em escala global (rede de redes), operando com base na família de protocolos TCP/IP.',
      },
      {
        id: 'd',
        text: 'Uma rede corporativa proprietária de acesso restrito controlada por provedores de computação em nuvem.',
      },
    ],
    correctAnswer: 'c',
    explanation:
      'A Internet é a interconexão global e pública de milhares de redes heterogêneas autônomas (uma "rede de redes"), cujo alicerce de comunicação é a família padronizada de protocolos TCP/IP.',
    pegadinhaFabio:
      'A Internet não é sinônimo apenas de Ethernet (A), não se restringe a redes móveis (B) e não é uma rede privada corporativa (D).',
    macete: 'Internet = Interconexão de Redes em Escala Global + Família TCP/IP.',
  },
  {
    id: 6,
    questionNumber: 6,
    title: 'Representação e Formato do IPv4',
    enunciado:
      'O protocolo IPv4 é o padrão de endereçamento predominante na Internet. Como o endereço IPv4 é estruturado e graficamente representado?',
    options: [
      {
        id: 'a',
        text: '128 bits organizados em 8 grupos hexadecimais separados por dois pontos (:).',
      },
      {
        id: 'b',
        text: '32 bits divididos em 4 octetos, grafados em notação decimal (0 a 255) separados por pontos (.).',
      },
      {
        id: 'c',
        text: '64 bits representados em pares de bytes binários separados por barras (/).',
      },
      {
        id: 'd',
        text: '32 bits divididos em 4 blocos hexadecimais de dois dígitos separados por hifens (-).',
      },
    ],
    correctAnswer: 'b',
    explanation:
      'O endereço IPv4 possui 32 bits de comprimento, organizados logicamente em 4 octetos de 8 bits cada. Para legibilidade humana, cada octeto é expresso em número decimal (de 0 a 255) e separado por pontos (exemplo: 192.168.10.1).',
    pegadinhaFabio:
      'Cuidado com a alternativa A: 128 bits em hexadecimal separados por dois pontos é a definição do IPv6! O IPv4 é estritamente 32 bits e decimal com pontos.',
    macete: 'IPv4: 32 bits, 4 octetos (0 a 255), decimal com pontos.',
  },
  {
    id: 7,
    questionNumber: 7,
    title: 'Cálculo de Endereço de Rede com Máscara',
    enunciado:
      'Considere um dispositivo com endereço IP 10.1.100.50 e a máscara de sub-rede configurada como 255.255.0.0 (/16). Aplicando a lógica de endereçamento de rede, qual é o endereço de rede correspondente?',
    options: [
      {
        id: 'a',
        text: '10.1.0.0',
      },
      {
        id: 'b',
        text: '10.0.0.0',
      },
      {
        id: 'c',
        text: '10.1.100.0',
      },
      {
        id: 'd',
        text: '10.1.100.255',
      },
    ],
    correctAnswer: 'a',
    explanation:
      'Para determinar o endereço de rede, realiza-se o AND lógico entre o IP e a máscara. Na prática rápida: onde o octeto da máscara for 255, mantém-se o valor original do octeto do IP; onde for 0, o octeto do endereço de rede torna-se 0.\n• Octeto 1: 10 & 255 = 10\n• Octeto 2: 1 & 255 = 1\n• Octeto 3: 100 & 0 = 0\n• Octeto 4: 50 & 0 = 0\nResultado: 10.1.0.0.',
    pegadinhaFabio:
      'Muitos alunos confundem a máscara /16 (255.255.0.0) com /24 (255.255.255.0). Com /16, o 3º octeto zera! Portanto não é 10.1.100.0, e sim 10.1.0.0.',
    macete: 'Regra do Fábio: onde a máscara é 255 COPIA IGUAL; onde é 0 VIRA ZERO!',
  },
  {
    id: 8,
    questionNumber: 8,
    title: 'Identificação de IP Privado (RFC 1918)',
    enunciado:
      'A norma RFC 1918 define faixas de endereços IP reservadas para redes privadas que não são roteadas publicamente na Internet. Entre os endereços a seguir, qual pertence legitimamente a uma faixa de IP privado?',
    options: [
      {
        id: 'a',
        text: '172.32.10.1',
      },
      {
        id: 'b',
        text: '172.16.255.255',
      },
      {
        id: 'c',
        text: '100.1.2.3',
      },
      {
        id: 'd',
        text: '99.1.2.0',
      },
    ],
    correctAnswer: 'b',
    explanation:
      'A faixa privada da Classe B estende-se de 172.16.0.0 até 172.31.255.255. O endereço 172.16.255.255 está contido dentro desse intervalo, sendo portanto um endereço privado.',
    pegadinhaFabio:
      'Pegadinha fatal do Fábio: 172.32.10.1 está FORA da faixa privada (a faixa vai somente até 172.31). Logo, 172.32 é um IP PÚBLICO! Os IPs 100.1.2.3 e 99.1.2.0 também são públicos. A única resposta correta é a B.',
    macete: 'Classe B privada: 172.16 a 172.31. Se passar de 31 (ex: 172.32), é público!',
  },
  {
    id: 9,
    questionNumber: 9,
    title: 'Pegadinha do IP Público vs Privado',
    enunciado:
      'Ao auditar as estações de trabalho de uma empresa, um administrador de redes observou os endereços abaixo. Qual deles se trata de um endereço IP PÚBLICO roteável na Internet?',
    options: [
      {
        id: 'a',
        text: '192.168.10.10',
      },
      {
        id: 'b',
        text: '10.0.0.1',
      },
      {
        id: 'c',
        text: '127.1.2.3',
      },
      {
        id: 'd',
        text: '192.165.10.20',
      },
    ],
    correctAnswer: 'd',
    explanation:
      'Na Classe C privada da RFC 1918, a faixa reservada é exclusivamente 192.168.0.0 a 192.168.255.255. O endereço 192.165.10.20 possui "165" no segundo octeto em vez de "168", portanto trata-se de um endereço IP PÚBLICO.',
    pegadinhaFabio:
      'Essa é a maior pegadinha da prova: 192.165 parece visualmente com 192.168, mas é público! Já 192.168.10.10 e 10.0.0.1 são privados, e 127.1.2.3 é endereço de loopback (próprio host). Portanto, o único público é a alternativa D.',
    macete: 'Olhe atentamente para o segundo octeto: só é privado se for 192.168! 192.165 é PÚBLICO!',
  },
  {
    id: 10,
    questionNumber: 10,
    title: 'Unidade de Dados e Camada de Enlace no TCP/IP',
    enunciado:
      'No modelo de referência TCP/IP didático de 5 camadas, qual camada é diretamente responsável por encapsular os dados e manipular quadros (frames) de comunicação para envio ao meio físico?',
    options: [
      {
        id: 'a',
        text: 'Camada de Enlace de Dados.',
      },
      {
        id: 'b',
        text: 'Camada de Rede (Internet).',
      },
      {
        id: 'c',
        text: 'Camada de Transporte.',
      },
      {
        id: 'd',
        text: 'Camada de Apresentação.',
      },
    ],
    correctAnswer: 'a',
    explanation:
      'A camada de Enlace de Dados tem como Unidade de Dados de Protocolo (PDU) o QUADRO (FRAME). Ela manipula endereços físicos (MAC), controles de acesso ao meio (Ethernet, Wi-Fi) e encaminhamento em switches.',
    pegadinhaFabio:
      'No modelo didático de 5 camadas, NÃO existem camadas separadas de Apresentação e Sessão (elas foram incorporadas à camada de Aplicação), eliminando de imediato alternativas que as citem.',
    macete: 'PDU dos Quadros = Camada de Enlace de Dados (Resposta A na prova!).',
  },
];
