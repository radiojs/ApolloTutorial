import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import Router from './Router';
import './App.scss';

// Apollo Client
const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({
    cache,
    link,
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Router />
    </div>
  </ApolloProvider>
);

export default App;
