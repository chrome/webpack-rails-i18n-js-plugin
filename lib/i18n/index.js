var I18nJS = require('i18n-js')

var defaultLocale = //DEFAULT_LOCALE//
'en'

var currentLocale = //CURRENT_LOCALE//
defaultLocale

if (currentLocale == 'html.lang') {
  if (typeof document !== 'undefined') {
    currentLocale = document.querySelector('html').lang
    if (!currentLocale) {
      currentLocale = defaultLocale
    }
  } else {
    currentLocale = defaultLocale
  }
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

module.exports = I18n
