const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production', // with this, don't need --mode production in package.json
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main-[contenthash].js',
		clean: true,
		assetModuleFilename: 'img/[name][ext]'
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		port: 7777,
		open: false,
		hot: true,
		compress: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
		          MiniCssExtractPlugin.loader,
		          'css-loader',
		          'sass-loader'
		        ]
			},
			{
		       	test: /\.(png|svg|jpg|jpeg|gif)$/i,
		        type: 'asset/resource',
		        generator: {
		          filename: 'images/[name][ext]'
		        }
		    },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Frontend Scaffold',
			filename: 'index.html',
			template: 'src/templates/index.html',
			minify: false,
			pretty: true
		}),
		new MiniCssExtractPlugin({
	    	filename: 'css/main.css'
	    }),
	    new CopyWebpackPlugin({
	      patterns: [
	        { 
	          from: path.resolve(__dirname, 'src/images'),
	          to: path.resolve(__dirname, 'dist/images')
	        }
	      ],
	    }),
	    //new BundleAnalyzerPlugin()
	],
	// watch: true,
	// watchOptions: {
	// 	ignored: /node_modules/,
	// 	poll: 1000 // Check for changes every second
	// },
}