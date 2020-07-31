import { v4 } from 'uuid';
import indy from 'indy-sdk';
import { IndyWallet } from 'model';
import { createWallet, openWallet, createAndStoreMyDid } from './request';

export const createAnchorWallet = async (seed: string): Promise<IndyWallet> => {
  const tmpKey = v4();
  const tmpName = v4();
  const config = { id: tmpName };
  let credentials = { key: tmpKey };
  const { success: walletCreated } = await createWallet(config, credentials);
  try {
    const { success, data: tmp, error } = await openWallet(config, credentials);
    if (!success) throw new Error(error);
    try {
      let didInfo = {
        seed: seed,
      };
      const {
        success,
        data: [did, verkey] = [undefined, undefined],
        error: didError,
      } = await createAndStoreMyDid(tmp || 0, didInfo);
      if (!success) throw new Error(didError);
      try {
        await indy.closeWallet(tmp || 0);
        return { did, verkey, credentials, config };
      } catch (e) {
        throw new Error(e);
      }
    } catch (e) {
      console.log('Failed to store did', e);
      throw new Error(e);
    }
  } catch (e) {
    console.log('Failed to open wallet', e);
    throw new Error(e);
  }
};
