import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';
import { dateToString } from '@util/helper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 300,
  },
  label: {
    color: 'rgb(170, 174, 179)',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontFamily: 'Open Sans',
    letterSpacing: '0.12em',
    fontSize: 12,
  },
  raw: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: 4,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word' as 'break-word',
  },
  subSection: {
    marginTop: theme.spacing(1),
  },
  sectionLabel: {
    color: '#474B4F',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: 300,
    //textAlign: 'center',
  },
}));

const fields = [
  { label: 'Transaction Type', field: 'type' },
  { label: 'Created By', field: 'sourceid' },
  {
    label: 'Created',
    field: 'added',
    formatter: (value?: any) => (value ? dateToString(value) : undefined),
  },
  { label: 'Transaction ID', field: 'value.txnMetadata.txnId' },
];

const typeFields = {
  NYM: [
    { label: 'DID', field: 'value.txn.data.dest' },
    { label: 'Role', field: 'role' },
    { label: 'Verkey', field: 'value.txn.data.verkey' },
  ],
  SCHEMA: [
    { label: 'Schema Name', field: 'value.txn.data.data.name' },
    { label: 'Schema Version', field: 'value.txn.data.data.version' },
    {
      label: 'Schema Attributes',
      field: 'value.txn.data.data.attr_names',
      formatter: (value: Array<string>) => (value ? value.join(', ') : ' '),
    },
  ],
};

export interface DataDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  data: any;
}

const getFields = (data: any) => {
  return get(typeFields, data.type, []);
};

const DataDialog: React.FC<DataDialogProps> = ({
  onClose,
  open,
  data = {},
}) => {
  const classes = useStyles();
  const [typeFields, setTypeFields] = useState(getFields(data));
  useEffect(() => {
    setTypeFields(getFields(data));
  }, [data]);
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="Transaction Data"
      open={open}
      maxWidth={'md'}
      fullWidth
    >
      <DialogTitle>
        <span className={classes.title}>Transaction Data</span>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h6"
          className={classes.sectionLabel}
          style={{ marginTop: 0 }}
        >
          Basic Properties
        </Typography>
        <Divider style={{ marginBottom: 8 }} />
        <Grid container spacing={2}>
          {fields.map(
            (field: any) =>
              get(data, field.field) && (
                <Grid item xs={6} sm={4} key={field.field}>
                  <Typography variant="h6" className={classes.label}>
                    {field.label}
                  </Typography>
                  <Typography
                    variant={'subtitle2'}
                    style={{ wordWrap: 'break-word' }}
                  >
                    {field.formatter
                      ? field.formatter(get(data, field.field, ' '))
                      : get(data, field.field, ' ')}
                  </Typography>
                </Grid>
              )
          )}
        </Grid>

        {typeFields && (
          <>
            <Typography variant="h6" className={classes.sectionLabel}>
              {data.type} Properties
            </Typography>
            <Divider style={{ marginBottom: 8 }} />
            <Grid container spacing={2}>
              {typeFields.map(
                (field: any) =>
                  get(data, field.field) && (
                    <Grid item xs={6} sm={4} key={field.field}>
                      <Typography variant="h6" className={classes.label}>
                        {field.label}
                      </Typography>
                      <Typography
                        variant={'subtitle2'}
                        style={{ wordWrap: 'break-word' }}
                      >
                        {field.formatter
                          ? field.formatter(get(data, field.field, ' '))
                          : get(data, field.field, ' ')}
                      </Typography>
                    </Grid>
                  )
              )}
            </Grid>
          </>
        )}
        <div className={classes.subSection}>
          <Typography variant="h6" className={classes.sectionLabel}>
            Raw
          </Typography>
          <Divider style={{ marginBottom: 12 }} />
          <pre className={classes.raw}>
            {JSON.stringify(data.value, null, 2)}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataDialog;
