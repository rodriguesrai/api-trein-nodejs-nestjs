import { Module } from '@nestjs/common';
import { CatsController } from '../controllers/cats.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
    JwtModule,
  ],
  controllers: [CatsController],
})
export class CatsModule {}
