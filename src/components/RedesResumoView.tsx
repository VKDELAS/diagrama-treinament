import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Search,
  Zap,
  BookMarked,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';

interface RedesResumoViewProps {
  onBack: () => void;
}

interface ResumoTopic {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tag: string;
  content: React.ReactNode;
  destaqueFabio?: string;
}

export const RedesResumoView: React.FC<RedesResumoViewProps> = ({ onBack }) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('topico-1');
  const [searchFilter, setSearchFilter] = useState('');

  const toggleTopic = (id: string) => {
    setExpandedTopic((prev) => (prev === id ? null : id));
  };

  const topics: ResumoTopic[] = [
    {
      id: 'topico-1',
      number: 1,
      title: 'Modelo OSI: As 7 Camadas e Suas Funções',
      subtitle: 'Estrutura conceitual padrão ISO (da mais alta para a mais baixa)',
      tag: 'Questão 1 da Prova',
      destaqueFabio:
        'Macete do Fábio: Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física. Descarte na hora alternativas que tragam "Internet" (que é do TCP/IP) ou que tenham menos de 7 camadas!',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
          <p>
            O Modelo <strong>OSI (Open Systems Interconnection)</strong> possui{' '}
            <span className="text-cyan-300 font-bold">7 camadas</span> bem
            definidas, divididas da camada mais alta (interface com programas)
            até a base física:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-cyan-300 border-b border-white/[0.08] text-xs font-mono">
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3">Camada</th>
                  <th className="p-3">O Que Faz</th>
                  <th className="p-3 hidden sm:table-cell">Exemplos / Protocolos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">7</td>
                  <td className="p-3 font-semibold text-white">Aplicação</td>
                  <td className="p-3">Interface com o usuário e programas</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">HTTP, HTTPS, DNS, FTP, SMTP</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">6</td>
                  <td className="p-3 font-semibold text-white">Apresentação</td>
                  <td className="p-3">Formatação de dados, criptografia e compressão</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">SSL/TLS, ASCII, JPEG, MPEG</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">5</td>
                  <td className="p-3 font-semibold text-white">Sessão</td>
                  <td className="p-3">Abre, mantém e encerra diálogos/sessões entre nós</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">RPC, NetBIOS, PPTP</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">4</td>
                  <td className="p-3 font-semibold text-white">Transporte</td>
                  <td className="p-3">Comunicação fim a fim (host-to-host) e portas</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">TCP (confiável), UDP (rápido)</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">3</td>
                  <td className="p-3 font-semibold text-white">Rede</td>
                  <td className="p-3">Endereçamento lógico (IP) e roteamento de pacotes</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">IPv4, IPv6, ICMP, Roteador</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">2</td>
                  <td className="p-3 font-semibold text-white">Enlace de Dados</td>
                  <td className="p-3">Manipula quadros (frames), endereço MAC e controle de acesso</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">Ethernet, Wi-Fi, MAC, Switch</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 text-center font-bold text-cyan-400">1</td>
                  <td className="p-3 font-semibold text-white">Física</td>
                  <td className="p-3">Transmissão bruta de bits por impulsos elétricos/ópticos</td>
                  <td className="p-3 font-mono text-cyan-300 hidden sm:table-cell">Cabos par trançado, fibra, Hub</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-2',
      number: 2,
      title: 'Dispositivos de Rede: Intermediários x Finais (Hosts)',
      subtitle: 'Roteadores, Switches, Hubs, Firewalls e Hosts',
      tag: 'Questões 2 e 4 da Prova',
      destaqueFabio:
        'Cuidado com as pegadinhas: Servidores e computadores são dispositivos FINAIS. Para a pergunta "quem interliga redes diferentes", a resposta é sempre ROTEADOR (o Switch só liga na mesma rede)!',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40">
              <h4 className="font-bold text-cyan-300 text-sm mb-1">
                Dispositivos Intermediários
              </h4>
              <p className="text-zinc-400 mb-2">
                Direcionam, comutam e garantem o tráfego de dados ao longo do caminho:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-200">
                <li><strong>Roteador (Camada 3):</strong> Interliga redes diferentes e encaminha pacotes (usa IP).</li>
                <li><strong>Switch (Camada 2):</strong> Conecta dispositivos dentro da MESMA rede (usa MAC).</li>
                <li><strong>Hub (Camada 1):</strong> Repete o sinal elétrico para todas as portas (burro, causa colisões).</li>
                <li><strong>Firewall (Camadas 3 a 7):</strong> Filtra e bloqueia conexões por regras de segurança.</li>
                <li><strong>Modem (Camada 1):</strong> Modula/demodula sinais para conectar ao provedor (ISP).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40">
              <h4 className="font-bold text-blue-300 text-sm mb-1">
                Dispositivos Finais (Hosts)
              </h4>
              <p className="text-zinc-400 mb-2">
                São os nós que geram dados ou consomem serviços da rede:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-200">
                <li>Computadores e Desktops</li>
                <li>Notebooks e Laptops</li>
                <li>Smartphones e Tablets</li>
                <li>Servidores Web, de Arquivos e de Banco de Dados</li>
                <li>Impressoras de rede e câmeras IP</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-3',
      number: 3,
      title: 'Classificação de Redes: LAN, WAN, Intranet e Extranet',
      subtitle: 'Diferença crucial entre alcance geográfico e nível de autorização',
      tag: 'Questão 3 da Prova',
      destaqueFabio:
        'Regra de Ouro: LAN trata de TAMANHO (área física restrita). Intranet trata de PRIVACIDADE (acesso restrito da organização). Não confunda!',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                LAN (Local Area Network)
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Pequena área geográfica delimitada: residência, escritório comercial, laboratório ou escola.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-blue-400 block mb-1">
                WAN (Wide Area Network)
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Grandes distâncias geográficas: conecta cidades, estados, países e continentes. <em>A Internet é a maior WAN existente.</em>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-purple-400 block mb-1">
                Intranet
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Rede privada corporativa, restrita exclusivamente aos colaboradores internos da empresa.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                Extranet
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Extensão controlada da Intranet com acesso seguro liberado a parceiros comerciais, fornecedores e clientes autorizados.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-4',
      number: 4,
      title: 'O Que é a Internet e o Modelo de Redes',
      subtitle: 'Definição precisa: a rede global que une o planeta',
      tag: 'Questão 5 da Prova',
      destaqueFabio:
        'A Internet é a "rede de redes" interconectada em escala global usando a família TCP/IP. Não caia na pegadinha de achar que é só Ethernet ou só rede móvel!',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
          <p>
            A <strong>Internet</strong> é a interconexão descentralizada de redes de computadores em escala mundial. Ela permite que redes heterogêneas (com diferentes cabos, fibras, enlaces de rádio e satélites) conversem de forma transparente.
          </p>
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
            <strong>Ponto-chave da Prova:</strong> A comunicação global na Internet só é viável porque todas as redes utilizam a mesma linguagem padronizada: a <strong>família de protocolos TCP/IP</strong>.
          </div>
        </div>
      ),
    },
    {
      id: 'topico-5',
      number: 5,
      title: 'Estrutura e Notação do Endereço IPv4',
      subtitle: '32 bits, 4 octetos decimais e a diferença para o IPv6',
      tag: 'Questão 6 da Prova',
      destaqueFabio:
        'IPv4 = 32 bits, 4 octetos de 0 a 255 em decimal com pontos. IPv6 = 128 bits em hexadecimal com dois pontos (:). As opções da prova tentam misturar os dois!',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
          <p>
            O endereço <strong>IPv4</strong> é composto por um total de <strong>32 bits</strong>. Para facilitar a leitura e configuração humana, esses 32 bits são agrupados em <strong>4 octetos</strong> (grupos de 8 bits).
          </p>
          <div className="p-4 rounded-2xl bg-[#09101f] border border-white/[0.08] font-mono text-center">
            <span className="text-zinc-500 text-xs block mb-1">Exemplo de Endereço IPv4 Válido:</span>
            <span className="text-xl sm:text-2xl text-cyan-400 font-bold">
              192 . 168 . 10 . 1
            </span>
            <div className="grid grid-cols-4 gap-2 mt-3 text-[11px] text-zinc-400">
              <div className="p-1 rounded bg-white/[0.04]">1º Octeto (0-255)</div>
              <div className="p-1 rounded bg-white/[0.04]">2º Octeto (0-255)</div>
              <div className="p-1 rounded bg-white/[0.04]">3º Octeto (0-255)</div>
              <div className="p-1 rounded bg-white/[0.04]">4º Octeto (0-255)</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-6',
      number: 6,
      title: 'Cálculo de Endereço de Rede com Máscara de Sub-rede',
      subtitle: 'A Regra Infalível do Fábio: 255 copia, 0 vira zero',
      tag: 'Questão 7 da Prova',
      destaqueFabio:
        'Regra de Ouro do Fábio: Em cada octeto, onde a máscara for 255 o número do IP fica igual; onde a máscara for 0 o número vira 0!',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
          <p>
            A máscara de sub-rede serve para separar a porção da rede da porção que identifica os hosts. Para descobrir o endereço de rede, fazemos a operação bit a bit, mas o Fábio ensinou o macete direto:
          </p>

          <div className="p-4 rounded-2xl bg-[#09101f] border border-cyan-500/40">
            <h5 className="font-bold text-cyan-300 mb-2">Exemplo da Questão 7 da Prova:</h5>
            <div className="grid grid-cols-4 text-center font-mono text-xs sm:text-sm gap-2">
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-zinc-500 text-[10px] block">Octeto 1</span>
                <span className="text-zinc-300">IP: 10</span>
                <span className="text-cyan-400 block font-bold">Másc: 255</span>
                <span className="text-emerald-400 font-bold block pt-1 border-t border-white/10">10</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-zinc-500 text-[10px] block">Octeto 2</span>
                <span className="text-zinc-300">IP: 1</span>
                <span className="text-cyan-400 block font-bold">Másc: 255</span>
                <span className="text-emerald-400 font-bold block pt-1 border-t border-white/10">1</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-zinc-500 text-[10px] block">Octeto 3</span>
                <span className="text-zinc-300">IP: 100</span>
                <span className="text-cyan-400 block font-bold">Másc: 0</span>
                <span className="text-emerald-400 font-bold block pt-1 border-t border-white/10">0</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-zinc-500 text-[10px] block">Octeto 4</span>
                <span className="text-zinc-300">IP: 50</span>
                <span className="text-cyan-400 block font-bold">Másc: 0</span>
                <span className="text-emerald-400 font-bold block pt-1 border-t border-white/10">0</span>
              </div>
            </div>
            <p className="mt-3 text-center text-emerald-300 font-bold text-sm">
              Endereço de Rede = 10.1.0.0 (A máscara 255.255.0.0 equivale a /16)
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-7',
      number: 7,
      title: 'IPs Privados (RFC 1918) x IPs Públicos e Loopback',
      subtitle: 'As faixas reservadas e as duas maiores pegadinhas de concurso/prova',
      tag: 'Questões 8 e 9 da Prova',
      destaqueFabio:
        'Super Atenção: 172.32 é público (Classe B vai só até 31)! 192.165 é público (Classe C privada é exclusivamente 192.168)! 127.0.0.1 é loopback interno, não é público!',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
          <p>
            Endereços <strong>privados (RFC 1918)</strong> são destinados a redes internas e NUNCA são roteados publicamente na Internet:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between">
              <div>
                <strong className="text-cyan-300 font-mono">Classe A Privada:</strong>
                <span className="text-zinc-300 block text-xs">10.0.0.0 até 10.255.255.255 (prefixo 10.x)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-200">/8</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-center justify-between">
              <div>
                <strong className="text-blue-300 font-mono">Classe B Privada:</strong>
                <span className="text-zinc-300 block text-xs">172.16.0.0 até 172.31.255.255 (de 172.16 a 172.31!)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-200">/12</span>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 flex items-center justify-between">
              <div>
                <strong className="text-indigo-300 font-mono">Classe C Privada:</strong>
                <span className="text-zinc-300 block text-xs">192.168.0.0 até 192.168.255.255 (prefixo 192.168.x)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200">/16</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs space-y-1">
            <p><strong>Pegadinha Q8:</strong> 172.32.10.1 está fora da faixa privada (é PÚBLICO!). Somente 172.16.255.255 é privado.</p>
            <p><strong>Pegadinha Q9:</strong> 192.165.10.20 parece com 192.168, mas NÃO É! Logo, é PÚBLICO!</p>
            <p><strong>Loopback:</strong> 127.0.0.0/8 (ex.: 127.0.0.1) é endereço do próprio host, NÃO é público.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'topico-8',
      number: 8,
      title: 'Modelo Didático TCP/IP (5 Camadas) e Unidades de Dados (PDUs)',
      subtitle: 'Quem manipula quadros, pacotes, segmentos e bits',
      tag: 'Questão 10 da Prova',
      destaqueFabio:
        'Quem manipula quadros (frames) é a camada de Enlace de Dados (Resposta A na prova). No modelo de 5 camadas não existem Apresentação e Sessão (ficaram dentro da Aplicação)!',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
          <p>
            No modelo didático de <strong>5 camadas</strong>, cada camada possui sua <strong>PDU (Protocol Data Unit)</strong> específica:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-cyan-300 border-b border-white/[0.08] text-xs font-mono">
                  <th className="p-3">Camada (5 Camadas)</th>
                  <th className="p-3">PDU (Unidade de Dados)</th>
                  <th className="p-3">Exemplos & Dispositivos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-semibold text-white">5. Aplicação</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">Mensagem / Dados</td>
                  <td className="p-3">HTTP, HTTPS, DNS, SMTP</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-semibold text-white">4. Transporte</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">Segmento (TCP) / Datagrama (UDP)</td>
                  <td className="p-3">TCP, UDP, portas de comunicação</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-semibold text-white">3. Rede (Internet)</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">Pacote</td>
                  <td className="p-3">IP, ICMP, Roteadores</td>
                </tr>
                <tr className="hover:bg-white/[0.02] bg-cyan-950/20">
                  <td className="p-3 font-semibold text-cyan-200">2. Enlace de Dados</td>
                  <td className="p-3 font-mono text-cyan-400 font-bold">Quadro (Frame)</td>
                  <td className="p-3">Ethernet, Wi-Fi, MAC, Switches</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3 font-semibold text-white">1. Física</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">Bits</td>
                  <td className="p-3">Sinais elétricos/ópticos, cabos, Hub</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen overflow-y-auto bg-[#080b11]/80 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-600/30 relative z-10"
    >
      <ModuleHeader
        title="Resumo Teórico • Redes & Sistemas Distribuídos"
        subtitle="8 Tópicos Essenciais + Cola Rápida Oficial do Prof. Fábio"
        badge="Teoria Direta"
        icon={BookMarked}
        badgeColor="bg-cyan-950/80 border-cyan-800 text-cyan-300"
        onBack={onBack}
      />

      <main
        data-page-bg="true"
        className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 py-6 sm:py-8 pb-safe flex flex-col gap-6"
      >
        {/* BANNER ESPECIAL: COLA RÁPIDA DO FÁBIO */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/40 shadow-xl shadow-cyan-950/30">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <Zap size={20} className="text-cyan-300 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
              Cola Rápida do Fábio (Memorize para Gabaritar)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono bg-black/40 p-3.5 rounded-2xl border border-cyan-500/20">
            OSI = 7 camadas | TCP/IP didático = 5 | Bits (Física) - Quadros (Enlace) - Pacotes (Rede) - Segmentos (Transporte) | Roteador = interliga redes | Switch = mesma rede | Privados: 10.x, 172.16-31.x, 192.168.x
          </p>
        </div>

        {/* Barra de Pesquisa Rápida nos Tópicos */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Buscar em tópicos, protocolos, camadas ou pegadinhas..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-all"
            />
          </div>
          <button
            onClick={() =>
              setExpandedTopic(expandedTopic ? null : 'topico-1')
            }
            className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 hover:text-white shrink-0 cursor-pointer"
          >
            {expandedTopic ? 'Recolher Todos' : 'Expandir Primeiro'}
          </button>
        </div>

        {/* Lista de Acordeões dos Tópicos */}
        <div className="space-y-4">
          {filteredTopics.map((topic) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0a1120] border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                    : 'bg-[#0b101b] border-white/[0.08] hover:border-cyan-500/30'
                }`}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer touch-manipulation select-none"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isExpanded
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                          : 'bg-white/[0.05] text-zinc-400 border border-white/[0.06]'
                      }`}
                    >
                      {topic.number}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                          {topic.tag}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-full bg-white/[0.04] text-zinc-400 shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-white/[0.06] animate-fade-in space-y-4">
                    {topic.content}

                    {topic.destaqueFabio && (
                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                        <AlertTriangle
                          size={16}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-amber-300 block mb-0.5">
                            Dica de Ouro do Prof. Fábio:
                          </strong>
                          <p className="text-amber-100/90 leading-relaxed">
                            {topic.destaqueFabio}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
