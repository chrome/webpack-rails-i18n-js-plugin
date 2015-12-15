var path = require('path')

var WebpackRailsI18nJSPlugin = function(options) {
  this.defaultOptions = {
    moduleName: 'i18n-js',
    localesPath: __dirname
  }
  this.options = Object.assign({}, this.defaultOptions, options || {})
}

WebpackRailsI18nJSPlugin.prototype.apply = function(compiler) {
  const moduleName = this.options.moduleName
  const localesPath = this.options.localesPath

  compiler.plugin('normal-module-factory', function(nmf) {
    nmf.plugin('after-resolve', function(data, callback) {
      if (data.rawRequest === moduleName) {
        data.loaders.unshift(path.join(__dirname, 'locale_injector.js?localesPath=' + localesPath))
      }
      callback(null, data)
    })
  })
}

module.exports = WebpackRailsI18nJSPlugin
