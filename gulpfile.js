var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
	browserSync.init({
		server : {
			baseDir: 'server/server.js'
		}
	});

	gulp.watch('public/styles/*.css', ['minify-css'], browserSync.reload)
	gulp.watch(['public/app/*.js', 'public/app/**/*.js'], ['lint', 'combinejs'], browserSync.reload)
});

gulp.task('clean-styles', function() {
	return gulp.src('dist/styles/', {read: false})
		.pipe(plugins.clean())
});

gulp.task('minify-css', function() {
	return gulp.src([
			'public/styles/*.css'
		])
		.pipe(plugins.minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/styles/'))
});

gulp.task('lint', function() {

});

gulp.task('clean-scripts', function() {
	return gulp.src('dist/scripts/', {read: false})
		.pipe(plugins.clean())
});

gulp.task('combinejs', function() {
	return gulp.src([
			'./public/app/*.js',
			'./public/controllers/*.js'
		])
		.pipe(plugins.concat('all.js'), { newLine: ';' })
		.pipe(gulp.dist('dist/scripts'))
		.pipe(plugins.uglify())
		.pipe(gulp.dist('dist/scripts'))
});

gulp.task('watch', function () {
	gulp.src([
			'./public/styles/*.css',
			'./public/app/*.js',
			'./public/app/controllers/*.js'
		],
		[])
		.pipe(plugin.watch([
			'./public/styles/*.css',
			'./public/app/*.js',
			'./public/app/controllers/*.js'
		]))
})

gulp.task('mocha', function() {

});