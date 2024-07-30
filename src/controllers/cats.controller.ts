import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { Cats } from '../entities/cats.entity';
import { JwtAuthGuard } from '../middlewares/jwtAuthGuard.middleware';
import { CreateCatDto } from './dto/createCats.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerCreateCat,
  SwaggerCreateRelationCatUser,
  SwaggerDeleteCat,
  SwaggerGetAllCats,
  SwaggerGetCatById,
  SwaggerUpdateCat,
} from '../docs/cats.swagger';
import { ClientProxy } from '@nestjs/microservices';
@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(
    @Inject('CATS_SERVICE') private readonly catsServiceClient: ClientProxy,
  ) {
    console.log('catsControllerConstructor', catsServiceClient);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @SwaggerGetAllCats()
  async findAll() {
    return await this.catsServiceClient.send({ cmd: 'get_cats' }, {});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerGetCatById()
  async findOne(@Param('id') id: number) {
    const response = await this.catsServiceClient.send(
      { cmd: 'get_one_cat' },
      id,
    );
    console.log('response', response);

    return response;
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @SwaggerCreateCat()
  // async create(@Body() cat: CreateCatDto): Promise<Cats> {
  //   return await this.catsService.create(cat);
  // }

  // @Post(':catId/user/:userId')
  // @UseGuards(JwtAuthGuard)
  // @SwaggerCreateRelationCatUser()
  // async createRelation(
  //   @Param('catId') catId: number,
  //   @Param('userId') userId: number,
  // ): Promise<Cats> {
  //   const serviceResponse = await this.catsService.associateUserToCat(
  //     catId,
  //     userId,
  //   );
  //   return serviceResponse;
  // }

  // @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // @SwaggerUpdateCat()
  // async update(
  //   @Body() cat: CreateCatDto,
  //   @Param('id') id: number,
  // ): Promise<Cats> {
  //   return await this.catsService.update(id, cat);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @SwaggerDeleteCat()
  // async delete(@Param('id') id: number): Promise<void> {
  //   await this.catsService.delete(id);
  // }
}
