import { LedgerType, TransactionType, IndyRoleType } from 'model';
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
  query?: any;
  sortBy: string;
  sortMode: string;
  startRow?: number;
  defaultSortColumn: string;
}

export const buildQuery = ({
  endRow = 1000,
  query = '{}',
  defaultSortColumn,
  sortBy = defaultSortColumn,
  sortMode = 'ASC',
  startRow = 0,
}: BuildQueryParams) => {
  return {
    end: Number(endRow),
    start: Number(startRow),
    query: JSON.parse(query),
    sortBy: sortBy.toString(),
    sortMode,
  };
};
