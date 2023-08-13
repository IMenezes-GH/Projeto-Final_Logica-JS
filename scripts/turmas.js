/**
 *  Cadastra uma nova turma para turmasDB. Restrições no cadastramento são: Codigo e maximo ambos devem ser maiores ou igual a 1, ou menor e igual a 10. No máximo 10 turmas podem existir
 * @param {*} codigo código da turma que será cadastrada
 * @param {*} maximo  Número máximo de alunos para a turma. Se nenhum valor for especificado, 5 será usado
 */
const cadastrarTurma = (codigo, maximo = 5) => {

    try {

        if (quantidadeTurmas() >= 10) throw new Error('Quantidade máxima de turmas excedido (10)')

        codigo = validarCodigo(codigo)
        maximo = validarMaximo(maximo)
        
        turmasDB.push({codigo, maximo})
        return {codigo, maximo}

    } catch (err) {
        console.error(err.message)
        return false
    }
}

const removerTurma = (codigo) => {
    try {

        codigo = Number(codigo)
        
        const indexTurma = buscarTurma(codigo)
    
        if (!isNaN(codigo) && indexTurma !== -1){
            if (buscarAluno(codigo).length > 0){
                throw new Error('É impossível remover essa turma, ela não está vazia.')
            } else {
                delete turmasDB[indexTurma]
                turmasDB = turmasDB.filter(Boolean)
            }
        } else {
            throw new Error('Essa turma não existe')
        }
    } catch (err) {
        console.error(err.message)
    }
}

const atualizarTurma = (codigoId, {codigo, maximo}) => {

    codigoId = Number(codigoId)
    const busca = buscarTurma(codigoId)

    if (isNaN(codigoId)) throw new Error('Você precisa selecionar um código de turma para atualizar')

    if (busca !== -1){
        turma = turmasDB[busca]
        let quantidadeAlunos = buscarAluno(codigoId).length
        console.log(quantidadeAlunos)
       
        if (maximo && maximo < quantidadeAlunos) throw new Error(`Você não pode diminuir a capacidade máxima de alunos na turma para ${maximo} pois é menor do que a quantidade atual de alunos nessa turma.`)
        
        turmasDB[busca].codigo = codigo ? validarCodigo(codigo) : turma.codigo
        turmasDB[busca].maximo = maximo ? validarMaximo(maximo) : turma.maximo

        // if (Number(maximo) && maximo >= 5 && maximo <= 10 && maximo > busca.length){
        //     turmasDB[busca].maximo = maximo ? maximo : turma.maximo
        // }

    }

}