import { createSelector } from 'reselect';
import { StoreState } from '../types';

const storeSelector = (state: StoreState) => state.node;

export const nodesSelector = createSelector(storeSelector, (node) => {
  return node.nodes && node.nodes.length ? node.nodes : undefined;
});

export const selectedNodeSelector = createSelector(storeSelector, (state) => {
  return state.selected && state.nodes && state.nodes.length
    ? state.nodes.find((node) => node.name === state.selected)
    : undefined;
});

export const selectedSelector = createSelector(
  storeSelector,
  (state) => state.selected
);
