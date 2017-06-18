const inquirer = require('inquirer')
const chalk = require('chalk')
const beautify = require('js-beautify')

const copyBoilerplate = require('./tasks/copyBoilerplate')

const createProject = () => {
  const questions = [
    {
      type: 'input',
      name: 'project.name',
      default: 'my-project',
      message: 'Qual o nome do seu projet?',
      validate(input) {
        if (input.length < 3) {
          console.error(chalk.red('\nNome precisa ter no mínimo 3 caracteres!'))
        } else {
          return true
        }
      },
      filter(projectName) {
        return handleProjectName(projectName)
      }
    }, {
      type: 'input',
      name: 'project.version',
      default: '0.0.1',
      message: 'Qual a versão do projeto?:',
      validate(input) {
        if (/\d\.\d\.\d/g.test(input)) {
          return true
        } else {
          console.error(chalk.red('Máscara de versão incorreta! Tente x.x.x'))
        }
      }
    }, {
      type: 'list',
      name: 'project.package_manager',
      default: 'yarn',
      choices: [
        'npm', 'yarn'
      ],
      message: 'Qual a versão do projeto?:'
    }
  ]

  inquirer
    .prompt(questions)
    .then(projectInfos => {
      confirmProjectInfos(projectInfos).then(cb => {
        if (cb.confirmation) {
          copyBoilerplate(projectInfos.project)
        } else {
          process.exit()
        }
      })
    })
}

const confirmProjectInfos = (projectInfos) => {
  console.log('\n', chalk.green(beautify(JSON.stringify(projectInfos))), '\n')

  const question = [
    {
      type: 'confirm',
      name: 'confirmation',
      default: 'Y',
      message: 'As informações acima estão corretas?'
    }
  ]
  return inquirer.prompt(question)
}

const handleProjectName = name => {
  return name
    .toLowerCase()
    .replace(/s/g, '-')
}

module.exports = createProject
