var gulp = require('gulp');

gulp.task('default', function(){
	console.log("Hooray - you created a gulp file!")
});

gulp.task('html', function(){
	console.log("Imaging something useful being done with your HTML here.")
});

gulp.task('styles', function(){
	console.log("Imaging sass or style running here.")
});

gulp.task('watch', function(){
	gulp.watch('./app/index.html', function(){
		gulp.start('html');
	});

	gulp.watch('./app/assets/styles/**/*.css', function(){
		gulp.start('styles');
	});
});