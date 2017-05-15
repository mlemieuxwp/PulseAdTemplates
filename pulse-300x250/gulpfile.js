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
var css2js       = require("gulp-css2js");
var foreach      = require("gulp-foreach");

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
var version = "4.0.0";

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
  /*.pipe(rename({
            dirname: "min",
            suffix: "-"+version+".min",
  }))*/
  .pipe(gulp.dest('css'));
});

gulp.task('css2js', function() {
    gulp.src("css/main.css")
        .pipe(foreach(function(stream, file){
                var filename = file.path.replace(/^.*[\\\/]/, '');
                filename = filename.replace(/\.[^/.]+$/, "");
                return stream
                .pipe(
                    css2js({
                        prefix: "Styles[\""+filename+"\"] = \"",
                        suffix: "\";\n"
                    })
                );
            })
        )
        .pipe(gulp.dest("js/css2js"));
})

// gulp.task('clean-scripts', function () {
//   return gulp.src('css/*', {read: false})
//     .pipe(clean());
// });

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
  browserSync.init(['sass/*.scss', 'js/*.js', 'index.html','templates/*.html'], {
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
    'js/xmlHttp.js',
    'js/utils.js',
    'js/templates.js',
    'js/css2js/main.js',
    'js/ad.js',
    'js/swiper.js',
    'js/carousel.js',
    'js/slides.js',
    'js/video.js',
    'js/videoTracking.js',
    'js/init.js'
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
gulp.task('default', ['sass','css2js', 'browser-sync', 'scripts', 'images'], function () {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('css/main.css', ['css2js']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('images/*', ['images']);
});
