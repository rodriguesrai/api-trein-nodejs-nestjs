import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { Cats } from '../entities/cats.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cats> {
    return this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() cat: Cats): Promise<Cats> {
    return this.catsService.create(cat);
  }

  @Put(':id')
  async update(@Body() cat: Cats, @Param('id') id: number): Promise<Cats> {
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.catsService.delete(id);
  }
}
