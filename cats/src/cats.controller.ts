import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cats[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cats> {
    return await this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() cat: CreateCatDto): Promise<Cats> {
    return await this.catsService.create(cat);
  }

  @Post(':catId/user/:userId')
  async createRelation(
    @Param('catId') catId: number,
    @Param('userId') userId: number,
  ): Promise<Cats> {
    const serviceResponse = await this.catsService.associateUserToCat(
      catId,
      userId,
    );
    return serviceResponse;
  }

  @Put(':id')
  async update(
    @Body() cat: CreateCatDto,
    @Param('id') id: number,
  ): Promise<Cats> {
    return await this.catsService.update(id, cat);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.catsService.delete(id);
  }
}
