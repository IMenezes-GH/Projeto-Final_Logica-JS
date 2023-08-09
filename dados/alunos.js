const alunosDB = [
    {
    nome : 'Ana',
    sobrenome: 'Clara',
    email : 'anaclara1999@email.com',
    turma : 1,
    nascimento : new Date(1999, 11, 3),
    notas: [5, 2, 7, 8],
    ativo: true,
    },
    {
    nome : 'Beatriz',
    sobrenome: 'da Silva',
    email : 'biabiatriz@email.com',
    turma : 1,
    nascimento : new Date(1999, 8, 20),
    notas: [9, 8, 6, 6, 7],
    ativo: true,
    },
    {
    nome : 'Cláudio',
    sobrenome: 'Oliveira de Souza',
    email : 'ccsoujza.12@email.com',
    turma : 2,
    nascimento : '2000-01-9',
    notas: [6, 6, 7, 8, 9],
    ativo: true,
    },
    {
    nome: 'Maria Clara',
    sobrenome: 'Franco Barrichelli',
    email: 'maria.clara.em@email.com',
    turma: 3,
    nascimento: new Date(2000, 3, 19),
    notas: [7, 6, 3, 4],
    ativo: true
    },
    {
    nome: 'Felipe',
    sobrenome: 'Alvez de Oliveira',
    email: 'darkfelipe2000@email.com',
    turma: 3,
    nascimento: new Date(2000, 9, 30),
    notas: [3, 4, 8],
    ativo: false
    },
    {
    nome: 'Beatriz',
    sobrenome: 'Santos Silva',
    email: 'beatrrisantoss@email.com',
    turma: 3,
    nascimento: new Date(2000, 9, 4),
    notas: [8, 8, 8],
    ativo: true
    }
]

// ===============================================================================
// =-------------------------------------------------------------------------------=


/**
 * Função para validar se determinada string qualifica como nome. Transforma os nomes em titlecase onde necessário.
 * @param {String} n nome para ser validado
 * @returns {String | null} O nome validado ou null caso valor seja inválido
 */
const validarNome = (n) => {
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
        if (d.trim().length > 0){

            const reg = new RegExp(/\d{1,2}[\/|-]\d{1,2}[\/|-]\d{2,4}/) // regex pesquisa por dd/mm/yyyy ou dd-mm-yyyy

            if (d.match(reg)){

                data = d.split(/[-|\/]/)
                return new Date(`${data[2]}/${data[1]}/${data[0]}`)
            }
            else {
                throw new Error('Por favor digite uma data no formato DD/MM/YYYY, DD-MM-YYYY ou YYYY-MM-DD')
            }
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
const cadastrarAluno = (nome, sobrenome, email, turma, nascimento, notas, ativo=true) => {


    const aluno = {
        nome : validarNome(nome),
        sobrenome : validarNome(sobrenome),
        email : validarEmail(email),
        turma : turmaExiste(turma),
        nascimento : validarData(nascimento),
        notas : validarNotas(notas),
        ativo : Boolean(ativo),
        }


    // TODO: Tornar o try-catch no cadastro mais limpo, considerando as funções de validação

    // Verifica cada elemento do objeto aluno ====================================================
    const validarAluno = (al) => {return Object.entries(al).every((val) => {
        try {
            if (!Boolean(String(val[1]).trim())){
                throw new Error(`O valor de "${val[0]}" não foi preenchido ou foi preenchido incorretamente`)
            }
            else if (!val[1]) {
                console.warn(`${val[0]} é inválido`)
            }
            else {
                return Boolean(val)
            }
        } catch (err) {
            console.error(`O valor de ${val[0]} está incorreto ou vazio.`)
        }
    })}

    if (validarAluno(aluno)) {
        alunosDB.push(aluno)
        console.info('Aluno cadastrado com sucesso!')
        return true
    }
    else {
        return false
    }
}

// =-------------------------------------------------------------------------------=
/**
 * Realiza uma busca no alunosDB por um nome ou email estritamente igual ao input
 * @param {String} s String a ser pesquisado
 * @returns {Object | Array | null} retorna Object ou array se a pesquisa encontrar um resultado. Retorna null se nenhum nome ou email for encontrado.
 */
const buscarAluno = (s) => {
    let resultado

    /**
     * Verifica se o parâmetro de input é um email válido ou não.
     * Se true, realiza busca única por email. Se false, realiza busca por nome e retorna um array de todos resultados.
     */

    if (validarEmail(s)){
        resultado = alunosDB.find((aluno) => aluno.email === s) || false
    } else {
        const busca = alunosDB.filter((aluno) => s === aluno.nome)
        resultado = busca.length ? busca : false
    }

    if (resultado) {
        console.log(`${resultado.length} aluno${resultado.length > 1 ? 's' : ''} encontrado${resultado.length > 1 ? 's' : ''}:`)
        return resultado
    } else {
        console.log('Nenhum aluno encontrado.')
        return null
    }
}