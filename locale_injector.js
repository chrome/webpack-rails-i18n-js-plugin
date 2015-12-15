'use strict'

const querystring = require('querystring')
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const glob = require('glob')
const mergeObjects = require('lodash/object/merge')

function readLocales(localesPath) {
  const files = glob.sync('**/*.yml', {cwd: localesPath})
  return files.reduce((locales, localeFile) => {
    const locale = yaml.safeLoad(fs.readFileSync(path.join(localesPath, localeFile), 'utf8'))
    return mergeObjects(locales, locale)
  }, {})
}

module.exports = function(src) {
  const lastLine = 'return I18n;'
  const options = querystring.parse(this.query.substr(1))
  const locales = readLocales(options.localesPath)
  const localeString = 'I18n.translations = ' + JSON.stringify(locales) + ';'
  return src
    .replace(lastLine, localeString + "\n" + lastLine)
    .replace('locale: "en"', "locale: document.querySelector('html').lang")
}
