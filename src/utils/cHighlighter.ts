/**
 * Syntax Highlighter para C no estilo Coddy / VS Code Dark
 * Converte código C bruto em HTML com spans estilizados por token
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function highlightCCode(code: string): string {
  if (!code) return '';

  // Expressão regular com grupos para cada categoria de token em C
  const TOKEN_REGEX =
    /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(^\s*#\s*\w+[^\n]*)|(\b(?:int|float|double|char|void|long|short|unsigned|signed|const|struct|typedef|for|while|do|if|else|switch|case|default|break|continue|return)\b)|(\b(?:printf|scanf|main|malloc|free)\b)|(\b\d+(?:\.\d+)?\b)|(\+\+|--|\+=|-=|\*=|%=|\/=|==|!=|<=|>=|&&|\|\||[+\-*/%<>=!&|^~])|([{}()[\];,])/gm;

  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    // Adiciona o texto sem marcação que antecede o token atual
    if (match.index > lastIndex) {
      result += escapeHtml(code.substring(lastIndex, match.index));
    }

    const [
      fullMatch,
      comment,
      str,
      preproc,
      keyword,
      func,
      number,
      operator,
      punctuation,
    ] = match;

    if (comment) {
      result += `<span class="text-zinc-500 italic">${escapeHtml(comment)}</span>`;
    } else if (str) {
      // Destaque para format specifiers dentro de strings (%d, \n, etc.)
      const highlightedStr = escapeHtml(str).replace(
        /(%[difsc%]|\\n|\\t)/g,
        '<span class="text-amber-400 font-bold">$1</span>'
      );
      result += `<span class="text-emerald-400">${highlightedStr}</span>`;
    } else if (preproc) {
      result += `<span class="text-rose-400 font-semibold">${escapeHtml(preproc)}</span>`;
    } else if (keyword) {
      result += `<span class="text-purple-400 font-semibold">${escapeHtml(keyword)}</span>`;
    } else if (func) {
      result += `<span class="text-sky-400 font-semibold">${escapeHtml(func)}</span>`;
    } else if (number) {
      result += `<span class="text-amber-300 font-mono">${escapeHtml(number)}</span>`;
    } else if (operator) {
      result += `<span class="text-cyan-400 font-bold">${escapeHtml(operator)}</span>`;
    } else if (punctuation) {
      result += `<span class="text-zinc-300">${escapeHtml(punctuation)}</span>`;
    } else {
      result += escapeHtml(fullMatch);
    }

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  // Adiciona o restante do código após o último token
  if (lastIndex < code.length) {
    result += escapeHtml(code.substring(lastIndex));
  }

  return result;
}
