"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const beautify = require('js-beautify').js_beautify;
const packageJsonCreate = (projectInfos) => {
    const scripts = {
        yarn: {
            init: 'yarn install',
            build: 'yarn run gulp build',
            server: 'yarn run build && yarn run gulp server',
            deploy: 'yarn run gulp build && yarn run gulp ghpages'
        },
        npm: {
            gulp: 'gulp',
            build: 'npm run gulp build',
            server: 'npm run build && npm run gulp server',
            deploy: 'npm run build && npm run gulp ghpages'
        }
    };
    const packageContent = {
        'name': projectInfos.name,
        'version': projectInfos.version,
        'main': 'index.js',
        'scripts': projectInfos.package_manager.toLowerCase() === 'yarn' ?
            scripts.yarn :
            scripts.npm,
        'devDependencies': {
            'autoprefixer': '^7.1.1',
            'babel-preset-es2015': '^6.24.1',
            'browser-sync': '^2.18.12',
            'gulp': '^3.9.1',
            'gulp-babel': '^6.1.2',
            'gulp-clean': '^0.3.2',
            'gulp-concat': '^2.6.1',
            'gulp-cssnano': '^2.1.2',
            'gulp-gh-pages': '^0.5.4',
            'gulp-imagemin': '^3.3.0',
            'gulp-jsmin': '^0.1.5',
            'gulp-postcss': '^7.0.0',
            'gulp-pug': '^3.3.0',
            'gulp-rename': '^1.2.2',
            'gulp-sourcemaps': '^2.6.0',
            'postcss-import': '^10.0.0',
            'unzip': '^0.1.11'
        },
        'dependencies': {
            'reset.css': '^2.0.2'
        }
    };
    const packageJsonFormated = beautify(JSON.stringify(packageContent));
    return new Promise((resolve, reject) => {
        fs.writeFile(`${projectInfos.projectRoot}/package.json`, packageJsonFormated, (err) => {
            if (err)
                reject(err);
            else {
                const updatedInfos = Object.assign(projectInfos, {
                    package_json: packageContent
                });
                resolve(updatedInfos);
            }
        });
    });
};
exports.default = packageJsonCreate;
