const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const browser = require('browser-sync')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const cssNano = require('gulp-cssnano')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const imgmin = require('gulp-imagemin')
const jsmin = require('gulp-jsmin')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const sourceMaps = require('gulp-sourcemaps')

gulp.task('babel', () => {
  return gulp
  //You can define a sequence of scripts using array ([]) in bellow declaration
    .src('src/js/**/*.js')
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(jsmin())
    .pipe(concat('index.min.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['clean'], () => gulp.start(['babel', 'css', 'pug','img']))

gulp.task('css', () => {
  return gulp
    .src('src/css/index.css')
    .pipe(sourceMaps.init())
    .pipe(postcss([autoprefixer(), postImport()]))
    .pipe(cssNano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', () => gulp.src('dist/').pipe(clean()))

gulp.task('ghpages', () => gulp.src('./dist/**/*').pipe(ghPages()))

gulp.task('img', () => {
  gulp
    .src('src/img/**/*')
    .pipe(imgmin([]))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('pug', () => {
  return gulp
    .src('src/*.pug')
    .pipe(pug({pretty: false}))
    .pipe(gulp.dest('dist/'))
})

gulp.task('server', () => {
  //Init the server
  browser.init({
    server: {
      baseDir: 'dist',
      index: 'index.html'
    },
    //If you want to start in some especific path, write bellow
    /*startPath: '/cv'*/
  })

  //Listening changes
  gulp
    .watch('src/**/*.*', ['build'])
    .on('change', browser.reload)

})
