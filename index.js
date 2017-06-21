#!/usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')

const createProject = require('./src/createProject')


const currentVersion = fs.readJsonSync(`${__dirname}/package.json`).version

program
  .version(currentVersion)

program
  .command('new')
  .alias('-n')
  .description('Create a new project from scratch')
  .action(createProject)

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
