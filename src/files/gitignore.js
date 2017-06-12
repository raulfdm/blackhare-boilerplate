const fs = require('fs-extra')
const path = require('path')

const gitIgnore = () => {
    const rootFolder = './.gitignore'
    const ignoreFolders = ['#folders','node_modules/','dist/','.publish/']
    
    const fileContent = getContent(ignoreFolders)

    fs
        .outputFile(rootFolder, fileContent)
        .catch(err => {
            throw new Error(err)
        })

}

const getContent = (array=[]) =>{
    return array.reduce((prev,current)=> prev+=`\n${current}`,"")
}

module.exports = gitIgnore();