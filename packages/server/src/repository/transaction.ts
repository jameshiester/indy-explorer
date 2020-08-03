import { getRepository } from 'typeorm';
import { LedgerType, IndyTransaction, TransactionType } from 'model';
import Transaction from '../entity/transaction';
import { buildFilter } from './util';
import { get } from 'lodash';
import { ITransaction } from 'model';

const transformToDbModel = (
  ledger: LedgerType,
  sequence: number,
  transaction: IndyTransaction
): ITransaction => {
  const { txnMetadata: { txnId } = { txnId: undefined }, txn } = transaction;
  const baseProps = {
    transactionType: txn.type,
    sequence,
    ledger: ledger.valueOf(),
    transactionId: txnId,
    value: transaction,
  };
  switch (txn.type) {
    case TransactionType.NYM:
      return {
        ...baseProps,
        role: txn.data.role,
        destination: txn.data.dest,
        source: txn.metadata.from,
      };
    case TransactionType.ATTRIB:
      return {
        ...baseProps,
        destination: txn.data.dest,
        source: txn.metadata.from,
      };
    case TransactionType.NODE:
      return {
        ...baseProps,
        destination: txn.data.dest,
        source: txn.metadata.from,
      };
    case TransactionType.CRED_DEF:
      return {
        ...baseProps,
        destination: txnId,
        source: txn.metadata.from,
      };
    case TransactionType.SCHEMA:
      return {
        ...baseProps,
        destination: txn.data.data.name,
        source: txn.metadata.from,
      };
    default:
      return {
        ...baseProps,
        destination: txnId,
        source: get(txn, 'metadata.from'),
      };
  }
};

export const getTransaction = async (
  ledger: LedgerType,
  sequence: number
): Promise<Transaction | undefined> => {
  const repository = getRepository(Transaction);
  return await repository.findOne({
    sequence,
    ledger: ledger.valueOf(),
  });
};

export const createTransaction = (
  ledger: LedgerType,
  sequence: number,
  transaction: IndyTransaction
) => {
  console.log('ADDING TRANSACTION', sequence);
  const repository = getRepository(Transaction);
  return repository.create(transformToDbModel(ledger, sequence, transaction));
};

export const saveTransactions = async (transactions: Array<Transaction>) => {
  const repository = getRepository(Transaction);
  return await repository.save(transactions, {
    chunk: Math.min(transactions.length, 100),
  });
};

export const queryTransactions = async (
  ledgerType: LedgerType,
  start: number = 0,
  end: number = start + 1,
  query: any = {},
  sortBy: string = 'sequence',
  sortMode: 'ASC' | 'DESC' = 'ASC'
) => {
  const repository = getRepository(Transaction);
  const [data, totalRecords] = await repository.findAndCount({
    where: { ledger: ledgerType.valueOf(), ...buildFilter(query) },
    take: end - start || 1,
    skip: start,
    order: {
      [sortBy]: sortMode,
    },
  });
  return { totalRecords, data };
};
