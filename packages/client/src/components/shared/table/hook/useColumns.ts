import { useEffect } from 'react';
import { isArray } from 'lodash';

interface useColumnParams {
  columnDefs: any[];
  gridReady: boolean;
  gridApi: any;
}

const useColumns = ({ columnDefs, gridReady, gridApi }: useColumnParams) => {
  useEffect(() => {
    if (gridReady && isArray(columnDefs)) {
      gridApi.setColumnDefs(columnDefs);
      columnDefs.forEach((column) => {
        gridApi.columnController.columnApi.setColumnVisible(
          column.colId,
          !column.hide
        );
      });
      gridApi.sizeColumnsToFit();
    }
  }, [gridReady, columnDefs, gridApi]);
};

export default useColumns;
