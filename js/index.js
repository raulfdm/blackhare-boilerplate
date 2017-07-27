#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectController_1 = require("./controllers/ProjectController");
const fs = require('fs-extra');
const program = require('commander');
const path = require('path');
const packageJsonRoot = path.join(__dirname, '../package.json');
const currentVersion = fs.readJsonSync(packageJsonRoot).version;
program
    .version(currentVersion);
const project = new ProjectController_1.default();
program
    .command('new')
    .alias('-n')
    .description('Create a new project from scratch')
    .action(project.bootstrap.bind(project));
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
