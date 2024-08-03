import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerFileUpload() {
  return applyDecorators(
    ApiOperation({ summary: 'Upload a file' }),
    ApiResponse({ status: 200, description: 'File uploaded successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
  );
}
