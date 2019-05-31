import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import { getMainDefinition  } from 'apollo-utilities';

import { getAuthToken } from '../lib/auth';
import ToastListContainer from '../modules/toast/ui/ToastListContainer';
import Routes from './Routes';
import typeDefs from '../modules/toast/apollo/schema';
import resolvers from '../modules/toast/apollo/resolvers';

// Apollo Client
const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true },
});
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

const httpWsLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([authLink, httpWsLink]),
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
