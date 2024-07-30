import { Controller } from '@nestjs/common';
import { CatsService } from './services/cats.service';
import { MessagePattern } from '@nestjs/microservices';
import { Cats } from './entities/cats.entity';

@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @MessagePattern({ cmd: 'get_cats' })
  async findAll(): Promise<Cats[]> {
    return await this.catsService.findAll();
  }

  @MessagePattern({ cmd: 'get_one_cat' })
  async findOne(id: number): Promise<Cats> {
    return await this.catsService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_cat' })
  async create(cat: Cats): Promise<Cats> {
    return await this.catsService.create(cat);
  }

  @MessagePattern({ cmd: 'associate_user_to_cat' })
  async createRelation(catId: number, userId: number): Promise<Cats> {
    return await this.catsService.associateUserToCat(catId, userId);
  }

  @MessagePattern({ cmd: 'update_cat' })
  async update(id: number, cat: Cats): Promise<Cats> {
    return await this.catsService.update(id, cat);
  }

  @MessagePattern({ cmd: 'delete_cat' })
  async delete(id: number): Promise<void> {
    return await this.catsService.delete(id);
  }
}
