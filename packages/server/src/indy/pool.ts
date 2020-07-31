import { ServiceResponse } from 'model';
import {
  listPools,
  createPoolLedgerConfig,
  deletePoolLedgerConfig,
  openPoolLedger,
} from './request';
import { resolveGenesisFile } from './genesis';

const {
  GENESIS_FILE = '/home/indy/ledger/sandbox/pool_transactions_genesis',
  GENESIS_URL,
} = process.env;

export const openPool = async (): Promise<ServiceResponse<number>> => {
  const poolName = 'nodepool';
  const {
    success: listPoolsSuccess,
    data: pools = [],
    error: listPoolsError,
  } = await listPools();

  if (!listPoolsSuccess) throw new Error(listPoolsError);
  const poolNames = pools.map((pool) => pool.pool);
  if (poolNames.includes(poolName)) {
    const {
      success: deletePoolLedgerConfigSuccess,
      error: deletePoolLedgerConfigError,
    } = await deletePoolLedgerConfig(poolName);
    if (!deletePoolLedgerConfigSuccess)
      throw new Error(deletePoolLedgerConfigError);
  }
  const {
    success: resolveGenesisFileSuccess,
    data: genesisFile,
    error,
  } = await resolveGenesisFile();
  if (!resolveGenesisFileSuccess) {
    throw new Error(error);
  }
  const {
    success: createPoolLedgerConfigSuccess,
    error: createPoolLedgerConfigError,
  } = await createPoolLedgerConfig(poolName, GENESIS_FILE);
  if (!createPoolLedgerConfigSuccess) {
    throw new Error(createPoolLedgerConfigError);
  }
  const {
    success: openPoolLedgerSuccess,
    data,
    error: openPoolLedgerError,
  } = await openPoolLedger(poolName);
  if (!openPoolLedgerSuccess) {
    throw new Error(openPoolLedgerError);
  }
  return { success: true, data };
};
