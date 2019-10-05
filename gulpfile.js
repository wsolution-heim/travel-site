const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
mixins = require('postcss-custom-media'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
syntax = require('postcss-syntax'),
clearfix = require('postcss-clear-fix'),
browserSync = require('browser-sync').create();
 
// Refresh HTML file:
function html() {
	browserSync.reload();
}
 
// Compile and stream CSS file:
function style() {
	// 1. Where is my css file:
	return gulp.src('./app/assets/styles/styles.css')
	// 2. Pass that file through sass compiler
		.pipe(postcss([cssImport, cssvars, mixins, nested, autoprefixer, clearfix]))
	// 3. Where do I save the compiled CSS?
		.pipe(gulp.dest('./app/temp/styles'))
	// 4. Stream changes to all browser:
		.pipe(browserSync.stream())
};
 
// Watcher:
function watch() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	gulp.watch('./app/assets/styles/**/*.css', style);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/assets/js/**/*.js').on('change', browserSync.reload);
};
 
 
exports.style = style;
exports.watch = watch;