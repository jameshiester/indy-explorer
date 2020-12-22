import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '@shared/header';
import Home from '@pages/home';
import { useSocket } from '@hooks/socket';
import { useInit } from '@hooks/app';
import { useNodeStatus } from '@hooks/notify';
import SocketContext from './context/socket';
import io from 'socket.io-client';

const socket = io();

const App = () => {
  useSocket(socket);
  useNodeStatus();
  useInit();
  return (
    <SocketContext.Provider value={socket}>
      <div>
        <Switch>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </SocketContext.Provider>
  );
};

export default App;
