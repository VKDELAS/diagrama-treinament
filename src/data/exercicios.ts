import type { Exercise } from '../types';

export const EXERCICIOS: Exercise[] = [
  {
    id: 'ex-01-loja-virtual',
    titulo: '01-loja-virtual.uml',
    categoria: 'E-commerce',
    enunciado:
      'Em uma loja virtual, o Cliente interage com o sistema para Realizar Pedido. Ao realizar o pedido, o sistema obrigatoriamente deve Validar Estoque para garantir a disponibilidade dos produtos. Além disso, se o cliente possuir um código promocional válido, ele pode opcionalmente Aplicar Cupom de Desconto.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Realizar Pedido', 'Validar Estoque', 'Aplicar Cupom de Desconto'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-ped', tipo: 'casoDeUso', label: 'Realizar Pedido' },
        { id: 'g-est', tipo: 'casoDeUso', label: 'Validar Estoque' },
        { id: 'g-cup', tipo: 'casoDeUso', label: 'Aplicar Cupom de Desconto' },
      ],
      edges: [
        { source: 'Cliente', target: 'Realizar Pedido', tipo: 'associacao' },
        { source: 'Realizar Pedido', target: 'Validar Estoque', tipo: 'include' },
        { source: 'Aplicar Cupom de Desconto', target: 'Realizar Pedido', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-02-biblioteca',
    titulo: '02-biblioteca.uml',
    categoria: 'Acadêmico',
    enunciado:
      'Na biblioteca universitária, o Aluno pode Emprestar Livro. Toda vez que um empréstimo é realizado, o sistema é obrigado a Registrar Prazo de Devolução. Caso o aluno possua débitos ou multas não pagas, o sistema deve Bloquear Empréstimo. Separadamente, o Bibliotecário interage para Consultar Acervo.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Aluno', 'Bibliotecário'],
      casosDeUso: ['Emprestar Livro', 'Registrar Prazo de Devolução', 'Bloquear Empréstimo', 'Consultar Acervo'],
    },
    gabarito: {
      nodes: [
        { id: 'g-alu', tipo: 'ator', label: 'Aluno' },
        { id: 'g-bib', tipo: 'ator', label: 'Bibliotecário' },
        { id: 'g-emp', tipo: 'casoDeUso', label: 'Emprestar Livro' },
        { id: 'g-prz', tipo: 'casoDeUso', label: 'Registrar Prazo de Devolução' },
        { id: 'g-blo', tipo: 'casoDeUso', label: 'Bloquear Empréstimo' },
        { id: 'g-con', tipo: 'casoDeUso', label: 'Consultar Acervo' },
      ],
      edges: [
        { source: 'Aluno', target: 'Emprestar Livro', tipo: 'associacao' },
        { source: 'Bibliotecário', target: 'Consultar Acervo', tipo: 'associacao' },
        { source: 'Emprestar Livro', target: 'Registrar Prazo de Devolução', tipo: 'include' },
        { source: 'Bloquear Empréstimo', target: 'Emprestar Livro', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-03-pix-bancario',
    titulo: '03-pix-bancario.uml',
    categoria: 'Bancário / Fintech',
    enunciado:
      'No aplicativo bancário, o Correntista realiza a ação de Transferir via PIX. Para que qualquer transferência seja enviada, o sistema exige obrigatoriamente Autenticar Biometria. Caso a transferência seja efetuada no período noturno com valor elevado, o sistema pode Acionar Limite Noturno.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Correntista'],
      casosDeUso: ['Transferir via PIX', 'Autenticar Biometria', 'Acionar Limite Noturno'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cor', tipo: 'ator', label: 'Correntista' },
        { id: 'g-pix', tipo: 'casoDeUso', label: 'Transferir via PIX' },
        { id: 'g-bio', tipo: 'casoDeUso', label: 'Autenticar Biometria' },
        { id: 'g-lim', tipo: 'casoDeUso', label: 'Acionar Limite Noturno' },
      ],
      edges: [
        { source: 'Correntista', target: 'Transferir via PIX', tipo: 'associacao' },
        { source: 'Transferir via PIX', target: 'Autenticar Biometria', tipo: 'include' },
        { source: 'Acionar Limite Noturno', target: 'Transferir via PIX', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-04-consulta-medica',
    titulo: '04-consulta-medica.uml',
    categoria: 'Saúde',
    enunciado:
      'No portal da clínica, o Paciente pode Agendar Consulta. Sempre que uma consulta é agendada, o sistema obrigatoriamente deve Verificar Disponibilidade de Horário do médico. Se o paciente possuir convênio médico credenciado, ele pode opcionalmente Validar Convênio.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Paciente'],
      casosDeUso: ['Agendar Consulta', 'Verificar Disponibilidade de Horário', 'Validar Convênio'],
    },
    gabarito: {
      nodes: [
        { id: 'g-pac', tipo: 'ator', label: 'Paciente' },
        { id: 'g-agd', tipo: 'casoDeUso', label: 'Agendar Consulta' },
        { id: 'g-hor', tipo: 'casoDeUso', label: 'Verificar Disponibilidade de Horário' },
        { id: 'g-cnv', tipo: 'casoDeUso', label: 'Validar Convênio' },
      ],
      edges: [
        { source: 'Paciente', target: 'Agendar Consulta', tipo: 'associacao' },
        { source: 'Agendar Consulta', target: 'Verificar Disponibilidade de Horário', tipo: 'include' },
        { source: 'Validar Convênio', target: 'Agendar Consulta', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-05-app-corrida',
    titulo: '05-app-corrida.uml',
    categoria: 'Mobilidade',
    enunciado:
      'No aplicativo de mobilidade urbana, o Passageiro pode Solicitar Corrida. Toda solicitação de corrida obrigatoriamente exige Calcular Rota e Tarifa. Caso o passageiro deseje, ele pode opcionalmente Adicionar Parada Intermediária durante a solicitação.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Passageiro'],
      casosDeUso: ['Solicitar Corrida', 'Calcular Rota e Tarifa', 'Adicionar Parada Intermediária'],
    },
    gabarito: {
      nodes: [
        { id: 'g-pas', tipo: 'ator', label: 'Passageiro' },
        { id: 'g-sol', tipo: 'casoDeUso', label: 'Solicitar Corrida' },
        { id: 'g-rot', tipo: 'casoDeUso', label: 'Calcular Rota e Tarifa' },
        { id: 'g-par', tipo: 'casoDeUso', label: 'Adicionar Parada Intermediária' },
      ],
      edges: [
        { source: 'Passageiro', target: 'Solicitar Corrida', tipo: 'associacao' },
        { source: 'Solicitar Corrida', target: 'Calcular Rota e Tarifa', tipo: 'include' },
        { source: 'Adicionar Parada Intermediária', target: 'Solicitar Corrida', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-06-caixa-eletronico',
    titulo: '06-caixa-eletronico.uml',
    categoria: 'Bancário',
    enunciado:
      'No terminal de autoatendimento, o Cliente pode Sacar Dinheiro. Todo saque obrigatoriamente executa Verificar Saldo em Conta. Caso o cliente solicite, o sistema pode opcionalmente Imprimir Comprovante de Saque.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Sacar Dinheiro', 'Verificar Saldo em Conta', 'Imprimir Comprovante de Saque'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-sac', tipo: 'casoDeUso', label: 'Sacar Dinheiro' },
        { id: 'g-sal', tipo: 'casoDeUso', label: 'Verificar Saldo em Conta' },
        { id: 'g-imp', tipo: 'casoDeUso', label: 'Imprimir Comprovante de Saque' },
      ],
      edges: [
        { source: 'Cliente', target: 'Sacar Dinheiro', tipo: 'associacao' },
        { source: 'Sacar Dinheiro', target: 'Verificar Saldo em Conta', tipo: 'include' },
        { source: 'Imprimir Comprovante de Saque', target: 'Sacar Dinheiro', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-07-streaming-video',
    titulo: '07-streaming-video.uml',
    categoria: 'Entretenimento',
    enunciado:
      'Na plataforma de streaming, o Assinante interage para Reproduzir Filme. Para qualquer reprodução iniciar, o sistema obrigatoriamente deve Checar Assinatura Ativa. Caso o filme possua áudio estrangeiro, o assinante pode opcionalmente Ativar Legendas.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Assinante'],
      casosDeUso: ['Reproduzir Filme', 'Checar Assinatura Ativa', 'Ativar Legendas'],
    },
    gabarito: {
      nodes: [
        { id: 'g-ass', tipo: 'ator', label: 'Assinante' },
        { id: 'g-rep', tipo: 'casoDeUso', label: 'Reproduzir Filme' },
        { id: 'g-chk', tipo: 'casoDeUso', label: 'Checar Assinatura Ativa' },
        { id: 'g-leg', tipo: 'casoDeUso', label: 'Ativar Legendas' },
      ],
      edges: [
        { source: 'Assinante', target: 'Reproduzir Filme', tipo: 'associacao' },
        { source: 'Reproduzir Filme', target: 'Checar Assinatura Ativa', tipo: 'include' },
        { source: 'Ativar Legendas', target: 'Reproduzir Filme', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-08-matricula-faculdade',
    titulo: '08-matricula-faculdade.uml',
    categoria: 'Acadêmico',
    enunciado:
      'No portal acadêmico, o Aluno realiza a Matrícula em Disciplina. Para efetivar a matrícula, o sistema é obrigado a Validar Pré-Requisitos. Caso a turma já esteja lotada, o sistema pode Colocar em Fila de Espera.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Aluno'],
      casosDeUso: ['Matrícula em Disciplina', 'Validar Pré-Requisitos', 'Colocar em Fila de Espera'],
    },
    gabarito: {
      nodes: [
        { id: 'g-alu', tipo: 'ator', label: 'Aluno' },
        { id: 'g-mat', tipo: 'casoDeUso', label: 'Matrícula em Disciplina' },
        { id: 'g-pre', tipo: 'casoDeUso', label: 'Validar Pré-Requisitos' },
        { id: 'g-fil', tipo: 'casoDeUso', label: 'Colocar em Fila de Espera' },
      ],
      edges: [
        { source: 'Aluno', target: 'Matrícula em Disciplina', tipo: 'associacao' },
        { source: 'Matrícula em Disciplina', target: 'Validar Pré-Requisitos', tipo: 'include' },
        { source: 'Colocar em Fila de Espera', target: 'Matrícula em Disciplina', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-09-cinema-ingressos',
    titulo: '09-cinema-ingressos.uml',
    categoria: 'Entretenimento',
    enunciado:
      'No site do cinema, o Cliente pode Comprar Ingresso. Toda compra obrigatoriamente exige Escolher Assentos na sala. Se o cliente for estudante ou idoso, ele pode opcionalmente Aplicar Meia-Entrada.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Comprar Ingresso', 'Escolher Assentos', 'Aplicar Meia-Entrada'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-cmp', tipo: 'casoDeUso', label: 'Comprar Ingresso' },
        { id: 'g-ass', tipo: 'casoDeUso', label: 'Escolher Assentos' },
        { id: 'g-mei', tipo: 'casoDeUso', label: 'Aplicar Meia-Entrada' },
      ],
      edges: [
        { source: 'Cliente', target: 'Comprar Ingresso', tipo: 'associacao' },
        { source: 'Comprar Ingresso', target: 'Escolher Assentos', tipo: 'include' },
        { source: 'Aplicar Meia-Entrada', target: 'Comprar Ingresso', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-10-delivery-comida',
    titulo: '10-delivery-comida.uml',
    categoria: 'Gastronomia',
    enunciado:
      'No aplicativo de comida, o Cliente pode Fazer Pedido de Comida. Toda vez que faz um pedido, o sistema obrigatoriamente deve Processar Pagamento Online. Se o cliente tiver restrições alimentares, ele pode opcionalmente Informar Observações de Preparo.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Fazer Pedido de Comida', 'Processar Pagamento Online', 'Informar Observações de Preparo'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-ped', tipo: 'casoDeUso', label: 'Fazer Pedido de Comida' },
        { id: 'g-pag', tipo: 'casoDeUso', label: 'Processar Pagamento Online' },
        { id: 'g-obs', tipo: 'casoDeUso', label: 'Informar Observações de Preparo' },
      ],
      edges: [
        { source: 'Cliente', target: 'Fazer Pedido de Comida', tipo: 'associacao' },
        { source: 'Fazer Pedido de Comida', target: 'Processar Pagamento Online', tipo: 'include' },
        { source: 'Informar Observações de Preparo', target: 'Fazer Pedido de Comida', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-11-triagem-hospital',
    titulo: '11-triagem-hospital.uml',
    categoria: 'Saúde',
    enunciado:
      'No hospital público, o Enfermeiro realiza a Triagem do Paciente. Toda triagem obrigatoriamente exige Coletar Sinais Vitais (pressão, saturação, temperatura). Se os sinais vitais indicarem risco iminente de morte, o sistema deve Acionar Alerta Vermelho de Emergência.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Enfermeiro'],
      casosDeUso: ['Triagem do Paciente', 'Coletar Sinais Vitais', 'Acionar Alerta Vermelho de Emergência'],
    },
    gabarito: {
      nodes: [
        { id: 'g-enf', tipo: 'ator', label: 'Enfermeiro' },
        { id: 'g-tri', tipo: 'casoDeUso', label: 'Triagem do Paciente' },
        { id: 'g-sin', tipo: 'casoDeUso', label: 'Coletar Sinais Vitais' },
        { id: 'g-ale', tipo: 'casoDeUso', label: 'Acionar Alerta Vermelho de Emergência' },
      ],
      edges: [
        { source: 'Enfermeiro', target: 'Triagem do Paciente', tipo: 'associacao' },
        { source: 'Triagem do Paciente', target: 'Coletar Sinais Vitais', tipo: 'include' },
        { source: 'Acionar Alerta Vermelho de Emergência', target: 'Triagem do Paciente', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-12-locadora-carros',
    titulo: '12-locadora-carros.uml',
    categoria: 'Mobilidade',
    enunciado:
      'Na locadora de veículos, o Locatário pode Alugar Carro. Toda locação exige obrigatoriamente Verificar CNH Válida do condutor. Caso o locatário deseje tranquilidade adicional, ele pode opcionalmente Contratar Seguro Completo.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Locatário'],
      casosDeUso: ['Alugar Carro', 'Verificar CNH Válida', 'Contratar Seguro Completo'],
    },
    gabarito: {
      nodes: [
        { id: 'g-loc', tipo: 'ator', label: 'Locatário' },
        { id: 'g-alu', tipo: 'casoDeUso', label: 'Alugar Carro' },
        { id: 'g-cnh', tipo: 'casoDeUso', label: 'Verificar CNH Válida' },
        { id: 'g-seg', tipo: 'casoDeUso', label: 'Contratar Seguro Completo' },
      ],
      edges: [
        { source: 'Locatário', target: 'Alugar Carro', tipo: 'associacao' },
        { source: 'Alugar Carro', target: 'Verificar CNH Válida', tipo: 'include' },
        { source: 'Contratar Seguro Completo', target: 'Alugar Carro', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-13-aeroporto-checkin',
    titulo: '13-aeroporto-checkin.uml',
    categoria: 'Aviação',
    enunciado:
      'No totem da companhia aérea, o Passageiro realiza Realizar Check-in de Voo. Para concluir o check-in, o sistema obrigatoriamente deve Emitir Cartão de Embarque. Caso o passageiro possua malas grandes, ele pode Despachar Bagagem.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Passageiro'],
      casosDeUso: ['Realizar Check-in de Voo', 'Emitir Cartão de Embarque', 'Despachar Bagagem'],
    },
    gabarito: {
      nodes: [
        { id: 'g-pas', tipo: 'ator', label: 'Passageiro' },
        { id: 'g-chk', tipo: 'casoDeUso', label: 'Realizar Check-in de Voo' },
        { id: 'g-emb', tipo: 'casoDeUso', label: 'Emitir Cartão de Embarque' },
        { id: 'g-bag', tipo: 'casoDeUso', label: 'Despachar Bagagem' },
      ],
      edges: [
        { source: 'Passageiro', target: 'Realizar Check-in de Voo', tipo: 'associacao' },
        { source: 'Realizar Check-in de Voo', target: 'Emitir Cartão de Embarque', tipo: 'include' },
        { source: 'Despachar Bagagem', target: 'Realizar Check-in de Voo', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-14-ponto-eletronico',
    titulo: '14-ponto-eletronico.uml',
    categoria: 'RH / Corporativo',
    enunciado:
      'Na empresa, o Funcionário realiza a ação de Bater Ponto. Toda batida de ponto obrigatoriamente exige Registrar Geolocalização e Horário. Caso o funcionário chegue atrasado sem justificativa prévia, o sistema pode Gerar Alerta de Atraso.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Funcionário'],
      casosDeUso: ['Bater Ponto', 'Registrar Geolocalização e Horário', 'Gerar Alerta de Atraso'],
    },
    gabarito: {
      nodes: [
        { id: 'g-fun', tipo: 'ator', label: 'Funcionário' },
        { id: 'g-pon', tipo: 'casoDeUso', label: 'Bater Ponto' },
        { id: 'g-geo', tipo: 'casoDeUso', label: 'Registrar Geolocalização e Horário' },
        { id: 'g-atr', tipo: 'casoDeUso', label: 'Gerar Alerta de Atraso' },
      ],
      edges: [
        { source: 'Funcionário', target: 'Bater Ponto', tipo: 'associacao' },
        { source: 'Bater Ponto', target: 'Registrar Geolocalização e Horário', tipo: 'include' },
        { source: 'Gerar Alerta de Atraso', target: 'Bater Ponto', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-15-hotel-reserva',
    titulo: '15-hotel-reserva.uml',
    categoria: 'Hotelaria',
    enunciado:
      'No site do hotel, o Hóspede interage para Reservar Quarto. Para concluir a reserva, o sistema é obrigado a Validar Disponibilidade de Vaga. Se o hóspede desejar comodidade, ele pode opcionalmente Incluir Café da Manhã.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Hóspede'],
      casosDeUso: ['Reservar Quarto', 'Validar Disponibilidade de Vaga', 'Incluir Café da Manhã'],
    },
    gabarito: {
      nodes: [
        { id: 'g-hos', tipo: 'ator', label: 'Hóspede' },
        { id: 'g-res', tipo: 'casoDeUso', label: 'Reservar Quarto' },
        { id: 'g-vag', tipo: 'casoDeUso', label: 'Validar Disponibilidade de Vaga' },
        { id: 'g-caf', tipo: 'casoDeUso', label: 'Incluir Café da Manhã' },
      ],
      edges: [
        { source: 'Hóspede', target: 'Reservar Quarto', tipo: 'associacao' },
        { source: 'Reservar Quarto', target: 'Validar Disponibilidade de Vaga', tipo: 'include' },
        { source: 'Incluir Café da Manhã', target: 'Reservar Quarto', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-16-academia-treino',
    titulo: '16-academia-treino.uml',
    categoria: 'Fitness',
    enunciado:
      'Na academia, o Aluno pode Realizar Check-in de Treino. Todo check-in obrigatoriamente deve Verificar Mensalidade em Dia. Caso o aluno solicite auxílio para montar nova ficha, ele pode Agendar Avaliação Física.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Aluno'],
      casosDeUso: ['Realizar Check-in de Treino', 'Verificar Mensalidade em Dia', 'Agendar Avaliação Física'],
    },
    gabarito: {
      nodes: [
        { id: 'g-alu', tipo: 'ator', label: 'Aluno' },
        { id: 'g-chk', tipo: 'casoDeUso', label: 'Realizar Check-in de Treino' },
        { id: 'g-men', tipo: 'casoDeUso', label: 'Verificar Mensalidade em Dia' },
        { id: 'g-ava', tipo: 'casoDeUso', label: 'Agendar Avaliação Física' },
      ],
      edges: [
        { source: 'Aluno', target: 'Realizar Check-in de Treino', tipo: 'associacao' },
        { source: 'Realizar Check-in de Treino', target: 'Verificar Mensalidade em Dia', tipo: 'include' },
        { source: 'Agendar Avaliação Física', target: 'Realizar Check-in de Treino', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-17-certificado-online',
    titulo: '17-certificado-online.uml',
    categoria: 'Educação',
    enunciado:
      'Na plataforma de cursos EAD, o Estudante pode Emitir Certificado. Para a emissão ocorrer, o sistema obrigatoriamente deve Validar Nota Mínima e Frequência. Caso o estudante queira, ele pode opcionalmente Compartilhar no LinkedIn.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Estudante'],
      casosDeUso: ['Emitir Certificado', 'Validar Nota Mínima e Frequência', 'Compartilhar no LinkedIn'],
    },
    gabarito: {
      nodes: [
        { id: 'g-est', tipo: 'ator', label: 'Estudante' },
        { id: 'g-emi', tipo: 'casoDeUso', label: 'Emitir Certificado' },
        { id: 'g-val', tipo: 'casoDeUso', label: 'Validar Nota Mínima e Frequência' },
        { id: 'g-lin', tipo: 'casoDeUso', label: 'Compartilhar no LinkedIn' },
      ],
      edges: [
        { source: 'Estudante', target: 'Emitir Certificado', tipo: 'associacao' },
        { source: 'Emitir Certificado', target: 'Validar Nota Mínima e Frequência', tipo: 'include' },
        { source: 'Compartilhar no LinkedIn', target: 'Emitir Certificado', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-18-detran-cnh',
    titulo: '18-detran-cnh.uml',
    categoria: 'Serviço Público',
    enunciado:
      'No portal do Detran, o Cidadão pode Renovar CNH. A renovação obrigatoriamente inclui Agendar Exame Médico. Caso o cidadão exerça atividade remunerada com o veículo, ele deve Realizar Avaliação Psicotécnica.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cidadão'],
      casosDeUso: ['Renovar CNH', 'Agendar Exame Médico', 'Realizar Avaliação Psicotécnica'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cid', tipo: 'ator', label: 'Cidadão' },
        { id: 'g-ren', tipo: 'casoDeUso', label: 'Renovar CNH' },
        { id: 'g-med', tipo: 'casoDeUso', label: 'Agendar Exame Médico' },
        { id: 'g-psi', tipo: 'casoDeUso', label: 'Realizar Avaliação Psicotécnica' },
      ],
      edges: [
        { source: 'Cidadão', target: 'Renovar CNH', tipo: 'associacao' },
        { source: 'Renovar CNH', target: 'Agendar Exame Médico', tipo: 'include' },
        { source: 'Realizar Avaliação Psicotécnica', target: 'Renovar CNH', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-19-cartao-credito',
    titulo: '19-cartao-credito.uml',
    categoria: 'Fintech',
    enunciado:
      'Na maquininha de pagamento, o Comprador realiza a ação de Pagar com Cartão. Toda transação obrigatoriamente deve Consultar Limite Disponível. Caso o valor seja superior a R$ 200, o sistema pode Exigir Senha de 4 Dígitos.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Comprador'],
      casosDeUso: ['Pagar com Cartão', 'Consultar Limite Disponível', 'Exigir Senha de 4 Dígitos'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cmp', tipo: 'ator', label: 'Comprador' },
        { id: 'g-pag', tipo: 'casoDeUso', label: 'Pagar com Cartão' },
        { id: 'g-lim', tipo: 'casoDeUso', label: 'Consultar Limite Disponível' },
        { id: 'g-sen', tipo: 'casoDeUso', label: 'Exigir Senha de 4 Dígitos' },
      ],
      edges: [
        { source: 'Comprador', target: 'Pagar com Cartão', tipo: 'associacao' },
        { source: 'Pagar com Cartão', target: 'Consultar Limite Disponível', tipo: 'include' },
        { source: 'Exigir Senha de 4 Dígitos', target: 'Pagar com Cartão', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-20-login-seguranca',
    titulo: '20-login-seguranca.uml',
    categoria: 'Segurança',
    enunciado:
      'No sistema corporativo, o Usuário realiza a ação de Efetuar Login. Para efetuar login, o sistema obrigatoriamente deve Verificar Credenciais (email e senha). Se o acesso for realizado de um dispositivo desconhecido, o sistema pode Solicitar Token 2FA.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Usuário'],
      casosDeUso: ['Efetuar Login', 'Verificar Credenciais', 'Solicitar Token 2FA'],
    },
    gabarito: {
      nodes: [
        { id: 'g-usu', tipo: 'ator', label: 'Usuário' },
        { id: 'g-log', tipo: 'casoDeUso', label: 'Efetuar Login' },
        { id: 'g-cre', tipo: 'casoDeUso', label: 'Verificar Credenciais' },
        { id: 'g-tok', tipo: 'casoDeUso', label: 'Solicitar Token 2FA' },
      ],
      edges: [
        { source: 'Usuário', target: 'Efetuar Login', tipo: 'associacao' },
        { source: 'Efetuar Login', target: 'Verificar Credenciais', tipo: 'include' },
        { source: 'Solicitar Token 2FA', target: 'Efetuar Login', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-21-oficina-mecanica',
    titulo: '21-oficina-mecanica.uml',
    categoria: 'Serviços',
    enunciado:
      'Na oficina, o Mecânico pode Criar Ordem de Serviço. Toda ordem de serviço obrigatoriamente exige Inspecionar Veículo. Caso sejam encontradas peças desgastadas, o mecânico pode Solicitar Compra de Peças.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Mecânico'],
      casosDeUso: ['Criar Ordem de Serviço', 'Inspecionar Veículo', 'Solicitar Compra de Peças'],
    },
    gabarito: {
      nodes: [
        { id: 'g-mec', tipo: 'ator', label: 'Mecânico' },
        { id: 'g-os', tipo: 'casoDeUso', label: 'Criar Ordem de Serviço' },
        { id: 'g-ins', tipo: 'casoDeUso', label: 'Inspecionar Veículo' },
        { id: 'g-pec', tipo: 'casoDeUso', label: 'Solicitar Compra de Peças' },
      ],
      edges: [
        { source: 'Mecânico', target: 'Criar Ordem de Serviço', tipo: 'associacao' },
        { source: 'Criar Ordem de Serviço', target: 'Inspecionar Veículo', tipo: 'include' },
        { source: 'Solicitar Compra de Peças', target: 'Criar Ordem de Serviço', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-22-helpdesk-suporte',
    titulo: '22-helpdesk-suporte.uml',
    categoria: 'TI / Helpdesk',
    enunciado:
      'No sistema de TI, o Usuário pode Abrir Chamado de Suporte. A abertura de chamado obrigatoriamente exige Descrever Problema e Categoria. Caso o sistema afetado seja de missão crítica para a empresa, o usuário pode Marcar Alta Prioridade.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Usuário'],
      casosDeUso: ['Abrir Chamado de Suporte', 'Descrever Problema e Categoria', 'Marcar Alta Prioridade'],
    },
    gabarito: {
      nodes: [
        { id: 'g-usu', tipo: 'ator', label: 'Usuário' },
        { id: 'g-cha', tipo: 'casoDeUso', label: 'Abrir Chamado de Suporte' },
        { id: 'g-des', tipo: 'casoDeUso', label: 'Descrever Problema e Categoria' },
        { id: 'g-pri', tipo: 'casoDeUso', label: 'Marcar Alta Prioridade' },
      ],
      edges: [
        { source: 'Usuário', target: 'Abrir Chamado de Suporte', tipo: 'associacao' },
        { source: 'Abrir Chamado de Suporte', target: 'Descrever Problema e Categoria', tipo: 'include' },
        { source: 'Marcar Alta Prioridade', target: 'Abrir Chamado de Suporte', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-23-leilao-virtual',
    titulo: '23-leilao-virtual.uml',
    categoria: 'E-commerce',
    enunciado:
      'No site de leilões, o Licitante pode Dar Lance em Lote. Para aceitar o lance, o sistema é obrigado a Validar Lance Mínimo e Saldo. Caso o licitante seja superado nos últimos 30 segundos, o sistema pode Prorrogar Cronômetro.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Licitante'],
      casosDeUso: ['Dar Lance em Lote', 'Validar Lance Mínimo e Saldo', 'Prorrogar Cronômetro'],
    },
    gabarito: {
      nodes: [
        { id: 'g-lic', tipo: 'ator', label: 'Licitante' },
        { id: 'g-lan', tipo: 'casoDeUso', label: 'Dar Lance em Lote' },
        { id: 'g-val', tipo: 'casoDeUso', label: 'Validar Lance Mínimo e Saldo' },
        { id: 'g-pro', tipo: 'casoDeUso', label: 'Prorrogar Cronômetro' },
      ],
      edges: [
        { source: 'Licitante', target: 'Dar Lance em Lote', tipo: 'associacao' },
        { source: 'Dar Lance em Lote', target: 'Validar Lance Mínimo e Saldo', tipo: 'include' },
        { source: 'Prorrogar Cronômetro', target: 'Dar Lance em Lote', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-24-estacionamento-rotativo',
    titulo: '24-estacionamento-rotativo.uml',
    categoria: 'Mobilidade',
    enunciado:
      'No shopping, o Motorista interage com a cancela para Retirar Ticket de Estacionamento. Toda retirada obrigatoriamente deve Ler Placa do Veículo via câmera. Caso o pátio atinja capacidade máxima, o sistema pode Emitir Sinal de Lotação.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Motorista'],
      casosDeUso: ['Retirar Ticket de Estacionamento', 'Ler Placa do Veículo', 'Emitir Sinal de Lotação'],
    },
    gabarito: {
      nodes: [
        { id: 'g-mot', tipo: 'ator', label: 'Motorista' },
        { id: 'g-tic', tipo: 'casoDeUso', label: 'Retirar Ticket de Estacionamento' },
        { id: 'g-pla', tipo: 'casoDeUso', label: 'Ler Placa do Veículo' },
        { id: 'g-lot', tipo: 'casoDeUso', label: 'Emitir Sinal de Lotação' },
      ],
      edges: [
        { source: 'Motorista', target: 'Retirar Ticket de Estacionamento', tipo: 'associacao' },
        { source: 'Retirar Ticket de Estacionamento', target: 'Ler Placa do Veículo', tipo: 'include' },
        { source: 'Emitir Sinal de Lotação', target: 'Retirar Ticket de Estacionamento', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-25-devolucao-produto',
    titulo: '25-devolucao-produto.uml',
    categoria: 'E-commerce',
    enunciado:
      'No portal de pós-venda, o Cliente pode Solicitar Devolução de Produto. Toda devolução obrigatoriamente exige Validar Prazo de 7 Dias do Código de Defesa do Consumidor. Caso o produto já tenha sido postado, o cliente pode Rastrear Pacote Devolvido.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Solicitar Devolução de Produto', 'Validar Prazo de 7 Dias', 'Rastrear Pacote Devolvido'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-dev', tipo: 'casoDeUso', label: 'Solicitar Devolução de Produto' },
        { id: 'g-prz', tipo: 'casoDeUso', label: 'Validar Prazo de 7 Dias' },
        { id: 'g-ras', tipo: 'casoDeUso', label: 'Rastrear Pacote Devolvido' },
      ],
      edges: [
        { source: 'Cliente', target: 'Solicitar Devolução de Produto', tipo: 'associacao' },
        { source: 'Solicitar Devolução de Produto', target: 'Validar Prazo de 7 Dias', tipo: 'include' },
        { source: 'Rastrear Pacote Devolvido', target: 'Solicitar Devolução de Produto', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-26-imposto-renda',
    titulo: '26-imposto-renda.uml',
    categoria: 'Governo',
    enunciado:
      'No programa da Receita Federal, o Contribuinte realiza Transmitir Declaração IRPF. Toda transmissão obrigatoriamente executa Gerar Recibo de Entrega com Hash. Se houver divergência nos informes de rendimentos, o sistema pode Alertar Risco de Malha Fina.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Contribuinte'],
      casosDeUso: ['Transmitir Declaração IRPF', 'Gerar Recibo de Entrega', 'Alertar Risco de Malha Fina'],
    },
    gabarito: {
      nodes: [
        { id: 'g-con', tipo: 'ator', label: 'Contribuinte' },
        { id: 'g-tra', tipo: 'casoDeUso', label: 'Transmitir Declaração IRPF' },
        { id: 'g-rec', tipo: 'casoDeUso', label: 'Gerar Recibo de Entrega' },
        { id: 'g-mal', tipo: 'casoDeUso', label: 'Alertar Risco de Malha Fina' },
      ],
      edges: [
        { source: 'Contribuinte', target: 'Transmitir Declaração IRPF', tipo: 'associacao' },
        { source: 'Transmitir Declaração IRPF', target: 'Gerar Recibo de Entrega', tipo: 'include' },
        { source: 'Alertar Risco de Malha Fina', target: 'Transmitir Declaração IRPF', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-27-barbearia-agendamento',
    titulo: '27-barbearia-agendamento.uml',
    categoria: 'Estética',
    enunciado:
      'No app da barbearia, o Cliente pode Marcar Horário de Corte. O agendamento obrigatoriamente inclui Escolher Barbeiro e Serviço. Se o cliente desejar tratamento vip, ele pode opcionalmente Adicionar Barboterapia.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Marcar Horário de Corte', 'Escolher Barbeiro e Serviço', 'Adicionar Barboterapia'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-mar', tipo: 'casoDeUso', label: 'Marcar Horário de Corte' },
        { id: 'g-bar', tipo: 'casoDeUso', label: 'Escolher Barbeiro e Serviço' },
        { id: 'g-ter', tipo: 'casoDeUso', label: 'Adicionar Barboterapia' },
      ],
      edges: [
        { source: 'Cliente', target: 'Marcar Horário de Corte', tipo: 'associacao' },
        { source: 'Marcar Horário de Corte', target: 'Escolher Barbeiro e Serviço', tipo: 'include' },
        { source: 'Adicionar Barboterapia', target: 'Marcar Horário de Corte', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-28-prontuario-medico',
    titulo: '28-prontuario-medico.uml',
    categoria: 'Saúde',
    enunciado:
      'No consultório, o Médico realiza a ação de Atualizar Prontuário. Toda atualização obrigatoriamente exige Assinar com Certificado Digital CFM. Caso o paciente necessite de medicamentos controlados, o médico pode Emitir Receita Especial.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Médico'],
      casosDeUso: ['Atualizar Prontuário', 'Assinar com Certificado Digital CFM', 'Emitir Receita Especial'],
    },
    gabarito: {
      nodes: [
        { id: 'g-med', tipo: 'ator', label: 'Médico' },
        { id: 'g-pro', tipo: 'casoDeUso', label: 'Atualizar Prontuário' },
        { id: 'g-ass', tipo: 'casoDeUso', label: 'Assinar com Certificado Digital CFM' },
        { id: 'g-rec', tipo: 'casoDeUso', label: 'Emitir Receita Especial' },
      ],
      edges: [
        { source: 'Médico', target: 'Atualizar Prontuário', tipo: 'associacao' },
        { source: 'Atualizar Prontuário', target: 'Assinar com Certificado Digital CFM', tipo: 'include' },
        { source: 'Emitir Receita Especial', target: 'Atualizar Prontuário', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-29-imobiliaria-locacao',
    titulo: '29-imobiliaria-locacao.uml',
    categoria: 'Imobiliário',
    enunciado:
      'Na imobiliária, o Inquilino pode Assinar Contrato de Aluguel. A assinatura obrigatoriamente exige Aprovar Análise de Crédito. Caso o inquilino não possua fiador, ele pode Contratar Seguro Fiança.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Inquilino'],
      casosDeUso: ['Assinar Contrato de Aluguel', 'Aprovar Análise de Crédito', 'Contratar Seguro Fiança'],
    },
    gabarito: {
      nodes: [
        { id: 'g-inq', tipo: 'ator', label: 'Inquilino' },
        { id: 'g-con', tipo: 'casoDeUso', label: 'Assinar Contrato de Aluguel' },
        { id: 'g-cre', tipo: 'casoDeUso', label: 'Aprovar Análise de Crédito' },
        { id: 'g-seg', tipo: 'casoDeUso', label: 'Contratar Seguro Fiança' },
      ],
      edges: [
        { source: 'Inquilino', target: 'Assinar Contrato de Aluguel', tipo: 'associacao' },
        { source: 'Assinar Contrato de Aluguel', target: 'Aprovar Análise de Crédito', tipo: 'include' },
        { source: 'Contratar Seguro Fiança', target: 'Assinar Contrato de Aluguel', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-30-folha-pagamento',
    titulo: '30-folha-pagamento.uml',
    categoria: 'RH',
    enunciado:
      'No setor financeiro, o Analista de RH realiza Processar Folha de Pagamento. Toda folha obrigatoriamente deve Calcular Descontos de INSS e IRRF. Se o funcionário realizou expediente extra no mês, o sistema pode Adicionar Horas Extras.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Analista de RH'],
      casosDeUso: ['Processar Folha de Pagamento', 'Calcular Descontos de INSS e IRRF', 'Adicionar Horas Extras'],
    },
    gabarito: {
      nodes: [
        { id: 'g-rh', tipo: 'ator', label: 'Analista de RH' },
        { id: 'g-fol', tipo: 'casoDeUso', label: 'Processar Folha de Pagamento' },
        { id: 'g-des', tipo: 'casoDeUso', label: 'Calcular Descontos de INSS e IRRF' },
        { id: 'g-hor', tipo: 'casoDeUso', label: 'Adicionar Horas Extras' },
      ],
      edges: [
        { source: 'Analista de RH', target: 'Processar Folha de Pagamento', tipo: 'associacao' },
        { source: 'Processar Folha de Pagamento', target: 'Calcular Descontos de INSS e IRRF', tipo: 'include' },
        { source: 'Adicionar Horas Extras', target: 'Processar Folha de Pagamento', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-31-pedagio-sem-parar',
    titulo: '31-pedagio-sem-parar.uml',
    categoria: 'Rodovias',
    enunciado:
      'Na rodovia pedagiada, o Sistema de Tag realiza Cobrar Passagem no Pedágio. Toda cobrança obrigatoriamente exige Identificar Tag RFID do Veículo. Caso a tag esteja sem saldo ou bloqueada, o sistema pode Fotografar Placa para Multa.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Sistema de Tag'],
      casosDeUso: ['Cobrar Passagem no Pedágio', 'Identificar Tag RFID do Veículo', 'Fotografar Placa para Multa'],
    },
    gabarito: {
      nodes: [
        { id: 'g-tag', tipo: 'ator', label: 'Sistema de Tag' },
        { id: 'g-cob', tipo: 'casoDeUso', label: 'Cobrar Passagem no Pedágio' },
        { id: 'g-rfi', tipo: 'casoDeUso', label: 'Identificar Tag RFID do Veículo' },
        { id: 'g-mul', tipo: 'casoDeUso', label: 'Fotografar Placa para Multa' },
      ],
      edges: [
        { source: 'Sistema de Tag', target: 'Cobrar Passagem no Pedágio', tipo: 'associacao' },
        { source: 'Cobrar Passagem no Pedágio', target: 'Identificar Tag RFID do Veículo', tipo: 'include' },
        { source: 'Fotografar Placa para Multa', target: 'Cobrar Passagem no Pedágio', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-32-conta-digital',
    titulo: '32-conta-digital.uml',
    categoria: 'Fintech',
    enunciado:
      'No app do banco digital, o Novo Cliente pode Abrir Conta Digital. A abertura obrigatoriamente exige Validar Documento com Selfie (Know Your Customer). Caso o cliente comprove renda acima de R$ 10.000, o banco pode Liberar Cartão Black.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Novo Cliente'],
      casosDeUso: ['Abrir Conta Digital', 'Validar Documento com Selfie', 'Liberar Cartão Black'],
    },
    gabarito: {
      nodes: [
        { id: 'g-nov', tipo: 'ator', label: 'Novo Cliente' },
        { id: 'g-abr', tipo: 'casoDeUso', label: 'Abrir Conta Digital' },
        { id: 'g-kyc', tipo: 'casoDeUso', label: 'Validar Documento com Selfie' },
        { id: 'g-bla', tipo: 'casoDeUso', label: 'Liberar Cartão Black' },
      ],
      edges: [
        { source: 'Novo Cliente', target: 'Abrir Conta Digital', tipo: 'associacao' },
        { source: 'Abrir Conta Digital', target: 'Validar Documento com Selfie', tipo: 'include' },
        { source: 'Liberar Cartão Black', target: 'Abrir Conta Digital', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-33-programa-pontos',
    titulo: '33-programa-pontos.uml',
    categoria: 'Varejo',
    enunciado:
      'No programa de milhas, o Associado pode Resgatar Recompensa. Para resgatar, o sistema é obrigado a Deduzir Saldo de Pontos. Caso o associado não tenha milhas suficientes para o item desejado, ele pode Pagar Diferença em Dinheiro.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Associado'],
      casosDeUso: ['Resgatar Recompensa', 'Deduzir Saldo de Pontos', 'Pagar Diferença em Dinheiro'],
    },
    gabarito: {
      nodes: [
        { id: 'g-ass', tipo: 'ator', label: 'Associado' },
        { id: 'g-res', tipo: 'casoDeUso', label: 'Resgatar Recompensa' },
        { id: 'g-ded', tipo: 'casoDeUso', label: 'Deduzir Saldo de Pontos' },
        { id: 'g-dif', tipo: 'casoDeUso', label: 'Pagar Diferença em Dinheiro' },
      ],
      edges: [
        { source: 'Associado', target: 'Resgatar Recompensa', tipo: 'associacao' },
        { source: 'Resgatar Recompensa', target: 'Deduzir Saldo de Pontos', tipo: 'include' },
        { source: 'Pagar Diferença em Dinheiro', target: 'Resgatar Recompensa', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-34-museu-virtual',
    titulo: '34-museu-virtual.uml',
    categoria: 'Cultura',
    enunciado:
      'No tour 3D do museu, o Visitante pode Visualizar Obra de Arte. Toda visualização obrigatoriamente exige Carregar Modelo 3D em Alta Definição. Caso a obra possua áudio explicativo, o visitante pode Reproduzir Audioguia do Curador.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Visitante'],
      casosDeUso: ['Visualizar Obra de Arte', 'Carregar Modelo 3D em Alta Definição', 'Reproduzir Audioguia do Curador'],
    },
    gabarito: {
      nodes: [
        { id: 'g-vis', tipo: 'ator', label: 'Visitante' },
        { id: 'g-obr', tipo: 'casoDeUso', label: 'Visualizar Obra de Arte' },
        { id: 'g-mod', tipo: 'casoDeUso', label: 'Carregar Modelo 3D em Alta Definição' },
        { id: 'g-aud', tipo: 'casoDeUso', label: 'Reproduzir Audioguia do Curador' },
      ],
      edges: [
        { source: 'Visitante', target: 'Visualizar Obra de Arte', tipo: 'associacao' },
        { source: 'Visualizar Obra de Arte', target: 'Carregar Modelo 3D em Alta Definição', tipo: 'include' },
        { source: 'Reproduzir Audioguia do Curador', target: 'Visualizar Obra de Arte', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-35-correios-envio',
    titulo: '35-correios-envio.uml',
    categoria: 'Logística',
    enunciado:
      'Na agência postal, o Remetente realiza a Postagem de Encomenda. Toda postagem obrigatoriamente inclui Pesar e Medir Pacote. Caso o conteúdo seja de alto valor, o remetente pode Declarar Valor com Seguro Postal.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Remetente'],
      casosDeUso: ['Postagem de Encomenda', 'Pesar e Medir Pacote', 'Declarar Valor com Seguro Postal'],
    },
    gabarito: {
      nodes: [
        { id: 'g-rem', tipo: 'ator', label: 'Remetente' },
        { id: 'g-pos', tipo: 'casoDeUso', label: 'Postagem de Encomenda' },
        { id: 'g-pes', tipo: 'casoDeUso', label: 'Pesar e Medir Pacote' },
        { id: 'g-seg', tipo: 'casoDeUso', label: 'Declarar Valor com Seguro Postal' },
      ],
      edges: [
        { source: 'Remetente', target: 'Postagem de Encomenda', tipo: 'associacao' },
        { source: 'Postagem de Encomenda', target: 'Pesar e Medir Pacote', tipo: 'include' },
        { source: 'Declarar Valor com Seguro Postal', target: 'Postagem de Encomenda', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-36-lavanderia-app',
    titulo: '36-lavanderia-app.uml',
    categoria: 'Serviços',
    enunciado:
      'No app da lavanderia, o Cliente pode Solicitar Lavagem de Roupas. A solicitação obrigatoriamente exige Agendar Coleta no Endereço. Caso haja peças delicadas de seda ou lã, o cliente pode Solicitar Lavagem a Seco Especial.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cliente'],
      casosDeUso: ['Solicitar Lavagem de Roupas', 'Agendar Coleta no Endereço', 'Solicitar Lavagem a Seco Especial'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cli', tipo: 'ator', label: 'Cliente' },
        { id: 'g-lav', tipo: 'casoDeUso', label: 'Solicitar Lavagem de Roupas' },
        { id: 'g-col', tipo: 'casoDeUso', label: 'Agendar Coleta no Endereço' },
        { id: 'g-sec', tipo: 'casoDeUso', label: 'Solicitar Lavagem a Seco Especial' },
      ],
      edges: [
        { source: 'Cliente', target: 'Solicitar Lavagem de Roupas', tipo: 'associacao' },
        { source: 'Solicitar Lavagem de Roupas', target: 'Agendar Coleta no Endereço', tipo: 'include' },
        { source: 'Solicitar Lavagem a Seco Especial', target: 'Solicitar Lavagem de Roupas', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-37-adocao-pet',
    titulo: '37-adocao-pet.uml',
    categoria: 'Causas / Pets',
    enunciado:
      'No portal da ONG animal, o Adotante pode Candidatar-se à Adoção de Pet. Toda candidatura obrigatoriamente exige Preencher Termo de Posse Responsável. Caso o adotante more em apartamento, a ONG pode Exigir Vistoria de Telas de Proteção.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Adotante'],
      casosDeUso: ['Candidatar-se à Adoção de Pet', 'Preencher Termo de Posse Responsável', 'Exigir Vistoria de Telas de Proteção'],
    },
    gabarito: {
      nodes: [
        { id: 'g-ado', tipo: 'ator', label: 'Adotante' },
        { id: 'g-can', tipo: 'casoDeUso', label: 'Candidatar-se à Adoção de Pet' },
        { id: 'g-ter', tipo: 'casoDeUso', label: 'Preencher Termo de Posse Responsável' },
        { id: 'g-vis', tipo: 'casoDeUso', label: 'Exigir Vistoria de Telas de Proteção' },
      ],
      edges: [
        { source: 'Adotante', target: 'Candidatar-se à Adoção de Pet', tipo: 'associacao' },
        { source: 'Candidatar-se à Adoção de Pet', target: 'Preencher Termo de Posse Responsável', tipo: 'include' },
        { source: 'Exigir Vistoria de Telas de Proteção', target: 'Candidatar-se à Adoção de Pet', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-38-reembolso-empresa',
    titulo: '38-reembolso-empresa.uml',
    categoria: 'Corporativo',
    enunciado:
      'No ERP corporativo, o Colaborador realiza Solicitar Reembolso de Despesas. Toda solicitação obrigatoriamente deve Anexar Comprovante Fiscal Digital. Se o valor total ultrapassar o teto da política interna, o sistema deve Encaminhar para Aprovação da Diretoria.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Colaborador'],
      casosDeUso: ['Solicitar Reembolso de Despesas', 'Anexar Comprovante Fiscal Digital', 'Encaminhar para Aprovação da Diretoria'],
    },
    gabarito: {
      nodes: [
        { id: 'g-col', tipo: 'ator', label: 'Colaborador' },
        { id: 'g-ree', tipo: 'casoDeUso', label: 'Solicitar Reembolso de Despesas' },
        { id: 'g-com', tipo: 'casoDeUso', label: 'Anexar Comprovante Fiscal Digital' },
        { id: 'g-dir', tipo: 'casoDeUso', label: 'Encaminhar para Aprovação da Diretoria' },
      ],
      edges: [
        { source: 'Colaborador', target: 'Solicitar Reembolso de Despesas', tipo: 'associacao' },
        { source: 'Solicitar Reembolso de Despesas', target: 'Anexar Comprovante Fiscal Digital', tipo: 'include' },
        { source: 'Encaminhar para Aprovação da Diretoria', target: 'Solicitar Reembolso de Despesas', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-39-frequencia-escolar',
    titulo: '39-frequencia-escolar.uml',
    categoria: 'Educação',
    enunciado:
      'No diário eletrônico, o Professor realiza Lançar Frequência da Aula. Todo lançamento de frequência obrigatoriamente deve Contabilizar Presenças e Faltas. Caso o estudante atinja 25% de faltas no semestre, o sistema deve Disparar Alerta de Risco de Reprovação.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Professor'],
      casosDeUso: ['Lançar Frequência da Aula', 'Contabilizar Presenças e Faltas', 'Disparar Alerta de Risco de Reprovação'],
    },
    gabarito: {
      nodes: [
        { id: 'g-pro', tipo: 'ator', label: 'Professor' },
        { id: 'g-fre', tipo: 'casoDeUso', label: 'Lançar Frequência da Aula' },
        { id: 'g-con', tipo: 'casoDeUso', label: 'Contabilizar Presenças e Faltas' },
        { id: 'g-rep', tipo: 'casoDeUso', label: 'Disparar Alerta de Risco de Reprovação' },
      ],
      edges: [
        { source: 'Professor', target: 'Lançar Frequência da Aula', tipo: 'associacao' },
        { source: 'Lançar Frequência da Aula', target: 'Contabilizar Presenças e Faltas', tipo: 'include' },
        { source: 'Disparar Alerta de Risco de Reprovação', target: 'Lançar Frequência da Aula', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-40-bilhete-transporte',
    titulo: '40-bilhete-transporte.uml',
    categoria: 'Mobilidade',
    enunciado:
      'Na catraca do metrô, o Passageiro pode Passar Cartão de Transporte. Toda validação obrigatoriamente deve Debitar Tarifa do Saldo. Caso a passagem ocorra dentro da janela de integração de 2 horas, o sistema deve Aplicar Tarifa Integrada Gratuita.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Passageiro'],
      casosDeUso: ['Passar Cartão de Transporte', 'Debitar Tarifa do Saldo', 'Aplicar Tarifa Integrada Gratuita'],
    },
    gabarito: {
      nodes: [
        { id: 'g-pas', tipo: 'ator', label: 'Passageiro' },
        { id: 'g-pas-c', tipo: 'casoDeUso', label: 'Passar Cartão de Transporte' },
        { id: 'g-deb', tipo: 'casoDeUso', label: 'Debitar Tarifa do Saldo' },
        { id: 'g-int', tipo: 'casoDeUso', label: 'Aplicar Tarifa Integrada Gratuita' },
      ],
      edges: [
        { source: 'Passageiro', target: 'Passar Cartão de Transporte', tipo: 'associacao' },
        { source: 'Passar Cartão de Transporte', target: 'Debitar Tarifa do Saldo', tipo: 'include' },
        { source: 'Aplicar Tarifa Integrada Gratuita', target: 'Passar Cartão de Transporte', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-41-portal-vagas',
    titulo: '41-portal-vagas.uml',
    categoria: 'RH',
    enunciado:
      'No portal de carreiras, o Candidato pode Inscrever-se em Vaga de Emprego. A inscrição obrigatoriamente exige Vincular Currículo Atualizado. Caso a vaga exija testes técnicos de programação, o sistema pode Aplicar Teste Prático Online.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Candidato'],
      casosDeUso: ['Inscrever-se em Vaga de Emprego', 'Vincular Currículo Atualizado', 'Aplicar Teste Prático Online'],
    },
    gabarito: {
      nodes: [
        { id: 'g-can', tipo: 'ator', label: 'Candidato' },
        { id: 'g-ins', tipo: 'casoDeUso', label: 'Inscrever-se em Vaga de Emprego' },
        { id: 'g-cur', tipo: 'casoDeUso', label: 'Vincular Currículo Atualizado' },
        { id: 'g-tes', tipo: 'casoDeUso', label: 'Aplicar Teste Prático Online' },
      ],
      edges: [
        { source: 'Candidato', target: 'Inscrever-se em Vaga de Emprego', tipo: 'associacao' },
        { source: 'Inscrever-se em Vaga de Emprego', target: 'Vincular Currículo Atualizado', tipo: 'include' },
        { source: 'Aplicar Teste Prático Online', target: 'Inscrever-se em Vaga de Emprego', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-42-passagem-onibus',
    titulo: '42-passagem-onibus.uml',
    categoria: 'Transporte',
    enunciado:
      'No guichê rodoviário, o Viajante pode Emitir Passagem Interestadual. Toda emissão obrigatoriamente deve Cadastrar Documento RG do Passageiro por exigência da ANTT. Caso o viajante possua bagagem extra além do limite, ele deve Pagar Taxa de Excesso de Carga.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Viajante'],
      casosDeUso: ['Emitir Passagem Interestadual', 'Cadastrar Documento RG do Passageiro', 'Pagar Taxa de Excesso de Carga'],
    },
    gabarito: {
      nodes: [
        { id: 'g-via', tipo: 'ator', label: 'Viajante' },
        { id: 'g-emi', tipo: 'casoDeUso', label: 'Emitir Passagem Interestadual' },
        { id: 'g-rg', tipo: 'casoDeUso', label: 'Cadastrar Documento RG do Passageiro' },
        { id: 'g-exc', tipo: 'casoDeUso', label: 'Pagar Taxa de Excesso de Carga' },
      ],
      edges: [
        { source: 'Viajante', target: 'Emitir Passagem Interestadual', tipo: 'associacao' },
        { source: 'Emitir Passagem Interestadual', target: 'Cadastrar Documento RG do Passageiro', tipo: 'include' },
        { source: 'Pagar Taxa de Excesso de Carga', target: 'Emitir Passagem Interestadual', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-43-condominio-reserva',
    titulo: '43-condominio-reserva.uml',
    categoria: 'Administração',
    enunciado:
      'No app do condomínio, o Morador realiza Reservar Salão de Festas. Toda reserva obrigatoriamente exige Verificar Inadimplência Condominial. Caso o morador deseje utilizar a churrasqueira anexa, ele pode Adicionar Taxa de Churrasqueira.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Morador'],
      casosDeUso: ['Reservar Salão de Festas', 'Verificar Inadimplência Condominial', 'Adicionar Taxa de Churrasqueira'],
    },
    gabarito: {
      nodes: [
        { id: 'g-mor', tipo: 'ator', label: 'Morador' },
        { id: 'g-res', tipo: 'casoDeUso', label: 'Reservar Salão de Festas' },
        { id: 'g-ina', tipo: 'casoDeUso', label: 'Verificar Inadimplência Condominial' },
        { id: 'g-chu', tipo: 'casoDeUso', label: 'Adicionar Taxa de Churrasqueira' },
      ],
      edges: [
        { source: 'Morador', target: 'Reservar Salão de Festas', tipo: 'associacao' },
        { source: 'Reservar Salão de Festas', target: 'Verificar Inadimplência Condominial', tipo: 'include' },
        { source: 'Adicionar Taxa de Churrasqueira', target: 'Reservar Salão de Festas', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-44-doacao-sangue',
    titulo: '44-doacao-sangue.uml',
    categoria: 'Saúde',
    enunciado:
      'No hemocentro, o Doador realiza a Triagem Hematológica. Toda triagem obrigatoriamente deve Testar Nível de Hemoglobina do Sangue. Se o doador tiver realizado tatuagem há menos de 12 meses, o sistema deve Registrar Inaptidão Temporária.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Doador'],
      casosDeUso: ['Triagem Hematológica', 'Testar Nível de Hemoglobina do Sangue', 'Registrar Inaptidão Temporária'],
    },
    gabarito: {
      nodes: [
        { id: 'g-doa', tipo: 'ator', label: 'Doador' },
        { id: 'g-tri', tipo: 'casoDeUso', label: 'Triagem Hematológica' },
        { id: 'g-hem', tipo: 'casoDeUso', label: 'Testar Nível de Hemoglobina do Sangue' },
        { id: 'g-ina', tipo: 'casoDeUso', label: 'Registrar Inaptidão Temporária' },
      ],
      edges: [
        { source: 'Doador', target: 'Triagem Hematológica', tipo: 'associacao' },
        { source: 'Triagem Hematológica', target: 'Testar Nível de Hemoglobina do Sangue', tipo: 'include' },
        { source: 'Registrar Inaptidão Temporária', target: 'Triagem Hematológica', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-45-sinistro-seguro',
    titulo: '45-sinistro-seguro.uml',
    categoria: 'Seguros',
    enunciado:
      'No portal da seguradora, o Segurado realiza Abrir Sinistro de Batida de Carro. A abertura obrigatoriamente exige Anexar Boletim de Ocorrência Policial. Caso o veículo seja considerado perda total, a seguradora pode Acionar Indenização Integral da Tabela FIPE.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Segurado'],
      casosDeUso: ['Abrir Sinistro de Batida de Carro', 'Anexar Boletim de Ocorrência Policial', 'Acionar Indenização Integral da Tabela FIPE'],
    },
    gabarito: {
      nodes: [
        { id: 'g-seg', tipo: 'ator', label: 'Segurado' },
        { id: 'g-sin', tipo: 'casoDeUso', label: 'Abrir Sinistro de Batida de Carro' },
        { id: 'g-bo', tipo: 'casoDeUso', label: 'Anexar Boletim de Ocorrência Policial' },
        { id: 'g-ind', tipo: 'casoDeUso', label: 'Acionar Indenização Integral da Tabela FIPE' },
      ],
      edges: [
        { source: 'Segurado', target: 'Abrir Sinistro de Batida de Carro', tipo: 'associacao' },
        { source: 'Abrir Sinistro de Batida de Carro', target: 'Anexar Boletim de Ocorrência Policial', tipo: 'include' },
        { source: 'Acionar Indenização Integral da Tabela FIPE', target: 'Abrir Sinistro de Batida de Carro', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-46-coleta-reciclavel',
    titulo: '46-coleta-reciclavel.uml',
    categoria: 'Sustentabilidade',
    enunciado:
      'No aplicativo ambiental, o Cidadão pode Solicitar Coleta de Eletrônicos. Toda solicitação obrigatoriamente exige Detalhar Tipo e Quantidade de Sucata. Caso o peso exceda 50kg, a cooperativa pode Enviar Caminhão com Guincho.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Cidadão'],
      casosDeUso: ['Solicitar Coleta de Eletrônicos', 'Detalhar Tipo e Quantidade de Sucata', 'Enviar Caminhão com Guincho'],
    },
    gabarito: {
      nodes: [
        { id: 'g-cid', tipo: 'ator', label: 'Cidadão' },
        { id: 'g-col', tipo: 'casoDeUso', label: 'Solicitar Coleta de Eletrônicos' },
        { id: 'g-suc', tipo: 'casoDeUso', label: 'Detalhar Tipo e Quantidade de Sucata' },
        { id: 'g-gui', tipo: 'casoDeUso', label: 'Enviar Caminhão com Guincho' },
      ],
      edges: [
        { source: 'Cidadão', target: 'Solicitar Coleta de Eletrônicos', tipo: 'associacao' },
        { source: 'Solicitar Coleta de Eletrônicos', target: 'Detalhar Tipo e Quantidade de Sucata', tipo: 'include' },
        { source: 'Enviar Caminhão com Guincho', target: 'Solicitar Coleta de Eletrônicos', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-47-monitoramento-devops',
    titulo: '47-monitoramento-devops.uml',
    categoria: 'DevOps / TI',
    enunciado:
      'No dashboard de infraestrutura, o Engenheiro DevOps pode Executar Deploy Contínuo. Todo deploy obrigatoriamente deve Rodar Testes Automatizados no Pipeline. Caso ocorra erro de compilação ou falha em testes, o sistema deve Realizar Rollback Automático.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Engenheiro DevOps'],
      casosDeUso: ['Executar Deploy Contínuo', 'Rodar Testes Automatizados no Pipeline', 'Realizar Rollback Automático'],
    },
    gabarito: {
      nodes: [
        { id: 'g-dev', tipo: 'ator', label: 'Engenheiro DevOps' },
        { id: 'g-dep', tipo: 'casoDeUso', label: 'Executar Deploy Contínuo' },
        { id: 'g-tes', tipo: 'casoDeUso', label: 'Rodar Testes Automatizados no Pipeline' },
        { id: 'g-rol', tipo: 'casoDeUso', label: 'Realizar Rollback Automático' },
      ],
      edges: [
        { source: 'Engenheiro DevOps', target: 'Executar Deploy Contínuo', tipo: 'associacao' },
        { source: 'Executar Deploy Contínuo', target: 'Rodar Testes Automatizados no Pipeline', tipo: 'include' },
        { source: 'Realizar Rollback Automático', target: 'Executar Deploy Contínuo', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-48-compra-coletiva',
    titulo: '48-compra-coletiva.uml',
    categoria: 'Comércio',
    enunciado:
      'No site de ofertas, o Usuário realiza a ação de Comprar Cupom Promocional. Para comprar, o sistema obrigatoriamente exige Debitar Valor da Fatura. Caso o lote mínimo de 50 compradores não seja atingido até meia-noite, o sistema deve Estornar Pagamento.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Usuário'],
      casosDeUso: ['Comprar Cupom Promocional', 'Debitar Valor da Fatura', 'Estornar Pagamento'],
    },
    gabarito: {
      nodes: [
        { id: 'g-usu', tipo: 'ator', label: 'Usuário' },
        { id: 'g-cmp', tipo: 'casoDeUso', label: 'Comprar Cupom Promocional' },
        { id: 'g-deb', tipo: 'casoDeUso', label: 'Debitar Valor da Fatura' },
        { id: 'g-est', tipo: 'casoDeUso', label: 'Estornar Pagamento' },
      ],
      edges: [
        { source: 'Usuário', target: 'Comprar Cupom Promocional', tipo: 'associacao' },
        { source: 'Comprar Cupom Promocional', target: 'Debitar Valor da Fatura', tipo: 'include' },
        { source: 'Estornar Pagamento', target: 'Comprar Cupom Promocional', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-49-eleicao-sindical',
    titulo: '49-eleicao-sindical.uml',
    categoria: 'Cidadania',
    enunciado:
      'Na urna eletrônica online, o Filiado pode Registrar Voto Sindical. Todo voto registrado obrigatoriamente deve Criptografar Cédula Digital de Voto. Caso o filiado já tenha votado na mesma sessão, o sistema deve Bloquear Voto Duplo.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Filiado'],
      casosDeUso: ['Registrar Voto Sindical', 'Criptografar Cédula Digital de Voto', 'Bloquear Voto Duplo'],
    },
    gabarito: {
      nodes: [
        { id: 'g-fil', tipo: 'ator', label: 'Filiado' },
        { id: 'g-vot', tipo: 'casoDeUso', label: 'Registrar Voto Sindical' },
        { id: 'g-cri', tipo: 'casoDeUso', label: 'Criptografar Cédula Digital de Voto' },
        { id: 'g-blo', tipo: 'casoDeUso', label: 'Bloquear Voto Duplo' },
      ],
      edges: [
        { source: 'Filiado', target: 'Registrar Voto Sindical', tipo: 'associacao' },
        { source: 'Registrar Voto Sindical', target: 'Criptografar Cédula Digital de Voto', tipo: 'include' },
        { source: 'Bloquear Voto Duplo', target: 'Registrar Voto Sindical', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-50-marketplace-vendedor',
    titulo: '50-marketplace-vendedor.uml',
    categoria: 'E-commerce',
    enunciado:
      'No painel do lojista parceiro, o Vendedor pode Anunciar Produto no Marketplace. Todo anúncio publicado obrigatoriamente exige Validar Código de Barras EAN. Caso o vendedor opte por destaque pago na home, ele pode Contratar Impulsionamento Patrocinado.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Vendedor'],
      casosDeUso: ['Anunciar Produto no Marketplace', 'Validar Código de Barras EAN', 'Contratar Impulsionamento Patrocinado'],
    },
    gabarito: {
      nodes: [
        { id: 'g-ven', tipo: 'ator', label: 'Vendedor' },
        { id: 'g-anu', tipo: 'casoDeUso', label: 'Anunciar Produto no Marketplace' },
        { id: 'g-ean', tipo: 'casoDeUso', label: 'Validar Código de Barras EAN' },
        { id: 'g-pat', tipo: 'casoDeUso', label: 'Contratar Impulsionamento Patrocinado' },
      ],
      edges: [
        { source: 'Vendedor', target: 'Anunciar Produto no Marketplace', tipo: 'associacao' },
        { source: 'Anunciar Produto no Marketplace', target: 'Validar Código de Barras EAN', tipo: 'include' },
        { source: 'Contratar Impulsionamento Patrocinado', target: 'Anunciar Produto no Marketplace', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-51-farmacia-medicamentos',
    titulo: '51-farmacia-medicamentos.uml',
    categoria: 'Saúde',
    enunciado:
      'No balcão da farmácia, o Farmacêutico pode Vender Medicamento Controlado. Toda venda controlada obrigatoriamente exige Reter Receita Médica no Sistema SNGPC. Caso a receita médica apresente rasura ou data expirada, o farmacêutico deve Recusar Dispensação.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Farmacêutico'],
      casosDeUso: ['Vender Medicamento Controlado', 'Reter Receita Médica no Sistema SNGPC', 'Recusar Dispensação'],
    },
    gabarito: {
      nodes: [
        { id: 'g-far', tipo: 'ator', label: 'Farmacêutico' },
        { id: 'g-ven', tipo: 'casoDeUso', label: 'Vender Medicamento Controlado' },
        { id: 'g-ret', tipo: 'casoDeUso', label: 'Reter Receita Médica no Sistema SNGPC' },
        { id: 'g-rec', tipo: 'casoDeUso', label: 'Recusar Dispensação' },
      ],
      edges: [
        { source: 'Farmacêutico', target: 'Vender Medicamento Controlado', tipo: 'associacao' },
        { source: 'Vender Medicamento Controlado', target: 'Reter Receita Médica no Sistema SNGPC', tipo: 'include' },
        { source: 'Recusar Dispensação', target: 'Vender Medicamento Controlado', tipo: 'extend' },
      ],
    },
  },
  {
    id: 'ex-52-passaporte-federal',
    titulo: '52-passaporte-federal.uml',
    categoria: 'Governo',
    enunciado:
      'No posto da Polícia Federal, o Requerente realiza Solicitar Emissão de Passaporte. A solicitação obrigatoriamente exige Coletar Impressões Digitais e Foto Biométrica. Caso o passaporte anterior tenha sido extraviado ou furtado, o requerente deve Apresentar Boletim de Ocorrência.',
    regra: 'Dica de ouro: "sempre / obrigatoriamente" → <<include>> · "caso / se / opcionalmente" → <<extend>>',
    pecas: {
      atores: ['Requerente'],
      casosDeUso: ['Solicitar Emissão de Passaporte', 'Coletar Impressões Digitais e Foto Biométrica', 'Apresentar Boletim de Ocorrência'],
    },
    gabarito: {
      nodes: [
        { id: 'g-req', tipo: 'ator', label: 'Requerente' },
        { id: 'g-sol', tipo: 'casoDeUso', label: 'Solicitar Emissão de Passaporte' },
        { id: 'g-bio', tipo: 'casoDeUso', label: 'Coletar Impressões Digitais e Foto Biométrica' },
        { id: 'g-bo', tipo: 'casoDeUso', label: 'Apresentar Boletim de Ocorrência' },
      ],
      edges: [
        { source: 'Requerente', target: 'Solicitar Emissão de Passaporte', tipo: 'associacao' },
        { source: 'Solicitar Emissão de Passaporte', target: 'Coletar Impressões Digitais e Foto Biométrica', tipo: 'include' },
        { source: 'Apresentar Boletim de Ocorrência', target: 'Solicitar Emissão de Passaporte', tipo: 'extend' },
      ],
    },
  },
];
