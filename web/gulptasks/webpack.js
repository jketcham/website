const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const serve = require('webpack-serve');
const WEBPACK_CONFIGS = require('require-dir')('../webpack');


const STATS_OPTIONS = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false,
};


// Production build
gulp.task('webpack:build', (callback) => {
  webpack(WEBPACK_CONFIGS['webpack.prod.config'], (err, stats) => {
    if (err) {
      throw new gutil.PluginError('[webpack:build]', err);
    }
    gutil.log('[webpack:build]', stats.toString(STATS_OPTIONS));
    callback();
  });
});


// Development build
gulp.task('webpack:dev', (callback) => {
  webpack(WEBPACK_CONFIGS['webpack.dev.config']).watch(100, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('[webpack:dev]', err);
    }
    gutil.log('[webpack:dev]', stats.toString(STATS_OPTIONS));
  });
});

// Hot loading server
gulp.task('webpack-serve', (callback) => {
  const host = '0.0.0.0';
  const port = 8181;
  const compiler = webpack(WEBPACK_CONFIGS['webpack.dev.config']);

  const serverConfig = {
    logTime: true,
    clipboard: false,
    logLevel: 'trace',
    hot: true,
    dev: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      publicPath: `${WEBPACK_CONFIGS['webpack.dev.config'].output.publicPath}`,
      stats: STATS_OPTIONS,
    },
    compiler,
    host,
    port,
  };

  // Start webpack-serve
  return serve(serverConfig).then((server) => {
    server.on('listening', () => {
      gutil.log('[webpack-serve]', 'Listening...');
    });

    server.on('compiling', () => {
      gutil.log('wow compile', 'yeah');
    });

    server.on('compiler-error', () => {
      throw new gutil.PluginError('[webpack-serve]', err);
    });
  });
});
