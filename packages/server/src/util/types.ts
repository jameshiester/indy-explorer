export enum QueryMode {
  PAGE = 'PAGE',
  INFINITE = 'INFINITE',
}

export interface BaseQueryParams {
  mode: QueryMode;
  sortBy: string;
  sortMode: 'ASC' | 'DESC';
}

export interface PagedQueryParams extends BaseQueryParams {
  mode: QueryMode.PAGE;
  page: string;
  page_size: string;
}

export interface InfiniteQueryParams extends BaseQueryParams {
  startRow: string;
  endRow: string;
}
