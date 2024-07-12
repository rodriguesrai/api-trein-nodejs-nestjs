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
import { SesServiceMock } from './mocks/sesService.mock';
import { SesService } from '../../src/services/ses.service';

describe('UsersService tests', () => {
  let usersService: UsersService;
  let usersRepository: Repository<Users>;
  let sesService: SesServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    })
      .useMocker((token) => {
        if (token === SesService) {
          return new SesServiceMock();
        }
      })
      .compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    sesService = module.get<SesServiceMock>(SesService);
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

    const sendEmailCreatedUserSpy = jest.spyOn(
      sesService,
      'sendEmailCreatedUser',
    );

    const result = await usersService.create(validUsersBody);

    expect(sendEmailCreatedUserSpy).toHaveBeenCalledWith(validUsersBody.email);
    expect(result).toEqual(returnedUserService);
  });
});
