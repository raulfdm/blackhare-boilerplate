import inquirer = require('inquirer')
import beautify = require('js-beautify')
import Log from '../helpers/Log'
import ProjectInfosModel from '../models/ProjectInfosModel'
import copyBoilerplate from '../tasks/copyBoilerplate'

export default class PorjectController {
  private _logs: Log = new Log()
  private _projectInformations: ProjectInfosModel

  public bootstrap() {
    inquirer
      .prompt(this._initialQuestions())
      .then((answers: inquirer.Answers) => {
        this._projectInformations = new ProjectInfosModel(
          answers.name,
          answers.version,
          answers.package_manager)
        this._logs.log(this._projectInformations.name)
        return this._confirmProjectInfos()
      })
      .then((answer: inquirer.Answers) => {
        const copyAction = new copyBoilerplate(this._projectInformations)

        answer.confirmation
          ? copyAction.start()
          : process.exit()
      })

  }

  private _initialQuestions(): object[] {

    return [{
      default: 'my-project',
      message: 'Qual o nome do seu projet?',
      name: 'name',
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
      name: 'version',
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
      name: 'package_manager',
      type: 'list',
    }]
  }

  private _confirmProjectInfos = () => {
    this._logs.info(this._projectInformations.basicInfoToJson())

    const question = [{
      default: 'Y',
      message: 'As informações acima estão corretas?',
      name: 'confirmation',
      type: 'confirm',
    }]
    return inquirer.prompt(question)
  }
}
