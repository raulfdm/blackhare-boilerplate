#!/usr/bin/env node

import * as fs from 'fs-extra'
import createProject from './createProject'
const program = require('commander')

const currentVersion = fs.readJsonSync(`${__dirname}/../package.json`).version

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
