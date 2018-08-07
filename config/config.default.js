'use strict';

const path = require('path');

module.exports = {
  keys: 'key',
  static: {
    maxAge: 0,
  },
  isomorphic: {
    babel: {
      plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
    },
  },
  webpack: {
    custom: {
      configPath: path.join(__dirname, './webpack.config.js'),
    },
  },
};
