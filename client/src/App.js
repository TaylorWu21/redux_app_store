import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import FetchApps from './components/FetchApps';
import NoMatch from './components/NoMatch';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/apps" component={FetchApps} />
    <Route component={NoMatch} />
  </Switch>
)

export default App;
