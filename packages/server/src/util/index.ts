import { LedgerType, TransactionType, IndyRoleType } from 'model';
import { Request } from 'express';
import { QueryMode } from './types';
import { get } from 'lodash';
export const asyncForEach = async <T>(
  array: T[],
  callback: (item: T, index: number, values: T[]) => Promise<void>
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isInt = (val: string | number) =>
  typeof (val === 'number') && Number.isInteger(val as number);

export const getLedgerTypeByName = (type: string): LedgerType => {
  const ledger = Object.entries(LedgerType).find(
    (ledgerType) => ledgerType[0] === type
  );
  if (!ledger) {
    throw new Error('invalid ledger');
  }
  return ledger[1] as LedgerType;
};

export const mapTransactionTypeToName = (type?: string): string | undefined => {
  if (!type) return undefined;
  const transactionType = Object.entries(TransactionType).find(
    (transactionType) => transactionType[1] === type
  );
  if (!transactionType) {
    return undefined;
  }
  return transactionType[0];
};

export const mapRoleTypeToName = (type?: string): string | undefined => {
  if (!type) return undefined;
  const role = Object.entries(IndyRoleType).find(
    (roleType) => roleType[1] === type
  );
  if (!role) {
    return undefined;
  }
  return role[0];
};

export interface BuildQueryParams {
  endRow?: number;
  mode: QueryMode;
  page_size?: number;
  page?: number;
  query?: any;
  sortBy: string;
  sortMode: string;
  startRow?: number;
  defaultSortColumn: string;
}

export const buildQuery2 = ({
  endRow,
  mode,
  page_size = 10000,
  page = 1,
  query = '{}',
  defaultSortColumn,
  sortBy = defaultSortColumn,
  sortMode = 'ASC',
  startRow,
}: BuildQueryParams) => {
  if (mode === QueryMode.PAGE) {
    const start = (page - 1) * page_size;
    const end = start + page_size - 1;
    return {
      end: Number(end),
      start: Number(start),
      query: JSON.parse(query),
      sortBy: sortBy.toString(),
      sortMode,
    };
  }
  return {
    end: Number(endRow),
    start: Number(startRow),
    query: JSON.parse(query),
    sortBy: sortBy.toString(),
    sortMode,
  };
};

export const buildQuery = (req: Request, defaultSortColumn: string) => {
  const mode = get(req.query, 'mode', QueryMode.PAGE).toString().toUpperCase();
  const { sortBy = defaultSortColumn, sortMode = 'ASC' } = req.query;
  const query = JSON.parse(get(req.query, 'query', '{}').toString());
  if (mode === QueryMode.PAGE) {
    const page = Math.floor(Number(get(req.query, 'page', 1)));
    const page_size = Math.floor(Number(get(req.query, 'page_size', 10000)));
    const start = (page - 1) * page_size;
    const end = start + page_size - 1;
    return {
      end: Number(end),
      start: Number(start),
      query,
      sortBy: sortBy.toString(),
      sortMode,
    };
  }
  const { startRow = 0, endRow = 1000 } = req.query;
  return {
    end: Number(endRow),
    start: Number(startRow),
    query,
    sortBy: sortBy.toString(),
    sortMode,
  };
};
