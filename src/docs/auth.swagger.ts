// src/docs/auth.swagger.ts

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignInDto } from '../controllers/dto/signin.dto';

export function SwaggerLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user' }),
    ApiBody({ type: SignInDto }),
    ApiResponse({ status: 200, description: 'Login successful' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
  );
}
