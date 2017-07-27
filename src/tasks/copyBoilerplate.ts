import { installDependencies } from './buildTasks'
import fs = require('fs-extra')
import Log from '../helpers/Log'
import path = require('path')
import Spinner from '../helpers/Spinner'
import packageJson from './package.json.js'

const UX_TIME_WAIT = 600

const copyBoilerplate = (projectInfos: any) => {
  const logs = new Log()
  const completeProjectInfos = getPaths(projectInfos)

  copyFolder(completeProjectInfos)
    .then(generatePackageJson)
    .then(installDependencies)
    .then(() => {
      logs.success('Projeto criado com sucesso!')
      logs.log(finalInstructions(projectInfos))
    })
    .catch((err: any) => {
      logs.errorTrace(err)
      removeFolder(projectInfos.projectRoot)
    })
}

const finalInstructions = (infos: any) => {
  const manager = infos.package_manager.toLowerCase() === 'npm'
    ? 'npm run'
    : infos.package_manager
  return `\nSiga as seguintes instruções:
1. Navegue para a pasta do projeto: 'cd ${infos.name}'
2. Suba o servidor com o comando: '${manager} server'\n\n`
}

const getPaths = (projectInformations: any) => {
  const newInfos = Object.assign({}, projectInformations)

  newInfos.mirrorPath = path.join(__dirname, '../../boilerplate')

  newInfos.projectRoot =
    `${process.cwd()}/${projectInformations.name}`
  return newInfos
}

const removeFolder = (rootPath: string) => {
  fs.remove(rootPath)
}

const copyFolder = (projectInfos: any) => {
  const spin = new Spinner({
    failureMessage: 'Erro ao gerar os arquivos!',
    startMessage: 'Gerando os arquivos...',
    successMessage: 'Arquivos gerados com sucesso!',
  })
  spin.start()

  return new Promise((resolve, reject) => {
    fs
      .copy(projectInfos.mirrorPath, projectInfos.projectRoot)
      .then(() => {
        setTimeout(() => {
          spin.done()
          resolve(projectInfos)
        }, UX_TIME_WAIT)
      })
      .catch((err: any) => {
        setTimeout(() => {
          spin.fail()
          reject(err)
        }, UX_TIME_WAIT)
      })
  })
}

const generatePackageJson = (projectInfos: any) => {
  const spin = new Spinner({
    failureMessage: 'Erro ao gerar o package.json',
    startMessage: 'Gerando o package.json...',
    successMessage: 'Package.json gerado com sucesso!',
  })

  spin.start()

  return new Promise((resolve, reject) => {
    packageJson(projectInfos)
      .then((newInfos: any) => {
        setTimeout(() => {
          spin.done()
          resolve(newInfos)
        }, UX_TIME_WAIT)
      })
      .catch((err: any) => {
        setTimeout(() => {
          spin.fail()
          reject(err)
        }, UX_TIME_WAIT)
      })
  })
}

export default copyBoilerplate
