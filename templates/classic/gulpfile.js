const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const typescript = require("gulp-typescript");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const rev = require("gulp-rev");
const del = require("del");

const browserify = require("browserify");
const glob = require("glob");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const es = require("event-stream");
const uglifyes = require("gulp-uglify-es").default;
const bcss = require("browserify-css");
const imagemin = require("gulp-imagemin");

// Config
const { gulpOptions, gulpSettings, gulpProcess } = require("./fronter");

// css files compiler
function _css(done) {
    // 1. where is css files
    gulp.src(gulpOptions.css.src)
        // 2 init sourcemaps
        // .pipe(sourcemaps.init())
        // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(gulpOptions.autoprefixer))
        // 2.2 concat files with custom name
        // .pipe(concat(gulpOptions.css.concat))
        // 2.2.1 minify
        .pipe(cleanCSS())
        // 2.3 write sourcemaps file
        // .pipe(sourcemaps.write())
        // 2.4 add random hash to filename
        // .pipe(rev())
        // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(gulpOptions.css.dest))
        // 4. stream changes to all browser
        .pipe(browserSync.stream());

    done();
}

// sass files compiler
function _scss(done) {
    // 1. where is scss files
    gulp.src(gulpOptions.sass.src)
        // 2 init sourcemaps
        // .pipe(sourcemaps.init())
        // 2.1 pass that file through sass compiler
        .pipe(sass())
        // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(gulpOptions.autoprefixer))
        // 2.2 concat files with custom name
        // .pipe(concat(gulpOptions.sass.concat))
        // 2.2.1 minify
        .pipe(cleanCSS())
        // 2.3 write sourcemaps file
        // .pipe(sourcemaps.write())
        // 2.4 add random hash to filename
        // .pipe(rev())
        // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest(gulpOptions.sass.dest))
        // 4. stream changes to all browser
        .pipe(browserSync.stream());

    done();
}

// javascript files compiler
function _js(done) {
    // 1. where is js files
    gulp.src(gulpOptions.javascript.src)
        // 2 init sourcemaps
        // .pipe(sourcemaps.init())
        // 2.1 pass that file through babel compiler
        .pipe(babel(gulpOptions.babel))
        // 2.2 concat files with custom name
        // .pipe(concat(gulpOptions.javascript.concat))
        // 2.2.1 minify
        .pipe(uglify())
        // 2.3 write sourcemaps file
        // .pipe(sourcemaps.write())
        // 2.4 add random hash to filename
        // .pipe(rev())
        // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(gulpOptions.javascript.dest))
        // 4. stream changes to all browser
        .pipe(browserSync.stream());

    done();
}

// typescript files compiler
function _ts(done) {
    // 1. where is js files
    gulp.src(gulpOptions.typescript.src)
        // 2 init sourcemaps
        // .pipe(sourcemaps.init())
        // 2.1 pass that file through typescript compiler
        .pipe(typescript(gulpOptions.typescript.options))
        // 2.1.1 pass that file through babel compiler
        .pipe(babel(gulpOptions.babel))
        // 2.2 concat files with custom name
        // .pipe(concat(gulpOptions.typescript.concat))
        // 2.2.1 minify
        .pipe(uglify())
        // 2.3 write sourcemaps file
        // .pipe(sourcemaps.write())
        // 2.4 add random hash to filename
        // .pipe(rev())
        // 3. where do i save the compiled JS ?
        .pipe(gulp.dest(gulpOptions.typescript.dest))
        // 4. stream changes to all browser
        .pipe(browserSync.stream());

    done();
}

// image optimization
function _img(done) {
    gulp.src(gulpOptions.img.src).pipe(imagemin()).pipe(gulp.dest(gulpOptions.img.dest));

    done();
}

function _copy(done) {
    gulp.src(gulpOptions.vendor_js.src).pipe(gulp.dest(gulpOptions.vendor_js.dest));

    gulp.src(gulpOptions.vendor_css.src).pipe(gulp.dest(gulpOptions.vendor_css.dest));

    done();
}

// delete all build files
async function _clearBuildFiles(done) {
    // we need to delete all sub build folders
    // and keep build folder, if not we have an error
    await del([`${gulpSettings.pathBuild}/**`, `!${gulpSettings.pathBuild}`]);
    done();
}

// browserify for external packages
function _browserify(done) {
    glob(gulpOptions.browserify.src, (err, files) => {
        if (err) {
            done(err);
        }

        const tasks = files.map((entry) => {
            const b = browserify({
                entries: [entry],
                extensions: [".js"],
            })
                .transform(bcss, {
                    global: true,
                    autoInject: true,
                    autoInjectOptions: {
                        verbose: false,
                    },
                    minify: true,
                    inlineImages: true,
                })
                .transform("babelify", { presets: ["@babel/preset-env"] });

            const bundle = () => {
                return b
                    .bundle()
                    .pipe(source(entry))
                    .pipe(buffer())
                    .pipe(uglifyes())
                    .pipe(gulp.dest(gulpSettings.pathBuild));
            };

            b.on("update", bundle);

            return bundle();
        });

        es.merge(tasks).on("end", done);
    });

    done();
}

// during gulp process
function _process(done) {
    // export files from array
    // to the same name in the build path
    if (gulpProcess.exportBulk) {
        gulp.src(gulpProcess.exportBulk).pipe(gulp.dest(gulpSettings.pathBuild));
    }

    // export specifically files from src to dest
    if (gulpProcess.export) {
        gulpProcess.export.forEach((exportArray) => {
            gulp.src(exportArray.src).pipe(gulp.dest(exportArray.dest));
        });
    }

    done();
}

// gulp watcher
function _watch(done) {
    if (gulpOptions.browserSync.active) {
        // if browserSync is activated
        browserSync.init({
            server: {
                baseDir: gulpOptions.browserSync.baseDir,
            },
        });

        // listening specific files directory
        gulp.watch(gulpOptions.browserSync.watch).on("change", browserSync.reload);
    }

    // listening all scss files
    gulp.watch(gulpOptions.sass.src, _scss);
    // listening all js files
    gulp.watch(gulpOptions.javascript.src, _js);

    done();
}

// default gulp function for using only "gulp" on terminal
exports.default = gulp.series(_clearBuildFiles, _css, _scss, _js, _ts, _img, _copy, _browserify, _process);
exports.watch = _watch;
exports.clear = _clearBuildFiles;
