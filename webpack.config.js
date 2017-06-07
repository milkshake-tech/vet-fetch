const webpack = require("webpack")
const path = require('path')

module.exports = {
	entry: {
		app: './client/src/App.js'
	},
	output: {
		path: path.join(__dirname, './server/public/dist'),
		filename:"bundle.js",
    sourceMapFilename: "bundle.map"
	},
  devtool: '#source-map',
	plugins: process.env.NODE_ENV === 'production' ? [
	    new webpack.DefinePlugin({
        'process.env': {
        	'NODE_ENV': JSON.stringify('production')
        }
	    }),
    	new webpack.optimize.UglifyJsPlugin({
    		minimize: true,
		    compress: {
		    	warnings: true
		    }
    	})
	] : [],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query:{
					presets:['react', 'es2015']
				}
			}
		]
	}
}
