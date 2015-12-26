var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('concat', function() {
    return gulp.src([
        './public/app/*.js',
        './public/controllers/*.js'
    ])
    .pipe(plugins.concat('all.js'), { newLine: ';' })
    .pipe(gulp.dist('./dist/'))
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