import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const socketConnection = (server: HttpServer) => {
  return new Server(server, {
    cors: {
      origin: '*',
    },
  });
};
