import { WalletConfig, WalletCredentials, LedgerType } from 'model';
import { get, isEqual } from 'lodash';
import {
  buildGetNymRequest,
  buildGetTxnRequest,
  buildGetValidatorInfoRequest,
  setProtocolVersion,
  submitRequest,
} from '../indy/request';
import { openPool } from '../indy/pool';
import { createAnchorWallet } from '../indy/wallet';
import { asyncForEach, isInt } from '../util';
import { getLatest, setLatest } from '../repository/pointer';
import { getTransaction, addTransaction } from '../repository/transaction';

const DEFAULT_SEED = '000000000000000000000000Trustee1';
const DEFAULT_MAX_FETCH = 50000;

const { ANONYMOUS, LEDGER_SEED, RESYNC_TIME = 120000, MAX_FETCH } = process.env;

export interface GetTransactionParams {
  cache: boolean;
  isSyncing: boolean;
  id: number;
  latest: boolean;
  ledgerType: LedgerType;
}

export class Anchor {
  private _ready: boolean = false;
  private _interval: NodeJS.Timeout[] = [];
  private _pool?: number;
  private _did: string = '';
  private _credentials?: WalletCredentials;
  private _config?: WalletConfig;

  constructor() {}

  ready() {
    return this._ready;
  }

  async createAnchorWallet() {
    const { did, verkey, credentials, config } = await createAnchorWallet(
      LEDGER_SEED || DEFAULT_SEED
    );
    console.log(`ANCHOR WALLET CREATED: did: ${did} verkey: ${verkey}`);
    if (did && verkey) {
      this._did = did;
      this._credentials = credentials;
      this._config = config;
    } else {
      throw new Error('Failed to create Anchor Wallet');
    }
  }

  async open() {
    const { success: protocolSet } = await setProtocolVersion();
    if (!protocolSet) throw new Error('Failed to set protocol');
    if (!this._pool) {
      await this.openPool();
    }
    if (!ANONYMOUS) {
      console.log('CREATING ANCHOR WALLET');
      await this.createAnchorWallet();
    }
    try {
      await asyncForEach(
        [LedgerType.CONFIG, LedgerType.DOMAIN, LedgerType.POOL],
        async (type: LedgerType) => {
          await this.syncLedgerCache(type);
          this._interval.push(
            setInterval(async () => {
              await this.syncLedgerCache(type);
            }, Number(RESYNC_TIME))
          );
        }
      );
    } catch (e) {
      console.log('Error Syncing', e);
    }
    console.log('Finished sync');
    this._ready = true;
  }

  async openPool() {
    const { success, data, error } = await openPool();
    if (success) {
      this._pool = data;
    } else {
      throw new Error(error);
    }
  }

  async initializeSync() {
    try {
      await asyncForEach(
        [LedgerType.CONFIG, LedgerType.DOMAIN, LedgerType.POOL],
        async (type: LedgerType) => {
          await this.syncLedgerCache(type);
          this._interval.push(
            setInterval(async () => {
              await this.syncLedgerCache(type);
            }, Number(RESYNC_TIME))
          );
        }
      );
    } catch (e) {
      console.log('Error Syncing', e);
    }
    console.log('Finished sync');
    this._ready = true;
  }

  async getValidatorInfo() {
    if (!this._ready || !this._did) {
      throw new Error('Not ready or running in anonymous');
    }
    const request = await buildGetValidatorInfoRequest(this._did);
    const response = (await this.submitRequest(request, true)) as any;
    return Object.keys(response).map((alias) => {
      if (response[alias] === 'timeout') {
        return { alias, active: false };
      }
      return { alias, value: JSON.parse(response[alias]) };
    });
  }

  async getTransaction({
    cache = true,
    isSyncing = false,
    id,
    latest = false,
    ledgerType,
  }: GetTransactionParams) {
    if (!this._ready && !isSyncing) {
      throw new Error('Not Ready');
    }
    if (!id) {
      console.log('missing identifier');
      return undefined;
    }

    if (cache) {
      const txn = await getTransaction(ledgerType, Number(id));
      if (txn) {
        if (isInt(id) && latest) {
          console.log('SETTING LATEST: ', id);
          await setLatest(ledgerType, Number(id));
        }
        return txn;
      }
    }
    if (!isInt(id)) {
      'TXN ID must be loaded from the cache';
      return undefined;
    }
    const { data: req, success } = await buildGetTxnRequest(
      this._did,
      ledgerType,
      Number(id)
    );
    try {
      const txn = await this.submitRequest(req);
      if (txn) {
        const value = get(txn, 'result.data');
        if (value) {
          const txnId = get(value, 'txnMetadata.txnId');
          if (cache) {
            if (latest) {
              await setLatest(ledgerType, Number(id));
            }
            await addTransaction(ledgerType, Number(id), value);
          }
          return { sequence: id, txnId, value, success: true };
        }
      }
      return undefined;
    } catch (e) {
      console.log(e);
    }
  }

  async syncLedgerCache(ledgerType: LedgerType) {
    console.log('SYNCING LEDGER: ', ledgerType);
    const id = await getLatest(ledgerType);
    if (id) {
      console.log('LATEST: ', id);
      const txn = await this.getTransaction({
        ledgerType,
        id,
        cache: false,
        latest: false,
        isSyncing: true,
      });
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
    let fetched = 0;
    while (!complete) {
      const row = await this.fetchTailTxn(ledgerType);
      if (row) {
        fetched++;
        if (fetched >= Number(MAX_FETCH || DEFAULT_MAX_FETCH)) {
          console.log(
            `${ledgerType} ledger fetched the maximum number of transaction(s)`
          );
          complete = true;
        } else if (row.sequence < fetched) {
          console.error('UNEXPECTED SEQUENCE', row.sequence, fetched);
          complete = true;
        }
      } else {
        complete = true;
      }
    }
    console.log('DONE SYNCING LEDGER: ', ledgerType);
  }

  async fetchTailTxn(ledgerType: LedgerType, max?: number) {
    const latest = await getLatest(ledgerType);
    if (max && latest + 1 > max) {
      console.log('MAX TRANSACTIONS REACHED');
      return;
    }
    return await this.getTransaction({
      cache: true,
      id: latest + 1 || 1,
      isSyncing: true,
      latest: true,
      ledgerType,
    });
  }

  async getNym(did: string): Promise<any> {
    const request = await buildGetNymRequest(this._did, did);
    const response = await this.submitRequest(request, true);
    const data = get(response, 'result.data');
    return JSON.parse(data);
  }

  async submitRequest(request: any, sign: boolean = false) {
    const { success, data, error } = await submitRequest(
      this._pool,
      this._did,
      request,
      sign,
      sign ? this._credentials : undefined,
      sign ? this._config : undefined
    );
    if (success) {
      return data;
    } else {
      throw new Error(error);
    }
  }
}
