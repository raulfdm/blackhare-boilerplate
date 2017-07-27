import fs = require('fs-extra')
import Beautify = require('js-beautify')

const beautify = Beautify.js_beautify

const packageJsonCreate = (projectInfos: any) => {

  /* tslint:disable:object-literal-sort-keys */
  const scripts = {
    yarn: {
      build: 'yarn run gulp build',
      deploy: 'yarn run gulp build && yarn run gulp ghpages',
      init: 'yarn install',
      server: 'yarn run build && yarn run gulp server',
    },
    npm: {
      build: 'npm run gulp build',
      deploy: 'npm run build && npm run gulp ghpages',
      gulp: 'gulp',
      server: 'npm run build && npm run gulp server',
    },
  }

  /* tslint:disable:object-literal-sort-keys */
  const packageContent = {
    name: projectInfos.name,
    version: projectInfos.version,
    main: 'index.js',
    scripts: projectInfos.package_manager.toLowerCase() === 'yarn' ?
      scripts.yarn :
      scripts.npm,
    devDependencies: {
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
      'unzip': '^0.1.11',
    },
    dependencies: {
      'reset.css': '^2.0.2',
    },
  }
  const packageJsonFormated = beautify(JSON.stringify(packageContent))

  return new Promise((resolve, reject) => {

    fs.writeFile(`${projectInfos.projectRoot}/package.json`, packageJsonFormated, (err: any) => {
      if (err) {
        reject(err)
      } else {
        const updatedInfos = Object.assign(projectInfos, {
          package_json: packageContent,
        })
        resolve(updatedInfos)
      }
    })
  })
}

export default packageJsonCreate
