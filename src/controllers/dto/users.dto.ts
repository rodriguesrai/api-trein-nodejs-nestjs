// src/dto/users.dto.ts
import { Exclude, Expose } from 'class-transformer';

export class UsersDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  name: string;
}
