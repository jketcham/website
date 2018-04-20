/* eslint-disable comma-dangle */
require('babel-register');
require('require-dir')('gulptasks');

const gulp = require('gulp');


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
      'assets',
      'less',
      'webpack:build'
    )
  )
);


gulp.task('watch', gulp.series(
  'clean',
  'less',
    gulp.parallel(
      'assets',
      'less:watch',
      'webpack-serve'
    )
  )
);
