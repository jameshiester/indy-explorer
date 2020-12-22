import { makeStyles, Card } from '@material-ui/core';
import Grid from '@shared/table';
import { didsSelector } from '@store/did/selector';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { IDid } from 'model';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    boxShadow: '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
  },
  menuBar: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
}));

const columns = [
  {
    field: 'id',
    headerName: 'Did',
    flex: 1,
    floatingFilter: true,
    filterParams: {
      suppressAndOrCondition: true,
    },
    filter: 'agTextColumnFilter',
  },
  {
    field: 'roleName',
    headerName: 'Role',
    flex: 1,
    floatingFilter: true,
    filterParams: {
      suppressAndOrCondition: true,
    },
    filter: 'agTextColumnFilter',
  },
  {
    field: 'verkey',
    headerName: 'Verkey',
    width: 400,
    maxWidth: 400,
    minWidth: 400,
    floatingFilter: true,
    filterParams: {
      suppressAndOrCondition: true,
    },
    filter: 'agTextColumnFilter',
  },
  {
    field: 'attributes.endpoint.endpoint',
    headerName: 'Endpoint',
    flex: 1,
    floatingFilter: true,
    filterParams: {
      suppressAndOrCondition: true,
    },
    filter: 'agTextColumnFilter',
  },
];

const gridOptions = {
  domLayout: 'autoHeight',
  getRowNodeId: (val: any) => val.name,
  pagination: true,
  paginationPageSize: 250,
  immutableData: true,
};

const List = () => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState<GridApi>();
  const handleGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);
  const data: Array<IDid> | undefined = useSelector(didsSelector);
  return (
    <Card className={classes.root}>
      <Grid
        data={data}
        onGridReady={handleGridReady}
        columnDefs={columns}
        gridOptions={gridOptions}
      />
    </Card>
  );
};

export default List;
