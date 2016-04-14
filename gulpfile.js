var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');

gulp.task('browserify', function() {
  var browserifyBundler = browserify('./lib/index.js', {
    debug: false
  });

  return browserifyBundler.bundle()
    .pipe(source('codepicnic.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', [ 'browserify' ], function() {
  return gulp.src('./dist/codepicnic.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', [ 'dist' ]);