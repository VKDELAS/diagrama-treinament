export interface CSimuladoQuestion {
  id: number;
  questionNumber: number;
  title: string;
  category: string;
  isDiscursive: boolean;
  enunciado: string;
  options?: {
    id: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
  correctAnswer?: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  decorebaRapida: string;
  codeSnippet?: string;
  expectedCode?: string;
  checkCriteria?: string[];
}

export const PROG_C_SIMULADO_QUESTIONS: CSimuladoQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    title: 'Declaração de Variáveis',
    category: 'Sintaxe & Tipos',
    isDiscursive: false,
    enunciado: 'Como declara uma variável inteira em C?',
    options: [
      { id: 'a', text: 'int idade;' },
      { id: 'b', text: 'idade: int;' },
      { id: 'c', text: 'integer idade;' },
      { id: 'd', text: 'var int idade;' },
    ],
    correctAnswer: 'a',
    explanation:
      'Em C, primeiro vem o TIPO, depois o NOME da variável, seguido de ponto e vírgula. Tipo → nome; é a regra de ouro. Não existe a palavra "integer" (isso é de outras linguagens tipo Pascal), e nunca fica nome:tipo. Fica: int idade; float nota; char letra;',
    decorebaRapida: 'Em C sempre é [TIPO] [NOME]; → int idade;',
  },
  {
    id: 2,
    questionNumber: 2,
    title: 'Operador Módulo (%)',
    category: 'Operadores Matemáticos',
    isDiscursive: false,
    enunciado:
      'Considere o seguinte trecho de código:\n\nint a = 10, b = 3;\nprintf("%d", a % b);\n\nO que será impresso no console?',
    codeSnippet: 'int a = 10, b = 3;\nprintf("%d", a % b);',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '1' },
      { id: 'c', text: '0' },
      { id: 'd', text: '10' },
    ],
    correctAnswer: 'b',
    explanation:
      'O símbolo % em C é o operador de RESTO da divisão inteira (módulo), não é porcentagem. 10 dividido por 3 resulta em quociente 3 e RESTO 1 (já que 3 × 3 = 9 e 10 - 9 = 1). Logo, a % b = 1.',
    decorebaRapida:
      '% = resto da divisão. Pra pegar só o resultado inteiro da divisão (sem casas decimais) usa a barra normal /.',
  },
  {
    id: 3,
    questionNumber: 3,
    title: 'Operadores Relacionais e Lógicos',
    category: 'Operadores Lógicos',
    isDiscursive: false,
    enunciado:
      'Analise a expressão lógica em C:\n\nint x = 5, y = 0;\nint res = (x > 0) && (y > 0);\n\nQual é o valor resultante armazenado em res?',
    codeSnippet: 'int x = 5, y = 0;\nint res = (x > 0) && (y > 0);',
    options: [
      { id: 'a', text: '1 (verdadeiro)' },
      { id: 'b', text: '0 (falso)' },
      { id: 'c', text: '5' },
      { id: 'd', text: 'Erro de compilação por comparar com zero' },
    ],
    correctAnswer: 'b',
    explanation:
      'O operador && é o "E lógico": só retorna 1 (verdadeiro) se AMBAS as condições forem verdadeiras. (x > 0) é verdadeiro pois 5 > 0. Porém (y > 0) é falso, pois 0 não é maior que 0. Uma condição falsa derruba todo o E lógico → resultado final 0 (falso).',
    decorebaRapida:
      '&& = E (as duas precisam ser verdadeiras) | || = OU (uma já basta) | ! = NÃO (inverte).',
  },
  {
    id: 4,
    questionNumber: 4,
    title: 'Estruturas Condicionais (if / else if / else)',
    category: 'Controle de Fluxo',
    isDiscursive: false,
    enunciado:
      'Dado o seguinte trecho de código com estruturas condicionais aninhadas:\n\nint nota = 7;\nif (nota >= 9)\n    printf("A");\nelse if (nota >= 7)\n    printf("B");\nelse\n    printf("C");\n\nQual será a saída exibida na tela?',
    codeSnippet: `int nota = 7;
if (nota >= 9) 
    printf("A"); 
else if (nota >= 7) 
    printf("B"); 
else 
    printf("C");`,
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'BC' },
    ],
    correctAnswer: 'b',
    explanation:
      'O compilador C testa as condições em sequência de cima para baixo e para na PRIMEIRA que for verdadeira. 7 >= 9 é falso. Passa para a próxima: 7 >= 7 é verdadeiro! Portanto imprime "B" e o restante da estrutura (inclusive o else) é ignorado.',
    decorebaRapida:
      'Assim que uma condição bate, o restante da cadeia if/else if/else é ignorado.',
  },
  {
    id: 5,
    questionNumber: 5,
    title: 'switch-case e break',
    category: 'Controle de Fluxo',
    isDiscursive: false,
    enunciado:
      'Em uma estrutura de seleção múltipla switch-case em C, para que serve a instrução break dentro de cada bloco case?',
    options: [
      {
        id: 'a',
        text: 'Faz o laço reiniciar a verificação a partir do primeiro case',
      },
      {
        id: 'b',
        text: 'Encerra o programa inteiro imediatamente retornando erro',
      },
      {
        id: 'c',
        text: 'Evita que a execução continue para o próximo case (fall-through)',
      },
      {
        id: 'd',
        text: 'Serve apenas como convenção de identação visual para o compilador',
      },
    ],
    correctAnswer: 'c',
    explanation:
      'Sem o comando break, a execução continua em cascata executando todos os cases subsequentes mesmo após encontrar o case correspondente. Esse comportamento indesejado chama-se fall-through. O break interrompe a execução e salta imediatamente para fora do switch.',
    decorebaRapida:
      'TODO case (menos às vezes o último) deve terminar com break, ou o switch continua executando os próximos por fall-through.',
  },
  {
    id: 6,
    questionNumber: 6,
    title: 'while x do-while',
    category: 'Laços de Repetição',
    isDiscursive: false,
    enunciado:
      'Qual é a diferença fundamental no fluxo de execução entre o laço while e o laço do-while em linguagem C?',
    options: [
      {
        id: 'a',
        text: 'O while sempre executa pelo menos uma vez, enquanto o do-while pode não executar nenhuma',
      },
      {
        id: 'b',
        text: 'O do-while sempre executa pelo menos uma vez, porque testa a condição DEPOIS do bloco',
      },
      {
        id: 'c',
        text: 'O do-while não suporta instruções de controle como break e continue',
      },
      {
        id: 'd',
        text: 'O while testa variáveis globais e o do-while testa apenas variáveis locais',
      },
    ],
    correctAnswer: 'b',
    explanation:
      'No while tradicional (pré-teste), a condição é verificada ANTES da primeira iteração; se for falsa de início, o bloco nunca roda. Já no do-while (pós-teste), o bloco é executado primeiro e a condição é avaliada apenas no final, garantindo no mínimo uma execução.',
    decorebaRapida:
      'while → testa antes (pode nunca entrar). do-while → testa depois (entra pelo menos 1 vez).',
  },
  {
    id: 7,
    questionNumber: 7,
    title: 'for e continue',
    category: 'Laços de Repetição',
    isDiscursive: false,
    enunciado:
      'Considere o seguinte laço de repetição for com o comando continue:\n\nint i;\nfor (i = 0; i < 5; i++) {\n    if (i == 3) continue;\n    printf("%d ", i);\n}\n\nQual será a sequência impressa na saída?',
    codeSnippet: `int i;
for (i = 0; i < 5; i++) {
    if (i == 3) continue;
    printf("%d ", i);
}`,
    options: [
      { id: 'a', text: '0 1 2' },
      { id: 'b', text: '0 1 2 4' },
      { id: 'c', text: '0 1 2 3 4' },
      { id: 'd', text: '3 4' },
    ],
    correctAnswer: 'b',
    explanation:
      'A variável i varia de 0 a 4. Quando i atinge 3, a instrução continue faz o laço saltar imediatamente para o próximo incremento (i++), pulando o printf apenas naquela iteração. Logo, 3 não é impresso, mas o laço continua para i = 4.',
    decorebaRapida:
      'continue = pula apenas a volta atual e avança o laço. break = encerra o laço inteiro na hora.',
  },
  {
    id: 8,
    questionNumber: 8,
    title: 'Matrizes Bidimensionais',
    category: 'Vetores & Matrizes',
    isDiscursive: false,
    enunciado:
      'Ao declarar uma matriz bidimensional em C com a instrução:\n\nint matriz[3][2];\n\nQuantos elementos inteiros cabem no total nessa estrutura de dados?',
    codeSnippet: 'int matriz[3][2];',
    options: [
      { id: 'a', text: '5 elementos' },
      { id: 'b', text: '3 elementos' },
      { id: 'c', text: '2 elementos' },
      { id: 'd', text: '6 elementos' },
    ],
    correctAnswer: 'd',
    explanation:
      'Uma matriz bidimensional funciona como uma grade retangular onde o primeiro colchete define o número de LINHAS e o segundo o de COLUNAS. Uma matriz 3 × 2 possui 3 linhas × 2 colunas = 6 posições no total.',
    decorebaRapida:
      'int m[LINHAS][COLUNAS]; total de posições = linhas × colunas (3 × 2 = 6).',
  },
  {
    id: 9,
    questionNumber: 9,
    title: 'Questão Discursiva: Vetor, Laço e Acumulador',
    category: 'Discursiva de Código (Vetor)',
    isDiscursive: true,
    enunciado:
      'Escreva um programa completo em C que declare um vetor de 10 posições inteiras, solicite ao usuário os 10 valores via teclado, armazene-os no vetor e, no final, exiba a soma total de todos os elementos digitados.',
    explanation:
      'O padrão exige declarar o vetor com 10 posições (int vetor[10]), inicializar uma variável acumuladora em zero (soma = 0), utilizar um laço for iterando de 0 até 9, efetuar a leitura com scanf("%d", &vetor[i]) lembrando obrigatoriamente do operador &, somar a cada volta com soma += vetor[i] e exibir a soma final com printf.',
    decorebaRapida:
      'Vetor = 1 índice, 1 laço for. Segredo da discursiva: criar o acumulador com 0 ANTES do laço e ir somando (+=) a cada volta.',
    expectedCode: `#include <stdio.h>

int main(void) {
    int vetor[10], soma = 0;

    for (int i = 0; i < 10; i++) {
        printf("Digite o valor %d: ", i + 1);
        scanf("%d", &vetor[i]);
        soma += vetor[i];
    }

    printf("Soma dos elementos: %d\\n", soma);
    return 0;
}`,
    checkCriteria: [
      'Declaração de vetor com 10 posições inteiras (int vetor[10])',
      'Declaração e inicialização do acumulador em 0 (int soma = 0)',
      'Laço for iterando 10 vezes (índices 0 a 9)',
      'Leitura com scanf contendo "%d" e operador de endereço "&"',
      'Acumulação dos elementos dentro do laço (soma += vetor[i])',
      'Exibição do total acumulado após o término do laço com printf',
    ],
  },
  {
    id: 10,
    questionNumber: 10,
    title: 'Questão Discursiva: Matriz 3x3 e Diagonal Principal',
    category: 'Discursiva de Código (Matriz)',
    isDiscursive: true,
    enunciado:
      'Escreva um programa completo em C que declare uma matriz de inteiros de dimensão 3x3, solicite ao usuário o preenchimento dos 9 valores e, no final, calcule e exiba a soma APENAS dos elementos pertencentes à DIAGONAL PRINCIPAL.',
    explanation:
      'A matriz quadrada possui 3 linhas e 3 colunas (int matriz[3][3]). Usam-se dois laços for aninhados (i para linhas e j para colunas) para a leitura com scanf("%d", &matriz[i][j]). O pulo do gato da diagonal principal é somar matriz[i][i] FORA do laço de j, mas DENTRO do laço de i, somando 1 vez por linha (3 elementos no total: [0][0], [1][1], [2][2])!',
    decorebaRapida:
      'Matriz = 2 índices, 2 laços for. Pulo do gato: diagonal principal é matriz[i][i], somada FORA do for interno j!',
    expectedCode: `#include <stdio.h>

int main(void) {
    int matriz[3][3], soma = 0;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("Digite o valor [%d][%d]: ", i, j);
            scanf("%d", &matriz[i][j]);
        }
        soma += matriz[i][i];
    }

    printf("Soma da diagonal principal: %d\\n", soma);
    return 0;
}`,
    checkCriteria: [
      'Declaração de matriz 3x3 de inteiros (int matriz[3][3])',
      'Declaração e inicialização do acumulador em 0 (int soma = 0)',
      'Dois laços for aninhados para preenchimento (i de 0 a 2, j de 0 a 2)',
      'Leitura correta com scanf("%d", &matriz[i][j]) com operador "&"',
      'Pulo do gato: soma da diagonal matriz[i][i] fora do for de j e dentro do for de i',
      'Exibição da soma da diagonal principal ao término dos laços com printf',
    ],
  },
];
