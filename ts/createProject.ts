const inquirer = require('inquirer')
const beautify = require('js-beautify')
import {error, info} from './helpers/logs'

import copyBoilerplate from './tasks/copyBoilerplate'

const createProject = () => {

  inquirer
    .prompt(initialQuestions())
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

const initialQuestions = () => {
  return  [{
    type: 'input',
    name: 'project.name',
    default: 'my-project',
    message: 'Qual o nome do seu projet?',
    validate(input) {
      if (input.length < 3) {
        error('\nNome precisa ter no mínimo 3 caracteres!')
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
    message: 'Informe a versão:',
    validate(input) {
      if (/\d\.\d\.\d/g.test(input)) {
        return true
      } else {
        error('Máscara de versão incorreta! Tente x.x.x')
      }
    }
  }, {
    type: 'list',
    name: 'project.package_manager',
    message: 'Escolha o gerenciador de dependencias',
    default: 'yarn',
    choices: [
      'npm', 'yarn'
    ],
  }]

}

const confirmProjectInfos = projectInfos => {
  info(formatProjectInfos(projectInfos))

  const question = [{
    type: 'confirm',
    name: 'confirmation',
    default: 'Y',
    message: 'As informações acima estão corretas?'
  }]
  return inquirer.prompt(question)
}

const handleProjectName = name => {
  return name
    .toLowerCase()
    .replace(/s/g, '-')
}

const formatProjectInfos = json => `\n${beautify(JSON.stringify(json))}\n`

export default createProject
