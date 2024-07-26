import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from '../controllers/cats.controller';
import { Cats } from '../entities/cats.entity';
import { CatsService } from '../services/cats.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cats]), JwtModule, UsersModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
