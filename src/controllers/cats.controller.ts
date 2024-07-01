import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { Cats } from 'src/entities/cats.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() cat: Cats): Promise<Cats> {
    return this.catsService.create(cat);
  }
}
