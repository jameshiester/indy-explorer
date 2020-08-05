import { createOrUpdateNodeStatuses } from '../repository/nodestatus';
import { INode, NODE_UPDATE, NODES_HISTORY_SUMMARY_UPDATE } from 'model';
import { createOrUpdateNodes } from '../repository/node';
import socket from 'socket.io';
import { createNodesStatusSummary } from '../repository/nodeSummary';

const persistValidatorStatuses = async (
  validatorInfo: Array<INode>,
  io: socket.Server
) => {
  try {
    const timestamp = Date.now();
    const nodes = await createOrUpdateNodes(validatorInfo);
    nodes.forEach((node) => {
      io.emit(NODE_UPDATE, node);
    });
    const statuses = await createOrUpdateNodeStatuses(nodes, timestamp);
    const summary = await createNodesStatusSummary(statuses, timestamp);
    io.emit(NODES_HISTORY_SUMMARY_UPDATE, summary);
  } catch (e) {
    console.log('FAILED TO SAVE VALIDATOR INFO', e);
  }
};

export default persistValidatorStatuses;
