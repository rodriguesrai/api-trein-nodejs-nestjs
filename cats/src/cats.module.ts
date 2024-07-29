import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './services/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './entities/cats.entity';
import { Users } from './entities/users.entity';
import { typeOrmConfig } from './typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Cats, Users]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
