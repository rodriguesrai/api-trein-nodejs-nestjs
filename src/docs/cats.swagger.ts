import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function SwaggerGetAllCats() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all cats' }),
    ApiResponse({ status: 200, description: 'List of all cats' }),
  );
}

export function SwaggerGetCatById() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve cat by ID' }),
    ApiResponse({ status: 200, description: 'Cat details' }),
    ApiResponse({ status: 404, description: 'Cat not found' }),
  );
}

export function SwaggerCreateCat() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a new cat' }),
    ApiResponse({ status: 201, description: 'Cat created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function SwaggerUpdateCat() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a cat' }),
    ApiResponse({ status: 200, description: 'Cat updated successfully' }),
    ApiResponse({ status: 404, description: 'Cat not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function SwaggerDeleteCat() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete a cat' }),
    ApiResponse({ status: 200, description: 'Cat deleted successfully' }),
    ApiResponse({ status: 404, description: 'Cat not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
