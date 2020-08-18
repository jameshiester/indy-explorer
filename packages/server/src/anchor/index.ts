import { WalletConfig, WalletCredentials, LedgerType, INode } from 'model';
import { get } from 'lodash';
import {
  buildGetNymRequest,
  buildGetValidatorInfoRequest,
  setProtocolVersion,
  submitRequest,
} from '../indy/request';
import { createAnchorWallet } from '../indy/wallet';
import { asyncForEach } from '../util';
import { untilActive } from '../vdr';
import { syncLedgerCache } from '../sync/transaction';
import { Server } from 'socket.io';
import saveNodes from '../sync/node';

const DEFAULT_SEED = '000000000000000000000000Trustee1';

const { ANONYMOUS, LEDGER_SEED, RESYNC_TIME = 120000 } = process.env;

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
  private _did: string = '';
  private _credentials?: WalletCredentials;
  private _config?: WalletConfig;
  private _io: Server;

  constructor(io: Server) {
    this._io = io;
  }

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
    await untilActive();
    const { success: protocolSet } = await setProtocolVersion();
    if (!protocolSet) throw new Error('Failed to set protocol');
    if (!ANONYMOUS) {
      console.log('CREATING ANCHOR WALLET');
      await this.createAnchorWallet();
    }
    try {
      await this.syncValidatorCache();
      await asyncForEach(
        [LedgerType.CONFIG, LedgerType.DOMAIN, LedgerType.POOL],
        async (type: LedgerType) => {
          await syncLedgerCache(type);
          this._interval.push(
            setInterval(async () => {
              await syncLedgerCache(type);
            }, Number(RESYNC_TIME))
          );
        }
      );
      this._interval.push(
        setInterval(async () => {
          await this.syncValidatorCache();
        }, Number(RESYNC_TIME))
      );
    } catch (e) {
      console.log('Error Syncing', e);
    }
    console.log('Finished sync');
    this._ready = true;
  }

  async syncValidatorCache() {
    console.log('SYNCING VALIDATOR STATUS');
    const validatorInfo = this._did
      ? await this.getPermissionedValidatorInfo()
      : await this.getAnonymousValidatorInfo();
    await saveNodes(validatorInfo, this._io);
  }

  async getPermissionedValidatorInfo(): Promise<Array<INode>> {
    const request = await buildGetValidatorInfoRequest(this._did);
    const response = (await this.submitRequest(request, true)) as any;
    return Object.keys(response).map((name) => {
      if (response[name] === 'timeout') {
        return { name, active: false };
      }
      let value;
      try {
        value = get(JSON.parse(response[name]), 'result.data');
      } catch (e) {
        console.warn('INVALID NODE JSON', value);
      }
      return { name, value, active: true };
    });
  }

  async getAnonymousValidatorInfo(): Promise<Array<INode>> {
    const request = await buildGetValidatorInfoRequest();
    const response = (await this.submitRequest(request)) as any;
    console.log(response);
    return [];
  }

  async getNym(did: string): Promise<any> {
    const request = await buildGetNymRequest(this._did, did);
    const response = await this.submitRequest(request, true);
    const data = get(response, 'result.data');
    return JSON.parse(data);
  }

  async submitRequest(request: any, sign: boolean = false) {
    const { success, data, error } = await submitRequest(
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
