var gulp = require('gulp'),
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
customProp = require('postcss-custom-properties'),
rulesVariables = require('postcss-at-rules-variables'),
cssMap = require('postcss-map'),
mixins = require('postcss-custom-media'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
syntax = require('postcss-syntax'),
clearfix = require('postcss-clear-fix'),
svgSprite = require('gulp-svg-sprite'),
browserSync = require('browser-sync').create();

// Anstelle von gulp.task verwendet man functions

// compile css
function style(done) {
	// 1. Find my css file
	return gulp.src('./app/assets/styles/**/*.css')
	// 2. pass the file thru the compiler
	.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
	// 3. where do i save the compiled css
	.pipe(gulp.dest('./app/temp/styles'))
	// 4. stream changes to all browsers
	.pipe(browserSync.stream()); 
done();
}

gulp.task("style", style);
exports.style = style;