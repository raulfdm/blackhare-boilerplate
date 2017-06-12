const fs = require('fs-extra')
const path = require('path')

const folders = {
    folders: [
        '/css',
        '/css/modules/',
        '/img',
        '/js',
        '/includes',
        '/template',
        '/vendor'
    ],
    create() {
        return new Promise((resolve, reject) =>{
            resolve(this.iterateFolders(fs.ensureDirSync))
        })
    },
    remove() {
        this.iterateFolders(fs.removeSync)
    },
    iterateFolders(action){
        this.folders.forEach(folder => action(__dirname + folder))
    }
}



module.exports = folders