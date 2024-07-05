import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerGetHealth() {
  return applyDecorators(
    ApiOperation({ summary: 'Get health status' }),
    ApiResponse({ status: 200, description: 'Health: up' }),
  );
}
