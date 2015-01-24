// var jshint = require('gulp-jshint');
var gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	reactify = require( 'reactify' ),
	sass = require( 'gulp-sass' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' )
	uglify = require( 'gulp-uglify' );

var config = {
	sassPath: './stylesheets/scss',
	jsPath: './js'
};

gulp.task( 'default', [ 'watch', 'css', 'js' ] );

gulp.task( 'watch', function() {
	gulp.watch( config.sassPath + '/*.scss', [ 'css' ] );
	gulp.watch( config.jsPath + '/main.js', [ 'js' ] );
	gulp.watch( config.jsPath + '/app/*.js', [ 'js' ] );
	gulp.watch( config.jsPath + '/app/*.jsx', [ 'js' ] );
} );

gulp.task( 'css', function () {
	gulp.src( config.sassPath + '/*.scss' )
		.pipe( sass() )
		.pipe( gulp.dest( './stylesheets/compiled' ) );
});

gulp.task( 'js', function() {
	var mainPath = config.jsPath + '/main.js';

	browserify({
		entries: mainPath,
		extensions: [ '.jsx' ]
	} )
		.transform( reactify ).bundle();
		.pipe( source( mainPath ) )
		.pipe( gulp.dest( './bundle.js' ) )

		// Add after bundle.js line for production
		// .pipe( streamify( uglify() ) )
} );
