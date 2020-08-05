import NodeStatus from '../entity/nodestatus';
import { getRepository, MoreThanOrEqual } from 'typeorm';
import IndyNode from '../entity/node';

export const createOrUpdateNodeStatuses = async (
  nodes: Array<IndyNode>,
  timestamp: number
): Promise<Array<NodeStatus>> => {
  try {
    const repository = getRepository(NodeStatus);
    const records = nodes.map(({ name, indy_version, active, value }) => {
      return repository.create({
        name,
        indy_version,
        active,
        timestamp,
        read_throughput: value
          ? value.Node_info.Metrics['average-per-second']['read-transactions']
          : undefined,
        write_throughput: value
          ? value.Node_info.Metrics['average-per-second']['write-transactions']
          : undefined,
      });
    });
    return await repository.save(records);
  } catch (e) {
    console.log(`DB ERROR WHILE SAVING NODE STATUSES, error: ${e}`);
    throw new Error(e);
  }
};

export const getNodesStatus = async (since: number) => {
  try {
    const repository = getRepository(NodeStatus);
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

export const getNodeStatuses = async (since: number, name: string) => {
  try {
    const repository = getRepository(NodeStatus);
    return await repository.find({
      where: {
        name,
        timestamp: MoreThanOrEqual(since),
      },
    });
  } catch (e) {
    console.log('DB ERROR WHILE FETCHING NODE STATUSES', e);
    throw new Error(e);
  }
};
