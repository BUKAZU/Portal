import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const portalCode = document.getElementById("bukazu-app").getAttribute("portal-code");
console.log(portalCode);


ReactDOM.render(
    <App portalCode={portalCode} />,
  document.getElementById("bukazu-app")
);
registerServiceWorker();
