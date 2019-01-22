const path = require('path');
const webpack = require('webpack');

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development';
}

const isDev = process.env.NODE_ENV === 'development';

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: ['./src/index.js'],

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev }},
          { loader: 'css-loader', options: { modules: true, minimize: !isDev }},
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: { configFile: path.resolve(__dirname, '.eslintrc') },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: isDev,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8181/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
  },

  devServer: {
    port: 8181,
    host: '0.0.0.0',
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
};

module.exports = config;
