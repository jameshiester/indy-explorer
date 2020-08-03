import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '@shared/header';
import Home from '@pages/home';
import { useSocket } from '@hooks/socket';
import { useInit } from '@hooks/app';

function App() {
  useSocket();
  useInit();
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
