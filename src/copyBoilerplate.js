const fs = require('fs-extra')
const packageJson = require('./files/package.json')
const chalk = require('chalk')

const copyBoilerplate = projectInfos => {
    const mirrorPath = `${__dirname}/mirror`
    const projectName = projectInfos.project.name

    const newFolderPath = `${process.cwd()}/${projectName}`

    fs
        .copy(mirrorPath, newFolderPath)
        .then(() => {
            packageJson(projectInfos.project, newFolderPath)
            console.log('Projeto criado com sucesso')
        })
        .catch(err => {
            console.log(chalk.red(err))
            fs.remove(newFolderPath)
        })

}

module.exports = copyBoilerplate