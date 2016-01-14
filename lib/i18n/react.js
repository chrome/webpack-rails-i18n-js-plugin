var escapeOptions = require('./escape')
var omit = require('lodash/object/omit')

function reactElement(React, scope, content) {
  if (scope.match(/_html$/)) {
    return React.createElement('span', {dangerouslySetInnerHTML: {__html: content}})
  } else {
    return React.createElement('span', null, content)
  }
}

function createReactElements(I18n) {
  try {
    var React = require('react')
  } catch(ex) {
    return false
  }

  I18n.T = function(props) {
    var scope = props.scope
    var cleanProps = escapeOptions(omit(props, ['scope']))

    return reactElement(React, scope, I18n.t(scope, cleanProps))
  }

  I18n.P = function(props) {
    var scope = props.scope
    var count = props.count
    var cleanProps = escapeOptions(omit(props, ['scope', 'count']))

    return reactElement(React, scope, I18n.p(count, scope, cleanProps))
  }
}

module.exports = createReactElements
