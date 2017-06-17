const fs = require('fs-extra')
const chalk = require('chalk')

const packageJson = require('./tasks/package.json')
const executeBuild = require('./tasks/build-task')

const copyBoilerplate = projectInfos => {
    const mirrorPath = `${__dirname}/mirror`
    const projectName = projectInfos.project.name

    const newFolderPath = `${process.cwd()}/${projectName}`

    fs
        .copy(mirrorPath, newFolderPath)
        .then(() => {
            packageJson(projectInfos.project, newFolderPath).then(packageJsonInfos => {
                const scriptServer = JSON
                    .parse(packageJsonInfos)
                    .scripts
                    .server

                executeBuild(projectInfos.project['package-manager'],newFolderPath)
                    .then(success => console.log('Projeto criado com sucesso',success))
                    .catch(err => {
                        throw new Error(err)
                    })
            })

        })
        .catch(err => {
            console.log(chalk.red(err))
            fs.remove(newFolderPath)
        })

}

module.exports = copyBoilerplate