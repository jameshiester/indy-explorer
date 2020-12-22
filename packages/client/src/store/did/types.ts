import { IDid } from 'model';

export const DIDS_UPDATE_ACTION = 'DID::UPDATE_DIDS';
export const DIDS_FETCH_ACTION = 'DID::FETCH_DIDS';
export const DIDS_FETCH_SUCCESS_ACTION = 'DID::FETCH_DIDS_SUCCESS';
export const DIDS_FETCH_ERROR_ACTION = 'DID::FETCH_DIDS_ERROR';
export const SET_SELECTED_DID = 'DID::SET_SELECTED_DID';

export interface DidsUpdateAction {
  type: typeof DIDS_UPDATE_ACTION;
  value: Array<IDid>;
}

export interface SetSelectedDidAction {
  type: typeof SET_SELECTED_DID;
  value?: string;
}

export interface DidStoreState {
  dids: Array<IDid>;
  selected?: string;
}

export type DidActionType = DidsUpdateAction | SetSelectedDidAction;
