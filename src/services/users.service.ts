import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UsersDto } from '../controllers/dto/users.dto';
import * as bcrypt from 'bcrypt';
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

  // async create(user: Partial<Users>): Promise<UsersDto> {
  //   const { password, ...userData } = user;
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  //   const newUser = await this.usersRepository.save({
  //     ...userData,
  //     password: hashedPassword,
  //   });
  //   return plainToInstance(UsersDto, newUser);
  // }

  async create(user: Partial<Users>): Promise<UsersDto> {
    const hashedPassword = await hashPassword(user.password);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(newUser);
    const userDto = plainToInstance(UsersDto, savedUser); // Convertendo para UsersDto
    return { ...userDto, id: savedUser.id }; // Incluindo o id no retorno
  }
}
