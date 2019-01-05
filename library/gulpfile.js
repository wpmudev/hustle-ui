// ==================================================
// Supported Packages
const fs           = require( 'fs' );
const pump         = require( 'pump' );
const ghpages      = require( 'gh-pages' );
const gulp         = require( 'gulp' );
const watch        = require( 'gulp-watch' );
const sass         = require( 'gulp-sass' );
const header       = require( 'gulp-header' );
const autoprefixer = require( 'gulp-autoprefixer' );
const cleanCSS     = require( 'gulp-clean-css' );
const eslint       = require( 'gulp-eslint' );
const uglify       = require( 'gulp-uglify-es' ).default;
const concat       = require( 'gulp-concat' );
const rename       = require( 'gulp-rename' );

// ==================================================
// Get Package File
const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

// ==================================================
// WPMU DEV Banner
const banner = ['/*!',
	' * WPMU DEV Hustle UI',
	' * Copyright 2019 Incsub (https://incsub.com)',
	' * Licensed under GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)',
	' */',
	''].join('\n');

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
	fonts: 'dist/fonts',
	files: 'dist/'
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

// Hustle files
const HustleFiles = [
	'./README.md',
	'./CHANGELOG.md'
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
		.pipe( header( banner ) )
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
		header( banner ),
		gulp.dest( dist.js ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( dist.js )
	], cb );
});

// Copy Hustle fonts
gulp.task( 'hustle:fonts', function() {

	gulp.src( HustleFonts )
		.pipe( gulp.dest( dist.fonts ) )
		;
});

// Copy Hustle information files
gulp.task( 'hustle:files', function() {

	gulp.src( HustleFiles )
		.pipe( gulp.dest( dist.files ) )
		;
});

// Build Hustle UI assets
gulp.task( 'build', [
	'hustle:styles',
	'hustle:scripts',
	'hustle:fonts',
	'hustle:files'
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

	// Watch Hustle information files
	gulp.watch( HustleFiles, [ 'hustle:files' ]);

});

// ==================================================
// Development

gulp.task( 'development', [
	'build',
	'watch'
]);
