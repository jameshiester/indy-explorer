import { getLatest, setLatest } from '../repository/pointer';
import {
  getTransaction,
  saveTransactions,
  createTransaction,
} from '../repository/transaction';
import { getTransactionFromLedger } from '../vdr';
import { isEqual } from 'lodash';
import { DID_UPDATE, LedgerType } from 'model';
import Transaction from '../entity/transaction';
import { saveDids } from '../repository/did';
import socket from 'socket.io';

const DEFAULT_MAX_FETCH = 50000;

const { MAX_FETCH } = process.env;

export const syncLedgerCache = async (
  ledgerType: LedgerType,
  io: socket.Server
) => {
  console.log('SYNCING LEDGER: ', ledgerType);
  const id = await getLatest(ledgerType);
  if (id) {
    console.log('LATEST: ', id);
    const txn = await getTransactionFromLedger(id, ledgerType);
    const cacheTxn = await getTransaction(ledgerType, id);
    if (
      !txn ||
      !cacheTxn ||
      !isEqual(JSON.stringify(txn.value), JSON.stringify(cacheTxn.value))
    ) {
      console.log('resetting?');
      //this._cache?.reset();
    }
  }
  let complete = false;
  let fetched = id;
  let rows: Array<Transaction> = [];
  let latest = id;
  while (!complete) {
    const row = await getTransactionFromLedger(
      fetched + 1 || fetched,
      ledgerType
    );
    if (row) {
      rows.push(createTransaction(ledgerType, row.sequence, row.value));
      latest = row.sequence;
      fetched++;
      if (fetched >= Number(MAX_FETCH || DEFAULT_MAX_FETCH)) {
        console.log(
          `${ledgerType} ledger fetched the maximum number of transaction(s)`
        );
        complete = true;
      } else if (row.sequence < fetched) {
        console.log('UNEXPECTED SEQUENCE', row.sequence, fetched);
        complete = true;
      }
    } else {
      complete = true;
    }
  }
  console.log(`adding ${rows.length} rows to ledger: ${ledgerType.toString()}`);
  await saveTransactions(rows);
  await setLatest(ledgerType, latest);
  const dids = await saveDids(rows);
  io.emit(DID_UPDATE, dids);
  console.log('DONE SYNCING LEDGER: ', ledgerType);
};
