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

/**
*** Versioning
*** Versioning Used: [Semantic](http://semver.org/)
*** String, lowercase

  - MAJOR ("major") version when you make incompatible API changes
  - MINOR ("minor") version when you add functionality in a backwards-compatible manner
  - PATCH ("patch") version when you make backwards-compatible bug fixes.
  - PRERELEASE ("prerelease") a pre-release version

*** Version example

    major: 1.0.0
    minor: 0.1.0
    patch: 0.0.2
    prerelease: 0.0.1-2
**/
var version = "3.0.0";



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
        .pipe(rename({
            dirname: "min",
            suffix: "-"+version+".min",
        }))
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
    browserSync.init(['css/*.css', 'js/**/*.js', 'content/*.html', 'index.html', 'templates/*.html'], {
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
  gulp.src([
    'js/jsLoader.js', 
    'js/xmlHttp.js', 
    'js/utils.js', 
    'js/templates.js', 
    'js/articles.js', 
    'js/video.js', 
    'js/videoTracking.js'
  ])
  .pipe(uglify())
  // .pipe(rename({
  //   dirname: "min",
  //   suffix: ".min",
  // }))
  .pipe(concat('scripts-'+version+'.min.js'))
  .pipe(gulp.dest('js/min'));
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
