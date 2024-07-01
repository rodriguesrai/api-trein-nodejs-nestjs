import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getHello(): string {
    return this.catsService.findAll();
  }
}
