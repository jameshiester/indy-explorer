import { getRepository } from 'typeorm';
import { INode } from 'model';
import IndyNode from '../entity/node';
import { buildFilter } from './util';

export const createOrUpdateNodes = async (
  nodes: Array<INode>
): Promise<Array<IndyNode>> => {
  try {
    const repository = getRepository(IndyNode);
    const records = repository.create(nodes);
    const result = await repository.save(records);
    return result;
  } catch (e) {
    console.log(`DB ERROR WHILE SAVING error: ${e}`);
    throw new Error(e);
  }
};

export const queryNodes = async (
  start: number = 0,
  end: number = start + 1,
  query: any = {},
  sortBy: string = 'name',
  sortMode: 'ASC' | 'DESC' = 'ASC'
) => {
  const repository = getRepository(IndyNode);
  const [data, totalRecords] = await repository.findAndCount({
    where: { ...buildFilter(query) },
    take: end - start || 1,
    skip: start,
    order: {
      [sortBy]: sortMode,
    },
  });
  return { totalRecords, data };
};
