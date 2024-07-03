import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
