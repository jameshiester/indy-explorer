import { createSelector } from 'reselect';
import { StoreState } from '../types';

const storeSelector = (state: StoreState) => state.did;

export const didsSelector = createSelector(storeSelector, (did) => {
  return did.dids && did.dids.length ? did.dids : undefined;
});

export const selectedDidSelector = createSelector(storeSelector, (state) => {
  return state.selected && state.dids && state.dids.length
    ? state.dids.find((did) => did.id === state.selected)
    : undefined;
});

export const selectedSelector = createSelector(
  storeSelector,
  (state) => state.selected
);
