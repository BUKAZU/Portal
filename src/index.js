import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import Portal from 'bukazu-portal-react';
import 'bukazu-portal-react/build/index.css';

// import registerServiceWorker from './registerServiceWorker';

if (!global.Intl) {
  require.ensure(
    [
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/de.js',
      'intl/locale-data/jsonp/nl.js',
      'intl/locale-data/jsonp/es.js',
      'intl/locale-data/jsonp/fr.js',
      'intl/locale-data/jsonp/it.js',
    ],
    function(require) {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/de.js');
      require('intl/locale-data/jsonp/nl.js');
      require('intl/locale-data/jsonp/fr.js');
      require('intl/locale-data/jsonp/it.js');
      require('intl/locale-data/jsonp/es.js');
      runTheApp();
    }
  );
} else {
  runTheApp();
}

function runTheApp() {
  const elem = document.getElementById('bukazu-app');
  const elements = document.getElementsByClassName('bukazu-app');
  if (elements.length > 0) {
    for (let element of elements) {
      runApp(element);
    }
  } else if (elem) {
    runApp(elem);
  }
}

function runApp(element) {
  const portalCode = element.getAttribute('portal-code');
  const objectCode = element.getAttribute('object-code');
  const pageType = element.getAttribute('page');
  const locale = element.getAttribute('language');
  let filters = element.getAttribute('filters');

  // console.log({ filters });
  if (filters) {
    filters = JSON.parse(filters);
  } else {
    filters = {};
  }

  ReactDOM.render(
    <Portal
      portalCode={portalCode}
      objectCode={objectCode}
      pageType={pageType}
      locale={locale}
      filters={filters}
    />,
    element
  );
}

// registerServiceWorker()
