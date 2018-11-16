'use strict';
const buildPlugins = require('./configs/plugin')()

const config  = {
  framework: 'weex',
  port: 9090,
  buildPath: 'dist',
  alias: {
    '@': 'src'
  },
  loaders: {
    weex: {
      exclude: []
    },
    vue: {
      exclude: []
    }
  },
  plugins: {},
  done() {}
};

module.exports = Object.assign({}, buildPlugins, config)