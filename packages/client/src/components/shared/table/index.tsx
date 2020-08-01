import React, { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './style.scss';
import useColumns from './hook/useColumns';
import useRowData from './hook/useData';
import clsx from 'clsx';
import { noop } from 'lodash';
import { get } from 'lodash';
import { GridReadyEvent, ColumnApi, GridApi } from 'ag-grid-community';

interface GridProps {
  className?: string;
  columnDefs: any[];
  data?: any[];
  onGridReady?: (event: any) => void;
  gridOptions: any;
}

const Grid = ({
  className,
  columnDefs,
  data,
  onGridReady = noop,
  gridOptions = {},
  ...props
}: GridProps) => {
  const [gridReady, setGridReady] = useState(false);
  const gridApiRef = useRef<GridApi>();
  const columnApiRef = useRef<ColumnApi>();
  const handleGridReady = useCallback(
    (event: GridReadyEvent) => {
      const { api, columnApi } = event;
      gridApiRef.current = api;
      columnApiRef.current = columnApi;
      onGridReady(event);
      setGridReady(true);
    },
    [onGridReady]
  );
  const handleResize = ({ api }: any) => {
    if (gridApiRef && gridApiRef.current) {
      api.sizeColumnsToFit();
    }
  };

  useColumns({ columnDefs, gridReady, gridApi: gridApiRef.current });
  useRowData({ data, gridApi: gridApiRef.current, gridReady });
  return (
    <div className={clsx(className, 'ag-theme-material')}>
      <AgGridReact
        onGridSizeChanged={handleResize}
        onGridReady={handleGridReady}
        onFirstDataRendered={handleResize}
        disableStaticMarkup={true}
        {...props}
        gridOptions={{
          ...gridOptions,
          autoParamsRefresh: true,
          headerHeight: 40,
          animateRows: true,
          immutableData: false,
          context: get(gridOptions, 'context', {}),
          defaultColDef: {
            sortable: true,
            resizable: true,
            flex: 1,
            minWidth: 50,
          },
        }}
      />
    </div>
  );
};

export default Grid;
