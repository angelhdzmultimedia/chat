import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketioService } from './socketio.service'

type User = {
  userName: string,
  id: string
}


@WebSocketGateway({
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
})
export class SocketioGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  constructor(private readonly socketioService: SocketioService) {}
  @WebSocketServer()
  private server: Server

  afterInit(server: Server) {
    Logger.log(`Initialized ${server}`)
  }

  handleConnection(client: Socket) {
    Logger.log(`client connected ${client.id}`)
    client.data = {
      userName: null,
    }
  }

  handleDisconnect(client: Socket) {
    Logger.log(`client disconnected ${client.id}`)
  }

  @SubscribeMessage('userConnected')
  public userConnected(
    @MessageBody() userName: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.data.userName = userName
  }

  @SubscribeMessage('getUsers')
  public getUsers(@ConnectedSocket() client: Socket) {
    const users = this.server.sockets.fetchSockets()
    client.emit('usersList', users)
  }

  @SubscribeMessage('newMessage')
  public newMessage(
    @MessageBody() data: User
  ): User {
    Logger.log(data)
    this.server.sockets.emit('broadcast', data)
    return data
  }

  @SubscribeMessage('joinRoom')
  public async joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    Logger.log(`User trying to join room ${roomId}...`)
    await client.join(roomId)
    client.to(roomId).emit('userJoined', client.data)
    return roomId
  }

  @SubscribeMessage('leaveRoom')
  public async leaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    Logger.log(`User trying to join room ${roomId}...`)
    await client.leave(roomId)
    this.server.in(roomId).emit('userLeft', client.data)
    return roomId
  }
}
