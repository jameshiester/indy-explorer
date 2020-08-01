import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Chart from './Chart';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      boxShadow:
        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
    },
  })
);

const Visualize = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Chart />
    </Card>
  );
};

export default Visualize;
