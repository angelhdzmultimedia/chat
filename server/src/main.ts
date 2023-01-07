import { NestFactory } from '@nestjs/core'
import { appConfig } from './app.config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  appConfig(app)
  await app.listen(5000)
}
bootstrap()
