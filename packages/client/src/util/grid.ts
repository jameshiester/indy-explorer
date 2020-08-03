import { useCallback } from 'react';
import { IGetRowsParams } from 'ag-grid-community';
import { get } from 'lodash';
import axios from 'axios';

export type UseGetRowsParams = {
  mapColIdToField?: (colId: string) => string;
  url: string;
  defaultSortField: string;
};

export const useGetRows = ({
  defaultSortField,
  mapColIdToField = (colId) => colId,
  url,
}: UseGetRowsParams) =>
  useCallback(
    async (params: IGetRowsParams) => {
      const sortModel = get(params.sortModel, '[0]', {});
      const { colId, sort: sortMode = 'ASC' } = sortModel;
      const jsonQuery = Object.keys(params.filterModel).reduce(
        (acc: any, key) => {
          return { ...acc, [mapColIdToField(key)]: params.filterModel[key] };
        },
        {}
      );
      const query = JSON.stringify(jsonQuery);
      const request = await axios(url, {
        params: {
          mode: 'INFINITE',
          startRow: params.startRow,
          endRow: params.endRow,
          query: query,
          sortBy: colId ? mapColIdToField(colId) : defaultSortField,
          sortMode: sortMode.toUpperCase(),
        },
      });
      const { totalRecords, data } = await request.data;
      params.successCallback(data, totalRecords);
    },
    [mapColIdToField, url]
  );
