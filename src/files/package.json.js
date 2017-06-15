const fs = require('fs-extra')
const beautify = require('js-beautify').js_beautify

module.exports = packageJsonCreate = (projectInfos, path) => {

    const obj = {
        "name": projectInfos.name,
        "version": projectInfos.version,
        "main": "index.js",
        "scripts": {
            "build": "yarn gulp build",
            "server": "yarn build && yarn gulp server",
            "deploy": "yarn gulp build && yarn gulp ghpages"
        },
        "devDependencies": {
            "autoprefixer": "^7.1.1",
            "babel-preset-es2015": "^6.24.1",
            "browser-sync": "^2.18.12",
            "gulp": "^3.9.1",
            "gulp-babel": "^6.1.2",
            "gulp-clean": "^0.3.2",
            "gulp-concat": "^2.6.1",
            "gulp-cssnano": "^2.1.2",
            "gulp-gh-pages": "^0.5.4",
            "gulp-imagemin": "^3.3.0",
            "gulp-jsmin": "^0.1.5",
            "gulp-postcss": "^7.0.0",
            "gulp-pug": "^3.3.0",
            "gulp-rename": "^1.2.2",
            "gulp-sequence": "^0.4.6",
            "gulp-sourcemaps": "^2.6.0",
            "postcss-import": "^10.0.0",
            "unzip": "^0.1.11"
        },
        "dependencies": {
            "reset.css": "^2.0.2"
        }
    }

    return fs.writeFile(`${path}/package.json`, beautify(JSON.stringify(obj)))
}