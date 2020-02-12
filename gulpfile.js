// Load dependencies
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'There was some Error, I think...',
        message: "Error message: <%= error.message %>"
    })
};

// Build styles
gulp.task('styles', function () {
    var processors = [
        autoprefixer()
    ];
    return gulp.src(['scss/**/*.scss'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'));
});

// Watch
gulp.task('default', function () {
    //watch .scss files
    gulp.watch('scss/**/*.scss', gulp.series('styles'));
});
