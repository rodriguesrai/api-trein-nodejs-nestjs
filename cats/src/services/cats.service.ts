import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from '../entities/cats.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Cats[]> {
    return await this.catsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Cats> {
    const response = await this.catsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!response) {
      throw new NotFoundException('Cat not found');
    }
    return response;
  }

  async create(cat: Partial<Cats>): Promise<Cats> {
    return await this.catsRepository.save(cat);
  }

  async associateUserToCat(catId: number, userId: number): Promise<Cats> {
    const cat = await this.catsRepository.findOne({ where: { id: catId } });
    if (!cat) {
      throw new NotFoundException(`Cat with id ${catId} not found`);
    }
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    cat.user = user.id;
    await this.catsRepository.save(cat);

    return cat;
  }

  async update(id: number, cat: Partial<Cats>): Promise<Cats> {
    const existingCat = await this.findOne(id);
    await this.catsRepository.update(id, cat);
    return { ...existingCat, ...cat };
  }

  async delete(id: number): Promise<void> {
    const response = await this.findOne(id);
    if (response) {
      await this.catsRepository.delete(id);
    }
  }
}
