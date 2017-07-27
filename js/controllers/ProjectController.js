"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const beautify = require('js-beautify');
const Log_1 = require("../helpers/Log");
const copyBoilerplate_1 = require("../tasks/copyBoilerplate");
class PorjectController {
    constructor() {
        this.logs = new Log_1.default();
        this._confirmProjectInfos = (projectInfos) => {
            this.logs.info(this._formatProjectInfos(projectInfos));
            const question = [{
                    type: 'confirm',
                    name: 'confirmation',
                    default: 'Y',
                    message: 'As informações acima estão corretas?'
                }];
            return inquirer.prompt(question);
        };
        this._formatProjectInfos = (json) => `\n${beautify(JSON.stringify(json))}\n`;
    }
    bootstrap() {
        inquirer
            .prompt(this._initialQuestions())
            .then((projectInfos) => {
            this._confirmProjectInfos(projectInfos).then((cb) => {
                if (cb.confirmation) {
                    copyBoilerplate_1.default(projectInfos.project);
                }
                else {
                    process.exit();
                }
            });
        });
    }
    _initialQuestions() {
        return [{
                type: 'input',
                name: 'project.name',
                default: 'my-project',
                message: 'Qual o nome do seu projet?',
                validate(input) {
                    if (input.length < 3) {
                        this.logs.error('\nNome precisa ter no mínimo 3 caracteres!');
                    }
                    else {
                        return true;
                    }
                },
                filter(projectName) {
                    return projectName
                        .toLowerCase()
                        .replace(/s/g, '-');
                }
            }, {
                type: 'input',
                name: 'project.version',
                default: '0.0.1',
                message: 'Informe a versão:',
                validate(input) {
                    if (/\d\.\d\.\d/g.test(input)) {
                        return true;
                    }
                    else {
                        this.logs.error('Máscara de versão incorreta! Tente x.x.x');
                    }
                }
            }, {
                type: 'list',
                name: 'project.package_manager',
                message: 'Escolha o gerenciador de dependencias',
                default: 'yarn',
                choices: [
                    'npm', 'yarn'
                ],
            }];
    }
}
exports.default = PorjectController;
