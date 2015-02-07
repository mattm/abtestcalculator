'use strict';

var beep = require( 'beepbeep' ),
	browserify = require( 'browserify' ),
	concat = require( 'gulp-concat' ),
	del = require( 'del' ),
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
	template = require( 'gulp-template' ),
	uglify = require( 'gulp-uglify' );

var config = {
	cssPath: './stylesheets/css',
	sassPath: './stylesheets/scss',
	jsPath: './js',
	buildPath: './build'
};

var jsExtension = gutil.env.production ? 'min.js' : 'js',
	bundleFileName = 'bundle.' + jsExtension;

gulp.task( 'default', [ 'watch', 'build' ] );

gulp.task( 'clean', function( cb ) {
	del( [ './build/'] );
	cb();
} );

gulp.task( 'build', [ 'clean', 'js', 'css', 'assets', 'index' ] );

gulp.task( 'watch', function() {
	gulp.watch( './index.html', [ 'index' ] );
	gulp.watch( config.sassPath + '/*.scss', [ 'css' ] );
	gulp.watch( config.jsPath + '/**/*.js', [ 'js' ] );
	gulp.watch( config.jsPath + '/**/*.jsx', [ 'js' ] );
} );

// Copy assets from /assets into the root of the build directory
gulp.task( 'assets', function() {
	gulp.src( './assets/*' ).
		pipe( gulp.dest('./build' ) );
} );

gulp.task( 'index', function() {
	gulp.src('./index.html' )
		.pipe( template( {
			bundleFileName: bundleFileName
		} ) )
		.pipe( gulp.dest( './build' ) )
} );

gulp.task( 'css', function () {
	var cssFiles = gulp.src( config.cssPath + '/*.css' ),
		sassFiles = gulp.src( config.sassPath + '/*.scss' ).pipe( sass( { style: 'compressed' } ) );

	return es.concat( cssFiles, sassFiles )
		.pipe( concat( 'style.css' ) )
		.pipe( gulp.dest( './build/stylesheets' ) );
});

gulp.task( 'jshint', function () {
	// TODO: Figure out how to use jshint to check JSX files as well
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
			beep();
			gutil.log( error.message );
		} )
		.pipe( source( mainPath ) )
		.pipe( gutil.env.production ? streamify( uglify() ) : gutil.noop() )
		.pipe( rename( bundleFileName ) )
		.pipe( gulp.dest( config.buildPath + '/js' ) );
} );

// Run `gulp deploy --production` to deploy to Github Pages
gulp.task( 'deploy', [ 'build' ], function () {
	if ( ! gutil.env.production ) {
		throw new Error( 'gulp deploy must be run with the --production flag to ensure the JavaScript bundle is minified' );
	}

	return gulp.src( './build/**/*' )
		.pipe( deploy() )
		.on( 'error', function( error ){
			gutil.log( error.message );
		} );
});
