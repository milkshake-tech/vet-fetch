var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    to5 = require('gulp-6to5');

gulp.task('es6-es5', function(){
  return gulp.src([
			'./client/src/ServerApp.js',
			'./client/src/*/**.js',
			'./client/src/*/*/**.js',
      './client/src/*/*/*/**.js'
		  ]
	 )
	.pipe(to5())
	.pipe(gulp.dest('./server/public/dist/es5/'));
});

gulp.task('watch', function() {
  gulp.watch(['./client/src/ServerApp.js', './client/src/*/**.js', './client/src/*/*/**.js'], ['es6-es5']);
});

gulp.task('default', ['es6-es5', 'watch'], function(){});
