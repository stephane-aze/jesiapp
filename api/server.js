import { resolve } from 'path';
import jsonServer from 'json-server';

import authService from './auth-service';

const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.post('/auth', authService);

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
