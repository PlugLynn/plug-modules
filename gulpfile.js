const gulp = require('gulp');
const babel = require('gulp-babel');
const generateMatchFiles = require('./tools/extract-matchers-files');

gulp.task('generate:imports', () => {
  // Sync :x
  generateMatchFiles();
});

gulp.task('build', ['generate:imports'], () =>
  gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: [
        ['es2015', { loose: true, modules: false }],
      ],
      plugins: [
        'transform-class-properties',
        'transform-export-extensions',
      ],
    }))
    .pipe(gulp.dest('./es'))
    .pipe(babel({
      plugins: ['transform-es2015-modules-commonjs'],
    }))
    .pipe(gulp.dest('./lib'))
);