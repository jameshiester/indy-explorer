import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@shared/table';
import { durationInWords } from '@util/helper';
import { useValidators } from '@query/validators';
import DataRenderer from './DataRenderer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      boxShadow:
        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
    },
  })
);

const gridOptions = {
  domLayout: 'autoHeight',
  getRowNodeId: (val: any) => val.seqno,
};

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'did', headerName: 'DID', width: 400, maxWidth: 400, minWidth: 400 },
  {
    field: 'uptime_seconds',
    headerName: 'Uptime',
    valueFormatter: ({ value }: any) =>
      value ? durationInWords(value * 1000) : undefined,
  },
  {
    field: 'indy_version',
    headerName: 'Indy',
    valueFormatter: ({ value }: any) => (value ? `v${value}` : undefined),
  },
  {
    field: 'transaction_count.ledger',
    headerName: 'Ledger',
    valueFormatter: ({ value }: any) => (value ? `${value} TXNs` : undefined),
  },
  {
    colId: 'data',
    field: 'value',
    headerName: 'View Data',
    cellClass: 'ag-cell-centered',
    headerClass: 'ag-cell-centered',
    flex: 1,
    minWidth: 150,
    maxWidth: 150,
    sortable: false,
    cellRendererFramework: DataRenderer,
  },
];

const List = () => {
  const classes = useStyles();
  const { data: validators } = useValidators();
  return (
    <Card className={classes.root}>
      <Grid data={validators} columnDefs={columns} gridOptions={gridOptions} />
    </Card>
  );
};

export default List;
