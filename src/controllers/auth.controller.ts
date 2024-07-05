import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }
}
