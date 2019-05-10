import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Home from '../modules/home/ui/Home';
import About from '../modules/about/ui/About';
import BlogListContainer from '../modules/blog/ui/BlogListContainer';
import NotFound from '../modules/misc/NotFound';
import ErrorBoundary from '../modules/misc/ErrorBoundary';

const AppRouter = () => (
    <Router>
        <ErrorBoundary>
            <Layout>            
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/blogs" exact component={BlogListContainer} />

                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </ErrorBoundary>
    </Router>
);

export default AppRouter;
