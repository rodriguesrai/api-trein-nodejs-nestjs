import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: Users): Promise<Users> {
    return this.usersService.create(user);
  }
}
