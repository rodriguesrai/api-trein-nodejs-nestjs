// src/cats/services/cats.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
    return await this.catsRepository.findOne({ where: { id } });
  }

  async create(cat: Partial<Cats>): Promise<Cats> {
    return await this.catsRepository.save(cat);
  }

  async update(id: number, cat: Partial<Cats>): Promise<Cats> {
    await this.catsRepository.update(id, cat);
    return await this.catsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.catsRepository.delete(id);
  }
}
