import { getRepository } from 'typeorm';
import { IndyValidatorData } from 'model';
import IndyNode from '../entity/node';
import { buildFilter } from './util';

export const createOrUpdateNodes = async (
  nodes: Array<{ name: string; active: boolean; value?: IndyValidatorData }>
): Promise<Array<IndyNode>> => {
  try {
    const repository = getRepository(IndyNode);
    const records = nodes.map((node) => {
      return repository.create(node);
    });
    return await repository.save(records);
  } catch (e) {
    console.error(`DB ERROR WHILE SAVING: ${name}, error: ${e}`);
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
