import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import axios from 'axios';
import { ITransaction } from 'model';
import { useState } from 'react';

const getSource = (txn: any) => {
  return get(txn, 'source');
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
  const type = get(txn, 'transactionTypeName');
  const dest = get(txn, 'destination');
  const children = data.filter((item) => {
    const source = getSource(item);

    return source === dest && source !== get(item, 'destination');
  });
  return {
    type: get(txn, 'transactionTypeName'),
    name: dest,
    role: get(txn, 'roleName', 'n/a'),
    color: getColor(type),
    children: children
      ? children.map((child) => mapTxn(child, data))
      : undefined,
  };
};

const mapData = (data: any[]) => {
  if (data.length) {
    const root = data.find((txn) => !get(txn, 'source'));
    if (root) {
      return [mapTxn(root, data)];
    }
    return data
      .filter(
        (txn) => !data.find((otherTxn) => otherTxn.destination === txn.source)
      )
      .map((txn: any) => mapTxn(txn, data));
  }
};

export const useVisualizer = (min: number = 0, max: number = 250) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryFn = async (_: string, min: number, max: number) => {
    try {
      const response = await axios.get<{
        data: Array<ITransaction>;
        totalRecords: number;
      }>(`/api/transactions/DOMAIN`, {
        params: { startRow: min, endRow: max },
      });
      if (response.data.data) {
        return { ...response.data, data: mapData(response.data.data) };
      }
      return response.data;
    } catch (e) {
      throw new Error(`Failed to reach Transaction service`);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [TRANSACTIONS_KEY, min, max],
    queryFn,
    config: {
      refetchOnWindowFocus: false,
      onError: (err: any) =>
        enqueueSnackbar(err, {
          variant: 'error',
        }),
    },
  });

  return {
    data: data ? data.data : undefined,
    totalRecords: data ? data.totalRecords : 0,
    isLoading,
  };
};
