var gulp = require( 'gulp' ),
	jshint = require('gulp-jshint'),
	notify = require( 'gulp-notify' ),
	postCss = require( 'gulp-postcss' ),
	postCssAutoprefixer = require( 'autoprefixer' ),
	postCssMqPacker = require( 'css-mqpacker' ),
	sass = require( 'gulp-sass' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	uglify = require( 'gulp-uglify' ),
	concat = require( 'gulp-concat' );


var jsFolder = './js/';





gulp.task( 'styles', function () {

	var postCssProcessors = [
		postCssMqPacker( { sort : true } ),
		postCssAutoprefixer( { browsers : [ 'last 2 versions', 'IE >= 9' ] } )
	];

	gulp.src( './css/src/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass( {
				errLogToConsole : true,
				outputStyle     : 'expanded', //  'compressed','compact','nested','expanded'
				precision       : 10
			} ).on( 'error', notify.onError( function ( error ) {
				return error.message;
			} ) )
		)
		.pipe( postCss( postCssProcessors ) ).on( 'error', notify.onError( function ( error ) {
		return error.message;
	} ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( './css' ) )
		.pipe( notify( { message : '[dev] CSS task complete', onLast : true } ) );

} );





// Watch
gulp.task( 'watch', function () {
	// Watch .scss files
	gulp.watch( ['css/src/*.scss', 'js/reveal.js/css/*/*.scss'], [ 'styles' ] );
} );


gulp.task( 'default', [ 'styles', 'watch' ] );