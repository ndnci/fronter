// SETTINGS
const gulpSettings = {
    pathDev: './assets',
    pathBuild: './build'
}

// OPTIONS
const gulpOptions = {
    // CSS
    css: {
        active: true,
        src: gulpSettings.pathDev + '/css/**/*.css',
        concat: 'index.css',
        dest: gulpSettings.pathBuild + '/css'
    },
    // SASS
    sass: {
        active: true,
        src: gulpSettings.pathDev + '/scss/**/*.scss',
        concat: 'index.css',
        dest: gulpSettings.pathBuild + '/scss'
    },
    // JAVASCRIPT
    javascript: {
        active: true,
        src: gulpSettings.pathDev + '/js/**/*.js',
        concat: 'index.js',
        dest: gulpSettings.pathBuild + '/js'
    },
    // TYPESCRIPT
    typescript: {
        active: true,
        src: gulpSettings.pathDev + '/ts/**/*.ts',
        concat: 'index.js',
        dest: gulpSettings.pathBuild + '/ts',
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
    }
}

module.exports = { gulpOptions, gulpSettings }