import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controllers/users.controller';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { EmailModule } from './email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
