import express from 'express';
import { createConnection } from 'typeorm';
import indy from 'indy-sdk';
import http from 'http';
import socket from 'socket.io';
import Transaction from './entity/transaction';
import Pointer from './entity/pointer';
import { Anchor } from './anchor';
import 'reflect-metadata';

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
  entities: [Pointer, Transaction],
}).then(async (connection) => {
  const anchor = new Anchor();

  app.get('/api/status', async (req, res, next) => {
    if (anchor.ready()) {
      try {
        const response = await anchor.getValidatorInfo();
        res.json(response);
      } catch (e) {
        next(e);
      }
    } else {
      next('Trust Anchor Not Ready');
    }
  });

  app.get('/*', async (req, res, next) => {
    res.json({ ok: true });
  });

  // start express server on port 8000
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
    anchor.open().then(() => {
      console.log('Anchor Initialized');
    });
  });
});
