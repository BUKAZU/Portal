var format = require('date-fns/format');

var locales = {
  en: require('date-fns/locale/en'),
  nl: require('date-fns/locale/nl'),
  de: require('date-fns/locale/de'),
  fr: require('date-fns/locale/fr'),
  it: require('date-fns/locale/it'),
  es: require('date-fns/locale/es'),
};

module.exports = function(date, formatStr) {
  return format(date, formatStr, {
    locale: locales[window.__localeId__], // or global.__localeId__
  });
};
