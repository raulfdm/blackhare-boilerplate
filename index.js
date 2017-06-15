#!/usr/bin/env node

const fs = require('fs-extra')
const program = require('commander')

const createProject = require('./src/createProject')

const currentVersion = fs.readJsonSync('./package.json').version

program
    .version(currentVersion)
    .option('-n, --new [file]', 'New Project')

program
    .command('new')
    .alias('-n')
    .description('Create a new project from scratch')
    .action((env, options) => {
        createProject()
    });

program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp();
}