var I18nJS = require('i18n-js')
var createReactElements = require('./react')
var createRollbarReporter = require('./rollbar')

I18nJS.reset()

var options = //OPTIONS//
{}

var currentLocale = options.locale

if (currentLocale == 'html.lang') {
  if (typeof document !== 'undefined') {
    currentLocale = document.querySelector('html').lang
    if (!currentLocale) {
      currentLocale = options.defaultLocale
    }
  } else {
    currentLocale = options.defaultLocale
  }
}

for(key in options) {
  I18nJS[key] = options[key]
}

I18nJS.locale = currentLocale
I18nJS.translations = //TRANSLATIONS//
{}

var I18n = {}

for (var key in I18nJS) {
  if (typeof I18nJS[key] == 'function') {
    I18n[key] = I18nJS[key].bind(I18nJS)
  }
}

createReactElements(I18n)
createRollbarReporter(I18nJS, options)

module.exports = I18n
