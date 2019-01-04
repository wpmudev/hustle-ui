// ==================================================
// Supported Packages
const fs = require( 'fs' );
const pump = require( 'pump' );
const ghpages = require( 'gh-pages' );
const gulp = require( 'gulp' );
const watch = require( 'gulp-watch' );
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const cleanCSS = require( 'gulp-clean-css' );
const eslint = require( 'gulp-eslint' );
const uglify = require( 'gulp-uglify-es' ).default;
const concat = require( 'gulp-concat' );
const rename = require( 'gulp-rename' );

// ==================================================
// Get Package File
const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

// ==================================================
// List of Browsers
const browsersList = [
	'last 2 version',
	'> 1%'
];

// ==================================================
// Paths

const src = {
	js: 'js/',
	scss: 'scss/',
	fonts: 'fonts/'
};

const dist = {
	js: 'dist/js/',
	css: 'dist/css/',
	fonts: 'dist/fonts'
};

// ==================================================
// Publish to Github

// Library
// Publish files to `master` branch on Github
ghpages.publish( 'build', {
	branch: 'master',
	user: {
		name: 'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
});

// ==================================================
// Files

// Hustle styles
const HustleScss = [
	src.scss + '**/*.scss'
];

// Hustle scripts
const HustleJs = [
	src.js + '*.js'
];

// Hustle fonts
const HustleFonts = [
	src.fonts + '*'
];

// ==================================================
// Tasks

// Build Hustle styles
gulp.task( 'hustle:styles', function() {

	gulp.src( HustleScss )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browsersList ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( dist.css ) )
		;
});

// Build Hustle scripts
gulp.task( 'hustle:scripts', function( cb ) {

	pump([
		gulp.src( HustleJs ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'hustle-ui.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( dist.js )
	], cb );
});

gulp.task( 'hustle:fonts', function() {

	gulp.src( HustleFonts )
		.pipe( gulp.dest( dist.fonts ) )
		;
});

// Build Hustle UI assets
gulp.task( 'build', [
	'hustle:styles',
	'hustle:scripts',
	'hustle:fonts'
]);

// ==================================================
// Watch

gulp.task( 'watch', function() {

	// Watch Hustle styles
	gulp.watch( HustleScss, [ 'hustle:styles' ]);

	// Watch Hustle scripts
	gulp.watch( HustleJs, [ 'hustle:scripts' ]);

	// Watch Hustle fonts
	gulp.watch( HustleFonts, [ 'hustle:fonts' ]);

});

// ==================================================
// Development

gulp.task( 'development', [
	'build',
	'watch'
]);