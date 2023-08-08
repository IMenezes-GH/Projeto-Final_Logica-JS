// const turma = {
//     codigo, //number
//     maximo //number
// }

const cadastrarAluno = (nome, sobrenome, email, turma, nascimento, notas, ativo=true) => {

    const a = {
        nome,
        sobrenome,
        email,
        turma,
        nascimento,
        notas,
        ativo,
        }

    const validarAluno = (aluno) => {return Object.entries(aluno).every((val) => {
        try {

            if (!Boolean(String(val[1]).trim())){
                throw new Error(`O valor de "${val[0]}" não foi preenchido ou foi preenchido incorretamente`)
            } else {
                return Boolean(val)
            }
        } catch (err) {
            console.error(`O valor de ${val[0]} não pode ser vazio.`)
        }
    })}

    if (validarAluno(a)) {
        alunosDB.push(a)
        return true
    }
    else {
        return false
    }
}

