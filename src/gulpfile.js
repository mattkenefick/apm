
var concat       = require('gulp-concat');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var sh           = require('shelljs');
var uglify       = require('gulp-uglify');

var paths = {
    js: [
        './apm.js',
        './core/log.js',
        './core/md5.js',
        './core/extend.js',
        './core/events.js',
        './core/http.js',
        './core/module.js',
        './modules/*.js'
    ]
};

gulp.task('default', ['js']);

gulp.task('js', function() {
    // Application
    gulp.src(paths.js)
            .pipe(concat('../deployment/apm.js'))
        .pipe(gulp.dest('./'))
            .pipe(uglify())
            .pipe(rename({
                basename: 'apm',
                extname: '.min.js'
            }))
        .pipe(gulp.dest('../deployment/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
