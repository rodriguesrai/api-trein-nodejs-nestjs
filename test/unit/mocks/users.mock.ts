import { CreateUserDto } from '../../../src/controllers/dto/createUser.dto';

export const validUsersBody: CreateUserDto = {
  name: 'John Doe',
  username: 'johndoe',
  password: '123456',
};

export const invalidUsersBody = {
  name: 'nameInvalid',
  password: 'passwordInvalid',
};
