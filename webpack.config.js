const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, './src');
const testPath = path.join(__dirname, './test');


module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/music-web-app/',
  },
  devServer: {
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'test'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader'
      }
    ],
  },
  resolve: {
    alias: {
      components: `${srcPath}/components/`,
      utils: `${srcPath}/utils/`,
      styles: `${srcPath}/styles/`,
      test: testPath,
    },
  },
};
