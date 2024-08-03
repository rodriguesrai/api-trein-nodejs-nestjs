// src/dto/users.dto.ts
import { Exclude, Expose } from 'class-transformer';

export class UsersDto {
  @Expose()
  userId: number;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  name: string;
}
