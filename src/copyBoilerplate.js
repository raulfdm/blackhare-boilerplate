const fs = require('fs-extra')

const copyBoilerplate = projectInfos => {
    const mirrorPath = `${__dirname}/mirror`
    const projectName = projectInfos.project.name
    
    const newFolderPath = `${process.cwd()}/${projectName}`
    
    return fs.copy(mirrorPath,newFolderPath)
}

module.exports = copyBoilerplate