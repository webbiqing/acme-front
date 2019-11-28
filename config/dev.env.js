'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://47.105.81.163:8821"'
  BASE_URL: '"http://192.168.2.4:8808"'
})
