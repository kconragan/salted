// Dependencies
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var minifycss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var del          = require('del');
var useref       = require('gulp-useref');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var ngAnnotate   = require('gulp-ng-annotate');
var sourcemaps   = require('gulp-sourcemaps');
var webserver    = require('gulp-webserver');

var ghPages = require('gulp-gh-pages');

var paths = {
  host: 'localhost',
  port: 46012,
  livereloadport: 35729,
  destination: 'dist',
  baseLibs: ['src/scripts/libs/**/*.js']
}

// Error handling
var onError = function(e) {
  console.log(e);
}

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: paths.host,
      port: paths.port,
      livereload: true,
      directoryListing: false,
      fallback: 'index.html'
    }))
});

gulp.task('clean', ['cleanJS'], function(cb) {
  // no-op, call other clean tasks
});

gulp.task('cleanJS', function(cb) {
  del(['dist/js/app.js'], cb);
});

// gulp.task('cleanCompass', function(cb){
//   del(['dist/css'], cb);
// });
//
// gulp.task('cleanImages', function(cb){
//   del(['dist/images'], cb);
// });

gulp.task('html', [], function() {
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
gulp.task('sass', function() {
  gulp.src('./src/scss/styles.scss')
    .pipe(sass({
       style: 'compressed',
       loadPath: [
        './source/sass'
       ]
     }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.watch('src/js/**/*.js', ['js']);
gulp.watch('src/**/*.html', ['html']);
gulp.watch('src/**/*.scss', ['sass']);

gulp.task('default', ['html', 'js', 'sass'], function() {
  gulp.start('webserver');
})
