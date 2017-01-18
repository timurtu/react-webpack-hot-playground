const gulp = require('gulp')
const babel = require('gulp-babel')
const Promise = require('bluebird')
const rimrafAsync = Promise.promisify(require('rimraf'))
const mocha = require('gulp-mocha')

const paths = {
  all: 'src/**/*',
  dist: 'dist'
}

gulp.task('clean', () => rimrafAsync(paths.dist))

gulp.task('copy', ['clean'], () => gulp.src(`${paths.all}.html`)
  .pipe(gulp.dest(paths.dist)))

gulp.task('transpile', ['clean'], () => gulp.src(`${paths.all}.js`)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest(paths.dist)))

gulp.task('test', ['build'], () => gulp.src(`${paths.dist}/test/**/*.js`, { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha())
    .on('error', () => {})
)

gulp.task('build', ['copy', 'transpile'])

gulp.task('watch', () => gulp.watch(paths.all, ['test']))
