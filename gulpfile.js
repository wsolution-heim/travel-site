const gulp = require('gulp');
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
cssvars = require('postcss-simple-vars'),
mixins = require('postcss-custom-media'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
syntax = require('postcss-syntax'),
clearfix = require('postcss-clear-fix'),
autoprefixer = require('autoprefixer'),
svgSprite = require('gulp-svg-sprite'),
browserSync = require('browser-sync').create();


// require('./gulp/tasks/styles');
// require('./gulp/tasks/watch');
// require('./gulp/tasks/sprites');


// compile css
function styles() {
	// 1. Find my css file
	return gulp.src('./app/assets/styles/**/*.css')
	// 2. pass the file thru the compiler
	.pipe( postcss ([ cssImport ,  mixins ,  cssvars ,  nested ,  autoprefixer ]))
	.on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
	// 3. where do i save the compiled css
	.pipe(gulp.dest('./app/temp/styles'))
	// 4. stream changes to all browsers
	.pipe(browserSync.stream()); 

}


// Watcher:
function watch(done) {
	notify: false;
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	gulp.watch('./app/assets/styles/**/*.css', styles);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/assets/js/**/*.js').on('change', browserSync.reload);
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


function icons(done)   {
  return gulp.series('createSprite', 'copySpriteGraphic', 'copySpriteCSS',
    (seriesDone) => {
        seriesDone();
        done();
        }
      ) ()
  };

gulp.task("styles", styles);
gulp.task("watch", watch);
gulp.task("createSprite",createSprite);
gulp.task("copySpriteGraphic",copySpriteGraphic);
gulp.task("copySpriteCSS",copySpriteCSS);
gulp.task("icons",icons);

// gulp.task("default", gulp.series(watch, icons));
gulp.task("default", watch);