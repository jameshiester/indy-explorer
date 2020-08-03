import { Dispatch } from 'react';
import { NodeActionType, NODES_UPDATE_ACTION } from './types';
import axios from 'axios';
import { INode } from 'model';

export const fetchNodes = () => (dispatch: Dispatch<NodeActionType>) => {
  axios
    .get<{ totalRecords: number; data: Array<INode> }>('/api/nodes')
    .then((value) => {
      dispatch({ type: NODES_UPDATE_ACTION, value: value.data.data });
    })
    .catch((error) => {});
};
