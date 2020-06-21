const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const del = require('del');

// Config
const { gulpOptions, gulpSettings } = require('./fronter');

// css files compiler
function _css(done) {
    // 1. where is css files
        gulp.src(gulpOptions.css.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(gulpOptions.autoprefixer))
    // 2.2 concat files with custom name
        .pipe(concat(gulpOptions.css.concat))
    // 2.2.1 minify
        .pipe(cleanCSS())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 2.4 add random hash to filename
        .pipe(rev())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(gulpOptions.css.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// sass files compiler
function _scss(done) {
    // 1. where is scss files
        gulp.src(gulpOptions.sass.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through sass compiler
        .pipe(sass())
    // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(gulpOptions.autoprefixer))
    // 2.2 concat files with custom name
        .pipe(concat(gulpOptions.sass.concat))
    // 2.2.1 minify
        .pipe(cleanCSS())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 2.4 add random hash to filename
        .pipe(rev())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(gulpOptions.sass.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// javascript files compiler
function _js(done) {
    // 1. where is js files
    gulp.src(gulpOptions.javascript.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through babel compiler
        .pipe(babel(gulpOptions.babel))
    // 2.2 concat files with custom name
        .pipe(concat(gulpOptions.javascript.concat))
    // 2.2.1 minify
        .pipe(uglify())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 2.4 add random hash to filename
        .pipe(rev())
    // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(gulpOptions.javascript.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// typescript files compiler
function _ts(done) {
    // 1. where is js files
    gulp.src(gulpOptions.typescript.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through typescript compiler
        .pipe(typescript(gulpOptions.typescript.options))
    // 2.1.1 pass that file through babel compiler
        .pipe(babel(gulpOptions.babel))
    // 2.2 concat files with custom name
        .pipe(concat(gulpOptions.typescript.concat))
    // 2.2.1 minify
        .pipe(uglify())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 2.4 add random hash to filename
        .pipe(rev())
    // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(gulpOptions.typescript.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// delete all build files
function _clearBuildFiles(done) {
    // we need to delete all sub build folders
    // and keep build folder, if not we have an error
    del([`${gulpSettings.pathBuild}/**`, `!${gulpSettings.pathBuild}`]);
    done();
}

// gulp watcher
function _watch(done) {

    if(gulpOptions.browserSync.active) {

        // if browserSync is activated
        browserSync.init({
            server: {
                baseDir: gulpOptions.browserSync.baseDir
            }
        });

        // listening specific files directory
        gulp.watch(gulpOptions.browserSync.watch).on('change', browserSync.reload);
    }

    // listening all scss files
    gulp.watch(gulpOptions.sass.src, _scss);
    // listening all js files
    gulp.watch(gulpOptions.javascript.src, _js);

    done();
};

// default gulp function for using only "gulp" on terminal
exports.default = gulp.series(_clearBuildFiles, _css, _scss, _js, _ts);
exports.watch = _watch;
exports.clear = _clearBuildFiles;