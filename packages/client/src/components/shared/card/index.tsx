import React from 'react';
import MuiCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow:
        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
    },
    title: {
      fontWeight: 300,
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
      fontSize: '1.25rem',
    },
  })
);

export type CardProps = {
  title?: string;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.root}>
      {title && (
        <CardHeader
          title={title}
          titleTypographyProps={{ className: classes.title }}
        ></CardHeader>
      )}
      {children}
    </MuiCard>
  );
};

export default Card;
