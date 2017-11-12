var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglifyjs');

gulp.task('sass', function () {
	return gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%']))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('babel', function () {
	gulp.src('app/js/common-es6.js')
		.pipe(babel({ presets: ['env'] }))
		.pipe(uglify())
		.pipe(rename('common.min.js'))
		.pipe(gulp.dest('app/js/'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

/* Далее идут консольные таски! */

gulp.task('watch', ['browser-sync', 'sass'], function () {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', ['babel']);
});
