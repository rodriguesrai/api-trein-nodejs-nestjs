import { NestFactory } from '@nestjs/core';
import { CatsModule } from './cats.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatsModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.CATS_SERVICE_PORT),
      },
    },
  );
  await app.listen();
}
bootstrap();
