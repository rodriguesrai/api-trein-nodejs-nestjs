import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cats } from './cats.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Cats, (cats) => cats.catId)
  userId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
