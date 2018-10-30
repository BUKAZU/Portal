import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import nl from 'react-intl/locale-data/nl';
import de from 'react-intl/locale-data/de';
import it from 'react-intl/locale-data/it';

const httpLink = createHttpLink({
    uri: 'https://stage.bukazu.eu/graphql'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})


addLocaleData([...en, ...fr, ...es, ...nl, ...it, ...de]);

const element = document.getElementById("bukazu-app")
const portalCode = element.getAttribute("portal-code");
const objectCode = element.getAttribute("object-code");
const locale = element.getAttribute("language");

ReactDOM.render(
  <ApolloProvider client={client}>
    <IntlProvider locale={locale}>
      <App portalCode={portalCode} objectCode={objectCode} />
    </IntlProvider>
  </ApolloProvider>,
  element
);
registerServiceWorker();
