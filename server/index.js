import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { StaticRouter } from 'react-router';
import log4js from 'log4js';

import Routes from '../src/app/Routes';
import './config/log4js';
import typeDefs from './schema/blog';
import resolvers from './resolver/blog';

const logger = log4js.getLogger();

const app = express();
const PORT = 4000;

// setup routing
const router = express.Router();
router.get('/api/blogs', (req, res) => {
  const result = {
    blogs: [{
      _id: 1,
      title: 'Seoul',
    }, {
      _id: 2,
      title: 'Tokyo',
    }, {
      _id: 3,
      title: 'London',
    }, {
      _id: 4,
      title: 'Paris',
    }],
  };
  res.status(200).json(result);
});

app.use(router);

// HTML output for SSR
const Html = ({ content, state }) => (
  <html>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
      }} />
    </body>
  </html>
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Server side rendering
app.use((req, res, next) => {
  if (req.url === '/graphql') {
    next();
    return;
  }

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const App = (
    <ApolloProvider client={client}>
      <div className="App">
        <StaticRouter location={req.url} context={context}>
          <Routes />
        </StaticRouter>
      </div>
    </ApolloProvider>
  );

  renderToStringWithData(App).then((content) => {
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;
  
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
    res.end();
  });
});

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Apollo GraphQL
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});
apollo.applyMiddleware({ app });

app.listen(PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
});
