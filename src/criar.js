const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs-extra')

const criar = ()=>{
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
    .then(answers => {
        console.log(answers)/*
        copyMirror(answers.project.name)*/
    })

}

module.exports = criar