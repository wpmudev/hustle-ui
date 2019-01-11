// ==================================================
// Supported Packages
const fs           = require( 'fs' );
const pump         = require( 'pump' );
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
const browserSync  = require( 'browser-sync' ).create();

// ==================================================
// Get Package File
const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

// ==================================================
// WPMU DEV Banner
const banner = [ '/*!',
	' * WPMU DEV Hustle UI',
	' * Copyright 2019 Incsub (https://incsub.com)',
	' * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)',
	' */',
	'' ].join( '\n' );

// ==================================================
// List of Browsers
const browsersList = [
	'last 2 version',
	'> 1%'
];

// ==================================================
// Paths & Files

const sui = {
	source: {
		main: './node_modules/@wpmudev/dist/',
		fonts: sui.source.main + 'fonts/'
	}
};

const hustle = {
	source: {
		main: './library/',
		fonts: hustle.source.main + 'fonts/',
		scripts: hustle.source.main + 'js/',
		styles: hustle.source.main + 'scss/'
	},
	output: {
		main: './dist/',
		fonts: hustle.output.main + 'fonts/',
		scripts: hustle.output.main + 'js/',
		styles: hustle.output.main + 'css/'
	},
	watch: {
		styles: [
			hustle.source.styles + '**/*.scss'
		],
		scripts: [
			hustle.source.scripts + '*.js'
		],
		fonts: [
			hustle.source.fonts + '*'
		],
		files: [
			hustle.source.main + 'README.md',
			hustle.source.main + 'CHANGELOG.md'
		]
	}
};

const showcase = {
	source: {
		main: './showcase/',
		fonts: showcase.source.main + 'fonts/',
		scripts: showcase.source.main + 'js/',
		styles: showcase.source.main + 'scss/'
	},
	output: {
		main: './public/',
		fonts: showcase.output.main + 'assets/fonts/',
		scripts: showcase.output.main + 'assets/js/',
		styles: showcase.output.main + 'assets/css/',
		images: showcase.output.main + 'assets/images/'
	},
	watch: {
		styles: [
			hustle.source.styles + '**/*.scss',
			showcase.source.styles + '**/*.scss'
		],
		scripts: [
			showcase.source.scripts + '*.js'
		],
		fonts: [
			hustle.source.fonts + '*',
			sui.source.fonts + '*'
		],
		html: [
			hustle.output.main + '*.html'
		]
	}
};

// ==================================================
// BrowserSync
gulp.task( 'browser-sync', function() {

	browserSync.init({

		server: {
			baseDir: showcase.output.main
		}
	});
});

// ==================================================
// Tasks

// Build Hustle styles
gulp.task( 'hustle:styles', function() {

	gulp.src( hustle.watch.styles )
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
		.pipe( gulp.dest( hustle.output.styles ) )
		;
});

// Build Hustle scripts
gulp.task( 'hustle:scripts', function( cb ) {

	pump([
		gulp.src( hustle.watch.scripts ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'hustle-ui.js' ),
		header( banner ),
		gulp.dest( hustle.output.scripts ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( hustle.output.scripts )
	], cb );
});

// Copy Hustle fonts
gulp.task( 'hustle:fonts', function() {

	gulp.src( hustle.watch.fonts )
		.pipe( gulp.dest( hustle.output.fonts ) )
		;
});

// Copy Hustle information files
gulp.task( 'hustle:files', function() {

	gulp.src( hustle.watch.files )
		.pipe( gulp.dest( hustle.output.main ) )
		;
});

// Build Hustle UI
gulp.task( 'hustle:build', [
	'hustle:styles',
	'hustle:scripts',
	'hustle:fonts',
	'hustle:files'
]);

// Build Showcase styles
gulp.task( 'showcase:styles', function() {

	gulp.src( showcase.watch.styles )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browsersList ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( showcase.output.styles ) )
		.pipe( browserSync.stream() )
		;
});

// Build Showcase scripts
gulp.task( 'showcase:scripts', function( cb ) {

	pump([
		gulp.src( showcase.watch.scripts ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'showcase-ui.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

// Copy Showcase fonts
gulp.task( 'showcase:fonts', function() {

	gulp.src( showcase.watch.fonts )
		.pipe( gulp.dest( showcase.output.fonts ) )
		.pipe( browserSync.stream() )
		;
});

// Build Showcase
gulp.task( 'showcase:build', [
	'showcase:styles',
	'showcase:scripts',
	'showcase:fonts'
]);

// ==================================================
// Watch

gulp.task( 'hustle:watch', function() {

	// Watch Hustle styles
	gulp.watch( hustle.watch.styles, [ 'hustle:styles' ]);

	// Watch Hustle scripts
	gulp.watch( hustle.watch.scripts, [ 'hustle:scripts' ]);

	// Watch Hustle fonts
	gulp.watch( hustle.watch.fonts, [ 'hustle:fonts' ]);

	// Watch Hustle information files
	gulp.watch( hustle.watch.files, [ 'hustle:files' ]);

});

gulp.task( 'showcase:watch', function() {

	// Watch Showcase styles
	gulp.watch( showcase.watch.styles, [ 'showcase:styles' ]);

	// Watch Showcase scripts
	gulp.watch( showcase.watch.scripts, [ 'showcase:scripts' ]);

	// Watch Showcase fonts
	gulp.watch( showcase.watch.fonts, [ 'showcase:fonts' ]);

	// Watch for HTML changes
	gulp.watch( showcase.watch.html ).on( 'change', browserSync.reload );

});

// ==================================================
// Development

gulp.task( 'development', [
	'hustle:build',
	'showcase:build',
	'browser-sync',
	'hustle:watch',
	'showcase:watch'
]);
