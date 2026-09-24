export interface RedesFlashcard {
  id: number;
  categoria:
    | 'Camadas OSI'
    | 'TCP/IP & PDUs'
    | 'Dispositivos de Rede'
    | 'Tipos de Rede'
    | 'IPv4 & Máscaras'
    | 'IPs Privados & Pegadinhas'
    | 'Cola Rápida';
  pergunta: string;
  resposta: string;
  dicaFabio?: string;
  camadaOuReferencia?: string;
}

export const REDES_FLASHCARDS_DATA: RedesFlashcard[] = [
  // --- 1. CAMADAS OSI ---
  {
    id: 1,
    categoria: 'Camadas OSI',
    pergunta: 'Quantas camadas possui o Modelo OSI e qual a sua ordem do topo (nível mais alto) para a base?',
    resposta:
      'Possui 7 camadas:\n7 - Aplicação\n6 - Apresentação\n5 - Sessão\n4 - Transporte\n3 - Rede\n2 - Enlace de Dados\n1 - Física',
    dicaFabio:
      'Macete do Fábio: Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física. Cuidado com pegadinhas que colocam "Internet", que é do TCP/IP!',
    camadaOuReferencia: 'Todas (1 a 7)',
  },
  {
    id: 2,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Aplicação (Camada 7 do OSI) e cite protocolos típicos?',
    resposta:
      'Serve de interface direta com o usuário e aplicações de software. É onde operam programas de rede.\n\nExemplos de protocolos: HTTP, HTTPS, DNS, FTP, SMTP, SSH.',
    dicaFabio: 'Lembre-se: é a camada mais próxima do usuário final!',
    camadaOuReferencia: 'Camada 7 - Aplicação',
  },
  {
    id: 3,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Apresentação (Camada 6 do OSI)?',
    resposta:
      'Responsável pela formatação de dados, conversão de formatos (ex: ASCII, JPEG), compressão de dados e criptografia.',
    dicaFabio: 'Pense em "Apresentar os dados legíveis e seguros": formato, criptografia e compressão.',
    camadaOuReferencia: 'Camada 6 - Apresentação',
  },
  {
    id: 4,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Sessão (Camada 5 do OSI)?',
    resposta:
      'Responsável por abrir, gerenciar, manter e encerrar sessões e diálogos entre aplicações de dois dispositivos.',
    dicaFabio: 'Palavra-chave: controle de diálogo e sincronização de conexões.',
    camadaOuReferencia: 'Camada 5 - Sessão',
  },
  {
    id: 5,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Transporte (Camada 4 do OSI) e seus principais protocolos?',
    resposta:
      'Fornece comunicação fim a fim (host-to-host) e controle de fluxo. Trabalha com identificação de portas.\n\nProtocolos: TCP (orientado a conexão, confiável) e UDP (sem conexão, rápido).',
    dicaFabio: 'PDU no TCP = Segmento | PDU no UDP = Datagrama.',
    camadaOuReferencia: 'Camada 4 - Transporte',
  },
  {
    id: 6,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Rede (Camada 3 do OSI)?',
    resposta:
      'Endereçamento lógico (endereço IP) e determinação de rotas (roteamento de pacotes através de redes distintas).',
    dicaFabio: 'Dispositivo principal: Roteador. PDU: Pacote.',
    camadaOuReferencia: 'Camada 3 - Rede',
  },
  {
    id: 7,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada de Enlace de Dados (Camada 2 do OSI)?',
    resposta:
      'Responsável pelo endereçamento físico (endereço MAC), detecção de erros de transmissão e controle de acesso ao meio.',
    dicaFabio: 'Quem manipula quadros (frames) e usa endereço MAC é a Camada de Enlace! Equipamento: Switch.',
    camadaOuReferencia: 'Camada 2 - Enlace de Dados',
  },
  {
    id: 8,
    categoria: 'Camadas OSI',
    pergunta: 'Qual a função da Camada Física (Camada 1 do OSI)?',
    resposta:
      'Transmissão bruta de bits por meio de sinais elétricos, pulsos ópticos ou ondas de rádio através de cabos, conectores e fibras.',
    dicaFabio: 'PDU: Bits. Dispositivos: Hub, cabos e conectores.',
    camadaOuReferencia: 'Camada 1 - Física',
  },

  // --- 2. TCP/IP & PDUs ---
  {
    id: 9,
    categoria: 'TCP/IP & PDUs',
    pergunta: 'Quantas camadas possui o Modelo TCP/IP didático e quais são elas?',
    resposta:
      'Possui 5 camadas:\n5 - Aplicação\n4 - Transporte\n3 - Rede (ou Internet)\n2 - Enlace de Dados\n1 - Física',
    dicaFabio:
      'No TCP/IP didático de 5 camadas, as camadas de Apresentação e Sessão do OSI foram incorporadas dentro da camada de Aplicação!',
    camadaOuReferencia: 'Modelo TCP/IP Didático',
  },
  {
    id: 10,
    categoria: 'TCP/IP & PDUs',
    pergunta: 'Qual a Unidade de Dados de Protocolo (PDU) de cada camada no modelo de 5 camadas?',
    resposta:
      '• Aplicação: Mensagem / Dados\n• Transporte: Segmento (TCP) / Datagrama (UDP)\n• Rede: Pacote\n• Enlace de Dados: Quadro (Frame)\n• Física: Bits',
    dicaFabio: 'Memorize de baixo para cima: Bits -> Quadros -> Pacotes -> Segmentos -> Dados.',
    camadaOuReferencia: 'PDUs',
  },
  {
    id: 11,
    categoria: 'TCP/IP & PDUs',
    pergunta: 'Quem manipula quadros (frames) na rede? (Questão 10 da Prova)',
    resposta:
      'A Camada de Enlace de Dados.\n\nEla encapsula os pacotes da camada de rede em quadros, adicionando cabeçalho com endereços MAC de origem e destino.',
    dicaFabio: 'Questão 10 da prova: "Quem manipula quadros é a camada de Enlace de Dados (Resposta A)".',
    camadaOuReferencia: 'Camada de Enlace (Q10)',
  },
  {
    id: 12,
    categoria: 'TCP/IP & PDUs',
    pergunta: 'O que diferencia o protocolo TCP do protocolo UDP na Camada de Transporte?',
    resposta:
      '• TCP: Confiável, orientado a conexão, realiza handshaking (três vias), garante entrega e ordenação.\n• UDP: Não confiável, sem conexão, não retransmite pacotes perdidos, porém muito mais rápido (usado em streaming, DNS, jogos).',
    dicaFabio: 'Ambos operam na camada de Transporte (Camada 4).',
    camadaOuReferencia: 'Camada 4 - Transporte',
  },

  // --- 3. DISPOSITIVOS DE REDE ---
  {
    id: 13,
    categoria: 'Dispositivos de Rede',
    pergunta: 'Qual a diferença entre Dispositivos Intermediários e Dispositivos Finais (Hosts)? (Questão 2)',
    resposta:
      '• Dispositivos Intermediários: Direcionam e gerenciam o tráfego da rede (Roteadores, Switches, Hubs, Firewalls).\n• Dispositivos Finais (Hosts): Origem e destino dos dados (Computadores, celulares, servidores, impressoras).',
    dicaFabio:
      'Pegadinha da Q2 da prova: Opções contendo "Servidor" ou "Host" estão erradas porque servidores são dispositivos finais!',
    camadaOuReferencia: 'Dispositivos Intermediários (Q2)',
  },
  {
    id: 14,
    categoria: 'Dispositivos de Rede',
    pergunta: 'O que faz um Roteador e em qual camada OSI ele opera? (Questão 4)',
    resposta:
      'Opera na Camada 3 (Rede).\n\nFunção: Interligar redes DIFERENTES e direcionar pacotes de dados entre elas usando endereçamento lógico (IP).',
    dicaFabio: 'Frase da prova Q4: "interligar redes diferentes e direcionar pacotes" = ROTEADOR (Resposta A)!',
    camadaOuReferencia: 'Roteador (Camada 3)',
  },
  {
    id: 15,
    categoria: 'Dispositivos de Rede',
    pergunta: 'O que faz um Switch e em qual camada OSI ele opera?',
    resposta:
      'Opera na Camada 2 (Enlace de Dados).\n\nFunção: Conecta dispositivos dentro da MESMA rede local, encaminhando quadros com base no endereço físico (MAC).',
    dicaFabio: 'Atenção: Switch conecta a MESMA rede. Quem conecta redes DIFERENTES é o Roteador!',
    camadaOuReferencia: 'Switch (Camada 2)',
  },
  {
    id: 16,
    categoria: 'Dispositivos de Rede',
    pergunta: 'O que é um Hub e por que ele é chamado de dispositivo "burro"?',
    resposta:
      'Opera na Camada 1 (Física). Ele simplesmente repete eletricamente o sinal recebido para TODAS as outras portas, gerando colisões de sinal e desperdício de banda.',
    dicaFabio: 'Hub não lê IP nem MAC: ele é um repetidor multiporta da camada física.',
    camadaOuReferencia: 'Hub (Camada 1)',
  },
  {
    id: 17,
    categoria: 'Dispositivos de Rede',
    pergunta: 'Em quais camadas do modelo OSI um Firewall pode atuar?',
    resposta:
      'Das camadas 3 a 7 (Rede até Aplicação).\n\nFiltra e bloqueia pacotes de dados com base em regras de segurança pré-configuradas (IPs, portas, protocolos e até conteúdo da aplicação).',
    dicaFabio: 'Firewalls modernos inspecionam pacotes desde a camada de rede até a de aplicação.',
    camadaOuReferencia: 'Firewall (Camadas 3 a 7)',
  },
  {
    id: 18,
    categoria: 'Dispositivos de Rede',
    pergunta: 'Qual a função de um Modem e em qual camada ele se enquadra?',
    resposta:
      'Opera na Camada 1 (Física). Realiza a modulação e demodulação de sinais (ex.: converte sinal analógico/DSL em digital) para acesso ao provedor de Internet.',
    dicaFabio: 'Modem = Modulador / Demodulador.',
    camadaOuReferencia: 'Modem (Camada 1)',
  },

  // --- 4. TIPOS DE REDE & INTERNET ---
  {
    id: 19,
    categoria: 'Tipos de Rede',
    pergunta: 'O que é uma LAN (Local Area Network)? (Questão 3)',
    resposta:
      'Rede de alcance geográfico restrito/pequeno: abrange uma residência, um escritório, um laboratório, uma escola ou prédio.',
    dicaFabio: 'Pequena área geográfica (doméstica ou empresarial) = LAN (Questão 3 da prova)!',
    camadaOuReferencia: 'LAN',
  },
  {
    id: 20,
    categoria: 'Tipos de Rede',
    pergunta: 'O que é uma WAN (Wide Area Network)?',
    resposta:
      'Rede de longa distância que interliga regiões metropolitanas, cidades, países ou continentes. A Internet é a maior WAN do mundo.',
    dicaFabio: 'WAN = Grandes distâncias geográficas.',
    camadaOuReferencia: 'WAN',
  },
  {
    id: 21,
    categoria: 'Tipos de Rede',
    pergunta: 'O que é uma Intranet e qual o erro comum sobre ela?',
    resposta:
      'É uma rede privada de uma organização exclusiva para colaboradores autorizados.\n\nErro comum: Achar que Intranet é um tamanho de rede. Intranet refere-se a ACESSO RESTRITO, não a alcance geográfico!',
    dicaFabio: 'Cuidado: Intranet não é tipo de tamanho (não confunda com LAN). Intranet fala de segurança e permissão de acesso.',
    camadaOuReferencia: 'Intranet',
  },
  {
    id: 22,
    categoria: 'Tipos de Rede',
    pergunta: 'O que é uma Extranet?',
    resposta:
      'É a extensão da Intranet permitindo acesso seguro e liberado a parceiros de negócios externos, fornecedores ou clientes autorizados.',
    dicaFabio: 'Extranet = Intranet + acesso concedido a parceiros externos.',
    camadaOuReferencia: 'Extranet',
  },
  {
    id: 23,
    categoria: 'Tipos de Rede',
    pergunta: 'Qual a definição técnica correta de Internet? (Questão 5)',
    resposta:
      'A Internet é a interconexão de redes em escala global ("rede de redes"), utilizando o conjunto padrão de protocolos da família TCP/IP.',
    dicaFabio:
      'Pegadinha da Q5: Dizer que a Internet é "apenas rede Ethernet" ou "apenas rede para celulares/móveis" está errado!',
    camadaOuReferencia: 'Internet (Q5)',
  },

  // --- 5. IPV4 & MÁSCARAS ---
  {
    id: 24,
    categoria: 'IPv4 & Máscaras',
    pergunta: 'Como o endereço IPv4 é estruturado e representado? (Questão 6)',
    resposta:
      'Possui 32 bits divididos em 4 octetos (8 bits cada), representados em formato decimal (cada octeto variando de 0 a 255), separados por pontos.\n\nExemplo: 192.168.10.1',
    dicaFabio:
      'Pegadinha da Q6: IPv6 é que usa 128 bits e hexadecimal separado por dois pontos (:). IPv4 é decimal separado por pontos (.)!',
    camadaOuReferencia: 'Estrutura IPv4 (Q6)',
  },
  {
    id: 25,
    categoria: 'IPv4 & Máscaras',
    pergunta: 'Qual a Regra de Ouro do Fábio para encontrar o endereço de rede usando máscara?',
    resposta:
      'Analise octeto por octeto:\n• Onde a máscara for 255: repete o número do IP exatamente igual.\n• Onde a máscara for 0: o número vira 0!',
    dicaFabio: 'Regra infalível: 255 mantém | 0 zera!',
    camadaOuReferencia: 'Regra da Máscara (Q7)',
  },
  {
    id: 26,
    categoria: 'IPv4 & Máscaras',
    pergunta: 'Aplique a regra: Dado o IP 10.1.100.50 e a máscara 255.255.0.0, qual o endereço de rede? (Questão 7)',
    resposta:
      'Octeto 1: IP 10 e Máscara 255 -> 10\nOcteto 2: IP 1 e Máscara 255 -> 1\nOcteto 3: IP 100 e Máscara 0 -> 0\nOcteto 4: IP 50 e Máscara 0 -> 0\n\nEndereço de Rede: 10.1.0.0 (Resposta A)',
    dicaFabio: 'A máscara 255.255.0.0 possui 16 bits em "1", equivalendo à notação CIDR /16.',
    camadaOuReferencia: 'Cálculo de Rede (Q7)',
  },
  {
    id: 27,
    categoria: 'IPv4 & Máscaras',
    pergunta: 'O que aconteceria se o IP fosse 192.168.1.150 com a máscara 255.255.255.0 (/24)?',
    resposta:
      'Octeto 1 (255) -> 192\nOcteto 2 (255) -> 168\nOcteto 3 (255) -> 1\nOcteto 4 (0) -> 0\n\nEndereço de Rede: 192.168.1.0',
    dicaFabio: 'Na máscara /24, os 3 primeiros octetos são a parte da rede e o último octeto identifica os hosts.',
    camadaOuReferencia: 'Máscara /24',
  },

  // --- 6. IPS PRIVADOS & PEGADINHAS ---
  {
    id: 28,
    categoria: 'IPs Privados & Pegadinhas',
    pergunta: 'O que são faixas de IP privado (RFC 1918) e qual a regra fundamental sobre elas?',
    resposta:
      'São faixas reservadas para uso interno em redes locais particulares. NÃO são roteáveis na Internet pública.\n\nPara acessar a Internet, hosts com IP privado precisam de NAT (Network Address Translation).',
    dicaFabio: 'IP privado nunca trafega diretamente pela Internet pública!',
    camadaOuReferencia: 'RFC 1918',
  },
  {
    id: 29,
    categoria: 'IPs Privados & Pegadinhas',
    pergunta: 'Quais são as três faixas oficiais de IP Privado da RFC 1918?',
    resposta:
      '• Classe A: 10.0.0.0 a 10.255.255.255 (prefixo 10.x.x.x)\n• Classe B: 172.16.0.0 a 172.31.255.255 (de 172.16 a 172.31!)\n• Classe C: 192.168.0.0 a 192.168.255.255 (prefixo 192.168.x.x)',
    dicaFabio: 'Decore com atenção a Classe B: o segundo octeto varia EXATAMENTE de 16 a 31.',
    camadaOuReferencia: 'Faixas RFC 1918',
  },
  {
    id: 30,
    categoria: 'IPs Privados & Pegadinhas',
    pergunta: 'O endereço de IP 127.0.0.1 é público ou privado? O que ele significa?',
    resposta:
      'É o endereço de Loopback (localhost). Não é público nem pertence à faixa da RFC 1918. Toda a faixa 127.0.0.0/8 serve para o próprio computador se comunicar consigo mesmo.',
    dicaFabio: 'Pegadinha da prova: 127.x.x.x NÃO é IP público!',
    camadaOuReferencia: 'Loopback 127.0.0.0/8',
  },
  {
    id: 31,
    categoria: 'IPs Privados & Pegadinhas',
    pergunta: 'Pegadinha da Questão 8: O IP 172.32.10.1 é privado ou público? Por quê?',
    resposta:
      'É PÚBLICO!\n\nA faixa privada da Classe B vai apenas até 172.31.255.255. Como 172.32 ultrapassou 31, ele é um endereço público roteável na internet.',
    dicaFabio: 'Cuidado fatal da prova! O IP 172.16.255.255 é privado, mas 172.32.10.1 é PÚBLICO!',
    camadaOuReferencia: 'Pegadinha Q8 (172.32)',
  },
  {
    id: 32,
    categoria: 'IPs Privados & Pegadinhas',
    pergunta: 'Pegadinha da Questão 9: O IP 192.165.10.20 é privado ou público? Por quê?',
    resposta:
      'É PÚBLICO!\n\nNa Classe C, apenas o prefixo 192.168 é privado. 192.165 parece com 192.168 à primeira vista, mas NÃO é privado!',
    dicaFabio: 'Super pegadinha da prova Q9! 192.165.10.20 é PÚBLICO (Resposta D). Só 192.168 é privado.',
    camadaOuReferencia: 'Pegadinha Q9 (192.165)',
  },

  // --- 7. COLA RÁPIDA ---
  {
    id: 33,
    categoria: 'Cola Rápida',
    pergunta: 'Como resumir toda a matéria na "Cola Rápida do Fábio"?',
    resposta:
      '1. OSI = 7 camadas | TCP/IP didático = 5\n2. PDUs: Bits (Física) -> Quadros (Enlace) -> Pacotes (Rede) -> Segmentos (Transporte)\n3. Roteador = interliga redes diferentes (Camada 3 - IP)\n4. Switch = mesma rede (Camada 2 - MAC)\n5. Faixas Privadas: 10.x | 172.16 a 31.x | 192.168.x',
    dicaFabio: 'Se souber essa cola de cabeça, você gabarita a prova do Fábio!',
    camadaOuReferencia: 'Cola Rápida',
  },
  {
    id: 34,
    categoria: 'Cola Rápida',
    pergunta: 'Quais as 3 pegadinhas que mais reprovam alunos na prova do Fábio?',
    resposta:
      '1. Confundir 192.165 com 192.168 (192.165 é público!).\n2. Achar que 172.32 é privado (a faixa acaba em 172.31, logo 172.32 é público!).\n3. Marcar alternativa com "Internet" no modelo OSI (Internet só existe no TCP/IP, no OSI é Rede!).',
    dicaFabio: 'Revise essas 3 regras antes de clicar no simulado!',
    camadaOuReferencia: 'Alerta de Pegadinhas',
  },
];
