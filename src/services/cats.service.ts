import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from '../entities/cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
  ) {}

  async findAll(): Promise<Cats[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cats> {
    const response = await this.catsRepository.findOne({ where: { id } });
    if (!response) {
      throw new NotFoundException('Cat not found');
    }
    return response;
  }

  async create(cat: Partial<Cats>): Promise<Cats> {
    return await this.catsRepository.save(cat);
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
