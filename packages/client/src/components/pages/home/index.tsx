import React from 'react';
import Box from '@material-ui/core/Box';
import Nav from './Nav';
import { Route, Redirect, Switch } from 'react-router-dom';
import ValidatorList from './validator';
import DidList from './did';
import Transactions from './transaction';
import Visualize from './visualize';

const Home: React.FC = () => {
  return (
    <Box mx={4} my={2}>
      <Nav
        tabs={[
          { text: 'Nodes', to: '/nodes' },
          { text: 'DIDs', to: '/dids' },
          { text: 'Transactions', to: '/transactions' },
          { text: 'Visualizer', to: '/visualize' },
        ]}
      />
      <Switch>
        <Route path={'/home/transactions'}>
          <Transactions />
        </Route>
        <Route strict path={'/home/nodes'}>
          <ValidatorList />
        </Route>
        <Route strict path={'/home/dids'}>
          <DidList />
        </Route>
        <Route strict path={'/home/visualize'}>
          <Visualize />
        </Route>
        <Redirect exact from="/home" to="/home/nodes" />
      </Switch>
    </Box>
  );
};

export default Home;
