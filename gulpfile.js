const gulp = require('gulp'),
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
cssvars = require('postcss-simple-vars'),
mixins = require('postcss-custom-media'),
cssImport = require('postcss-import'),
nested = require('postcss-nested'),
syntax = require('postcss-syntax'),
hexrgba = require('postcss-hexrgba'),
clearfix = require('postcss-clear-fix'),
autoprefixer = require('autoprefixer'),
svgSprite = require('gulp-svg-sprite'),
browserSync = require('browser-sync').create(),
del = require('del'),
webpack = require('webpack');


// require('./gulp/tasks/styles');
// require('./gulp/tasks/watch');
// require('./gulp/tasks/sprites');


// compile css
function styles() {
	// 1. Find my css file
	return gulp.src('./app/assets/styles/**/*.css')
	// 2. pass the file thru the compiler
	.pipe( postcss ([cssImport ,  mixins ,  cssvars ,  nested , hexrgba, autoprefixer ]))
	.on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
	// 3. where do i save the compiled css
	.pipe(gulp.dest('./app/temp/styles'))
	// 4. stream changes to all browsers
	.pipe(browserSync.stream()); 

}


function scripts(callback) {
	webpack(require('./webpack.config.js'), function(err, stats) {
		if (err)
			 {
			 	console.log(err.toString());
			 }		
		console.log(stats.toString());
		callback();
	});
};



// Watcher:
function watch(done) {
	notify: false;
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	gulp.watch('./app/assets/styles/**/*.css', styles);
	gulp.watch('./app/assets/scripts/**/*.js', scripts);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/assets/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('./app/assets/scripts/**/*.js').on('change', browserSync.reload);
done();
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


function beginClean() {
  return del(['./app/temp/sprite/', './app/assets/images/sprites']); 
};


function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*')
   .pipe(svgSprite(config))
   .pipe(gulp.dest('./app/temp/sprite/'));
    
};

function copySpriteGraphic()  {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
  .pipe(gulp.dest('./app/assets/images/sprites'));
  
}

function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css'))
  .pipe(gulp.dest('./app/assets/styles/modules'));
  
};

function endClean() {
	return del('./app/temp/sprite');
};

function icons(done)   {
  return gulp.series('beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean',
    (seriesDone) => {
        seriesDone();
        done();
        }
      ) ()
  };





gulp.task("styles", styles);
gulp.task("watch", watch);
gulp.task("beginClean", beginClean);
gulp.task("createSprite",createSprite);
gulp.task("copySpriteGraphic",copySpriteGraphic);
gulp.task("copySpriteCSS",copySpriteCSS);
gulp.task("endClean",endClean);
gulp.task("icons",icons);
gulp.task("scripts",scripts);


// gulp.task("default", gulp.series(watch, icons));
gulp.task("default", watch);