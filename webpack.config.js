const webpack = require("webpack")

module.exports = {
	entry: {
		app: "./client/src/App.js"
	},
	output: {
		filename:"./server/public/dist/bundle.js",
    sourceMapFilename: "./server/public/dist/bundle.map"
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
