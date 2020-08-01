import React from 'react';
import Box from '@material-ui/core/Box';
import Nav from './Nav';
import { Route, Redirect, Switch } from 'react-router-dom';
import ValidatorList from './validator';
import Transactions from './transaction/List';
import Visualize from './visualize';

const Home: React.FC = () => {
  return (
    <Box mx={4} my={12}>
      <Nav
        tabs={[
          { text: 'Validators', to: '/validators' },
          { text: 'Transactions', to: '/transactions' },
          { text: 'Visualizer', to: '/visualize' },
        ]}
      />
      <Switch>
        <Route path={'/home/transactions'}>
          <Transactions />
        </Route>
        <Route strict path={'/home/validators'}>
          <ValidatorList />
        </Route>
        <Route strict path={'/home/visualize'}>
          <Visualize />
        </Route>
        <Redirect exact from="/home" to="/home/validators" />
      </Switch>
    </Box>
  );
};

export default Home;
