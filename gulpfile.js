var gulp = require('gulp');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');

var CONFIG = {
  dest: './build',
  src: './src'
};

gulp.task('build', ['html', 'stylus', 'bower_components', 'js']);

gulp.task('watch', function () {
  return gulp.watch(CONFIG.src + '/**/*', ['build']);
});

gulp.task('server', ['build','connect','watch']);

gulp.task('html', function () {
  return gulp.src(CONFIG.src + '/**/*.html')
    .pipe(gulp.dest(CONFIG.dest))
    .pipe(connect.reload());
});

gulp.task('stylus', function () {
  return gulp.src(CONFIG.src + '/styl/**/*')
    .pipe(stylus())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(CONFIG.dest))
    .pipe(connect.reload());
});

gulp.task('bower_components', function () {
  return gulp.src('./bower_components/**/*')
    .pipe(gulp.dest(CONFIG.dest + '/bower_components'));
});

gulp.task('js', function () {
  return gulp.src([
      CONFIG.src + '/js/**/*'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(CONFIG.dest))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  return connect.server({
    root: CONFIG.dest,
    port: 3001,
    livereload: true
  });
});

gulp.task('deploy', function () {
  return gulp.src(CONFIG.dest + '/**/*')
    .pipe(deploy());
});
