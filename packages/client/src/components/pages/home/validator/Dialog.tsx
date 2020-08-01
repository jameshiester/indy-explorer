import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';
import Divider from '@material-ui/core/Divider';
import { dateToString, durationInWords } from '@util/helper';

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
  { label: 'Name', field: 'name' },
  { label: 'Mode', field: 'value.Node_info.Mode' },
  {
    label: 'Uptime',
    field: 'uptime_seconds',
    formatter: (value: any) =>
      value ? durationInWords(value * 1000) : undefined,
  },
  { label: 'Node IP', field: 'value.Node_info.Node_ip' },
  { label: 'Node Port', field: 'value.Node_info.Node_port' },
  { label: 'Node Protocol', field: 'value.Node_info.Node_protocol' },
  { label: 'Client IP', field: 'value.Node_info.Client_ip' },
  { label: 'Client Port', field: 'value.Node_info.Client_port' },
  { label: 'Client Protocol', field: 'value.Node_info.Client_protocol' },
  { label: 'Indy Version', field: 'indy_version' },
  {
    label: 'Read Throughput',
    field: 'value.Node_info.Metrics.average-per-second.read-transactions',
    formatter: (value: string | number) => `${value}/s`,
  },
  {
    label: 'Write Throughput',
    field: 'value.Node_info.Metrics.average-per-second.write-transactions',
    formatter: (value: string | number) => `${value}/s`,
  },
];

const poolFields = [
  { label: 'Total Nodes', field: 'value.Pool_info.Total_nodes_count' },
  { label: 'Reachable Nodes', field: 'value.Pool_info.Reachable_nodes_count' },
  {
    label: 'Unreachable Nodes',
    field: 'value.Pool_info.Unreachable_nodes_count',
  },
];

const hasData = (data: any, field: string) => {
  const value = get(data, field);
  return data || data === '0' || data === 0;
};

export interface DataDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  data: any;
}

const DataDialog: React.FC<DataDialogProps> = ({
  onClose,
  open,
  data = {},
}) => {
  const classes = useStyles();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="Transaction Data"
      open={open}
      maxWidth={'md'}
      fullWidth
    >
      <DialogTitle>
        <span className={classes.title}>Validator Data</span>
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
              hasData(data, field.field) && (
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

        <Typography variant="h6" className={classes.sectionLabel}>
          Pool Properties
        </Typography>
        <Divider style={{ marginBottom: 8 }} />
        <Grid container spacing={2}>
          {poolFields.map(
            (field: any) =>
              hasData(data, field.field) && (
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
        <div
          className={classes.subSection}
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
        >
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
