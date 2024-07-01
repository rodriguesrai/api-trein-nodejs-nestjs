// src/cats/services/cats.service.ts

import { Injectable } from '@nestjs/common';
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

  async create(cat: Partial<Cats>): Promise<Cats> {
    return await this.catsRepository.save(cat);
  }
}
