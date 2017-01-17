const gulp = require('gulp')
const babel = require('gulp-babel')
const Promise = require('bluebird')
const rimrafAsync = Promise.promisify(require('rimraf'))

const paths = {
  all: 'src/**/*',
  dist: 'dist'
}

gulp.task('clean', () => rimrafAsync(paths.dist))

gulp.task('copy', ['clean'], () => gulp.src(`${paths.all}.html`)
  .pipe(gulp.dest(paths.dist)))

gulp.task('transpile', ['clean'], () => gulp.src(`${paths.all}.js`)
  .pipe(babel())
  .pipe(gulp.dest(paths.dist)))

gulp.task('build', ['copy', 'transpile'])

gulp.task('watch', ['build'], () => gulp.watch(paths.all, ['build']))
