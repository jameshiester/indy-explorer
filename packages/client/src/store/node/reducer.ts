import { NODES_UPDATE_ACTION, NodeActionType, NodeStoreState } from './types';
import { INode } from 'model';

const updateNode = (nodes: Array<INode>, node: INode) => {
  const index = nodes.findIndex((n) => n.name === node.name);
  if (index > -1) {
    nodes[index] = node;
  } else {
    nodes.push(node);
  }
};

export default function reducer(
  state: NodeStoreState = { nodes: [] },
  { type, value }: NodeActionType
) {
  switch (type) {
    case NODES_UPDATE_ACTION:
      value.forEach((node) => updateNode(state.nodes, node));
      state = {
        ...state,
        nodes: [...state.nodes],
      };
      break;
  }

  return state;
}
