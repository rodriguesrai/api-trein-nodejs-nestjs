import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from '../controllers/cats.controller';
import { Cats } from '../entities/cats.entity';
import { CatsService } from '../services/cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cats])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
