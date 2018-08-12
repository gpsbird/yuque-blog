'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import AppStore from '../stores/app';
import PostStore from '../stores/post';

import { DefaultLayout, HomeLayout } from '../containers/Layout';
import Home from '../pages/Home';
import Post from '../pages/Post';
import Blog from '../pages/Blog';
import About from '../pages/About';
import NotFound from '../pages/404';

import '../styles/site.scss';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

const appStore = new AppStore();
let postStore;

if (__CLIENT__) {
  appStore.listenWindow();
  const initialState = window.initialState || {};
  postStore = PostStore.fromJS(initialState);
}

export default (props) => {
  const { context, location } = props;
  return (
    <section>
      <DevTool />
      <Provider appStore={appStore} postStore={props.store || postStore} >
        <Router context={context} location={location}>
          <Switch>
            <HomeLayout exact path="/" component={Home} />
            <DefaultLayout path="/post/:slug" component={Post} />
            <DefaultLayout path="/blogs/" component={Blog} />
            <DefaultLayout path="/about/" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </section>
  );
};
