import React, { useState, useEffect, useCallback } from 'react';
import DataGrid from '@shared/table';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Select from '@shared/form/select';
import { get, cloneDeep } from 'lodash';
import { columnDefs } from './types';
import { GridApi, GridReadyEvent, IGetRowsParams } from 'ag-grid-community';
import { useGetRows } from '@util/grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      boxShadow:
        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
    },
    menuBar: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
  })
);

const gridOptions = {
  domLayout: 'autoHeight',
  getRowNodeId: (val: any) => val.sequence,
  rowModelType: 'infinite',
  cacheBlockSize: 250,
  blockLoadDebounceMillis: 50,
  pagination: true,
  paginationPageSize: 250,
};

const ledgers = [
  { value: 'DOMAIN', label: 'Domain Ledger' },
  { value: 'POOL', label: 'Pool Ledger' },
  { value: 'CONFIG', label: 'Config Ledger' },
];

const mapColIdToField = (colId: string) => get(colId.split('::'), '[1]');

const List = () => {
  const classes = useStyles();
  const [ledger, setLedger] = useState(ledgers[0].value);
  const [url, setUrl] = useState(`/api/transactions/${ledgers[0].value}`);
  const [columns, setColumns] = useState(get(columnDefs, 'DEFAULT'));
  //const { data: transactions } = useTransactions(ledger);
  const [gridApi, setGridApi] = useState<GridApi>();
  const handleLedgerChange = (event: any) => {
    setLedger(get(event, 'target.value'));
    setUrl(`/api/transactions/${get(event, 'target.value')}`);
  };

  useEffect(() => {
    setColumns(
      get(columnDefs, ledger, columnDefs.DEFAULT).map(
        (col: any, index: number) => ({
          ...col,
          colId: `${ledger}::${col.field}`,
        })
      )
    );
  }, [ledger]);
  const handleGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);
  const getRows = useGetRows({
    url,
    mapColIdToField,
    defaultSortField: 'sequence',
  });

  useEffect(() => {
    if (getRows && gridApi) {
      gridApi.setDatasource({ getRows });
    }
  }, [getRows, gridApi]);
  return (
    <Card className={classes.root}>
      <Grid
        container
        spacing={3}
        justify={'space-between'}
        className={classes.menuBar}
      >
        <Grid item></Grid>
        <Grid item>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item style={{ paddingRight: 8 }}></Grid>
            <Grid item>
              <Select
                options={ledgers}
                value={ledger}
                onChange={handleLedgerChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DataGrid
        onGridReady={handleGridReady}
        columnDefs={columns}
        gridOptions={gridOptions}
      />
    </Card>
  );
};

export default List;
