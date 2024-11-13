const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
	          {
	            loader: 'css-loader',
	            options: {
	              sourceMap: true
	            }
	          },
	          {
	            loader: 'postcss-loader',
	            options: {
	              postcssOptions: {
	                plugins: [
	                  [
	                    'cssnano',
	                    {
	                      // cssnano options
	                      preset: ['default', {
	                        discardComments: {
	                          removeAll: true,
	                        },
	                        mergeLonghand: true,
	                        mergeRules: true
	                      }],
	                    },
	                  ],
	                ],
	              },
	            },
	          },
	          'sass-loader'
	        ]
	      }
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
	    })
	],
	// watch: true,
	// watchOptions: {
	// 	ignored: /node_modules/,
	// 	poll: 1000 // Check for changes every second
	// },
}