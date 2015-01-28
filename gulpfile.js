// var jshint = require('gulp-jshint');
var
	concat = require( 'gulp-concat' ),
	deploy = require( 'gulp-gh-pages' ),
	es = require( 'event-stream' ),
	gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	reactify = require( 'reactify' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-sass' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' )
	uglify = require( 'gulp-uglify' );

var config = {
	cssPath: './stylesheets/css',
	sassPath: './stylesheets/scss',
	jsPath: './js',
	buildPath: './build'
};

gulp.task( 'default', [ 'watch', 'css', 'js', 'index', 'cname' ] );

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
	var cssFiles = gulp.src( config.cssPath + '/*.css' );
	var sassFiles = gulp.src( config.sassPath + '/*.scss' ).pipe( sass( { style: 'compressed' } ) );

	return es.concat( cssFiles, sassFiles )
		.pipe( concat( 'style.css' ) )
		.pipe( gulp.dest( './build/stylesheets' ) );

	// gulp.src( [ config.cssPath + '/*.css', config.sassPath + '/*.scss'] )
	// 	.pipe( sass( { outputStyle: 'compressed' } ) )
	// 	.pipe( gulp.dest( './build/stylesheets' ) );
});

gulp.task( 'js', function() {
	var mainPath = config.jsPath + '/main.js';

	browserify({
		entries: mainPath,
		extensions: [ '.jsx' ]
	} )
		.transform( reactify )
		.bundle()
		.pipe( source( mainPath ) )
		.pipe( rename( 'bundle.js' ) )
		.pipe( gulp.dest( config.buildPath + '/js' ) )

		// Add after bundle.js line for production
		// .pipe( streamify( uglify() ) )
} );

gulp.task( 'deploy', function () {
	return gulp.src( './build/**/*' )
		.pipe( deploy() );
});
