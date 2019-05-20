import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Home from '../modules/home/ui/Home';
import About from '../modules/about/ui/About';
import BlogListContainer from '../modules/blog/ui/BlogListContainer';
import SignUpContainer from '../modules/user/ui/SignUpContainer';
import SignInContainer from '../modules/user/ui/SignInContainer';
import NotFound from '../modules/misc/NotFound';
import ErrorBoundary from '../modules/misc/ErrorBoundary';

const AppRouter = () => (
    <ErrorBoundary>
        <Layout>            
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/blogs" exact component={BlogListContainer} />

                <Route path="/sign-up" exact component={SignUpContainer} />
                <Route path="/sign-in" exact component={SignInContainer} />

                <Route component={NotFound} />
            </Switch>
        </Layout>
    </ErrorBoundary>
);

export default AppRouter;
