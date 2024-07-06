import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_NAME'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false, // destroy data on every restart
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
