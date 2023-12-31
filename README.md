
# Resolução:
### Aplicação para gerenciar alunos

Segue abaixo a lista de requisitos preenchidos do projeto, em concordância com o arquivo [projeto-final.md](https://github.com/IMenezes-GH/desafio-final_logica/blob/main/projeto-final.md)

## Lista de requisitos:
- [x] **Cadastrar turma, contendo**
	- [x] código, *number* entre 1 e 10 (no máximo 10 turmas)
	- [x] máximo, *number* máximo de alunos de 5 a 10

- [x] **Cadastrar aluno, contendo:**
	- [x] nome, *string*
	- [x] sobrenome, *string*
	- [x] email, *string*
	- [x] turma, *number* (sendo um código de turma válido)
	- [x] nascimento, sendo a data de nascimento do aluno
	- [x] notas, sendo um array de números, de no máximo 5 posições
	- [x] ativo, *boolean* // padrão true
----------------------
### Funções:
- [x] Remover aluno
- [x] Atualizar informações do aluno
- [x] Buscar um aluno especifico
- [x] Retornar a lista completa de alunos
- [x] Retornar quantas turmas tem na escola
- [x] Calcular a media do aluno
- [x] Desativar aluno
- [x] Retornar a lista apenas com alunos ativos
- [x] Retornar a lista apenas com alunos inativos
- [x] Retornar os alunos que estão com a média esperada
----------------------
- [x] **Relatório completo com os seguintes retornos:**
	- [x] Quantidade de alunos
	- [x] Quantidade de turmas
	- [x] Alunos que estão com a média esperada
	- [x] Alunos que estão abaixo da média esperada
	- [x] Retornar alunos com a média calculada

## Informações importantes:


- **A média da escola é 6** ✓
- **Não cadastrar/atualizar turmas ou alunos duplicados (alunos/email e turma/código)** ✓✓
- **Não cadastrar/atualizar turmas com o código fora do escopo (código e número máximo de alunos)** ✓✓
- **Não cadastras/atualizar alunos menores de 16 anos** ✓
- **Não mostrar no console mensagens de erro genéricas (padrões do navegador)** ✓
- **Não cadastrar alunos em turmas inexistentes** ✓
- **O nome do aluno não deve conter espaço extra no começo ou no fim** ✓
- **O nome do aluno deve iniciar com letra Maiúscula** ✓
- **O formato do e-mail do aluno deve ser válido** ✓
- **Você mesmo irá gerar os dados para realizar o projeto e apresentar os dados necessários para rodar o projeto** ✓
- **O projeto deverá ser executado no console do navegador** ✓


## ***Funcionalidade extra***

Como opcional adicionar a funcionalidade de classificação nos alunos, onde será possível **cadastrar** os alunos com a seguinte classificação: A, B, C ou D. Isso implicará na forma como adicionamos novos alunos seguindo a regra:

- [x] Alunos com classificação A e D não podem estar na mesma turma com alunos com classificação B e C e vise-versa.

Observação: Essa é uma funcionalidade completamente opcional e pode ser adicionada após a realização dos requisitos principais.