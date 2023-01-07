import { Module } from '@nestjs/common'
import { SocketioModule } from './socketio/socketio.module'

@Module({
  imports: [SocketioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
