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

const paths = {
	lib: 'library/',
	libDist: 'library/public/',
	assets: 'src/assets/',
	assetsDist: 'public/assets/'
};

const libProd = {
	js: paths.lib + 'js/',
	scss: paths.lib + 'scss/'
};

const libPublic = {
	js: paths.libDist + 'js/',
	css: paths.libDist + 'css/',
	fonts: paths.libDist + 'fonts/'
};

const assets = {
	js: paths.assets + 'js/',
	scss: paths.assets + 'scss/'
};

const deploy = {
	js: paths.assetsDist + 'js/',
	css: paths.assetsDist + 'css/',
	fonts: paths.libDist + 'fonts/'
};

// ==================================================
// Publish to Github

// Showcase
// Publish files to `gh-pages` branch on Github
ghpages.publish( 'public', {
	branch: 'gh-pages',
	user: {
		name: 'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
});

// Library
// Publish files to `master` branch on Github
ghpages.publish( 'library', {
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
	libProd.scss + '**/*.scss'
];

// Hustle scripts
const HustleJs = [
	libProd.js + '*.js'
];

// Showcase styles
const ShowcaseScss = [
	assets.scss + '**/*.scss',
	libProd.scss + '**/*.scss'
];

// Showcase scripts
const ShowcaseJs = [
	assets.js + '*.js'
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
		.pipe( gulp.dest( libPublic.css ) )
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
		gulp.dest( deploy.js ),
		gulp.dest( libPublic.js )
	], cb );
});

// Build showcase styles
gulp.task( 'showcase:styles', function() {

	gulp.src( ShowcaseScss )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browsersList ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( deploy.css ) )
		;
});

// Build showcase scripts
gulp.task( 'showcase:scripts', function( cb ) {

	pump([
		gulp.src( ShowcaseJs ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'showcase.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( deploy.js )
	], cb );
});

// Build Hustle UI assets
gulp.task( 'build:hustle', [
	'hustle:styles',
	'hustle:scripts'
]);

// Build showcase assets
gulp.task( 'build:showcase', [
	'showcase:styles',
	'showcase:scripts'
]);

// ==================================================
// Watch

gulp.task( 'watch', function() {

	// Watch Hustle styles
	gulp.watch( HustleScss, [ 'hustle:styles' ]);

	// Watch Hustle scripts
	gulp.watch( HustleJs, [ 'hustle:scripts' ]);

	// Watch showcase styles
	gulp.watch( ShowcaseScss, [ 'showcase:styles' ]);

	// Watch showcase scripts
	gulp.watch( ShowcaseJs, [ 'showcase:scripts' ]);

});

// ==================================================
// Development

gulp.task( 'development', [
	'build:hustle',
	'build:showcase',
	'watch'
]);
