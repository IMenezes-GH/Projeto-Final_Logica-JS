/**
 * 
 * @param {Number} codigo código da turma 1 <= x <= 10 
 * @param {Number} maximo Máximo número de alunos na turma 1 <= 1 <= 10
 * @returns {Boolean} true se o cadastramento ocorrer com sucesso, caso contrário, false
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
            return {codigo, maximo}
        }
    } catch (err) {
        console.error(err.message)
        return false
    }
}