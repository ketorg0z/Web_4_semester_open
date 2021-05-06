import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MainPage from './MainPage';
import Game from './Game';
import Translate from './Translate'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
 export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/Game" component={Game} />
    <Route path="/Translate" component={Translate} />
  </Route>
);