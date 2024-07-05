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

export const returnedUserRepositoryMock = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  password: '123456',
};

export const returnedUserService = {
  id: 1,
  username: 'johndoe',
};

export const usernameValidMock = 'johndoe';

export const validLoginMock = {
  username: 'johndoe',
  password: '123456',
};

export const invalidPasswordLoginMock = {
  username: 'johndoe',
  password: '',
};
