const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const rename = require('gulp-rename');
const path = require('path');

const paths = {
	src: 'src/**/*.js',
	dest: 'lib'
};

gulp.task('clean-build', _ => del(paths.dest));

gulp.task('build', _ => {
	return gulp.src(paths.src)
		.pipe(babel())
		//.pipe(rename( path => path.dirname = './' )) // put the server output in the top level of lib
		.pipe(gulp.dest(paths.dest))
})
