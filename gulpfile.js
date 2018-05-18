var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglifyjs'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	svgmin = require('gulp-svgmin'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
	return gulp.src('app/sass/*.sass')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'ERROR SASS Сompilation',
				message: err.message,
				sound: 'Beep'
			}))
		}))
		.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer(['last 15 versions', '> 1%']))
			.pipe(cssnano())
			.pipe(rename('main.min.css'))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('babel', function () {
	return gulp.src('app/js/common-es6.js')
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'ERROR JS Сompilation',
				message: err.message,
				sound: 'Beep'
			}))
		}))
		.pipe(sourcemaps.init())
			.pipe(babel({ presets: ['env'] }))
			.pipe(uglify())
			.pipe(rename('common.min.js'))
		.pipe(sourcemaps.write('./maps'))
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

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('img', function () {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

/* Далее идут консольные таски! */

gulp.task('watch', ['browser-sync', 'sass'], function () {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/common-es6.js', ['babel']);
});

gulp.task('build', ['clean', 'img'], function () {
	var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildSVG = gulp.src('app/svg/**/*')
	.pipe(svgmin())
	.pipe(gulp.dest('dist/svg'));

	var buildJs = gulp.src([
		'!app/js/common-es6.js',
		'app/js/**/*.js'
		])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});
