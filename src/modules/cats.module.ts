import { Module } from '@nestjs/common';
import { CatsController } from '../controllers/cats.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CATS_SERVICE_HOST,
          port: parseInt(process.env.CATS_SERVICE_PORT),
        },
      },
    ]),
    JwtModule,
  ],
  controllers: [CatsController],
})
export class CatsModule {}
