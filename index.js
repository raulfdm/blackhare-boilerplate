#!/usr/bin/env node

const fs = require('fs-extra')
const program = require('commander')

const criar = require('./src/criar')

program
    .version('0.0.1')
    .option('-l, --list [list]', 'Listar as opções')
    .option('-c, --create [file]', 'Criar um novo arquivo')
    .option('-n, --new [file]', 'Criar um novo projeto')

program
    .command('new')
    .alias('-n')
    .description('create a new project based on boilerplate')
    .action((env, options) => {
        criar()
    });

program.parse(process.argv);

const copyMirror = (folderName) => {
    fs
        .copy('./src/mirror/', `./${folderName}/`)
        .then(succ => console.log('success'))
        .catch(err => console.log('Err', err))
}