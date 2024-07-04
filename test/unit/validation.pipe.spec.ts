import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../../src/controllers/dto/createUser.dto';
import { validUsersBody, invalidUsersBody } from './mocks/users.mock';

describe('ValidationPipe tests', () => {
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
  });

  it('should validate CreateUserDto correctly with valid data', async () => {
    await expect(
      validationPipe.transform(validUsersBody, {
        type: 'body',
        metatype: CreateUserDto,
      }),
    ).resolves.toEqual(validUsersBody);
  });

  it('should throw BadRequestException with invalid data', async () => {
    await expect(
      validationPipe.transform(invalidUsersBody, {
        type: 'body',
        metatype: CreateUserDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
