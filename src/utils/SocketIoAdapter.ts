import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import * as socketIo from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: socketIo.ServerOptions): any {
    const server = super.createIOServer(port, options);
    console.log('Server created in createIOServer');

    server.use((socket, next) => {
      const token = socket.handshake.query.token;
      if (token) {
        console.log('Token recebido:', token);
        return next();
      }
      console.error('Erro de autenticação: Token não encontrado');
      return next(new Error('Authentication error in createIOServer'));
    });

    return server;
  }
}
