// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'source-map',

  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'jack ketcham',

      baseHref: '/',
      appMountId: 'root',
      lang: 'en-US',
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
        href: 'https://alpha.jackketcham.com/api/micropub',
      }],
      bodyHtmlSnippet: '<a rel="me" href="https://mastodon.technology/@jket" style="display: none"></a>',
    }),
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    filename: '[name].[contenthash].js',
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
