var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    uglify     = require('gulp-uglify'),
    tap        = require('gulp-tap'),
    sourcemaps = require("gulp-sourcemaps"),
    buffer     = require("gulp-buffer"),
    browserify = require('browserify'),
    del        = require('del'),
    gulpNSP    = require('gulp-nsp');



var DEST = './dist/'

/**
    Lint the JS code
**/
function lint () {
    return gulp.src(['iota-browser.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}

/**
    Remove existing dist folder
**/
function clean (cb) {
    return del([DEST]).then(cb.bind(null, null))
}

//To check your package.json
function nsp (cb) {
    return gulpNSP({package: __dirname + '/package.json'}, cb)
}

/**
    Build for the browser
**/
function dist () {
    return gulp.src(['iota-browser.js'], { read: false })
        .pipe(tap(function (file) {
            console.log('bundling ' + file.path)
            file.contents = browserify(file.path, { debug: true }).bundle()
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
}

var build = gulp.series(lint, clean, nsp, dist)

gulp.task('build', build)

gulp.task('default', build)
