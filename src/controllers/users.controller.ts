import { Body, Controller, Post } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: Users): Promise<Users> {
    return this.usersService.create(user);
  }
}
