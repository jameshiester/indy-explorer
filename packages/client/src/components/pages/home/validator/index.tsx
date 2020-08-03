import React, { useCallback, useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@shared/table';
import { durationInWords } from '@util/helper';
import DataRenderer from './DataRenderer';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { useSelector } from 'react-redux';
import { nodesSelector } from '@store/node/selector';
import { INode } from 'model';
import StatusRenderer from './StatusRenderer';

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
  getRowNodeId: (val: any) => val.name,
  pagination: true,
  paginationPageSize: 250,
  immutableData: true,
};

const columns = [
  {
    field: 'active',
    headerName: 'Status',
    flex: 1,
    maxWidth: 120,
    minWidth: 120,
    cellRendererFramework: StatusRenderer,
  },
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
  const [gridApi, setGridApi] = useState<GridApi>();
  const handleGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);
  const data: Array<INode> | undefined = useSelector(nodesSelector);
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
