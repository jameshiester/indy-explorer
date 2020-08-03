import axios, { AxiosError } from 'axios';
import { get } from 'lodash';
import { IndyTransaction } from 'model';

const VDR_URL = 'http://webserver:4000';

export const getTransactionFromLedger = async (
  sequence: number,
  ledger: number
) => {
  try {
    const response = await axios.get(`${VDR_URL}/txn/${ledger}/${sequence}`);
    if (response.data) {
      const txn = get(response.data, 'data') as IndyTransaction;
      if (txn)
        return {
          sequence,
          txnId: txn.txnMetadata.txnId,
          value: txn,
          success: true,
        };
    }
    return undefined;
  } catch (e) {
    console.error(
      'FAILED TO GET TRANSACTION LEDGER',
      ledger,
      'SEQUENCE',
      sequence,
      'ERROR',
      e
    );
    return undefined;
  }
};

export const submitRequestToLedger = async (request: any) => {
  try {
    const response = await axios.post(`${VDR_URL}/submit`, request);
    return { success: true, data: response.data };
  } catch (e) {
    console.error('SUBMIT REQUEST FAILED:', e);
    return { success: false, error: e };
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(VDR_URL);
    if (response.data && response.data.status === 'active') {
      return { active: true, data: response.data };
    } else {
      return { active: false, data: response.data };
    }
  } catch (e) {
    return { active: false };
  }
};

const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const untilActive = async () => {
  let active = false;
  let tries = 0;
  while (!active && tries < 20) {
    await sleep(10000);
    const { active: isActive } = await getStatus();
    active = isActive;
    tries++;
  }
  if (!active) {
    throw new Error('VDR TIMEOUT ERROR');
  }
};
