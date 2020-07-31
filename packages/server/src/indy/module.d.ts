declare module 'indy-sdk' {
  import { WalletConfig, WalletCredentials } from 'model';

  const openWallet: (
    config: WalletConfig | undefined,
    credentials?: WalletCredentials
  ) => Promise<number>;

  const createWallet: (
    config: WalletConfig | undefined,
    credentials?: WalletCredentials
  ) => Promise<number>;

  const buildGetTxnRequest: (
    did: string,
    ledgerType: string,
    sequence: number
  ) => Promise<any>;

  const createAndStoreMyDid: (
    wh: number,
    did: { seed: string }
  ) => Promise<[string, string]>;

  const buildGetNymRequest: (myDid: string, theirDid: string) => Promise<any>;
  const buildGetValidatorInfoRequest: (myDid: string) => Promise<any>;

  const signAndSubmitRequest: (
    pool: number | undefined,
    wh: number,
    did: string | undefined,
    request: any
  ) => Promise<any>;

  const deletePoolLedgerConfig: (pool: string) => Promise<void>;

  const openPoolLedger: (pool: string) => Promise<number>;

  const createPoolLedgerConfig: (pool: string, genesis: string) => Promise<any>;

  const listPools: () => Promise<Array<any>>;

  const closeWallet: (wh: number) => Promise<void>;

  const submitRequest: (pool: number | undefined, request: any) => Promise<any>;

  const setProtocolVersion: (version: number) => Promise<void>;
}
