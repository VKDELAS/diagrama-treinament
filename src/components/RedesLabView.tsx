import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Layers,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ModuleHeader } from './ModuleHeader';

interface RedesLabViewProps {
  onBack: () => void;
}

export const RedesLabView: React.FC<RedesLabViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'calc' | 'layers'>('calc');

  // Estados da Calculadora de IP
  const [ipOctets, setIpOctets] = useState<[string, string, string, string]>([
    '10',
    '1',
    '100',
    '50',
  ]);
  const [maskType, setMaskType] = useState<string>('255.255.0.0');

  // Estado do Inspetor de Camadas
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(3); // Camada 3 (Rede) por padrão

  // Presets rápidos das questões da prova do Fábio
  const handleApplyPreset = (ip: [string, string, string, string], mask: string) => {
    setIpOctets(ip);
    setMaskType(mask);
  };

  // Parser dos Octetos
  const o1 = parseInt(ipOctets[0], 10) || 0;
  const o2 = parseInt(ipOctets[1], 10) || 0;
  const o3 = parseInt(ipOctets[2], 10) || 0;
  const o4 = parseInt(ipOctets[3], 10) || 0;

  // Parser da Máscara
  const maskParts = maskType.split('.').map((p) => parseInt(p, 10) || 0);

  // Cálculo do Endereço de Rede (Regra do Fábio: 255 mantém, 0 zera)
  const netOctet1 = maskParts[0] === 255 ? o1 : 0;
  const netOctet2 = maskParts[1] === 255 ? o2 : 0;
  const netOctet3 = maskParts[2] === 255 ? o3 : 0;
  const netOctet4 = maskParts[3] === 255 ? o4 : 0;

  const networkAddress = `${netOctet1}.${netOctet2}.${netOctet3}.${netOctet4}`;

  // Análise RFC 1918 (Privado vs Público vs Loopback)
  const ipAnalysis = useMemo(() => {
    // 127.0.0.0/8 = Loopback
    if (o1 === 127) {
      return {
        status: 'loopback',
        label: 'Endereço de Loopback (Localhost)',
        badgeColor: 'bg-amber-950/80 border-amber-600 text-amber-300',
        detail:
          'O bloco 127.0.0.0/8 é reservado para comunicação interna do próprio computador consigo mesmo. NÃO é um endereço público nem da RFC 1918.',
      };
    }

    // Classe A privada: 10.0.0.0 a 10.255.255.255
    if (o1 === 10) {
      return {
        status: 'private',
        label: 'IP PRIVADO (RFC 1918 - Classe A)',
        badgeColor: 'bg-emerald-950/80 border-emerald-600 text-emerald-300',
        detail:
          'Pertence à faixa privada da Classe A (10.0.0.0 a 10.255.255.255). NÃO é roteado diretamente na Internet pública.',
      };
    }

    // Classe B privada: 172.16.0.0 a 172.31.255.255
    if (o1 === 172 && o2 >= 16 && o2 <= 31) {
      return {
        status: 'private',
        label: 'IP PRIVADO (RFC 1918 - Classe B)',
        badgeColor: 'bg-emerald-950/80 border-emerald-600 text-emerald-300',
        detail:
          'Está dentro do intervalo estrito de 172.16 a 172.31. É um IP privado seguro para redes internas.',
      };
    }

    // Pegadinha Q8: 172.32 em diante
    if (o1 === 172 && o2 > 31) {
      return {
        status: 'public',
        label: 'IP PÚBLICO (Pegadinha da Q8!)',
        badgeColor: 'bg-rose-950/80 border-rose-600 text-rose-300',
        detail:
          'ATENÇÃO: A faixa privada da Classe B termina em 172.31.255.255. Como o 2º octeto é ' +
          o2 +
          ' (> 31), trata-se de um endereço IP PÚBLICO roteável na Internet!',
      };
    }

    // Classe C privada: 192.168.0.0 a 192.168.255.255
    if (o1 === 192 && o2 === 168) {
      return {
        status: 'private',
        label: 'IP PRIVADO (RFC 1918 - Classe C)',
        badgeColor: 'bg-emerald-950/80 border-emerald-600 text-emerald-300',
        detail:
          'Pertence à tradicional faixa privada residencial/corporativa da Classe C (192.168.0.0 a 192.168.255.255).',
      };
    }

    // Pegadinha Q9: 192.165
    if (o1 === 192 && o2 === 165) {
      return {
        status: 'public',
        label: 'IP PÚBLICO (Pegadinha da Q9!)',
        badgeColor: 'bg-rose-950/80 border-rose-600 text-rose-300',
        detail:
          'MUITO CUIDADO: 192.165 parece visualmente com 192.168, mas NÃO É! Na Classe C, somente 192.168 é privado. Portanto 192.165 é um IP PÚBLICO!',
      };
    }

    // Outros IPs
    return {
      status: 'public',
      label: 'IP PÚBLICO (Roteável na Internet)',
      badgeColor: 'bg-blue-950/80 border-blue-600 text-blue-300',
      detail:
        'Não pertence a nenhuma faixa privada da RFC 1918. É roteado publicamente pelos roteadores de borda e provedores de Internet.',
    };
  }, [o1, o2]);

  // Dados das Camadas OSI e TCP/IP
  const layersData = [
    {
      num: 7,
      osi: 'Aplicação',
      tcp: 'Aplicação (engloba 7, 6 e 5)',
      pdu: 'Mensagem / Dados',
      protocols: 'HTTP, HTTPS, DNS, FTP, SMTP, SSH',
      device: 'Navegadores, Clientes Web, Dispositivos Finais',
      fabioTip: 'Interface direta com os programas e usuários.',
    },
    {
      num: 6,
      osi: 'Apresentação',
      tcp: 'Incorporada na Aplicação',
      pdu: 'Mensagem / Dados',
      protocols: 'SSL/TLS, ASCII, JPEG, MPEG',
      device: 'Bibliotecas de SO e Criptografia',
      fabioTip: 'Formatação, criptografia e compressão de dados.',
    },
    {
      num: 5,
      osi: 'Sessão',
      tcp: 'Incorporada na Aplicação',
      pdu: 'Mensagem / Dados',
      protocols: 'RPC, NetBIOS, Sockets',
      device: 'Gerenciador de Conexões do SO',
      fabioTip: 'Abre, gerencia e finaliza sessões de diálogo.',
    },
    {
      num: 4,
      osi: 'Transporte',
      tcp: 'Transporte',
      pdu: 'Segmento (TCP) / Datagrama (UDP)',
      protocols: 'TCP (confiável, conexão), UDP (rápido, sem conexão)',
      device: 'Portas de comunicação lógica (ex: porta 80, 443)',
      fabioTip: 'Comunicação fim a fim e controle de fluxo.',
    },
    {
      num: 3,
      osi: 'Rede',
      tcp: 'Rede (Internet)',
      pdu: 'Pacote',
      protocols: 'IPv4, IPv6, ICMP, ARP',
      device: 'ROTEADOR (interliga redes diferentes)',
      fabioTip: 'Endereçamento lógico IP e determinação da melhor rota.',
    },
    {
      num: 2,
      osi: 'Enlace de Dados',
      tcp: 'Enlace de Dados',
      pdu: 'Quadro (Frame)',
      protocols: 'Ethernet, Wi-Fi (802.11), MAC',
      device: 'SWITCH (conecta mesma rede) e Placa de Rede',
      fabioTip: 'Manipula quadros e endereços físicos MAC (Questão 10).',
    },
    {
      num: 1,
      osi: 'Física',
      tcp: 'Física',
      pdu: 'Bits',
      protocols: 'Sinais elétricos, pulsos ópticos, modulação',
      device: 'HUB ("burro", repete sinal), cabos de rede e Modem',
      fabioTip: 'Transmissão mecânica e elétrica dos bits.',
    },
  ];

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen overflow-y-auto bg-[#080b11]/80 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-600/30 relative z-10"
    >
      <ModuleHeader
        title="Laboratório Interativo & Calculadora IP"
        subtitle="Simulador de Sub-rede, Validador de IP Privado RFC 1918 e Comparador OSI x TCP/IP"
        badge="Prática Interativa"
        icon={Calculator}
        badgeColor="bg-cyan-950/80 border-cyan-800 text-cyan-300"
        onBack={onBack}
      />

      <main
        data-page-bg="true"
        className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 pb-safe flex flex-col gap-6"
      >
        {/* Seletor de Ferramenta */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'calc'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calculator size={15} />
              <span>Calculadora & Validador de IP</span>
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'layers'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers size={15} />
              <span>Inspetor de Camadas (OSI x TCP/IP)</span>
            </button>
          </div>
        </div>

        {/* FERRAMENTA 1: CALCULADORA E VALIDADOR DE IP */}
        {activeTab === 'calc' && (
          <div className="space-y-6 animate-fade-in">
            {/* Presets da Prova do Fábio */}
            <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs text-zinc-400 font-semibold block mb-2">
                ⚡ Testes Rápidos com as Questões da Prova:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleApplyPreset(['10', '1', '100', '50'], '255.255.0.0')
                  }
                  className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/60 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
                >
                  Q7: 10.1.100.50 /16
                </button>
                <button
                  onClick={() =>
                    handleApplyPreset(
                      ['172', '16', '255', '255'],
                      '255.255.0.0'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-xs font-mono text-emerald-300 transition-all cursor-pointer"
                >
                  Q8 (Privado): 172.16.255.255
                </button>
                <button
                  onClick={() =>
                    handleApplyPreset(['172', '32', '10', '1'], '255.255.0.0')
                  }
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-xs font-mono text-rose-300 transition-all cursor-pointer"
                >
                  Q8 (Pegadinha): 172.32.10.1
                </button>
                <button
                  onClick={() =>
                    handleApplyPreset(
                      ['192', '165', '10', '20'],
                      '255.255.255.0'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/60 text-xs font-mono text-rose-300 transition-all cursor-pointer"
                >
                  Q9 (Pegadinha): 192.165.10.20
                </button>
                <button
                  onClick={() =>
                    handleApplyPreset(['127', '0', '0', '1'], '255.0.0.0')
                  }
                  className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/60 text-xs font-mono text-amber-300 transition-all cursor-pointer"
                >
                  Loopback: 127.0.0.1
                </button>
                <button
                  onClick={() =>
                    handleApplyPreset(
                      ['192', '168', '1', '100'],
                      '255.255.255.0'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-700/60 text-xs font-mono text-blue-300 transition-all cursor-pointer"
                >
                  LAN Padrão: 192.168.1.100 /24
                </button>
              </div>
            </div>

            {/* Painel de Configuração do IP e Máscara */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input de IP */}
              <div className="p-5 rounded-3xl bg-[#0b101b] border border-cyan-500/30">
                <label className="text-xs font-mono text-cyan-300 block mb-2 font-bold">
                  Digite os 4 Octetos do IP (0 a 255):
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <React.Fragment key={idx}>
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={ipOctets[idx]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setIpOctets((prev) => {
                            const copy: [string, string, string, string] = [
                              ...prev,
                            ];
                            copy[idx] = val;
                            return copy;
                          });
                        }}
                        className="w-full text-center py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-400 transition-all"
                      />
                      {idx < 3 && (
                        <span className="text-cyan-400 font-bold text-lg select-none">
                          .
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Seletor de Máscara */}
              <div className="p-5 rounded-3xl bg-[#0b101b] border border-cyan-500/30">
                <label className="text-xs font-mono text-cyan-300 block mb-2 font-bold">
                  Selecione a Máscara de Sub-rede:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '/8 (Classe A)', val: '255.0.0.0' },
                    { label: '/16 (Classe B)', val: '255.255.0.0' },
                    { label: '/24 (Classe C)', val: '255.255.255.0' },
                  ].map((m) => (
                    <button
                      key={m.val}
                      onClick={() => setMaskType(m.val)}
                      className={`p-2 rounded-xl text-xs font-mono text-center border transition-all cursor-pointer ${
                        maskType === m.val
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/30'
                          : 'bg-white/[0.04] text-zinc-300 border-white/[0.08] hover:bg-white/[0.08]'
                      }`}
                    >
                      <span className="block font-bold">{m.label}</span>
                      <span className="text-[10px] opacity-80">{m.val}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Painel com o Cálculo Visual em Tempo Real */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1424] to-[#080d18] border border-cyan-500/40 shadow-2xl">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  Cálculo do Endereço de Rede (Regra do Fábio)
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  {maskType}
                </span>
              </div>

              {/* Tabela dos 4 Octetos com a regra visual */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center font-mono">
                {[0, 1, 2, 3].map((idx) => {
                  const m = maskParts[idx];
                  const ipVal = [o1, o2, o3, o4][idx];
                  const resVal = [
                    netOctet1,
                    netOctet2,
                    netOctet3,
                    netOctet4,
                  ][idx];
                  const isKept = m === 255;

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <span className="text-[10px] text-zinc-500 block mb-1 uppercase font-sans">
                        Octeto {idx + 1}
                      </span>
                      <div className="text-xs text-zinc-300 mb-1">
                        IP: <strong className="text-white">{ipVal}</strong>
                      </div>
                      <div className="text-xs text-cyan-400 font-semibold mb-2">
                        Másc: {m}
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-base sm:text-lg font-bold text-emerald-400 block">
                          {resVal}
                        </span>
                        <span className="text-[9px] text-zinc-500 block">
                          {isKept ? '(255 copia)' : '(0 zera)'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resultado Final em Destaque */}
              <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="text-xs text-zinc-400 block font-mono">
                    Endereço de Rede Calculado:
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-cyan-300">
                    {networkAddress}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-zinc-400 block">
                    Regra Aplicada:
                  </span>
                  <span className="text-xs text-emerald-300 font-bold">
                    Onde a máscara é 255 mantém; onde é 0 vira 0!
                  </span>
                </div>
              </div>
            </div>

            {/* Painel do Analisador de IP Privado vs Público (RFC 1918) */}
            <div className="p-6 rounded-3xl bg-[#0b101b] border border-white/[0.08] shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  Validação RFC 1918 (Privado vs Público)
                </h4>
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${ipAnalysis.badgeColor}`}
                >
                  {ipAnalysis.label}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {ipAnalysis.detail}
              </p>
            </div>
          </div>
        )}

        {/* FERRAMENTA 2: INSPETOR VISUAL DE CAMADAS (OSI X TCP/IP) */}
        {activeTab === 'layers' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Lista Vertical das Camadas */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-xs font-semibold text-zinc-400 block mb-1">
                  Selecione uma Camada para Inspecionar:
                </span>
                {layersData.map((layer, idx) => {
                  const isSelected = selectedLayerIndex === idx;
                  return (
                    <button
                      key={layer.num}
                      onClick={() => setSelectedLayerIndex(idx)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer touch-manipulation ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/40 translate-x-1'
                          : 'bg-white/[0.03] border-white/[0.06] text-zinc-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-white/10 text-zinc-400'
                          }`}
                        >
                          {layer.num}
                        </span>
                        <div>
                          <span className="text-xs font-bold block">
                            {layer.osi}
                          </span>
                          <span className="text-[10px] text-zinc-500 block">
                            PDU: {layer.pdu}
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className={
                          isSelected ? 'text-cyan-400' : 'text-zinc-600'
                        }
                      />
                    </button>
                  );
                })}
              </div>

              {/* Detalhes da Camada Selecionada */}
              <div className="md:col-span-7">
                {(() => {
                  const layer = layersData[selectedLayerIndex];
                  return (
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1424] to-[#080d18] border border-cyan-500/40 shadow-2xl h-full flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700 text-cyan-300">
                            Camada {layer.num} do Modelo OSI
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            TCP/IP: {layer.tcp}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-white mt-3 mb-1">
                          Camada de {layer.osi}
                        </h3>

                        <div className="mt-4 space-y-3 text-xs sm:text-sm">
                          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                            <strong className="text-cyan-300 block mb-0.5 font-mono">
                              📦 Unidade de Dados de Protocolo (PDU):
                            </strong>
                            <span className="text-white font-semibold text-sm">
                              {layer.pdu}
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                            <strong className="text-cyan-300 block mb-0.5 font-mono">
                              🌐 Protocolos & Padrões:
                            </strong>
                            <span className="text-zinc-300 font-mono text-xs">
                              {layer.protocols}
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                            <strong className="text-cyan-300 block mb-0.5 font-mono">
                              ⚙️ Equipamentos & Dispositivos:
                            </strong>
                            <span className="text-zinc-300 font-medium">
                              {layer.device}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dica do Fábio */}
                      <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200 mt-4">
                        <AlertTriangle
                          size={16}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-amber-300 block mb-0.5">
                            Dica do Prof. Fábio:
                          </strong>
                          <p className="text-amber-100/90 leading-relaxed">
                            {layer.fabioTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
