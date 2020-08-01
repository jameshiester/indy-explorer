import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';

import Theme from './util/Theme';
ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <SnackbarProvider
        autoHideDuration={2000}
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
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
