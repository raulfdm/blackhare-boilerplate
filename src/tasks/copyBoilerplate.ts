import fs = require('fs-extra')
import Log from '../helpers/Log'
import path = require('path')
import Spinner from '../helpers/Spinner'
import ProjectInfosModel from '../models/ProjectInfosModel'
import packageJson from './package.json.js'
import execProcess = require('child_process')


export default class CopyBoilerplate {

  private exec: any = execProcess.exec
  private UX_TIME_WAIT: number = 600
  private _logs: Log = new Log()

  constructor(private _projectInfos: ProjectInfosModel) {
    this._projectInfos.mirrorPath = '../../boilerplate'
  }

  public start() {
    this._copyFolder()
      .then(this._copyFolder)
      .then(this._generatePackageJson)
      .then(this._installDependencies)
      .then(() => {
        this._logs.success('Projeto criado com sucesso!')
        this._logs.log(this._finalInstructions())
      })
      .catch((err: any) => {
        this._logs.errorTrace(err)
        this._removeFolder()
      })
  }

  private _copyFolder() {
    const spin = new Spinner({
      failureMessage: 'Erro ao gerar os arquivos!',
      startMessage: 'Gerando os arquivos...',
      successMessage: 'Arquivos gerados com sucesso!',
    })
    spin.start()

    return new Promise((resolve, reject) => {
      fs
        .copy(this._projectInfos.mirrorPath, this._projectInfos.projectPath)
        .then(() => {
          setTimeout(() => {
            spin.done()
            resolve(this._projectInfos)
          }, this.UX_TIME_WAIT)
        })
        .catch((err: any) => {
          setTimeout(() => {
            spin.fail()
            reject(err)
          }, this.UX_TIME_WAIT)
        })
    })
  }

  private _generatePackageJson = () => {
    const spin = new Spinner({
      failureMessage: 'Erro ao gerar o package.json',
      startMessage: 'Gerando o package.json...',
      successMessage: 'Package.json gerado com sucesso!',
    })

    spin.start()

    return new Promise((resolve, reject) => {
      packageJson(this._projectInfos)
        .then((newInfos: fs.WriteOptions) => {
          setTimeout(() => {
            spin.done()
            resolve(this._projectInfos)
          }, this.UX_TIME_WAIT)
        })
        .catch((err: fs.WriteOptions) => {
          setTimeout(() => {
            spin.fail()
            reject(err)
          }, this.UX_TIME_WAIT)
        })
    })
  }
  private _installDependencies = () => {

    const spinn = new Spinner({
      failureMessage: 'Erro ao instalar as dependencias!',
      startMessage: 'Instalando as dependencias. Pode levar alguns minutos...',
      successMessage: 'Dependencias instaladas com sucesso!',
    })

    const commands = {
      downFolder: `cd ${this._projectInfos.name}`,
      install: `${this._projectInfos.packageManager} install`,
    }

    return new Promise((resolve, reject) => {
      spinn.start()

      this.exec(commands.downFolder + ' && ' + commands.install,
        (err: execProcess.ExecFileOptions, stdout: execProcess.ExecFileOptions) => {
          if (err) {
            spinn.fail()
            reject(err)
          } else {
            spinn.done()
            resolve(stdout)
          }

        })
    })
  }
  private _finalInstructions() {
    const manager = this._projectInfos.packageManager.toLowerCase() === 'npm'
      ? 'npm run'
      : this._projectInfos.packageManager
    return `\nSiga as seguintes instruções:
1. Navegue para a pasta do projeto: 'cd ${this._projectInfos.name}'
2. Suba o servidor com o comando: '${manager} server'\n\n`
  }

  private _removeFolder() {
    fs.remove(this._projectInfos.projectPath)
  }
}

