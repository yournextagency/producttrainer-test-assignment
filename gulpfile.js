//load dependecies
var gulp             = require('gulp'),
  autoprefixer     = require('autoprefixer'),
  notify           = require('gulp-notify'),
  plumber          = require('gulp-plumber'),
  postcss          = require('gulp-postcss'),
  sass             = require('gulp-sass'),
  sassLint         = require('gulp-sass-lint'),
  sourcemaps       = require('gulp-sourcemaps'),
  path             = require('path'),
  flexBugsFix      = require('postcss-flexbugs-fixes');

  //error notification settings for plumber
  var plumberErrorHandler = {
    errorHandler: notify.onError({
      title: 'There was some Error, I think...',
      message: "Error message: <%= error.message %>"
    })
  };

//styles
gulp.task('styles', function() {
  var processors = [
    autoprefixer({ browsers: ['last 3 versions', 'ios >= 6'] }),
    flexBugsFix
  ];
  return gulp.src(['scss/**/*.scss'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
    //.pipe(notify(notifySVG)); // uncomment this line if you want to see notifications when CSS is compiled
});

gulp.task('sasslint', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sassLint({
      config: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

//watch
gulp.task('default', function() {
  //watch .scss files
  gulp.watch('scss/**/*.scss', ['styles', 'sasslint']);
});
