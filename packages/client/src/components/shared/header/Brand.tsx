import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStylesFactory } from '@util/Theme';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';

const useStyles = useStylesFactory((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    paddingRight: theme.spacing(2),
    fontFamily: 'Archivo',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  subTitle: {
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    paddingLeft: theme.spacing(2),
  },
}));

type BrandProps = {
  brand: string;
};

const Brand: React.FC<BrandProps> = ({ brand }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.container}>
      <Typography variant="h6" color="inherit" noWrap className={classes.root}>
        {brand && brand.toUpperCase()}
      </Typography>
      <Typography
        variant="subtitle2"
        color="inherit"
        noWrap
        className={classes.subTitle}
      >
        Network Explorer
      </Typography>
    </Grid>
  );
};

export default Brand;
