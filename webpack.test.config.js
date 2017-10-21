const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, './src');
const testPath = path.join(__dirname, './test');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/website-analyzer/',
  },
  devServer: {
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
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
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ],
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'isparta',
      },
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
