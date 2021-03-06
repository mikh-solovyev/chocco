const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' )
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( 'docs/**', { read: false }).pipe(rm());
});

task('copy:html', () => {
    return src("src/*.html").pipe(dest('docs')).pipe(reload({stream: true}));
});

task('copy:image', () => {
    return src("src/images/**").pipe(dest('docs/images/')).pipe(reload({stream: true}));
});

task('copy:video', () => {
    return src("src/video/*").pipe(dest('docs/video/')).pipe(reload({stream: true}));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/css/main.scss'
];

task('styles', () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(gulpif(env === 'prod', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('docs/css/'))
        .pipe(reload({stream: true}));
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bxslider-ncl/dist/jquery.bxslider.js',
    'node_modules/mobile-detect/mobile-detect.js',
    'src/js/*.js'
];

task('scripts', () => {
    return src(libs)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('docs/js/'))
        .pipe(reload({stream: true}));

});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./docs"
        },
        //open: false
    });
});


task("watch", () => {
    watch('./src/css/**/*.scss', series('styles'));
    watch('./src/js/*.js', series('scripts'));
    watch('./src/*.html', series('copy:html'));
});

task(
    'default',
    series('clean',
        parallel('copy:html', 'copy:image', 'copy:video', 'styles', 'scripts'),
        parallel('watch', 'server')
    )
);

task(
    'build',
    series('clean', parallel('copy:html', 'copy:image', 'copy:video', 'styles', 'scripts'))
);
