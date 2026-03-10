import { Server } from 'socket.io';

export let io: Server;

export function setSocketServer(socketServer: Server) {
  io = socketServer;
}
