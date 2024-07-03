import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }
}
