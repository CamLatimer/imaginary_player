var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var getColor = require('postcss-get-color')

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
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
    return gulp.src('public/css/postCSS/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('watch', ['browserSync', 'css'], function(){
  // adding other tasks to arguments to make sure they're run before before watch starts
  gulp.watch('public/css/postCSS/*.scss', ['css']);
  gulp.watch(['public/**/*.html', 'public/js/**/*.js'], browserSync.reload);
});

// find errors
gulp.task('jshint', function() {
  return gulp.src(['*.js', 'public/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['browserSync', 'css', 'watch', 'jshint'], function(){
  console.log('gulp is on...');
});
