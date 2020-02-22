const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_MODULES = path.join(process.cwd(), 'node_modules');

const extractCSS = new ExtractTextPlugin({ filename: 'bundle.css' });

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules']
  },
  entry: {
    main: [ path.resolve(__dirname, 'src', 'main.ts') ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        })
     },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
  },
  plugins: [
    extractCSS,
    new CleanWebpackPlugin([ 'dist' ], { verbose: true }),
    new ProgressPlugin(),
    new CommonsChunkPlugin({
      name: [
        'vendor'
      ],
      minChunks: (module) => {
        return module.resource && module.resource.startsWith(NODE_MODULES)
      },
      chunks: [
        'main'
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'App',
      xhtml: true
    })
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
}
