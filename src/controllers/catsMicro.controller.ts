import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('catsmicroservice')
export class CatsMicroController {
  constructor(
    @Inject('CATS_SERVICE') private readonly catsServiceClient: ClientProxy,
  ) {
    console.log('catsControllerConstructor', catsServiceClient);
  }

  @Get()
  getHello() {
    return this.catsServiceClient.send({ cmd: 'get_cats' }, {});
  }
}
