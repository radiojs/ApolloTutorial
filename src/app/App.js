import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import Routes from './Routes';
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
      <Router>
        <Routes />
      </Router>
    </div>
  </ApolloProvider>
);

export default App;
