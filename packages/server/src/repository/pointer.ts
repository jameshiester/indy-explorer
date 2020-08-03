import { getRepository } from 'typeorm';
import { LedgerType } from 'model';
import Pointer from '../entity/pointer';

export const getLatest = async (ledger: LedgerType) => {
  const repository = getRepository(Pointer);
  const latest = await repository.findOne(ledger.valueOf());
  return latest ? latest.sequence : 0;
};

export const setLatest = async (ledger: LedgerType, sequence: number) => {
  const repository = getRepository(Pointer);
  const record = repository.create({ ledger: ledger.valueOf(), sequence });
  return await repository.save(record);
};
