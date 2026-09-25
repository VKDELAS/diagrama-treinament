export interface CQuestionInfo {
  id: number;
  number: number;
  title: string;
  category: string;
  isDiscursive: boolean;
  question: string;
  correctAnswerSummary: string;
  porQue: string;
  decorebaRapida: string;
  fullCode?: string;
  lineByLineExplanation?: {
    code: string;
    explanation: string;
  }[];
  centralIdea?: string;
  puloDoGato?: string;
}

export const C_QUESTIONS_DATA: CQuestionInfo[] = [
  {
    id: 1,
    number: 1,
    title: 'Declaração de Variáveis',
    category: 'Sintaxe & Tipos',
    isDiscursive: false,
    question: 'Como declara uma variável inteira em C?',
    correctAnswerSummary: 'A — int idade;',
    porQue:
      'Em C, primeiro vem o TIPO, depois o NOME da variável, seguido de ponto e vírgula. Tipo → nome; é a regra de ouro. Não existe a palavra "integer" (isso é de outras linguagens tipo Pascal), e nunca fica nome:tipo. Fica: int idade; float nota; char letra;',
    decorebaRapida: 'Em C sempre é [TIPO] [NOME]; → int idade;',
  },
  {
    id: 2,
    number: 2,
    title: 'Operador Módulo (%)',
    category: 'Operadores Matemáticos',
    isDiscursive: false,
    question: 'int a = 10, b = 3; printf("%d", a % b); → o que imprime?',
    correctAnswerSummary: 'B — 1',
    porQue:
      'O símbolo % em C é o operador de RESTO da divisão (módulo), não é porcentagem. 10 dividido por 3 dá 3 inteiro, e sobra 1 (porque 3x3=9, e 10-9=1). Então a % b = resto da divisão = 1.',
    decorebaRapida:
      '% = resto da divisão. Pra pegar só o resultado inteiro da divisão (sem casas decimais) usa a barra normal /.',
  },
  {
    id: 3,
    number: 3,
    title: 'Operadores Relacionais e Lógicos',
    category: 'Operadores Lógicos',
    isDiscursive: false,
    question: 'int x = 5, y = 0; → resultado de (x > 0) && (y > 0)?',
    correctAnswerSummary: 'B — 0 (falso)',
    porQue:
      'O && é o "E lógico": só dá verdadeiro (1) se as DUAS condições forem verdadeiras. (x > 0) é verdadeiro, porque 5 > 0. Mas (y > 0) é falso, porque 0 não é maior que 0. Uma falsa já derruba tudo → resultado final é 0 (falso).',
    decorebaRapida:
      '&& = E (as duas precisam ser verdadeiras) | || = OU (uma já basta) | ! = NÃO (inverte).',
  },
  {
    id: 4,
    number: 4,
    title: 'Estruturas Condicionais (if / else if / else)',
    category: 'Controle de Fluxo',
    isDiscursive: false,
    question:
      'int nota = 7; if (nota >= 9) "A"; else if (nota >= 7) "B"; else "C"; → saída?',
    correctAnswerSummary: 'B — B',
    porQue:
      'O C testa as condições na ordem, de cima pra baixo, e para na primeira que for verdadeira. nota >= 9 → 7 >= 9 é falso, passa pra próxima. nota >= 7 → 7 >= 7 é verdadeiro, então imprime "B" e para por aí (não testa o else).',
    decorebaRapida:
      'Assim que uma condição bate, o resto da cadeia if/else if/else é ignorado.',
  },
  {
    id: 5,
    number: 5,
    title: 'switch-case e break',
    category: 'Controle de Fluxo',
    isDiscursive: false,
    question: 'Pra que serve o break dentro de cada case?',
    correctAnswerSummary:
      'C — Evita que a execução continue pro próximo case (fall-through)',
    porQue:
      'Sem o break, o C continua executando os cases seguintes mesmo depois de já ter achado o case certo — isso se chama "fall-through" (cair pro de baixo). O break corta essa sequência e sai do switch assim que aquele case termina.',
    decorebaRapida:
      'Regra prática: TODO case (menos às vezes o último) deve terminar com break, ou o switch continua executando os próximos.',
  },
  {
    id: 6,
    number: 6,
    title: 'while x do-while',
    category: 'Laços de Repetição',
    isDiscursive: false,
    question: 'Qual a diferença entre while e do-while?',
    correctAnswerSummary:
      'B — O do-while sempre executa pelo menos uma vez, porque testa a condição DEPOIS',
    porQue:
      'No while, o C testa a condição ANTES de entrar no laço — se já for falsa, o bloco nem roda nenhuma vez. No do-while, o bloco roda primeiro, e só DEPOIS testa a condição — então ele garante rodar pelo menos 1 vez, mesmo que a condição já comece falsa.',
    decorebaRapida:
      'while → testa antes (pode nunca entrar). do-while → testa depois (entra pelo menos 1 vez).',
  },
  {
    id: 7,
    number: 7,
    title: 'for e continue',
    category: 'Laços de Repetição',
    isDiscursive: false,
    question:
      'for (i=0; i<5; i++) { if (i==3) continue; printf("%d ", i); } → saída?',
    correctAnswerSummary: 'B — 0 1 2 4',
    porQue:
      'O laço passa i de 0 até 4. Quando i chega em 3, o continue pula IMEDIATAMENTE pro próximo giro do laço (i++), sem executar o printf daquela vez. Por isso o 3 nunca é impresso — mas o laço continua rodando normalmente pros valores seguintes (o 4 aparece).',
    decorebaRapida:
      'continue = pula só a volta atual e segue o laço. break = encerra o laço inteiro na hora.',
  },
  {
    id: 8,
    number: 8,
    title: 'Matrizes Bidimensionais',
    category: 'Vetores & Matrizes',
    isDiscursive: false,
    question: 'int matriz[3][2]; → quantos elementos cabem?',
    correctAnswerSummary: 'D — 6',
    porQue:
      'Matriz bidimensional é tipo uma tabela: o primeiro número são as LINHAS, o segundo são as COLUNAS. Aqui são 3 linhas por 2 colunas → 3 x 2 = 6 posições no total.',
    decorebaRapida:
      'int m[LINHAS][COLUNAS]; total de posições = linhas × colunas.',
  },
  {
    id: 9,
    number: 9,
    title: 'Vetor, laço e acumulador (linha a linha)',
    category: 'Discursiva de Código (Vetor)',
    isDiscursive: true,
    question:
      'Um vetor de 10 posições, pedir os 10 valores pro usuário digitar, guardar tudo no vetor, e no final mostrar a soma de todos.',
    correctAnswerSummary:
      'Discursiva: Criação de vetor int vetor[10], acumulador soma = 0, laço for (int i = 0; i < 10; i++), scanf("%d", &vetor[i]) e soma += vetor[i].',
    porQue:
      'Padrão clássico de repetição com acumulador: inicializa a soma com 0 antes do laço, itera pelos 10 elementos (0 a 9), lê cada valor na memória com o operador de endereço & e acumula usando +=.',
    decorebaRapida:
      'Vetor = 1 índice, 1 laço for. Segredo: acumulador começa em 0 antes do laço e soma com +=.',
    fullCode: `#include <stdio.h>

int main(void) {
    int vetor[10], soma = 0;

    for (int i = 0; i < 10; i++) {
        printf("Digite o valor %d: ", i + 1);
        scanf("%d", &vetor[i]);
        soma += vetor[i];
    }

    printf("Soma dos elementos: %d\\n", soma);
}`,
    lineByLineExplanation: [
      {
        code: 'int vetor[10], soma = 0;',
        explanation:
          'Cria o vetor "vetor" com 10 posições (índices de 0 até 9), todas do tipo inteiro. Já cria também a variável "soma" começando em 0 — ela é o ACUMULADOR, vai guardar o total conforme o programa vai somando.',
      },
      {
        code: 'for (int i = 0; i < 10; i++)',
        explanation:
          'O laço roda 10 vezes: i começa em 0, e vai até i = 9 (quando i chega em 10, a condição i < 10 fica falsa e o laço para). Isso bate certinho com as 10 posições do vetor (índices 0 a 9).',
      },
      {
        code: 'printf("Digite o valor %d: ", i + 1);',
        explanation:
          'Só um aviso na tela pro usuário saber qual número está digitando. Usa i+1 pra mostrar "1, 2, 3..." em vez de "0, 1, 2..." (mais natural pra quem tá usando o programa).',
      },
      {
        code: 'scanf("%d", &vetor[i]);',
        explanation:
          'Lê o número digitado e guarda na posição "i" do vetor. O & antes de vetor[i] é o operador de ENDEREÇO — o scanf precisa saber ONDE guardar o valor na memória, não só o valor. Isso é padrão sempre que usa scanf.',
      },
      {
        code: 'soma += vetor[i];',
        explanation:
          'É o mesmo que escrever soma = soma + vetor[i];. A cada volta do laço, pega o valor que acabou de ser digitado e ADICIONA no total acumulado em "soma". Depois das 10 voltas, "soma" tem a soma de tudo.',
      },
      {
        code: 'printf("Soma dos elementos: %d\\n", soma);',
        explanation:
          'Depois que o laço termina (já rodou as 10 vezes), imprime o resultado final acumulado.',
      },
    ],
    centralIdea:
      '"Laço de repetição + acumulador" é um dos padrões mais cobrados em prova. Sempre que pedirem soma/total de vários valores, é: (1) variável começando em 0, (2) um for/while passando por cada posição, (3) somar dentro do laço com +=.',
  },
  {
    id: 10,
    number: 10,
    title: 'Matriz, laços aninhados e diagonal principal (linha a linha)',
    category: 'Discursiva de Código (Matriz)',
    isDiscursive: true,
    question:
      'Uma matriz 3x3, pedir os 9 valores pro usuário preencher, e no final somar só os elementos da DIAGONAL PRINCIPAL.',
    correctAnswerSummary:
      'Discursiva: Criação de matriz int matriz[3][3], acumulador soma = 0, laço for de linhas (i) e colunas (j), leitura com scanf("%d", &matriz[i][j]) e soma += matriz[i][i] fora do for de j mas dentro do de i.',
    porQue:
      'Em uma matriz quadrada (3x3), a diagonal principal corresponde exatamente às posições onde LINHA == COLUNA: [0][0], [1][1] e [2][2]. O índice repetido matriz[i][i] garante capturar apenas esses elementos sem precisar de if.',
    decorebaRapida:
      'Matriz = 2 índices, 2 laços for (aninhados). Diagonal principal é sempre matriz[i][i] fora do for j!',
    fullCode: `#include <stdio.h>

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
}`,
    lineByLineExplanation: [
      {
        code: 'int matriz[3][3], soma = 0;',
        explanation:
          'Cria a matriz 3x3: pensa nela como uma tabela com 3 linhas e 3 colunas, 9 posições no total (matriz[0][0] até matriz[2][2]). "soma" de novo é o acumulador, começa em 0.',
      },
      {
        code: 'for (int i = 0; i < 3; i++) — laço de fora',
        explanation:
          'Esse "i" representa a LINHA da matriz. Vai de 0 até 2 (3 linhas).',
      },
      {
        code: 'for (int j = 0; j < 3; j++) — laço de dentro',
        explanation:
          'Esse "j" representa a COLUNA. Pra cada linha "i" fixa, esse laço interno passa por todas as 3 colunas. Essa é a ideia de LAÇOS ANINHADOS: o de fora fixa a linha, o de dentro percorre coluna por coluna.',
      },
      {
        code: 'scanf("%d", &matriz[i][j]);',
        explanation:
          'Preenche a posição [linha][coluna] atual com o valor digitado. Usa i e j juntos porque uma matriz precisa de DOIS índices pra localizar uma posição.',
      },
      {
        code: 'soma += matriz[i][i];',
        explanation:
          'PULO DO GATO: repare que essa linha usa matriz[i][i] — linha e coluna com o MESMO número. Isso é exatamente a diagonal principal: [0][0], [1][1], [2][2]. E como está FORA do laço de j, só executa 1 vez por linha (3 vezes no total) e não 9 vezes!',
      },
      {
        code: 'printf("Soma da diagonal principal: %d\\n", soma);',
        explanation:
          'Depois dos dois laços terminarem (matriz toda preenchida e diagonal toda somada), mostra o resultado final.',
      },
    ],
    puloDoGato:
      'Numa matriz quadrada (mesmo número de linhas e colunas), a diagonal principal é sempre onde linha == coluna, ou seja, matriz[i][i]. Não precisa de nenhum if pra verificar isso — o próprio índice repetido [i][i] já garante que só pega a diagonal. É por isso que essa soma fica fora do for de "j": ela não depende da coluna variando, só do "i" da linha atual.',
    centralIdea:
      'Resumo geral da lógica das duas questões discursivas: vetor = 1 índice, 1 laço for. Matriz = 2 índices, 2 laços for (um dentro do outro). Em ambas, o "segredo" é sempre: criar o acumulador com valor 0 ANTES do laço, e ir somando (+=) a cada volta.',
  },
];
