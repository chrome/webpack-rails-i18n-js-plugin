# webpack-rails-i18n-js-plugin

## Usage
```js
// webpack.config.js
var WebpackRailsI18nJS = require('webpack-rails-i18n-js-plugin')

plugins: [
  new WebpackRailsI18nJS({
    // Locale to be used. Default value: 'html.lang'. Can be ether:
    // 1. Locale name ("en" for example)
    // 2. "html.lang" locale will be taken from `<html lang="en">` atribute
    locale: 'html.lang',

    // Deafult local. Default value: 'en'
    defaultLocale: 'en',

    // Path to yaml files. Default value: `./config/locales`
    localesPath: __dirname
  })
]
```


```js
var I18n = require('i18n');

console.log(I18n.translate('hello'))
```

More info about client API you can found at https://github.com/fnando/i18n-js
