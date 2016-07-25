var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();

var webpackDevConf = require('./webpack.dev.config.js'),
    webpackProdConf = require('./webpack.prod.config.js');

gulp.task('build', function() {
    return gulp.src('test/main.js')
        .pipe(webpack(webpackDevConf))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.stream());
});

gulp.task('dist', function() {
    return gulp.src('src/react-smooth-scrollbar.js')
        .pipe(webpack(webpackProdConf))
        .pipe(uglify())
        .pipe(rename('react-smooth-scrollbar.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(['test/main.js', 'src/react-smooth-scrollbar.js'], ['build']);
    gulp.watch('test/*.{css,html}').on('change', browserSync.reload);
})

gulp.task('serve', ['build', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: 'test/',
            routes: {
                '/compiled': '.tmp/',
                '/node_modules': 'node_modules/'
            }
        }
    });
});

gulp.task('default', ['serve']);
