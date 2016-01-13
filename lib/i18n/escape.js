function escapeHtml(string) {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  }
  return string.replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  })
}

function escapeOptions(options) {
  var cleanOptions = {}
  for (var k in options) {
    cleanOptions[k] = typeof options[k] == 'string' ? escapeHtml(options[k]) : options[k]
  }
  return cleanOptions
}

module.exports = escapeOptions
