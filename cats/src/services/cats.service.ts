import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from '../entities/cats.entity';
import { Users } from '../entities/users.entity';
import { ServiceResponse } from 'src/interfaces/serviceResponse';
import { CatDTO } from '../dto/cat.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<ServiceResponse<CatDTO[]>> {
    const response = await this.catsRepository.find({
      relations: ['user'],
    });
    const catDTO = plainToInstance(CatDTO, response);
    return {
      status: HttpStatus.OK,
      data: catDTO,
    };
  }

  async findOne(catId: number): Promise<ServiceResponse<CatDTO>> {
    const response = await this.catsRepository.findOne({
      where: { catId },
      relations: ['user'],
    });

    if (!response) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'Cat not found' },
      };
    }
    const catDTO = plainToInstance(CatDTO, response);
    return { status: HttpStatus.OK, data: catDTO };
  }

  async create(cat: Partial<Cats>): Promise<ServiceResponse<Cats>> {
    const response = await this.catsRepository.save(cat);
    return { status: HttpStatus.CREATED, data: response };
  }

  async associateUserToCat(
    catId: number,
    userId: number,
  ): Promise<ServiceResponse<Cats>> {
    const cat = await this.catsRepository.findOne({ where: { catId } });
    if (!cat) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: `Cat with id ${catId} not found` },
      };
    }
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: `User with id ${userId} not found` },
      };
    }

    // cat.userId = user.userId;
    const updatedCat = await this.catsRepository.save(cat);

    return { status: HttpStatus.OK, data: updatedCat };
  }

  async update(
    catId: number,
    catUpdates: Partial<Cats>,
  ): Promise<ServiceResponse<Cats>> {
    const existingCat = await this.catsRepository.findOne({ where: { catId } });

    if (!existingCat) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: `Cat with id ${catId} not found` },
      };
    }

    Object.assign(existingCat, catUpdates);
    const updatedCat = await this.catsRepository.save(existingCat);

    return { status: HttpStatus.OK, data: updatedCat };
  }

  async delete(catId: number): Promise<ServiceResponse<string>> {
    const cat = await this.catsRepository.findOne({
      where: { catId },
      relations: ['user'],
    });

    if (!cat) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: `Cat with id ${catId} not found` },
      };
    }
    await this.catsRepository.delete(catId);

    return {
      status: HttpStatus.OK,
      data: { message: `Cat with id ${catId} has been deleted` },
    };
  }
}
