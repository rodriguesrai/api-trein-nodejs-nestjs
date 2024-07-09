import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/controllers/auth.controller';
import { AuthService } from '../../src/services/auth.service';
import { validLoginMock } from './mocks/users.mock';
import { invalidPasswordLoginMock } from './mocks/users.mock';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../src/entities/users.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {}, // Mock the Users repository if necessary
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return JWT token when valid credentials are provided', async () => {
    const mockToken = 'mocked-jwt-token';

    jest
      .spyOn(authService, 'login')
      .mockResolvedValueOnce({ access_token: mockToken });
    const result = await authController.login(validLoginMock);

    expect(authService.login).toHaveBeenCalledWith(
      validLoginMock.username,
      validLoginMock.password,
    );
    expect(result).toEqual({ access_token: mockToken });
  });

  it('should return 401 Unauthorized when invalid password are provided', async () => {
    jest
      .spyOn(authService, 'login')
      .mockRejectedValue(new UnauthorizedException());

    try {
      await authController.login(invalidPasswordLoginMock);
    } catch (error) {
      expect(error.getResponse()).toEqual({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
    }
  });
});
