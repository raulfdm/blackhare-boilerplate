import inquirer = require('inquirer')
import beautify = require('js-beautify')
import Log from '../helpers/Log'
import copyBoilerplate from '../tasks/copyBoilerplate'


export default class PorjectController {
  private _logs: Log = new Log()


  public bootstrap() {
    inquirer
      .prompt(this._initialQuestions())
      .then((projectInfos: any) => {
        this._confirmProjectInfos(projectInfos).then((cb: any) => {
          if (cb.confirmation) {
            copyBoilerplate(projectInfos.project)
          } else {
            process.exit()
          }
        })
      })
  }

  private _initialQuestions(): object[] {

    return [{
      default: 'my-project',
      message: 'Qual o nome do seu projet?',
      name: 'project.name',
      type: 'input',
      validate(input: any) {
        if (input.length < 3) {
          this._logs.error('\nNome precisa ter no mínimo 3 caracteres!')
        } else {
          return true
        }
      },
      filter(projectName: any) {
        return projectName
          .toLowerCase()
          .replace(/s/g, '-')
      },
    }, {
      default: '0.0.1',
      message: 'Informe a versão:',
      name: 'project.version',
      type: 'input',
      validate(input: any) {
        if (/\d\.\d\.\d/g.test(input)) {
          return true
        } else {
          this._logs.error('Máscara de versão incorreta! Tente x.x.x')
        }
      },
    }, {
      choices: [
        'npm', 'yarn',
      ],
      default: 'yarn',
      message: 'Escolha o gerenciador de dependencias',
      name: 'project.package_manager',
      type: 'list',
    }]
  }

  private _confirmProjectInfos = (projectInfos: any) => {
    this._logs.info(this._formatProjectInfos(projectInfos))

    const question = [{
      default: 'Y',
      message: 'As informações acima estão corretas?',
      name: 'confirmation',
      type: 'confirm',
    }]
    return inquirer.prompt(question)
  }

  private _formatProjectInfos = (json: JSON) => `\n${beautify(JSON.stringify(json))}\n`
}
