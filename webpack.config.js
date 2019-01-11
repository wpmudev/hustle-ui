const path = require( 'path' );
const webpack = require( 'webpack' );

// As Webpack only understands JS, we'll use this plugin to extract the CSS to a file
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// If there's an error, the console will beep
const SystemBellPlugin = require( 'system-bell-webpack-plugin' );

const config = {
	source: {},
	output: {}
};

// Full path of main files that need to be ran through the bundler
config.source.suicss = './showcase/scss/showcase.scss';
config.source.huicss = './showcase/scss/hustle-ui.scss';
config.source.huijs  = './showcase/js/hustle-ui.js';

// Path where the scss & js should be compiled to
config.output.dirCss = 'public/assets/css/';
config.output.dirJs  = 'public/assets/js/';

// File names of the compiled scss & js
config.output.jsFileName = 'hustle-ui.min.js';

// The path where the Shared UI fonts & images should be sent. (relative to config.output.jsFileName)
config.output.imagesDirectory = '../images/';
config.output.fontsDirectory  = '../fonts/';

const scssConfig = Object.assign({}, {
	entry: {
		'showcase': config.source.suicss,
		'hustle-ui': config.source.huicss
	},
	output: {
		filename: '[name].min.css',
		path: path.resolve( __dirname, config.output.dirCss )
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'resolve-url-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: config.output.imagesDirectory
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: config.output.fontsDirectory
					}
				}
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new SystemBellPlugin(),
		new ExtractTextPlugin({
			filename: '../css/[name].min.css'
		})
	],
	watchOptions: {
		poll: 500
	}
});

const jsConfig = Object.assign({}, {
	entry: config.source.huijs,
	output: {
		filename: config.output.jsFileName,
		path: path.resolve( __dirname, config.output.dirJs )
	},
	module: {
        rules: [ {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ 'env' ]
				}
			}
		} ]
	},
	devtool: 'source-map',
	plugins: [
		new SystemBellPlugin()
	]
});

module.exports = [
	scssConfig,
	jsConfig
];
