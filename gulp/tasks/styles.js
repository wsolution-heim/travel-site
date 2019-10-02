var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
syntax = require('postcss-syntax'),
browserSync = require('browser-sync').create();

// Anstelle von gulp.task verwendet man functions

// compile css
function style() {
// 1. Find my css file
return gulp.src('./app/assets/styles/**/*.css')
// 2. pass the file thru the compiler
.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
// 3. where do i save the compiled css
.pipe(gulp.dest('./app/temp/styles'))
// 4. stream changes to all browsers
.pipe(browserSync.stream()); 
}

exports.style = style;