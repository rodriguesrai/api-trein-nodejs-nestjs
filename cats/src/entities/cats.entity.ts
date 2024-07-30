import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  catId: number;

  @ManyToOne(() => Users, (users) => users.userId)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
