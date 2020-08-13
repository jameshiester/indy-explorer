import path from 'path';
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import http from 'http';
import socket from 'socket.io';
import Transaction from './entity/transaction';
import Pointer from './entity/pointer';
import { Anchor } from './anchor';
import 'reflect-metadata';
import IndyNode from './entity/node';
import NodeStatus from './entity/nodestatus';
import NodesStatusSummary from './entity/nodeSummary';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';

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
  entities: [Pointer, Transaction, IndyNode, NodeStatus, NodesStatusSummary],
}).then(async (connection) => {
  const anchor = new Anchor(io);

  RegisterRoutes(app);

  app.use(
    '/api/docs',
    swaggerUi.serve,
    async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
    }
  );
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
