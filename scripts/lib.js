const EMAIL_REGEX = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]/, 'g') // RegExp que captura padrão de email
const DATA_REGEX = new RegExp(/\d{1,2}[\/|-]\d{1,2}[\/|-]\d{2,4}/) // regex pesquisa por dd/mm/yyyy ou dd-mm-yyyy

/**
 * Calcula média do array parametrizado
 * @param {array} notas Um array de valores numéricos para calcular a média
 * @returns {Number} Média do array
 */
const media = (notas) => {
    let N = notas.length || 0
    return notas.reduce((acc, curr) => acc + curr, 0) / N
} 

const calcularIdade = (d) => {
    let data_inicial = d
    let data_final = new Date()

    let data_ms = new Date(data_final.getTime() - data_inicial.getTime())
    
    return data_ms.getUTCFullYear() - 1970
}

// ===============================================================================
//                  VALIDAÇÃO DE DADOS - TURMAS
// =-------------------------------------------------------------------------------=


/**
 * Utilidade para consultar se dada turma já existe no banco de dados
 * @param {Number} consultaCodigo Código da turma que será consultada
 * @returns {Boolean} True se a turma já existe, falso se a turma não existir
 */
const turmaExiste = (consultaCodigo) => {
    return (!turmasDB.every((turma) => turma.codigo !== consultaCodigo && consultaCodigo))
}

/**
 * Retorna a quantidade de turmas cadastradas
 * @returns {Number}
 */
let quantidadeTurmas = () => {return turmasDB.length}

/**
 * 
 * @param {String} t Turma a ser pesquisa 
 * @returns {Number} o index da turma pesquisa. -1 caso a turma não seja encontrada
 */
const buscaTurma = (t) => {
    return turmasDB.findIndex((turma) => turma.codigo === t)
}


// ===============================================================================
//                  VALIDAÇÃO DE DADOS - ALUNOS
// =-------------------------------------------------------------------------------=

/**
 * Função para validar se determinada string qualifica como nome. Transforma os nomes em titlecase onde necessário.
 * @param {String} n nome para ser validado
 * @returns {String} O nome validado ou null caso valor seja inválido
 */
const validarNome = (n) => {
    if (!n) throw new Error('Por favor digite um nome/sobrenome')

    n = n.trim()
    if (n.length){
        n = n.split(' ')
        n = n.map(el => {
            const conectivos = ['da', 'de', 'das', 'dos']
            return conectivos.includes(el) ? el : el.charAt(0).toUpperCase() + el.slice(1)
        });
        return n.join(' ')
    } else {
        throw new Error('Nome ou sobrenome inválido')
    }
}

/**
 * Função para validar se determinada string qualifica como email. Parâmetros para ser considerado como email são: Uma sequência de caractéres alfanuméricos (username), seguidos por um '@' (symbol), outra sequência de caractéres alfanuméricos (domínio) seguidos com um '.' seguido por mais caractéres alfanuméricos (top-level).
 * @param {String} e uma string que que será verificada
 * @returns {String} retorna o email caso validado, ao contrário retorna false
 */
const validarEmail = (e) => {
    if (!e) throw new Error('Por favor digite um email')

    if (e && e.match(EMAIL_REGEX)){
        if (buscarAluno(e).index === -1){ // checa se email não está em uso
            return e  
        } else {
            throw new Error('Email em uso.')
        }
    } else {
        throw new Error('Email inválido')
    }
}

/**
 * Realiza uma pesquisa e verifica se uma dada turma existe e está aceitando alunos
 * @param {Number} t A turma a ser pesquisada 
 * @returns {Number} A turma selecionada
 */
const validarTurma = (t) => {
    if (t && turmaExiste(t)){
        const turmaAlunos = alunosDB.filter((aluno) => aluno.turma === t)
        const turmaSelecionada = turmasDB.at(buscaTurma[t])

        if (turmaAlunos.length < turmaSelecionada.maximo){
            return t
        } else {
            throw new Error(`Essa turma [${t}] já atingiu a capacidade de alunos: ${turmaSelecionada.maximo}`)
        }
    } else {
        return new Error('essa turma não existe')
    }
}

/**
 * Função para validar e transformar uma determinada data dada em string para Date Object
 * @param {String} data string que será convertida em data
 * @returns {Date}
 */
const validarData = (d) => {
    if (d && d.trim().length > 0){

        if (d.match(DATA_REGEX)){ //

            let data = d.split(/[-|\/]/)
            data = new Date(`${data[2]}/${data[1]}/${data[0]}`)
            const idade = calcularIdade(data)

            if (idade >= 16){ // Checa se a data de nascimento do aluno é maior ou igual à 16
                return data
            } else {
                throw new Error('Aluno precisa ter 16 anos de idade ou mais')
            }

        }
        else {
            throw new Error('A data precisa estar no formato DD/MM/YYYY, DD-MM-YYYY ou YYYY-MM-DD')
        }
    } else {
        throw new Error('Por favor digite uma data.')
    }
}

/**
 *  Valida o array de notas
 * @param {Array} notas Um array de notas que serão avaliado 
 * @returns {Array} Retorna o array convertido em Number caso válido, null caso inválido.
 */
const validarNotas = (n) => {
    if (!n) throw new Error('Por favor digite as notas.')

    n.map((nota) => {
        if ((nota) >= 0 && nota <= 10){
            return Number(nota)
        } else {
            throw new Error('Formato de notas inválido. Por favor preencha as notas dentro de colchetes "[ ]", separadas entre vírgulas')
        }
    })

    if (n.length <= 5){
        return n
    } else {
        throw new Error('Máximo de 5 notas podem ser preenchidas')
    }
}