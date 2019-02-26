const base = require('./webpack/base');
const development = require('./webpack/dev');
const production = require('./webpack/prod');

const configs = {
  development,
  production,
};

function getConfig() {
  let config = configs[process.env.NODE_ENV];

  if (!config) {
    config = development;
  }

  return Object.assign(base, config);
}

module.exports = getConfig();
