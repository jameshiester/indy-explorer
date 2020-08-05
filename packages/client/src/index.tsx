import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Theme from './util/Theme';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <SnackbarProvider
          autoHideDuration={5000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          maxSnack={3}
        >
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
