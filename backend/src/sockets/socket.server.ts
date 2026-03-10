import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { setSocketServer } from './io';

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    socket.on('join:kitchen', ({ companyId }: { companyId: string }) => {
      socket.join(`company:${companyId}:kitchen`);
    });

    socket.on('join:tab', ({ companyId, tabId }: { companyId: string; tabId: string }) => {
      socket.join(`company:${companyId}:tab:${tabId}`);
    });
  });

  setSocketServer(io);
  return io;
}
