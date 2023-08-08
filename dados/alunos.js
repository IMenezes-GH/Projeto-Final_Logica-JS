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
    }
]

const emailValido = (email) => {
    const emailRegExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]/) // RegExp que captura padrão de email
    return Boolean(email.match(emailRegExp))
}

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

