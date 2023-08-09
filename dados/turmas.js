const turmasDB = [
    {codigo: 1, maximo:5},
    {codigo: 2, maximo:7},
    {codigo: 3, maximo:9}
]

/**
 * Utilidade para consultar se dada turma já existe no banco de dados
 * @param {Number} consultaCodigo Código da turma que será consultada
 * @returns {Boolean} True se a turma já existe, falso se a turma não existir
 */
const turmaExiste = (consultaCodigo) => {
    return (!turmasDB.every((turma) => turma.codigo !== consultaCodigo && consultaCodigo))
}

let quantidadeTurmas = () => {return turmasDB.length}
/**
 *  Cadastra uma nova turma para turmasDB. Restrições no cadastramento são: Codigo e maximo ambos devem ser maiores ou igual a 1, ou menor e igual a 10. No máximo 10 turmas podem existir
 * @param {*} codigo código da turma que será cadastrada
 * @param {*} maximo  Número máximo de alunos para a turma
 */
const cadastrarTurma = (codigo, maximo = 5) => {

    try {

        codigo = parseInt(codigo)
        maximo = parseInt(maximo)

        if (quantidadeTurmas() >= 10){
            throw new Error('Quantidade máxima de turmas excedido (10)')
        }
        else if (codigo > 10 || codigo < 1){
            throw new Error('Códigos para Turmas cadastradas devem ter digitos entre 1 e 10.')
        }
        else if (isNaN(codigo) || isNaN(maximo)){
            throw new Error('Os parâmetros devem ser valores numéricos')
        }
        else if (turmaExiste(codigo)){
            throw new Error('Essa turma já existe.')
        }
        else if (maximo < 5 || maximo > 10){
            throw new Error('Número máximo de alunos deve estar entre 5 e 10.')
        }
        else {
            turmasDB.push({codigo, maximo})
        }
    } catch (err) {
        console.error(err.message)
    }
}