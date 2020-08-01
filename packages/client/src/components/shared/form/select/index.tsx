import React from 'react';
import Select from '@material-ui/core/Select';
import { useStylesFactory } from '@util/Theme';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles';

const useStyles = useStylesFactory((theme: Theme) => ({
  root: {
    borderRadius: 20,
    minWidth: 150,
  },
  select: {
    borderRadius: '20 !important',
    borderTopLeftRadius: '20px !important',
    borderTopRightRadius: '20px !important',
    borderBottomRightRadius: '20px !important',
    borderBottomLeftRadius: '20px !important',
  },
}));

export interface SelectOption {
  value: string | number | any;
  label: string;
}

export interface SelectInputProps {
  options: Array<SelectOption>;
  value?: any;
  label?: string;
  onChange?: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void | undefined;
  variant?: 'default' | 'round';
}

const SelectInput: React.FunctionComponent<SelectInputProps> = ({
  options = [],
  value,
  onChange,
  label,
  variant = 'default',
}) => {
  const classes = useStyles();
  return (
    <Select
      value={value}
      onChange={onChange}
      variant={'outlined'}
      className={classes.root}
      label={label}
      margin={'dense'}
      classes={{ select: classes.select } as any}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
