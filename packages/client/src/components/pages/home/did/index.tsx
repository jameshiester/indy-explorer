import Card from '@shared/card';
import Grid from '@shared/table';
import { didsSelector } from '@store/did/selector';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { IDid } from 'model';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'Did', flex: 1 },

  {
    field: 'verkey',
    headerName: 'Verkey',
    width: 400,
    maxWidth: 400,
    minWidth: 400,
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
  const [gridApi, setGridApi] = useState<GridApi>();
  const handleGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);
  const data: Array<IDid> | undefined = useSelector(didsSelector);
  return (
    <Card>
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
