var querystring = require('querystring')
var path = require('path')
var yaml = require('js-yaml')
var fs = require('fs')
var glob = require('glob')
var mergeObjects = require('lodash/object/merge')

function readLocales(localesPath) {
  var files = glob.sync('**/*.yml', {cwd: localesPath})
  return files.reduce(function(locales, localeFile) {
    var locale = yaml.safeLoad(fs.readFileSync(path.join(localesPath, localeFile), 'utf8'))
    return mergeObjects(locales, locale)
  }, {})
}

module.exports = function(src) {
  var options = querystring.parse(this.query.substr(1))
  var locales = readLocales(options.localesPath)
  var localeString = JSON.stringify(locales)
  return src
    .replace('//DEFAULT_LOCALE//', "'" + options.defaultLocale + "'")
    .replace('//CURRENT_LOCALE//', "'" + options.locale + "'")
    .replace('//TRANSLATIONS//', localeString)
}
