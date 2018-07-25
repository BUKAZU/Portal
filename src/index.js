import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
    uri: 'https://stage.bukazu.eu/graphql'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const element = document.getElementById("bukazu-app")
const portalCode = element.getAttribute("portal-code");
const objectCode = element.getAttribute("object-code");

ReactDOM.render(
  <ApolloProvider client={client}>
    <App portalCode={portalCode} objectCode={objectCode} />
  </ApolloProvider>,
  element
);
registerServiceWorker();
