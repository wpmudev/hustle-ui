// ==================================================
// Call Supported Packages

var fs          = require( 'fs' ),
	pump        = require( 'pump' ),
	child       = require( 'child_process' ),
	browserSync = require( 'browser-sync' ).create(),
	ghpages     = require( 'gh-pages' )
	;

var gulp         = require( 'gulp' ),
	watch        = require( 'gulp-watch' ),
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	cleanCSS     = require( 'gulp-clean-css' ),
	eslint       = require( 'gulp-eslint' ),
	uglify       = require( 'gulp-uglify-es' ).default,
	concat       = require( 'gulp-concat' ),
	rename       = require( 'gulp-rename' ),
	replace      = require( 'gulp-replace' ),
	gutil        = require( 'gulp-util' )
	;

// ==================================================
// Get package.json file
var pckg = JSON.parse( fs.readFileSync( './package.json' ) );

// ==================================================
// Browsers
var browserslist = [
	'last 2 version',
	'> 1%'
];

// ==================================================
// Paths
var paths = {
	site: '_site/',
	includes: '_includes/',
	layouts: '_layouts',
	assets: 'assets/',
	showcase: '_assets/showcase/',
	hustle: '_assets/hustle/',
	library: '_library/'
};

var hustle = {
	scss: paths.hustle + 'scss/',
	js: paths.hustle + 'js/'
};

var showcase = {
	scss: paths.showcase + 'scss/',
	js: paths.hustle + 'js/'
};

var assets = {
	css: paths.assets + 'css/',
	js: paths.assets + 'js/'
};

// ==================================================
// Github Pages

// Publish files to `gh-pages` branch on Github
ghpages.publish( 'public', {
	branch: 'gh-pages',
	user: {
		name: 'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
});

// Publish files to `master` branch on Github
ghpages.publish( 'library', {
	branch: 'master',
	user: {
		name: 'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
});

// ==================================================
// List of files to watch

const SiteRoot = [
	paths.site + '**/**/**',
	paths.includes + '**',
	paths.layouts + '**'
];

const HustleJS = [
	hustle.js + '*.js'
];

const HustleScss = [
	hustle.scss + '**/**/*.scss'
];

const ShowcaseJs = [
	hustle.js + '*.js',
	showcase.js + '*.js'
];

const ShowcaseScss = [
	hustle.scss + '*.scss',
	showcase.scss + '*.scss'
];

// ==================================================
// Tasks

// TASK: Build hustle styles
gulp.task( 'hustle:styles', function() {

	gulp.src( HustleScss )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( paths.library ) )
		.pipe( browserSync.stream() )
		;
});

// TASK: Build hustle scripts
gulp.task( 'hustle:scripts', function( cb ) {

	pump([
		gulp.src( HustleJS ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'hustle-ui.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( paths.library ),
		browserSync.stream()
	], cb );
});

// TASK: Build showcase styles
gulp.task( 'showcase:styles', function() {

	gulp.src( ShowcaseScss )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( assets.css ) )
		.pipe( browserSync.stream() )
		;
});

// TASK: Build hustle scripts
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
		gulp.dest( assets.js ),
		browserSync.stream()
	], cb );
});

// Task: Build hustle files
gulp.task( 'build:hustle', [
	'hustle:styles',
	'hustle:scripts'
]);

// Task: Build showcase files
gulp.task( 'build:showcase', [
	'showcase:styles',
	'showcase:scripts'
]);

// Task: Build Jekyll
gulp.task( 'build:jekyll', function() {

	var jekyll = child.spawn( 'jekyll', [
		'build',
		'--watch',
		'--incremental',
		'--drafts'
	]);

	function jekyllLogger( buffer ) {

		buffer.toString()
			.split( /\n/ )
			.forEach( function( message ) {
				gutil.log( 'Jekyll: ' + message );
			})
			;
	};

	jekyll.stdout.on( 'data', jekyllLogger );
	jekyll.stderr.on( 'data', jekyllLogger );

});

// Task: Watch for changes across project
gulp.task( 'watch', function() {

	// Watch for hustle styles changes
	gulp.watch( HustleScss, [ 'hustle:styles' ]);

	// Watch for hustle js changes
	gulp.watch( HustleJS, [ 'hustle:scripts' ]);

	// Watch for showcase styles changes
	gulp.watch( ShowcaseScss, [ 'showcase:styles' ]);

	// Watch for showcase js changes
	gulp.watch( ShowcaseJs, [ 'showcase:scripts' ]);

});

// Task: Initialize the server
gulp.task( 'server', function() {

	browserSync.init({
		files: [ SiteRoot ],
		port: 4000,
		server: {
			baseDir: paths.site
		}
	});
});

// Task: Run development environment
gulp.task( 'start', [
	'build:hustle',
	'build:showcase',
	'build:jekyll',
	'server',
	'watch'
]);
