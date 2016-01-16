var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence')
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
	browserSync.init(['./public/**/**.**'],{
		server: {
			baseDir: './public'
		}
	});

	gulp.watch('public/sass/*.scss', ['styles'])
	gulp.watch('public/styles/*.css', browserSync.reload)
	//gulp.watch(['public/app/*.js', 'public/app/**/*.js'], ['lint', 'combinejs'])
	gulp.watch(['public/app/*.html', 'public/app/**/*.html']).on('change', browserSync.reload);
});

gulp.task('clean-styles', function() {
	return gulp.src('dist/styles/', {read: false})
		.pipe(plugins.clean())
});

gulp.task('styles', function() {
	return gulp.src('./public/sass/*.scss')
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(gulp.dest('./public/styles/'))
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./public/styles/'));
});

gulp.task('minify-css', function() {
	return gulp.src([
			'public/styles/*.css'
		])
		.pipe(plugins.minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/styles/'))
});

gulp.task('lint', function() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('clean-scripts', function() {
	return gulp.src('dist/scripts/', {read: false})
		.pipe(plugins.clean())
});

gulp.task('combinejs', function() {
	return gulp.src([
			'./public/app/*.js',
			'./public/app/**/*.js',
			'!./public/lib/'
		])
		.pipe(plugins.concat('all.js'), { newLine: ';' })
		.pipe(gulp.dest('dist/scripts'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(plugins.notify('Combine JS has finished running'))
});

gulp.task('mocha', function() {
	return gulp.src('test/*.js', {read: false})
		.pipe(plugins.mocha({reporter: 'nyan'}));
});

gulp.task('docs', function() {
	return gulp.src(['README.md', 'server/*.js','server/**/*.js', 'public/*.js', 'public/**/*.js'])
		.pipe(plugins.jsdoc('documentation-output/'))
})

gulp.task('build', function() {
	runSequence(['clean-scripts', 'clean-styles'], 'lint', ['minify-css', 'combinejs'])
})

gulp.task('travis', ['mocha', 'build']);