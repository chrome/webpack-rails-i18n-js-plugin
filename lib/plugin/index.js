var querystring = require('querystring')
var path = require('path')
var mergeObjects = require('lodash/object/merge')

var WebpackRailsI18nJSPlugin = function(options) {
  this.defaultOptions = {
    moduleName: 'i18n',
    locale: 'html.lang',
    defaultLocale: 'en',
    rollbarReports: false,
    localesPath: path.join('.', 'config', 'locales')
  }
  this.options = mergeObjects(this.defaultOptions, options || {})
}

WebpackRailsI18nJSPlugin.prototype.apply = function(compiler) {
  var options = this.options
  var moduleName = this.options.moduleName
  var localesPath = this.options.localesPath

  compiler.plugin('normal-module-factory', function(nmf) {
    nmf.plugin('after-resolve', function(data, callback) {
      if (data.rawRequest === moduleName) {
        data.loaders.push(path.join(__dirname, 'loader.js?' + querystring.stringify(options)))
      }
      callback(null, data)
    })
  })

  compiler.resolvers.normal.plugin('module', function(request, callback) {
    if(request.request === moduleName) {
      callback(null, {
        path: path.join(__dirname, '..', 'i18n', 'index.js'),
        query: request.query,
        file: true,
        resolved: true
      })
    } else {
      callback();
    }
  })
}

module.exports = WebpackRailsI18nJSPlugin

