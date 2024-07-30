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
  UseInterceptors,
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
import { MicroserviceResponseInterceptor } from '../middlewares/microserviceResponse.middleware';
@ApiTags('Cats')
@Controller('cats')
@UseInterceptors(MicroserviceResponseInterceptor)
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
    return response;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SwaggerCreateCat()
  async create(@Body() cat: CreateCatDto) {
    return await this.catsServiceClient.send({ cmd: 'create_cat' }, cat);
  }

  @Post(':catId/user/:userId')
  @UseGuards(JwtAuthGuard)
  @SwaggerCreateRelationCatUser()
  async createRelation(
    @Param('catId') catId: number,
    @Param('userId') userId: number,
  ) {
    const serviceResponse = await this.catsServiceClient.send(
      { cmd: 'associate_user_to_cat' },
      { catId, userId },
    );
    return serviceResponse;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerUpdateCat()
  async update(@Body() cat: CreateCatDto, @Param('id') id: number) {
    return await this.catsServiceClient.send(
      { cmd: 'update_cat' },
      { id, cat },
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SwaggerDeleteCat()
  async delete(@Param('id') id: number) {
    console.log(`Received request to delete cat with id: ${id}`);
    return await this.catsServiceClient.send({ cmd: 'delete_cat' }, id);
  }
}
