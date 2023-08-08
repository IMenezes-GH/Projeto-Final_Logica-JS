// const turma = {
//     codigo, //number
//     maximo //number
// }

// const aluno = {
//     nome, // string
//     sobrenome,  //string
//     email, //string
//     turma, //number
//     nascimento, //string
//     notas: [], //number[]
//     ativo: true, //bool
// }

const turma = {
    codigo: 1,
    maximo: 5
}

/**
 * Utilidade para consultar se dada turma já existe no banco de dados
 * @param {Number} consultaCodigo Código da turma que será consultada
 * @returns {Boolean} True se a turma já existe, falso se a turma não existir
 */
const turmaExiste = (consultaCodigo) => {
    try {
        if (!consultaCodigo) {
            throw new Error('tentativa de consulta sem parâmetro realizada. \n Para realizar uma busca por favor digite um número.')
        }
        return (!turmasDB.every((turma) => turma.codigo !== consultaCodigo && consultaCodigo))
    } catch (err) {
        console.warn(err.message)
    }
}

/**
 *  Cadastra uma nova turma para turmasDB
 * @param {*} codigo código da turma que será cadastrada
 * @param {*} maximo  Número máximo de alunos para a turma
 */
const cadastrarTurma = (codigo, maximo = 5) => {

    try {
        if (codigo > 10 || codigo < 1){
            throw new Error('Códigos para Turmas cadastradas devem ter digitos entre 1 e 10.')
        }
        else if (turmaExiste(codigo)){
            throw new Error('Essa turma já existe.')
        }
        else if (maximo < 5 || maximo > 10){
            throw new Error('Número máximo de alunos deve estar entra 5 e 10.')
        }
        else {
            turmasDB.push({codigo, maximo})
        }
    } catch (err) {
        console.error('Algo deu errado.')
        console.error(err.message)
    }
}
