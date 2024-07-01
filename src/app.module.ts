import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
