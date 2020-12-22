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
import { asyncForEach, mapRoleTypeToName } from '../util';

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
      result = merge(result, data);
    } catch (e) {
      console.log('FAILED TO MERGE ATTRIBUTE', transaction);
    }
  });
  return result;
};

export const saveDids = async (transactions: Array<Transaction>) => {
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
  const nymDids = nyms
    .map((nym) => nym.id)
    .concat(
      attTransactions.map(
        (att) => (att.value?.txn as AttributeTransaction).data.dest
      )
    );
  await asyncForEach(nymDids, async (nym: string) => {
    const existing = await repository.findOne(nym);
    const newNym: Partial<IDid> = nyms.find((nymTxn) => nymTxn.id === nym) || {
      id: nym,
    };
    const attributes = mapAttributes(
      attTransactions,
      nym,
      existing?.attributes
    );
    result.push(
      await repository.save({
        ...(existing || {}),
        ...newNym,
        attributes,
        roleName: mapRoleTypeToName(existing?.role || newNym?.role),
      })
    );
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
