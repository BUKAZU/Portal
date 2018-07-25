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

const portalCode = document.getElementById("bukazu-app").getAttribute("portal-code");
const objectCode = document.getElementById("bukazu-app").getAttribute("object-code");

ReactDOM.render(
  <ApolloProvider client={client}>
    <App portalCode={portalCode} objectCode={objectCode} />
  </ApolloProvider>,
  document.getElementById("bukazu-app")
);
registerServiceWorker();
