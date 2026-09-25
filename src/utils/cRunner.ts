/**
 * Executor / Interpretador emulado de C para o navegador.
 * Transpila código C essencial (printf, scanf, laços, vetores, matrizes, condicionais)
 * e executa em tempo real capturando a saída exata para o terminal.
 */

export interface CRunResult {
  output: string[];
  hasError: boolean;
  errorMessage?: string;
}

export function executeCCode(
  code: string,
  customInputs?: number[]
): CRunResult {
  const outputBuffer: string[] = [];
  let currentLine = '';

  // Fila de entradas para scanf
  const defaultInputs = [
    10, 20, 5, 15, 30, 8, 12, 4, 6, 10,
    2, 5, 7, 3, 8, 1, 9, 4, 6, 1, 2, 3, 4, 5
  ];
  const inputQueue = customInputs && customInputs.length > 0
    ? [...customInputs]
    : [...defaultInputs];

  const readScanf = (): number => {
    if (inputQueue.length > 0) {
      return inputQueue.shift()!;
    }
    return 1;
  };

  const appendToOutput = (text: string) => {
    const parts = text.split('\n');
    for (let i = 0; i < parts.length; i++) {
      currentLine += parts[i];
      if (i < parts.length - 1) {
        outputBuffer.push(currentLine);
        currentLine = '';
      }
    }
  };

  const printf = (format: string, ...args: unknown[]) => {
    if (typeof format !== 'string') {
      appendToOutput(String(format ?? ''));
      return;
    }

    let argIdx = 0;
    // Substitui especificadores C: %d, %i, %f, %s, %c, etc.
    const formatted = format.replace(/%(?:[0-9]*\.?[0-9]*)?[difsc%]/g, (match) => {
      if (match === '%%') return '%';
      if (argIdx >= args.length) return match;
      const val = args[argIdx++];
      if (match.endsWith('d') || match.endsWith('i')) {
        return String(Math.trunc(Number(val) || 0));
      }
      if (match.endsWith('f')) {
        return Number(val).toFixed(2);
      }
      return String(val ?? '');
    });

    appendToOutput(formatted);
  };

  const printInputEcho = (val: number) => {
    appendToOutput(`${val}\n`);
  };

  // Pré-processamento e transpilação do código C para JS
  try {
    let clean = code;

    // 1. Remove comentários de bloco /* ... */ e linha // ...
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\/\/.*$/gm, '');

    // 2. Remove diretivas de pré-processador (#include, #define)
    clean = clean.replace(/^\s*#.*$/gm, '');

    // 3. Se houver função main, extrai seu corpo interno
    const mainMatch = clean.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    let body = mainMatch ? mainMatch[1] : clean;

    // Se o fechamento da main não pegou até o final, remove cabeçalho main e chaves envolventes
    if (!mainMatch) {
      body = body.replace(/int\s+main\s*\([^)]*\)\s*\{?/, '');
      // remove última chave solta se existir
      body = body.replace(/}\s*$/, '');
    }

    // 4. Remove 'return 0;' ou 'return;' no final
    body = body.replace(/return\s+[0-9]+\s*;/g, '');
    body = body.replace(/return\s*;/g, '');

    // 5. Transpilação de scanf:
    // Ex: scanf("%d", &vetor[i]); -> vetor[i] = __readScanf(); __printInputEcho(vetor[i]);
    body = body.replace(
      /scanf\s*\(\s*"[^"]*"\s*,\s*&([a-zA-Z_]\w*(?:\[[^\]]+\])*)\s*\)\s*;/g,
      `$1 = __readScanf(); __printInputEcho($1);`
    );

    // 6. Transpilação de matrizes 2D:
    // Ex: int matriz[3][3], soma = 0; ou int matriz[3][3];
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*,\s*([a-zA-Z_]\w*)\s*=\s*([^;]+);/g,
      `var $1 = Array.from({length: $2}, () => new Array($3).fill(0)); var $4 = $5;`
    );
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*;/g,
      `var $1 = Array.from({length: $2}, () => new Array($3).fill(0));`
    );

    // 7. Transpilação de vetores 1D:
    // Ex: int vetor[10], soma = 0; ou int vetor[10];
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*,\s*([a-zA-Z_]\w*)\s*=\s*([^;]+);/g,
      `var $1 = new Array($2).fill(0); var $3 = $4;`
    );
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*;/g,
      `var $1 = new Array($2).fill(0);`
    );

    // 8. Declaração de variáveis simples: int a = 10, b = 3; -> var a = 10, b = 3;
    body = body.replace(/\b(int|float|double|char|long|short)\s+/g, 'var ');

    // 9. Garante que variáveis comuns usadas sem declaração explícita estejam declaradas
    const preDeclaredVars = `
      var i = 0, j = 0, k = 0;
      var a = 0, b = 0, c = 0;
      var x = 0, y = 0, z = 0;
      var soma = 0, total = 0, count = 0, nota = 0;
      var vetor = new Array(10).fill(0);
      var matriz = Array.from({length: 3}, () => new Array(3).fill(0));
    `;

    // 10. Proteção contra loops infinitos:
    // Injeta um contador de segurança nos laços for e while
    let loopCounterId = 0;
    body = body.replace(/\b(for|while)\s*\(([^)]*)\)\s*\{/g, (_, type, cond) => {
      loopCounterId++;
      return `${type} (${cond}) { if (++__loopCount_${loopCounterId} > 5000) throw new Error("Tempo limite excedido (possível loop infinito)");`;
    });

    let loopDefs = '';
    for (let c = 1; c <= loopCounterId; c++) {
      loopDefs += `let __loopCount_${c} = 0; `;
    }

    // Monta o script executável
    const runnableCode = `
      ${preDeclaredVars}
      ${loopDefs}
      ${body}
    `;

    // Executa no sandbox de função
    const runFn = new Function(
      'printf',
      '__readScanf',
      '__printInputEcho',
      runnableCode
    );

    runFn(printf, readScanf, printInputEcho);

    // Se sobrou texto sem newline na currentLine, adiciona
    if (currentLine.length > 0) {
      outputBuffer.push(currentLine);
    }

    if (outputBuffer.length === 0) {
      outputBuffer.push('(Programa executado com sucesso, nenhuma saída gerada pelo printf)');
    }

    return {
      output: outputBuffer,
      hasError: false,
    };
  } catch (err: unknown) {
    if (currentLine.length > 0) {
      outputBuffer.push(currentLine);
    }
    const errMessage = err instanceof Error ? err.message : String(err);
    outputBuffer.push(`Erro: ${errMessage}`);
    return {
      output: outputBuffer,
      hasError: true,
      errorMessage: errMessage,
    };
  }
}
