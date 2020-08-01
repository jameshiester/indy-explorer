import React from 'react';
import Header from '@shared/header';
import Home from '@pages/home';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Redirect exact from="/" to="/home" />
      </Switch>
    </div>
  );
}

export default App;
