import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerGetHealth } from '../docs/app.swagger';
@ApiTags('API Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SwaggerGetHealth()
  getHello(): string {
    return this.appService.getHello();
  }
}
