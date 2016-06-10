var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
    open: false
  });
  console.log('server is on...');
});

gulp.task('sass', function(){
  return gulp.src('public/scss/**/*.+(scss|sass)')
    .pipe(sass())
    // automatically adds browser vendor prefixes to compiled css
    .pipe(autoprefixer({
			browsers: ['last 4 versions']
		}))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  // adding other tasks to arguments to make sure they're run before before watch starts
  gulp.watch('public/scss/**/*.+(scss|sass)', ['sass']);
  gulp.watch(['public/**/*.html', 'public/js/**/*.js'], browserSync.reload);
});

// find errors
gulp.task('jshint', function() {
  return gulp.src(['*.js', 'public/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['sass', 'browserSync', 'watch', 'jshint'], function(){
  console.log('gulp is on...');
});
