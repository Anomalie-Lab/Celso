import {WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

@WebSocketGateway({cors: {origin: '*'}})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private userSockets = new Map<string, string>();

  handleConnection(client: Socket) {
    const {user_id, transfer_id} = client.handshake.query;

    if (user_id) {
      this.userSockets.set(user_id as string, client.id);
    }

    if (transfer_id) {
      this.userSockets.set(transfer_id as string, client.id);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [key, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(key);
      }
    }
  }

  sendToUser(user_id: string, payload: any) {
    const socketId = this.userSockets.get(user_id);
    if (socketId) {
      this.server.to(socketId).emit('notification', payload);
    }
  }

  informPayment(transfer_id: string, payload: Account.UserI) {
    const socketId = this.userSockets.get(transfer_id);
    if (socketId) {
      this.server.to(socketId).emit(`payment:${transfer_id}`, payload);
    }
  }
}
