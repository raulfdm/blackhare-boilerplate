"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const path = require('path');
const package_json_js_1 = require("./package.json.js");
const buildTasks_1 = require("./buildTasks");
const Log_1 = require("../helpers/Log");
const Spinner_1 = require("../helpers/Spinner");
const UX_TIME_WAIT = 600;
const copyBoilerplate = (projectInfos) => {
    const logs = new Log_1.default();
    const completeProjectInfos = getPaths(projectInfos);
    copyFolder(completeProjectInfos)
        .then(generatePackageJson)
        .then(buildTasks_1.installDependencies)
        .then(() => {
        logs.success('Projeto criado com sucesso!');
        logs.log(finalInstructions(projectInfos));
    })
        .catch(err => {
        logs.errorTrace(err);
        removeFolder(projectInfos.projectRoot);
    });
};
const finalInstructions = (infos) => {
    return `Siga as seguintes instruções:
1. Navegue para a pasta do projeto: $ cd ${infos.name}
2. Suba o servidor com o comando: $ ${infos.package_manager.toLowerCase() == 'npm' ? 'npm run' : infos.package_manager} server`;
};
const getPaths = (projectInformations) => {
    let newInfos = Object.assign({}, projectInformations);
    newInfos.mirrorPath = path.join(__dirname, '../../boilerplate');
    newInfos.projectRoot =
        `${process.cwd()}/${projectInformations.name}`;
    return newInfos;
};
const removeFolder = (path) => {
    fs.remove(path);
};
const copyFolder = (projectInfos) => {
    const spin = new Spinner_1.default({
        startMessage: 'Gerando os arquivos...',
        successMessage: 'Arquivos gerados com sucesso!',
        failureMessage: 'Erro ao gerar os arquivos!'
    });
    spin.start();
    return new Promise((resolve, reject) => {
        fs
            .copy(projectInfos.mirrorPath, projectInfos.projectRoot)
            .then(() => {
            setTimeout(() => {
                spin.done();
                resolve(projectInfos);
            }, UX_TIME_WAIT);
        })
            .catch((err) => {
            setTimeout(() => {
                spin.fail();
                reject(err);
            }, UX_TIME_WAIT);
        });
    });
};
const generatePackageJson = (projectInfos) => {
    const spin = new Spinner_1.default({
        startMessage: 'Gerando o package.json...',
        successMessage: 'Package.json gerado com sucesso!',
        failureMessage: 'Erro ao gerar o package.json'
    });
    spin.start();
    return new Promise((resolve, reject) => {
        package_json_js_1.default(projectInfos)
            .then(newInfos => {
            setTimeout(() => {
                spin.done();
                resolve(newInfos);
            }, UX_TIME_WAIT);
        })
            .catch(err => {
            setTimeout(() => {
                spin.fail();
                reject(err);
            }, UX_TIME_WAIT);
        });
    });
};
exports.default = copyBoilerplate;
