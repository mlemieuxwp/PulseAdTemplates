/*=============================================
=            Gulp Starter by @dope            =
=============================================*/

/**
 *
 * The packages we are using
 * Not using gulp-load-plugins as it is nice to see whats here.
 *
 **/
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');

function swallowError() {
    console.log(err);
    this.emit('end');
}

/**
 *
 * Styles
 * - Compile
 * - Compress/Minify
 * - Catch errors (gulp-plumber)
 * - Autoprefixer
 *
 **/
gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(plumber(swallowError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('dist/css'));
});

/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:3000
 *
 **/
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/**/*.js', 'content/*.html', 'index.html'], {
        server: {
            baseDir: './'
        }
    });
});


/**
 *
 * Javascript
 * - Uglify
 *
 **/
gulp.task('scripts', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(rename({
            dirname: "min",
            suffix: ".min",
        }))
        .pipe(gulp.dest('js'))
        .pipe(gulp.dest('dist/js'));
});

/**
 *
 * Images
 * - Compress them!
 *
 **/
gulp.task('images', function() {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('content', function () {
    return gulp.src('content/*.html')
        .pipe(gulp.dest('dist/content'));
});

/**
 *
 * Default task
 * - Runs sass, browser-sync, scripts and image tasks
 * - Watchs for file changes for images, scripts and sass/css
 *
 **/
gulp.task('default', ['sass', 'browser-sync', 'scripts', 'images', 'html', 'content'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('images/*', ['images']);
});
