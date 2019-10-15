var gulp = require('gulp'),
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
svgSprite = require('gulp-svg-sprite'),
browserSync = require('browser-sync').create(),
del = require('del');
 


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


function createSprite(done) {
  return gulp.src('./app/assets/images/icons/**/*')
   .pipe(svgSprite(config))
   .pipe(gulp.dest('./app/temp/sprite/'));
     done();
};

function copySpriteGraphic(done)  {
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
  return gulp.series('beginnClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS',
    (seriesDone) => {
        seriesDone();
        done();
        }
      ) ()
  };


gulp.task(icons);
gulp.task("beginClean", beginnClean);
exports.createSprite = createSprite;
exports.copySpriteGraphic = copySpriteGraphic;
exports.copySpriteCSS = copySpriteCSS;
exports.icons = icons;