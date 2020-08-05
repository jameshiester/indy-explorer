import NodeStatus from '../entity/nodestatus';
import { INodesStatusSummary } from 'model';
import { getRepository, MoreThanOrEqual } from 'typeorm';
import { get } from 'lodash';
import NodesStatusSummary from '../entity/nodeSummary';

const calculateMean = (
  statuses: Array<NodeStatus>,
  key: 'read_throughput' | 'write_throughput'
) => {
  const count = statuses.filter((status) => status[key] || status[key] === 0)
    .length;
  const sum = statuses.reduce((acc, status) => {
    return acc + (status[key] || 0);
  }, 0);

  return count === 0 ? undefined : sum / count;
};

export const createNodesStatusSummary = async (
  nodes: Array<NodeStatus>,
  timestamp: number
): Promise<NodesStatusSummary> => {
  try {
    const repository = getRepository(NodesStatusSummary);
    const summary: INodesStatusSummary = nodes.reduce(
      (acc: INodesStatusSummary, { active: isActive }: NodeStatus) => {
        return {
          ...acc,
          active: isActive ? (acc.active || 0) + 1 : acc.active || 0,
        };
      },
      {
        timestamp,
        active: 0,
        read_throughput: calculateMean(nodes, 'read_throughput'),
        write_throughput: calculateMean(nodes, 'write_throughput'),
      }
    ) as INodesStatusSummary;
    const record = repository.create(summary);
    return await repository.save(record);
  } catch (e) {
    console.log(`DB ERROR WHILE SAVING NODE STATUS SUMMARY, error: ${e}`);
    throw new Error(e);
  }
};

export const getNodesStatusSummaries = async (since: number) => {
  try {
    const repository = getRepository(NodesStatusSummary);
    return await repository.find({
      where: {
        timestamp: MoreThanOrEqual(since),
      },
    });
  } catch (e) {
    console.log('DB ERROR WHILE FETCHING NODE STATUSES', e);
    throw new Error(e);
  }
};
