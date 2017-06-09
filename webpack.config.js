module.exports = {
	devServer: {
	//publicPath: '/dist/',
	//host: '192.168.0.104',
	inline: true,
	port: 8090,
	colors: true
	},
  entry: {
  	bundle1:'./index.js'
  },
  output: {
    filename: './bundle.js',
    chunkFilename: './[name].chunk.js'
  },
  module: {
    loaders: [
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.(css)$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			},{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
						plugins: ['transform-runtime'],
						presets: ['es2015', 'stage-0', 'react'],
				}
			}
		]
  },
};