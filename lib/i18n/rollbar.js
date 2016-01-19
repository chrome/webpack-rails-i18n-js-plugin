function missingScopeMessage(I18nJS, scope, options) {
  var fullScope = I18nJS.getFullScope(scope, options)
  var fullScopeWithLocale = [I18nJS.currentLocale(), fullScope].join(I18nJS.defaultSeparator)
  return '[missing "' + fullScopeWithLocale + '" translation]';
}

function createRollbarReporter(I18nJS, options) {
  if (options.rollbarReports) {
    var originalHandler = I18nJS.missingTranslation
    I18nJS.missingTranslation = function(scope, options) {
      if (window && window.Rollbar) {
        window.Rollbar.error(missingScopeMessage(I18nJS, scope, options))
      }
      return originalHandler.apply(I18nJS, [scope, options])
    }
  }
}

module.exports = createRollbarReporter
