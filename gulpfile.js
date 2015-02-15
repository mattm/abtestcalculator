'use strict';

var beep = require( 'beepbeep' ),
	browserify = require( 'browserify' ),
	concat = require( 'gulp-concat' ),
	del = require( 'del' ),
	deploy = require( 'gulp-gh-pages' ),
	es = require( 'event-stream' ),
	gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	jshint = require( 'gulp-jshint' ),
	mocha = require( 'gulp-mocha' ),
	react = require( 'gulp-react' ),
	reactify = require( 'reactify' ),
	rename = require( 'gulp-rename' ),
	runSequence = require( 'run-sequence' ),
	sass = require( 'gulp-sass' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' ),
	template = require( 'gulp-template' ),
	uglify = require( 'gulp-uglify' );

var config = {
	buildPath: './build',
	cssPath: './stylesheets/css',
	indexPath: './index.html',
	jsPath: './js',
	sassPath: './stylesheets/scss',
	testPath: './test/*',

	// Files in the root that need to be copied over to the root of the build directory
	// This excludes index.html which is handled separately due to its templating
	assets: [ './CNAME', './favicon.ico' ]
};

var jsExtension = gutil.env.production ? 'min.js' : 'js',
	bundleFileName = 'bundle.' + jsExtension;

gulp.task( 'default', [ 'watch', 'build' ] );

gulp.task( 'watch', function() {
	gulp.watch( config.indexPath, [ 'index' ] );
	gulp.watch( config.sassPath + '/*', [ 'css' ] );
	gulp.watch( config.jsPath + '/**/*', [ 'js' ] );
	gulp.watch( config.testPath, [ 'test' ] );
} );

gulp.task( 'build', function( callback ) {
	runSequence( 'clean', [ 'jshint', 'js', 'css', 'assets', 'index', 'test' ], callback );
} );

// Run `gulp deploy --production` to deploy to Github Pages
gulp.task( 'deploy', [ 'build' ], function () {
	if ( ! gutil.env.production ) {
		throw new Error( 'gulp deploy must be run with the --production flag to ensure the JavaScript bundle is minified' );
	}

	return gulp.src( config.buildPath + '/**/*' )
		.pipe( deploy() )
		.on( 'error', function( error ){
			gutil.log( error.message );
		} );
} );

gulp.task( 'clean', function() {
	return del( config.buildPath );
} );

gulp.task( 'jshint', function () {
	return gulp.src( [ config.jsPath + '/**/*', './gulpfile.js' ] )
		.pipe( react() )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );
} );

gulp.task( 'js', function( cb ) {
	var mainPath = config.jsPath + '/main.js';

	return browserify({
		entries: mainPath,
		extensions: [ '.jsx' ]
	} )
		.transform( reactify )
		.bundle()
		.on( 'error', function( error ) {
			beep();
			gutil.log( error.message );
			cb( error );
		} )
		.pipe( source( mainPath ) )
		.pipe( gutil.env.production ? streamify( uglify() ) : gutil.noop() )
		.pipe( rename( bundleFileName ) )
		.pipe( gulp.dest( config.buildPath + '/js' ) );
} );

gulp.task( 'css', function () {
	var cssFiles = gulp.src( config.cssPath + '/*.css' ),
		sassFiles = gulp.src( config.sassPath + '/*.scss' ).pipe( sass( { style: 'compressed' } ) );

	return es.concat( cssFiles, sassFiles )
		.pipe( concat( 'style.css' ) )
		.pipe( gulp.dest( config.buildPath + '/stylesheets' ) );
} );

gulp.task( 'assets', function() {
	return gulp.src( config.assets ).
		pipe( gulp.dest( config.buildPath ) );
} );

gulp.task( 'index', function() {
	return gulp.src( config.indexPath )
		.pipe( template( {
			bundleFileName: bundleFileName
		} ) )
		.pipe( gulp.dest( config.buildPath ) );
} );

gulp.task( 'test', function () {
	return gulp.src( config.testPath, { read: false } )
		.pipe( mocha( { reporter: 'dot' } ) )
		.once('error', function () {
			beep();
		} );
});
