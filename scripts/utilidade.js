/**
 * Calcula média do array parametrizado
 * @param {array} notas Um array de valores numéricos para calcular a média
 * @returns {Number} Média do array
 */
const media = (notas) => {
    let N = notas.length || 0
    return notas.reduce((acc, curr) => acc + curr, 0) / N
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
 * @param {String} e email a ser pesquisado
 * @returns {Boolean | null} True se email estiver em uso, falso caso contrário. Null se 'e' não for válida
 */
const emailEmUso = (e) => {
    if (validarEmail(e)){
        return buscarAluno(e).index !== -1
    } else {
        console.warn('Email inválido')
        return null
    }
}

// ===============================================================================
//                  VALIDAÇÃO DE DADOS - ALUNOS
// =-------------------------------------------------------------------------------=

/**
 * Função para validar se determinada string qualifica como nome. Transforma os nomes em titlecase onde necessário.
 * @param {String} n nome para ser validado
 * @returns {String | null} O nome validado ou null caso valor seja inválido
 */
const validarNome = (n) => {
    try {
        n = n.trim()
        if (n.length){
            n = n.split(' ')
            n = n.map(el => {
                const conectivos = ['da', 'de', 'das', 'dos']
                return conectivos.includes(el) ? el : el.charAt(0).toUpperCase() + el.slice(1)
            });
            return n.join(' ')
        } else {
            return null
        }
    } catch (err){
        return null
    }
}

/**
 * Função para validar se determinada string qualifica como email. Parâmetros para ser considerado como email são: Uma sequência de caractéres alfanuméricos (username), seguidos por um '@' (symbol), outra sequência de caractéres alfanuméricos (domínio) seguidos com um '.' seguido por mais caractéres alfanuméricos (top-level).
 * @param {String} e uma string que que será verificada
 * @returns {String | false} retorna o email caso validado, ao contrário retorna false
 */
const validarEmail = (e) => {

    const emailRegExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]/, 'g') // RegExp que captura padrão de email

    if (e && e.match(emailRegExp)) return e
    return false
}

/**
 * Função para validar e transformar uma determinada data dada em string para Date Object
 * @param {String} data string que será convertida em data
 * @returns {Date | null}
 */
const validarData = (d) => {
    try{
        if (!d) return null

        if (d.trim().length > 0){

            const reg = new RegExp(/\d{1,2}[\/|-]\d{1,2}[\/|-]\d{2,4}/) // regex pesquisa por dd/mm/yyyy ou dd-mm-yyyy

            if (d.match(reg)){

                data = d.split(/[-|\/]/)
                return new Date(`${data[2]}/${data[1]}/${data[0]}`)
            }
            else {
                throw new Error('Por favor digite uma data no formato DD/MM/YYYY, DD-MM-YYYY ou YYYY-MM-DD')
            }
        } else {
            return null
        }
    } catch (err){
        console.error('Formato de data inválido.')
        return null
    }
}

/**
 *  Valida o array de notas
 * @param {Array} notas Um array de notas que serão avaliado 
 * @returns {Array | null} Retorna o array convertido em Number caso válido, null caso inválido.
 */
const validarNotas = (n) => {
    if (!n) return null
    try{
        n.map((nota) => {
            if (nota >= 0 && nota <= 10){
                return Number(nota)
            }
        })

        if (n.length <= 5){
            return n
        } else {
            console.warn('Máximo de 5 notas podem ser preenchidas')
            return null
        }

    } catch (err){
        console.error('Formato de notas inválido. Por favor preencha as notas dentro de colchetes "[ ]", separadas entre vírgulas')
        return null
    }
}

const validarAluno = (al) => {return Object.entries(al).every((val) => {
    try {
        if (!Boolean(String(val[1]).trim())){
            throw new Error(`O valor de "${val[0]}" não foi preenchido ou foi preenchido incorretamente`)
        }
        else if (!val[1]) {
            console.warn(`O valor de "${val[0]}" não foi preenchido ou foi preenchido incorretamente`)
        }
        else {
            return Boolean(val)
        }
    } catch (err) {
        console.error(`O valor de ${val[0]} está incorreto ou vazio.`)
    }
})}