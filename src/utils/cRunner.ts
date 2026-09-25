/**
 * Executor C Real com GCC (via Wandbox API) + Fallback Local.
 * Compila e executa código C de verdade utilizando o compilador GCC oficial,
 * capturando erros reais de sintaxe (como ponto e vírgula faltando, tipos, delimitadores)
 * e saídas reais de programas em C com suporte a stdin para scanf.
 */

export interface CRunResult {
  output: string[];
  hasError: boolean;
  errorMessage?: string;
  source?: 'gcc-real' | 'local-fallback';
}

/**
 * Normaliza o código para o GCC caso o estudante envie apenas um bloco de código
 * ou tenha esquecido as bibliotecas padrão.
 */
function prepareCCodeForGCC(rawCode: string): string {
  const code = rawCode.trim();

  const hasIncludeStdio = /#include\s*<stdio\.h>/.test(code);
  const hasIncludeStdlib = /#include\s*<stdlib\.h>/.test(code);
  const hasMain = /\b(int|void)\s+main\s*\(/.test(code);

  let fullCode = '';

  if (!hasMain) {
    fullCode = `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n${code}\n}\n`;
  } else {
    let headers = '';
    if (!hasIncludeStdio) headers += '#include <stdio.h>\n';
    if (!hasIncludeStdlib) headers += '#include <stdlib.h>\n';
    fullCode = headers + (headers ? '\n' : '') + code;
  }

  return fullCode;
}

/**
 * Limpa mensagens de erro do compilador GCC para ficarem legíveis e amigáveis.
 */
function formatGCCError(rawError: string): string[] {
  const lines = rawError.trim().split('\n');
  return lines.map((line) => {
    // Substitui referências internas de arquivos temporários do GCC (prog.cc, prog.c) por "Linha"
    return line.replace(/prog\.(?:cc|c):(\d+):(\d+):/g, 'Linha $1, coluna $2:');
  });
}

/**
 * Validação sintática local rápida para casos offline ou pré-checagem.
 */
function validateCSyntaxLocal(code: string): string | null {
  let clean = code;
  clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
  clean = clean.replace(/\/\/.*$/gm, '');
  clean = clean.replace(/"(?:[^"\\]|\\.)*"/g, '""');
  clean = clean.replace(/'(?:[^'\\]|\\.)*'/g, "''");
  clean = clean.replace(/^\s*#.*$/gm, '');

  const pairs: Record<string, string> = { '{': '}', '(': ')', '[': ']' };
  const stack: string[] = [];
  for (const ch of clean) {
    if (ch === '{' || ch === '(' || ch === '[') {
      stack.push(pairs[ch]);
    } else if (ch === '}' || ch === ')' || ch === ']') {
      if (stack.length === 0 || stack[stack.length - 1] !== ch) {
        const names: Record<string, string> = { '}': 'chave }', ')': 'parêntese )', ']': 'colchete ]' };
        return `${names[ch] ?? ch} fechando sem abertura correspondente`;
      }
      stack.pop();
    }
  }
  if (stack.length > 0) {
    const names: Record<string, string> = { '}': 'chave }', ')': 'parêntese )', ']': 'colchete ]' };
    return `Faltando ${names[stack[stack.length - 1]] ?? stack[stack.length - 1]} para fechar`;
  }

  const lines = clean.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw) continue;

    if (
      raw === '{' || raw === '}' ||
      raw.endsWith('{') || raw.endsWith('}') ||
      raw.startsWith('#') ||
      /^(if|else|for|while|do|switch)\b/.test(raw) ||
      /^(int|void|float|double|char)\s+\w+\s*\(/.test(raw) ||
      raw === 'else' || raw === 'else {' || raw === '} else {' || raw === '} else'
    ) continue;

    const isStatement =
      /\b(printf|scanf|return|break|continue)\s*\(/.test(raw) ||
      /\b(int|float|double|char|long|short)\s+\w/.test(raw) ||
      /^\w[\w.\[\]]*\s*(=|\+=|-=|\*=|\/=|%=)/.test(raw);

    if (isStatement && !/[;{}]$/.test(raw) && !raw.endsWith(',')) {
      return `Linha ${i + 1}: faltando ponto e vírgula (;) → "${raw.substring(0, 60)}"`;
    }
  }

  return null;
}

/**
 * Executa código C utilizando compilador GCC real via API do Wandbox.
 */
async function executeGCCReal(
  code: string,
  stdinText: string
): Promise<CRunResult> {
  const preparedCode = prepareCCodeForGCC(code);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        compiler: 'gcc-head',
        code: preparedCode,
        stdin: stdinText,
        options: '-Wall -Wextra -std=c17',
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Servidor de compilação retornou código ${response.status}`);
    }

    const data = (await response.json()) as {
      status?: string;
      compiler_error?: string;
      compiler_message?: string;
      program_output?: string;
      program_error?: string;
      program_message?: string;
    };

    // Erro de compilação GCC (ex: faltou ;, erro de tipo, erro de sintaxe)
    if (data.status !== '0' && data.compiler_error) {
      const formatted = formatGCCError(data.compiler_error);
      return {
        output: formatted,
        hasError: true,
        errorMessage: data.compiler_error,
        source: 'gcc-real',
      };
    }

    // Saída do programa executado
    const outputLines: string[] = [];
    if (data.program_output) {
      // Divide quebras de linha mantendo formatação limpa
      const lines = data.program_output.replace(/\r\n/g, '\n').split('\n');
      // Remove última linha vazia se existir
      if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
      }
      outputLines.push(...lines);
    }

    // Erros de runtime (ex: Segmentation fault, abort)
    if (data.program_error) {
      outputLines.push(...data.program_error.split('\n'));
    }

    if (outputLines.length === 0) {
      outputLines.push('(Programa executado com sucesso, nenhuma saída gerada pelo printf)');
    }

    return {
      output: outputLines,
      hasError: false,
      source: 'gcc-real',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Interpretador local caso não haja conexão de rede ou o serviço remoto esteja indisponível.
 */
function executeLocalFallback(
  code: string,
  customInputs?: number[]
): CRunResult {
  const syntaxErr = validateCSyntaxLocal(code);
  if (syntaxErr) {
    return {
      output: [`Erro de sintaxe: ${syntaxErr}`],
      hasError: true,
      errorMessage: syntaxErr,
      source: 'local-fallback',
    };
  }

  const outputBuffer: string[] = [];
  let currentLine = '';

  const defaultInputs = [
    10, 20, 5, 15, 30, 8, 12, 4, 6, 10,
    2, 5, 7, 3, 8, 1, 9, 4, 6, 1, 2, 3, 4, 5
  ];
  const inputQueue = customInputs && customInputs.length > 0
    ? [...customInputs]
    : [...defaultInputs];

  const readScanf = (): number => {
    return inputQueue.length > 0 ? inputQueue.shift()! : 1;
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

  try {
    let clean = code;
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\/\/.*$/gm, '');
    clean = clean.replace(/^\s*#.*$/gm, '');

    const mainMatch = clean.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    let body = mainMatch ? mainMatch[1] : clean;

    if (!mainMatch) {
      body = body.replace(/int\s+main\s*\([^)]*\)\s*\{?/, '');
      body = body.replace(/}\s*$/, '');
    }

    body = body.replace(/return\s+[0-9]+\s*;/g, '');
    body = body.replace(/return\s*;/g, '');

    body = body.replace(
      /scanf\s*\(\s*"[^"]*"\s*,\s*&([a-zA-Z_]\w*(?:\[[^\]]+\])*)\s*\)\s*;/g,
      `$1 = __readScanf(); __printInputEcho($1);`
    );

    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*,\s*([a-zA-Z_]\w*)\s*=\s*([^;]+);/g,
      `var $1 = Array.from({length: $2}, () => new Array($3).fill(0)); var $4 = $5;`
    );
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*;/g,
      `var $1 = Array.from({length: $2}, () => new Array($3).fill(0));`
    );

    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*,\s*([a-zA-Z_]\w*)\s*=\s*([^;]+);/g,
      `var $1 = new Array($2).fill(0); var $3 = $4;`
    );
    body = body.replace(
      /\b(?:int|float|double)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]\s*;/g,
      `var $1 = new Array($2).fill(0);`
    );

    body = body.replace(/\b(int|float|double|char|long|short)\s+/g, 'var ');

    const preDeclaredVars = `
      var i = 0, j = 0, k = 0;
      var a = 0, b = 0, c = 0;
      var x = 0, y = 0, z = 0;
      var soma = 0, total = 0, count = 0, nota = 0;
      var vetor = new Array(10).fill(0);
      var matriz = Array.from({length: 3}, () => new Array(3).fill(0));
    `;

    let loopCounterId = 0;
    body = body.replace(/\b(for|while)\s*\(([^)]*)\)\s*\{/g, (_, type, cond) => {
      loopCounterId++;
      return `${type} (${cond}) { if (++__loopCount_${loopCounterId} > 5000) throw new Error("Tempo limite excedido (possível loop infinito)");`;
    });

    let loopDefs = '';
    for (let c = 1; c <= loopCounterId; c++) {
      loopDefs += `let __loopCount_${c} = 0; `;
    }

    const runnableCode = `
      ${preDeclaredVars}
      ${loopDefs}
      ${body}
    `;

    const runFn = new Function(
      'printf',
      '__readScanf',
      '__printInputEcho',
      runnableCode
    );

    runFn(printf, readScanf, printInputEcho);

    if (currentLine.length > 0) {
      outputBuffer.push(currentLine);
    }

    if (outputBuffer.length === 0) {
      outputBuffer.push('(Programa executado com sucesso)');
    }

    return {
      output: outputBuffer,
      hasError: false,
      source: 'local-fallback',
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    if (currentLine.length > 0) {
      outputBuffer.push(currentLine);
    }
    outputBuffer.push(`Erro: ${errMessage}`);
    return {
      output: outputBuffer,
      hasError: true,
      errorMessage: errMessage,
      source: 'local-fallback',
    };
  }
}

/**
 * Função principal exportada:
 * Tenta compilar e rodar no compilador GCC Real;
 * Se houver erro de rede, utiliza o fallback local.
 */
export async function executeCCode(
  code: string,
  customInputs?: number[]
): Promise<CRunResult> {
  const defaultInputs = [
    10, 20, 5, 15, 30, 8, 12, 4, 6, 10,
    2, 5, 7, 3, 8, 1, 9, 4, 6, 1, 2, 3, 4, 5
  ];
  const inputs = customInputs && customInputs.length > 0 ? customInputs : defaultInputs;
  const stdinText = inputs.join('\n') + '\n';

  try {
    return await executeGCCReal(code, stdinText);
  } catch {
    // Se a API estiver offline ou sem internet, cai no fallback local
    return executeLocalFallback(code, customInputs);
  }
}
