import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.id)
  userId: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
