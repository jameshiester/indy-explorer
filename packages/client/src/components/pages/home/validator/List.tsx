import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ListItem from './ListItem';
import Typography from '@material-ui/core/Typography';
import { useValidators } from '@query/validators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
    },
  })
);

export const ValidatorList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = useStyles();
  const { data, status } = useValidators();
  return (
    <div className={classes.root}>
      {data &&
        data.map((validator: any) => (
          <ListItem
            key={validator.did}
            expanded={expanded}
            handleChange={handleChange}
            node={validator}
          />
        ))}
    </div>
  );
};

export default ValidatorList;
