var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('lint', function() {
	return gulp.src('static/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
	return gulp.src('static/js/*.js')
		.pipe(browserify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
	return gulp.src('static/css/*.css')
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'js']);
	gulp.watch('css/*.css', ['css']);
});

gulp.task('default', ['lint', 'js', 'css'])