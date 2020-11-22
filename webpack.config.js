const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const webpack           = require('webpack');

module.exports = {
	mode:         'development',
	entry:        path.resolve(__dirname, 'src/index.js'),
	watch:        true,
	watchOptions: {
		poll: 1000
	},
	output:       {
		filename: "bundle.js",
		path:     path.resolve(__dirname, 'dist'),

	},
	resolve:      {
		extensions: ['.js', '.ts', '.tsx', '.vue', '.json'],
		alias:      {
			'vue$': 'vue/dist/vue.esm.js',
		},
	},
	devServer:    {
		contentBase: 'dist',
		hot:          true,
		host:         'localHost',
		port:         4040,
	},
	module:       {
		rules: [
			{
				test:    /\.ts?$/,
				use:     'ts-loader',
				exclude: /node_modules/,
			},
			{
				test:    /\.vuets$/,
				loader:  'vue-loader',
				options: {
					loader:   'ts-loader',
					esModule: true,
				},
			},
			{
				test: /\.scss?$/i,
				use:  ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				use:  ['style-loader', 'css-loader'],
			},
			{
				test: /\.vue$/,
				use:  'vue-loader',
			}
		]
	},
	plugins:      [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html"
		})
	],
}
