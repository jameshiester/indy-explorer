import {
  Controller,
  Get,
  Path,
  Query,
  Res,
  Route,
  Tags,
  TsoaResponse,
} from 'tsoa';
import { QueryMode } from '../util/types';
import { buildQuery2, getLedgerTypeByName } from '../util';
import { provideSingleton } from '../ioc/util';
import { ITransaction } from 'model';
import { queryTransactions } from '../repository/transaction';

export type GetTransactionsResponse = {
  totalRecords: number;
  data: Array<ITransaction>;
};

@Route('transactions')
@Tags('Transactions')
@provideSingleton(TransactionsController)
export class TransactionsController extends Controller {
  @Get('/{ledgerType}')
  public async getTransactions(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Path() ledgerType: 'POOL' | 'DOMAIN',
    @Query() startRow?: number,
    @Query() endRow?: number,
    @Query() query?: any,
    @Query() sortBy: string = 'name',
    @Query() page?: number,
    @Query() page_size?: number,
    @Query() sortMode: 'ASC' | 'DESC' = 'ASC',
    @Query() mode: QueryMode = QueryMode.INFINITE
  ): Promise<GetTransactionsResponse | void> {
    try {
      const {
        start,
        end,
        query: predicate,
        sortBy: sortByColumn,
        sortMode: sortDirection,
      } = buildQuery2({
        endRow,
        mode,
        startRow,
        query,
        page,
        page_size,
        sortBy,
        sortMode,
        defaultSortColumn: 'name',
      });
      return await queryTransactions(
        getLedgerTypeByName(ledgerType),
        start,
        end,
        predicate,
        sortByColumn,
        sortDirection === 'ASC' || sortDirection === 'DESC'
          ? sortDirection
          : 'ASC'
      );
    } catch (e) {
      console.log(e);
      serviceErrorResponse(502, { reason: 'Unknown error occurred' });
    }
  }
}
