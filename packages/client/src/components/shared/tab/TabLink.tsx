import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Tab } from '@material-ui/core';
import { TabProps } from '@material-ui/core/Tab';
import { useStylesFactory } from '@util/Theme';
import RouterLink from './RouterLink';

const useStyles = useStylesFactory((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    textTransform: 'none' as 'none',
    letterSpacing: '0.05em',
  },
  selected: {
    color: theme.palette.text.primary,
  },
}));

const TabLink: React.FC<
  Omit<LinkProps, 'to'> & TabProps & { to?: LinkProps['to'] }
> = ({ to, value, ...props }) => {
  const classes = useStyles();
  return (
    <Tab
      disableRipple
      disableFocusRipple
      component={RouterLink}
      to={to ?? value}
      value={value}
      {...props}
      classes={{
        root: classes.root,
        selected: classes.selected,
      }}
    />
  );
};

export default TabLink;
