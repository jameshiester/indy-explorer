import { useEffect } from 'react';

interface UseRowDataParams {
  data?: any[];
  gridReady: boolean;
  gridApi: any;
}

const useRowData = ({ data, gridApi, gridReady }: UseRowDataParams) => {
  useEffect(() => {
    if (gridReady && data) {
      gridApi.setRowData(data);
    }
  }, [data, gridApi, gridReady]);
};

export default useRowData;
