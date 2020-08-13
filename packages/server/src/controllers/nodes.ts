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
import { buildQuery2 } from '../util';
import { queryNodes } from '../repository/node';
import { provideSingleton } from '../ioc/util';
import { INode } from 'model';
import { getNodesStatus, getNodeStatuses } from '../repository/nodestatus';
import NodeStatus from '../entity/nodestatus';
import { getNodesStatusSummaries } from '../repository/nodeSummary';
import NodesStatusSummary from '../entity/nodeSummary';

export type GetNodesResponse = { totalRecords: number; data: Array<INode> };

@Route('nodes')
@Tags('Nodes')
@provideSingleton(NodesController)
export class NodesController extends Controller {
  @Get('')
  public async getNodes(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Query() startRow?: number,
    @Query() endRow?: number,
    @Query() query?: any,
    @Query() sortBy: string = 'name',
    @Query() page?: number,
    @Query() page_size?: number,
    @Query() sortMode: 'ASC' | 'DESC' = 'ASC',
    @Query() mode: QueryMode = QueryMode.INFINITE
  ): Promise<GetNodesResponse | void> {
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
        defaultSortColumn: 'sequence',
      });
      return await queryNodes(
        start,
        end,
        predicate,
        sortByColumn,
        sortDirection === 'ASC' || sortDirection === 'DESC'
          ? sortDirection
          : 'ASC'
      );
    } catch (e) {
      serviceErrorResponse(502, { reason: 'Unknown error occurred' });
    }
  }
  @Get('/history')
  public async getHistory(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Query() since?: number
  ): Promise<Array<NodeStatus> | void> {
    try {
      return await getNodesStatus(Number(since));
    } catch (e) {
      serviceErrorResponse(502, { reason: 'Unknown error occurred' });
    }
  }

  @Get('/{node}/history')
  public async getHistoryByNode(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Path() node: string,
    @Query() since?: number
  ): Promise<Array<NodeStatus> | void> {
    try {
      return await getNodeStatuses(
        since ? Number(since) : Date.now() - 1000 * 60 * 60 * 24 * 30,
        node
      );
    } catch (e) {
      serviceErrorResponse(502, { reason: 'Unknown error occurred' });
    }
  }

  @Get('/history/summary')
  public async getHistorySummary(
    @Res() serviceErrorResponse: TsoaResponse<502, { reason: string }>,
    @Query() since?: number
  ): Promise<Array<NodesStatusSummary> | void> {
    try {
      return await getNodesStatusSummaries(Number(since));
    } catch (e) {
      serviceErrorResponse(502, { reason: 'Unknown error occurred' });
    }
  }
}
