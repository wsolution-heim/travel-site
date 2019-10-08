const gulp = require('gulp'),
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
mixins = require('postcss-custom-media'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
syntax = require('postcss-syntax'),
clearfix = require('postcss-clear-fix'),
svgSprite = require('gulp-svg-sprite'),
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


var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}	
		}
	}
}


function createSprite(done) {
	return gulp.src('./app/assets/images/icons/**/*')
	 .pipe(svgSprite(config))
	 .pipe(gulp.dest('./app/temp/sprite/'));
	   done();
};

function copySpriteGraphic(createSprite, done)  {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
	.pipe(gulp.dest('./app/assets/images/sprites'));
	done();
}

function copySpriteCSS(done) {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css'))
  .pipe(gulp.dest('./app/assets/styles/modules'));
    done();
};


function icons(done)   {
	return gulp.series('createSprite', 'copySpriteGraphic', 'copySpriteCSS',
		(seriesDone) => {
  			seriesDone();
  			done();
  			}
  		) ()
	};


exports.style = style;
exports.watch = watch;
exports.createSprite = createSprite;
exports.copySpriteGraphic = copySpriteGraphic;
exports.copySpriteCSS = copySpriteCSS;
exports.icons = icons;