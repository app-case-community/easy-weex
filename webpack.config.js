'use strict';
const merge = require('lodash.merge')
const buildPlugins = require('./configs/plugin')()
const { urlRelativeOption } = require('./configs/global')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const isProd = 'production' === process.env.NODE_ENV

const loaders = {}
const plugins = []

if (isProd) {
  plugins.push(new CleanWebpackPlugin(['dist']))

  merge(loaders, {
    urlimage: {
      options: urlRelativeOption('img')
    }
  })
}

const config = {
  framework: 'weex',
  port: 9090,
  buildPath: 'dist',
  publicPath: isProd ? './' : 'dist/',
  alias: {
    '@': 'src',
    '@views': 'src/views',
    '@components': 'src/components'
  },
  loaders,
  plugins,
  done() {}
};

module.exports = merge(buildPlugins, config)