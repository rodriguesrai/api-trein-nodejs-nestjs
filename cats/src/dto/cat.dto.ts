import { Exclude, Expose } from 'class-transformer';
import { Users } from '../entities/users.entity';

// cat.dto.ts
export class CatDTO {
  @Expose()
  catId: number;

  @Expose()
  name: string;

  @Expose()
  age: number;

  @Expose()
  breed: string;

  @Expose()
  userId: number;

  @Exclude()
  user: Users;
}
