import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { Cats } from '../entities/cats.entity';
import { JwtAuthGuard } from '../middlewares/jwtAuthGuard.middleware';
import { CreateCatDto } from './dto/createCats.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Cats> {
    return this.catsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() cat: CreateCatDto): Promise<Cats> {
    return this.catsService.create(cat);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Body() cat: CreateCatDto,
    @Param('id') id: number,
  ): Promise<Cats> {
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: number): Promise<void> {
    this.catsService.delete(id);
  }
}
