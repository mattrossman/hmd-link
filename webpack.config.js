const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	plugins: [
		new HtmlWebpackPlugin({
            template: './src/index.html',
		})
	],
	module: {
		rules: [
			{ test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	},
	resolve: {
		modules: [ 'node_modules', 'src' ],
		extensions: ['.js', '.jsx'],
		alias: {
			"react": "preact/compat",
			"react-dom": "preact/compat"
		}
	}
};


if (process.env.ANALYZE !== undefined) {
	const bundleAnalyzer = new BundleAnalyzerPlugin()
	module.exports.plugins.push(bundleAnalyzer);
}