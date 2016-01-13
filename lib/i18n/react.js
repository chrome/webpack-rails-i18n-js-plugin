var escapeOptions = require('./escape')

function createReactElements(I18n) {
  try {
    var React = require('react')
  } catch(ex) {
    return false
  }

  I18n.T = function(props) {
    var scope = props.children
    delete props.children

    return React.createElement('span', {
      dangerouslySetInnerHTML: {
        __html: I18n.t(scope, escapeOptions(props))
      }
    })
  }

  I18n.P = function(props) {
    var scope = props.children
    var count = props.count
    delete props.children
    delete props.count

    return React.createElement('span', {
      dangerouslySetInnerHTML: {
        __html: I18n.p(count, scope, escapeOptions(props))
      }
    })
  }
}

module.exports = createReactElements
