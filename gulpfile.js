// Dependencies
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    minifycss    = require('gulp-minify-css'),
    // jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    // imagemin     = require('gulp-imagemin'),
    // rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    del          = require('del'),
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    // cache        = require('gulp-cache'),
    plumber      = require('gulp-plumber'),
    ngAnnotate   = require('gulp-ng-annotate'),
    sourcemaps   = require('gulp-sourcemaps'),
    // browserify   = require('browserify'),
    // watchify     = require('watchify'),
    // transform    = require('vinyl-transform'),
    // opn          = require('opn');
    webserver    = require('gulp-webserver');

var paths = {
  host           : 'localhost',
  port           : 46012,
  livereloadport : 35729,
  destination    : 'dist',
  baseLibs       : ['src/scripts/libs/**/*.js']
}

// Error handling
var onError = function(e) {
  console.log(e);
}


gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      host : paths.host,
      port : paths.port,
      livereload : true,
      directoryListing : false,
      fallback : 'index.html'
    }))
});

gulp.task('clean', ['cleanJS'], function(cb) {
  // no-op, call other clean tasks
});

gulp.task('cleanJS', function(cb){
  del(['dist/js/app.js'], cb);
});

// gulp.task('cleanCompass', function(cb){
//   del(['dist/css'], cb);
// });
//
// gulp.task('cleanImages', function(cb){
//   del(['dist/images'], cb);
// });

gulp.task('html', [], function () {
    var assets = useref.assets();

    return gulp.src('src/**/*.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifycss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'))
      .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('js', ['cleanJS'], function() {
  return gulp.src(['src/**/module.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'JS task complete' }));
})

gulp.task('vendor', [], function() {
  
  var src = [
    'vendor/angular-ui-router/release/angular-ui-router.min.js',
    'vendor/momentjs/min/moment.min.js'
  ]
  
  return gulp.src(src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
  
});

// SASS task
gulp.task('sass', function () {
  gulp.src('./src/scss/styles.scss')
    .pipe(sass({
       style: 'compressed',
       loadPath: [
        './source/sass',
       ]
     }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.watch('src/js/**/*.js', ['js']);
gulp.watch('src/**/*.html', ['html']);

gulp.task('default', ['html', 'js'], function() {
  gulp.start('webserver');
})
