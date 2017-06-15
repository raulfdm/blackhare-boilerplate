const fs = require('fs-extra')
const packageJson = require('./files/package.json')

const copyBoilerplate = projectInfos => {
    const mirrorPath = `${__dirname}/mirror`
    const projectName = projectInfos.project.name

    const newFolderPath = `${process.cwd()}/${projectName}`

    return fs
        .copy(mirrorPath, newFolderPath)
        .then(() => {
            packageJson(projectInfos.project, newFolderPath)
        })

}

module.exports = copyBoilerplate