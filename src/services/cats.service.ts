import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/interfaces/crudService.interface';

@Injectable()
export class CatsService {
  findAll(): string {
    return 'Cats test entity!';
  }
}
