import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataIcon from '@material-ui/icons/FindInPageOutlined';
import { makeStyles, Theme } from '@material-ui/core/styles';

export type DataButtonProps = {
  handleClick: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
}));

const DataButton: React.FC<DataButtonProps> = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleClick}
        size={'small'}
        className={classes.iconButton}
      >
        <DataIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default DataButton;
