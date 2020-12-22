import { Dispatch } from 'react';
import axios from 'axios';
import { IDid } from 'model';
import { DidActionType, DIDS_UPDATE_ACTION } from './types';

export const fetchDids = () => (dispatch: Dispatch<DidActionType>) => {
  axios
    .get<{ totalRecords: number; data: Array<IDid> }>('/api/dids')
    .then((value) => {
      dispatch({ type: DIDS_UPDATE_ACTION, value: value.data.data });
    })
    .catch((error) => {});
};
