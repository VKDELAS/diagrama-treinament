import React from 'react';

// Diagrama SVG da Questão 5 fiel ao PDF da prova
export const DiagramaQ5Svg: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto my-4 p-4 bg-slate-950/90 border border-slate-700/80 rounded-2xl shadow-xl overflow-x-auto">
      <div className="text-center text-xs font-mono text-slate-400 mb-2 font-semibold">
        Diagrama da Q5: Cliente (1,1) — Emite — Compra (0,N)
      </div>
      <svg
        viewBox="0 0 740 320"
        className="w-full h-auto min-w-[580px] select-none text-slate-200"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* Linhas de conexão principais do DER */}
        <line x1="210" y1="180" x2="310" y2="180" stroke="#64748b" strokeWidth="2.5" />
        <line x1="430" y1="180" x2="530" y2="180" stroke="#64748b" strokeWidth="2.5" />

        {/* Atributos de Cliente */}
        {/* Identificador Código (círculo cheio) */}
        <line x1="150" y1="150" x2="115" y2="90" stroke="#64748b" strokeWidth="2" />
        <circle cx="115" cy="90" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <text x="130" y="94" fontSize="13" fill="#e2e8f0" fontWeight="bold">
          Código
        </text>

        {/* Atributo Nome (círculo vazio) */}
        <line x1="150" y1="150" x2="165" y2="90" stroke="#64748b" strokeWidth="2" />
        <circle cx="165" cy="90" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="180" y="94" fontSize="13" fill="#e2e8f0">
          Nome
        </text>

        {/* Entidade CLIENTE (Retângulo) */}
        <rect
          x="90"
          y="150"
          width="120"
          height="60"
          rx="6"
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />
        <text
          x="150"
          y="186"
          fontSize="16"
          fontWeight="bold"
          fill="#f8fafc"
          textAnchor="middle"
        >
          Cliente
        </text>

        {/* Cardinalidade junto a Cliente */}
        <rect x="220" y="162" width="38" height="24" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <text x="239" y="179" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
          1,1
        </text>

        {/* Relacionamento EMITE (Losango) */}
        <polygon
          points="370,140 430,180 370,220 310,180"
          fill="#1e293b"
          stroke="#a855f7"
          strokeWidth="2.5"
        />
        <text
          x="370"
          y="185"
          fontSize="14"
          fontWeight="bold"
          fill="#f3e8ff"
          textAnchor="middle"
        >
          Emite
        </text>

        {/* Cardinalidade junto a Compra */}
        <rect x="480" y="162" width="40" height="24" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <text x="500" y="179" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">
          0,N
        </text>

        {/* Entidade COMPRA (Retângulo) */}
        <rect
          x="530"
          y="150"
          width="120"
          height="60"
          rx="6"
          fill="#1e293b"
          stroke="#34d399"
          strokeWidth="2.5"
        />
        <text
          x="590"
          y="186"
          fontSize="16"
          fontWeight="bold"
          fill="#f8fafc"
          textAnchor="middle"
        >
          Compra
        </text>

        {/* Atributos de Compra */}
        {/* Identificador Número (círculo cheio) */}
        <line x1="590" y1="150" x2="560" y2="90" stroke="#64748b" strokeWidth="2" />
        <circle cx="560" cy="90" r="7" fill="#34d399" stroke="#059669" strokeWidth="2" />
        <text x="575" y="94" fontSize="13" fill="#e2e8f0" fontWeight="bold">
          Número
        </text>

        {/* Atributo Data (círculo vazio) */}
        <line x1="590" y1="150" x2="615" y2="90" stroke="#64748b" strokeWidth="2" />
        <circle cx="615" cy="90" r="7" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
        <text x="630" y="94" fontSize="13" fill="#e2e8f0">
          Data
        </text>

        {/* Rótulos explicativos da prova (com setas indicativas) */}
        <text x="150" y="270" fontSize="11" fill="#94a3b8" textAnchor="middle">
          Entidade
        </text>
        <line x1="150" y1="255" x2="150" y2="215" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />

        <text x="370" y="115" fontSize="11" fill="#94a3b8" textAnchor="middle">
          Relacionamento
        </text>
        <line x1="370" y1="120" x2="370" y2="135" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />

        <text x="560" y="45" fontSize="11" fill="#94a3b8" textAnchor="middle">
          Identificador de Entidade
        </text>
        <line x1="560" y1="52" x2="560" y2="78" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />

        <text x="165" y="45" fontSize="11" fill="#94a3b8" textAnchor="middle">
          Atributo
        </text>
        <line x1="165" y1="52" x2="165" y2="78" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />

        <text x="500" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">
          Cardinalidade Mínima (0) e Máxima (N)
        </text>
        <line x1="500" y1="245" x2="500" y2="190" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />
      </svg>
    </div>
  );
};

// Diagramas SVG das 4 opções da Questão 6
export const DiagramaQ6Svg: React.FC<{ selectedAlternative?: string }> = ({
  selectedAlternative,
}) => {
  const options = [
    {
      id: 'a',
      cardAluno: '(0,n)',
      cardDisc: '(0,1)',
      hasNotaInRel: false,
      hasNotaInDisc: false,
      isCorrect: false,
      label: 'Opção a: ALUNO (0,n) — CURSA — (0,1) DISCIPLINA (sem nota no relacionamento)',
    },
    {
      id: 'b',
      cardAluno: '(0,n)',
      cardDisc: '(1,n)',
      hasNotaInRel: false,
      hasNotaInDisc: true,
      isCorrect: false,
      label: 'Opção b: ALUNO (0,n) — CURSA — (1,n) DISCIPLINA (Nota na Disciplina)',
    },
    {
      id: 'c',
      cardAluno: '(0,n)',
      cardDisc: '(0,n)',
      hasNotaInRel: true,
      hasNotaInDisc: false,
      isCorrect: false,
      label: 'Opção c: ALUNO (0,n) — CURSA [Nota] — (0,n) DISCIPLINA',
    },
    {
      id: 'd',
      cardAluno: '(0,n)',
      cardDisc: '(1,n)',
      hasNotaInRel: true,
      hasNotaInDisc: false,
      isCorrect: true,
      label: 'Opção d (Gabarito Oficial): ALUNO (0,n) — CURSA [Nota] — (1,n) DISCIPLINA',
    },
  ];

  return (
    <div className="w-full my-4 space-y-3">
      <div className="text-xs font-semibold text-slate-300">
        Diagramas das Alternativas (Q6):
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isHighlighted = selectedAlternative === opt.id;
          return (
            <div
              key={opt.id}
              className={`p-3 rounded-2xl border transition-all ${
                isHighlighted
                  ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-blue-300">
                  Alternativa {opt.id})
                </span>
                {opt.isCorrect && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                    Gabarito Correto
                  </span>
                )}
              </div>

              <svg viewBox="0 0 540 180" className="w-full h-auto select-none">
                {/* Linhas principais */}
                <line x1="140" y1="90" x2="220" y2="90" stroke="#64748b" strokeWidth="2" />
                <line x1="320" y1="90" x2="400" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Atributos ALUNO */}
                <line x1="80" y1="70" x2="45" y2="35" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="45" cy="35" r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <text x="55" y="38" fontSize="10" fill="#cbd5e1" fontWeight="bold">
                  AlunoRa
                </text>

                <line x1="80" y1="70" x2="90" y2="35" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="90" cy="35" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="100" y="38" fontSize="10" fill="#cbd5e1">
                  AlunoNome
                </text>

                {/* Entidade ALUNO */}
                <rect
                  x="20"
                  y="70"
                  width="120"
                  height="45"
                  rx="5"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text
                  x="80"
                  y="97"
                  fontSize="13"
                  fontWeight="bold"
                  fill="#f8fafc"
                  textAnchor="middle"
                >
                  ALUNO
                </text>

                {/* Cardinalidade ALUNO */}
                <rect x="145" y="77" width="34" height="20" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="162" y="91" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
                  {opt.cardAluno}
                </text>

                {/* Relacionamento CURSA */}
                <polygon
                  points="270,60 320,90 270,120 220,90"
                  fill="#1e293b"
                  stroke="#a855f7"
                  strokeWidth="2"
                />
                <text
                  x="270"
                  y="94"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#f3e8ff"
                  textAnchor="middle"
                >
                  CURSA
                </text>

                {/* Atributo Nota no Relacionamento CURSA (se houver) */}
                {opt.hasNotaInRel && (
                  <>
                    <line x1="270" y1="120" x2="270" y2="155" stroke="#64748b" strokeWidth="1.5" />
                    <circle cx="270" cy="155" r="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="282" y="159" fontSize="11" fill="#fcd34d" fontWeight="bold">
                      Nota
                    </text>
                  </>
                )}

                {/* Cardinalidade DISCIPLINA */}
                <rect x="360" y="77" width="34" height="20" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="377" y="91" fontSize="10" fontWeight="bold" fill="#34d399" textAnchor="middle">
                  {opt.cardDisc}
                </text>

                {/* Entidade DISCIPLINA */}
                <rect
                  x="400"
                  y="70"
                  width="120"
                  height="45"
                  rx="5"
                  fill="#1e293b"
                  stroke="#34d399"
                  strokeWidth="2"
                />
                <text
                  x="460"
                  y="97"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#f8fafc"
                  textAnchor="middle"
                >
                  DISCIPLINA
                </text>

                {/* Atributos DISCIPLINA */}
                <line x1="460" y1="70" x2="420" y2="30" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="420" cy="30" r="5" fill="#34d399" stroke="#059669" strokeWidth="1.5" />
                <text x="430" y="33" fontSize="9" fill="#cbd5e1" fontWeight="bold">
                  DisciplinaId
                </text>

                <line x1="460" y1="70" x2="480" y2="30" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="480" cy="30" r="5" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
                <text x="490" y="33" fontSize="9" fill="#cbd5e1">
                  Nome
                </text>

                {/* Se a opção coloca Nota na Disciplina */}
                {opt.hasNotaInDisc && (
                  <>
                    <line x1="460" y1="115" x2="460" y2="150" stroke="#64748b" strokeWidth="1.5" />
                    <circle cx="460" cy="150" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="472" y="154" fontSize="10" fill="#fda4af">
                      DisciplinaNota
                    </text>
                  </>
                )}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Diagrama SVG do Modelo Lógico da Questão 7
export const DiagramaQ7Svg: React.FC<{ selectedAlternative?: string }> = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-4 bg-slate-950/90 border border-slate-700/80 rounded-2xl shadow-xl overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-slate-300 font-semibold">
          Modelo Lógico Relacional Oficial (Alternativa B)
        </span>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
          Gabarito Correto
        </span>
      </div>

      <svg viewBox="0 0 680 340" className="w-full h-auto min-w-[540px] select-none">
        {/* Tabela ALUNO */}
        <g transform="translate(40, 30)">
          <rect x="0" y="0" width="180" height="28" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
          <text x="90" y="19" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">
            ALUNO
          </text>
          <rect x="0" y="28" width="180" height="60" rx="0" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="14" y="50" fontSize="11" fontWeight="bold" fill="#38bdf8">
            PK  AlunoRa
          </text>
          <text x="14" y="72" fontSize="11" fill="#94a3b8">
                AlunoNome
          </text>
        </g>

        {/* Tabela DISCIPLINA */}
        <g transform="translate(460, 30)">
          <rect x="0" y="0" width="180" height="28" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="2" />
          <text x="90" y="19" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">
            DISCIPLINA
          </text>
          <rect x="0" y="28" width="180" height="75" rx="0" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="14" y="48" fontSize="11" fontWeight="bold" fill="#34d399">
            PK  DisciplinaId
          </text>
          <text x="14" y="68" fontSize="11" fill="#94a3b8">
                Nome
          </text>
          <text x="14" y="88" fontSize="11" fill="#94a3b8">
                CargaHoraria
          </text>
        </g>

        {/* Tabela Associativa CURSA */}
        <g transform="translate(240, 180)">
          <rect x="0" y="0" width="200" height="28" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
          <text x="100" y="19" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">
            CURSA (Associativa)
          </text>
          <rect x="0" y="28" width="200" height="85" rx="0" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <rect x="8" y="34" width="184" height="42" rx="4" fill="#3b0764/50" stroke="#9333ea/40" strokeWidth="1" />
          <text x="14" y="50" fontSize="10.5" fontWeight="bold" fill="#c084fc">
            PK, FK1  FK_DisciplinaId
          </text>
          <text x="14" y="68" fontSize="10.5" fontWeight="bold" fill="#c084fc">
            PK, FK2  FK_AlunoRa
          </text>
          <text x="14" y="98" fontSize="11" fontWeight="bold" fill="#facc15">
            Nota
          </text>
        </g>

        {/* Conexão ALUNO -> CURSA */}
        <path d="M 130 118 L 130 220 L 240 220" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
        <rect x="140" y="125" width="34" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="157" y="139" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
          (0,1)
        </text>

        <rect x="195" y="208" width="34" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="212" y="222" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
          (0,n)
        </text>

        {/* Conexão DISCIPLINA -> CURSA */}
        <path d="M 550 133 L 550 220 L 440 220" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
        <rect x="505" y="140" width="34" height="20" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
        <text x="522" y="154" fontSize="10" fontWeight="bold" fill="#34d399" textAnchor="middle">
          (1,1)
        </text>

        <rect x="450" y="208" width="34" height="20" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
        <text x="467" y="222" fontSize="10" fontWeight="bold" fill="#34d399" textAnchor="middle">
          (1,n)
        </text>
      </svg>
    </div>
  );
};
