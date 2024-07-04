// import { ValidationPipe } from '@nestjs/common';
// import { TestingModule, Test } from '@nestjs/testing';
// import { CreateUserDto } from 'src/controllers/dto/createUser.dto';

// describe('ValidationPipe tests', () => {
//   let app: TestingModule;

//   beforeAll(async () => {
//     app = await Test.createTestingModule({
//       providers: [],
//     }).compile();
//   });

//   it('should validate CreateUserDto correctly', async () => {
//     const validationPipe = new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//       // Here, 'type' is necessary to satisfy ArgumentMetadata
//       type: 'body',
//       // Here, 'metatype' should be the class reference of CreateUserDto
//       metatype: CreateUserDto,
//     });

//     const userDto = {
//       name: 'John Doe',
//       username: 'johndoe',
//       password: '12345',
//     };

//     await expect(
//       validationPipe.transform(userDto, {
//         type: 'body',
//         metatype: CreateUserDto,
//       }),
//     ).resolves.toEqual(userDto);
//   });
// });
