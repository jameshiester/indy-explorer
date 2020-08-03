import { createSelector } from 'reselect';
import { StoreState } from '../types';

const storeSelector = (state: StoreState) => state.node;

export const nodesSelector = createSelector(storeSelector, (node) => {
  return node.nodes && node.nodes.length ? node.nodes : undefined;
});
