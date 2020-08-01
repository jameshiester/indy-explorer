import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { convertToRole } from '@util/helper';

const getSource = (txn: any) => {
  return get(txn, 'sourceid');
};

const getRole = (txn: any) => {
  const role = get(txn, 'raw.txn.data.role');
  return role ? `(${convertToRole(role)})` : '(USER)';
};

const getColor = (type: string) => {
  const colors = {
    NYM: '#1DE9B6',
    ATTRIB: '#00bfa5',
    SCHEMA: '#A389D4',
    CRED_DEF: '#04A9F5',
  };
  return get(colors, type);
};

const TRANSACTIONS_KEY = 'bc-transactions';

const mapTxn = (txn: any, data: any[]): any => {
  const type = get(txn, 'type');
  const dest = get(txn, 'destination');
  const children = data.filter((item) => {
    const source = getSource(item);

    return source === dest && source !== get(item, 'destination');
  });
  return {
    type: get(txn, 'type'),
    name: dest,
    role: get(txn, 'role', 'n/a'),
    color: getColor(type),
    children: children
      ? children.map((child) => mapTxn(child, data))
      : undefined,
  };
};

const mapData = (data: any[]) => {
  const root = data.find((txn) => !get(txn, 'sourceid'));
  if (root) {
    return mapTxn(root, data);
  }
};

export const useVisualizer = (ledger: string = 'domain') => {
  const { enqueueSnackbar } = useSnackbar();
  const queryFn = async (...args: any[]) => {
    const response = await fetch(`/api/ledger/${ledger}?page_size=100`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw `Failed to reach Transaction service`;
    }
  };
  const { data } = useQuery({
    queryKey: [TRANSACTIONS_KEY, ledger],
    queryFn,
    config: {
      refetchOnWindowFocus: false,
      onError: (err: any) =>
        enqueueSnackbar(err, {
          variant: 'error',
        }),
    },
  });
  return data ? [mapData(data)] : undefined;
};
