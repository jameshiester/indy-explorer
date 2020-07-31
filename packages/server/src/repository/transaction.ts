import { getConnection } from 'typeorm';
import { LedgerType, IndyTransaction, TransactionType } from 'model';
import Transaction, { ITransaction } from '../entity/transaction';
import { setLatest } from './pointer';

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
  }
};

export const getTransaction = async (
  ledger: LedgerType,
  sequence: number
): Promise<Transaction | undefined> => {
  const repository = getConnection().getRepository(Transaction);
  return await repository.findOne({
    sequence,
    ledger: ledger.valueOf(),
  });
};

export const addTransaction = async (
  ledger: LedgerType,
  sequence: number,
  transaction: IndyTransaction
): Promise<Transaction | undefined> => {
  const repository = getConnection().getRepository(Transaction);
  const record = repository.create(
    transformToDbModel(ledger, sequence, transaction)
  );
  try {
    console.log(
      `ADDING TXN TO LEDGER ${ledger}: ${sequence} (id: ${transaction.txnMetadata.txnId})`
    );
    return await repository.save(record);
  } catch (e) {
    console.error(`DB ERROR WHILE SAVING: ${sequence}, error: ${e}`);
    throw new Error(e);
  }
};
