import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/services/users.service';
import { Users } from '../../src/entities/users.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  returnedUserRepositoryMock,
  usernameValidMock,
  validUsersBody,
  returnedUserService,
} from './mocks/users.mock';
import { NotFoundException } from '@nestjs/common';

describe('UsersService tests', () => {
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('should if a user is returned', async () => {
    jest
      .spyOn(usersRepository, 'findOne')
      .mockResolvedValue(returnedUserRepositoryMock);

    const result = await usersService.findOne(usernameValidMock);

    expect(result).toEqual(returnedUserRepositoryMock);
  });

  it('should NotFoundException when username not found', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

    try {
      await usersService.findOne(usernameValidMock);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should create a user', async () => {
    jest
      .spyOn(usersRepository, 'create')
      .mockReturnValue(returnedUserRepositoryMock);
    jest
      .spyOn(usersRepository, 'save')
      .mockResolvedValue(returnedUserRepositoryMock);
    jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined);

    const result = await usersService.create(validUsersBody);

    expect(result).toEqual(returnedUserService);
  });
});
