import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiCreateUser() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Create a new user',
      description: 'This endpoint creates a new user in the system.',
    }),
    ApiResponse({ status: 201, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({
      status: 409,
      description: 'Conflict: Username is already in use',
    }),
  );
}
