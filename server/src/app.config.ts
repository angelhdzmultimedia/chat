import { INestApplication } from '@nestjs/common'

export function appConfig(app: INestApplication) {
  // app.setGlobalPrefix('api')
  app.enableCors({
    origin: 'http://localhost:9000',
  })
}
