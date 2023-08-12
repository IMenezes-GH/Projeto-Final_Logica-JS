
// ===============================================================================
//                  CADASTRO DE ALUNOS
// =-------------------------------------------------------------------------------=


// =-------------------------------------------------------------------------------=
/**
 * Função para cadastramento de alunos. Aceita 7 parâmetros obrigatórios e 1 opcional
 * @param {String} nome Primeiro nome do aluno
 * @param {String} sobrenome Sobrenome do aluno
 * @param {String} email Email do aluno
 * @param {Number} turma Turma do aluno ([0 < turma < 11])
 * @param {String} nascimento data de nascimento do aluno
 * @param {Array} notas Array de notas do aluno (notas.length < 6)
 * @param {Boolean} ativo Se o aluno está ativamente matriculado ou não. Padrão true
 * @returns {Boolean} True se a função executar com sucesso, caso contrário, false.
 */
const cadastrarAluno = (nome, sobrenome, email, turma, classe,nascimento, notas,  ativo=true) => {

    try{
        const aluno = {
            nome : validarNome(nome),
            sobrenome : validarNome(sobrenome),
            email : validarEmail(email),
            turma : validarTurma(turma),
            classe: validarClasse(classe, turma),
            nascimento : validarData(nascimento),
            notas : validarNotas(notas),
            ativo : Boolean(ativo),
        }
            alunosDB.push(aluno)
            console.info('Aluno cadastrado com sucesso!')
            return true

    } catch (err) {
        console.error(err.message)
    }
}
// ===============================================================================
//                  CONSULTA E UPDATE DE ALUNOS
// =-------------------------------------------------------------------------------=

// =-------------------------------------------------------------------------------=
/**
 * Realiza uma busca no alunosDB por um nome ou email estritamente igual ao input
 * @param {String | Number} s String a ser pesquisado (pesquisa por nome/email) ou número (pesquisa por turma)
 * @returns {Object | Array | null} retorna Object ou array se a pesquisa encontrar um resultado. Retorna null se nenhum nome ou email for encontrado.
 */
const buscarAluno = (s) => {
    let resultado

    if (typeof s === 'number'){
        resultado = alunosDB.filter((aluno) => aluno.turma === s)
        return(resultado)
    }
    /**
     * Verifica se o parâmetro de input é um email válido ou não.
     * Se true, realiza busca única por email. Se false, realiza busca por nome e retorna um array de todos resultados.
     */

    else if (s.match(EMAIL_REGEX)){
        resultado = alunosDB.findIndex((aluno) => aluno.email === s) ?? -1 // ?? para que 0 seja 0
    } else {
        const busca = alunosDB.filter((aluno) => {return s === aluno.nome})
        resultado = busca.length ? busca : -1
    }

    if (resultado || Number(resultado) >= 0) {
        return {index: resultado, aluno: alunosDB[resultado]}
    } else {
        console.log('Nenhum aluno encontrado.')
        return null
    }
}

/**
 * Remove um aluno do banco de dados determinado pelo email
 * @param {String} a email do aluno a ser deletado 
 * @returns {Boolean} true se o aluno for removido com sucesso, ao contrário, false.
 */
const removerAluno = (a) => {
    try {
        if (a.match(EMAIL_REGEX)){
            let idAluno = buscarAluno(a).index || null

            if (!idAluno) throw new Error('Esse email não corresponde a nenhum aluno no banco de dados.')
            delete alunosDB[idAluno]
            alunosDB = alunosDB.filter(Boolean)

            return true
        }
        else {
            throw new Error('Não foi possível deletar esse aluno')
        }

    } catch (err) {
        console.error(err.message)
        return false
    }
}

/**
 * Atualiza os dados de um aluno, tendo como base o email do aluno
 * @param {*} emailID Email do aluno que terá os dados atualizados
 * @param {Object} params Dados para atualizar no cadastro do aluno 
 * @returns {Object} os dados atualizados do aluno
 */
function atualizarAluno(emailID, {nome, sobrenome, email, turma, classe, nascimento, notas, ativo}){
    console.log(arguments)
    
    try {
        if (!emailID) throw new Error('Por favor preencha o email, seguido de um objeto com os dados a serem atualizados')
        
        let novosDados = arguments[1]  
        let busca = buscarAluno(emailID) ?? null

        if (busca){
            aluno = alunosDB[busca.index]
            index = busca.index

            for (key in novosDados){
                const novoDado = novosDados[key] // novo dado passado no parâmetro

                switch (key){
                    case 'nome':
                    case 'sobrenome':
                        alunosDB[index][key] = validarNome(novoDado)
                        break
                    case 'email':
                        alunosDB[index][key] = validarEmail(novoDado)
                        break
                    case 'nascimento':
                        alunosDB[index][key] = validarData(novoDado)
                        break
                    case 'notas':
                        alunosDB[index][key] = validarNotas(novoDado)
                        break
                    case 'turma':

                        if (novosDados.classe && validarClasse(novosDados.classe, novoDado)){
                            novosDados.classe = validarClasse(novosDados.classe, novoDado)
                            alunosDB[index].turma = validarTurma(novoDado)
                            alunosDB[index].classe = novosDados.classe
                        }

                        else if (!novosDados.classe && validarClasse(aluno.classe, novoDado)){
                            alunosDB[index][key] = validarTurma(novoDado)
                        } 

                        break
                    case 'classe':
                        
                        if (novosDados.turma){
                            break
                        } else {
                            alunosDB[index][key] = validarClasse(novoDado, aluno.turma)
                        }

                        break
                    default:
                        console.log('Esse tipo de dado não pode ser validado')
                        break
                }
            }

            return aluno
        } else {
            throw new Error('Não foi possível atualizar esse aluno')
        }

    } catch (err) {
        console.error(err.message)
        return false
    }
}

/**
 * Lista todos os alunos matriculados na escola em uma tabela
 * @returns {void}
 */
const listarAlunos = () => {
    console.table(alunosDB)
}

/**
 * 
 * @param {String} a email ou nome do(s) alunos para cálculo de média das notas 
 * @returns {Array | Number | Boolean} A média ou lista de médias calculadas
 */
const mediaDe = (a = '*') => {
    try {
        const busca = buscarAluno(a)
        if (a === '*'){
            let medias = alunosDB.map((aluno) => {
                return {aluno: aluno.nome + ' ' + aluno.sobrenome, notas: aluno.notas, media: media(aluno.notas)}
            })
            return medias
        }
        else if (Array.isArray(busca.index)){

            let alunos = busca.index

            let medias = alunos.map((aluno) => {
                return {aluno: aluno.nome + ' ' + aluno.sobrenome, notas: aluno.notas, media: media(aluno.notas)}
            })

            console.table(medias)
            return true

        } else {
            let aluno = busca.aluno
            let dados = {
                aluno: aluno.nome + ' ' + aluno.sobrenome,
                notas: aluno.notas,
                media: media(aluno.notas)
            }

            return dados.media
        }

    } catch (err) {
        console.error('Não foi possível calcular a média')
        return false
    }
}

/**
 * Retorna uma lista com todos alunos ativos
 * @returns array
 */
const alunosAtivos = () => {
    return alunosDB.filter((aluno) => aluno.ativo)
}

/**
 * Retorna uma lista com todos alunos inativos
 * @returns array
 */
const alunosInativos = () => {
    return alunosDB.filter((aluno) => !aluno.ativo)
}

/**
 * Desativa um aluno, caso exista
 * @returns void
 */
const desativarAluno = (a) => {
    const busca = buscarAluno(a) ?? null

    if (busca && a.match(EMAIL_REGEX)){
        if (alunosDB[busca.index].ativo){
            alunosDB[busca.index].ativo = false  
            console.info('Aluno desativado')
        } else {
            console.warn('Não foi possível desativar esse aluno')
        }
    } else {
        console.warn('Para desativar um aluno utilize um email como parâmetro.')
    }
}

/**
 * Gera uma lista com todos alunos com a média de notas acima do valor parametrizado
 * @param {Number=} nota nota que será comparada no cálculo de média  
 * @returns {array} todos alunos acima da nota determinada
 */
const acimaDaMedia = (nota = MEDIA_ESCOLAR) => {
    return alunosDB.filter((aluno) => media(aluno.notas) >= nota)
}

/**
 * Gera uma lista com todos alunos com a média de notas abaixo do valor parametrizado
 * @param {Number=} nota nota que será comparada no cálculo de média  
 * @returns {array} todos alunos abaixo da nota determinada
 */
const abaixoDaMedia = (nota = MEDIA_ESCOLAR) => {
    return alunosDB.filter((aluno) => media(aluno.notas) < nota)
}

