const inquirer = require('inquirer')
const chalk = require('chalk')

const copyBoilerplate = require('./copyBoilerplate')

const createProject = ()=>{
    const questions = [
    {
        type: 'input',
        name: 'project.name',
        message: 'Qual o nome do seu projet? (meu-projeto): ',
        validate(input) {
            if (input.length) {
                if (/\s/g.test(input)) {
                    console.error(chalk.red('Não pode conter espaços'))
                } else {
                    return true
                }
            } else {
                console.error(chalk.red('Nome é obrigatório'))
            }
        }
    }, {
        type: 'input',
        name: 'project.version',
        default: '0.0.1',
        message: 'Qual a versão do projeto?:',
        validate(input) {
            if (/\d.\d.\d/g.test(input)) {
                return true
            } else {
                console.error(chalk.red('Máscara de versão incorreta! Tente x.x.x'))
            }
        }
    }
];

inquirer
    .prompt(questions)
    .then(projectInfos => {
        copyBoilerplate(projectInfos)
        .then(succ => console.log('Projeto criado com sucesso'))
        .catch(err => console.error(err))
    })

}

module.exports = createProject