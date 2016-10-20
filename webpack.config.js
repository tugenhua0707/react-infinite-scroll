var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    "index": './app/index/index.js',
    'vendor': ["react", "react-dom"]
  },
  output: {
    path: path.join(__dirname,'build'),
    filename: '[name].bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new HtmlwebpackPlugin({
      title: '铜板街',
      filename: '../index.html',  
      template: './template/index.html',
      inject: true,
      hash: true,
      chunks: ['vendor','index']
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx','.styl']
  },
  //devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        include: path.join(__dirname, 'app')
      },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'stylus?sourceMap' + 
            'style?sourceMap'
        )
      },
      {
        test: /.(png|jpg)$/, 
        loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
      }
    ]
  },
  devServer: {
    contentBase: './',
    port:9000,
    historyApiFallback:true
  }
};