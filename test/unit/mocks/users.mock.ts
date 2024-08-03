import { CreateUserDto } from '../../../src/controllers/dto/createUser.dto';

export const validUsersBody: CreateUserDto = {
  name: 'John Doe',
  email: 'exemple@example.com',
  username: 'johndoe',
  password: '123456',
};

export const invalidUsersBody = {
  name: 'nameInvalid',
  password: 'passwordInvalid',
};

export const returnedUserRepositoryMock = {
  userId: 1,
  name: 'John Doe',
  email: 'exemple@example.com',
  username: 'johndoe',
  password: '123456',
};

export const returnedUserService = {
  userId: 1,
  email: 'exemple@example.com',
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
