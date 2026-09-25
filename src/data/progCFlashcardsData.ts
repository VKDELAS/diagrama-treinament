export interface CFlashcard {
  id: number;
  categoria:
    | 'Sintaxe & Tipos'
    | 'Operadores (% e Lógicos)'
    | 'Condicionais & Switch'
    | 'Laços de Repetição'
    | 'Vetores & Matrizes'
    | 'Discursivas de Código'
    | 'Pegadinhas da Prova';
  pergunta: string;
  resposta: string;
  dica?: string;
  codigoExemplo?: string;
}

export const PROG_C_FLASHCARDS_DATA: CFlashcard[] = [
  // --- 1. SINTAXE & TIPOS ---
  {
    id: 1,
    categoria: 'Sintaxe & Tipos',
    pergunta: 'Como se declara uma variável inteira em C?',
    resposta:
      'Em C, primeiro vem o TIPO, depois o NOME da variável, seguido de ponto e vírgula:\n\nint idade;\n\nOutros exemplos válidos: float nota; char letra; double salario;',
    dica: 'Regra de ouro: [TIPO] [NOME]; Nunca fica "idade: int" e não existe a palavra "integer" em C!',
    codigoExemplo: 'int idade;\nfloat nota;\nchar letra;',
  },
  {
    id: 2,
    categoria: 'Sintaxe & Tipos',
    pergunta: 'Por que "integer idade;" ou "idade: int;" causam erro de compilação em C?',
    resposta:
      'Porque "integer" pertence a linguagens como Pascal/SQL, e "nome: tipo" é sintaxe do TypeScript/Kotlin/Pascal.\n\nEm C puro, o compilador reconhece apenas a palavra-chave reservada "int".',
    dica: 'Memorize: sempre TIPO antes do NOME: int x;',
  },
  {
    id: 3,
    categoria: 'Sintaxe & Tipos',
    pergunta: 'Quais são os especificadores de formato mais cobrados no printf e scanf?',
    resposta:
      '%d ou %i → inteiros (int)\n%f → números com ponto flutuante (float)\n%lf → double\n%c → caractere único (char)\n%s → string de texto',
    dica: 'Na prova de C do semestre, %d para inteiros é o mais cobrado nas 10 questões!',
  },

  // --- 2. OPERADORES (% E LÓGICOS) ---
  {
    id: 4,
    categoria: 'Operadores (% e Lógicos)',
    pergunta: 'O que faz o operador % em C e qual o resultado de 10 % 3?',
    resposta:
      'O operador % calcula o RESTO da divisão inteira (módulo).\n\n10 % 3 = 1\n(porque 10 ÷ 3 dá 3 com sobra 1; 3 × 3 = 9, 10 - 9 = 1).',
    dica: '% NÃO é porcentagem! Para pegar o resultado da divisão inteira usa-se a barra normal /.',
    codigoExemplo: 'int a = 10, b = 3;\nprintf("%d", a % b); // imprime 1',
  },
  {
    id: 5,
    categoria: 'Operadores (% e Lógicos)',
    pergunta: 'Qual a diferença entre a / b e a % b em C quando a e b são inteiros?',
    resposta:
      'a / b calcula o QUOCIENTE inteiro (descarta a parte decimal).\n\na % b calcula o RESTO da divisão.\n\nExemplo com 7 e 2: 7 / 2 = 3 e 7 % 2 = 1.',
    dica: 'Dica da prova: divisão de int com int em C sempre trunca o resultado!',
  },
  {
    id: 6,
    categoria: 'Operadores (% e Lógicos)',
    pergunta: 'Como funcionam os operadores lógicos &&, || e ! em C?',
    resposta:
      '&& (E lógico): verdadeiro (1) somente se AMBAS as condições forem verdadeiras.\n\n|| (OU lógico): verdadeiro (1) se pelo menos UMA condição for verdadeira.\n\n! (NÃO lógico): inverte o valor (0 vira 1, diferente de 0 vira 0).',
    dica: 'Macete rápido: && = as duas precisam bater | || = uma já basta | ! = inverte.',
  },
  {
    id: 7,
    categoria: 'Operadores (% e Lógicos)',
    pergunta: 'int x = 5, y = 0; Qual o resultado de (x > 0) && (y > 0)?',
    resposta:
      'Resultado: 0 (falso).\n\nExplicação: (x > 0) é 5 > 0 (verdadeiro), mas (y > 0) é 0 > 0 (falso). Como o operador é && (E), uma única condição falsa já derruba toda a expressão para 0.',
    dica: 'Zero nunca é maior que zero (0 > 0 é falso)!',
  },

  // --- 3. CONDICIONAIS & SWITCH ---
  {
    id: 8,
    categoria: 'Condicionais & Switch',
    pergunta: 'Como o C avalia uma cadeia if / else if / else?',
    resposta:
      'O C avalia as condições em sequência de cima para baixo. Assim que a primeira condição verdadeira é encontrada, seu bloco é executado e todo o restante da cadeia é ignorado.',
    dica: 'Se nota = 7: testa nota >= 9 (falso) → testa nota >= 7 (verdadeiro) → imprime e para!',
    codigoExemplo: `int nota = 7;
if (nota >= 9) printf("A");
else if (nota >= 7) printf("B"); // Para aqui!
else printf("C");`,
  },
  {
    id: 9,
    categoria: 'Condicionais & Switch',
    pergunta: 'Para que serve a instrução break dentro de um switch-case?',
    resposta:
      'Serve para interromper a execução do switch e sair imediatamente de dentro da estrutura.\n\nSem o break, o C continua executando os blocos seguintes mesmo após encontrar o case correto (fenômeno chamado "fall-through").',
    dica: 'Regra prática: TODO case (menos às vezes o último) deve terminar com break!',
  },
  {
    id: 10,
    categoria: 'Condicionais & Switch',
    pergunta: 'O que é "fall-through" em um switch-case e quando ele ocorre?',
    resposta:
      'É quando o fluxo do programa "cai" direto para os cases de baixo sem testá-los, executando comandos indesejados. Ocorre quando o programador esquece de colocar o "break;" no final do case.',
    dica: 'Pegadinha certeira em provas de múltipla escolha!',
  },

  // --- 4. LAÇOS DE REPETIÇÃO ---
  {
    id: 11,
    categoria: 'Laços de Repetição',
    pergunta: 'Qual a diferença essencial entre o laço while e o laço do-while?',
    resposta:
      'while: testa a condição ANTES de entrar no laço. Se a condição já começar falsa, o bloco roda ZERO vezes.\n\ndo-while: executa o bloco primeiro e só testa a condição no FINAL. Garante que o bloco rode pelo menos 1 vez.',
    dica: 'while = testa antes (pode nunca entrar) | do-while = testa depois (entra pelo menos 1 vez).',
  },
  {
    id: 12,
    categoria: 'Laços de Repetição',
    pergunta: 'Qual a diferença entre as instruções "continue" e "break" dentro de um laço?',
    resposta:
      'continue: pula APENAS a iteração (volta) atual e avança imediatamente para o próximo ciclo do laço.\n\nbreak: aborta e ENCERRA o laço inteiro definitivamente.',
    dica: 'continue = pula a volta e segue o laço | break = chuta o balde e sai do laço na hora.',
  },
  {
    id: 13,
    categoria: 'Laços de Repetição',
    pergunta: 'for (i=0; i<5; i++) { if (i==3) continue; printf("%d ", i); } → o que imprime?',
    resposta:
      'Imprime: 0 1 2 4\n\nQuando i chega a 3, a instrução continue pula o printf daquela iteração. Mas o laço continua normalmente e imprime o 4 na volta seguinte.',
    dica: 'O 3 não aparece, mas o 4 aparece sim!',
  },

  // --- 5. VETORES & MATRIZES ---
  {
    id: 14,
    categoria: 'Vetores & Matrizes',
    pergunta: 'Em C, qual é o índice do primeiro e do último elemento de um vetor int v[10]?',
    resposta:
      'Primeiro elemento: v[0]\nÚltimo elemento: v[9]\n\nEm C, a indexação SEMPRE começa em 0. Um vetor de tamanho N vai de 0 até N-1.',
    dica: 'Acessar v[10] é invasão de memória (índice fora dos limites)!',
  },
  {
    id: 15,
    categoria: 'Vetores & Matrizes',
    pergunta: 'int matriz[3][2]; quantos elementos cabem e o que significa cada colchete?',
    resposta:
      'Cabem 3 × 2 = 6 elementos no total.\n\nO primeiro número representa a quantidade de LINHAS (3 linhas).\nO segundo número representa a quantidade de COLUNAS (2 colunas).',
    dica: 'Fórmula: total de posições = linhas × colunas. int m[3][2] → 3 × 2 = 6.',
  },
  {
    id: 16,
    categoria: 'Vetores & Matrizes',
    pergunta: 'O que são laços aninhados e para que são usados com matrizes?',
    resposta:
      'São laços dentro de laços. O laço externo (geralmente com variável i) controla a LINHA atual, e o laço interno (geralmente com variável j) percorre as COLUNAS daquela linha.',
    dica: 'Para matriz 3x3: laço i roda 3 vezes; para cada i, o laço j roda 3 vezes → 3 × 3 = 9 voltas!',
  },

  // --- 6. DISCURSIVAS DE CÓDIGO ---
  {
    id: 17,
    categoria: 'Discursivas de Código',
    pergunta: 'Como funciona o padrão "Laço + Acumulador" na Questão 9?',
    resposta:
      '1. Declara a variável acumuladora iniciada com 0 ANTES do laço: int soma = 0;\n2. Executa o laço for iterando as 10 posições (i = 0 até i < 10);\n3. Lê com scanf("%d", &vetor[i]);\n4. Acumula somando com: soma += vetor[i];\n5. Imprime a soma total DEPOIS que o laço fecha.',
    dica: 'Se não inicializar a soma com 0, ela conterá lixo de memória e o resultado sairá errado!',
  },
  {
    id: 18,
    categoria: 'Discursivas de Código',
    pergunta: 'Por que o scanf precisa do operador & antes da variável (ex: &vetor[i])?',
    resposta:
      'O símbolo & é o OPERADOR DE ENDEREÇO. O scanf precisa saber ONDE (em qual endereço de memória) ele deve gravar o valor digitado pelo usuário. Passar sem & causa falha de segmentação (crash).',
    dica: 'Pegadinha clássica em provas: esquecer o & no scanf!',
  },
  {
    id: 19,
    categoria: 'Discursivas de Código',
    pergunta: 'Qual é o PULO DO GATO para somar a diagonal principal de uma matriz 3x3 na Questão 10?',
    resposta:
      'A diagonal principal é onde LINHA == COLUNA: posições [0][0], [1][1] e [2][2].\n\nBasta usar soma += matriz[i][i] FORA do laço de j, mas DENTRO do laço de i! Assim ela só executa 1 vez por linha (3 vezes no total), sem precisar de nenhum comando if!',
    dica: 'Pulo do gato: matriz[i][i] fora do for j! Se colocar dentro do for j, vai somar 3 vezes a mesma coisa!',
  },
  {
    id: 20,
    categoria: 'Discursivas de Código',
    pergunta: 'Resumo geral da diferença entre as duas questões discursivas (Q9 vs Q10)?',
    resposta:
      'Vetor (Q9): 1 índice (i), 1 laço for, lê vetor[i], acumula soma += vetor[i].\n\nMatriz (Q10): 2 índices (i e j), 2 laços for aninhados, lê matriz[i][j], e diagonal acumula soma += matriz[i][i].',
    dica: 'Em ambas o acumulador começa em 0 antes do laço!',
  },

  // --- 7. PEGADINHAS DA PROVA ---
  {
    id: 21,
    categoria: 'Pegadinhas da Prova',
    pergunta: 'Qual a pegadinha clássica do if (x = 5) com um único sinal de igual?',
    resposta:
      'Um único sinal "=" é ATRIBUIÇÃO, não comparação! if (x = 5) atribui 5 a x, e como 5 é diferente de zero, a condição será SEMPRE VERDADEIRA.\n\nPara comparação deve-se usar "==": if (x == 5).',
    dica: '= atribui | == compara se é igual.',
  },
  {
    id: 22,
    categoria: 'Pegadinhas da Prova',
    pergunta: 'O que acontece se colocar ponto e vírgula logo após o if: if (nota >= 7); ?',
    resposta:
      'O ponto e vírgula encerra o if imediatamente com um comando vazio! O bloco de código que vier a seguir será executado SEMPRE, independentemente do valor da nota.',
    dica: 'Nunca coloque ponto e vírgula após a condição do if ou for: if (condicao); // ERRO!',
  },
  {
    id: 23,
    categoria: 'Pegadinhas da Prova',
    pergunta: 'Na Questão 9, por que no printf foi usado "i + 1" em vez de "i"?',
    resposta:
      'printf("Digite o valor %d: ", i + 1);\n\nPorque os índices internos do vetor vão de 0 a 9, mas para o usuário humano fica muito mais natural ler "Digite o valor 1", "Digite o valor 2" até "10" em vez de começar em 0.',
    dica: 'O vetor continua sendo acessado em vetor[i], só a mensagem visual usa i + 1.',
  },
];
