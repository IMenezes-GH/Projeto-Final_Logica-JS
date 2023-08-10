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