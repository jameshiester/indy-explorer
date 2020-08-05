import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useRouteMatch } from 'react-router-dom';
import { useTabsWithRouter } from '@shared/tab/useTabsWithRouter';
import TabLink from '@shared/tab/TabLink';

const useStyles = makeStyles((theme: Theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 80,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export interface Tab {
  text: string;
  icon?: any;
  to: string;
}

export interface NavProps {
  tabs: Tab[];
}

const Nav: React.FC<NavProps> = ({ tabs }) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const value = useTabsWithRouter(
    tabs.map((tab: any) => `${path}${tab.to}`),
    `${path}/nodes`
  );

  return (
    <>
      <Tabs
        value={value}
        centered
        indicatorColor="primary"
        classes={{ indicator: classes.indicator }}
        TabIndicatorProps={{ children: <span /> }}
      >
        {tabs.map(({ text, icon, to }) => (
          <TabLink key={to} label={text} icon={icon} value={`${path}${to}`} />
        ))}
      </Tabs>
    </>
  );
};

export default Nav;
