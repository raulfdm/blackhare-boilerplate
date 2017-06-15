#!/usr/bin/env node

const fs = require('fs-extra')
const program = require('commander')

const createProject = require('./src/createProject')

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
        createProject()
    });

program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp();
}