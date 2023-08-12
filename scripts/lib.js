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
 * @param {String} nome nome para ser validado
 * @returns {String} O nome validado ou null caso valor seja inválido
 */
const validarNome = (nome) => {
    if (!nome) throw new Error('Por favor digite um nome/sobrenome')

    nome = nome.trim()
    if (nome.length){
        nome = nome.split(' ')
        nome = nome.map(el => {
            const conectivos = ['da', 'de', 'das', 'dos']
            return conectivos.includes(el) ? el : el.charAt(0).toUpperCase() + el.slice(1)
        });
        return nome.join(' ')
    } else {
        throw new Error('Nome ou sobrenome inválido')
    }
}

/**
 * Função para validar se determinada string qualifica como email. Parâmetros para ser considerado como email são: Uma sequência de caractéres alfanuméricos (username), seguidos por um '@' (symbol), outra sequência de caractéres alfanuméricos (domínio) seguidos com um '.' seguido por mais caractéres alfanuméricos (top-level).
 * @param {String} email uma string que que será verificada
 * @returns {String} retorna o email caso validado, ao contrário retorna false
 */
const validarEmail = (email) => {
    if (!email) throw new Error('Por favor digite um email')

    if (email && email.match(EMAIL_REGEX)){
        if (buscarAluno(email).index === -1){ // checa se email não está em uso
            return email  
        } else {
            throw new Error('Email em uso.')
        }
    } else {
        throw new Error('Email inválido')
    }
}

/**
 * Realiza uma pesquisa e verifica se uma dada turma existe e está aceitando alunos
 * @param {Number} turma A turma a ser pesquisada 
 * @returns {Number} A turma selecionada
 */
const validarTurma = (turma) => {
    if (turma && turmaExiste(turma)){
        const turmaAlunos = alunosDB.filter((aluno) => aluno.turma === turma)
        const turmaSelecionada = turmasDB.at(buscaTurma[turma])

        if (turmaAlunos.length < turmaSelecionada.maximo){
            return turma
        } else {
            throw new Error(`Essa turma [${turma}] já atingiu a capacidade de alunos: ${turmaSelecionada.maximo}`)
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
const validarData = (data) => {
    if (data && data.trim().length > 0){

        if (data.match(DATA_REGEX)){ //

            data = data.split(/[-|\/]/)
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
const validarNotas = (notas) => {
    if (!notas) throw new Error('Por favor digite as notas.')

    notas.map((nota) => {
        if ((nota) >= 0 && nota <= 10){
            return Number(nota)
        } else {
            throw new Error('Formato de notas inválido. Por favor preencha as notas dentro de colchetes "[ ]", separadas entre vírgulas')
        }
    })

    if (notas.length <= 5){
        return notas
    } else {
        throw new Error('Máximo de 5 notas podem ser preenchidas')
    }
}

/**
 * Função para validar a classe cadastrada tomando com base a turma
 * @param {String} classe A classe a ser validada
 * @param {Number} turma A turma que será validada a classe
 * @returns {String} A classe, caso seja válida
 */
const validarClasse = (classe, turma) => {
    const classes = ['A', 'B', 'C', 'D']

    if (typeof(classe) === 'string' && classes.includes(classe.toUpperCase())){
        let sample = buscarAluno(turma)
        sample = sample.length ? sample[0].classe : null
    
        classe = classe.toUpperCase()

        switch (classe){

            case 'A':
            case 'D':
                if (sample === 'A' || sample === 'D' || sample === null) {
                    return classe
               } else {
                throw new Error('Não é possível cadastrar essa classe nessa turma.')
               }
            case 'B':
            case 'C':
                if (sample === 'B' || sample === 'C' || sample === null) {
                    return classe
               } else {
                throw new Error('Não é possível cadastrar essa classe nessa turma.')
               }
        }
    } else {
        throw new Error('Classe inválida. Selecione uma das seguintes classes: A, B, C ou D.')
    }
}