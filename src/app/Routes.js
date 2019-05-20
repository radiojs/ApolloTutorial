import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { currentUser } from '../lib/auth';
import Layout from '../components/layout/Layout';
import Home from '../modules/home/ui/Home';
import About from '../modules/about/ui/About';
import BlogListContainer from '../modules/blog/ui/BlogListContainer';
import MyBlogListContainer from '../modules/blog/ui/MyBlogListContainer';
import ProfileContainer from '../modules/user/ui/ProfileContainer';
import SignUpContainer from '../modules/user/ui/SignUpContainer';
import SignInContainer from '../modules/user/ui/SignInContainer';
import NotFound from '../modules/misc/NotFound';
import ErrorBoundary from '../modules/misc/ErrorBoundary';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => currentUser() ? Component(props) : (
        <Redirect
            to={{
                pathname: '/sign-in',
                state: { from: props.location },
            }}
        />
      )}
    />
  );
  
const AppRouter = () => (
    <ErrorBoundary>
        <Layout>            
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/blogs" exact component={BlogListContainer} />

                <PrivateRoute path="/my-blogs" exact component={MyBlogListContainer} />
                <PrivateRoute path="/my-profile" exact component={ProfileContainer} />
                
                <Route path="/sign-up" exact component={SignUpContainer} />
                <Route path="/sign-in" exact component={SignInContainer} />

                <Route component={NotFound} />
            </Switch>
        </Layout>
    </ErrorBoundary>
);

export default AppRouter;
