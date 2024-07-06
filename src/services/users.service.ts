import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UsersDto } from '../controllers/dto/users.dto';
import { hashPassword } from '../utils/bcrypt.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async create(user: Partial<Users>): Promise<UsersDto> {
    const hashedPassword = await hashPassword(user.password);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(newUser);
      const userDto = plainToInstance(UsersDto, savedUser);
      return { ...userDto, id: savedUser.id };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new ConflictException(
          `Username '${user.username}' already exists.`,
        );
      } else {
        throw error; // Re-throw any other unexpected errors
      }
    }
  }
}
