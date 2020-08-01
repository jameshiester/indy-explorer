import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  Theme as MuiTheme,
  createStyles,
  makeStyles,
  StyleRules,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const HEADER_FONT = 'Montserrat';
const BODY_FONT = 'Montserrat';

const base = {
  overrides: {
    MuiExpansionPanel: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      notchedOutline: { borderColor: '#ebebeb' },
    },
  },
  palette: {
    primary: {
      main: '#1DE9B6',
    },
    secondary: {
      main: '#2a93d5',
      contrastText: '#fff',
    },
    text: {
      secondary: '#6F7379',
    },
    background: {
      default: '#ECEDEF',
    },
    divider: '#ebebeb',
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    h2: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    h3: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    h4: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    h5: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    h6: {
      fontFamily: HEADER_FONT,
      fontWeight: 600,
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 400,
    },
  },
};

const theme = createMuiTheme(base);

const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

export const useStylesFactory = <ClassKey extends string>(
  styles: (theme: MuiTheme) => StyleRules<ClassKey, {}>
) => makeStyles((theme: MuiTheme) => createStyles(styles(theme)));
