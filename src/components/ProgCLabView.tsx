import React, { useState, useRef, useMemo } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Terminal,
  Code2,
  BookOpen,
  Copy,
  Check,
  Smartphone,
  ListChecks,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ModuleHeader } from './ModuleHeader';
import { executeCCode } from '../utils/cRunner';
import { highlightCCode } from '../utils/cHighlighter';

interface QuickShortcutItem {
  label: string;
  symbol: string;
  wrapPair?: [string, string];
}

const QUICK_SHORTCUTS: QuickShortcutItem[] = [
  { label: '{ }', symbol: '{\n    \n}', wrapPair: ['{\n    ', '\n}'] },
  { label: '( )', symbol: '()', wrapPair: ['(', ')'] },
  { label: '[ ]', symbol: '[]', wrapPair: ['[', ']'] },
  { label: ';', symbol: ';' },
  { label: '&', symbol: '&' },
  { label: '%', symbol: '%' },
  { label: '+=', symbol: ' += ' },
  { label: '++', symbol: '++' },
  { label: '==', symbol: ' == ' },
  { label: '!=', symbol: ' != ' },
  { label: '<', symbol: ' < ' },
  { label: '>', symbol: ' > ' },
  { label: '" "', symbol: '""', wrapPair: ['"', '"'] },
  { label: '\\n', symbol: '\\n' },
  { label: 'int', symbol: 'int ' },
  { label: 'for', symbol: 'for (int i = 0; i < ; i++) {\n    \n}' },
  { label: 'printf', symbol: 'printf("%d\\n", );' },
  { label: 'scanf', symbol: 'scanf("%d", &);' },
  { label: 'else', symbol: 'else {\n    \n}' },
];

interface ProgCLabViewProps {
  onBack: () => void;
  onOpenBottomBarSettings?: () => void;
  initialQuestionId?: 9 | 10;
}

type ChallengeType = 'q9' | 'q10' | 'free';

interface RequirementCheck {
  id: string;
  label: string;
  passed: boolean;
  tip: string;
  isCrucial?: boolean;
}

const TEMPLATES: Record<ChallengeType, string> = {
  q9: `#include <stdio.h>

int main(void) {
    // 1. Declare o vetor de 10 posições e o acumulador iniciado em 0
    int vetor[10], soma = 0;

    // 2. Laço para ler os 10 valores
    for (int i = 0; i < 10; i++) {
        printf("Digite o valor %d: ", i + 1);
        scanf("%d", &vetor[i]);
        soma += vetor[i];
    }

    // 3. Exiba a soma de todos os elementos
    printf("Soma dos elementos: %d\\n", soma);
}`,
  q10: `#include <stdio.h>

int main(void) {
    // 1. Declare a matriz 3x3 e o acumulador
    int matriz[3][3], soma = 0;

    // 2. Laços aninhados: i para linhas, j para colunas
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("Digite o valor [%d][%d]: ", i, j);
            scanf("%d", &matriz[i][j]);
        }
        // Pulo do gato: diagonal principal fora do for de j!
        soma += matriz[i][i];
    }

    // 3. Exiba a soma da diagonal principal
    printf("Soma da diagonal principal: %d\\n", soma);
}`,
  free: `#include <stdio.h>

int main(void) {
    for (i = 0; i < 5; i++) {
        if (i == 3) continue;
        printf("%d ", i);
    }
}`,
};

const SKELETONS: Record<ChallengeType, string> = {
  q9: `#include <stdio.h>

int main(void) {
    // TODO: Declare o vetor de 10 inteiros e o acumulador
    

    // TODO: Faca o laco de 10 repeticoes para ler os valores
    

    // TODO: Mostre a soma com printf
    
}`,
  q10: `#include <stdio.h>

int main(void) {
    // TODO: Declare a matriz 3x3 e o acumulador
    

    // TODO: Faca os 2 lacos for (um dentro do outro)
    

    // TODO: Some a diagonal principal e exiba o resultado
    
}`,
  free: `#include <stdio.h>

int main(void) {
    // Seu codigo aqui
    
}`,
};

export const ProgCLabView: React.FC<ProgCLabViewProps> = ({
  onBack,
  onOpenBottomBarSettings,
  initialQuestionId = 9,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>(
    initialQuestionId === 10 ? 'q10' : 'q9'
  );
  const [code, setCode] = useState<string>(
    TEMPLATES[initialQuestionId === 10 ? 'q10' : 'q9']
  );
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [validationRun, setValidationRun] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal' | 'check'>(
    'editor'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sintaxe colorida estilo Coddy em tempo real
  const highlightedHtml = useMemo(() => highlightCCode(code), [code]);

  // Sincroniza o scroll entre o textarea, a pré-visualização colorida e a coluna de números
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Troca de desafio
  const handleSelectChallenge = (c: ChallengeType) => {
    setSelectedChallenge(c);
    setCode(TEMPLATES[c]);
    setValidationRun(false);
    setTerminalOutput([]);
    setActiveTab('editor');
  };

  // Carregar esqueleto em branco para treinar
  const handleLoadSkeleton = () => {
    setCode(SKELETONS[selectedChallenge]);
    setValidationRun(false);
    setTerminalOutput([]);
  };

  // Carregar gabarito oficial comentado
  const handleLoadSolution = () => {
    setCode(TEMPLATES[selectedChallenge]);
    setValidationRun(false);
  };

  // Copiar código
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Inserção rápida de símbolos na posição do cursor para mobile/desktop
  const insertSymbol = (symbol: string, wrapPair?: [string, string]) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = code.substring(start, end);

    let insertText = symbol;
    let newCursorPos = start + symbol.length;

    if (wrapPair && selectedText.length > 0) {
      insertText = `${wrapPair[0]}${selectedText}${wrapPair[1]}`;
      newCursorPos = start + insertText.length;
    } else if (wrapPair && selectedText.length === 0) {
      insertText = `${wrapPair[0]}${wrapPair[1]}`;
      newCursorPos = start + wrapPair[0].length;
    }

    const newCode =
      code.substring(0, start) + insertText + code.substring(end);
    setCode(newCode);

    // Reposiciona o cursor após atualização do state
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  // Verificador estático de critérios da prova para Q9 e Q10
  const validationResults = useMemo((): RequirementCheck[] => {
    const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // remove comentários

    if (selectedChallenge === 'q9') {
      const hasVetor10 =
        /int\s+vetor\s*\[\s*10\s*\]/i.test(cleanCode) ||
        /int\s+[a-zA-Z_]\w*\s*\[\s*10\s*\]/i.test(cleanCode);

      const hasAccumulator =
        /\b(?:int\s+)?soma\s*=\s*0\b/i.test(cleanCode) ||
        /\b(?:int\s+)?[a-zA-Z_]\w*\s*=\s*0\b/i.test(cleanCode);

      const hasLoop =
        /for\s*\(\s*(?:int\s+)?i\s*=\s*0\s*;\s*i\s*<\s*10\s*;\s*i\s*\+\+\s*\)/i.test(
          cleanCode
        ) ||
        /for\s*\(\s*(?:int\s+)?\w+\s*=\s*0\s*;\s*\w+\s*<\s*10\s*;\s*\w+\+\+\s*\)/i.test(
          cleanCode
        );

      const hasPrintfPrompt =
        /printf\s*\(\s*"[^"]*"/i.test(cleanCode);

      const hasScanfAmpersand =
        /scanf\s*\(\s*"%d"\s*,\s*&/i.test(cleanCode);

      const hasScanfWithoutAmpersand =
        /scanf\s*\(\s*"%d"\s*,\s*(?!&)[a-zA-Z_]\w*\[/i.test(cleanCode);

      const hasScanf = hasScanfAmpersand && !hasScanfWithoutAmpersand;

      const hasAccumulation =
        /\bsoma\s*\+=\s*vetor\s*\[\s*i\s*\]/i.test(cleanCode) ||
        /\bsoma\s*=\s*soma\s*\+\s*vetor\s*\[\s*i\s*\]/i.test(cleanCode) ||
        /\w+\s*\+=\s*\w+\[\s*\w+\s*\]/i.test(cleanCode);

      const hasFinalPrintf =
        /printf\s*\(\s*"[^"]*%d[^"]*"\s*,\s*soma\s*\)/i.test(cleanCode) ||
        /printf\s*\(\s*"[^"]*"\s*,\s*soma\s*\)/i.test(cleanCode);

      return [
        {
          id: 'vetor10',
          label: 'Declaração do vetor com 10 posições (int vetor[10])',
          passed: hasVetor10,
          tip: 'Use: int vetor[10]; para alocar as 10 posições na memória.',
          isCrucial: true,
        },
        {
          id: 'acumulador',
          label: 'Acumulador inicializado com 0 (soma = 0)',
          passed: hasAccumulator,
          tip: 'O acumulador DEVE iniciar em 0 antes do laço para não somar com lixo de memória.',
          isCrucial: true,
        },
        {
          id: 'laco10',
          label: 'Laço for de 10 voltas (i de 0 a 9)',
          passed: hasLoop,
          tip: 'Use: for (int i = 0; i < 10; i++) para percorrer os índices de 0 a 9.',
          isCrucial: true,
        },
        {
          id: 'prompt',
          label: 'Mensagem ao usuário avisando qual valor digitar',
          passed: hasPrintfPrompt,
          tip: 'Use: printf("Digite o valor %d: ", i + 1); para orientar quem usa o programa.',
        },
        {
          id: 'scanf_amp',
          label: 'Leitura com scanf contendo "%d" e operador de endereço "&"',
          passed: hasScanf,
          tip: hasScanfWithoutAmpersand
            ? 'PERIGO: Você esqueceu o "&" no scanf! Em C é obrigatório passar o endereço: scanf("%d", &vetor[i]);'
            : 'Use: scanf("%d", &vetor[i]); lembrando sempre do operador & antes do vetor.',
          isCrucial: true,
        },
        {
          id: 'acumulacao',
          label: 'Soma dos elementos dentro do laço (soma += vetor[i])',
          passed: hasAccumulation,
          tip: 'Dentro do for, acumule: soma += vetor[i]; a cada número digitado.',
          isCrucial: true,
        },
        {
          id: 'exibicao',
          label: 'Exibição da soma final com printf após o laço',
          passed: hasFinalPrintf,
          tip: 'Depois de fechar a chave do for, mostre: printf("Soma dos elementos: %d\\n", soma);',
        },
      ];
    }

    if (selectedChallenge === 'q10') {
      const hasMatriz3x3 =
        /int\s+matriz\s*\[\s*3\s*\]\s*\[\s*3\s*\]/i.test(cleanCode) ||
        /int\s+[a-zA-Z_]\w*\s*\[\s*3\s*\]\s*\[\s*3\s*\]/i.test(cleanCode);

      const hasAccumulator =
        /\b(?:int\s+)?soma\s*=\s*0\b/i.test(cleanCode) ||
        /\b(?:int\s+)?[a-zA-Z_]\w*\s*=\s*0\b/i.test(cleanCode);

      const hasOuterLoop =
        /for\s*\(\s*(?:int\s+)?i\s*=\s*0\s*;\s*i\s*<\s*3\s*;\s*i\s*\+\+\s*\)/i.test(
          cleanCode
        );

      const hasInnerLoop =
        /for\s*\(\s*(?:int\s+)?j\s*=\s*0\s*;\s*j\s*<\s*3\s*;\s*j\s*\+\+\s*\)/i.test(
          cleanCode
        );

      const hasScanfMatriz =
        /scanf\s*\(\s*"%d"\s*,\s*&matriz\s*\[\s*i\s*\]\s*\[\s*j\s*\]/i.test(
          cleanCode
        ) ||
        /scanf\s*\(\s*"%d"\s*,\s*&\w+\[\w+\]\[\w+\]/i.test(cleanCode);

      // Verificação do pulo do gato: soma += matriz[i][i]
      const hasDiagonalSum =
        /soma\s*\+=\s*matriz\s*\[\s*i\s*\]\s*\[\s*i\s*\]/i.test(cleanCode) ||
        /soma\s*=\s*soma\s*\+\s*matriz\s*\[\s*i\s*\]\s*\[\s*i\s*\]/i.test(
          cleanCode
        ) ||
        /\w+\s*\+=\s*\w+\[\s*i\s*\]\[\s*i\s*\]/i.test(cleanCode);

      // Checa se a soma está posicionada fora do for de j mas dentro do de i
      const jLoopPos = cleanCode.search(/for[^{]*j[^{]*\{/);
      const diagonalPos = cleanCode.search(/soma\s*\+=\s*matriz\s*\[\s*i\s*\]\s*\[\s*i\s*\]/);
      
      let isDiagonalOutsideJ = true;
      let jCloseBracePos = -1;
      if (jLoopPos !== -1) {
        // Encontra o fechamento da chave do loop j
        let depth = 0;
        for (let idx = jLoopPos; idx < cleanCode.length; idx++) {
          if (cleanCode[idx] === '{') depth++;
          else if (cleanCode[idx] === '}') {
            depth--;
            if (depth === 0) {
              jCloseBracePos = idx;
              break;
            }
          }
        }
      }

      if (diagonalPos !== -1 && jCloseBracePos !== -1) {
        // Se a soma da diagonal está antes de fechar a chave do for de j, está no lugar errado!
        if (diagonalPos < jCloseBracePos) {
          isDiagonalOutsideJ = false;
        }
      }

      const hasFinalPrintf =
        /printf\s*\(\s*"[^"]*%d[^"]*"\s*,\s*soma\s*\)/i.test(cleanCode) ||
        /printf\s*\(\s*"[^"]*"\s*,\s*soma\s*\)/i.test(cleanCode);

      return [
        {
          id: 'matriz3x3',
          label: 'Declaração da matriz 3x3 de inteiros (int matriz[3][3])',
          passed: hasMatriz3x3,
          tip: 'Use: int matriz[3][3]; para alocar as 9 posições.',
          isCrucial: true,
        },
        {
          id: 'acumulador',
          label: 'Acumulador da diagonal inicializado com 0 (soma = 0)',
          passed: hasAccumulator,
          tip: 'Inicie a variável de soma com 0 antes dos laços.',
          isCrucial: true,
        },
        {
          id: 'laco_i',
          label: 'Laço externo for para as linhas (i de 0 a 2)',
          passed: hasOuterLoop,
          tip: 'Use: for (int i = 0; i < 3; i++) para controlar as 3 linhas.',
          isCrucial: true,
        },
        {
          id: 'laco_j',
          label: 'Laço interno for para as colunas (j de 0 a 2)',
          passed: hasInnerLoop,
          tip: 'Use: for (int j = 0; j < 3; j++) para percorrer as 3 colunas de cada linha.',
          isCrucial: true,
        },
        {
          id: 'scanf_matriz',
          label: 'Leitura com scanf("%d", &matriz[i][j]) contendo o operador &',
          passed: hasScanfMatriz,
          tip: 'Use: scanf("%d", &matriz[i][j]); lembrando do "&" e dos dois índices [i][j].',
          isCrucial: true,
        },
        {
          id: 'diagonal_sum',
          label: 'Pulo do Gato: soma da diagonal com índices repetidos matriz[i][i]',
          passed: hasDiagonalSum,
          tip: 'Na diagonal principal linha == coluna, logo use: soma += matriz[i][i]; sem precisar de if!',
          isCrucial: true,
        },
        {
          id: 'diagonal_pos',
          label: 'Posicionamento correto: soma FORA do laço de j, mas DENTRO do laço de i',
          passed: isDiagonalOutsideJ && hasDiagonalSum,
          tip: !isDiagonalOutsideJ
            ? 'ATENÇÃO AO PULO DO GATO: Você colocou soma += matriz[i][i] DENTRO do laço j! Isso vai somar o mesmo número 3 vezes! Coloque a linha logo APÓS fechar a chave do for de j.'
            : 'Perfeito! Somar fora do for de j garante que a diagonal só soma 1 vez por linha (3 vezes no total).',
          isCrucial: true,
        },
        {
          id: 'exibicao_diag',
          label: 'Exibição da soma final da diagonal principal com printf',
          passed: hasFinalPrintf,
          tip: 'Depois de fechar todos os laços, exiba: printf("Soma da diagonal principal: %d\\n", soma);',
        },
      ];
    }

    return [
      {
        id: 'main_fn',
        label: 'Função main definida (int main(void))',
        passed:
          /int\s+main\s*\(/i.test(cleanCode) ||
          /void\s+main\s*\(/i.test(cleanCode),
        tip: 'Todo programa em C inicia pela função main.',
      },
      {
        id: 'stdio',
        label: 'Inclusão da biblioteca padrão (#include <stdio.h>)',
        passed: /#include\s*<stdio\.h>/i.test(cleanCode),
        tip: 'stdio.h é necessário para usar printf e scanf.',
      },
      {
        id: 'printf_usage',
        label: 'Exibição de saída com printf',
        passed: /printf\s*\(/i.test(cleanCode),
        tip: 'Use printf para exibir dados na tela.',
      },
    ];
  }, [code, selectedChallenge]);

  const passedCount = validationResults.filter((r) => r.passed).length;
  const totalCount = validationResults.length;
  const passPercentage = Math.round((passedCount / totalCount) * 100);

  // Executar validação e acionar confetti se 100%
  const handleValidate = () => {
    setValidationRun(true);
    setActiveTab('check');
    if (passedCount === totalCount) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Execução do código C digitado pelo usuário em tempo real
  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab('terminal');

    setTimeout(() => {
      const result = executeCCode(code);
      setTerminalOutput(result.output);
      setIsRunning(false);
    }, 150);
  };

  return (
    <div
      data-page-bg="true"
      className="w-screen h-screen h-[100dvh] overflow-y-auto bg-[#080b11]/85 backdrop-blur-[1px] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30 relative z-10"
    >
      <ModuleHeader
        title="Laboratório & Playground de Código C"
        subtitle="Treino prático das questões discursivas (Q9 e Q10) com teclado mobile, checagem e terminal"
        badge="B1 • PROGRAMAÇÃO EM C"
        badgeColor="bg-sky-950/80 border-sky-800 text-sky-300"
        icon={Terminal}
        onBack={onBack}
        onOpenBottomBarSettings={onOpenBottomBarSettings}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4">
        {/* Seletor de Desafio Superior */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => handleSelectChallenge('q9')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer touch-manipulation ${
                selectedChallenge === 'q9'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <Code2 size={16} />
              <span>Questão 9 (Vetor & Soma)</span>
            </button>

            <button
              onClick={() => handleSelectChallenge('q10')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer touch-manipulation ${
                selectedChallenge === 'q10'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <Sparkles size={16} />
              <span>Questão 10 (Matriz & Diagonal)</span>
            </button>

            <button
              onClick={() => handleSelectChallenge('free')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer touch-manipulation ${
                selectedChallenge === 'free'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <Terminal size={16} />
              <span>Código Livre</span>
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleLoadSkeleton}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-all cursor-pointer touch-manipulation"
              title="Carregar esqueleto em branco para treinar digitação"
            >
              Esqueleto em Branco
            </button>
            <button
              onClick={handleLoadSolution}
              className="px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900/80 border border-blue-800/80 text-xs font-medium text-blue-300 transition-all cursor-pointer touch-manipulation"
              title="Carregar gabarito oficial com comentários"
            >
              Gabarito Oficial
            </button>
          </div>
        </div>

        {/* Card do Enunciado e Regra da Questão */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {selectedChallenge === 'q9'
                  ? 'Questão 9 Discursiva'
                  : selectedChallenge === 'q10'
                  ? 'Questão 10 Discursiva'
                  : 'Modo Livre'}
              </span>
              <span className="text-xs text-zinc-400">Prova Oficial de C</span>
            </div>
            <p className="text-sm font-medium text-zinc-200">
              {selectedChallenge === 'q9' &&
                'Peça 10 valores inteiros pro usuário, guarde tudo em um vetor de 10 posições e exiba a soma de todos no final.'}
              {selectedChallenge === 'q10' &&
                'Peça 9 valores para uma matriz 3x3 e, no final, exiba a soma APENAS dos elementos da DIAGONAL PRINCIPAL.'}
              {selectedChallenge === 'free' &&
                'Escreva e teste qualquer algoritmo em C com compilador e terminal interativo.'}
            </p>
          </div>

          <div className="shrink-0 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <Info size={14} className="shrink-0" />
            <span>
              {selectedChallenge === 'q9' &&
                'Dica de Ouro: Acumulador começa em 0 antes do laço e scanf precisa do &!'}
              {selectedChallenge === 'q10' &&
                'Pulo do Gato: Diagonal é matriz[i][i] fora do laço j e dentro de i!'}
              {selectedChallenge === 'free' &&
                'Use o teclado rápido abaixo para digitar chaves e operadores com facilidade!'}
            </span>
          </div>
        </div>

        {/* Linha de Atalhos do Teclado C para Mobile e Desktop (SUPER PEDIDO PELO USUÁRIO) */}
        <div className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-blue-500/30 shadow-lg shadow-blue-950/20">
          <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 font-mono font-semibold text-blue-400">
              <Smartphone size={12} />
              <span>Teclado Rápido C • Toque para Inserir</span>
            </span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">
              Insere símbolos e comandos direto no cursor
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {QUICK_SHORTCUTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => insertSymbol(item.symbol, item.wrapPair)}
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-blue-600/30 active:scale-90 active:bg-blue-600 border border-white/[0.1] text-xs font-mono font-medium text-zinc-200 hover:text-white transition-all shrink-0 cursor-pointer touch-manipulation select-none"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Abas Superiores do Editor / Terminal / Checklist */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 size={14} />
              <span>Código C (main.c)</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal size={14} />
              <span>Terminal de Execução</span>
              {terminalOutput.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('check')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'check'
                  ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListChecks size={14} />
              <span>Critérios da Prova</span>
              {validationRun && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    passedCount === totalCount
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-700'
                  }`}
                >
                  {passedCount}/{totalCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Copiar código"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Área Principal: Editor ou Terminal ou Checklist */}
        <div className="flex-1 min-h-[380px] sm:min-h-[440px] flex flex-col rounded-2xl bg-[#03060a] border border-white/[0.08] overflow-hidden relative shadow-2xl">
          {activeTab === 'editor' && (
            <div className="relative flex-1 flex flex-col font-mono text-xs sm:text-sm bg-[#05080f]">
              {/* Barra superior estilo aba de IDE */}
              <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] text-zinc-400 text-xs select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-zinc-300 font-semibold font-mono">main.c</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                    C99
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {code.split('\n').length} linhas
                </span>
              </div>

              {/* Corpo do Editor: Números de Linha + Código Colorido Coddy + Textarea Sobreposta */}
              <div className="relative flex-1 flex overflow-hidden">
                {/* Coluna de Números de Linha */}
                <div
                  ref={lineNumbersRef}
                  aria-hidden="true"
                  className="select-none py-3 px-2 sm:px-3 text-right font-mono text-xs sm:text-sm leading-relaxed text-zinc-600 bg-white/[0.015] border-r border-white/[0.06] overflow-hidden shrink-0 min-w-[36px] sm:min-w-[44px]"
                >
                  {code.split('\n').map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>

                {/* Camada de Código com Sintaxe Colorida estilo Coddy */}
                <div className="relative flex-1 overflow-hidden">
                  <pre
                    ref={preRef}
                    aria-hidden="true"
                    className="absolute inset-0 p-3 m-0 font-mono text-xs sm:text-sm leading-relaxed pointer-events-none overflow-hidden whitespace-pre font-normal select-none"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml + '\n' }}
                  />

                  {/* Textarea transparente sincronizada para digitação */}
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={handleScroll}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    className="absolute inset-0 w-full h-full p-3 m-0 bg-transparent text-transparent caret-sky-400 font-mono text-xs sm:text-sm leading-relaxed resize-none outline-none overflow-auto whitespace-pre font-normal selection:bg-blue-500/30 selection:text-transparent"
                    placeholder="Escreva seu código em C aqui..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="flex-1 flex flex-col font-mono text-xs sm:text-sm bg-black/95 p-4 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3 text-zinc-400 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Terminal size={14} />
                  <span>Terminal de Saída</span>
                </span>
                <button
                  onClick={() => setTerminalOutput([])}
                  className="text-zinc-500 hover:text-zinc-300 text-xs cursor-pointer transition-colors"
                >
                  Limpar tela
                </button>
              </div>

              {terminalOutput.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500 gap-2 py-8">
                  <Terminal size={32} className="opacity-40" />
                  <p>O terminal está pronto. Clique em "Executar Código" abaixo!</p>
                </div>
              ) : (
                <div className="space-y-1 font-mono">
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith('Erro:')
                          ? 'text-rose-400 font-semibold bg-rose-950/20 p-1.5 rounded'
                          : line.startsWith('Soma')
                          ? 'text-amber-300 font-bold'
                          : 'text-zinc-200'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'check' && (
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-950/60 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Análise de Conformidade com a Prova
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Verifica se seu código cumpre os requisitos exigidos pelo professor.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-white">
                      {passPercentage}%
                    </span>
                    <span className="text-xs text-zinc-400 block">
                      {passedCount} de {totalCount} critérios
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-full ${
                      passedCount === totalCount
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {passedCount === totalCount ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <AlertTriangle size={24} />
                    )}
                  </div>
                </div>
              </div>

              {/* Lista de Critérios */}
              <div className="space-y-2.5">
                {validationResults.map((check) => (
                  <div
                    key={check.id}
                    className={`p-3 sm:p-4 rounded-xl border transition-all ${
                      check.passed
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                        : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {check.passed ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <XCircle size={18} className="text-rose-400" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-white">
                            {check.label}
                          </span>
                          {check.isCrucial && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 font-sans">{check.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Barra Inferior de Ação: Executar Código + Verificar Código */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-xs text-zinc-500 flex items-center gap-1.5 self-start sm:self-auto">
            <BookOpen size={14} />
            <span>
              {selectedChallenge === 'q9'
                ? 'Treinando Questão 9 da prova'
                : selectedChallenge === 'q10'
                ? 'Treinando Questão 10 da prova'
                : 'Treino livre'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleValidate}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 border border-white/[0.12] text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-all cursor-pointer touch-manipulation shadow-sm"
            >
              <ListChecks size={16} className="text-cyan-400" />
              <span>Verificar Código</span>
            </button>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer touch-manipulation disabled:opacity-50"
            >
              <Play size={16} fill="currentColor" />
              <span>{isRunning ? 'Executando...' : 'Executar Código'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
