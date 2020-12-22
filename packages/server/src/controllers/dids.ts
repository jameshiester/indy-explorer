import { Controller, Get, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { buildQuery } from '../util';
import { provideSingleton } from '../ioc/util';
import { IDid } from 'model';
import { queryDids } from '../repository/did';

export type GetDidsResponse = {
  totalRecords: number;
  data: Array<IDid>;
};

@Route('dids')
@Tags('Dids')
@provideSingleton(DidsController)
export class DidsController extends Controller {
  @Get('')
  public async getDids(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Query() startRow?: number,
    @Query() endRow?: number,
    @Query() query?: any,
    @Query() sortBy: string = 'id',
    @Query() sortMode: 'ASC' | 'DESC' = 'ASC'
  ): Promise<GetDidsResponse | void> {
    try {
      const {
        start,
        end,
        query: predicate,
        sortBy: sortByColumn,
        sortMode: sortDirection,
      } = buildQuery({
        endRow,
        startRow,
        query,
        sortBy,
        sortMode,
        defaultSortColumn: 'id',
      });
      return await queryDids(
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
