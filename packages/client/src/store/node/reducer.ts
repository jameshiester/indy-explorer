import {
  NODES_UPDATE_ACTION,
  NodeActionType,
  NodeStoreState,
  SET_SELECTED_NODE,
} from './types';
import { INode } from 'model';

const updateNode = (nodes: Array<INode>, node: INode) => {
  const index = nodes.findIndex((n) => n.name === node.name);
  if (index > -1) {
    if (node.active) {
      nodes[index] = node;
    } else {
      nodes[index] = {
        ...nodes[index],
        active: false,
        uptime_seconds: undefined,
      };
    }
  } else {
    nodes.push(node);
  }
};

export default function reducer(
  state: NodeStoreState = { nodes: [], selected: undefined },
  action: NodeActionType
) {
  switch (action.type) {
    case NODES_UPDATE_ACTION:
      action.value.forEach((node) => updateNode(state.nodes, node));
      state = {
        ...state,
        nodes: [...state.nodes],
      };
      break;
    case SET_SELECTED_NODE:
      state = {
        ...state,
        selected: action.value,
      };
  }

  return state;
}
