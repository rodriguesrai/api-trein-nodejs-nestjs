import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/controllers/users.controller';
import { UsersService } from '../../src/services/users.service';
import { Users } from '../../src/entities/users.entity';
import { validUsersBody } from './mocks/users.mock';
import { CreateUserDto } from 'src/controllers/dto/createUser.dto';

describe('UsersController tests', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(new Users()),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = validUsersBody;
    const createdUser: Users = { id: 1, ...createUserDto };

    jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

    const result = await usersController.create(createUserDto);
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(createdUser);
  });
});
