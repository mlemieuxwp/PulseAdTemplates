/*=============================================
=            Gulp Starter by @dope            =
=============================================*/

/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
**/
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');
var remotesrc    = require('gulp-remote-src');
var util         = require('gulp-util');
var cssmin       = require('gulp-cssmin');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');

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
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('css'));
});

gulp.task('clean-scripts', function () {
  return gulp.src('css/*', {read: false})
    .pipe(clean());
});

// gulp.task('remote', function() {
//   remotesrc(['cc82e7d48c.css'], {
//           base: 'https://pb-dev.wpprivate.com/pb/gr/c/default/r0Hx24xLRJG6rp/css/',
//       })
//   remotesrc(['style.css'], {
//           base: 'https://pb-dev.wpprivate.com/pb/gr/p/default/r0Hx24xLRJG6rp/',
//       })
//       .pipe(cssmin())
//       .pipe(concat('all.css'))
//       .pipe(gulp.dest('css'));
// });


// gulp.task('download-file', function() {
//   download('https://www.washingtonpost.com/politics/outdated-civil-service-rules-need-overhauling-says-the-partnership-for-public-service/2014/05/08/8c7984ba-d622-11e3-8a78-8fe50322a72c_story.html')
//     .pipe(gulp.dest("dist"));
// });

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', 'slick/*.css', 'slick/*.js', 'index.html'], {
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
  gulp.src(['js/player.js','js/slick.js','js/scripts.js'])
  .pipe(uglify())
  .pipe(concat('scripts.js'))
  .pipe(rename({
    dirname: "min",
    suffix: ".min",
  }))
  .pipe(gulp.dest('js'))
});

/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('images'));
});


/**
*
* Default task
* - Runs sass, browser-sync, scripts and image tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/
gulp.task('default', ['clean-scripts', 'sass', 'browser-sync', 'scripts', 'images'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});
