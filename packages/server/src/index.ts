import path from 'path';
import express from 'express';
import { createConnection } from 'typeorm';
import http from 'http';
import socket from 'socket.io';
import { get } from 'lodash';
import Transaction from './entity/transaction';
import Pointer from './entity/pointer';
import { Anchor } from './anchor';
import 'reflect-metadata';
import { queryTransactions } from './repository/transaction';
import { getLedgerTypeByName, buildQuery } from './util';
import { queryNodes } from './repository/node';
import IndyNode from './entity/node';
import NodeStatus from './entity/nodestatus';
import { getNodesStatus, getNodeStatuses } from './repository/nodestatus';

const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer, { serveClient: false });

const {
  POSTGRES_PORT = 5432,
  POSTGRES_USERNAME = 'postgres',
  POSTGRES_PASSWORD = 'root',
  POSTGRES_HOST = 'pg-db',
  POSTGRES_DB = 'postgres',
} = process.env;

createConnection({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Pointer, Transaction, IndyNode, NodeStatus],
}).then(async (connection) => {
  const anchor = new Anchor(io);

  app.get('/api/ledger/:ledger_type', async (req, res, next) => {
    if (anchor.ready()) {
      try {
        const ledgerType = get(
          req.params,
          'ledger_type',
          'DOMAIN'
        ).toUpperCase();
        const { start, end, query, sortBy, sortMode } = buildQuery(
          req,
          'sequence'
        );
        const data = await queryTransactions(
          getLedgerTypeByName(ledgerType),
          start,
          end,
          query,
          sortBy.toString(),
          sortMode === 'ASC' || sortMode === 'DESC' ? sortMode : undefined
        );
        res.json(data);
      } catch (e) {
        console.log(e);
        next(e);
      }
    } else {
      next('Trust Anchor Not Ready');
    }
  });

  app.get('/api/nodes', async (req, res, next) => {
    if (anchor.ready()) {
      try {
        const { start, end, query, sortBy, sortMode } = buildQuery(req, 'name');
        const data = await queryNodes(
          start,
          end,
          query,
          sortBy,
          sortMode === 'ASC' || sortMode === 'DESC' ? sortMode : 'ASC'
        );
        res.json(data);
      } catch (e) {
        console.log(e);
        next(e);
      }
    } else {
      next('Trust Anchor Not Ready');
    }
  });

  app.get('/api/nodes/history', async (req, res, next) => {
    if (anchor.ready()) {
      try {
        const { since = 0 } = req.query;
        const data = await getNodesStatus(Number(since));
        res.json(data);
      } catch (e) {
        console.log(e);
        next(e);
      }
    } else {
      next('Trust Anchor Not Ready');
    }
  });

  app.get('/api/nodes/:node/history', async (req, res, next) => {
    if (anchor.ready()) {
      try {
        const { since = 0 } = req.query;
        const { node } = req.params;
        const data = await getNodeStatuses(Number(since), node);
        res.json(data);
      } catch (e) {
        console.log(e);
        next(e);
      }
    } else {
      next('Trust Anchor Not Ready');
    }
  });

  // add middlewares
  app.use(express.static(path.join(__dirname, '..', '..', 'client/build')));

  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client/build/index.html'));
  });

  // start express server on port 8000
  const port = process.env.PORT || 8000;
  httpServer.listen(port, () => {
    console.log(`server started on port ${port}`);
    anchor.open().then(() => {
      console.log('Anchor Initialized');
    });
  });
});
