// SETTINGS
const gulpSettings = {
    pathDev: "./assets",
    pathVendor: "./vendor",
    pathBuild: "./build",
};

// OPTIONS
const gulpOptions = {
    // CSS
    css: {
        active: true,
        src: gulpSettings.pathDev + "/css/**/*.css",
        concat: "index.css",
        dest: gulpSettings.pathBuild + "/css",
    },
    // SASS
    sass: {
        active: true,
        src: gulpSettings.pathDev + "/scss/**/*.scss",
        concat: "index.css",
        dest: gulpSettings.pathBuild + "/css",
    },
    // JAVASCRIPT
    javascript: {
        active: true,
        src: gulpSettings.pathDev + "/js/**/*.js",
        concat: "index.js",
        dest: gulpSettings.pathBuild + "/js",
    },
    // TYPESCRIPT
    typescript: {
        active: true,
        src: gulpSettings.pathDev + "/ts/**/*.ts",
        concat: "index.js",
        dest: gulpSettings.pathBuild + "/js",
        options: {
            // typescript options here
        },
    },
    img: {
        src: gulpSettings.pathDev + "/img/**/*",
        dest: gulpSettings.pathBuild + "/img",
    },
    // AUTOPREFIXER
    autoprefixer: {
        overrideBrowserslist: ["last 10 versions"],
    },
    // BABEL
    babel: {
        presets: ["@babel/env"],
        ignore: ["node_modules", "vendor", "build"],
    },
    // BROWSER SYNC
    browserSync: {
        active: false,
        baseDir: "./",
        watch: "./**/*.html",
    },

    browserify: {
        src: gulpSettings.pathVendor + "/**/!(*.min)*.js",
    },
};

// PROCESS
const gulpProcess = {
    export: [
        {
            src: "./node_modules/mentorjs/build/*.js",
            dest: gulpSettings.pathBuild + "/vendor/mentorjs",
        },
    ],
};

module.exports = { gulpOptions, gulpSettings, gulpProcess };
