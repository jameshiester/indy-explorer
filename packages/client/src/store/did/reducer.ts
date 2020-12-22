import {
  DIDS_UPDATE_ACTION,
  DidActionType,
  DidStoreState,
  SET_SELECTED_DID,
} from './types';
import { IDid } from 'model';

const updateDid = (dids: Array<IDid>, did: IDid) => {
  const index = dids.findIndex((d) => d.id === did.id);
  if (index > -1) {
    dids[index] = did;
  } else {
    dids.push(did);
  }
};

export default function reducer(
  state: DidStoreState = { dids: [], selected: undefined },
  action: DidActionType
) {
  switch (action.type) {
    case DIDS_UPDATE_ACTION:
      action.value.forEach((did) => updateDid(state.dids, did));
      state = {
        ...state,
        dids: [...state.dids],
      };
      break;
    case SET_SELECTED_DID:
      state = {
        ...state,
        selected: action.value,
      };
  }

  return state;
}
