import { ServiceResponse } from 'model';
import axios, { AxiosError } from 'axios';
import { get } from 'lodash';
import fs from 'fs';

let GENESIS_FILE_VERIFIED = false;

const {
  GENESIS_FILE = '/home/indy/ledger/sandbox/pool_transactions_genesis',
  GENESIS_URL,
} = process.env;

const fetchGenesisTxnFromURL = async (
  url: string
): Promise<ServiceResponse<string>> => {
  try {
    const response = await axios(url);
    return { success: true, data: await response.data };
  } catch (e) {
    return {
      success: false,
      error: get(e, 'response.data', 'Failed to fetch genenis transaction'),
    };
  }
};

export const resolveGenesisFile = async (): Promise<
  ServiceResponse<string>
> => {
  if (!GENESIS_FILE_VERIFIED) {
    try {
      if (GENESIS_FILE && fs.existsSync(GENESIS_FILE)) {
        console.log('Genesis file already exists');
        return { success: true, data: GENESIS_FILE };
      } else if (GENESIS_URL) {
        const {
          success: fetchGenesisTxnSuccess,
          data: genesisTxn = '',
          error,
        } = await fetchGenesisTxnFromURL(GENESIS_URL);
        if (!fetchGenesisTxnSuccess) {
          throw new Error(`Failed to fetch genesis TX: ${error}`);
        }
        fs.writeFileSync(GENESIS_FILE, genesisTxn);
        GENESIS_FILE_VERIFIED = true;
      } else {
        throw new Error('No genesis file or URL defined');
      }
    } catch (e) {
      console.error(e);
      return { success: false, error: `Error Setting Protocol Version: ${e}` };
    }
  }
  return { success: true, data: GENESIS_FILE };
};
