import React from 'react';
import ReactDOM from 'react-dom';

import Portal from 'bukazu-portal-react';
import 'bukazu-portal-react/build/index.css';

// import registerServiceWorker from './registerServiceWorker';

const elem = document.getElementById('bukazu-app');
const elements = document.getElementsByClassName('bukazu-app');
if (elements.length > 0) {
  for (let element of elements) {
    runApp(element);
  }
} else if (elem) {
  runApp(elem);
}

function runApp(element) {
  const portalCode = element.getAttribute('portal-code');
  const objectCode = element.getAttribute('object-code');
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
      locale={locale}
      filters={filters}
    />,
    element
  );
}

// registerServiceWorker()
