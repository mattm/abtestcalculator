var browserify = require( 'browserify' ),
	concat = require( 'gulp-concat' ),
	deploy = require( 'gulp-gh-pages' ),
	es = require( 'event-stream' ),
	gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	jshint = require('gulp-jshint'),
	reactify = require( 'reactify' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-sass' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' ),
	uglify = require( 'gulp-uglify' );

var config = {
	cssPath: './stylesheets/css',
	sassPath: './stylesheets/scss',
	jsPath: './js',
	buildPath: './build'
};

gulp.task( 'default', [ 'watch', 'build' ] );

gulp.task( 'build', [ 'js', 'css', 'index', 'cname' ] );

gulp.task( 'watch', function() {
	gulp.watch( './index.html', [ 'index' ] );
	gulp.watch( config.sassPath + '/*.scss', [ 'css' ] );
	gulp.watch( config.jsPath + '/**/*.js', [ 'js' ] );
	gulp.watch( config.jsPath + '/**/*.jsx', [ 'js' ] );
} );

gulp.task( 'index', function() {
	gulp.src( './index.html' )
		.pipe( gulp.dest('./build/' ) );
} );

gulp.task( 'cname', function() {
	gulp.src( './CNAME' )
		.pipe( gulp.dest('./build/' ) );
} );

gulp.task( 'css', function () {
	var cssFiles = gulp.src( config.cssPath + '/*.css' ),
		sassFiles = gulp.src( config.sassPath + '/*.scss' ).pipe( sass( { style: 'compressed' } ) );

	return es.concat( cssFiles, sassFiles )
		.pipe( concat( 'style.css' ) )
		.pipe( gulp.dest( './build/stylesheets' ) );
});

gulp.task( 'jshint', function () {
	gulp.src( [ './js/**/*.js', './gulpfile.js' ] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );
} );

gulp.task( 'js', function() {
	var mainPath = config.jsPath + '/main.js';

	browserify({
		entries: mainPath,
		extensions: [ '.jsx' ]
	} )
		.transform( reactify )
		.bundle()
		.on('error', function( error ) {
			gutil.log( error.message );
		} )
		.pipe( source( mainPath ) )
		.pipe( streamify( uglify() ) )
		.pipe( rename( 'bundle.js' ) )
		.pipe( gulp.dest( config.buildPath + '/js' ) );
} );

gulp.task( 'deploy', [ 'build' ], function () {
	return gulp.src( './build/**/*' )
		.pipe( deploy() );
});
