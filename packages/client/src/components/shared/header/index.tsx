import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useStylesFactory } from '@util/Theme';
import Toolbar from '@material-ui/core/Toolbar';
import Brand from './Brand';

const containerFluid = (spacing: Function) => ({
  paddingRight: spacing(2),
  paddingLeft: spacing(2),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
});

const container = (spacing: Function) => ({
  ...containerFluid(spacing),
  '@media (min-width: 576px)': {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  '@media (min-width: 768px)': {
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
  },
  '@media (min-width: 992px)': {
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
  },
  '@media (min-width: 1200px)': {
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
  },
});

const useStyles = useStylesFactory(({ spacing, palette }) => ({
  root: {
    position: 'relative',
    boxShadow: '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
    backgroundColor: 'white',
    //borderBottom: `1px solid ${palette.grey['100']}`,
  },
  container: {
    ...container(spacing),
    flex: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.container}>
        <Brand brand={'Hyperledger Indy'} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
