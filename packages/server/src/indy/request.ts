import indy from 'indy-sdk';
import {
  WalletCredentials,
  WalletConfig,
  ServiceResponse,
  ListPoolsResponse,
  LedgerType,
} from 'model';
import { DEFAULT_PROTOCOL } from './constant';
import { submitRequestToLedger } from '../vdr';

export const buildGetNymRequest = async (
  myDid: string,
  theirDid: string
): Promise<any> => {
  return await indy.buildGetNymRequest(myDid, theirDid);
};

export const buildGetValidatorInfoRequest = async (
  myDid?: string
): Promise<any> => {
  return await indy.buildGetValidatorInfoRequest(myDid);
};

export const setProtocolVersion = async (
  version: number = DEFAULT_PROTOCOL
): Promise<ServiceResponse<void>> => {
  try {
    await indy.setProtocolVersion(version);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: `Error Setting Protocol Version: ${e}` };
  }
};

export const listPools = async (): Promise<
  ServiceResponse<ListPoolsResponse>
> => {
  try {
    const pools = await indy.listPools();
    return { success: true, data: pools };
  } catch (e) {
    console.error(e);
    return { success: false, error: `Error Listing Pools: ${e}` };
  }
};

export const submitRequest = async <T>(
  did: string | undefined,
  request: any,
  sign: boolean,
  credentials?: WalletCredentials,
  config?: WalletConfig
): Promise<ServiceResponse<T>> => {
  try {
    if (sign) {
      const wh = await indy.openWallet(config, credentials);
      try {
        const signedRequest = await indy.signRequest(wh, did, request);
        await indy.closeWallet(wh);
        return await submitRequestToLedger(signedRequest);
      } catch (e) {
        console.log(e);
        await indy.closeWallet(wh);
        return { success: false, error: e };
      }
    } else {
      return await submitRequestToLedger(request);
    }
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
};

export const createWallet = async (
  config: WalletConfig,
  credentials: WalletCredentials
): Promise<ServiceResponse<void>> => {
  try {
    await indy.createWallet(config, credentials);
    return { success: true };
  } catch (e) {
    if (e.message !== 'WalletAlreadyExistsError') {
      console.error('Failed to create wallet', e);
      return { success: false, error: e };
    } else {
      return { success: true };
    }
  }
};

export const createAndStoreMyDid = async (
  wh: number,
  didInfo: { seed: string }
): Promise<ServiceResponse<Array<string>>> => {
  try {
    const [did, verkey] = await indy.createAndStoreMyDid(wh, didInfo);
    return { success: true, data: [did, verkey] };
  } catch (e) {
    console.error(e);
    return { success: false, error: e };
  }
};

export const openWallet = async (
  config: WalletConfig,
  credentials: WalletCredentials
): Promise<ServiceResponse<number>> => {
  try {
    const wh = await indy.openWallet(config, credentials);
    return { success: true, data: wh };
  } catch (e) {
    if (e.message !== 'WalletAlreadyExistsError') {
      console.error('Failed to create wallet', e);
      return { success: false, error: e };
    } else {
      return { success: true };
    }
  }
};

export const createPoolLedgerConfig = async (
  poolName: string,
  genesisTx: any
): Promise<ServiceResponse<void>> => {
  try {
    await indy.createPoolLedgerConfig(
      poolName,
      JSON.stringify({ genesis_txn: genesisTx })
    );
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: `Error Creating Pool Ledger Config: ${e}` };
  }
};

export const deletePoolLedgerConfig = async (
  poolName: string
): Promise<ServiceResponse<void>> => {
  try {
    await indy.deletePoolLedgerConfig(poolName);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: `Error Deleting Pool Ledger Config: ${e}` };
  }
};

export const openPoolLedger = async (
  poolName: string
): Promise<ServiceResponse<number>> => {
  console.log('Opening Pool:', poolName);
  const pool = await indy.openPoolLedger(poolName);
  console.log('Pool Opened');
  return { success: true, data: pool };
};
