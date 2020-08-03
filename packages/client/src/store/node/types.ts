import { INode } from 'model';

export const NODES_UPDATE_ACTION = 'NODE::UPDATE_NODES';
export const NODES_FETCH_ACTION = 'NODE::FETCH_NODES';
export const NODES_FETCH_SUCCESS_ACTION = 'NODE::FETCH_NODES_SUCCESS';
export const NODES_FETCH_ERROR_ACTION = 'NODE::FETCH_NODES_ERROR';

export interface NodeUpdateAction {
  type: typeof NODES_UPDATE_ACTION;
  value: Array<INode>;
}

export interface NodeStoreState {
  nodes: Array<INode>;
}

export type NodeActionType = NodeUpdateAction;
