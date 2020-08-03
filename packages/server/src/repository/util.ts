import { Like, Equal, FindOperator, Raw } from 'typeorm';

const getType = (filterType: string, filter: string | number) => {
  switch (filterType) {
    case 'contains':
      return Raw((alias) => `${alias} ILIKE '%${filter}%'`);
    default:
      return Equal(filter);
  }
};

export const buildFilter = (query: any) => {
  return Object.keys(query).reduce(
    (acc: Record<string, FindOperator<string | number>>, key) => {
      const { type, filter } = query[key];
      acc[key] = getType(type, filter);
      return acc;
    },
    {}
  );
};
