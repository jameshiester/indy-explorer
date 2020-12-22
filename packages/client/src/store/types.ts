import { DidStoreState } from './did/types';
import { NodeStoreState } from './node/types';

export interface StoreState {
  node: NodeStoreState;
  did: DidStoreState;
}
