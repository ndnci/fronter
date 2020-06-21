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

// SETTINGS
const settings = {
    pathDev: './assets',
    pathBuild: './build'
};

// OPTIONS
const options = {
    // CSS
    css: {
        active: true,
        src: settings.pathDev + '/css/**/*.css',
        concat: 'index.css',
        dest: settings.pathBuild + '/css'
    },
    // SASS
    sass: {
        active: true,
        src: settings.pathDev + '/scss/**/*.scss',
        concat: 'index.css',
        dest: settings.pathBuild + '/scss'
    },
    // JAVASCRIPT
    javascript: {
        active: true,
        src: settings.pathDev + '/js/**/*.js',
        concat: 'index.js',
        dest: settings.pathBuild + '/js'
    },
    // TYPESCRIPT
    typescript: {
        active: true,
        src: settings.pathDev + '/ts/**/*.ts',
        concat: 'index.js',
        dest: settings.pathBuild + '/ts',
        options: {
        // typescript options here
        }
    },
    // AUTOPREFIXER
    autoprefixer: {
        active: true,
        overrideBrowserslist: ['last 10 versions']
    },
    // BABEL
    babel: {
        active: true,
        presets: ['@babel/env']
    },
    // BROWSER SYNC
    browserSync: {
        active: false,
        baseDir: './',
        watch: './**/*.html'
    },
    // OTHER PLUGINS
    sourceMaps: {
        active: true,
    },
    cleanCSS: {
        active: true,
    },
    uglify: {
        active: true,
    },
    concat: {
        active: true,
    },
    rev: {
        active: true,
    },
    del: {
        active: true,
    },
};

// css files compiler
function _css(done) {

    if(options.css.active) {
    // 1. where is css files
        const gulpCss = gulp.src(options.css.src);
    // 2 init sourcemaps
        if(options.sourceMaps.active)   gulpCss.pipe(sourcemaps.init());
    // 2.1.1 autoprefixer filter
        if(options.autoprefixer.active)   gulpCss.pipe(autoprefixer(options.autoprefixer));
    // 2.2 concat files with custom name
        if(options.concat.active)   gulpCss.pipe(concat(options.css.concat));
    // 2.2.1 minify
        if(options.cleanCSS.active)   gulpCss.pipe(cleanCSS());
    // 2.3 write sourcemaps file
        if(options.sourceMaps.active)   gulpCss.pipe(sourcemaps.write());
    // 2.4 add random hash to filename
        if(options.rev.active)   gulpCss.pipe(rev());
    // 3. where do i save the compiled CSS ?
        gulpCss.pipe(gulp.dest(options.css.dest));
    // 4. stream changes to all browser
        if(options.browserSync.active)   gulpCss.pipe(browserSync.stream());
    }

        done();
};

// sass files compiler
function _scss(done) {

    if(options.sass.active) {
    // 1. where is scss files
        const gulpScss = gulp.src(options.sass.src);
    // 2 init sourcemaps
        if(options.sourceMaps.active)   gulpScss.pipe(sourcemaps.init());
    // 2.1 pass that file through sass compiler
        gulpScss.pipe(sass());
    // 2.1.1 autoprefixer filter
        if(options.autoprefixer.active)    gulpScss.pipe(autoprefixer(options.autoprefixer));
    // 2.2 concat files with custom name
        if(options.concat.active)   gulpScss.pipe(concat(options.sass.concat));
    // 2.2.1 minify
        if(options.cleanCSS.active)    gulpScss.pipe(cleanCSS());
    // 2.3 write sourcemaps file
        if(options.sourceMaps.active)   gulpScss.pipe(sourcemaps.write());
    // 2.4 add random hash to filename
        if(options.rev.active)    gulpScss.pipe(rev());
    // 3. where do i save the compiled CSS ?
        gulpScss.pipe(gulp.dest(options.sass.dest));
    // 4. stream changes to all browser
        if(options.browserSync.active)    gulpScss.pipe(browserSync.stream());
    }

        done();
};

// javascript files compiler
function _js(done) {

    if(options.javascript.active) {
    // 1. where is js files
        const gulpJs = gulp.src(options.javascript.src);
    // 2 init sourcemaps
        if(options.sourceMaps.active)   gulpJs.pipe(sourcemaps.init());
    // 2.1 pass that file through babel compiler
        if(options.babel.active)   gulpJs.pipe(babel(options.babel));
    // 2.2 concat files with custom name
        if(options.concat.active)   gulpJs.pipe(concat(options.javascript.concat));
    // 2.2.1 minify
        if(options.uglify.active)   gulpJs.pipe(uglify());
    // 2.3 write sourcemaps file
        if(options.sourceMaps.active)   gulpJs.pipe(sourcemaps.write());
    // 2.4 add random hash to filename
        if(options.rev.active)    gulpJs.pipe(rev());
    // 3. where do i save the compiled JS ?
        gulpJs.pipe(gulp.dest(options.javascript.dest));
    // 4. stream changes to all browser
        if(options.browserSync.active)    gulpJs.pipe(browserSync.stream());
    }

        done();
};

// typescript files compiler
function _ts(done) {

    if(options.typescript.active) {
    // 1. where is js files
        const gulpTs = gulp.src(options.typescript.src);
    // 2 init sourcemaps
        if(options.sourceMaps.active)   gulpTs.pipe(sourcemaps.init());
    // 2.1 pass that file through typescript compiler
        gulpTs.pipe(typescript(options.typescript.options));
    // 2.1.1 pass that file through babel compiler
        if(options.babel.active)    gulpTs.pipe(babel(options.babel));
    // 2.2 concat files with custom name
        if(options.concat.active)   gulpTs.pipe(concat(options.typescript.concat));
    // 2.2.1 minify
        if(options.uglify.active)   gulpTs.pipe(uglify());
    // 2.3 write sourcemaps file
        if(options.sourceMaps.active)   gulpTs.pipe(sourcemaps.write());
    // 2.4 add random hash to filename
        if(options.rev.active)  gulpTs.pipe(rev());
    // 3. where do i save the compiled JS ?
        gulpTs.pipe(gulp.dest(options.typescript.dest));
    // 4. stream changes to all browser
        if(options.browserSync.active)  gulpTs.pipe(browserSync.stream());
    }

        done();
};

// delete all build files
function _clearBuildFiles(done) {

    if(options.del.active) {
        // we need to delete all sub build folders
        // and keep build folder, if not we have an error
        del([`${settings.pathBuild}/**`, `!${settings.pathBuild}`]);
    }

    done();
}

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

    // listening all css files
    if(options.css.active)  gulp.watch(options.css.src, _css);
    // listening all scss files
    if(options.sass.active)  gulp.watch(options.sass.src, _scss);
    // listening all js files
    if(options.javascript.active)  gulp.watch(options.javascript.src, _js);
    // listening all ts files
    if(options.typescript.active)  gulp.watch(options.typescript.src, _ts);

    done();
};

// default gulp function for using only "gulp" on terminal
exports.default = gulp.series(_clearBuildFiles, _css, _scss, _js, _ts);
exports.watch = _watch;
exports.clear = _clearBuildFiles;