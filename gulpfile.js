var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.
    src(['test/testFsm.js']).
    pipe(mocha()).
    on('error', function() {
      this.emit('end');
    });
});

gulp.task('watch', function() {
  gulp.watch(['lib/*.js', 'test/*.js'], ['test']);
});
