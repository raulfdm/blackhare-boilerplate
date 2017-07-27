import fs = require('fs-extra')
import PackageJsonModel from '../models/PackageJsonModel'
import ProjectInfosModel from '../models/ProjectInfosModel'


const packageJsonCreate = (projectInfos: ProjectInfosModel) => {

  /* tslint:disable:object-literal-sort-keys */
  const scripts = projectInfos.packageManager.toLocaleLowerCase() === 'yarn'
    ? {
      build: 'yarn run gulp build',
      deploy: 'yarn run gulp build && yarn run gulp ghpages',
      init: 'yarn install',
      server: 'yarn run build && yarn run gulp server',
    }
    : {
      build: 'npm run gulp build',
      deploy: 'npm run build && npm run gulp ghpages',
      gulp: 'gulp',
      server: 'npm run build && npm run gulp server',
    }


  const devDependencies = {
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
  }

  const dependencies = {
    'reset.css': '^2.0.2',
  }

  const packageJson = new PackageJsonModel(
    projectInfos.name,
    projectInfos.version,
    dependencies,
    devDependencies)



  return new Promise((resolve, reject) => {
    fs.writeFile(packageJson.pathFile(projectInfos.projectPath), packageJson.getFormated,
      (err: fs.WriteOptions) => {
        if (err) {
          reject(err)
        } else {
          resolve([packageJson])
        }
      })
  })
}

export default packageJsonCreate
