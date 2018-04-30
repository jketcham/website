const path = require('path');
const webpack = require('webpack');

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development';
}

const isDev = process.env.NODE_ENV === 'development';

const paths = {
  index: './src/index.js',
};

console.log('isDev', isDev);

const config = {
  entry: [ paths.index ],

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
      debug: true,
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
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
};


module.exports = config;
