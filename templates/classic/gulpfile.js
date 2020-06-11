const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

// OPTIONS
const options = {
    // CSS
    css: {
        src: './assets/css/**/*.css',
        concat: 'index.css',
        dest: './build/css'
    },
    // SASS
    sass: {
        src: './assets/scss/**/*.scss',
        concat: 'index.css',
        dest: './build/scss'
    },
    // JAVASCRIPT
    javascript: {
        src: './assets/js/**/*.js',
        concat: 'index.js',
        dest: './build/js'
    },
    // TYPESCRIPT
    typescript: {
        src: './assets/ts/**/*.ts',
        concat: 'index.js',
        dest: './build/ts',
        options: {
        // typescript options here
        }
    },
    // AUTOPREFIXER
    autoprefixer: {
        overrideBrowserslist: ['last 10 versions']
    },
    // BABEL
    babel: {
        presets: ['@babel/env']
    },
    // BROWSER SYNC
    browserSync: {
        active: false,
        baseDir: './',
        watch: './**/*.html'
    }
};

// css files compiler
function _css(done) {
    // 1. where is css files
        gulp.src(options.css.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(options.autoprefixer))
    // 2.2 concat files with custom name
        .pipe(concat(options.css.concat))
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(options.css.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// sass files compiler
function _scss(done) {
    // 1. where is scss files
        gulp.src(options.sass.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through sass compiler
        .pipe(sass())
    // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(options.autoprefixer))
    // 2.2 concat files with custom name
        .pipe(concat(options.sass.concat))
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(options.sass.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// javascript files compiler
function _js(done) {
    // 1. where is js files
    gulp.src(options.javascript.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through babel compiler
        .pipe(babel(options.babel))
    // 2.2 concat files with custom name
        .pipe(concat(options.javascript.concat))
    // 2.2.1 minify
        .pipe(uglify())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(options.javascript.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// typescript files compiler
function _ts(done) {
    // 1. where is js files
    gulp.src(options.typescript.src)
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through typescript compiler
        .pipe(typescript(options.typescript.options))
    // 2.1.1 pass that file through babel compiler
        .pipe(babel(options.babel))
    // 2.2 concat files with custom name
        .pipe(concat(options.typescript.concat))
    // 2.2.1 minify
        .pipe(uglify())
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(options.typescript.dest))
    // 4. stream changes to all browser
        .pipe(browserSync.stream())

        done();
};

// gulp watcher
function _watch(done) {

    if(options.browserSync.active) {

        // if browserSync is activated
        browserSync.init({
            server: {
                baseDir: options.browserSync.baseDir
            }
        });

        // listening specific files directory
        gulp.watch(options.browserSync.watch).on('change', browserSync.reload);
    }

    // listening all scss files
    gulp.watch(options.sass.src, _scss);
    // listening all js files
    gulp.watch(options.javascript.src, _js);

    done();
};

// default gulp function for using only "gulp" on terminal
exports.default = gulp.series(_css, _scss, _js, _ts);
exports.watch = _watch;