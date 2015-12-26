var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', function() {

});

gulp.task('clean-styles', function() {

});

gulp.task('minify-css', function() {

});

gulp.task('lint', function() {

});

gulp.task('clean-scripts', function() {

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

gulp.task('browser-sync', function(){
	plugins.browserSync.init({
		server : {
			baseDir: './'
		}
	})
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