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
import { SwaggerCreateCat, SwaggerDeleteCat, SwaggerGetAllCats, SwaggerGetCatById, SwaggerUpdateCat } from '../docs/cats.swagger';
@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @SwaggerGetAllCats()
  async findAll(): Promise<Cats[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerGetCatById()
  async findOne(@Param('id') id: number): Promise<Cats> {
    return await this.catsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SwaggerCreateCat()
  async create(@Body() cat: CreateCatDto): Promise<Cats> {
    return await this.catsService.create(cat);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerUpdateCat()
  async update(
    @Body() cat: CreateCatDto,
    @Param('id') id: number,
  ): Promise<Cats> {
    return await this.catsService.update(id, cat);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerDeleteCat()
  async delete(@Param('id') id: number): Promise<void> {
    await this.catsService.delete(id);
  }
}
