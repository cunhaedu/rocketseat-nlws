import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import { socketConnection } from '@infra/socketio/connection';
import routes from './routes';

const app = express();
const serverHttp = createServer(app);

const io = socketConnection(serverHttp);

io.on('connection', () => {
  console.log('Usuário conectado!');
});

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  }),
);

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);

app.use(routes);

export { serverHttp, io };
