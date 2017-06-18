const fs = require('fs-extra')
const chalk = require('chalk')

const packageJson = require('./package.json')
/*const executeBuild = require('./build-task')*/
const Spinner = require('../helpers/spinners')

const copyBoilerplate = projectInfos => {

  const completeProjectInfos = Object.assign({}, projectInfos)

  completeProjectInfos.mirrorPath = `${__dirname}/mirror`
  completeProjectInfos.projectName = projectInfos.name
  completeProjectInfos.newFolderPath = `${process.cwd()}/${completeProjectInfos.projectName}`

  copyFolder(completeProjectInfos)
    .then(generatePackageJson)
    .catch(err => {
      console.log(chalk.red(err))
      fs.remove(projectInfos.newFolderPath)
    })
}

const copyFolder = (projectInfos) => {
  return new Promise((resolve, reject) => {
    const spin = new Spinner({
      startMessage: 'Gerando os arquivos...',
      successMessage: 'Arquivos gerados com sucesso!',
      failureMessage: 'Erro ao gerar os arquivos!'
    })
    spin.start()

    fs
      .copy(projectInfos.mirrorPath, projectInfos.newFolderPath)
      .then(() => {
        setTimeout(() => {
          spin.done()
          resolve(projectInfos)
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          spin.fail()
          reject(err)
        }, 1000)
      })
  })
}

const generatePackageJson = (projectInfos) => {
  new Promise((resolve, reject) => {
    const spin = new Spinner({
      startMessage: 'Gerando o package.json...',
      successMessage: 'Package.json gerado com sucesso!',
      failureMessage: 'Erro ao gerar o package.json'
    })

    spin.start()
    packageJson(projectInfos)
      .then(() => {
        setTimeout(() => {
          spin.done()
          resolve(true)
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          spin.fail()
          reject(err)
        }, 1000)
      })
  })
}

module.exports = copyBoilerplate
