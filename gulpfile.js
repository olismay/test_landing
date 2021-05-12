const {src, dest, watch, parallel }= require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function images() {
    return src('app/img/**/*')
      .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
      ))
      .pipe(dest('app/img'))
}

function styles() {
    return src('app/scss/**/*.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
          overrideBrowsersList: ['last 10 version'],
          grid: true
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;

exports.default = parallel(browsersync, watching, styles);