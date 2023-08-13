const MEDIA_ESCOLAR = 6

// =========================================================================
// RELATÓRIO GERAL

/**
 * Gera um relatório com a quantidade de alunos, quantidade de turmas, alunos acima da média, alunos abaixo da média e todos os alunos junto da média
 * @returns {void} 
 */
const relatorio = () => {
    console.log(`Quantidade de alunos: ${alunosDB.length}`)
    console.log(`Quantidade de turmas: ${turmasDB.length}`)
    console.table(acimaDaMedia())
    console.table(abaixoDaMedia())
    console.table(mediaDe())
}

const help = () => {
    const manual = 
    
    `

    Cadastrar uma turma (codigo de 1 a 10 e maximo de 5 a 10):
    cadastrarTurma(codigo, maximo)

    Atualizar uma turma:
    atualizarTurma(codigo, {codigo, maximo})

    Remover uma turma:
    removerTurma(codigo)

    ===========================================================================

    Cadastrar o aluno:
    cadastrarAluno(nome, sobrenome, email, turma, classe, data_nascimento, notas, ativo=true)
    
    Buscar aluno(s) por email, nome ou turma:
    buscarAluno(param) | param: email, nome ou turma
    
    Remover um aluno (apenas por email):
    removerAluno(email)

    Atualizar um aluno:
    atualizarAluno(email, {nome, sobrenome, email, data_nascimento, notas, ativo})
    Obs: os parâmetros de atualização dos dados é opcional e apenas os dados selecionados são atualizados
    
    Lista todos os alunos cadastrados, independente de turmas:
    listarAlunos()

    Calcula da média do aluno (nome, email, ou todos valores se nenhum parâmetro for preenchido)
    mediaDe(aluno)
    
    Retorna todos os alunos ativos na escola:
    alunosAtivos()

    Retorna todos os alunos inativos na escola:
    alunosInativos()

    Retorna todos alunos acima da media (nota a ser comparada, se nenhum parâmetro for preenchido o valor comparado é 6):
    acimaDaMedia(media)

    Retorna todos alunos abaixo da media:
    abaixoDaMedio(media)

    Printar esse manual:
    help()

    `
    
    console.info(manual)
}
console.info('   Seja bem vindo à interface de cadastramento de alunos!')
help()