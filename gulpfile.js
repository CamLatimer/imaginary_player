var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var scss         = require('postcss-scss');
var getColor     = require('postcss-get-color');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var ngAnnotate   = require('gulp-ng-annotate');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
    open: false
  });
  console.log('server is on...');
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 4 versions']}),
        getColor()
    ];
    return gulp.src('dev/css/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dev/css/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('minifyJs', function(){
  return gulp.src(['dev/js/app.js', 'dev/js/controller.showCtrl.js', 'dev/js/controller.searchCtrl.js'])
  .pipe(concat('plrApp.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('dev/js/'));
})


gulp.task('watch', ['browserSync', 'css'], function(){
  // adding other tasks to arguments to make sure they're run before before watch starts
  gulp.watch('dev/css/scss/*.scss', ['css']);
  gulp.watch('dev/js/**/*.js', ['minifyJs'], browserSync.reload);
  gulp.watch('dev/**/*.html', browserSync.reload);
});

// find errors
gulp.task('jshint', function() {
  return gulp.src(['*.js', 'dev/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['browserSync', 'css', 'minifyJs', 'watch', 'jshint'], function(){
  console.log('gulp is on...');
});
