import { Injectable } from '@nestjs/common';
import { Cats } from 'src/interfaces/cats.interface';

@Injectable()
export class CatsService {
  findAll(): Cats[] {
    return [
      {
        id: 1,
        user: 1,
        name: 'Kitty',
        age: 3,
        breed: 'Pers',
      },
      {
        id: 2,
        user: 1,
        name: 'Kitty',
        age: 3,
        breed: 'Pers',
      },
    ];
  }

  findOne(id: number): Cats {
    return {
      id,
      user: 1,
      name: 'Kitty',
      age: 3,
      breed: 'Pers',
    };
  }
}
