// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  devtool: 'inline-source-map',

  mode: 'development',

  // TODO: deeply merge configs so we don't need to re-include other parts
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([
      path.resolve(__dirname, '../dist')
    ], { root: path.resolve(__dirname, '..') }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'jack ketcham',

      baseHref: '/',
      appMountId: 'root',
      lang: 'en-US',
      devServer: 'http://localhost:8181',
      meta: [{
        name: 'description',
        content: 'Jack Ketcham; human',
      }, {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1',
      }, {
        name: 'theme-color',
        content: '#000000',
      }, {
        charset: 'utf-8',
      }],
      links: [{
        href: '/static/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180'
      }, {
        href: '/static/favicon-16x16.png',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png'
      }, {
        href: '/static/favicon-32x32.png',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png'
      }, {
        rel: 'me',
        href: 'https://twitter.com/_jket',
      }, {
        rel: 'me',
        href: 'https://github.com/jketcham',
      }, {
        rel: 'me',
        href: 'https://mastodon.technology/@jket',
      }, {
        rel: 'me',
        href: 'mailto:jack@jackketcham.com',
      }, {
        rel: 'authorization_endpoint',
        href: 'https://indieauth.com/auth',
      }, {
        rel: 'token_endpoint',
        href: 'https://tokens.indieauth.com/token',
      }, {
        rel: 'micropub',
        href: 'https://jackketcham.com/api/micropub',
      }],
      bodyHtmlSnippet: '<a rel="me" href="https://mastodon.technology/@jket" style="display: none"></a>',
    }),
  ],


  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://localhost:8181/dist/',
    filename: '[name].bundle.js',
  },

  devServer: {
    port: 8181,
    host: '0.0.0.0',
    hot: true,
    writeToDisk: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

};

module.exports = config;
