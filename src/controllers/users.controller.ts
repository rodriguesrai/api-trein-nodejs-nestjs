import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersDto } from './dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateUser } from '../docs/users.swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreateUser()
  async create(@Body() user: CreateUserDto): Promise<UsersDto> {
    return this.usersService.create(user);
  }
}
