import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { getAuthToken } from '../lib/auth';
import ToastListContainer from '../modules/toast/ui/ToastListContainer';
import Routes from './Routes';
import typeDefs from '../modules/toast/apollo/schema';
import resolvers from '../modules/toast/apollo/resolvers';

// Apollo Client
const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    typeDefs,
    resolvers,
});

cache.writeData({
  data: {
    toasts: [],
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Router>
        <Routes />
      </Router>
      <ToastListContainer />
    </div>
  </ApolloProvider>
);

export default App;
