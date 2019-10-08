var gulp = require('gulp'),
browserSync = require('browser-sync').create();


// Watcher:
function watch(done) {
	notify: false;
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	gulp.watch('./app/assets/styles/**/*.css', style);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/assets/js/**/*.js').on('change', browserSync.reload);
done();
};


gulp.task("style", style);

exports.watch = watch;