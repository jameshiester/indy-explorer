import {
  TransactionType,
  NymTransaction,
  AttributeTransaction,
  IDid,
} from 'model';
import { getRepository } from 'typeorm';
import Did from '../entity/did';
import Transaction from '../entity/transaction';
import { buildFilter } from './util';
import { orderBy, merge } from 'lodash';
import { asyncForEach } from '../util';

const mapAttributes = (
  transactions: Array<Transaction>,
  did: string,
  existing: any = {}
) => {
  const attTransactions = orderBy(
    transactions.filter(
      (transaction) =>
        (transaction?.value?.txn as AttributeTransaction).data.dest === did
    ),
    (transaction) => transaction.value?.txnMetadata.seqNo,
    'asc'
  );
  let result: any = existing;
  attTransactions.forEach((transaction) => {
    try {
      const data = JSON.parse(
        (transaction.value?.txn as AttributeTransaction).data.raw
      );
      console.log(data);
      result = merge(result, data);
    } catch (e) {
      console.log('FAILED TO MERGE ATTRIBUTE', transaction);
    }
  });
  return result;
};

export const saveDids = async (transactions: Array<Transaction>) => {
  console.log(
    console.log(transactions.map((transaction) => transaction.value?.txn.type))
  );
  const nymTransactions = transactions.filter(
    (transaction) =>
      transaction.value && transaction.value.txn.type === TransactionType.NYM
  );
  const attTransactions = transactions.filter(
    (txn) => txn.value?.txn.type === TransactionType.ATTRIB
  );

  const nyms = nymTransactions.map((transaction) => {
    const txn = transaction.value?.txn as NymTransaction;
    return {
      id: txn.data.dest,
      verkey: txn.data.verkey,
      from: txn.metadata.from,
      role: txn.data.role,
      attributes: {},
    };
  });
  const repository = getRepository(Did);
  let result: Array<IDid> = [];
  await asyncForEach(nyms, async (nym: IDid) => {
    const existing = await repository.findOne(nym.id);
    const attributes = mapAttributes(
      attTransactions,
      nym.id,
      existing?.attributes
    );
    result.push(await repository.save({ ...nym, attributes }));
  });
  return result;
};

export const queryDids = async (
  start: number = 0,
  end: number = start + 1,
  query: any = {},
  sortBy: string = 'id',
  sortMode: 'ASC' | 'DESC' = 'ASC'
) => {
  const repository = getRepository(Did);
  const [data, totalRecords] = await repository.findAndCount({
    where: buildFilter(query),
    take: end - start || 1,
    skip: start,
    order: {
      [sortBy]: sortMode,
    },
  });
  return { totalRecords, data };
};
